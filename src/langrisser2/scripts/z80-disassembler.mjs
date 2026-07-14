import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..', '..');
const ROM_PATH = path.join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const rom = fs.readFileSync(ROM_PATH);

const Z80_CODE_START = 0x1EC000;
const Z80_CODE_SIZE = 0x1FFF;

class Z80Disassembler {
  constructor(code, baseAddr) {
    this.code = code;
    this.baseAddr = baseAddr;
    this.pos = 0;
    this.labels = {};
    this.jumpTargets = new Set();
  }

  disassemble() {
    this.findJumpTargets();
    const instructions = [];
    
    while (this.pos < this.code.length) {
      const addr = this.baseAddr + this.pos;
      const instr = this.disassembleInstruction();
      if (instr) {
        instructions.push({ addr, bytes: instr.bytes, mnemonic: instr.mnemonic, args: instr.args, comment: instr.comment });
      }
    }
    
    return instructions;
  }

  findJumpTargets() {
    let pos = 0;
    while (pos < this.code.length) {
      const opcode = this.code[pos];
      
      if ((opcode & 0xC0) === 0xC0) {
        const rel = this.code[pos + 1];
        const target = this.baseAddr + pos + 2 + (rel > 127 ? rel - 256 : rel);
        this.jumpTargets.add(target);
        pos += 2;
      } else if (opcode === 0x0C || opcode === 0x1C || opcode === 0x2C || opcode === 0x3C ||
                 opcode === 0x04 || opcode === 0x14 || opcode === 0x24 || opcode === 0x34) {
        pos += 1;
      } else if (opcode === 0xCD) {
        const addr = (this.code[pos + 2] << 8) | this.code[pos + 1];
        this.jumpTargets.add(addr);
        pos += 3;
      } else if (opcode === 0xCC || opcode === 0xDC || opcode === 0xEC || opcode === 0xFC) {
        const addr = (this.code[pos + 2] << 8) | this.code[pos + 1];
        this.jumpTargets.add(addr);
        pos += 3;
      } else if (opcode === 0xC3) {
        const addr = (this.code[pos + 2] << 8) | this.code[pos + 1];
        this.jumpTargets.add(addr);
        pos += 3;
      } else if (opcode === 0xD3 || opcode === 0xDB) {
        pos += 2;
      } else if (opcode === 0xED) {
        const ext = this.code[pos + 1];
        if (ext === 0x49 || ext === 0x51 || ext === 0x59 || ext === 0x61 || 
            ext === 0x69 || ext === 0x71 || ext === 0x79 || ext === 0x41 ||
            ext === 0x45 || ext === 0x4D || ext === 0x55 || ext === 0x5D ||
            ext === 0x65 || ext === 0x6D || ext === 0x75 || ext === 0x7D) {
          pos += 4;
        } else if (ext === 0x5B || ext === 0x6B || ext === 0x7B || ext === 0x8B ||
                   ext === 0x9B || ext === 0xAB || ext === 0xBB || ext === 0xCB) {
          pos += 3;
        } else {
          pos += 2;
        }
      } else {
        pos += 1;
      }
    }
  }

