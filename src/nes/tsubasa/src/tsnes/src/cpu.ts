import { fromJSON, toJSON } from "./utils";

const ADDR_ZP = 0;
const ADDR_REL = 1;
const ADDR_IMP = 2;
const ADDR_ABS = 3;
const ADDR_ACC = 4;
const ADDR_IMM = 5;
const ADDR_ZPX = 6;
const ADDR_ZPY = 7;
const ADDR_ABSX = 8;
const ADDR_ABSY = 9;
const ADDR_PREIDXIND = 10;
const ADDR_POSTIDXIND = 11;
const ADDR_INDABS = 12;

const INS_ADC = 0;
const INS_AND = 1;
const INS_ASL = 2;
const INS_BCC = 3;
const INS_BCS = 4;
const INS_BEQ = 5;
const INS_BIT = 6;
const INS_BMI = 7;
const INS_BNE = 8;
const INS_BPL = 9;
const INS_BRK = 10;
const INS_BVC = 11;
const INS_BVS = 12;
const INS_CLC = 13;
const INS_CLD = 14;
const INS_CLI = 15;
const INS_CLV = 16;
const INS_CMP = 17;
const INS_CPX = 18;
const INS_CPY = 19;
const INS_DEC = 20;
const INS_DEX = 21;
const INS_DEY = 22;
const INS_EOR = 23;
const INS_INC = 24;
const INS_INX = 25;
const INS_INY = 26;
const INS_JMP = 27;
const INS_JSR = 28;
const INS_LDA = 29;
const INS_LDX = 30;
const INS_LDY = 31;
const INS_LSR = 32;
const INS_NOP = 33;
const INS_ORA = 34;
const INS_PHA = 35;
const INS_PHP = 36;
const INS_PLA = 37;
const INS_PLP = 38;
const INS_ROL = 39;
const INS_ROR = 40;
const INS_RTI = 41;
const INS_RTS = 42;
const INS_SBC = 43;
const INS_SEC = 44;
const INS_SED = 45;
const INS_SEI = 46;
const INS_STA = 47;
const INS_STX = 48;
const INS_STY = 49;
const INS_TAX = 50;
const INS_TAY = 51;
const INS_TSX = 52;
const INS_TXA = 53;
const INS_TXS = 54;
const INS_TYA = 55;
const INS_ALR = 56;
const INS_ANC = 57;
const INS_ARR = 58;
const INS_AXS = 59;
const INS_LAX = 60;
const INS_SAX = 61;
const INS_DCP = 62;
const INS_ISC = 63;
const INS_RLA = 64;
const INS_RRA = 65;
const INS_SLO = 66;
const INS_SRE = 67;
const INS_SKB = 68;
const INS_IGN = 69;
const INS_SHA = 71;
const INS_SHS = 72;
const INS_SHY = 73;
const INS_SHX = 74;
const INS_LAE = 75;
const INS_ANE = 76;
const INS_LXA = 77;

interface OpInfo {
  ins: number;
  mode: number;
  size: number;
  cycles: number;
}

const INVALID_OPCODE: OpInfo = { ins: -1, mode: 0, size: 1, cycles: 2 };

