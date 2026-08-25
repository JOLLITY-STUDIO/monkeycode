const fs=require('fs');
const r=fs.readFileSync('src/asm/dist/tsubasa2.nes');
const p=16; const bs=8192; const bank=r.slice(p+2*bs,p+3*bs);

// 简单的 6502 反汇编
const opcodes={
0x00:['BRK','impl',1],0x01:['ORA','indx',2],0x05:['ORA','zpg',2],0x06:['ASL','zpg',2],0x08:['PHP','impl',1],0x09:['ORA','imm',2],0x0a:['ASL','acc',1],0x0d:['ORA','abs',3],
0x10:['BPL','rel',2],0x11:['ORA','indy',2],0x15:['ORA','zpgx',2],0x16:['ASL','zpgx',2],0x18:['CLC','impl',1],0x19:['ORA','absy',3],0x1d:['ORA','absx',3],
0x20:['JSR','abs',3],0x21:['AND','indx',2],0x24:['BIT','zpg',2],0x25:['AND','zpg',2],0x26:['ROL','zpg',2],0x28:['PLP','impl',1],0x29:['AND','imm',2],0x2a:['ROL','acc',1],
0x2c:['BIT','abs',3],0x2d:['AND','abs',3],0x30:['BMI','rel',2],0x31:['AND','indy',2],0x35:['AND','zpgx',2],0x38:['SEC','impl',1],0x39:['AND','absy',3],0x3d:['AND','absx',3],
0x40:['RTI','impl',1],0x41:['EOR','indx',2],0x45:['EOR','zpg',2],0x46:['LSR','zpg',2],0x48:['PHA','impl',1],0x49:['EOR','imm',2],0x4a:['LSR','acc',1],0x4c:['JMP','abs',3],
0x4d:['EOR','abs',3],0x50:['BVC','rel',2],0x51:['EOR','indy',2],0x55:['EOR','zpgx',2],0x56:['LSR','zpgx',2],0x58:['CLI','impl',1],0x59:['EOR','absy',3],0x5d:['EOR','absx',3],
0x60:['RTS','impl',1],0x61:['ADC','indx',2],0x65:['ADC','zpg',2],0x66:['ROR','zpg',2],0x68:['PLA','impl',1],0x69:['ADC','imm',2],0x6a:['ROR','acc',1],0x6c:['JMP','ind',3],
0x6d:['ADC','abs',3],0x70:['BVS','rel',2],0x71:['ADC','indy',2],0x75:['ADC','zpgx',2],0x78:['SEI','impl',1],0x79:['ADC','absy',3],0x7d:['ADC','absx',3],
0x81:['STA','indx',2],0x84:['STY','zpg',2],0x85:['STA','zpg',2],0x86:['STX','zpg',2],0x88:['DEY','impl',1],0x8a:['TXA','impl',1],0x8c:['STY','abs',3],0x8d:['STA','abs',3],
0x8e:['STX','abs',3],0x90:['BCC','rel',2],0x91:['STA','indy',2],0x94:['STY','zpgx',2],0x95:['STA','zpgx',2],0x96:['STX','zpgy',2],0x98:['TYA','impl',1],0x99:['STA','absy',3],
0x9a:['TXS','impl',1],0x9d:['STA','absx',3],0xa0:['LDY','imm',2],0xa1:['LDA','indx',2],0xa2:['LDX','imm',2],0xa4:['LDY','zpg',2],0xa5:['LDA','zpg',2],0xa6:['LDX','zpg',2],
0xa8:['TAY','impl',1],0xa9:['LDA','imm',2],0xaa:['TAX','impl',1],0xac:['LDY','abs',3],0xad:['LDA','abs',3],0xae:['LDX','abs',3],0xb0:['BCS','rel',2],0xb1:['LDA','indy',2],
0xb4:['LDY','zpgx',2],0xb5:['LDA','zpgx',2],0xb6:['LDX','zpgy',2],0xb8:['CLV','impl',1],0xb9:['LDA','absy',3],0xba:['TSX','impl',1],0xbc:['LDY','absx',3],0xbd:['LDA','absx',3],
0xc0:['CPY','imm',2],0xc1:['CMP','indx',2],0xc4:['CPY','zpg',2],0xc5:['CMP','zpg',2],0xc6:['DEC','zpg',2],0xc8:['INY','impl',1],0xc9:['CMP','imm',2],0xca:['DEX','impl',1],
0xcc:['CPY','abs',3],0xcd:['CMP','abs',3],0xd0:['BNE','rel',2],0xd1:['CMP','indy',2],0xd5:['CMP','zpgx',2],0xd8:['CLD','impl',1],0xd9:['CMP','absy',3],0xdd:['CMP','absx',3],
0xe0:['CPX','imm',2],0xe1:['SBC','indx',2],0xe4:['CPX','zpg',2],0xe5:['SBC','zpg',2],0xe6:['INC','zpg',2],0xe8:['INX','impl',1],0xe9:['SBC','imm',2],0xea:['NOP','impl',1],
0xec:['CPX','abs',3],0xed:['SBC','abs',3],0xf0:['BEQ','rel',2],0xf1:['SBC','indy',2],0xf5:['SBC','zpgx',2],0xf8:['SED','impl',1],0xf9:['SBC','absy',3],0xfd:['SBC','absx',3],
};

function dis(bank, start, count){
  let i=start, lines=[];
  for(let step=0;step<count;step++){
    if(i>=bank.length-3)break;
    const op=bank[i];
    const info=opcodes[op]||['???','???',1];
    const [mn,mode]=info;
    let s=`  $${i.toString(16).padStart(4,'0')}:`;
    if(mode==='imm')s+=(bank[i+1].toString(16).padStart(2,'0')+'  ');
    else if(mode==='zpg')s+=(bank[i+1].toString(16).padStart(2,'0')+'  ');
    else if(mode==='zpgx'||mode==='zpgy')s+=(bank[i+1].toString(16).padStart(2,'0')+'  ');
    else if(mode==='abs'||mode==='absx'||mode==='absy'||mode==='ind'){
      const a=bank[i+1]|(bank[i+2]<<8);
      s+=('$'+a.toString(16).padStart(4,'0')+' ');
    }else if(mode==='rel'){
      const off=bank[i+1];const o=off<128?off:off-256;
      const tgt=i+2+o;
      s+=(bank[i+1].toString(16).padStart(2,'0')+'  ');
      const tagged=mn+';->$'+tgt.toString(16).padStart(4,'0');
      s+=' '+tagged+' '+mode;
      lines.push(s);
      i+=info[2];
      continue;
    }else if(mode==='indx'||mode==='indy'){
      s+=(bank[i+1].toString(16).padStart(2,'0')+'  ');
    }else s+='   ';
    s+=' '+mn+' '+mode;
    lines.push(s);
    i+=info[2];
  }
  return lines;
}

// Scene0 main code: bank2 $0000-$00FF + 关键跳转
console.log('===== bank2 $0000-$00B0 (Scene0 init part 1) =====');
dis(bank,0,80).slice(0,40).forEach(l=>console.log(l));

console.log('\n===== bank2 $00B0-$0130 (Scene0 init part 2: scroll/CHr/IRQ) =====');
dis(bank,0xB0,30).forEach(l=>console.log(l));

console.log('\n===== bank2 $0190-$01C0 (loop/branch end) =====');
dis(bank,0x190,16).forEach(l=>console.log(l));