  disassembleInstruction() {
    const startPos = this.pos;
    const opcode = this.code[this.pos++];
    
    if (opcode === 0xED) {
      return this.disassembleExtended();
    }

    const instr = this.disassembleCB(opcode);
    if (instr) return instr;

    const result = { bytes: [], mnemonic: '', args: '', comment: '' };
    
    switch (opcode) {
      case 0x00: result.mnemonic = 'NOP'; break;
      case 0x01: result.mnemonic = 'LD BC'; result.args = this.readWord(); break;
      case 0x11: result.mnemonic = 'LD DE'; result.args = this.readWord(); break;
      case 0x21: result.mnemonic = 'LD HL'; result.args = this.readWord(); break;
      case 0x31: result.mnemonic = 'LD SP'; result.args = this.readWord(); break;
      case 0x06: result.mnemonic = 'LD B'; result.args = this.readByte(); break;
      case 0x0E: result.mnemonic = 'LD C'; result.args = this.readByte(); break;
      case 0x16: result.mnemonic = 'LD D'; result.args = this.readByte(); break;
      case 0x1E: result.mnemonic = 'LD E'; result.args = this.readByte(); break;
      case 0x26: result.mnemonic = 'LD H'; result.args = this.readByte(); break;
      case 0x2E: result.mnemonic = 'LD L'; result.args = this.readByte(); break;
      case 0x36: result.mnemonic = 'LD (HL)'; result.args = this.readByte(); break;
      case 0x3E: result.mnemonic = 'LD A'; result.args = this.readByte(); break;
      case 0x0A: result.mnemonic = 'LD A'; result.args = '(BC)'; break;
      case 0x1A: result.mnemonic = 'LD A'; result.args = '(DE)'; break;
      case 0x2A: result.mnemonic = 'LD A'; result.args = '(HL+)'; break;
      case 0x3A: result.mnemonic = 'LD A'; result.args = '(HL-)'; break;
      case 0x02: result.mnemonic = 'LD (BC)'; result.args = ', A'; break;
      case 0x12: result.mnemonic = 'LD (DE)'; result.args = ', A'; break;
      case 0x22: result.mnemonic = 'LD (HL+)'; result.args = ', A'; break;
      case 0x32: result.mnemonic = 'LD (HL-)'; result.args = ', A'; break;
      case 0x7F: result.mnemonic = 'LD A'; result.args = ', A'; break;
      case 0x78: result.mnemonic = 'LD A'; result.args = ', B'; break;
      case 0x79: result.mnemonic = 'LD A'; result.args = ', C'; break;
      case 0x7A: result.mnemonic = 'LD A'; result.args = ', D'; break;
      case 0x7B: result.mnemonic = 'LD A'; result.args = ', E'; break;
      case 0x7C: result.mnemonic = 'LD A'; result.args = ', H'; break;
      case 0x7D: result.mnemonic = 'LD A'; result.args = ', L'; break;
      case 0x7E: result.mnemonic = 'LD A'; result.args = ', (HL)'; break;
      case 0x47: result.mnemonic = 'LD B'; result.args = ', A'; break;
      case 0x40: result.mnemonic = 'LD B'; result.args = ', B'; break;
      case 0x41: result.mnemonic = 'LD B'; result.args = ', C'; break;
      case 0x42: result.mnemonic = 'LD B'; result.args = ', D'; break;
      case 0x43: result.mnemonic = 'LD B'; result.args = ', E'; break;
      case 0x44: result.mnemonic = 'LD B'; result.args = ', H'; break;
      case 0x45: result.mnemonic = 'LD B'; result.args = ', L'; break;
      case 0x46: result.mnemonic = 'LD B'; result.args = ', (HL)'; break;
      case 0x4F: result.mnemonic = 'LD C'; result.args = ', A'; break;
      case 0x48: result.mnemonic = 'LD C'; result.args = ', B'; break;
      case 0x49: result.mnemonic = 'LD C'; result.args = ', C'; break;
      case 0x4A: result.mnemonic = 'LD C'; result.args = ', D'; break;
      case 0x4B: result.mnemonic = 'LD C'; result.args = ', E'; break;
      case 0x4C: result.mnemonic = 'LD C'; result.args = ', H'; break;
      case 0x4D: result.mnemonic = 'LD C'; result.args = ', L'; break;
      case 0x4E: result.mnemonic = 'LD C'; result.args = ', (HL)'; break;
      case 0x57: result.mnemonic = 'LD D'; result.args = ', A'; break;
      case 0x50: result.mnemonic = 'LD D'; result.args = ', B'; break;
      case 0x51: result.mnemonic = 'LD D'; result.args = ', C'; break;
      case 0x52: result.mnemonic = 'LD D'; result.args = ', D'; break;
      case 0x53: result.mnemonic = 'LD D'; result.args = ', E'; break;
      case 0x54: result.mnemonic = 'LD D'; result.args = ', H'; break;
      case 0x55: result.mnemonic = 'LD D'; result.args = ', L'; break;
      case 0x56: result.mnemonic = 'LD D'; result.args = ', (HL)'; break;
      case 0x5F: result.mnemonic = 'LD E'; result.args = ', A'; break;
      case 0x58: result.mnemonic = 'LD E'; result.args = ', B'; break;
      case 0x59: result.mnemonic = 'LD E'; result.args = ', C'; break;
      case 0x5A: result.mnemonic = 'LD E'; result.args = ', D'; break;
      case 0x5B: result.mnemonic = 'LD E'; result.args = ', E'; break;
      case 0x5C: result.mnemonic = 'LD E'; result.args = ', H'; break;
      case 0x5D: result.mnemonic = 'LD E'; result.args = ', L'; break;
      case 0x5E: result.mnemonic = 'LD E'; result.args = ', (HL)'; break;
      case 0x67: result.mnemonic = 'LD H'; result.args = ', A'; break;
      case 0x60: result.mnemonic = 'LD H'; result.args = ', B'; break;
      case 0x61: result.mnemonic = 'LD H'; result.args = ', C'; break;
      case 0x62: result.mnemonic = 'LD H'; result.args = ', D'; break;
      case 0x63: result.mnemonic = 'LD H'; result.args = ', E'; break;
      case 0x64: result.mnemonic = 'LD H'; result.args = ', H'; break;
      case 0x65: result.mnemonic = 'LD H'; result.args = ', L'; break;
      case 0x66: result.mnemonic = 'LD H'; result.args = ', (HL)'; break;
      case 0x6F: result.mnemonic = 'LD L'; result.args = ', A'; break;
      case 0x68: result.mnemonic = 'LD L'; result.args = ', B'; break;
      case 0x69: result.mnemonic = 'LD L'; result.args = ', C'; break;
      case 0x6A: result.mnemonic = 'LD L'; result.args = ', D'; break;
      case 0x6B: result.mnemonic = 'LD L'; result.args = ', E'; break;
      case 0x6C: result.mnemonic = 'LD L'; result.args = ', H'; break;
      case 0x6D: result.mnemonic = 'LD L'; result.args = ', L'; break;
      case 0x6E: result.mnemonic = 'LD L'; result.args = ', (HL)'; break;
      case 0xF3: result.mnemonic = 'DI'; break;
      case 0xFB: result.mnemonic = 'EI'; break;
      case 0xAF: result.mnemonic = 'XOR A'; break;
      case 0xB7: result.mnemonic = 'OR A'; break;
      case 0xC6: result.mnemonic = 'ADD A'; result.args = this.readByte(); break;
      case 0xE6: result.mnemonic = 'AND A'; result.args = this.readByte(); break;
      case 0xFE: result.mnemonic = 'CP'; result.args = this.readByte(); break;
      case 0x20: result.mnemonic = 'JR NZ'; result.args = this.readRelAddr(); break;
      case 0x28: result.mnemonic = 'JR Z'; result.args = this.readRelAddr(); break;
      case 0x30: result.mnemonic = 'JR NC'; result.args = this.readRelAddr(); break;
      case 0x38: result.mnemonic = 'JR C'; result.args = this.readRelAddr(); break;
      case 0x18: result.mnemonic = 'JR'; result.args = this.readRelAddr(); break;
      case 0xC3: result.mnemonic = 'JP'; result.args = this.readWord(); break;
      case 0xCA: result.mnemonic = 'JP Z'; result.args = this.readWord(); break;
      case 0xD2: result.mnemonic = 'JP NC'; result.args = this.readWord(); break;
      case 0xCD: result.mnemonic = 'CALL'; result.args = this.readWord(); break;
      case 0xC9: result.mnemonic = 'RET'; break;
      case 0xC0: result.mnemonic = 'RET NZ'; break;
      case 0xC8: result.mnemonic = 'RET Z'; break;
      case 0xD0: result.mnemonic = 'RET NC'; break;
      case 0xD8: result.mnemonic = 'RET C'; break;
      case 0xD3: {
        const port = this.readByte();
        result.mnemonic = 'OUT';
        result.args = `($${port.toString(16).padStart(2, '0')}), A`;
        result.comment = this.getPortComment(port);
        break;
      }
      case 0xDB: {
        const port = this.readByte();
        result.mnemonic = 'IN';
        result.args = `A, ($${port.toString(16).padStart(2, '0')})`;
        result.comment = this.getPortComment(port);
        break;
      }
      case 0x03: result.mnemonic = 'INC BC'; break;
      case 0x13: result.mnemonic = 'INC DE'; break;
      case 0x23: result.mnemonic = 'INC HL'; break;
      case 0x33: result.mnemonic = 'INC SP'; break;
      case 0x0B: result.mnemonic = 'DEC BC'; break;
      case 0x1B: result.mnemonic = 'DEC DE'; break;
      case 0x2B: result.mnemonic = 'DEC HL'; break;
      case 0x3B: result.mnemonic = 'DEC SP'; break;
      case 0x04: result.mnemonic = 'INC B'; break;
      case 0x0C: result.mnemonic = 'INC C'; break;
      case 0x14: result.mnemonic = 'INC D'; break;
      case 0x1C: result.mnemonic = 'INC E'; break;
      case 0x24: result.mnemonic = 'INC H'; break;
      case 0x2C: result.mnemonic = 'INC L'; break;
      case 0x34: result.mnemonic = 'INC (HL)'; break;
      case 0x3C: result.mnemonic = 'INC A'; break;
      case 0x05: result.mnemonic = 'DEC B'; break;
      case 0x0D: result.mnemonic = 'DEC C'; break;
      case 0x15: result.mnemonic = 'DEC D'; break;
      case 0x1D: result.mnemonic = 'DEC E'; break;
      case 0x25: result.mnemonic = 'DEC H'; break;
      case 0x2D: result.mnemonic = 'DEC L'; break;
      case 0x35: result.mnemonic = 'DEC (HL)'; break;
      case 0x3D: result.mnemonic = 'DEC A'; break;
      case 0xE0: result.mnemonic = 'OUT'; result.args = `(C), A`; break;
      case 0xF0: result.mnemonic = 'IN'; result.args = `A, (C)`; break;
      case 0x2F: result.mnemonic = 'CPL'; break;
      case 0x3F: result.mnemonic = 'CCF'; break;
      case 0xAF: result.mnemonic = 'XOR A'; break;
      case 0x07: result.mnemonic = 'RLCA'; break;
      case 0x17: result.mnemonic = 'RRCA'; break;
      case 0x0F: result.mnemonic = 'RLA'; break;
      case 0x1F: result.mnemonic = 'RRA'; break;
      case 0xF5: result.mnemonic = 'PUSH AF'; break;
      case 0xC5: result.mnemonic = 'PUSH BC'; break;
      case 0xD5: result.mnemonic = 'PUSH DE'; break;
      case 0xE5: result.mnemonic = 'PUSH HL'; break;
      case 0xF1: result.mnemonic = 'POP AF'; break;
      case 0xC1: result.mnemonic = 'POP BC'; break;
      case 0xD1: result.mnemonic = 'POP DE'; break;
      case 0xE1: result.mnemonic = 'POP HL'; break;
      default:
        result.mnemonic = `DB $${opcode.toString(16).padStart(2, '0')}`;
    }

    result.bytes = this.code.slice(startPos, this.pos);
    return result;
  }

