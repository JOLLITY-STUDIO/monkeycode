const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const bank7 = prg.slice(7 * 0x2000, 7 * 0x2000 + 0x2000);
const bank12 = prg.slice(12 * 0x2000, 12 * 0x2000 + 0x2000);

console.log('=== bank7 $8754 表（BGM 数据 bank 视角）===');
for (let i = 0; i < 38; i++) {
  const lo = bank7[0x754 + i * 2];
  const hi = bank7[0x754 + i * 2 + 1];
  const f = lo | (hi << 8);
  const hz = f > 0 ? Math.round(1789773 / (16 * (f + 1))) : 0;
  // 检查是否是有效频率（10-10000Hz）
  const valid = hz >= 10 && hz <= 10000;
  process.stdout.write('[' + i + ']=$' + f.toString(16) + '(' + hz + 'Hz' + (valid ? '' : '!') + ') ');
  if ((i + 1) % 6 === 0) console.log();
}

console.log('\n\n=== bank7 $870D 表（频率表视角）===');
for (let i = 0; i < 24; i++) {
  const lo = bank7[0x70D + i * 2];
  const hi = bank7[0x70D + i * 2 + 1];
  const f = lo | (hi << 8);
  const hz = f > 0 ? Math.round(1789773 / (16 * (f + 1))) : 0;
  process.stdout.write('[' + i + ']=$' + f.toString(16) + '(' + hz + 'Hz) ');
  if ((i + 1) % 6 === 0) console.log();
}

console.log('\n\n=== bank12 $870D 表（引擎代码视角）===');
for (let i = 0; i < 24; i++) {
  const lo = bank12[0x70D + i * 2];
  const hi = bank12[0x70D + i * 2 + 1];
  const f = lo | (hi << 8);
  const hz = f > 0 ? Math.round(1789773 / (16 * (f + 1))) : 0;
  process.stdout.write('[' + i + ']=$' + f.toString(16) + '(' + hz + 'Hz) ');
  if ((i + 1) % 6 === 0) console.log();
}
