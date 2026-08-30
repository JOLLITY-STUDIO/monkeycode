/**
 * _gen_opening_frame_table.cjs — 从 emu-full dump 生成逐帧 GT 数据表 OpeningFrameTable.ts
 * 只读片头区 NES f10-f3599。
 *
 * 数据结构:每帧
 *   f : NES 帧号
 *   c : CHR 分 scanline 计划(含 s=0 帧顶状态),每组 {s, b[8]}
 *   p : 调色板 {bg:[16], sp:[16]}
 *   o : OAM diff(仅变化 sprite): [[idx, y, tile, attr, x], ...]
 *   n : NT 变化行 [{ni, r, d[32]}, ...]
 *   a : 属性表变化行 [{ni, r, d[8]}, ...]
 *   s : 渲染用 scroll 寄存器 {v,h,vt,ht,fv,fh} + 渲染计数器 {cv,ch,cvt,cht}（H5 直接写入 PPU，驱动 nametable 选择与滚动）
 *        + pr: pre-render 推进模式 (1=推进, 0=title 屏 pre-render 不推进, emu scrollEnd 反推)
 *
 * 压缩原则:
 *   - OAM/NT/属性表只存与上一帧的差异
 *   - 变化行 / 变化 sprite 在片头中极少
 */
const fs = require('fs');
const path = require('path');

const IN_DIR = path.join(__dirname, '..', 'output', 'emu-full');
const OUT_DIR = path.join(__dirname, '..', 'src', 'game', 'prg', 'data', 'scene');
const F0 = 10;
// 片头序列包含 Tecmo logo / NTV / 10 屏字幕 / story_cup / title 装载与显示，
// emu-full 实测到 f4200 切黑屏，因此 GT 表覆盖 f10-f4200。
const F1 = 4200;

const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

// pre-render 时刻 scroll 真值（_gen_scroll_prerender.cjs 产出）：
// state.json.scroll 是帧循环开始前捕获（vblank $2005/$2006 写入之前），
// 而 PPU 实际渲染用的是 pre-render scanline 时的 reg*/cnt*（vblank 写入之后）。
// 只有 pre-render 值才是 renderStartOverride / cnt* 初始化的准确来源。
const scrollPre = (() => {
  const f = path.join(IN_DIR, 'scroll-prerender.json');
  if (!fs.existsSync(f)) return null;
  const arr = readJson(f);
  const m = new Map();
  for (const e of arr) m.set(e.f, e);
  return m;
})();

// emu 内部 PPU scanline (0-261) → H5 buffer row (1-240) 坐标转换：
//   - 内部 scanline <= 20（vblank/pre-render 期切换）→ 0（首可见行前生效）
//   - 内部 scanline 21-260（可见行）→ scanline - 20（该行渲染前生效）
// H5 的 applyChrPlanAt(scan) 用 buffer row 消费计划，必须做此换算。
const chrScanToBufferRow = (scan) => (scan <= 20 ? 0 : scan - 20);

function attrsFromTile960(attrib960, baseAddr) {
  // 把 960 项逐 tile 属性(与 tile 一一对应)反推成 64 字节标准属性表,
  // 再切分成 8 行(每行 8 字节)
  // 每 2-bit group 覆盖 2x2 tile 块(4 格同值),采样左上格:
  //   bits0-1 = 左上 2x2(ar*4,   ac*4)
  //   bits2-3 = 右上 2x2(ar*4,   ac*4+2)
  //   bits4-5 = 左下 2x2(ar*4+2, ac*4)
  //   bits6-7 = 右下 2x2(ar*4+2, ac*4+2)
  // emu attrib 数组存的是 palette group 偏移(0/4/8/12),恢复 2-bit group 必须 >>2
  const attrTable = new Array(64).fill(0);
  for (let ar = 0; ar < 8; ar++) {
    for (let ac = 0; ac < 8; ac++) {
      const tl = ((attrib960[(ar * 4) * 32 + ac * 4] ?? 0) >> 2) & 3;
      const tr = ((attrib960[(ar * 4) * 32 + ac * 4 + 2] ?? 0) >> 2) & 3;
      const bl = ((attrib960[(ar * 4 + 2) * 32 + ac * 4] ?? 0) >> 2) & 3;
      const br = ((attrib960[(ar * 4 + 2) * 32 + ac * 4 + 2] ?? 0) >> 2) & 3;
      attrTable[ar * 8 + ac] = tl | (tr << 2) | (bl << 4) | (br << 6);
    }
  }
  const rows = [];
  for (let ar = 0; ar < 8; ar++) rows.push(attrTable.slice(ar * 8, ar * 8 + 8));
  return rows;
}

