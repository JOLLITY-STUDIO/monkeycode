// dump bank0 script driver $87D0-$88C0
const fs = require('fs');
const PRG = fs.readFileSync('rom/tsubasa2.nes');
// bank0 = PRG index 0 = 16KB
const base = 0x10 + 0; // header 16 + bank*0x4000
function rd(a) {
  // a in $8000-$BFFF
  return PRG[base + (a - 0x8000)];
}
const ops = '00:BRK 01:ORA(X) 05:ORA zp 06:ASL zp 08:PHP 09:ORA # 0A:ASL A 0D:ORA abs 0E:ASL abs 10:BPL 11:ORA(Y) 15:ORA zp,X 16:ASL zp,X 18:CLC 19:ORA abs,Y 1D:ORA abs,X 20:JSR 21:AND(X) 24:BIT zp 25:AND zp 26:ROL zp 28:PLP 29:AND # 2A:ROL A 2C:BIT abs 2D:AND abs 2E:ROL abs 30:BMI 31:AND(Y) 35:AND zp,X 36:ROL zp,X 38:SEC 39:AND abs,Y 3D:AND abs,X 40:RTI 41:EOR(X) 45:EOR zp 46:LSR zp 48:PHA 49:EOR # 4A:LSR A 4C:JMP 4D:EOR abs 4E:LSR abs 50:BVC 51:EOR(Y) 55:EOR zp,X 56:LSR zp,X 58:CLI 59:EOR abs,Y 5D:EOR abs,X 60:RTS 61:ADC(X) 65:ADC zp 66:ROR zp 68:PLA 69:ADC # 6A:ROR A 6C:JMP() 6D:ADC abs 6E:ROR abs 70:BVS 71:ADC(Y) 75:ADC zp,X 76:ROR zp,X 78:SEI 79:ADC abs,Y 7D:ADC abs,X 81:STA(X) 84:STY zp 85:STA zp 86:STX zp 88:DEY 8A:TXA 8C:STY abs 8D:STA abs 8E:STX abs 90:BCC 91:STA(Y) 94:STY zp,X 95:STA zp,X 96:STX zp,Y 98:TYA 99:STA abs,Y 9A:TXS 9D:STA abs,X A0:LDY # A1:LDA(X) A2:LDX # A4:LDY zp A5:LDA zp A6:LDX zp A8:TAY A9:LDA # AA:TAX AC:LDY abs AD:LDA abs AE:LDX abs B0:BCS B1:LDA(Y) B4:LDY zp,X B5:LDA zp,X B6:LDX zp,Y B8:CLV B9:LDA abs,Y BA:TSX BC:LDY abs,X BD:LDA abs,X BE:LDX abs,Y C0:CPY # C1:CMP(X) C4:CPY zp C5:CMP zp C6:DEC zp C8:INY C9:CMP # CA:DEX CC:CPY abs CD:CMP abs CE:DEC abs D0:BNE D1:CMP(Y) D5:CMP zp,X D6:DEC zp,X D8:CLD D9:CMP abs,Y DD:CMP abs,X DE:DEC abs,X E0:CPX # E1:SBC(X) E4:CPX zp E5:SBC zp E6:INC zp E8:INX E9:SBC # EA:NOP EC:CPX abs ED:SBC abs EE:INC abs F0:BEQ F1:SBC(Y) F5:SBC zp,X F6:INC zp,X F8:SED F9:SBC abs,Y FD:SBC abs,X FE:INC abs,X'.split(/\s+/).reduce((m, s) => { const p = s.split(':'); m.set(parseInt(p[0], 16), p[1]); return m; }, new Map());
function dis(start, end) {
  let a = start;
  let out = [];
  while (a <= end) {
    const op = rd(a);
    const name = ops.get(op) || '??';
    let arg = '';
    let len = 1;
    if (name.includes('abs,Y')) { arg = '$' + rd(a+2).toString(16).padStart(2,'0') + rd(a+1).toString(16).padStart(2,'0') + ',Y'; len = 3; }
    else if (name.includes('abs,X')) { arg = '$' + rd(a+2).toString(16).padStart(2,'0') + rd(a+1).toString(16).padStart(2,'0') + ',X'; len = 3; }
    else if (name.includes('(X)')) { arg = '($' + rd(a+1).toString(16).padStart(2,'0') + ',X)'; len = 2; }
    else if (name.includes('(Y)')) { arg = '($' + rd(a+1).toString(16).padStart(2,'0') + '),Y'; len = 2; }
    else if (name.includes('#')) { arg = '#' + rd(a+1).toString(16).padStart(2,'0'); len = 2; }
    else if (name.includes('zp,X')) { arg = 'z $' + rd(a+1).toString(16).padStart(2,'0') + ',X'; len = 2; }
    else if (name.includes('zp,Y')) { arg = 'z $' + rd(a+1).toString(16).padStart(2,'0') + ',Y'; len = 2; }
    else if (name.includes('abs')) { arg = '$' + rd(a+2).toString(16).padStart(2,'0') + rd(a+1).toString(16).padStart(2,'0'); len = 3; }
    else if (name.includes('JMP()')) { arg = '($' + rd(a+2).toString(16).padStart(2,'0') + rd(a+1).toString(16).padStart(2,'0') + ')'; len = 3; }
    else if (name.includes('zp')) { arg = 'z $' + rd(a+1).toString(16).padStart(2,'0'); len = 2; }
    else if (/BPL|BMI|BVC|BVS|BCC|BCS|BNE|BEQ/.test(name)) {
      const rel = rd(a+1);
      const target = (a + 2 + (rel > 127 ? rel - 256 : rel)) & 0xFFFF;
      arg = '-> $' + target.toString(16).toUpperCase().padStart(4,'0');
      len = 2;
    }
    let hex = [];
    for (let i = 0; i < len; i++) hex.push(rd(a+i).toString(16).padStart(2,'0'));
    out.push('$' + a.toString(16).toUpperCase().padStart(4,'0') + ' ' + hex.join(' ') + '  ' + name + ' ' + arg);
    a += len;
  }
  return out;
}
console.log('==== bank0 $87D0-$88C0 ====');
console.log(dis(0x87d0, 0x88c0).join('\n'));
