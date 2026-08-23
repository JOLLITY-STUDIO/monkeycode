// 临时：分析参考 NSF 的 init 例程($C400)与曲目表 → 确认 BGM/SE 数据窗口
const fs = require('fs');
const path = require('path');

const refNsf = fs.readFileSync(path.join(__dirname, '..', 'tools', 'tsubasa2-mod-nes', 'ct2.nsf'));
const refBank2 = refNsf.slice(128 + 0x4000, 128 + 0x6000); // init + 曲目表 @ $C000-$DFFF
const refBank3 = refNsf.slice(128 + 0x6000, 128 + 0x8000);

// 简易 6502 反汇编（够看 init 流程即可）
const ops = {
  0xa2:'LDX',0xa0:'LDY',0xa9:'LDA',0x8c:'STX',0x8e:'STX',0x8d:'STA',
  0xac:'LDY',0xad:'LDA',0xae:'LDX',0x20:'JSR',0x4c:'JMP',0x60:'RTS',
  0xc9:'CMP',0xd0:'BNE',0xf0:'BEQ',0x90:'BCC',0xb0:'BCS',0x18:'CLC',0x38:'SEC',
  0x86:'STX',0x84:'STY',0x85:'STA',0xa6:'LDX',0xa4:'LDY',0xa5:'LDA',0xe8:'INX',
  0xca:'DEX',0x88:'DEY',0xc8:'INY',0xea:'NOP',0x29:'AND',0x09:'ORA',0x4a:'LSR',
  0x0a:'ASL',0x6a:'ROR',0x2a:'ROL',0x10:'BPL',0x30:'BMI',0x8a:'TXA',0x98:'TYA',
  0xaa:'TAX',0xa8:'TAY',0x48:'PHA',0x68:'PLA',0x5c:'JMP',0x6c:'JMP',0x1d:'ORA',
  0x45:'EOR',0xe0:'CPX',0xe4:'CPX',0xc0:'CPY',0xc4:'CPY',0xce:'DEC',
  0xde:'DEC',0xee:'DEC',0xf6:'INC',0xe6:'INC',0xd6:'DEC',0xc6:'DEC',0x9d:'STA',
  0x99:'STA',0x91:'STA',0x95:'STA',0x31:'AND',0x11:'ORA',0x51:'EOR',0x81:'STA',
  0x92:'STA',0x7d:'ADC',0x7c:'JMP',0x1a:'INC',0x3a:'DEC',0x5a:'PHY',0x7a:'PLY',
  0xda:'PHX',0xfa:'PLX',0x9c:'STZ',0x64:'STZ',0x22:'JSL',0x42:'WDM',0x53:'REP',
  0x1b:'TCS',0x69:'ADC',0xE9:'SBC',0xE5:'SBC',0xcb:'WAI',0xdb:'STP',
};

function dis(addr, data, off, count) {
  let y = off;
  for (let i = 0; i < count && y < data.length; ) {
    const a = (addr + (y - off)) & 0xffff;
    const op = data[y];
    const name = ops[op] || ('??$' + op.toString(16));
    let line = `$${a.toString(16).padStart(4,'0')}: ${op.toString(16).padStart(2,'0')}`;
    let len = 1;
    if (op >= 0xa0 && op <= 0xbf) len = 2; else if (op === 0x20 || op === 0x4c || op === 0x6c || op === 0x5c) len = 3;
    else if ([0xa9,0xa2,0xa0,0xc9,0xc0,0xe0,0xe4,0xc4,0x69,0xe9,0x29,0x09,0x45,0x0d,0x0e].includes(op)) len = 2;
    else if ([0x8d,0x8c,0x8e,0xad,0xac,0xae,0xcd,0xcc,0xce,0xee,0xec,0x7d,0x9d,0x99,0x1d].includes(op)) len = 3;
    if (len > 1) {
      const v = len === 2 ? data[y+1] : (data[y+1] | (data[y+2] << 8));
      line += ' ' + (len === 2 ? ('$' + v.toString(16).padStart(2,'0')) : ('$' + v.toString(16).padStart(4,'0')));
      line = line.padEnd(14) + name + ' ' + (len===2?'#'+('$'+v.toString(16).padStart(2,'0')):('$'+v.toString(16).padStart(4,'0')));
    } else {
      line = line.padEnd(14) + name;
    }
    console.log(line);
    y += len; i += len;
  }
}

console.log('=== NSF bank2 init $C400 ===');
dis(0xc400, refBank2, 0x400, 90);

// 找曲目表：通常紧跟 init 例程后
console.log('\n=== bank2 前 0x200 字节 hex ===');
const h = (arr, o, n) => Array.from(arr.slice(o, o+n)).map(v=>v.toString(16).padStart(2,'0')).join(' ');
for (let o = 0x400; o < 0x800; o += 16) console.log(`$${(0xc000+o).toString(16)}: ${h(refBank2, o, 16)}`);