function attrTileDiff(prevRows, curRows) {
  const diffs = [];
  for (let ni = 0; ni < 4; ni++) {
    for (let r = 0; r < 8; r++) {
      let diff = false;
      for (let i = 0; i < 8; i++) if (prevRows[ni][r][i] !== curRows[ni][r][i]) { diff = true; break; }
      if (diff) diffs.push({ ni, r, d: curRows[ni][r].slice() });
    }
  }
  return diffs;
}

// 帧中逐扫描线 scroll 切换点（mid-frame $2005 写入）
const scrollScan = (() => {
  const f = path.join(IN_DIR, 'scroll-scan.json');
  if (!fs.existsSync(f)) return null;
  const arr = readJson(f);
  const m = new Map();
  for (const e of arr) m.set(e.f, e.sc);
  return m;
})();

// pre-render 推进模式: 模拟从 pre-render 状态推进 240(无 dummy) / 241(有 dummy) 次,
// 与实际 scrollEnd (cntV/cntVT) 比对。仅 240 命中 → pr=0 (pre-render 不推进);
// 其余(241 命中 / 两者皆中 / 皆不中) → pr=1 (保持 H5 既有 dummy 推进行为,
// tecmo logo / 字幕 / 帘幕 f3730 / ending 均实证匹配)。
function advanceOnce(st) {
  let fv = st.cntFV, vt = st.cntVT, v = st.cntV;
  fv++;
  if (fv === 8) {
    fv = 0; vt++;
    if (vt === 30) { vt = 0; v++; v %= 2; }
    else if (vt === 32) { vt = 0; }
  }
  return { cntFV: fv, cntVT: vt, cntV: v };
}
function advanceN(st, n) { let s = st; for (let i = 0; i < n; i++) s = advanceOnce(s); return s; }
function computePr(pre, st) {
  if (!pre || !st || !st.scrollEnd) return 1;
  const base = { cntFV: pre.cntFV, cntVT: pre.cntVT, cntV: pre.cntV };
  const e240 = advanceN(base, 240);
  const e241 = advanceN(base, 241);
  const m240 = e240.cntV === st.scrollEnd.cntV && e240.cntVT === st.scrollEnd.cntVT;
  const m241 = e241.cntV === st.scrollEnd.cntV && e241.cntVT === st.scrollEnd.cntVT;
  return m240 && !m241 ? 0 : 1;
}

const frames = [];
let prevChr = [0, 1, 2, 3, 252, 113, 82, 83]; // boot 期 CHR
let prevOam = new Array(64).fill(null).map(() => ({ y: 0xf8, tile: 0, attr: 0, x: 0 }));
let prevPal = null;
// 首帧必须输出全部非零属性行(与 prevOam/prevNtTiles 的"空白起点"语义一致),
// 否则 H5 从空白 NT 起步永远拿不到初始 attr 状态。
let prevAttrRows = [0, 1, 2, 3].map(() => Array.from({ length: 8 }, () => new Array(8).fill(0)));
let prevNtTiles = null;

