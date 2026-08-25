// 对比 emu Scene0 满亮 BG/SPR palette 与 opening-data.ts 表
const fs = require('fs');
const src = fs.readFileSync('src/game/prg/data/scene/opening-data.ts', 'utf8');
function extract(name) {
  const re = new RegExp(name + '\\s*[:=]\\s*\\[([\\s\\S]*?)\\]\\s*;', 'm');
  const m = src.match(re);
  if (!m) return null;
  const arr = eval('[' + m[1].replace(/\/\/.*$/gm, '') + ']');
  return arr.map((x) => (Array.isArray(x) ? x.map((y) => y & 0xff) : x));
}
const bg = extract('OPENING_BG_PALETTES');
const spr = extract('OPENING_SPR_PALETTES');
console.log('OPENING_BG_PALETTES len:', bg && bg.length);
if (bg) bg.forEach((p, i) => console.log('  bg[' + i + '] = ' + p.join(',')));
console.log('OPENING_SPR_PALETTES len:', spr && spr.length);
if (spr) spr.forEach((p, i) => console.log('  spr[' + i + '] = ' + p.join(',')));

// emu 实证
const emuBg = JSON.parse(fs.readFileSync('output/emu-full/frame-3750/palette.json', 'utf8')).bg;
const emuSpr = JSON.parse(fs.readFileSync('output/emu-full/frame-3750/palette.json', 'utf8')).spr;
console.log('\nemu f3750 bg = ' + emuBg.join(','));
console.log('emu f3750 spr = ' + emuSpr.join(','));
