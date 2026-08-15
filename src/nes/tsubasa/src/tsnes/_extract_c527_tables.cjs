// 提取 C527 数字渲染表: bank29 $AE86/$AFAE, bank28 $9FCE
const fs = require('fs');
function load(f) {
  const txt = fs.readFileSync(f, 'utf8');
  const m = txt.match(/readonly number\[\] = \[([\s\S]*?)\];/);
  return m[1].split(',').map(s => parseInt(s.trim(), 16));
}
const b29 = load('rom-data/prg-bank-29.ts');
const b28 = load('rom-data/prg-bank-28.ts');
// bank29 CPU $A000-$BFFF → offset 0 对应 $A000
function r29(cpu) { return b29[cpu - 0xa000]; }
function r28(cpu) { return b28[cpu - 0x8000]; }
function dump(name, fn, start, len) {
  const out = [];
  for (let i = 0; i < len; i++) out.push(fn(start + i).toString(16).padStart(2, '0'));
  console.log(name, `($${start.toString(16)}+${len})`, len, 'bytes');
  for (let i = 0; i < out.length; i += 16) console.log(out.slice(i, i + 16).map((v, j) => (i + j) % 2 === 0 ? '0x' + v : v + ',').join(', '));
}
console.log('=== bank29 $AE86 表 (96B) ===');
dump('AE86', r29, 0xae86, 96);
console.log('=== bank29 $AFAE 表 (96B) ===');
dump('AFAE', r29, 0xafae, 96);
console.log('=== bank28 $9FCE 表 (256B) ===');
dump('9FCE', r28, 0x9fce, 256);
console.log('=== bank28 $9F0E 表 (96B) ===');
dump('9F0E', r28, 0x9f0e, 96);
