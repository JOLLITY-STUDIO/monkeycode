const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.resolve(__dirname, '../src/core/ppu/index.ts'), 'utf8');
let idx = 0;
let found = 0;
while (idx < src.length) {
  const i = src.indexOf('write', idx);
  if (i < 0) break;
  const ctx = src.slice(Math.max(0, i - 120), i + 260);
  if (ctx.includes('PPU') || ctx.includes('addr') || ctx.includes('address') || ctx.includes('0x200') || ctx.includes('2007')) {
    found++;
    console.log('--- @' + i);
    console.log(ctx.replace(/\n/g, '\n'));
    console.log();
  }
  idx = i + 1;
  if (found > 8) break;
}
console.log('total write mentions shown:', found);
