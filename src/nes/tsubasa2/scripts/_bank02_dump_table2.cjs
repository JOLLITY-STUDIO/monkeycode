// 扫描 bank02 $8A20-$8AFF byte 数据
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank02');
const src = fs.readFileSync(path.join(dir, '_full.s'), 'utf8');
const ls = src.split(/\r?\n/);

const bytes = new Map();
let pendingAddr = null;

// 跟踪上一条代码汇编的地址
for (let i = 0; i < ls.length; i++) {
  const line = ls[i].trim();
  // 注释地址行
  const am = line.match(/^;\s*\$([0-9A-F]{4})$/i);
  if (am) {
    pendingAddr = parseInt(am[1], 16);
    continue;
  }
  // .byte 行
  const bm = line.match(/^\.byte\s+(.+?)(?:;\s*\$[0-9A-F]{4})?$/i);
  if (bm) {
    const vals = bm[1].split(',').map((s) => parseInt(s.trim().replace('$', ''), 16));
    if (pendingAddr == null) {
      // 推断地址：如果是连续 .byte，前面是 RTS(1) + 下一条 .byte 起点 = pendingAddr
      if (bytes.size > 0) {
        pendingAddr = Math.max(...bytes.keys()) + 1;
        // 跳过代码行
        let hasCode = false;
        // 简单处理：.byte 前一条如果是纯指令行，pending+1 是 RTS 后地址
        if (i > 0) {
          const prev = ls[i - 1].trim();
          if (/^(RTS|JMP|JSR|BEQ|BNE|BCC|BCS|BMI|BPL|BVS|BVC|RTI|BRK|PHP|PLA|PHA|TXS|TAX|TAY|TSX|INX|INY|DEX|DEY|NOP|SEC|SED|SEI|CLC|CLD|CLI|CLI|CLC|CLV|AND|EOR|ORA|ADC|SBC|STA|LDA|LDX|LDY|STX|STY|CMP|CPX|CPY|ASL|LSR|ROR|ROL)\b/.test(prev)) {
            hasCode = true;
          }
        }
        if (hasCode || true) {
          // 不论前后都尝试使用
        }
      } else {
        pendingAddr = 0x8000;
      }
    }
    for (const v of vals) {
      bytes.set(pendingAddr, v & 0xff);
      pendingAddr++;
    }
    pendingAddr = null;
  }
}

// dump 区间 $8A20-$9FFF
function dump(start, end, label) {
  console.log('=== ' + label + ' $' + start.toString(16).toUpperCase() + '-$' + end.toString(16).toUpperCase() + ' ===');
  for (let a = start; a <= end; a++) {
    const b = bytes.get(a);
    if (b !== undefined) process.stdout.write(((b < 0x10 ? '0' : '') + b.toString(16).toUpperCase()) + ' ');
    else process.stdout.write('.. ');
    if ((a - start + 1) % 16 === 0) {
      process.stdout.write(' ; $' + a.toString(16).toUpperCase() + '\n');
    }
  }
  process.stdout.write('\n');
}

dump(0x8a20, 0x8a3f, 'DIR_TABLE');
dump(0x8a40, 0x8a5f, 'POSSIBLE_TABLE');
dump(0x8a60, 0x8a9f, 'POSSIBLE_TABLE');
dump(0x8aa0, 0x8b3f, 'POSSIBLE_TABLE');

// 也标出有数据的地址范围
const dataAddrs = [...bytes.keys()].sort((a, b) => a - b);
let lastStart = null;
let lastEnd = null;
for (const a of dataAddrs) {
  if (lastEnd === null || a > lastEnd + 2) {
    if (lastStart !== null) console.log('  $' + lastStart.toString(16).toUpperCase() + '-$' + lastEnd.toString(16).toUpperCase());
    lastStart = a;
  }
  lastEnd = a;
}
if (lastStart !== null) console.log('  $' + lastStart.toString(16).toUpperCase() + '-$' + lastEnd.toString(16).toUpperCase());
