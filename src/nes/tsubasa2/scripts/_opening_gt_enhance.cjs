/**
 * _opening_gt_enhance.cjs — 为每屏生成增强 GT：
 *   fadeInFrames / stableFrames / fadeOutFrames / keyFrames(start/mid/end 的 pal/nt/oam/chr)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'output', 'opening');
const screens = JSON.parse(fs.readFileSync(path.join(OUT, 'opening-screens.json'), 'utf8'));
const EMU = path.join(__dirname, '..', 'output', 'emu-full');

function load(f, name) {
  return JSON.parse(fs.readFileSync(path.join(EMU, 'frame-' + String(f).padStart(4, '0'), name), 'utf8'));
}
function brightness(pal) {
  let max = 0, sum = 0, n = 0;
  for (const v of pal) {
    const b = v & 0x3f;
    if (b > max) max = b;
    sum += b; n++;
  }
  return { max, avg: n ? sum / n : 0 };
}

const enhanced = [];
for (const s of screens) {
  // 逐帧亮度扫描（只采样 start/end 附近，避免读 400 帧）
  const scan = [];
  for (let f = s.start; f <= s.end; f++) {
    const pal = load(f, 'palette.json');
    const bg = brightness(pal.bg);
    const spr = brightness(pal.spr);
    scan.push({ f, bgMax: bg.max, bgAvg: bg.avg, sprMax: spr.max });
  }
  // 判定 fade 边界：以 bg 最大亮度为主
  let firstBright = s.start, lastBright = s.end;
  // 找第一个 bgMax >= 0x25 的帧（满亮阈值）
  for (const x of scan) {
    if (x.bgMax >= 0x25) { firstBright = x.f; break; }
  }
  // 找最后一个 bgMax >= 0x25 的帧
  for (let i = scan.length - 1; i >= 0; i--) {
    if (scan[i].bgMax >= 0x25) { lastBright = scan[i].f; break; }
  }
  const fadeInFrames = Math.max(0, firstBright - s.start);
  const fadeOutFrames = Math.max(0, s.end - lastBright);
  const stableFrames = Math.max(0, lastBright - firstBright + 1);

  const keyFrames = {
    start: { f: s.start, pal: load(s.start, 'palette.json'), nt: load(s.start, 'nt.json'), oam: load(s.start, 'oam.json'), state: load(s.start, 'state.json') },
    mid: { f: s.midFrame, pal: load(s.midFrame, 'palette.json'), nt: load(s.midFrame, 'nt.json'), oam: load(s.midFrame, 'oam.json'), state: load(s.midFrame, 'state.json') },
    end: { f: s.end, pal: load(s.end, 'palette.json'), nt: load(s.end, 'nt.json'), oam: load(s.end, 'oam.json'), state: load(s.end, 'state.json') },
  };

  enhanced.push({
    ...s,
    fadeInFrames,
    stableFrames,
    fadeOutFrames,
    firstBright,
    lastBright,
    keyFrames,
  });
}

fs.writeFileSync(path.join(OUT, 'opening-screens-enhanced.json'), JSON.stringify(enhanced));

const L = [];
L.push('=== Opening screens enhanced ===');
for (const s of enhanced) {
  L.push(
    `f${String(s.start).padStart(4)}-${String(s.end).padStart(4)} (${String(s.frames).padStart(4)}f)` +
    ` fadeIn=${s.fadeInFrames.toString().padStart(2)} stable=${s.stableFrames.toString().padStart(4)} fadeOut=${s.fadeOutFrames.toString().padStart(2)}` +
    ` chr=[${s.chr.join(',')}]`,
  );
}
fs.writeFileSync(path.join(OUT, 'opening-screens-enhanced.txt'), L.join('\n'));
console.log(L.join('\n'));
console.log('\nwritten: opening-screens-enhanced.json');
