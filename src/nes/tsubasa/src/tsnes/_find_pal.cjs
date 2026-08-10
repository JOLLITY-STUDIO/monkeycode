const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-00.ts', 'utf8');
const bytes = c.match(/0x[0-9A-Fa-f]{2}/g).map(s => parseInt(s, 16));

// 正确公式: CPU $XXXX → array[N] where N = XXXX - 0x8000
function cpu(cpuAddr) { return cpuAddr - 0x8000; }
function read16(idx) { return bytes[idx] | (bytes[idx+1] << 8); }

// 1. 看看 $8297 周围 — 调色板初始化
console.log('=== $8297 调色板初始化函数 (按 asm 行 304) ===');
const a8297 = cpu(0x8297);
for (let i = -5; i < 20; i++) {
  const idx = a8297 + i;
  const addr = '$' + (0x8297 + i).toString(16).toUpperCase();
  const b = bytes[idx];
  let note = '';
  if (b === 0x85) note = ' ← STA zp $' + bytes[idx+1].toString(16);
  if (b === 0xA9) note = ' ← LDA #' + bytes[idx+1].toString(16);
  if (b === 0x20) note = ' ← JSR $' + bytes[idx+1].toString(16)+bytes[idx+2].toString(16);
  if (b === 0xA5) note = ' ← LDA zp $' + bytes[idx+1].toString(16);
  if (b === 0x60) note = ' ← RTS';
  console.log(`  ${addr}: 0x${b.toString(16).padStart(2,'0')}${note}`);
}

// 2. 看 $9085 函数体 (asm 行 2325)
console.log('\n=== $9085 函数体 (asm 行 2325) ===');
const a9085 = cpu(0x9085);
for (let i = 0; i < 40; i++) {
  const idx = a9085 + i;
  const addr = '$' + (0x9085 + i).toString(16).toUpperCase();
  const b = bytes[idx];
  let note = '';
  if (b === 0x85) note = ' ← STA zp $' + bytes[idx+1].toString(16);
  if (b === 0xA9) note = ' ← LDA #' + bytes[idx+1].toString(16);
  if (b === 0xA0) note = ' ← LDY #' + bytes[idx+1].toString(16);
  if (b === 0xA5) note = ' ← LDA zp $' + bytes[idx+1].toString(16);
  if (b === 0xB1) note = ' ← LDA ($' + bytes[idx+1].toString(16) + '),Y';
  if (b === 0x99) note = ' ← STA $' + bytes[idx+1].toString(16)+bytes[idx+2].toString(16)+',Y';
  if (b === 0x20) note = ' ← JSR $' + bytes[idx+1].toString(16)+bytes[idx+2].toString(16);
  if (b === 0x4C) note = ' ← JMP $' + bytes[idx+1].toString(16)+bytes[idx+2].toString(16);
  if (b === 0x60) note = ' ← RTS';
  if (b === 0xC8) note = ' ← INY';
  if (b === 0xC0) note = ' ← CPY #';
  if (b >= 0x30 && b <= 0x3F && i > 2) note = ' ⚠ COLOR';
  console.log(`  ${addr}: 0x${b.toString(16).padStart(2,'0')}${note}`);
}

// 3. 关联: $9085 内 LDA $978B,Y 循环 — $978B 是调色板数据表
console.log('\n=== $978B 调色板数据表 (32 bytes) ===');
const a978B = cpu(0x978B);
for (let i = 0; i < 32; i++) {
  const idx = a978B + i;
  const addr = '$' + (0x978B + i).toString(16).toUpperCase();
  const b = bytes[idx];
  const isColor = b <= 0x3F ? ' ← COLOR (' + b + ')' : '';
  console.log(`  ${addr}: 0x${b.toString(16).padStart(2,'0')}${isColor}`);
}

// 4. $8297 如何调 $9085?
// $8297: STA $E7, LDA #$01, STA $E6, LDA #$E5, STA $4D, LDA #$00, STA $4E, JSR $9085, RTS
// $4D/$4E = $00E5 (指针), $E6/$E7 = $01 ???
// 实际: ($4D)=$E5, $4E=$00 → 指针=$00E5
// 这说明 $9085 访问的 ($4D) 是 zp $E5/$E6
// 但 asm 说 $9085 是 LDA #$00, LDY #$01, STA $0467,Y ...
// 完全不同的代码! ROM 和 asm 不匹配!

console.log('\n=== 验证: ROM 和 asm 是否匹配 ===');
// asm line 2325: $9085 = A9 00 (LDA #$00)
console.log('asm expects at $9085: 0xA9 (LDA #)');
console.log('ROM  provides:       0x' + bytes[cpu(0x9085)].toString(16));
console.log('MATCH:', bytes[cpu(0x9085)] === 0xA9 ? 'YES' : 'NO');

// asm line 304: $8297 = 85 E7 (STA $E7)
console.log('\nasm expects at $8297: 0x85 (STA zp)');
console.log('ROM  provides:       0x' + bytes[cpu(0x8297)].toString(16));
console.log('MATCH:', bytes[cpu(0x8297)] === 0x85 ? 'YES' : 'NO');

// asm line 2325: $9080 = ?? 
// 看 asm line 2325 上面是什么
console.log('\n=== $907A-$908A ===');
for (let i = 0; i < 17; i++) {
  const idx = cpu(0x907A) + i;
  const addr = '$' + (0x907A + i).toString(16);
  console.log(`  ${addr}: 0x${bytes[idx].toString(16).padStart(2,'0')}`);
}
