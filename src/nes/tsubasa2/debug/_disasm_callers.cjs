// 反汇编 bank0 $8807 附近（派发器调用点）+ $80FA/$8277（roster load）+ $810F（scene entry A）
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);

const ops = new Map();
'00:BRK 01:ORA(X) 05:ORA zp 06:ASL zp 08:PHP 09:ORA # 0A:ASL A 0D:ORA abs 0E:ASL abs 10:BPL 11:ORA(Y) 15:ORA zp,X 16:ASL zp,X 18:CLC 19:ORA abs,Y 1D:ORA abs,X 20:JSR 21:AND(X) 24:BIT zp 25:AND zp 26:ROL zp 28:PLP 29:AND # 2A:ROL A 2C:BIT abs 2D:AND abs 2E:ROL abs 30:BMI 31:AND(Y) 35:AND zp,X 36:ROL zp,X 38:SEC 39:AND abs,Y 3D:AND abs,X 40:RTI 41:EOR(X) 45:EOR zp 46:LSR zp 48:PHA 49:EOR # 4A:LSR A 4C:JMP 4D:EOR abs 4E:LSR abs 50:BVC 51:EOR(Y) 55:EOR zp,X 56:LSR zp,X 58:CLI 59:EOR abs,Y 5D:EOR abs,X 60:RTS 61:ADC(X) 65:ADC zp 66:ROR zp 68:PLA 69:ADC # 6A:ROR A 6C:JMP() 6D:ADC abs 6E:ROR abs 70:BVS 71:ADC(Y) 75:ADC zp,X 76:ROR zp,X 78:SEI 79:ADC abs,Y 7D:ADC abs,X 81:STA(X) 84:STY zp 85:STA zp 86:STX zp 88:DEY 8A:TXA 8C:STY abs 8D:STA abs 8E:STX abs 90:BCC 91:STA(Y) 94:STY zp,X 95:STA zp,X 96:STX zp,Y 98:TYA 99:STA abs,Y 9A:TXS 9D:STA abs,X A0:LDY # A1:LDA(X) A2:LDX # A4:LDY zp A5:LDA zp A6:LDX zp A8:TAY A9:LDA # AA:TAX AC:LDY abs AD:LDA abs AE:LDX abs B0:BCS B1:LDA(Y) B4:LDY zp,X B5:LDA zp,X B6:LDX zp,Y B8:CLV B9:LDA abs,Y BA:TSX BC:LDY abs,X BD:LDA abs,X BE:LDX abs,Y C0:CPY # C1:CMP(X) C4:CPY zp C5:CMP zp C6:DEC zp C8:INY C9:CMP # CA:DEX CC:CPY abs CD:CMP abs CE:DEC abs D0:BNE D1:CMP(Y) D5:CMP zp,X D6:DEC zp,X D8:CLD D9:CMP abs,Y DD:CMP abs,X DE:DEC abs,X E0:CPX # E1:SBC(X) E4:CPX zp E5:SBC zp E6:INC zp E8:INX E9:SBC # EA:NOP EC:CPX abs ED:SBC abs EE:INC abs F0:BEQ F1:SBC(Y) F5:SBC zp,X F6:INC zp,X F8:SED F9:SBC abs,Y FD:SBC abs,X FE:INC abs,X'.split(/\s+/).reduce((m, s) => { const p = s.split(':'); m.set(parseInt(p[0], 16), p[1]); return m; }, ops);
const lens = new Map([[0x00,1],[0x01,2],[0x05,2],[0x06,2],[0x08,1],[0x09,2],[0x0A,1],[0x0D,3],[0x0E,3],[0x10,2],[0x11,2],[0x15,2],[0x16,2],[0x18,1],[0x19,3],[0x1D,3],[0x20,3],[0x21,2],[0x24,2],[0x25,2],[0x26,2],[0x28,1],[0x29,2],[0x2A,1],[0x2C,3],[0x2D,3],[0x2E,3],[0x30,2],[0x31,2],[0x35,2],[0x36,2],[0x38,1],[0x39,3],[0x3D,3],[0x40,1],[0x41,2],[0x45,2],[0x46,2],[0x48,1],[0x49,2],[0x4A,1],[0x4C,3],[0x4D,3],[0x4E,3],[0x50,2],[0x51,2],[0x55,2],[0x56,2],[0x58,1],[0x59,3],[0x5D,3],[0x60,1],[0x61,2],[0x65,2],[0x66,2],[0x68,1],[0x69,2],[0x6A,1],[0x6C,3],[0x6D,3],[0x6E,3],[0x70,2],[0x71,2],[0x75,2],[0x76,2],[0x78,1],[0x79,3],[0x7D,3],[0x81,2],[0x84,2],[0x85,2],[0x86,2],[0x88,1],[0x8A,1],[0x8C,3],[0x8D,3],[0x8E,3],[0x90,2],[0x91,2],[0x94,2],[0x95,2],[0x96,2],[0x98,1],[0x99,3],[0x9A,1],[0x9D,3],[0xA0,2],[0xA1,2],[0xA2,2],[0xA4,2],[0xA5,2],[0xA6,2],[0xA8,1],[0xA9,2],[0xAA,1],[0xAC,3],[0xAD,3],[0xAE,3],[0xB0,2],[0xB1,2],[0xB4,2],[0xB5,2],[0xB6,2],[0xB8,1],[0xB9,3],[0xBA,1],[0xBC,3],[0xBD,3],[0xBE,3],[0xC0,2],[0xC1,2],[0xC4,2],[0xC5,2],[0xC6,2],[0xC8,1],[0xC9,2],[0xCA,1],[0xCC,3],[0xCD,3],[0xCE,3],[0xD0,2],[0xD1,2],[0xD5,2],[0xD6,2],[0xD8,1],[0xD9,3],[0xDD,3],[0xDE,3],[0xE0,2],[0xE1,2],[0xE4,2],[0xE5,2],[0xE6,2],[0xE8,1],[0xE9,2],[0xEA,1],[0xEC,3],[0xED,3],[0xEE,3],[0xF0,2],[0xF1,2],[0xF5,2],[0xF6,2],[0xF8,1],[0xF9,3],[0xFD,3],[0xFE,3]]);

