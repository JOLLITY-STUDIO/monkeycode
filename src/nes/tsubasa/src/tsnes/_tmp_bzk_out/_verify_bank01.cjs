// 验证 bank01 rom-data 与 asm 反汇编代码字节一致 (临时脚本)
const fs = require('fs');
const s = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-01.ts', 'utf8');
const eq = s.indexOf('= [');
const a = s.indexOf('[', eq);
const b = s.lastIndexOf(']');
const raw = s.slice(a + 1, b).split(',').map(t => parseInt(t.trim(), 16));
console.log('len', raw.length);

// 从 asm 提取已知字节序列: 地址 -> 字节数组
const checks = [
  [0xA000, [0x4C, 0x1E, 0xA0], 'JMP $A01E'],
  [0xA01E, [0xAD, 0x48, 0x04], 'LDA ram_0448'],
  [0xA10D, [0x20, 0xA0, 0x9B], 'JSR $9BA0'],
  [0xA201, [0xA9, 0x01, 0x20], 'LDA #$01 / JSR'],
  [0xA231, [0xA6, 0xEC, 0xBD], 'LDX ram_00EC / LDA $B255,X'],
  [0xA3D0, [0xA5, 0x3A, 0x29], 'LDA ram_003A'],
  [0xA4D8, [0x84, 0xE8, 0x29], 'STY ram_00E8'],
  [0xA6D2, [0xA9, 0x55, 0x8D], 'LDA #$55'],
  [0xA39B, [0xA9, 0x00, 0x85], 'LDA #$00 / STA ram_00EA'],
  [0xA402, [0xAD, 0x61, 0x06], 'LDA ram_0661'],
  [0xA438, [0xBC, 0x8A, 0xAD], 'LDY $AD8A,X'],
  [0xA474, [0x29, 0x3F, 0x85], 'AND #$3F / STA ram_00EC'],
  [0xA64C, [0x20, 0xA0, 0x98], 'JSR $98A0'],
  [0xAFC2, [0x00], 'entry5 (数据?)'],
];
let allOk = true;
for (const [addr, bytes, desc] of checks) {
  const got = raw.slice(addr - 0xA000, addr - 0xA000 + bytes.length);
  const ok = got.every((v, i) => v === bytes[i]);
  if (!ok) allOk = false;
  console.log('$' + addr.toString(16).toUpperCase(), desc, '->', got.map(v => v.toString(16).padStart(2, '0')).join(' '), ok ? 'OK' : 'MISMATCH');
}

// 检查关键数据表在 $A000-$BFFF 范围内
for (const t of [[0xB1E8, 64], [0xB229, 4], [0xB22D, 18], [0xB241, 18], [0xB255, 28], [0xB271, 124], [0xB2ED, 16], [0xBC6E, 99], [0xBCD1, 34], [0xBCF3, 113], [0xBD64, 139], [0xAD8A, 502]]) {
  const end = t[0] + t[1];
  const ok = t[0] >= 0xA000 && end <= 0xC000;
  if (!ok) allOk = false;
  console.log('$' + t[0].toString(16).toUpperCase() + '+' + t[1] + ' range', ok ? 'OK' : 'OUT OF RANGE');
}
console.log(allOk ? 'ALL OK' : 'HAS ISSUES');
