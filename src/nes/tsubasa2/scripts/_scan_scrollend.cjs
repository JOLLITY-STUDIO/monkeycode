// 临时诊断: 扫描 emu scroll-prerender + state.json scrollEnd + GT OpeningFrameTable s 字段
const fs = require('fs');
const path = require('path');

const pre = JSON.parse(fs.readFileSync('output/emu-full/scroll-prerender.json', 'utf8'));
const ks = Object.keys(pre).map(Number).sort((a, b) => a - b);
console.log('scroll-prerender keys:', ks.length, 'first', ks[0], 'last', ks[ks.length - 1]);

function pick(f) {
  try {
    const j = JSON.parse(fs.readFileSync(`output/emu-full/frame-${String(f).padStart(4, '0')}/state.json`, 'utf8'));
    return j.scrollEnd || null;
  } catch { return null; }
}

const range = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 390, 400, 410, 420, 430, 440, 449, 450, 451, 460, 470];
for (const f of range) {
  const p = pre[String(f)];
  const end = pick(f);
  console.log(`f${f} pre=${p ? JSON.stringify(p) : 'MISS'} end=${end ? JSON.stringify(end) : 'MISS'}`);
}
