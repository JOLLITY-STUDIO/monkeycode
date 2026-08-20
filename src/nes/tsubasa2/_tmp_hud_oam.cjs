// HUD OAM 转换区反汇编 + 比赛 HUD 场景数据 dump
const fs = require('fs');

function loadBank(file) {
  const s = fs.readFileSync(file, 'utf8');
  const m = s.match(/= \[([\s\S]*?)\];/);
  if (!m) throw new Error('no array in ' + file);
  return (m[1].match(/0x[0-9a-fA-F]+/g) || []).map(h => parseInt(h, 16));
}

const b30 = loadBank('src/game/data/prg-bank-30.ts');
const b24 = loadBank('src/game/data/prg-bank-24.ts');
const b25 = loadBank('src/game/data/prg-bank-25.ts');

const r30 = a => b30[a - 0xC000] ?? 0;
const r24 = a => b24[a - 0x8000] ?? 0;
const r25 = a => b25[a - 0xA000] ?? 0;
const u16 = (fn, a) => fn(a) | (fn(a + 1) << 8);

// 迷你 6502 反汇编
const OP = {
  '20': 'JSR', '60': 'RTS', '4C': 'JMP', 'EA': 'NOP', '00': 'BRK',
  'A9': 'LDA #', 'A5': 'LDA zp', 'A6': 'LDX zp', 'A0': 'LDY #', 'A4': 'LDY zp',
  '85': 'STA zp', '86': 'STX zp', '84': 'STY zp', '8D': 'STA abs', '8E': 'STX abs',
  'E8': 'INX', 'C8': 'INY', 'CA': 'DEX', '88': 'DEY', '18': 'CLC', '38': 'SEC',
  'D0': 'BNE', 'F0': 'BEQ', '90': 'BCC', 'B0': 'BCS', '10': 'BPL', '30': 'BMI',
  'C9': 'CMP #', 'C5': 'CMP zp', 'E0': 'CPX #', 'C0': 'CPY #', '69': 'ADC #', 'E9': 'SBC #',
  '29': 'AND #', '09': 'ORA #', '4A': 'LSR A', '0A': 'ASL A', '2A': 'ROL A', '6A': 'ROR A',
  '0D': 'ORA abs', '2D': 'AND abs', '0E': 'ASL abs',
  'AA': 'TAX', 'A8': 'TAY', '8A': 'TXA', '98': 'TYA', 'BA': 'TSX', '9A': 'TXS', '48': 'PHA', '68': 'PLA',
  '08': 'PHP', '28': 'PLP', '24': 'BIT zp', '2C': 'BIT abs', '9D': 'STA abs,X', '99': 'STA abs,Y',
  'BD': 'LDA abs,X', 'B9': 'LDA abs,Y', 'BC': 'LDY abs,X', 'BE': 'LDX abs,Y',
  'B1': 'LDA (zp),Y', '91': 'STA (zp),Y', 'A1': 'LDA (zp,X)', '81': 'STA (zp,X)',
  'E6': 'INC zp', 'C6': 'DEC zp', 'F6': 'INC zp,X', 'D6': 'DEC zp,X',
  '40': 'RTI', 'CB': '?'
};
const LEN = { 'A9': 2, 'A0': 2, '20': 3, '4C': 3, 'D0': 2, 'F0': 2, '90': 2, 'B0': 2, '10': 2, '30': 2, 'C9': 2, 'E0': 2, 'C0': 2, '69': 2, 'E9': 2, '29': 2, '09': 2, '8D': 3, '8E': 3, '0D': 3, '2D': 3, '0E': 3, '9D': 3, '99': 3, 'BD': 3, 'B9': 3, 'BC': 3, 'BE': 3, '2C': 3, 'E6': 2, 'C6': 2, 'F6': 2, 'D6': 2, 'A5': 2, '85': 2, 'A6': 2, '86': 2, 'A4': 2, '84': 2, 'C5': 2, '24': 2, 'E9': 2, '69': 2 };

function disasm(fn, start, count) {
  const lines = [];
  let a = start;
  const end = start + count;
  while (a < end) {
    const op = fn(a);
    const hex = op.toString(16).toUpperCase().padStart(2, '0');
    const name = OP[hex] || ('??' + hex);
    let arg = '';
    const len = LEN[hex] || 1;
    if (len === 2) arg = fn(a + 1).toString(16).padStart(2, '0');
    if (len === 3) {
      const lo = fn(a + 1), hi = fn(a + 2);
      arg = (hi << 8 | lo).toString(16).padStart(4, '0');
    }
    lines.push('  $' + a.toString(16).toUpperCase().padStart(4, '0') + ': ' + name.padEnd(10) + ' $' + arg);
    a += len;
  }
  return lines.join('\n');
}

console.log('=== Bank30 $CB99-$CC20 (C509: sprite cmd dispatch) ===');
console.log(disasm(r30, 0xCB99, 0x90));

console.log('\n=== Bank30 $CC02-$CCD2 (C530/C52D/C533 area) ===');
console.log(disasm(r30, 0xCC02, 0xD0));

console.log('\n=== Bank30 $CCD2-$CD80 (C533: HUD line1 sync) ===');
console.log(disasm(r30, 0xCCD2, 0xB0));

console.log('\n=== Bank24 $9220 场景指针表 idx 0-16 ===');
for (let i = 0; i < 16; i++) {
  const p = u16(r24, 0x9220 + i * 2);
  console.log('  idx ' + i + ': ptr $' + p.toString(16));
}

function dumpScene(p, n) {
  const bytes = [];
  for (let i = 0; i < n; i++) bytes.push(r24(p + i).toString(16).padStart(2, '0'));
  console.log('  $' + p.toString(16) + ': ' + bytes.join(' '));
}
console.log('\n=== 比赛 HUD 场景 idx2 数据 (从指针起 32B) ===');
dumpScene(u16(r24, 0x9224), 32);
console.log('\n=== 场景 idx4 数据 ===');
dumpScene(u16(r24, 0x9228), 32);

console.log('\n=== Bank25 HUD 指针表 ===');
for (let i = 0; i < 8; i++) console.log('  hud1[$AD6E+' + i * 2 + '] = $' + u16(r25, 0xAD6E + i * 2).toString(16));
for (let i = 0; i < 4; i++) console.log('  hud2[$AD1C+' + i * 2 + '] = $' + u16(r25, 0xAD1C + i * 2).toString(16));
for (let i = 0; i < 5; i++) console.log('  hud3[$AD54+' + i * 2 + '] = $' + u16(r25, 0xAD54 + i * 2).toString(16));

console.log('\n=== Bank25 $B3BD 位段表 (24B) ===');
{
  const bytes = [];
  for (let i = 0; i < 24; i++) bytes.push(r25(0xB3BD + i).toString(16).padStart(2, '0'));
  console.log('  ' + bytes.join(' '));
}
console.log('\n=== Bank25 $B3CF 精灵指针表 (16 项) ===');
for (let i = 0; i < 16; i++) console.log('  spr[$B3CF+' + i * 2 + '] = $' + u16(r25, 0xB3CF + i * 2).toString(16));
