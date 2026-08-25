const fs = require('fs');
const path = require('path');
const cpu = fs.readFileSync(path.resolve(__dirname, '../src/core/cpu.ts'), 'utf8');
const ppu = fs.readFileSync(path.resolve(__dirname, '../src/core/ppu/index.ts'), 'utf8');

console.log('=== cpu.ts: 2005 / 2000 / writeScroll / ppu.write 路由 ===');
for (const pat of ['2005', '2000', 'writeScroll', 'ppu.write', 'this.ppu', '.write(addr', '.write(address']) {
  let i = 0, n = 0;
  while ((i = cpu.indexOf(pat, i)) >= 0 && n < 4) {
    console.log('--- cpu "' + pat + '" @' + i);
    console.log(cpu.slice(Math.max(0, i - 150), i + 200));
    console.log();
    i += pat.length; n++;
  }
}
console.log('=== ppu.ts: writeScroll 方法 ===');
let i = 0;
while ((i = ppu.indexOf('writeScroll', i)) >= 0) {
  console.log('--- ppu writeScroll @' + i);
  console.log(ppu.slice(Math.max(0, i - 100), i + 260));
  console.log();
  i += 'writeScroll'.length;
}
