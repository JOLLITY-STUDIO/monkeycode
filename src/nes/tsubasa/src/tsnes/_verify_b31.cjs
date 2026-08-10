const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, 'mini-audio/rom-data/prg-bank-31-mini-audio.ts'), 'utf-8');
const m = file.match(/=\s*\[([\s\S]*?)\];/);
const arr = m[1].split(',').map(s => parseInt(s.trim(), 16)).filter(x => !isNaN(x));

// 检查关键地址
function check(addr, expected, label) {
  const off = addr - 0xE000;
  const val = arr[off];
  const ok = val === expected;
  console.log(`${ok ? '✅' : '❌'} $${addr.toString(16).toUpperCase()}: 0x${val.toString(16).padStart(2, '0')} ${ok ? '' : '(expected 0x'+expected.toString(16).padStart(2,'0')+')'} ${label}`);
}

// Init code at $E000
check(0xE000, 0xA9, 'LDA #$06');
check(0xE001, 0x06, '');
check(0xE002, 0x8D, 'STA $8000');
check(0xE003, 0x00, '');
check(0xE004, 0x80, '');
check(0xE005, 0xA9, 'LDA #$0C');
check(0xE006, 0x0C, '');
check(0xE007, 0x8D, 'STA $8001');
check(0xE008, 0x01, '');
check(0xE009, 0x80, '');
check(0xE00A, 0xA9, 'LDA #$07');
check(0xE00B, 0x07, '');
check(0xE00C, 0x8D, 'STA $8000');
check(0xE00D, 0x00, '');
check(0xE00E, 0x80, '');
check(0xE00F, 0xA9, 'LDA #$0F');
check(0xE010, 0x0F, '');
check(0xE011, 0x8D, 'STA $8001');
check(0xE012, 0x01, '');
check(0xE013, 0x80, '');
check(0xE014, 0x4C, 'JMP $8000');
check(0xE015, 0x00, '');
check(0xE016, 0x80, '');

// RESET handler at $FFF0
check(0xFFF0, 0x4C, 'JMP $E000');
check(0xFFF1, 0x00, '');
check(0xFFF2, 0xE0, '');

// Vectors
console.log('');
console.log('NMI   $FFFA: ' + (arr[0x1FFA] | (arr[0x1FFB] << 8)).toString(16).toUpperCase());
console.log('RESET $FFFC: ' + (arr[0x1FFC] | (arr[0x1FFD] << 8)).toString(16).toUpperCase());
console.log('IRQ   $FFFE: ' + (arr[0x1FFE] | (arr[0x1FFF] << 8)).toString(16).toUpperCase());

// 检查 $E000 area 后面是 $FF
console.log('');
console.log('$E017=' + arr[0x17].toString(16) + ' (should be FF)');
console.log('$E100=' + arr[0x100].toString(16) + ' (should be FF)');

// 检查 $F000 area 保有数据
console.log('');
console.log('$F000=' + arr[0x1000].toString(16) + ' (original data)');
console.log('$F100=' + arr[0x1100].toString(16) + ' (original data)');

// 统计清零比例
let cleared = 0;
for (let i = 0x18; i < 0x1000; i++) if (arr[i] === 0xFF) cleared++;
console.log('');
console.log('$E018-$EFFF: ' + cleared + '/' + (0x1000-0x18) + ' 已清零');