  disassembleCB(opcode) {
    if ((opcode & 0xC0) !== 0xCB) return null;
    
    const ext = this.code[this.pos++];
    const result = { bytes: [], mnemonic: '', args: '', comment: '' };
    
    const rp = (ext >> 3) & 0x07;
    const bit = ext & 0x07;
    
    const regNames = ['B', 'C', 'D', 'E', 'H', 'L', '(HL)', 'A'];
    
    switch (ext >> 6) {
      case 0:
        switch ((ext >> 3) & 0x07) {
          case 0: result.mnemonic = 'RLC B'; break;
          case 1: result.mnemonic = 'RLC C'; break;
          case 2: result.mnemonic = 'RLC D'; break;
          case 3: result.mnemonic = 'RLC E'; break;
          case 4: result.mnemonic = 'RLC H'; break;
          case 5: result.mnemonic = 'RLC L'; break;
          case 6: result.mnemonic = 'RLC (HL)'; break;
          case 7: result.mnemonic = 'RLC A'; break;
        }
        break;
      case 1:
        switch ((ext >> 3) & 0x07) {
          case 0: result.mnemonic = 'RRC B'; break;
          case 1: result.mnemonic = 'RRC C'; break;
          case 2: result.mnemonic = 'RRC D'; break;
          case 3: result.mnemonic = 'RRC E'; break;
          case 4: result.mnemonic = 'RRC H'; break;
          case 5: result.mnemonic = 'RRC L'; break;
          case 6: result.mnemonic = 'RRC (HL)'; break;
          case 7: result.mnemonic = 'RRC A'; break;
        }
        break;
      case 2:
        switch ((ext >> 3) & 0x07) {
          case 0: result.mnemonic = 'RL B'; break;
          case 1: result.mnemonic = 'RL C'; break;
          case 2: result.mnemonic = 'RL D'; break;
          case 3: result.mnemonic = 'RL E'; break;
          case 4: result.mnemonic = 'RL H'; break;
          case 5: result.mnemonic = 'RL L'; break;
          case 6: result.mnemonic = 'RL (HL)'; break;
          case 7: result.mnemonic = 'RL A'; break;
        }
        break;
      case 3:
        switch ((ext >> 3) & 0x07) {
          case 0: result.mnemonic = 'RR B'; break;
          case 1: result.mnemonic = 'RR C'; break;
          case 2: result.mnemonic = 'RR D'; break;
          case 3: result.mnemonic = 'RR E'; break;
          case 4: result.mnemonic = 'RR H'; break;
          case 5: result.mnemonic = 'RR L'; break;
          case 6: result.mnemonic = 'RR (HL)'; break;
          case 7: result.mnemonic = 'RR A'; break;
        }
        break;
      case 4:
        switch ((ext >> 3) & 0x07) {
          case 0: result.mnemonic = 'SLA B'; break;
          case 1: result.mnemonic = 'SLA C'; break;
          case 2: result.mnemonic = 'SLA D'; break;
          case 3: result.mnemonic = 'SLA E'; break;
          case 4: result.mnemonic = 'SLA H'; break;
          case 5: result.mnemonic = 'SLA L'; break;
          case 6: result.mnemonic = 'SLA (HL)'; break;
          case 7: result.mnemonic = 'SLA A'; break;
        }
        break;
      case 5:
        switch ((ext >> 3) & 0x07) {
          case 0: result.mnemonic = 'SRA B'; break;
          case 1: result.mnemonic = 'SRA C'; break;
          case 2: result.mnemonic = 'SRA D'; break;
          case 3: result.mnemonic = 'SRA E'; break;
          case 4: result.mnemonic = 'SRA H'; break;
          case 5: result.mnemonic = 'SRA L'; break;
          case 6: result.mnemonic = 'SRA (HL)'; break;
          case 7: result.mnemonic = 'SRA A'; break;
        }
        break;
      case 6:
        switch ((ext >> 3) & 0x07) {
          case 0: result.mnemonic = 'SLL B'; break;
          case 1: result.mnemonic = 'SLL C'; break;
          case 2: result.mnemonic = 'SLL D'; break;
          case 3: result.mnemonic = 'SLL E'; break;
          case 4: result.mnemonic = 'SLL H'; break;
          case 5: result.mnemonic = 'SLL L'; break;
          case 6: result.mnemonic = 'SLL (HL)'; break;
          case 7: result.mnemonic = 'SLL A'; break;
        }
        break;
      case 7:
        switch ((ext >> 3) & 0x07) {
          case 0: result.mnemonic = 'SRL B'; break;
          case 1: result.mnemonic = 'SRL C'; break;
          case 2: result.mnemonic = 'SRL D'; break;
          case 3: result.mnemonic = 'SRL E'; break;
          case 4: result.mnemonic = 'SRL H'; break;
          case 5: result.mnemonic = 'SRL L'; break;
          case 6: result.mnemonic = 'SRL (HL)'; break;
          case 7: result.mnemonic = 'SRL A'; break;
        }
        break;
    }
    
    result.bytes = this.code.slice(this.pos - 2, this.pos);
    return result;
  }

