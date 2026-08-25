// 综合 dump：bank0/bank2 辅助例程精确机器码（场景 S14-S23 翻译所需）
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const b0 = (cpu) => cpu - 0x8000;
const b2 = (cpu) => cpu - 0xA000 + 0x4000;

// 权威 6502 寻址模式表
const MODE = {};
function setModes(list, mode) { for (const op of list) MODE[parseInt(op, 16)] = mode; }
setModes(['00','08','0A','18','28','2A','38','40','48','4A','58','60','68','6A','78','88','8A','98','9A','A8','AA','B8','BA','C8','CA','D8','E8','EA','F8'], 'imp');
setModes(['01','05','09','0D','11','15','19','1D','21','25','29','2D','31','35','39','3D','41','45','49','4D','51','55','59','5D','61','65','69','6D','71','75','79','7D','81','85','89','91','95','99','9D','A1','A5','A9','AD','B1','B5','B9','BD','C1','C5','C9','CD','D1','D5','D9','DD','E1','E5','E9','ED','F1','F5','F9','FD'], 'aa'); // 默认 2 字节
setModes(['06','0E','16','1E','26','2E','36','3E','46','4E','56','5E','66','6E','76','7E','84','86','8C','8E','94','96','A0','A2','A4','A6','AC','AE','B0','B4','B6','BC','BE','C0','C4','C6','CC','CE','D6','DE','E0','E4','E6','EC','EE','F6','FE','90','30','10','D0','F0','70','50'], 'aa2'); // 2 字节但不需区分（可覆盖）
setModes(['20','4C','6C'], 'aa3');
// 特殊：立即数（2 字节，操作数打印 #$xx）
const IMM = new Set([0x09,0x29,0x49,0x69,0xE9,0xA9,0xA0,0xA2,0xC0,0xC9,0xE0]);
// 分支（2 字节，相对）
const REL = new Set([0x10,0x30,0x50,0x70,0x90,0xB0,0xD0,0xF0]);
// 零页（2 字节，操作数 $xx 无 #）
const ZP = new Set([0x05,0x06,0x15,0x16,0x21,0x24,0x25,0x26,0x35,0x36,0x41,0x45,0x46,0x51,0x55,0x56,0x61,0x65,0x66,0x71,0x75,0x76,0x81,0x84,0x85,0x86,0x91,0x94,0x95,0x96,0xA1,0xA4,0xA5,0xA6,0xB1,0xB4,0xB5,0xB6,0xC1,0xC4,0xC5,0xC6,0xD1,0xD5,0xD6,0xE1,0xE4,0xE5,0xE6,0xF1,0xF5,0xF6]);
// 绝对（3 字节）
const ABS = new Set([0x0D,0x0E,0x19,0x1D,0x1E,0x2C,0x2D,0x2E,0x39,0x3D,0x3E,0x4D,0x4E,0x59,0x5D,0x5E,0x6D,0x6E,0x79,0x7D,0x7E,0x8C,0x8D,0x8E,0x99,0x9D,0xAC,0xAD,0xAE,0xB9,0xBC,0xBD,0xBE,0xCC,0xCD,0xCE,0xD9,0xDD,0xDE,0xEC,0xED,0xEE,0xF9,0xFD,0xFE,0x20,0x4C,0x6C]);
const OPN = {
  0xa9:'LDA',0xa0:'LDY',0xa2:'LDX',0x09:'ORA',0x29:'AND',0x49:'EOR',0x69:'ADC',0xe9:'SBC',0xc9:'CMP',0xe0:'CPX',0xc0:'CPY',
  0xa5:'LDA',0x85:'STA',0x86:'STX',0x84:'STY',0xa6:'LDX',0xa4:'LDY',0x24:'BIT',0xc4:'CPY',0xe4:'CPX',0xc5:'CMP',0xc6:'DEC',0xe6:'INC',0x65:'ADC',0xe5:'SBC',0x66:'ROR',0x46:'LSR',0x26:'ROL',0x06:'ASL',0x96:'STX',0xb5:'LDA',0x95:'STA',0x75:'ADC',0xd5:'CMP',0xf5:'SBC',0x15:'ORA',0x35:'AND',0x55:'EOR',0x36:'ROL',0x56:'LSR',0x16:'ASL',0x76:'ROR',0x94:'STY',0xb4:'LDY',0xb6:'LDX',0x81:'STA',0x91:'STA',0xb1:'LDA',0xa1:'LDA',0x21:'AND',0x31:'AND',0x41:'EOR',0x51:'EOR',0x61:'ADC',0x71:'ADC',0xc1:'CMP',0xd1:'CMP',0xe1:'SBC',0xf1:'SBC',0x25:'AND',0x45:'EOR',0x05:'ORA',
  0x8d:'STA',0xad:'LDA',0xae:'LDX',0x9d:'STA',0xbd:'LDA',0xb9:'LDA',0x99:'STA',0xd9:'CMP',0x79:'ADC',0x7d:'ADC',0xf9:'SBC',0xdd:'CMP',0xac:'LDY',0xec:'CPX',0xcc:'CPY',0xcd:'CMP',0x8c:'STY',0xee:'INC',0xce:'DEC',0x2c:'BIT',0x4e:'LSR',0x6e:'ROR',0x0e:'ASL',0x2e:'ROL',0x1e:'ASL',0x3e:'ROL',0x5e:'LSR',0x7e:'ROR',
  0x20:'JSR',0x4c:'JMP',0x6c:'JMP',
  0x30:'BMI',0x10:'BPL',0x90:'BCC',0xb0:'BCS',0xd0:'BNE',0xf0:'BEQ',0x70:'BVS',0x50:'BVC',
  0x4a:'LSR',0x0a:'ASL',0x2a:'ROL',0x88:'DEY',0x8a:'TXA',0x98:'TYA',0xaa:'TAX',0xa8:'TAY',0xca:'DEX',0xe8:'INX',0x48:'PHA',0x68:'PLA',0x08:'PHP',0x28:'PLP',0x18:'CLC',0x38:'SEC',0x58:'CLI',0x78:'SEI',0xb8:'CLV',0xd8:'CLD',0xf8:'SED',0x60:'RTS',0x40:'RTI',0xea:'NOP',0x9a:'TXS',0xba:'TSX',
};
function disasm(cpuStart, len, bankFn, label) {
  let p = cpuStart; const end = cpuStart + len; const out = [];
  while (p < end) {
    const i = bankFn(p); const b = prg[i];
    const op = OPN[b];
    if (op === undefined) { out.push('$' + p.toString(16).toUpperCase().padStart(4,'0') + ': .byte $' + b.toString(16).padStart(2,'0')); p++; continue; }
    if (IMM.has(b)) {
      out.push('$' + p.toString(16).toUpperCase().padStart(4,'0') + ': ' + op + ' #$' + prg[i+1].toString(16).padStart(2,'0').toUpperCase()); p += 2;
    } else if (REL.has(b)) {
      const rel = prg[i+1]; const tgt = (p + 2 + (rel > 127 ? rel - 256 : rel)) & 0xffff;
      out.push('$' + p.toString(16).toUpperCase().padStart(4,'0') + ': ' + op + ' $' + rel.toString(16).padStart(2,'0').toUpperCase() + ' -> $' + tgt.toString(16).toUpperCase()); p += 2;
    } else if (ABS.has(b)) {
      const a = (prg[i+1] | (prg[i+2] << 8));
      const off2 = bankFn(p + 3);
      const absIdx = op + ' $' + a.toString(16).padStart(4,'0').toUpperCase();
      out.push('$' + p.toString(16).toUpperCase().padStart(4,'0') + ': ' + absIdx); p += 3;
    } else if (ZP.has(b)) {
      out.push('$' + p.toString(16).toUpperCase().padStart(4,'0') + ': ' + op + ' $' + prg[i+1].toString(16).padStart(2,'0').toUpperCase()); p += 2;
    } else {
      out.push('$' + p.toString(16).toUpperCase().padStart(4,'0') + ': ' + op); p++;
    }
  }
  return out.join('\n');
}
function hexdump(cpuStart, len, bankFn, label) {
  const off = bankFn(cpuStart);
  const bytes = Array.from(prg.slice(off, off + len));
  const lines = [];
  lines.push('===== ' + label + ' $' + cpuStart.toString(16).toUpperCase() + ' (' + len + 'B) =====');
  lines.push(JSON.stringify(bytes));
  for (let i = 0; i < bytes.length; i += 16) {
    lines.push('$' + (cpuStart + i).toString(16).toUpperCase().padStart(4,'0') + ': ' + bytes.slice(i, i+16).map(x=>x.toString(16).padStart(2,'0')).join(' '));
  }
  return lines.join('\n');
}
const R = [];
R.push(disasm(0x8895, 0x20, b0, 'bank0 $8895 (CHR config wrapper)'));
R.push(disasm(0x890C, 0x30, b0, 'bank0 $890C (fade/scroll? + $8920)'));
R.push(disasm(0x8920, 0x40, b0, 'bank0 $8920 (load scene data)'));
R.push(disasm(0x98E8, 0x30, b0, 'bank0 $98E8/$98EA (NT fill)'));
R.push(disasm(0x9B91, 0x20, b0, 'bank0 $9B91 (clear ext)'));
R.push(disasm(0x9E36, 0x50, b0, 'bank0 $9E36 (hex16 helper)'));
R.push(disasm(0x9E7C, 0x30, b0, 'bank0 $9E7C (hex16/BCD)'));
R.push(disasm(0x88CA, 0x42, b0, 'bank0 $88CA-$890B (NT buffer write)'));
R.push(disasm(0x8976, 0x3A, b0, 'bank0 $8976 (NT attr stream)'));
R.push(disasm(0x9085, 0x60, b0, 'bank0 $9085 (buffer exec)'));
R.push(disasm(0x9B28, 0x50, b0, 'bank0 $9B28-$9B77 (NT buffer alloc/commit)'));
R.push(disasm(0x9A35, 0x50, b0, 'bank0 $9A35-$9A84 (palette + fade)'));
R.push(disasm(0x9B07, 0x25, b0, 'bank0 $9B07/$9AB8/$9ADA (palette load)'));
R.push(disasm(0x9AB8, 0x25, b0, 'bank0 $9AB8 (bg palette)'));
R.push(disasm(0x9ADA, 0x25, b0, 'bank0 $9ADA (spr palette)'));
R.push(disasm(0x9FA8, 0x40, b0, 'bank0 $9FA8 (wait)'));
R.push(disasm(0x9F89, 0x20, b0, 'bank0 $9F89-$9FA7 (coop flag)'));
R.push(disasm(0xA82F, 0x60, b2, 'bank2 $A82F (sprite loader)'));
R.push(disasm(0xA767, 0x20, b2, 'bank2 $A767 (copy)'));
R.push(disasm(0xA72C, 0x40, b2, 'bank2 $A72C (sprite mover)'));
R.push(disasm(0xA7BE, 0x10, b2, 'bank2 $A7BE (S20)'));
R.push(disasm(0xAC6D, 0x40, b2, 'bank2 $AC6D-$ACAC (hex tables)'));
R.push(hexdump(0xA677, 0x28, b2, 'bank2 $A677-$A69E (sprite table)'));
R.push(hexdump(0xA67B, 0x40, b2, 'bank2 $A67B (sprite data)'));
R.push(hexdump(0xAA97, 0x340, b2, 'bank2 $AA97 (NT stream full)'));
R.push(disasm(0xA500, 0x60, b2, 'bank2 $A500 (S0 tail helpers)'));
console.log(R.join('\n\n'));
