/**
 * _emu_full_timeline.cjs — 从 emu-full 4332 帧 dump 重建全场渲染状态时间线
 *
 * 每帧读取 state.json + palette.json（轻量），计算渲染签名：
 *   chrBanks[8] + bgPal[16] + sprPal[16] + nTblAddress/bgTable/spTable + pc
 * 相邻帧签名变化 → 相位切换点（phase）。
 *
 * 输出：output/opening/emu-full-phases.json / emu-full-timeline.txt
 * 用途：定位每个场景（boot logo / opening / title ...）的真实帧窗口，
 *       校准 H5 Scene0Controller 时序（当前假设 frame 26 起，emu 实测在 f3600+）。
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'output', 'emu-full');
const OUT = path.join(__dirname, '..', 'output', 'opening');
fs.mkdirSync(OUT, { recursive: true });

const dirs = fs.readdirSync(OUT_DIR)
  .filter((d) => /^frame-\d+$/.test(d))
  .sort((a, b) => +a.slice(6) - +b.slice(6));
console.log('frame dirs:', dirs.length);

const sigCache = new Map();
function loadSig(d) {
  if (sigCache.has(d)) return sigCache.get(d);
  const st = JSON.parse(fs.readFileSync(path.join(OUT_DIR, d, 'state.json'), 'utf8'));
  const pal = JSON.parse(fs.readFileSync(path.join(OUT_DIR, d, 'palette.json'), 'utf8'));
  const s = {
    f: st.frame,
    pc: st.pc,
    chr: st.chrBanks ? st.chrBanks.slice() : [],
    nTbl: st.nTblAddress,
    bgTable: st.bgTable,
    spTable: st.spTable,
    bg: pal.bg ? pal.bg.slice(0, 16) : [],
    spr: pal.spr ? pal.spr.slice(0, 16) : (pal.sp ? pal.sp.slice(0, 16) : []),
    prg: st.prgBankMap || {},
  };
  sigCache.set(d, s);
  return s;
}

// ── 相位检测 ──
const phases = [];
let last = null;
let lastSigStr = '';
let phaseStart = 0;
const pcRanges = {}; // 每个 phase 的 pc 范围（定位代码区域）
for (let i = 0; i < dirs.length; i++) {
  const d = dirs[i];
  let s;
  try { s = loadSig(d); } catch (e) { console.log('skip', d, e.message); continue; }
  const sigStr = JSON.stringify([s.chr, s.bg, s.spr, s.nTbl, s.bgTable, s.spTable]);
  if (sigStr !== lastSigStr) {
    if (last) phases[phases.length - 1].end = last.f;
    const ph = { start: s.f, end: s.f, frames: 1, pcMin: s.pc, pcMax: s.pc, chr: s.chr, bg: s.bg, spr: s.spr, nTbl: s.nTbl, bgTable: s.bgTable, spTable: s.spTable, prg: s.prg };
    phases.push(ph);
    lastSigStr = sigStr;
    last = s;
    phaseStart = i;
  } else {
    const ph = phases[phases.length - 1];
    ph.end = s.f;
    ph.frames++;
    if (s.pc < ph.pcMin) ph.pcMin = s.pc;
    if (s.pc > ph.pcMax) ph.pcMax = s.pc;
    last = s;
  }
}
if (last) phases[phases.length - 1].end = last.f;

console.log('phases:', phases.length);

// ── 输出 ──
fs.writeFileSync(path.join(OUT, 'emu-full-phases.json'), JSON.stringify(phases, null, 2));

const L = [];
L.push('=== emu-full 全场渲染时间线 (4332 frames) ===');
L.push(`total frames: ${dirs.length}  phases: ${phases.length}`);
L.push('');
for (const p of phases) {
  const chrS = p.chr.join(',');
  const palBgS = p.bg.map((v) => v.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  const palSpS = p.spr.map((v) => v.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  L.push(
    `f${String(p.start).padStart(4)}-${String(p.end).padStart(4)} (${String(p.frames).padStart(4)}f)` +
    ` pc=${p.pcMin.toString(16)}-${p.pcMax.toString(16)}` +
    ` nTbl=${p.nTbl} bg=${p.bgTable} sp=${p.spTable}` +
    `\n    chr=[${chrS}]` +
    `\n    bgPal=[${palBgS}]` +
    `\n    spPal=[${palSpS}]`,
  );
}
fs.writeFileSync(path.join(OUT, 'emu-full-timeline.txt'), L.join('\n'));
console.log('written:', path.join(OUT, 'emu-full-timeline.txt'));
