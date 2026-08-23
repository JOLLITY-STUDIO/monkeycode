const fs = require('fs');
const romPath = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/dist/tsubasa2.nes';
const romData = fs.readFileSync(romPath);
// PRG bank 0 在 ROM offset 16 + 0*8192 = 16
// $953A in bank0 = offset 16 + ($953A - $8000) = 16 + $153A = 16 + 5434 = 5450
const offset = 16 + (0x953A - 0x8000);
console.log('bank0 $953A at ROM offset', offset, '(0x'+offset.toString(16)+')');
console.log('bytes:', romData.slice(offset, offset+10).map(b=>'0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));
// disasm: 85 85 = STA $85 (zero page)
// 85 = STA zero page, 85 = operand ($85)
// But trace says "STA #$85" — that's wrong disasm, it's actually STA $85
// Actually 85 85 = STA $0085 (zero page addressing)
// X=0x28, so if it's STA $85,X it would be opcode 95 85... 
// But 85 is STA zero page (no X), 95 is STA zero page,X
// So 85 85 = STA $85, not STA $85,X
// But then how does it write $0490? $85 is not $0490

// Wait — maybe the trace disasm is wrong and it's actually STA $0490,X
// Opcode for STA absolute,X = 9D
// Let me check if $953A is 9D instead of 85
console.log('byte at $953A:', '0x'+romData[offset].toString(16));
console.log('byte at $953B:', '0x'+romData[offset+1].toString(16));
console.log('byte at $953C:', '0x'+romData[offset+2].toString(16));

// Check $954C
const off2 = 16 + (0x954C - 0x8000);
console.log('\nbank0 $954C at offset', off2);
console.log('bytes:', romData.slice(off2, off2+5).map(b=>'0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// Check $9571
const off3 = 16 + (0x9571 - 0x8000);
console.log('\nbank0 $9571 at offset', off3);
console.log('bytes:', romData.slice(off3, off3+5).map(b=>'0x'+b.toString(16).padStart(2,'0').toUpperCase()).join(' '));

// Actually the trace shows X=0x28, and $85+$28 = $AD... not $0490
// Maybe the real opcode is different. Let me read more context
// $953A might be in a loop that writes to $04AD,X where $04AD = $0490+base
// Or maybe the base is $0468 + X where X varies

// Let me check: $0490 = $0468 + $28? No, $468+$28 = $490. YES!
// $0468 + $28 = $0490!
// So the instruction is STA $0468,X (opcode 9D, absolute,X)
// 9D 68 04? No, 9D is STA absolute,X, operand is 2 bytes
// But trace shows "85 85" — maybe trace is showing wrong bytes

// Let me just read the actual bytes at $953A
console.log('\n=== Actual bytes at $953A ===');
for(let i=-2;i<10;i++) {
  const a = offset+i;
  const addr = 0x953A+i;
  console.log('$'+addr.toString(16).toUpperCase().padStart(4,'0')+': 0x'+romData[a].toString(16).padStart(2,'0').toUpperCase());
}
