// _emu_timeline.cjs — 扫描 emu-full/frame-NNN/state.json，重建 Scene0 时序
const fs = require('fs');
const path = require('path');
const dir = 'output/emu-full';
if (!fs.existsSync(dir)) { console.log('MISSING ' + dir); process.exit(0); }
const frames = fs.readdirSync(dir).filter((n) => n.startsWith('frame-')).sort((a, b) => +a.replace('frame-', '') - +b.replace('frame-', ''));
console.log('emu-full frames:', frames.length, '首:', frames[0], '末:', frames[frames.length - 1]);

// 采样每帧关键 RAM + OAM 可见数 + palette 摘要
const events = [];
let lastSig = '';
for (const f of frames) {
  const n = +f.replace('frame-', '');
  const fp = path.join(dir, f, 'state.json');
  if (!fs.existsSync(fp)) continue;
  const st = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const palP = path.join(dir, f, 'palette.json');
  let bgPal = null, sprPal = null;
  if (fs.existsSync(palP)) {
    const pal = JSON.parse(fs.readFileSync(palP, 'utf8'));
    bgPal = (pal.bg || pal.bgRaw || []).join(',');
    sprPal = (pal.spr || pal.sp || []).join(',');
  }
  const oamP = path.join(dir, f, 'oam.json');
  let oamVisible = -1, oamY0 = -1;
  if (fs.existsSync(oamP)) {
    try {
      const oam = JSON.parse(fs.readFileSync(oamP, 'utf8'));
      const arr = Array.isArray(oam) ? oam : oam.sprites || [];
      oamVisible = arr.filter((s) => s.y && s.y !== 0xff).length;
      oamY0 = arr.length ? arr[0].y : -1;
    } catch (e) {}
  }
  const sig = `${st.ram_0044}|${st.ram_001B}|${st.ram_0628}|${oamVisible}|${oamY0}|${bgPal}|${sprPal}`;
  if (sig !== lastSig) {
    events.push({ frame: n, r44: st.ram_0044, r1b: st.ram_001B, r628: st.ram_0628, oamVisible, oamY0, bgPal, sprPal });
    lastSig = sig;
  }
}
// 只输出 3600+ 的 Scene0 窗口
const scene0 = events.filter((e) => e.frame >= 3600);
console.log('=== emu-full Scene0 窗口 (f3600+) 状态变化 ===');
for (const e of scene0) {
  console.log(
    `f${String(e.frame).padStart(5)} r44=${String(e.r44).padStart(3)} r1B=${String(e.r1b).padStart(3)} r628=${String(e.r628).padStart(3)}` +
    ` oam=${String(e.oamVisible).padStart(3)} oamY0=${String(e.oamY0).padStart(3)} bg=[${e.bgPal}] spr=[${e.sprPal}]`,
  );
}
