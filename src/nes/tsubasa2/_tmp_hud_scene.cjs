// Dump bank24 $9220 场景指针表全 128 项 + bank25 HUD 指针表 (b25 读取)
const fs = require('fs');

function parseBank(tsPath) {
  const s = fs.readFileSync(tsPath, 'utf8');
  const m = s.match(/= \[([\s\S]*?)\];/);
  if (!m) throw new Error('no array: ' + tsPath);
  const bytes = [];
  for (const tok of m[1].match(/0x[0-9a-fA-F]+/g) || []) bytes.push(parseInt(tok, 16));
  return bytes;
}

const PRG24 = parseBank('./src/game/data/prg-bank-24.ts');
const PRG25 = parseBank('./src/game/data/prg-bank-25.ts');
const PRG31 = parseBank('./src/game/data/prg-bank-31.ts');

function b24(cpu) { const off = cpu - 0x8000; return off >= 0 && off < PRG24.length ? PRG24[off] : 0; }
function b24u16(cpu) { return b24(cpu) | (b24(cpu + 1) << 8); }
function b25(cpu) { const off = cpu - 0xa000; return off >= 0 && off < PRG25.length ? PRG25[off] : 0; }
function b25u16(cpu) { return b25(cpu) | (b25(cpu + 1) << 8); }
function b31(cpu) { const off = cpu - 0xe000; return off >= 0 && off < PRG31.length ? PRG31[off] : 0; }
function b31u16(cpu) { return b31(cpu) | (b31(cpu + 1) << 8); }
function sceneByte(cpu) { return cpu < 0xa000 ? b24(cpu) : b25(cpu); }

console.log('=== bank24 $9220 场景指针表 (全 128 项) ===');
const desc = [];
for (let i = 0; i < 128; i++) {
  const y = (i << 1) & 0xff;
  const base = 0x9220 + (i >= 128 ? 0x100 : 0);
  const ptr = b24u16(base + y);
  const b0 = sceneByte(ptr);
  let tag = '';
  if (b0 >= 0xf0) tag = `E${(b0 & 0xf).toString(16)}`;
  else tag = `dly${b0}`;
  if (b0 !== 0 || i < 8) console.log(`idx ${String(i).padStart(3)}: ptr=$${ptr.toString(16).padStart(4)} [${b0.toString(16).padStart(2)},${sceneByte(ptr+1).toString(16).padStart(2)},${sceneByte(ptr+2).toString(16).padStart(2)}] ${tag}`);
}

console.log('\n=== bank25 HUD 指针表 (b25) ===');
for (let i = 0; i < 8; i++) {
  const p1 = b25u16(0xad6e + i * 2);
  console.log(`hud1[${i}]: $${p1.toString(16)} first=[${sceneByte(p1).toString(16)},${sceneByte(p1+1).toString(16)},${sceneByte(p1+2).toString(16)}]`);
}
for (let i = 0; i < 4; i++) {
  const p2 = b25u16(0xad1c + i * 2);
  console.log(`hud2[${i}]: $${p2.toString(16)} first=[${sceneByte(p2).toString(16)},${sceneByte(p2+1).toString(16)},${sceneByte(p2+2).toString(16)}]`);
}
for (let i = 0; i < 5; i++) {
  const p3 = b25u16(0xad54 + i * 2);
  console.log(`hud3[${i}]: $${p3.toString(16)} first=[${sceneByte(p3).toString(16)},${sceneByte(p3+1).toString(16)},${sceneByte(p3+2).toString(16)}]`);
}

console.log('\n=== bank25 $B3CF 精灵数据指针表 ===');
for (let i = 0; i < 16; i++) {
  const p = b25u16(0xb3cf + i * 2);
  console.log(`spr[${i}]: $${p.toString(16)}`);
}