  disassembleExtended() {
    const ext = this.code[this.pos++];
    const result = { bytes: [], mnemonic: '', args: '', comment: '' };
    
    switch (ext) {
      case 0x41: result.mnemonic = 'LD (BC)'; result.args = ', A'; break;
      case 0x45: result.mnemonic = 'LD (DE)'; result.args = ', A'; break;
      case 0x49: result.mnemonic = 'LD BC'; result.args = '(HL)'; break;
      case 0x4D: result.mnemonic = 'LD DE'; result.args = '(HL)'; break;
      case 0x51: result.mnemonic = 'LD DE'; result.args = '(HL)'; break;
      case 0x55: result.mnemonic = 'LD HL'; result.args = '(BC)'; break;
      case 0x59: result.mnemonic = 'LD HL'; result.args = '(DE)'; break;
      case 0x5D: result.mnemonic = 'LD SP'; result.args = ', HL'; break;
      case 0x61: result.mnemonic = 'LD (HL)'; result.args = ', BC'; break;
      case 0x65: result.mnemonic = 'LD (HL)'; result.args = ', DE'; break;
      case 0x69: result.mnemonic = 'LD HL'; result.args = '(HL)'; break;
      case 0x6D: result.mnemonic = 'LD (HL)'; result.args = ', SP'; break;
      case 0x71: result.mnemonic = 'LD (HL)'; result.args = ', DE'; break;
      case 0x79: result.mnemonic = 'LD A'; result.args = ', I'; break;
      case 0x7D: result.mnemonic = 'LD A'; result.args = ', R'; break;
      case 0x5B: result.mnemonic = 'LD I'; result.args = ', A'; break;
      case 0x5F: result.mnemonic = 'LD R'; result.args = ', A'; break;
      case 0xA9: result.mnemonic = 'SUB A'; break;
      case 0xAB: result.mnemonic = 'ADC HL'; result.args = ', BC'; break;
      case 0xBB: result.mnemonic = 'ADC HL'; result.args = ', DE'; break;
      case 0xCB: result.mnemonic = 'ADC HL'; result.args = ', HL'; break;
      case 0xDB: result.mnemonic = 'ADC HL'; result.args = ', SP'; break;
      case 0x8B: result.mnemonic = 'SBC HL'; result.args = ', BC'; break;
      case 0x9B: result.mnemonic = 'SBC HL'; result.args = ', DE'; break;
      case 0xBB: result.mnemonic = 'SBC HL'; result.args = ', HL'; break;
      case 0xCB: result.mnemonic = 'SBC HL'; result.args = ', SP'; break;
      case 0x31: result.mnemonic = 'LD A'; result.args = ', ($FF00+C)'; break;
      case 0x39: result.mnemonic = 'LD ($FF00+C)'; result.args = ', A'; break;
      case 0x34: result.mnemonic = 'LD A'; result.args = ', ($FF00+D)'; break;
      case 0x3C: result.mnemonic = 'LD ($FF00+D)'; result.args = ', A'; break;
      case 0x23: result.mnemonic = 'LD A'; result.args = ', ($FF00+E)'; break;
      case 0x2B: result.mnemonic = 'LD ($FF00+E)'; result.args = ', A'; break;
      case 0x22: result.mnemonic = 'LD A'; result.args = ', ($FF00+H)'; break;
      case 0x2A: result.mnemonic = 'LD ($FF00+H)'; result.args = ', A'; break;
      case 0x13: result.mnemonic = 'LD A'; result.args = ', ($FF00+L)'; break;
      case 0x1B: result.mnemonic = 'LD ($FF00+L)'; result.args = ', A'; break;
      case 0x05: result.mnemonic = 'LD A'; result.args = ', ($FF00+B)'; break;
      case 0x0D: result.mnemonic = 'LD ($FF00+B)'; result.args = ', A'; break;
      case 0x44: result.mnemonic = 'NEG'; break;
      case 0x54: result.mnemonic = 'RETI'; break;
      case 0x56: result.mnemonic = 'RETN'; break;
      case 0x66: result.mnemonic = 'IM 0'; break;
      case 0x6E: result.mnemonic = 'IM 1'; break;
      case 0x76: result.mnemonic = 'IM 2'; break;
      case 0x91: result.mnemonic = 'LD A'; result.args = ', (C)'; break;
      case 0x95: result.mnemonic = 'LD (C)'; result.args = ', A'; break;
      default:
        result.mnemonic = `ED $${ext.toString(16).padStart(2, '0')}`;
    }
    
    result.bytes = this.code.slice(this.pos - 2, this.pos);
    return result;
  }

