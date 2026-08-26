/**
 * _scene0_gt.cjs — 提取 Scene0 窗口 (f3600-f4096) 逐帧 GT
 *
 * 每帧读 oam.json + nt.json + palette.json + state.json（轻量小文件），输出：
 *   output/opening/scene0-gt.json   — 逐帧 compact (oam摘要 + nt0签名 + pal + chr + pc)
 *   output/opening/scene0-timeline.txt — 人类可读，每 8 帧一行
 *
 * 用途：校准 H5 Scene0Controller 的 phase 时序（FadeIn/BgFadeOut/Wait16/Drift30/...）。
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'output', 'emu-full');
const OUT = path.join(__dirname, '..', 'output', 'opening');
fs.mkdirSync(OUT, { recursive: true });

const F0 = 3600, F1 = 4096;

function rd(f, name) {
  return JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'frame-' + String(f).padStart(4, '0'), name), 'utf8'));
}

// OAM 摘要: 非隐藏 sprite 列表 [y,x,tile,attr]
function oamSig(oam) {
  const vis = [];
  let yMin = 255, yMax = -1, xMin = 255, xMax = -1, cnt = 0;
  for (const o of oam) {
    if (o.y >= 0xef) continue;
    cnt++;
    if (o.y < yMin) yMin = o.y;
    if (o.y > yMax) yMax = o.y;
    if (o.x < xMin) xMin = o.x;
    if (o.x > xMax) xMax = o.x;
    vis.push([o.y, o.x, o.tile, o.attr]);
  }
  return { cnt, yMin, yMax, xMin, xMax, sprites: vis };
}

// NT0 tile 签名: 直方图 + 非零 tile 数
function nt0Sig(nt) {
  const t = nt[0];
  const hist = new Map();
  let nonZero = 0;
  for (const v of t.tile) {
    if (v !== 0) nonZero++;
    hist.set(v, (hist.get(v) || 0) + 1);
  }
  return { nonZero, hist: Array.from(hist.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8) };
}

const frames = [];
let prev = null;
let nt0Str = '';
const changes = [];
for (let f = F0; f <= F1; f++) {
  const dir = 'frame-' + String(f).padStart(4, '0');
  if (!fs.existsSync(path.join(OUT_DIR, dir, 'oam.json'))) continue;
  const oam = rd(f, 'oam.json');
  const pal = rd(f, 'palette.json');
  const nt = rd(f, 'nt.json');
  const st = rd(f, 'state.json');
  const os = oamSig(oam);
  const ns = nt0Sig(nt);
  const nStr = JSON.stringify(ns.hist);
  if (nStr !== nt0Str) { changes.push({ f, nt: ns }); nt0Str = nStr; }
  const rec = {
    f,
    pc: st.pc,
    chr: st.chrBanks ? st.chrBanks.slice() : [],
    oam: os,
    bg: pal.bg.slice(0, 16),
    spr: pal.spr ? pal.spr.slice(0, 16) : (pal.sp ? pal.sp.slice(0, 16) : []),
    nt0: { nonZero: ns.nonZero, top: ns.hist.slice(0, 4) },
  };
  frames.push(rec);
  prev = rec;
}

fs.writeFileSync(path.join(OUT, 'scene0-gt.json'), JSON.stringify(frames));
fs.writeFileSync(path.join(OUT, 'scene0-nt-changes.json'), JSON.stringify(changes, null, 2));

// ── 人类可读输出 ──
const L = [];
L.push(`=== Scene0 GT (f${F0}-f${F1}) === frames=${frames.length}`);
L.push(`NT tile 直方图变化点: ${changes.length} 处`);
for (const c of changes) L.push(`  f${c.f} nt0 ${c.nt.nonZero} tiles top=[${c.nt.hist.map(([v, n]) => v + ':' + n).join(' ')}]`);
L.push('');
for (let i = 0; i < frames.length; i += 8) {
  const r = frames[i];
  const o = r.oam;
  L.push(
    `f${String(r.f).padStart(4)} pc=${r.pc.toString(16).padStart(4)} chr=[${r.chr.join(',')}]` +
    ` oam=${o.cnt} y=${o.yMin}..${o.yMax} x=${o.xMin}..${o.xMax}` +
    ` nt0=${r.nt0.nonZero} bg=${r.bg.map((v) => v.toString(16)).join('')}`,
  );
  const first = o.sprites.slice(0, 3).map((s) => `[y${s[0]} x${s[1]} t${s[2]} a${s[3].toString(16)}]`).join(' ');
  if (first) L.push(`    sp: ${first}`);
}
fs.writeFileSync(path.join(OUT, 'scene0-timeline.txt'), L.join('\n'));
console.log(L.slice(0, 30).join('\n'));
console.log('\nwritten: scene0-gt.json / scene0-timeline.txt');
