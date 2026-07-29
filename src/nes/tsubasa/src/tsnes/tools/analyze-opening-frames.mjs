import { readFileSync, writeFileSync } from 'fs';

const d = readFileSync('trace/Captain Tsubasa II - Super Striker (Japan)-openning2.log', 'utf8');
const lines = d.split('\n');

// === 1. Frame summary: which frames have PPU activity ===
const frameMap = new Map();
lines.forEach((l, i) => {
  const f = l.match(/^f(\d+)/);
  if (!f) return;
  const fn = parseInt(f[1]);
  if (!frameMap.has(fn)) frameMap.set(fn, []);
  frameMap.get(fn).push(i);
});

const frames = [...frameMap.keys()].sort((a, b) => a - b);
console.log('Total frames:', frames.length, 'Range:', frames[0], '-', frames[frames.length - 1]);

// === 2. Find frames with PPU writes ===
const ppuFrames = [];
frames.forEach(fn => {
  let hasPPU = false;
  frameMap.get(fn).forEach(i => {
    for (let r = 0; r <= 7; r++) if (lines[i].includes('$200' + r)) hasPPU = true;
  });
  if (hasPPU) ppuFrames.push(fn);
});

console.log('Frames with PPU writes: ' + ppuFrames.length);
console.log('First 10:', ppuFrames.slice(0, 10).join(', '));
console.log('Last 10:', ppuFrames.slice(-10).join(', '));

// === 3. Analyze f5 (first frame with substantial PPU) ===
console.log('\n========================================');
console.log('=== FRAME f5 (first with PPU writes) ===');
console.log('========================================');
const f5 = frameMap.get(5);
if (f5) {
  console.log('Line count:', f5.length);
  f5.forEach(i => {
    let ppu = false;
    for (let r = 0; r <= 7; r++) if (lines[i].includes('$200' + r)) ppu = true;
    if (ppu) console.log('#' + i + ' ' + lines[i].substring(0, 220));
  });
}

// === 4. Find a busy rendering frame (lots of PPU writes) ===
let bestFrame = -1, bestCount = 0;
ppuFrames.forEach(fn => {
  let cnt = 0;
  frameMap.get(fn).forEach(i => {
    for (let r = 0; r <= 7; r++) if (lines[i].includes('$200' + r)) cnt++;
  });
  if (cnt > bestCount) { bestCount = cnt; bestFrame = fn; }
});
console.log('\nBest frame for PPU study:', bestFrame, '(' + bestCount + ' PPU writes)');

// === 5. Dump that busy frame ===
console.log('\n========================================');
console.log('=== FRAME f' + bestFrame + ' (most PPU) ===');
console.log('========================================');
const busy = frameMap.get(bestFrame);
if (busy) {
  let ppuCount = 0;
  busy.forEach(i => {
    for (let r = 0; r <= 7; r++) {
      if (lines[i].includes('$200' + r)) {
        ppuCount++;
        break;
      }
    }
  });
  console.log('Line count:', busy.length, 'PPU lines:', ppuCount);

  // Show key segments: NMI entry, PPU writes, bank switches
  const target = busy;
  console.log('\n--- First 30 lines ---');
  target.slice(0, 30).forEach(i => console.log('#' + i + ' ' + lines[i].substring(0, 200)));

  console.log('\n--- PPU writes ---');
  target.forEach(i => {
    for (let r = 0; r <= 7; r++) {
      if (lines[i].includes('$200' + r)) {
        console.log('#' + i + ' ' + lines[i].substring(0, 200));
        break;
      }
    }
  });
}

// === 6. Bank switches across all frames ===
console.log('\n=== ALL BANK SWITCHES ===');
lines.forEach((l, i) => {
  if (l.includes('STA $8000') || l.includes('STA $8001')) {
    const f = l.match(/^f(\d+)/);
    const a = l.match(/A:(\$?[0-9A-Fa-f]+)/);
    const reg = l.includes('$8000') ? '8000' : '8001';
    console.log('#' + i + ' f' + (f ? f[1] : '?') + ' STA $' + reg + ' = ' + (a ? a[1] : '?'));
  }
});