// bank0: PRG 偏移 = cpu - 0x8000
const b0 = (cpu) => cpu - 0x8000;

function disasm(cpuStart, cpuEnd, bankFn, label) {
  console.log(`\n===== ${label} $${cpuStart.toString(16).toUpperCase()} =====`);
  let pc = cpuStart;
  while (pc <= cpuEnd) {
    const off = bankFn(pc);
    if (off < 0 || off >= prg.length) break;
    const op = prg[off];
    const name = ops.get(op) || `???`;
    const len = lens.get(op) ?? 1;
    const bytes = Array.from(prg.slice(off, off + len));
    let arg = '';
    if (len === 2) {
      const v = bytes[1];
      arg = (name.includes('abs') || name.includes('zp')) ? `$${v.toString(16).toUpperCase().padStart(2, '0')}` : `#$${v.toString(16).toUpperCase().padStart(2, '0')}`;
    } else if (len === 3) {
      const v = bytes[1] | (bytes[2] << 8);
      if (name.includes('JSR') || name.includes('JMP')) arg = `$${v.toString(16).toUpperCase().padStart(4, '0')}`;
      else arg = `$${v.toString(16).toUpperCase().padStart(4, '0')}`;
    }
    console.log(`$${pc.toString(16).toUpperCase().padStart(4, '0')}: ${name}${arg ? ' ' + arg : ''}`);
    pc += len;
  }
}

// 派发器调用点 $8807
disasm(0x87E0, 0x8830, b0, 'bank0 $87E0-$8830 (dispatcher caller)');
// roster load 调用点
disasm(0x80E0, 0x8120, b0, 'bank0 $80E0-$8120 (A20F/A20C callers)');
disasm(0x8260, 0x8290, b0, 'bank0 $8260-$8290 (A20F caller 2)');
