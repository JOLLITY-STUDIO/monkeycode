// 临时: 找 JSR $81BC / JSR $8199 调用点 + dump $82F0 区域
const fs = require('fs');
const files = ['asm/bank11/code_main.s', 'asm/bank11/code_data.s', 'asm/bank11/*.s'];
const dir = 'asm/bank11';
const names = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
for (const n of names) {
  const lines = fs.readFileSync(dir + '/' + n, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/\bJSR \$81BC\b/.test(l) || /\bJSR \$8199\b/.test(l) || /\bJSR \$81A7\b/.test(l)) {
      const from = Math.max(0, i - 8);
      const to = Math.min(lines.length, i + 3);
      console.log(`--- ${n}:${i + 1} ---`);
      for (let k = from; k < to; k++) console.log(String(k + 1).padStart(4) + '|' + lines[k]);
    }
  });
}
// dump bank11 $82F0-$8310
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgOff = 0x10;
const out = [];
for (let i = 0; i < 40; i++) {
  const off = prgOff + 11 * 0x2000 + (0x82F0 + i - 0x8000);
  out.push(rom[off].toString(16).padStart(2, '0'));
}
console.log(`bank11 $82F0: ${out.join(' ')}`);