for (let f = F0; f <= F1; f++) {
  const dir = path.join(IN_DIR, 'frame-' + String(f).padStart(4, '0'));
  const nt = readJson(path.join(dir, 'nt.json'));
  const oam = readJson(path.join(dir, 'oam.json'));
  const pal = readJson(path.join(dir, 'palette.json'));
  const st = readJson(path.join(dir, 'state.json'));
  const chrSw = readJson(path.join(dir, 'chr-switches.json'));

  // CHR 计划: 帧顶状态 = 上一帧终态, followed by bankMapByScanline 切换点
  // 切换点 scanline 是 emu 内部 PPU scanline,必须换算成 H5 的 buffer row。
  const chrPlan = [{ s: 0, b: prevChr.slice() }];
  if (chrSw && Array.isArray(chrSw.bankMapByScanline)) {
    for (const e of chrSw.bankMapByScanline) {
      chrPlan.push({ s: chrScanToBufferRow(e.scanline), b: e.banks.slice() });
    }
  }

  // OAM diff
  const oamDiff = [];
  for (let i = 0; i < 64; i++) {
    const a = oam[i];
    const b = prevOam[i];
    if (a.y !== b.y || a.tile !== b.tile || a.attr !== b.attr || a.x !== b.x) {
      oamDiff.push([i, a.y, a.tile, a.attr, a.x]);
    }
  }
  prevOam = oam.map(o => ({ y: o.y, tile: o.tile, attr: o.attr, x: o.x }));

  // palette diff: 只存完整 32 个色(太小,不压缩),但仅在变化时存
  let p = null;
  if (!prevPal || prevPal.bg.some((v, i) => v !== pal.bg[i]) || prevPal.spr.some((v, i) => v !== pal.spr[i])) {
    p = { bg: pal.bg.slice(), spr: pal.spr.slice() };
    prevPal = p;
  }

  // NT tile diff 行(0..29)
  const ntDiff = [];
  const curNtTiles = [];
  for (let ni = 0; ni < 4; ni++) {
    const tile = nt[ni].tile.slice(0, 960);
    curNtTiles.push(tile);
    for (let r = 0; r < 30; r++) {
      let diff = false;
      for (let c = 0; c < 32; c++) {
        const idx = r * 32 + c;
        if (!prevNtTiles || prevNtTiles[ni][idx] !== tile[idx]) { diff = true; break; }
      }
      if (diff) {
        const d = [];
        for (let c = 0; c < 32; c++) d.push(tile[r * 32 + c]);
        ntDiff.push({ ni, r, d });
      }
    }
  }
  prevNtTiles = curNtTiles;

  // 属性表 diff 行(0..7)
  const curAttrRows = nt.map((n) => attrsFromTile960(n.attrib));
  const attrDiff = attrTileDiff(prevAttrRows, curAttrRows);
  prevAttrRows = curAttrRows;

  // 本帧终态 CHR 供下一帧顶部使用
  prevChr = (st && Array.isArray(st.chrBanks)) ? st.chrBanks.slice() : chrPlan[chrPlan.length - 1].b.slice();

  // scroll: 取 pre-render 时刻 scroll 真值（vblank $2005/$2006 写入之后）。
  // state.json.scroll 是帧循环开始前捕获（vblank 写入之前），不是 PPU 实际渲染值；
  // scroll-prerender.json 在第一条可见扫描线(scan 0)捕获，与 emu screen.png 一致。
  const pre = scrollPre ? scrollPre.get(f) : null;
  const s = pre ? {
    v: pre.regV ?? 0,
    h: pre.regH ?? 0,
    vt: pre.regVT ?? 0,
    ht: pre.regHT ?? 0,
    fv: pre.regFV ?? 0,
    fh: pre.regFH ?? 0,
    cv: pre.cntV ?? pre.regV ?? 0,
    ch: pre.cntH ?? pre.regH ?? 0,
    cvt: pre.cntVT ?? pre.regVT ?? 0,
    cht: pre.cntHT ?? pre.regHT ?? 0,
  } : {
    v: 0, h: 0, vt: 0, ht: 0, fv: 0, fh: 0,
    cv: 0, ch: 0, cvt: 0, cht: 0,
  };

  // 帧中横向滚动切换点（mid-frame $2005 写入）
  const sc = scrollScan ? scrollScan.get(f) : null;

  // pre-render 推进模式 (见 computePr)
  s.pr = computePr(pre, st);

  frames.push({
    f,
    c: chrPlan,
    p,
    o: oamDiff,
    n: ntDiff,
    a: attrDiff,
    s,
    sc,
  });
}

