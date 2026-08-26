/**
 * _opening_gt.cjs — 提取开场动画全部"屏"(结构段)的完整 GT 数据
 *
 * 对 emu-full 4332 帧做结构分段(chr/nTbl/bgTable/spTable 签名), 每个 ≥30 帧的长段
 * 视为一"屏", 提取:
 *   - 帧窗口 start/end/frames
 *   - 代表帧(中帧)的完整数据: nt(4表 tile+attrib) / oam(64) / palette(bg+spr) / chr / pc
 *   - 首帧/末帧 palette(fade 状态)
 *
 * 输出: output/opening/opening-screens.json (H5 可 import) + opening-screens.txt
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'output', 'emu-full');
const OUT = path.join(__dirname, '..', 'output', 'opening');
fs.mkdirSync(OUT, { recursive: true });

const dirs = fs.readdirSync(OUT_DIR)
  .filter((d) => /^frame-\d+$/.test(d))
  .sort((a, b) => +a.slice(6) - +b.slice(6));

function rd(dir, name) {
  return JSON.parse(fs.readFileSync(path.join(OUT_DIR, dir, name), 'utf8'));
}

// ── 结构分段 ──
const segments = [];
let cur = null;
for (const d of dirs) {
  const st = rd(d, 'state.json');
  const sig = JSON.stringify([st.chrBanks, st.nTblAddress, st.bgTable, st.spTable]);
  if (!cur || cur.sig !== sig) {
    cur = { sig, start: st.frame, end: st.frame, chr: st.chrBanks.slice() };
    segments.push(cur);
  } else {
    cur.end = st.frame;
  }
}
console.log('segments:', segments.length);

// ── 每屏数据 ──
const screens = [];
for (const seg of segments) {
  const frames = seg.end - seg.start + 1;
  if (frames < 30) continue; // 过渡段跳过
  const mid = Math.floor((seg.start + seg.end) / 2);
  const d = 'frame-' + String(mid).padStart(4, '0');
  const st = rd(d, 'state.json');
  const pal = rd(d, 'palette.json');
  const oam = rd(d, 'oam.json');
  const nt = rd(d, 'nt.json');
  const firstPal = rd('frame-' + String(seg.start).padStart(4, '0'), 'palette.json');
  const lastPal = rd('frame-' + String(seg.end).padStart(4, '0'), 'palette.json');
  screens.push({
    start: seg.start,
    end: seg.end,
    frames,
    chr: seg.chr,
    pc: st.pc,
    midFrame: mid,
    // 代表帧完整数据
    nt: nt.map((n) => ({ tile: n.tile, attrib: n.attrib })),
    oam: oam.map((o) => [o.y, o.tile, o.attr, o.x]),
    pal: { bg: pal.bg, spr: pal.spr },
    palFirst: { bg: firstPal.bg, spr: firstPal.spr },
    palLast: { bg: lastPal.bg, spr: lastPal.spr },
  });
}

fs.writeFileSync(path.join(OUT, 'opening-screens.json'), JSON.stringify(screens));

// ── 报告 ──
const L = [];
L.push('=== Opening screens GT (emu-full) ===');
L.push(`screens: ${screens.length}`);
for (const s of screens) {
  // 可见 sprite 数
  const vis = s.oam.filter((o) => o[0] < 0xef).length;
  const yMin = Math.min(...s.oam.filter((o) => o[0] < 0xef).map((o) => o[0]));
  const yMax = Math.max(...s.oam.filter((o) => o[0] < 0xef).map((o) => o[0]));
  const xMin = Math.min(...s.oam.filter((o) => o[0] < 0xef).map((o) => o[3]));
  const xMax = Math.max(...s.oam.filter((o) => o[0] < 0xef).map((o) => o[3]));
  const ntNonZero = s.nt.map((n) => n.tile.filter((v) => v !== 0).length);
  L.push(
    `f${String(s.start).padStart(4)}-${String(s.end).padStart(4)} (${String(s.frames).padStart(4)}f)` +
    ` chr=[${s.chr.join(',')}] pc=${s.pc.toString(16)}` +
    ` oam=${vis} (y${yMin}..${yMax} x${xMin}..${xMax})` +
    ` ntNZ=[${ntNonZero.join(',')}]`,
  );
}
fs.writeFileSync(path.join(OUT, 'opening-screens.txt'), L.join('\n'));
console.log(L.join('\n'));
console.log('\nwritten: opening-screens.json (' + (fs.statSync(path.join(OUT, 'opening-screens.json')).size / 1024).toFixed(1) + ' KB) / opening-screens.txt');