  readByte() {
    const b = this.code[this.pos++];
    return `$${b.toString(16).padStart(2, '0')}`;
  }

  readWord() {
    const lo = this.code[this.pos++];
    const hi = this.code[this.pos++];
    const addr = (hi << 8) | lo;
    return `$${addr.toString(16).padStart(4, '0')}`;
  }

  readRelAddr() {
    const rel = this.code[this.pos++];
    const target = this.baseAddr + this.pos + (rel > 127 ? rel - 256 : rel);
    return `$${target.toString(16).padStart(4, '0')}`;
  }

  getPortComment(port) {
    if (port === 0x40) return '; YM2612 Port 0 (Ch 0-2)';
    if (port === 0x41) return '; YM2612 Port 1 (Ch 3-5)';
    if (port === 0x42) return '; YM2612 Port 2 (LFO/PCM)';
    if (port === 0xFE) return '; 68K Communication (A01FFE)';
    if (port === 0xFF) return '; 68K Communication (A01FFF)';
    return '';
  }
}

const z80Code = rom.slice(Z80_CODE_START, Z80_CODE_START + Z80_CODE_SIZE);
const disasm = new Z80Disassembler(z80Code, Z80_CODE_START);
const instructions = disasm.disassemble();

console.log('=== Z80 Audio Driver Disassembly (ROM 0x1EC000) ===');
console.log('');
console.log('Addr      Bytes      Mnemonic');
console.log('--------  ---------  -----------------------------');

