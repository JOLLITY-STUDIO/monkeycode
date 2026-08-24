// 严格按 .byte 顺序填充字节流，从 RTS 后第一个 .byte 重新对齐
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank02');
const src = fs.readFileSync(path.join(dir, '_full.s'), 'utf8');
const ls = src.split(/\r?\n/);

// 已知: bank02 占 8KB $8000-$9FFF，前面代码占 $8000-$88FD(RTS)
// memset 函数 $8A06-$8A1F
// 然后是连续 .byte 数据：行 38/39/40/41...一直到 bank 末

// 数据流从 $8A20 开始（紧接 memset RTS）
const bytes = new Map();
let addr = 0x8a20;
let lastWasCode = false;

for (let i = 0; i < ls.length; i++) {
  const raw = ls[i];
  const line = raw.trim();
  // 注释行 (含 RTS 后的代码注释地址)
  const cm = line.match(/^;\s*\$([0-9A-F]{4})$/i);
  if (cm) {
    addr = parseInt(cm[1], 16);
    lastWasCode = false;
    continue;
  }
  // 真正的代码汇编行（以助记符开头，4 个 token 形式：操作码 ; 地址）
  if (/^\s*(LDA|STA|JMP|JSR|BEQ|BNE|BCC|BCS|BMI|BPL|BVS|BVC|RTS|RTI|INC|DEC|TXS|TAX|TAY|TSX|TXA|INX|INY|DEX|DEY|PHA|PLA|PHP|PLP|NOP|SEC|SED|SEI|CLC|CLD|CLI|CLV|ASL|LSR|ROR|ROL|AND|EOR|ORA|ADC|SBC|CMP|CPX|CPY|LDX|LDY|STX|STY|BIT|TYA)\b/.test(line)) {
    lastWasCode = true;
    continue;
  }
  // .byte 行
  const bm = line.match(/^\.byte\s+(.+?)(?:;\s*\$[0-9A-F]{4})?$/i);
  if (bm) {
    const vals = bm[1].split(',').map((s) => parseInt(s.trim().replace('$', ''), 16));
    for (const v of vals) {
      bytes.set(addr, v & 0xff);
      addr++;
    }
    lastWasCode = false;
    continue;
  }
}

// dump 8A20-8AFF
function dump(start, end) {
  console.log('=== $' + start.toString(16).toUpperCase() + '-$' + end.toString(16).toUpperCase() + ' ===');
  let s = '';
  for (let a = start; a <= end; a++) {
    const b = bytes.get(a);
    s += (b !== undefined ? (b < 0x10 ? '0' : '') + b.toString(16).toUpperCase() : '..') + ' ';
    if ((a - start + 1) % 16 === 0) {
      console.log('$' + a.toString(16).toUpperCase() + ': ' + s);
      s = '';
    }
  }
  if (s) console.log(s);
}

dump(0x8a20, 0x8a3f);
dump(0x8a40, 0x8a5f);
dump(0x8a60, 0x8a7f);
dump(0x8a80, 0x8a9f);
dump(0x8aa0, 0x8abf);
dump(0x8ac0, 0x8adf);
dump(0x8ae0, 0x8aff);
dump(0x8b00, 0x8b7f);