// 输出到 12 个场景分文件（保持与现有文件结构一致）
const scenes = [
  { idx: 1, name: 'opening-tecmo-start', f0: 10, f1: 342, title: 'tecmo-start' },
  { idx: 2, name: 'opening-title-1', f0: 343, f1: 818, title: 'title-1' },
  { idx: 3, name: 'opening-title-2', f0: 819, f1: 824, title: 'title-2' },
  { idx: 4, name: 'opening-subtitle-1', f0: 825, f1: 1039, title: 'subtitle-1' },
  { idx: 5, name: 'opening-subtitle-2', f0: 1040, f1: 1495, title: 'subtitle-2' },
  { idx: 6, name: 'opening-subtitle-3', f0: 1496, f1: 1720, title: 'subtitle-3' },
  { idx: 7, name: 'opening-subtitle-4', f0: 1721, f1: 2140, title: 'subtitle-4' },
  { idx: 8, name: 'opening-subtitle-5', f0: 2141, f1: 2363, title: 'subtitle-5' },
  { idx: 9, name: 'opening-subtitle-6', f0: 2364, f1: 2816, title: 'subtitle-6' },
  { idx: 10, name: 'opening-subtitle-7', f0: 2817, f1: 3040, title: 'subtitle-7' },
  { idx: 11, name: 'opening-ending-scroll', f0: 3041, f1: 4095, title: 'ending-scroll' },
  { idx: 12, name: 'opening-ending-end', f0: 4096, f1: 4200, title: 'ending-end' },
];

function frameToLine(fr) {
  const cs = fr.c.map(e => `{s:${e.s},b:[${e.b.join(',')}]}`).join(',');
  const pstr = fr.p ? `{bg:[${fr.p.bg.join(',')}],spr:[${fr.p.spr.join(',')}]}` : 'null';
  const ostr = fr.o.map(a => `[${a.join(',')}]`).join(',');
  const nstr = fr.n.map(r => `{ni:${r.ni},r:${r.r},d:[${r.d.join(',')}]}`).join(',');
  const astr = fr.a.map(r => `{ni:${r.ni},r:${r.r},d:[${r.d.join(',')}]}`).join(',');
  const sstr = `{v:${fr.s.v},h:${fr.s.h},vt:${fr.s.vt},ht:${fr.s.ht},fv:${fr.s.fv},fh:${fr.s.fh},cv:${fr.s.cv},ch:${fr.s.ch},cvt:${fr.s.cvt},cht:${fr.s.cht},pr:${fr.s.pr ?? 1}}`;
  const scstr = (fr.sc && fr.sc.length)
    ? ',sc:[' + fr.sc.map(o => `{s:${o.s},h:${o.h},ht:${o.ht},fh:${o.fh}}`).join(',') + ']'
    : '';
  return `  {f:${fr.f},c:[${cs}],p:${pstr},o:[${ostr}],n:[${nstr}],a:[${astr}],s:${sstr}${scstr}}`;
}

for (const sc of scenes) {
  const slice = frames.filter(fr => fr.f >= sc.f0 && fr.f <= sc.f1);
  const chunks = [];
  chunks.push(`/**\n * 片头画面 ${sc.idx}/12 — ${sc.title} (帧 f${sc.f0}-f${sc.f1})\n * 画面边界 = NT+ATTR 全屏重绘帧 (数据驱动), 机械拆分自 OpeningFrameTable.ts\n */\n`);
  chunks.push(`import type { OpeningFrameEntry } from './OpeningFrameTypes';\n\n`);
  chunks.push(`export const OPENING_FRAMES_SCENE_${sc.idx}: ReadonlyArray<OpeningFrameEntry> = [`);
  chunks.push(slice.map(frameToLine).join(',\n'));
  chunks.push(`];\n`);
  fs.writeFileSync(path.join(OUT_DIR, 'opening', sc.name + '.ts'), chunks.join('\n'));
  console.log(`scene ${sc.idx}/${sc.title}: f${sc.f0}-f${sc.f1} (${slice.length} frames) → src/game/prg/data/scene/opening/${sc.name}.ts`);
}

console.log(`generated ${frames.length} frames across ${scenes.length} scene files`);
