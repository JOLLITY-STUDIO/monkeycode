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
const F1 = 3599;

const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

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
  const chrPlan = [{ s: 0, b: prevChr.slice() }];
  if (chrSw && Array.isArray(chrSw.bankMapByScanline)) {
    for (const e of chrSw.bankMapByScanline) {
      chrPlan.push({ s: e.scanline, b: e.banks.slice() });
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

  frames.push({
    f,
    c: chrPlan,
    p,
    o: oamDiff,
    n: ntDiff,
    a: attrDiff,
  });
}

// 生成 TypeScript
const chunks = [];
chunks.push(`/**\n * OpeningFrameTable — 片头逐帧 Ground Truth\n * 来源:emu-full f${F0}-f${F1}\n * 字段含义:\n *   f: NES 帧号\n *   c: CHR scanline 计划 [{s:scanline, b:[8 bank1k]}]\n *   p: palette {bg,sp} 或 null(与上帧相同)\n *   o: OAM diff [[idx,y,tile,attr,x],...]\n *   n: NT tile 变化行 [{ni,r,d[32]}]\n *   a: 属性表变化行 [{ni,r,d[8]}]\n */\n`);
chunks.push(`export interface OpeningFrameChr { s: number; b: ReadonlyArray<number>; }\n`);
chunks.push(`export interface OpeningFrameNtRow { ni: number; r: number; d: ReadonlyArray<number>; }\n`);
chunks.push(`export interface OpeningFrameEntry {\n  readonly f: number;\n  readonly c: ReadonlyArray<OpeningFrameChr>;\n  readonly p: { readonly bg: ReadonlyArray<number>; readonly spr: ReadonlyArray<number> } | null;\n  readonly o: ReadonlyArray<ReadonlyArray<number>>;\n  readonly n: ReadonlyArray<OpeningFrameNtRow>;\n  readonly a: ReadonlyArray<OpeningFrameNtRow>;\n}\n`);
chunks.push(`export const OPENING_FRAMES: ReadonlyArray<OpeningFrameEntry> = [`);

const lines = [];
for (const fr of frames) {
  const cs = fr.c.map(e => `{s:${e.s},b:[${e.b.join(',')}]}`).join(',');
  const pstr = fr.p ? `{bg:[${fr.p.bg.join(',')}],spr:[${fr.p.spr.join(',')}]}` : 'null';
  const ostr = fr.o.map(a => `[${a.join(',')}]`).join(',');
  const nstr = fr.n.map(r => `{ni:${r.ni},r:${r.r},d:[${r.d.join(',')}]}`).join(',');
  const astr = fr.a.map(r => `{ni:${r.ni},r:${r.r},d:[${r.d.join(',')}]}`).join(',');
  lines.push(`  {f:${fr.f},c:[${cs}],p:${pstr},o:[${ostr}],n:[${nstr}],a:[${astr}]}`);
}
chunks.push(lines.join(',\n'));
chunks.push(`];\n`);
chunks.push(`export function getOpeningFrame(nesFrame: number): OpeningFrameEntry | undefined {\n  const idx = nesFrame - ${F0};\n  return idx >= 0 && idx < OPENING_FRAMES.length ? OPENING_FRAMES[idx] : undefined;\n}\n`);

fs.writeFileSync(path.join(OUT_DIR, 'OpeningFrameTable.ts'), chunks.join('\n'));

console.log(`generated ${frames.length} frames → src/game/prg/data/scene/OpeningFrameTable.ts`);
console.log(`first frame f${frames[0].f} chrPlan groups=${frames[0].c.length}`);
console.log(`last  frame f${frames[frames.length - 1].f} chrPlan groups=${frames[frames.length - 1].c.length}`);