for (const instr of instructions) {
  const bytesStr = instr.bytes.map(b => b.toString(16).padStart(2, '0')).join(' ').padEnd(11);
  const addrStr = instr.addr.toString(16).padStart(8, '0');
  const mnemonic = instr.mnemonic.padEnd(8);
  const args = instr.args || '';
  const comment = instr.comment || '';
  
  console.log(`${addrStr}  ${bytesStr}  ${mnemonic} ${args} ${comment}`);
}

const outputDir = path.join(__dirname, '../20260713/output/audio');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const disasmText = instructions.map(instr => {
  const bytesStr = instr.bytes.map(b => b.toString(16).padStart(2, '0')).join(' ').padEnd(11);
  const addrStr = instr.addr.toString(16).padStart(8, '0');
  const mnemonic = instr.mnemonic.padEnd(8);
  const args = instr.args || '';
  const comment = instr.comment || '';
  return `${addrStr}  ${bytesStr}  ${mnemonic} ${args} ${comment}`;
}).join('\n');

fs.writeFileSync(path.join(outputDir, 'z80_driver_disasm.txt'), disasmText);
console.log(`\nDisassembly saved to: ${path.join(outputDir, 'z80_driver_disasm.txt')}`);

console.log('\n=== YM2612 OUT Instructions ===');
const ym2612Writes = instructions.filter(i => i.mnemonic === 'OUT' && 
  (i.args.includes('40') || i.args.includes('41') || i.args.includes('42')));
for (const write of ym2612Writes.slice(0, 30)) {
  console.log(`${write.addr.toString(16).padStart(8, '0')}: ${write.mnemonic} ${write.args}`);
}

console.log('\n=== 68K Communication IN/OUT ===');
const commWrites = instructions.filter(i => 
  (i.mnemonic === 'IN' || i.mnemonic === 'OUT') && 
  (i.args.includes('FE') || i.args.includes('FF')));
for (const write of commWrites) {
  console.log(`${write.addr.toString(16).padStart(8, '0')}: ${write.mnemonic} ${write.args}`);
}