// prettier-ignore
const OPCODE_TABLE: Record<number, OpInfo> = {
  0x69: { ins: INS_ADC, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0x65: { ins: INS_ADC, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x75: { ins: INS_ADC, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0x6d: { ins: INS_ADC, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0x7d: { ins: INS_ADC, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0x79: { ins: INS_ADC, mode: ADDR_ABSY,       size: 3, cycles: 4 },
  0x61: { ins: INS_ADC, mode: ADDR_PREIDXIND,  size: 2, cycles: 6 },
  0x71: { ins: INS_ADC, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  0x29: { ins: INS_AND, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0x25: { ins: INS_AND, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x35: { ins: INS_AND, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0x2d: { ins: INS_AND, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0x3d: { ins: INS_AND, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0x39: { ins: INS_AND, mode: ADDR_ABSY,       size: 3, cycles: 4 },
  0x21: { ins: INS_AND, mode: ADDR_PREIDXIND,  size: 2, cycles: 6 },
  0x31: { ins: INS_AND, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  0x0a: { ins: INS_ASL, mode: ADDR_ACC,        size: 1, cycles: 2 },
  0x06: { ins: INS_ASL, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0x16: { ins: INS_ASL, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0x0e: { ins: INS_ASL, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0x1e: { ins: INS_ASL, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0x90: { ins: INS_BCC, mode: ADDR_REL,        size: 2, cycles: 2 },
  0xb0: { ins: INS_BCS, mode: ADDR_REL,        size: 2, cycles: 2 },
  0xf0: { ins: INS_BEQ, mode: ADDR_REL,        size: 2, cycles: 2 },
  0x30: { ins: INS_BMI, mode: ADDR_REL,        size: 2, cycles: 2 },
  0xd0: { ins: INS_BNE, mode: ADDR_REL,        size: 2, cycles: 2 },
  0x10: { ins: INS_BPL, mode: ADDR_REL,        size: 2, cycles: 2 },
  0x50: { ins: INS_BVC, mode: ADDR_REL,        size: 2, cycles: 2 },
  0x70: { ins: INS_BVS, mode: ADDR_REL,        size: 2, cycles: 2 },
  0x24: { ins: INS_BIT, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x2c: { ins: INS_BIT, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0x00: { ins: INS_BRK, mode: ADDR_IMP,        size: 1, cycles: 7 },
  0x18: { ins: INS_CLC, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0xd8: { ins: INS_CLD, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x58: { ins: INS_CLI, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0xb8: { ins: INS_CLV, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0xc9: { ins: INS_CMP, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xc5: { ins: INS_CMP, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0xd5: { ins: INS_CMP, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0xcd: { ins: INS_CMP, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0xdd: { ins: INS_CMP, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0xd9: { ins: INS_CMP, mode: ADDR_ABSY,       size: 3, cycles: 4 },
  0xc1: { ins: INS_CMP, mode: ADDR_PREIDXIND,  size: 2, cycles: 6 },
  0xd1: { ins: INS_CMP, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  0xe0: { ins: INS_CPX, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xe4: { ins: INS_CPX, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0xec: { ins: INS_CPX, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0xc0: { ins: INS_CPY, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xc4: { ins: INS_CPY, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0xcc: { ins: INS_CPY, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0xc6: { ins: INS_DEC, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0xd6: { ins: INS_DEC, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0xce: { ins: INS_DEC, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0xde: { ins: INS_DEC, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0xca: { ins: INS_DEX, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x88: { ins: INS_DEY, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x49: { ins: INS_EOR, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0x45: { ins: INS_EOR, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x55: { ins: INS_EOR, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0x4d: { ins: INS_EOR, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0x5d: { ins: INS_EOR, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0x59: { ins: INS_EOR, mode: ADDR_ABSY,       size: 3, cycles: 4 },
  0x41: { ins: INS_EOR, mode: ADDR_PREIDXIND,  size: 2, cycles: 6 },
  0x51: { ins: INS_EOR, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  0xe6: { ins: INS_INC, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0xf6: { ins: INS_INC, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0xee: { ins: INS_INC, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0xfe: { ins: INS_INC, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0xe8: { ins: INS_INX, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0xc8: { ins: INS_INY, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x4c: { ins: INS_JMP, mode: ADDR_ABS,        size: 3, cycles: 3 },
  0x6c: { ins: INS_JMP, mode: ADDR_INDABS,     size: 3, cycles: 5 },
  0x20: { ins: INS_JSR, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0xa9: { ins: INS_LDA, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xa5: { ins: INS_LDA, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0xb5: { ins: INS_LDA, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0xad: { ins: INS_LDA, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0xbd: { ins: INS_LDA, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0xb9: { ins: INS_LDA, mode: ADDR_ABSY,       size: 3, cycles: 4 },
  0xa1: { ins: INS_LDA, mode: ADDR_PREIDXIND,  size: 2, cycles: 6 },
  0xb1: { ins: INS_LDA, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  0xa2: { ins: INS_LDX, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xa6: { ins: INS_LDX, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0xb6: { ins: INS_LDX, mode: ADDR_ZPY,        size: 2, cycles: 4 },
  0xae: { ins: INS_LDX, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0xbe: { ins: INS_LDX, mode: ADDR_ABSY,       size: 3, cycles: 4 },
  0xa0: { ins: INS_LDY, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xa4: { ins: INS_LDY, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0xb4: { ins: INS_LDY, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0xac: { ins: INS_LDY, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0xbc: { ins: INS_LDY, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0x4a: { ins: INS_LSR, mode: ADDR_ACC,        size: 1, cycles: 2 },
  0x46: { ins: INS_LSR, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0x56: { ins: INS_LSR, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0x4e: { ins: INS_LSR, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0x5e: { ins: INS_LSR, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0x1a: { ins: INS_NOP, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x3a: { ins: INS_NOP, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x5a: { ins: INS_NOP, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x7a: { ins: INS_NOP, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0xda: { ins: INS_NOP, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0xea: { ins: INS_NOP, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0xfa: { ins: INS_NOP, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x09: { ins: INS_ORA, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0x05: { ins: INS_ORA, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x15: { ins: INS_ORA, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0x0d: { ins: INS_ORA, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0x1d: { ins: INS_ORA, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0x19: { ins: INS_ORA, mode: ADDR_ABSY,       size: 3, cycles: 4 },
  0x01: { ins: INS_ORA, mode: ADDR_PREIDXIND,  size: 2, cycles: 6 },
  0x11: { ins: INS_ORA, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  0x48: { ins: INS_PHA, mode: ADDR_IMP,        size: 1, cycles: 3 },
  0x08: { ins: INS_PHP, mode: ADDR_IMP,        size: 1, cycles: 3 },
  0x68: { ins: INS_PLA, mode: ADDR_IMP,        size: 1, cycles: 4 },
  0x28: { ins: INS_PLP, mode: ADDR_IMP,        size: 1, cycles: 4 },
  0x2a: { ins: INS_ROL, mode: ADDR_ACC,        size: 1, cycles: 2 },
  0x26: { ins: INS_ROL, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0x36: { ins: INS_ROL, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0x2e: { ins: INS_ROL, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0x3e: { ins: INS_ROL, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0x6a: { ins: INS_ROR, mode: ADDR_ACC,        size: 1, cycles: 2 },
  0x66: { ins: INS_ROR, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0x76: { ins: INS_ROR, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0x6e: { ins: INS_ROR, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0x7e: { ins: INS_ROR, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0x40: { ins: INS_RTI, mode: ADDR_IMP,        size: 1, cycles: 6 },
  0x60: { ins: INS_RTS, mode: ADDR_IMP,        size: 1, cycles: 6 },
  0xe9: { ins: INS_SBC, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xeb: { ins: INS_SBC, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xe5: { ins: INS_SBC, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0xf5: { ins: INS_SBC, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0xed: { ins: INS_SBC, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0xfd: { ins: INS_SBC, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0xf9: { ins: INS_SBC, mode: ADDR_ABSY,       size: 3, cycles: 4 },
  0xe1: { ins: INS_SBC, mode: ADDR_PREIDXIND,  size: 2, cycles: 6 },
  0xf1: { ins: INS_SBC, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  0x38: { ins: INS_SEC, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0xf8: { ins: INS_SED, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x78: { ins: INS_SEI, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x85: { ins: INS_STA, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x95: { ins: INS_STA, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0x8d: { ins: INS_STA, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0x9d: { ins: INS_STA, mode: ADDR_ABSX,       size: 3, cycles: 5 },
  0x99: { ins: INS_STA, mode: ADDR_ABSY,       size: 3, cycles: 5 },
  0x81: { ins: INS_STA, mode: ADDR_PREIDXIND,  size: 2, cycles: 6 },
  0x91: { ins: INS_STA, mode: ADDR_POSTIDXIND, size: 2, cycles: 6 },
  0x86: { ins: INS_STX, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x96: { ins: INS_STX, mode: ADDR_ZPY,        size: 2, cycles: 4 },
  0x8e: { ins: INS_STX, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0x84: { ins: INS_STY, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x94: { ins: INS_STY, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0x8c: { ins: INS_STY, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0xaa: { ins: INS_TAX, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0xa8: { ins: INS_TAY, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0xba: { ins: INS_TSX, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x8a: { ins: INS_TXA, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x9a: { ins: INS_TXS, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x98: { ins: INS_TYA, mode: ADDR_IMP,        size: 1, cycles: 2 },
  0x4b: { ins: INS_ALR, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0x0b: { ins: INS_ANC, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0x2b: { ins: INS_ANC, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0x6b: { ins: INS_ARR, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xcb: { ins: INS_AXS, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xa3: { ins: INS_LAX, mode: ADDR_PREIDXIND,  size: 2, cycles: 6 },
  0xa7: { ins: INS_LAX, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0xaf: { ins: INS_LAX, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0xb3: { ins: INS_LAX, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  0xb7: { ins: INS_LAX, mode: ADDR_ZPY,        size: 2, cycles: 4 },
  0xbf: { ins: INS_LAX, mode: ADDR_ABSY,       size: 3, cycles: 4 },
  0x83: { ins: INS_SAX, mode: ADDR_PREIDXIND,  size: 2, cycles: 6 },
  0x87: { ins: INS_SAX, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x8f: { ins: INS_SAX, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0x97: { ins: INS_SAX, mode: ADDR_ZPY,        size: 2, cycles: 4 },
  0xc3: { ins: INS_DCP, mode: ADDR_PREIDXIND,  size: 2, cycles: 8 },
  0xc7: { ins: INS_DCP, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0xcf: { ins: INS_DCP, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0xd3: { ins: INS_DCP, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  0xd7: { ins: INS_DCP, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0xdb: { ins: INS_DCP, mode: ADDR_ABSY,       size: 3, cycles: 7 },
  0xdf: { ins: INS_DCP, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0xe3: { ins: INS_ISC, mode: ADDR_PREIDXIND,  size: 2, cycles: 8 },
  0xe7: { ins: INS_ISC, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0xef: { ins: INS_ISC, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0xf3: { ins: INS_ISC, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  0xf7: { ins: INS_ISC, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0xfb: { ins: INS_ISC, mode: ADDR_ABSY,       size: 3, cycles: 7 },
  0xff: { ins: INS_ISC, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0x23: { ins: INS_RLA, mode: ADDR_PREIDXIND,  size: 2, cycles: 8 },
  0x27: { ins: INS_RLA, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0x2f: { ins: INS_RLA, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0x33: { ins: INS_RLA, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  0x37: { ins: INS_RLA, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0x3b: { ins: INS_RLA, mode: ADDR_ABSY,       size: 3, cycles: 7 },
  0x3f: { ins: INS_RLA, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0x63: { ins: INS_RRA, mode: ADDR_PREIDXIND,  size: 2, cycles: 8 },
  0x67: { ins: INS_RRA, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0x6f: { ins: INS_RRA, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0x73: { ins: INS_RRA, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  0x77: { ins: INS_RRA, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0x7b: { ins: INS_RRA, mode: ADDR_ABSY,       size: 3, cycles: 7 },
  0x7f: { ins: INS_RRA, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0x03: { ins: INS_SLO, mode: ADDR_PREIDXIND,  size: 2, cycles: 8 },
  0x07: { ins: INS_SLO, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0x0f: { ins: INS_SLO, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0x13: { ins: INS_SLO, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  0x17: { ins: INS_SLO, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0x1b: { ins: INS_SLO, mode: ADDR_ABSY,       size: 3, cycles: 7 },
  0x1f: { ins: INS_SLO, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0x43: { ins: INS_SRE, mode: ADDR_PREIDXIND,  size: 2, cycles: 8 },
  0x47: { ins: INS_SRE, mode: ADDR_ZP,         size: 2, cycles: 5 },
  0x4f: { ins: INS_SRE, mode: ADDR_ABS,        size: 3, cycles: 6 },
  0x53: { ins: INS_SRE, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  0x57: { ins: INS_SRE, mode: ADDR_ZPX,        size: 2, cycles: 6 },
  0x5b: { ins: INS_SRE, mode: ADDR_ABSY,       size: 3, cycles: 7 },
  0x5f: { ins: INS_SRE, mode: ADDR_ABSX,       size: 3, cycles: 7 },
  0x80: { ins: INS_SKB, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0x82: { ins: INS_SKB, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0x89: { ins: INS_SKB, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xc2: { ins: INS_SKB, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xe2: { ins: INS_SKB, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0x0c: { ins: INS_IGN, mode: ADDR_ABS,        size: 3, cycles: 4 },
  0x1c: { ins: INS_IGN, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0x3c: { ins: INS_IGN, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0x5c: { ins: INS_IGN, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0x7c: { ins: INS_IGN, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0xdc: { ins: INS_IGN, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0xfc: { ins: INS_IGN, mode: ADDR_ABSX,       size: 3, cycles: 4 },
  0x04: { ins: INS_IGN, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x44: { ins: INS_IGN, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x64: { ins: INS_IGN, mode: ADDR_ZP,         size: 2, cycles: 3 },
  0x14: { ins: INS_IGN, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0x34: { ins: INS_IGN, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0x54: { ins: INS_IGN, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0x74: { ins: INS_IGN, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0xd4: { ins: INS_IGN, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0xf4: { ins: INS_IGN, mode: ADDR_ZPX,        size: 2, cycles: 4 },
  0x93: { ins: INS_SHA, mode: ADDR_POSTIDXIND, size: 2, cycles: 6 },
  0x9f: { ins: INS_SHA, mode: ADDR_ABSY,       size: 3, cycles: 5 },
  0x9b: { ins: INS_SHS, mode: ADDR_ABSY,       size: 3, cycles: 5 },
  0x9c: { ins: INS_SHY, mode: ADDR_ABSX,       size: 3, cycles: 5 },
  0x9e: { ins: INS_SHX, mode: ADDR_ABSY,       size: 3, cycles: 5 },
  0xbb: { ins: INS_LAE, mode: ADDR_ABSY,       size: 3, cycles: 4 },
  0x8b: { ins: INS_ANE, mode: ADDR_IMM,        size: 2, cycles: 2 },
  0xab: { ins: INS_LXA, mode: ADDR_IMM,        size: 2, cycles: 2 },
};

class CPU {
  IRQ_NORMAL = 0;
  IRQ_NMI = 1;
  IRQ_RESET = 2;

  static JSON_PROPERTIES = [
    "mem",
    "cyclesToHalt",
    "dataBus",
    "irqRequested",
    "irqType",
    "nmiRaised",
    "nmiPending",
    "nmiImmediate",
    "REG_ACC",
    "REG_X",
    "REG_Y",
    "REG_SP",
    "REG_PC",
    "REG_PC_NEW",
    "REG_STATUS",
    "F_CARRY",
    "F_DECIMAL",
    "F_INTERRUPT",
    "F_INTERRUPT_NEW",
    "F_OVERFLOW",
    "F_SIGN",
    "F_ZERO",
    "F_NOTUSED",
    "F_NOTUSED_NEW",
    "F_BRK",
    "F_BRK_NEW",
    "_cpuCycleBase",
  ];

  nes: any;
  mem: Uint8Array;
  REG_ACC: number;
  REG_X: number;
  REG_Y: number;
  REG_SP: number;
  REG_PC: number;
  REG_PC_NEW: number;
  REG_STATUS: number;
  F_CARRY: number;
  F_DECIMAL: number;
  F_INTERRUPT: number;
  F_INTERRUPT_NEW: number;
  F_OVERFLOW: number;
  F_SIGN: number;
  F_ZERO: number;
  F_NOTUSED: number;
  F_NOTUSED_NEW: number;
  F_BRK: number;
  F_BRK_NEW: number;
  cyclesToHalt: number;
  crash: boolean;
  irqRequested: boolean;
  irqType: number | null;
  nmiRaised: boolean;
  nmiPending: boolean;
  nmiImmediate: boolean;
  dataBus: number;
  instrBusCycles: number;
  apuCatchupCycles: number;
  _cpuCycleBase: number;
  nmiRaisedAtCycle: number;
  nmiDotsRemainingInStep: number;
  _dmcFetchCycles!: number;

  /** trace callback: (pc, opcode, cycles, frameCount) */
  _traceCb: ((pc: number, opcode: number, cycles: number, frame: number) => void) | null = null;
  _instrPC!: number;

  constructor(nes: any) {
    this.nes = nes;

    this.mem = new Uint8Array(0x10000);
    this.mem.fill(0xff, 0, 0x2000);
    for (let p = 0; p < 4; p++) {
      let j = p * 0x800;
      this.mem[j + 0x008] = 0xf7;
      this.mem[j + 0x009] = 0xef;
      this.mem[j + 0x00a] = 0xdf;
      this.mem[j + 0x00f] = 0xbf;
    }

    this.REG_ACC = 0;
    this.REG_X = 0;
    this.REG_Y = 0;
    this.REG_SP = 0x01ff;
    this.REG_PC = 0x8000 - 1;
    this.REG_PC_NEW = 0x8000 - 1;
    this.REG_STATUS = 0x28;

    this.setStatus(0x28);

    this.F_CARRY = 0;
    this.F_DECIMAL = 0;
    this.F_INTERRUPT = 1;
    this.F_INTERRUPT_NEW = 1;
    this.F_OVERFLOW = 0;
    this.F_SIGN = 0;
    this.F_ZERO = 1;

    this.F_NOTUSED = 1;
    this.F_NOTUSED_NEW = 1;
    this.F_BRK = 1;
    this.F_BRK_NEW = 1;

    this.cyclesToHalt = 0;
    this.crash = false;
    this.irqRequested = false;
    this.irqType = null;

    this.nmiRaised = false;
    this.nmiPending = false;
    this.nmiImmediate = false;

    this.dataBus = 0;
    this.instrBusCycles = 0;
    this.apuCatchupCycles = 0;
    this._cpuCycleBase = 0;
    this.nmiRaisedAtCycle = 0;
    this.nmiDotsRemainingInStep = 0;
  }

  emulate(): number {
    if (this.nmiImmediate) {
      this.nmiImmediate = false;
      this.nmiPending = false;
      this.nmiRaised = false;
      this.instrBusCycles = 0;

      this.REG_PC_NEW = this.REG_PC;
      this.F_INTERRUPT_NEW = this.F_INTERRUPT;
      this.doNonMaskableInterrupt(this.getStatus() & 0xef);
      this.REG_PC = this.REG_PC_NEW;
      this.F_INTERRUPT = this.F_INTERRUPT_NEW;
      this.F_BRK = this.F_BRK_NEW;
      this._cpuCycleBase += 7;
      return 7;
    }

    let temp: number;
    let add: number;
    let baseHigh = 0;
    let interruptCycles = 0;

    if (this.nmiRaised) {
      this.nmiPending = true;
      this.nmiRaised = false;
    }

    if (this.irqRequested) {
      temp = this.getStatus();

      this.REG_PC_NEW = this.REG_PC;
      this.F_INTERRUPT_NEW = this.F_INTERRUPT;
      switch (this.irqType) {
        case 0: {
          if (this.F_INTERRUPT !== 0) {
            break;
          }
          this.doIrq(temp & 0xef);
          interruptCycles = 7;
          break;
        }
        case 2: {
          this.doResetInterrupt();
          interruptCycles = 7;
          break;
        }
      }

      this.REG_PC = this.REG_PC_NEW;
      this.F_INTERRUPT = this.F_INTERRUPT_NEW;
      this.F_BRK = this.F_BRK_NEW;
      this.irqRequested = false;
    }

    if (this.nes.mmap === null) return 32;

    this.instrBusCycles = 0;
    this.apuCatchupCycles = 0;
    this.nmiDotsRemainingInStep = 0;
    this._dmcFetchCycles = this._cyclesToNextDmcFetch();
    this._instrPC = this.REG_PC;

    let opcode = this.loadFromCartridge(this.REG_PC + 1);
    this.dataBus = opcode;
    this.instrBusCycles = 1;
    this.nes.ppu.advanceDots(3);

    let opinfo = OPCODE_TABLE[opcode] ?? INVALID_OPCODE;
    let cycleCount = opinfo.cycles;
    let cycleAdd = 0;
    let addrMode = opinfo.mode;

    let opaddr = this.REG_PC;
    this.REG_PC += opinfo.size;

    let addr = 0;
    switch (addrMode) {
      case 0: {
        addr = this.loadDirect(opaddr + 2);
        break;
      }
      case 1: {
        addr = this.loadDirect(opaddr + 2);
        if (addr < 0x80) {
          addr += this.REG_PC;
        } else {
          addr += this.REG_PC - 256;
        }
        break;
      }
      case 2: {
        this.loadDirect(opaddr + 2);
        break;
      }
      case 3: {
        addr = this.load16bit(opaddr + 2);
        break;
      }
      case 4: {
        this.loadDirect(opaddr + 2);
        addr = this.REG_ACC;
        break;
      }
      case 5: {
        addr = this.REG_PC;
        break;
      }
      case 6: {
        let zpBase6 = this.loadDirect(opaddr + 2);
        this.loadDirect(zpBase6);
        addr = (zpBase6 + this.REG_X) & 0xff;
        break;
      }
      case 7: {
        let zpBase7 = this.loadDirect(opaddr + 2);
        this.loadDirect(zpBase7);
        addr = (zpBase7 + this.REG_Y) & 0xff;
        break;
      }
      case 8: {
        addr = this.load16bit(opaddr + 2);
        baseHigh = (addr >> 8) & 0xff;
        if ((addr & 0xff00) !== ((addr + this.REG_X) & 0xff00)) {
          this.load((addr & 0xff00) | ((addr + this.REG_X) & 0xff));
          cycleAdd = 1;
        }
        addr += this.REG_X;
        break;
      }
      case 9: {
        addr = this.load16bit(opaddr + 2);
        baseHigh = (addr >> 8) & 0xff;
        if ((addr & 0xff00) !== ((addr + this.REG_Y) & 0xff00)) {
          this.load((addr & 0xff00) | ((addr + this.REG_Y) & 0xff));
          cycleAdd = 1;
        }
        addr += this.REG_Y;
        break;
      }
      case 10: {
        let zpPtr10 = this.loadDirect(opaddr + 2);
        this.loadDirect(zpPtr10);
        let zpAddr10 = (zpPtr10 + this.REG_X) & 0xff;
        addr =
          this.loadDirect(zpAddr10) |
          (this.loadDirect((zpAddr10 + 1) & 0xff) << 8);
        break;
      }
      case 11: {
        let zpAddr = this.loadDirect(opaddr + 2);
        addr =
          this.loadDirect(zpAddr) | (this.loadDirect((zpAddr + 1) & 0xff) << 8);
        baseHigh = (addr >> 8) & 0xff;
        if ((addr & 0xff00) !== ((addr + this.REG_Y) & 0xff00)) {
          this.load((addr & 0xff00) | ((addr + this.REG_Y) & 0xff));
          cycleAdd = 1;
        }
        addr += this.REG_Y;
        break;
      }
      case 12: {
        addr = this.load16bit(opaddr + 2);
        var hiAddr = (addr & 0xff00) | (((addr & 0xff) + 1) & 0xff);
        addr = this.load(addr) | (this.load(hiAddr) << 8);
        break;
      }
    }
    addr &= 0xffff;

    switch (opinfo.ins) {
      case 0: {
        add = this.load(addr);
        temp = this.REG_ACC + add + this.F_CARRY;

        if (
          ((this.REG_ACC ^ add) & 0x80) === 0 &&
          ((this.REG_ACC ^ temp) & 0x80) !== 0
        ) {
          this.F_OVERFLOW = 1;
        } else {
          this.F_OVERFLOW = 0;
        }
        this.F_CARRY = temp > 255 ? 1 : 0;
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp & 0xff;
        this.REG_ACC = temp & 255;
        cycleCount += cycleAdd;
        break;
      }
      case 1: {
        this.REG_ACC = this.REG_ACC & this.load(addr);
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        this.F_ZERO = this.REG_ACC;
        cycleCount += cycleAdd;
        break;
      }
      case 2: {
        if (addrMode === ADDR_ACC) {
          this.F_CARRY = (this.REG_ACC >> 7) & 1;
          this.REG_ACC = (this.REG_ACC << 1) & 255;
          this.F_SIGN = (this.REG_ACC >> 7) & 1;
          this.F_ZERO = this.REG_ACC;
        } else {
          if (
            cycleAdd === 0 &&
            (addrMode === ADDR_ABSX ||
              addrMode === ADDR_ABSY ||
              addrMode === ADDR_POSTIDXIND)
          ) {
            this.load(addr);
          }
          temp = this.load(addr);
          this.write(addr, temp);
          this.F_CARRY = (temp >> 7) & 1;
          temp = (temp << 1) & 255;
          this.F_SIGN = (temp >> 7) & 1;
          this.F_ZERO = temp;
          this.write(addr, temp);
        }
        break;
      }
      case 3: {
        if (this.F_CARRY === 0) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 4: {
        if (this.F_CARRY === 1) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 5: {
        if (this.F_ZERO === 0) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 6: {
        temp = this.load(addr);
        this.F_SIGN = (temp >> 7) & 1;
        this.F_OVERFLOW = (temp >> 6) & 1;
        temp &= this.REG_ACC;
        this.F_ZERO = temp;
        break;
      }
      case 7: {
        if (this.F_SIGN === 1) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 8: {
        if (this.F_ZERO !== 0) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 9: {
        if (this.F_SIGN === 0) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 10: {
        this.REG_PC += 2;
        this.push((this.REG_PC >> 8) & 255);
        this.push(this.REG_PC & 255);
        this.F_BRK = 1;
        this.push(this.getStatus());

        this.F_INTERRUPT = 1;
        this.REG_PC = this.load16bit(0xfffe);
        this.REG_PC--;
        break;
      }
      case 11: {
        if (this.F_OVERFLOW === 0) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 12: {
        if (this.F_OVERFLOW === 1) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 13: {
        this.F_CARRY = 0;
        break;
      }
      case 14: {
        this.F_DECIMAL = 0;
        break;
      }
      case 15: {
        this.F_INTERRUPT = 0;
        break;
      }
      case 16: {
        this.F_OVERFLOW = 0;
        break;
      }
      case 17: {
        temp = this.REG_ACC - this.load(addr);
        this.F_CARRY = temp >= 0 ? 1 : 0;
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp & 0xff;
        cycleCount += cycleAdd;
        break;
      }
      case 18: {
        temp = this.REG_X - this.load(addr);
        this.F_CARRY = temp >= 0 ? 1 : 0;
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp & 0xff;
        break;
      }
      case 19: {
        temp = this.REG_Y - this.load(addr);
        this.F_CARRY = temp >= 0 ? 1 : 0;
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp & 0xff;
        break;
      }
      case 20: {
        if (
          cycleAdd === 0 &&
          (addrMode === ADDR_ABSX ||
            addrMode === ADDR_ABSY ||
            addrMode === ADDR_POSTIDXIND)
        ) {
          this.load(addr);
        }
        temp = this.load(addr);
        this.write(addr, temp);
        temp = (temp - 1) & 0xff;
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp;
        this.write(addr, temp);
        break;
      }
      case 21: {
        this.REG_X = (this.REG_X - 1) & 0xff;
        this.F_SIGN = (this.REG_X >> 7) & 1;
        this.F_ZERO = this.REG_X;
        break;
      }
      case 22: {
        this.REG_Y = (this.REG_Y - 1) & 0xff;
        this.F_SIGN = (this.REG_Y >> 7) & 1;
        this.F_ZERO = this.REG_Y;
        break;
      }
      case 23: {
        this.REG_ACC = (this.load(addr) ^ this.REG_ACC) & 0xff;
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        this.F_ZERO = this.REG_ACC;
        cycleCount += cycleAdd;
        break;
      }
      case 24: {
        if (
          cycleAdd === 0 &&
          (addrMode === ADDR_ABSX ||
            addrMode === ADDR_ABSY ||
            addrMode === ADDR_POSTIDXIND)
        ) {
          this.load(addr);
        }
        temp = this.load(addr);
        this.write(addr, temp);
        temp = (temp + 1) & 0xff;
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp;
        this.write(addr, temp);
        break;
      }
      case 25: {
        this.REG_X = (this.REG_X + 1) & 0xff;
        this.F_SIGN = (this.REG_X >> 7) & 1;
        this.F_ZERO = this.REG_X;
        break;
      }
      case 26: {
        this.REG_Y++;
        this.REG_Y &= 0xff;
        this.F_SIGN = (this.REG_Y >> 7) & 1;
        this.F_ZERO = this.REG_Y;
        break;
      }
      case 27: {
        this.REG_PC = addr - 1;
        break;
      }
      case 28: {
        this.push((this.REG_PC >> 8) & 255);
        this.push(this.REG_PC & 255);
        this.loadDirect(opaddr + 3);
        this.REG_PC = addr - 1;
        break;
      }
      case 29: {
        this.REG_ACC = this.load(addr);
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        this.F_ZERO = this.REG_ACC;
        cycleCount += cycleAdd;
        break;
      }
      case 30: {
        this.REG_X = this.load(addr);
        this.F_SIGN = (this.REG_X >> 7) & 1;
        this.F_ZERO = this.REG_X;
        cycleCount += cycleAdd;
        break;
      }
      case 31: {
        this.REG_Y = this.load(addr);
        this.F_SIGN = (this.REG_Y >> 7) & 1;
        this.F_ZERO = this.REG_Y;
        cycleCount += cycleAdd;
        break;
      }
      case 32: {
        if (addrMode === ADDR_ACC) {
          temp = this.REG_ACC & 0xff;
          this.F_CARRY = temp & 1;
          temp >>= 1;
          this.REG_ACC = temp;
        } else {
          if (
            cycleAdd === 0 &&
            (addrMode === ADDR_ABSX ||
              addrMode === ADDR_ABSY ||
              addrMode === ADDR_POSTIDXIND)
          ) {
            this.load(addr);
          }
          temp = this.load(addr) & 0xff;
          this.write(addr, temp);
          this.F_CARRY = temp & 1;
          temp >>= 1;
          this.write(addr, temp);
        }
        this.F_SIGN = 0;
        this.F_ZERO = temp;
        break;
      }
      case 33: {
        break;
      }
      case 34: {
        temp = (this.load(addr) | this.REG_ACC) & 255;
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp;
        this.REG_ACC = temp;
        cycleCount += cycleAdd;
        break;
      }
      case 35: {
        this.push(this.REG_ACC);
        break;
      }
      case 36: {
        this.F_BRK = 1;
        this.push(this.getStatus());
        break;
      }
      case 37: {
        this.REG_ACC = this.pull();
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 38: {
        this.setStatusFromStack(this.pull());
        break;
      }
      case 39: {
        if (addrMode === ADDR_ACC) {
          temp = this.REG_ACC;
          add = this.F_CARRY;
          this.F_CARRY = (temp >> 7) & 1;
          temp = ((temp << 1) & 0xff) + add;
          this.REG_ACC = temp;
        } else {
          if (
            cycleAdd === 0 &&
            (addrMode === ADDR_ABSX ||
              addrMode === ADDR_ABSY ||
              addrMode === ADDR_POSTIDXIND)
          ) {
            this.load(addr);
          }
          temp = this.load(addr);
          this.write(addr, temp);
          add = this.F_CARRY;
          this.F_CARRY = (temp >> 7) & 1;
          temp = ((temp << 1) & 0xff) + add;
          this.write(addr, temp);
        }
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp;
        break;
      }
      case 40: {
        if (addrMode === ADDR_ACC) {
          add = this.F_CARRY << 7;
          this.F_CARRY = this.REG_ACC & 1;
          temp = (this.REG_ACC >> 1) + add;
          this.REG_ACC = temp;
        } else {
          if (
            cycleAdd === 0 &&
            (addrMode === ADDR_ABSX ||
              addrMode === ADDR_ABSY ||
              addrMode === ADDR_POSTIDXIND)
          ) {
            this.load(addr);
          }
          temp = this.load(addr);
          this.write(addr, temp);
          add = this.F_CARRY << 7;
          this.F_CARRY = temp & 1;
          temp = (temp >> 1) + add;
          this.write(addr, temp);
        }
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp;
        break;
      }
      case 41: {
        this.setStatusFromStack(this.pull());
        this.REG_PC = this.pull();
        this.REG_PC += this.pull() << 8;
        if (this.REG_PC === 0xffff) {
          return cycleCount;
        }
        this.REG_PC--;
        break;
      }
      case 42: {
        this.REG_PC = this.pull();
        this.REG_PC += this.pull() << 8;
        if (this.REG_PC === 0xffff) {
          return cycleCount; // return from NSF play routine:
        }
        break;
      }
      case 43: {
        add = this.load(addr);
        temp = this.REG_ACC - add - (1 - this.F_CARRY);
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp & 0xff;
        if (
          ((this.REG_ACC ^ temp) & 0x80) !== 0 &&
          ((this.REG_ACC ^ add) & 0x80) !== 0
        ) {
          this.F_OVERFLOW = 1;
        } else {
          this.F_OVERFLOW = 0;
        }
        this.F_CARRY = temp < 0 ? 0 : 1;
        this.REG_ACC = temp & 0xff;
        cycleCount += cycleAdd;
        break;
      }
      case 44: {
        this.F_CARRY = 1;
        break;
      }
      case 45: {
        this.F_DECIMAL = 1;
        break;
      }
      case 46: {
        this.F_INTERRUPT = 1;
        break;
      }
      case 47: {
        if (
          cycleAdd === 0 &&
          (addrMode === ADDR_ABSX ||
            addrMode === ADDR_ABSY ||
            addrMode === ADDR_POSTIDXIND)
        ) {
          this.load(addr);
        }
        this.write(addr, this.REG_ACC);
        break;
      }
      case 48: {
        this.write(addr, this.REG_X);
        break;
      }
      case 49: {
        this.write(addr, this.REG_Y);
        break;
      }
      case 50: {
        this.REG_X = this.REG_ACC;
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 51: {
        this.REG_Y = this.REG_ACC;
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 52: {
        this.REG_X = this.REG_SP & 0xff;
        this.F_SIGN = (this.REG_SP >> 7) & 1;
        this.F_ZERO = this.REG_X;
        break;
      }
      case 53: {
        this.REG_ACC = this.REG_X;
        this.F_SIGN = (this.REG_X >> 7) & 1;
        this.F_ZERO = this.REG_X;
        break;
      }
      case 54: {
        this.REG_SP = this.REG_X & 0xff;
        break;
      }
      case 55: {
        this.REG_ACC = this.REG_Y;
        this.F_SIGN = (this.REG_Y >> 7) & 1;
        this.F_ZERO = this.REG_Y;
        break;
      }
      case 56: {
        // ALR: Shift right one bit after ANDing:
        temp = this.REG_ACC & this.load(addr);
        this.F_CARRY = temp & 1;
        this.REG_ACC = this.F_ZERO = temp >> 1;
        this.F_SIGN = 0;
        break;
      }
      case 57: {
        // ANC: AND accumulator, setting carry to bit 7 result.
        this.REG_ACC = this.F_ZERO = this.REG_ACC & this.load(addr);
        this.F_CARRY = this.F_SIGN = (this.REG_ACC >> 7) & 1;
        break;
      }
      case 58: {
        // ARR: Rotate right one bit after ANDing:
        temp = this.REG_ACC & this.load(addr);
        this.REG_ACC = this.F_ZERO = (temp >> 1) + (this.F_CARRY << 7);
        this.F_SIGN = this.F_CARRY;
        this.F_CARRY = (temp >> 7) & 1;
        this.F_OVERFLOW = ((temp >> 7) ^ (temp >> 6)) & 1;
        break;
      }
      case 59: {
        // AXS: Set X to (X AND A) - value.
        temp = (this.REG_X & this.REG_ACC) - this.load(addr);
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp & 0xff;
        this.F_CARRY = temp < 0 ? 0 : 1;
        this.REG_X = temp & 0xff;
        break;
      }
      case 60: {
        // LAX: Load A and X with memory:
        this.REG_ACC = this.REG_X = this.F_ZERO = this.load(addr);
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        cycleCount += cycleAdd;
        break;
      }
      case 61: {
        // SAX: Store A AND X in memory:
        this.write(addr, this.REG_ACC & this.REG_X);
        break;
      }
      case 62: {
        // DCP: Decrement memory then compare (unofficial, RMW pattern):
        if (
          cycleAdd === 0 &&
          (addrMode === ADDR_ABSX ||
            addrMode === ADDR_ABSY ||
            addrMode === ADDR_POSTIDXIND)
        ) {
          this.load(addr); // dummy read (indexed, no page crossing)
        }
        temp = this.load(addr);
        this.write(addr, temp); // dummy write (original value)
        temp = (temp - 1) & 0xff;
        this.write(addr, temp);
        temp = this.REG_ACC - temp;
        this.F_CARRY = temp >= 0 ? 1 : 0;
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp & 0xff;
        break;
      }
      case 63: {
        // ISC: Increment memory then subtract (unofficial, RMW pattern):
        if (
          cycleAdd === 0 &&
          (addrMode === ADDR_ABSX ||
            addrMode === ADDR_ABSY ||
            addrMode === ADDR_POSTIDXIND)
        ) {
          this.load(addr); // dummy read (indexed, no page crossing)
        }
        temp = this.load(addr);
        this.write(addr, temp); // dummy write (original value)
        temp = (temp + 1) & 0xff;
        this.write(addr, temp);
        let isb_val = temp;
        temp = this.REG_ACC - isb_val - (1 - this.F_CARRY);
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp & 0xff;
        if (
          ((this.REG_ACC ^ temp) & 0x80) !== 0 &&
          ((this.REG_ACC ^ isb_val) & 0x80) !== 0
        ) {
          this.F_OVERFLOW = 1;
        } else {
          this.F_OVERFLOW = 0;
        }
        this.F_CARRY = temp < 0 ? 0 : 1;
        this.REG_ACC = temp & 0xff;
        break;
      }
      case 64: {
        // RLA: Rotate left then AND (unofficial, RMW pattern):
        if (
          cycleAdd === 0 &&
          (addrMode === ADDR_ABSX ||
            addrMode === ADDR_ABSY ||
            addrMode === ADDR_POSTIDXIND)
        ) {
          this.load(addr); // dummy read (indexed, no page crossing)
        }
        temp = this.load(addr);
        this.write(addr, temp); // dummy write (original value)
        add = this.F_CARRY;
        this.F_CARRY = (temp >> 7) & 1;
        temp = ((temp << 1) & 0xff) + add;
        this.write(addr, temp);
        this.REG_ACC = this.REG_ACC & temp;
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 65: {
        // RRA: Rotate right then add (unofficial, RMW pattern):
        if (
          cycleAdd === 0 &&
          (addrMode === ADDR_ABSX ||
            addrMode === ADDR_ABSY ||
            addrMode === ADDR_POSTIDXIND)
        ) {
          this.load(addr); // dummy read (indexed, no page crossing)
        }
        temp = this.load(addr);
        this.write(addr, temp); // dummy write (original value)
        add = this.F_CARRY << 7;
        this.F_CARRY = temp & 1;
        temp = (temp >> 1) + add;
        this.write(addr, temp);
        let rra_val = temp;
        temp = this.REG_ACC + rra_val + this.F_CARRY;
        if (
          ((this.REG_ACC ^ rra_val) & 0x80) === 0 &&
          ((this.REG_ACC ^ temp) & 0x80) !== 0
        ) {
          this.F_OVERFLOW = 1;
        } else {
          this.F_OVERFLOW = 0;
        }
        this.F_CARRY = temp > 255 ? 1 : 0;
        this.F_SIGN = (temp >> 7) & 1;
        this.F_ZERO = temp & 0xff;
        this.REG_ACC = temp & 255;
        break;
      }
      case 66: {
        // SLO: Shift left then OR (unofficial, RMW pattern):
        if (
          cycleAdd === 0 &&
          (addrMode === ADDR_ABSX ||
            addrMode === ADDR_ABSY ||
            addrMode === ADDR_POSTIDXIND)
        ) {
          this.load(addr); // dummy read (indexed, no page crossing)
        }
        temp = this.load(addr);
        this.write(addr, temp); // dummy write (original value)
        this.F_CARRY = (temp >> 7) & 1;
        temp = (temp << 1) & 255;
        this.write(addr, temp);
        this.REG_ACC = this.REG_ACC | temp;
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 67: {
        // SRE: Shift right then XOR (unofficial, RMW pattern):
        if (
          cycleAdd === 0 &&
          (addrMode === ADDR_ABSX ||
            addrMode === ADDR_ABSY ||
            addrMode === ADDR_POSTIDXIND)
        ) {
          this.load(addr); // dummy read (indexed, no page crossing)
        }
        temp = this.load(addr) & 0xff;
        this.write(addr, temp); // dummy write (original value)
        this.F_CARRY = temp & 1;
        temp >>= 1;
        this.write(addr, temp);
        this.REG_ACC = this.REG_ACC ^ temp;
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 68: {
        // SKB: Do nothing
        break;
      }
      case 69: {
        // IGN: Do nothing but load.
        // TODO: Properly implement the double-reads.
        this.load(addr);
        cycleCount += cycleAdd;
        break;
      }
      case 71: {
        // SHA (AHX/AXA): Store A AND X AND (high byte of base address + 1).
        if (cycleAdd === 0) {
          this.load(addr);
        }
        let dmaDuringInstr =
          this._dmcFetchCycles > 0 &&
          this._dmcFetchCycles <= this.instrBusCycles;
        let shaVal = dmaDuringInstr
          ? this.REG_ACC & this.REG_X
          : this.REG_ACC & this.REG_X & (((baseHigh + 1) & 0xff) | 0);
        if (cycleAdd === 1) {
          addr = (shaVal << 8) | (addr & 0xff);
        }
        this.write(addr, shaVal);
        break;
      }
      case 72: {
        // SHS (TAS/XAS): Transfer A AND X to SP, then store SP AND (high byte + 1).
        if (cycleAdd === 0) {
          this.load(addr); // forced dummy read
        }
        let dmaDuringInstr2 =
          this._dmcFetchCycles > 0 &&
          this._dmcFetchCycles <= this.instrBusCycles;
        this.REG_SP = 0x0100 | (this.REG_ACC & this.REG_X);
        let shsVal = dmaDuringInstr2
          ? this.REG_SP & 0xff
          : this.REG_SP & 0xff & ((baseHigh + 1) & 0xff);
        if (cycleAdd === 1) {
          addr = (shsVal << 8) | (addr & 0xff);
        }
        this.write(addr, shsVal);
        break;
      }
      case 73: {
        // SHY (SYA/SAY): Store Y AND (high byte of base address + 1).
        if (cycleAdd === 0) {
          this.load(addr); // forced dummy read
        }
        let dmaDuringInstr3 =
          this._dmcFetchCycles > 0 &&
          this._dmcFetchCycles <= this.instrBusCycles;
        let shyVal = dmaDuringInstr3
          ? this.REG_Y
          : this.REG_Y & ((baseHigh + 1) & 0xff);
        if (cycleAdd === 1) {
          addr = (shyVal << 8) | (addr & 0xff);
        }
        this.write(addr, shyVal);
        break;
      }
      case 74: {
        // SHX (SXA/XAS): Store X AND (high byte of base address + 1).
        if (cycleAdd === 0) {
          this.load(addr); // forced dummy read
        }
        let dmaDuringInstr4 =
          this._dmcFetchCycles > 0 &&
          this._dmcFetchCycles <= this.instrBusCycles;
        let shxVal = dmaDuringInstr4
          ? this.REG_X
          : this.REG_X & ((baseHigh + 1) & 0xff);
        if (cycleAdd === 1) {
          addr = (shxVal << 8) | (addr & 0xff);
        }
        this.write(addr, shxVal);
        break;
      }
      case 75: {
        // LAE (LAS/LAR): Load A, X, and SP with (memory AND SP).
        temp = this.load(addr) & (this.REG_SP & 0xff);
        this.REG_ACC = this.REG_X = this.F_ZERO = temp;
        this.REG_SP = 0x0100 | temp;
        this.F_SIGN = (temp >> 7) & 1;
        cycleCount += cycleAdd;
        break;
      }
      case 76: {
        // ANE (XAA): A = (A | MAGIC) & X & Immediate.
        this.REG_ACC = this.F_ZERO =
          (this.REG_ACC | 0xff) & this.REG_X & this.load(addr);
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        break;
      }
      case 77: {
        // LXA (LAX immediate/ATX): A = (A | MAGIC) & Immediate, X = A.
        this.REG_ACC =
          this.REG_X =
          this.F_ZERO =
            (this.REG_ACC | 0xff) & this.load(addr);
        this.F_SIGN = (this.REG_ACC >> 7) & 1;
        break;
      }

      default: {
        throw new Error(
          `Game crashed, invalid opcode at address $${opaddr.toString(16)}`,
        );
      }
    } // end of switch

    // Step PPU for any internal cycles not covered by bus operations.
    if (this.instrBusCycles < cycleCount) {
      let missingDots = (cycleCount - this.instrBusCycles) * 3;
      this.instrBusCycles = cycleCount;
      this.nes.ppu.advanceDots(missingDots);
    }

    // NMI delay: when nmiRaised was set during this instruction (by inline
    // PPU stepping triggering VBlank or by a $2000 write enabling NMI),
    // determine 0-delay vs 1-delay based on remaining PPU dots.
    if (this.nmiRaised) {
      let remainingDots =
        (this.instrBusCycles - this.nmiRaisedAtCycle) * 3 +
        this.nmiDotsRemainingInStep;
      if (remainingDots >= 5) {
        // 0-delay: NMI fires before the next instruction.
        this.nmiImmediate = true;
        this.nmiRaised = false;
      }
      // else: 1-delay. nmiRaised stays set for promotion at start of
      // next emulate(), giving standard 1-instruction delay.
    }

    // Fire NMI after the instruction completes.
    if (this.nmiPending) {
      this.REG_PC_NEW = this.REG_PC;
      this.F_INTERRUPT_NEW = this.F_INTERRUPT;
      this.doNonMaskableInterrupt(this.getStatus() & 0xef);
      this.REG_PC = this.REG_PC_NEW;
      this.F_INTERRUPT = this.F_INTERRUPT_NEW;
      this.F_BRK = this.F_BRK_NEW;
      this.nmiPending = false;
      interruptCycles = 7;
    }

    this._cpuCycleBase += cycleCount + interruptCycles;
    if (this._traceCb) {
      this._traceCb(this._instrPC, opcode, cycleCount + interruptCycles, this.nes.fpsFrameCount);
    }
    return cycleCount + interruptCycles;
  }

  loadFromCartridge(addr: number): number {
    return this.nes.mmap.load(addr);
  }

  _loadFromCartridgePlain(addr: number): number {
    return this.nes.mmap.load(addr);
  }

  _loadFromCartridgeWithGameGenie(addr: number): number {
    let value = this.nes.mmap.load(addr);
    return this.nes.gameGenie.applyCodes(addr, value);
  }

  _updateCartridgeLoader(): void {
    if (this.nes.gameGenie.enabled && this.nes.gameGenie.patches.length > 0) {
      this.loadFromCartridge = this._loadFromCartridgeWithGameGenie;
    } else {
      // restore prototype method (avoid delete breaking esbuild output)
      Object.setPrototypeOf(this, CPU.prototype);
    }
  }

  load(addr: number): number {
    if (addr < 0x2000) {
      this.dataBus = this.mem[addr & 0x7ff];
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
    } else if (addr >= 0x4000) {
      if (addr === 0x4015) {
        this.nes.papu.advanceFrameCounter(
          this.instrBusCycles - this.apuCatchupCycles,
        );
        this.apuCatchupCycles = this.instrBusCycles;
        let apuStatus = this.loadFromCartridge(addr);
        this.instrBusCycles++;
        this.nes.ppu.advanceDots(3);
        return apuStatus;
      }
      this.dataBus = this.loadFromCartridge(addr);
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
    } else {
      this.instrBusCycles++;
      this.dataBus = this.loadFromCartridge(addr);
      this.nes.ppu.advanceDots(3);
    }
    return this.dataBus;
  }

  loadDirect(addr: number): number {
    if (addr < 0x2000) {
      this.dataBus = this.mem[addr & 0x7ff];
    } else {
      this.dataBus = this.loadFromCartridge(addr);
    }
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    return this.dataBus;
  }

  load16bit(addr: number): number {
    let lo: number;
    if (addr < 0x1fff) {
      this.dataBus = this.mem[addr & 0x7ff];
      lo = this.dataBus;
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
      this.dataBus = this.mem[(addr + 1) & 0x7ff];
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
      return lo | (this.dataBus << 8);
    } else {
      this.dataBus = this.loadFromCartridge(addr);
      lo = this.dataBus;
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
      this.dataBus = this.loadFromCartridge(addr + 1);
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
      return lo | (this.dataBus << 8);
    }
  }

  write(addr: number, val: number): void {
    if (addr >= 0x2000 && addr < 0x4000) {
      this.instrBusCycles++;
      this.dataBus = val;
      this.nes.mmap.write(addr, val);
      this.nes.ppu.advanceDots(3);
    } else {
      this.dataBus = val;
      if (addr < 0x2000) {
        this.mem[addr & 0x7ff] = val;
      } else {
        this.nes.mmap.write(addr, val);
      }
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
    }
  }

  requestIrq(type: number): void {
    if (this.irqRequested) {
      if (type === this.IRQ_NORMAL) {
        return;
      }
    }
    this.irqRequested = true;
    this.irqType = type;
  }

  push(value: number): void {
    this.dataBus = value;
    this.mem[this.REG_SP | 0x100] = value;
    this.REG_SP--;
    this.REG_SP = this.REG_SP & 0xff;
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
  }

  pull(): number {
    this.REG_SP++;
    this.REG_SP = this.REG_SP & 0xff;
    this.dataBus = this.mem[0x100 | this.REG_SP];
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    return this.dataBus;
  }

  _cyclesToNextDmcFetch(): number {
    if (!this.nes.papu) {
      return 0x7fffffff;
    }
    let dmc = this.nes.papu.dmc;
    if (!dmc || !dmc.isEnabled || dmc.dmaFrequency <= 0) {
      return 0x7fffffff;
    }
    if (!dmc.hasSample) {
      return 0x7fffffff;
    }
    let cyclesPerClock = dmc.dmaFrequency >> 3;
    let cyclesToFirstClock = (dmc.shiftCounter + 7) >> 3;
    if (cyclesToFirstClock <= 0) cyclesToFirstClock = cyclesPerClock;
    return cyclesToFirstClock + (dmc.dmaCounter - 1) * cyclesPerClock;
  }

  _takeBranch(opaddr: number, addr: number): number {
    let nextPC = (opaddr + 3) & 0xffff;
    let target = (addr + 1) & 0xffff;
    this.load(nextPC);
    if ((nextPC & 0xff00) !== (target & 0xff00)) {
      let wrongAddr = (nextPC & 0xff00) | (target & 0x00ff);
      this.load(wrongAddr);
      this.REG_PC = addr;
      return 2;
    }
    this.REG_PC = addr;
    return 1;
  }

  pageCrossed(addr1: number, addr2: number): boolean {
    return (addr1 & 0xff00) !== (addr2 & 0xff00);
  }

  haltCycles(cycles: number): void {
    this.cyclesToHalt += cycles;
  }

  doNonMaskableInterrupt(status: number): void {
    if (this.nes.mmap === null) return;
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    this.REG_PC_NEW++;
    this.push((this.REG_PC_NEW >> 8) & 0xff);
    this.push(this.REG_PC_NEW & 0xff);
    this.F_INTERRUPT_NEW = 1;
    this.push(status);
    this.dataBus = this.loadFromCartridge(0xfffa);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    let lo = this.dataBus;
    this.dataBus = this.loadFromCartridge(0xfffb);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    this.REG_PC_NEW = lo | (this.dataBus << 8);
    this.REG_PC_NEW--;
  }

  doResetInterrupt(): void {
    this.dataBus = this.loadFromCartridge(0xfffc);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    let lo = this.dataBus;
    this.dataBus = this.loadFromCartridge(0xfffd);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    this.REG_PC_NEW = lo | (this.dataBus << 8);
    this.REG_PC_NEW--;
  }

  doIrq(status: number): void {
    this.REG_PC_NEW++;
    this.push((this.REG_PC_NEW >> 8) & 0xff);
    this.push(this.REG_PC_NEW & 0xff);
    this.push(status);
    this.F_INTERRUPT_NEW = 1;
    this.F_BRK_NEW = 0;
    this.dataBus = this.loadFromCartridge(0xfffe);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    let lo = this.dataBus;
    this.dataBus = this.loadFromCartridge(0xffff);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    this.REG_PC_NEW = lo | (this.dataBus << 8);
    this.REG_PC_NEW--;
  }

  getStatus(): number {
    return (
      this.F_CARRY |
      ((this.F_ZERO === 0 ? 1 : 0) << 1) |
      (this.F_INTERRUPT << 2) |
      (this.F_DECIMAL << 3) |
      (this.F_BRK << 4) |
      (this.F_NOTUSED << 5) |
      (this.F_OVERFLOW << 6) |
      (this.F_SIGN << 7)
    );
  }

  setStatus(st: number): void {
    this.F_CARRY = st & 1;
    this.F_ZERO = ((st >> 1) & 1) === 1 ? 0 : 1;
    this.F_INTERRUPT = (st >> 2) & 1;
    this.F_DECIMAL = (st >> 3) & 1;
    this.F_BRK = (st >> 4) & 1;
    this.F_NOTUSED = (st >> 5) & 1;
    this.F_OVERFLOW = (st >> 6) & 1;
    this.F_SIGN = (st >> 7) & 1;
  }

  setStatusFromStack(st: number): void {
    this.F_CARRY = st & 1;
    this.F_ZERO = ((st >> 1) & 1) === 1 ? 0 : 1;
    this.F_INTERRUPT = (st >> 2) & 1;
    this.F_DECIMAL = (st >> 3) & 1;
    this.F_OVERFLOW = (st >> 6) & 1;
    this.F_SIGN = (st >> 7) & 1;
  }

  toJSON(): any {
    return toJSON(this);
  }

  fromJSON(s: any): void {
    fromJSON(this, s);
  }
}

export default CPU;
