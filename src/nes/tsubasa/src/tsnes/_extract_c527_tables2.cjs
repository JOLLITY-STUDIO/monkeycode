// 提取 C527 数字渲染表: bank29 $AE86/$AFAE, bank28 $9FCE (尾部区域)
const fs = require('fs');
function load(f) {
  const txt = fs.readFileSync(f, 'utf8');
  const m = txt.match(/readonly number\[\] = \[([\s\S]*?)\];/);
  return m[1].split(',').map(s => parseInt(s.trim(), 16));
}
const b29 = load('rom-data/prg-bank-29.ts');
const b28 = load('rom-data/prg-bank-28.ts');
function r29(cpu) { return b29[cpu - 0xa000]; }
function r28(cpu) { return b28[cpu - 0x8000]; }
function dump(name, fn, start, len) {
  const out = [];
  for (let i = 0; i < len; i++) {
    const v = fn(start + i);
    out.push(v === undefined ? '??' : v.toString(16).padStart(2, '0'));
  }
  console.log(name, `($${start.toString(16)}+${len})`);
  for (let i = 0; i < out.length; i += 16) console.log(out.slice(i, i + 16).join(' '));
}
console.log('b28 len', b28.length, 'b29 len', b29.length);
console.log('=== bank28 $9FCE 区域 (到数组末尾) ===');
dump('9FCE', r28, 0x9fce, Math.min(64, b28.length - (0x9fce - 0x8000)));
console.log('=== bank29 $AE86 (前 32B 参照) ===');
dump('AE86', r29, 0xae86, 32);
console.log('=== bank29 $AFAE (前 32B 参照) ===');
dump('AFAE', r29, 0xafae, 32);
