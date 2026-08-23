"use strict";
/**
 * 6502 Disassembler — 参照 FCEUX asm.cpp Disassemble() + x6502.h optype/opsize 表
 *
 * 输入: 内存地址、操作码字节
 * 输出: 汇编字符串 (如 "JSR $C004")
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.disassemble = disassemble;
exports.disassembleRange = disassembleRange;
exports.flagsToString = flagsToString;
// Addressing mode constants (同 src/cpu.ts)
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
// Instruction names
const INS_NAMES = [
    "ADC", "AND", "ASL", "BCC", "BCS", "BEQ", "BIT", "BMI",
    "BNE", "BPL", "BRK", "BVC", "BVS", "CLC", "CLD", "CLI",
    "CLV", "CMP", "CPX", "CPY", "DEC", "DEX", "DEY", "EOR",
    "INC", "INX", "INY", "JMP", "JSR", "LDA", "LDX", "LDY",
    "LSR", "NOP", "ORA", "PHA", "PHP", "PLA", "PLP", "ROL",
    "ROR", "RTI", "RTS", "SBC", "SEC", "SED", "SEI", "STA",
    "STX", "STY", "TAX", "TAY", "TSX", "TXA", "TXS", "TYA",
    "ALR", "ANC", "ARR", "AXS", "LAX", "SAX", "DCP", "ISC",
    "RLA", "RRA", "SLO", "SRE", "SKB", "IGN",
    null, // 70 (unused)
    "SHA", "SHS", "SHY", "SHX", "LAE", "ANE", "LXA",
];
/** Refer to FCEUX x6502.h: extern const uint8 opsize[256], optype[256] */
// prettier-ignore
const OPCODE_TABLE = {
    0x69: { ins: 0, mode: ADDR_IMM, size: 2, cycles: 2 },
    0x65: { ins: 0, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x75: { ins: 0, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0x6d: { ins: 0, mode: ADDR_ABS, size: 3, cycles: 4 },
    0x7d: { ins: 0, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0x79: { ins: 0, mode: ADDR_ABSY, size: 3, cycles: 4 },
    0x61: { ins: 0, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
    0x71: { ins: 0, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
    0x29: { ins: 1, mode: ADDR_IMM, size: 2, cycles: 2 },
    0x25: { ins: 1, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x35: { ins: 1, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0x2d: { ins: 1, mode: ADDR_ABS, size: 3, cycles: 4 },
    0x3d: { ins: 1, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0x39: { ins: 1, mode: ADDR_ABSY, size: 3, cycles: 4 },
    0x21: { ins: 1, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
    0x31: { ins: 1, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
    0x0a: { ins: 2, mode: ADDR_ACC, size: 1, cycles: 2 },
    0x06: { ins: 2, mode: ADDR_ZP, size: 2, cycles: 5 },
    0x16: { ins: 2, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0x0e: { ins: 2, mode: ADDR_ABS, size: 3, cycles: 6 },
    0x1e: { ins: 2, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0x90: { ins: 3, mode: ADDR_REL, size: 2, cycles: 2 },
    0xb0: { ins: 4, mode: ADDR_REL, size: 2, cycles: 2 },
    0xf0: { ins: 5, mode: ADDR_REL, size: 2, cycles: 2 },
    0x30: { ins: 7, mode: ADDR_REL, size: 2, cycles: 2 },
    0xd0: { ins: 8, mode: ADDR_REL, size: 2, cycles: 2 },
    0x10: { ins: 9, mode: ADDR_REL, size: 2, cycles: 2 },
    0x50: { ins: 11, mode: ADDR_REL, size: 2, cycles: 2 },
    0x70: { ins: 12, mode: ADDR_REL, size: 2, cycles: 2 },
    0x24: { ins: 6, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x2c: { ins: 6, mode: ADDR_ABS, size: 3, cycles: 4 },
    0x00: { ins: 10, mode: ADDR_IMP, size: 1, cycles: 7 },
    0x18: { ins: 13, mode: ADDR_IMP, size: 1, cycles: 2 },
    0xd8: { ins: 14, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x58: { ins: 15, mode: ADDR_IMP, size: 1, cycles: 2 },
    0xb8: { ins: 16, mode: ADDR_IMP, size: 1, cycles: 2 },
    0xc9: { ins: 17, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xc5: { ins: 17, mode: ADDR_ZP, size: 2, cycles: 3 },
    0xd5: { ins: 17, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0xcd: { ins: 17, mode: ADDR_ABS, size: 3, cycles: 4 },
    0xdd: { ins: 17, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0xd9: { ins: 17, mode: ADDR_ABSY, size: 3, cycles: 4 },
    0xc1: { ins: 17, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
    0xd1: { ins: 17, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
    0xe0: { ins: 18, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xe4: { ins: 18, mode: ADDR_ZP, size: 2, cycles: 3 },
    0xec: { ins: 18, mode: ADDR_ABS, size: 3, cycles: 4 },
    0xc0: { ins: 19, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xc4: { ins: 19, mode: ADDR_ZP, size: 2, cycles: 3 },
    0xcc: { ins: 19, mode: ADDR_ABS, size: 3, cycles: 4 },
    0xc6: { ins: 20, mode: ADDR_ZP, size: 2, cycles: 5 },
    0xd6: { ins: 20, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0xce: { ins: 20, mode: ADDR_ABS, size: 3, cycles: 6 },
    0xde: { ins: 20, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0xca: { ins: 21, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x88: { ins: 22, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x49: { ins: 23, mode: ADDR_IMM, size: 2, cycles: 2 },
    0x45: { ins: 23, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x55: { ins: 23, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0x4d: { ins: 23, mode: ADDR_ABS, size: 3, cycles: 4 },
    0x5d: { ins: 23, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0x59: { ins: 23, mode: ADDR_ABSY, size: 3, cycles: 4 },
    0x41: { ins: 23, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
    0x51: { ins: 23, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
    0xe6: { ins: 24, mode: ADDR_ZP, size: 2, cycles: 5 },
    0xf6: { ins: 24, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0xee: { ins: 24, mode: ADDR_ABS, size: 3, cycles: 6 },
    0xfe: { ins: 24, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0xe8: { ins: 25, mode: ADDR_IMP, size: 1, cycles: 2 },
    0xc8: { ins: 26, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x4c: { ins: 27, mode: ADDR_ABS, size: 3, cycles: 3 },
    0x6c: { ins: 27, mode: ADDR_INDABS, size: 3, cycles: 5 },
    0x20: { ins: 28, mode: ADDR_ABS, size: 3, cycles: 6 },
    0xa9: { ins: 29, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xa5: { ins: 29, mode: ADDR_ZP, size: 2, cycles: 3 },
    0xb5: { ins: 29, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0xad: { ins: 29, mode: ADDR_ABS, size: 3, cycles: 4 },
    0xbd: { ins: 29, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0xb9: { ins: 29, mode: ADDR_ABSY, size: 3, cycles: 4 },
    0xa1: { ins: 29, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
    0xb1: { ins: 29, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
    0xa2: { ins: 30, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xa6: { ins: 30, mode: ADDR_ZP, size: 2, cycles: 3 },
    0xb6: { ins: 30, mode: ADDR_ZPY, size: 2, cycles: 4 },
    0xae: { ins: 30, mode: ADDR_ABS, size: 3, cycles: 4 },
    0xbe: { ins: 30, mode: ADDR_ABSY, size: 3, cycles: 4 },
    0xa0: { ins: 31, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xa4: { ins: 31, mode: ADDR_ZP, size: 2, cycles: 3 },
    0xb4: { ins: 31, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0xac: { ins: 31, mode: ADDR_ABS, size: 3, cycles: 4 },
    0xbc: { ins: 31, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0x4a: { ins: 32, mode: ADDR_ACC, size: 1, cycles: 2 },
    0x46: { ins: 32, mode: ADDR_ZP, size: 2, cycles: 5 },
    0x56: { ins: 32, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0x4e: { ins: 32, mode: ADDR_ABS, size: 3, cycles: 6 },
    0x5e: { ins: 32, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0x1a: { ins: 33, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x3a: { ins: 33, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x5a: { ins: 33, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x7a: { ins: 33, mode: ADDR_IMP, size: 1, cycles: 2 },
    0xda: { ins: 33, mode: ADDR_IMP, size: 1, cycles: 2 },
    0xea: { ins: 33, mode: ADDR_IMP, size: 1, cycles: 2 },
    0xfa: { ins: 33, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x09: { ins: 34, mode: ADDR_IMM, size: 2, cycles: 2 },
    0x05: { ins: 34, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x15: { ins: 34, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0x0d: { ins: 34, mode: ADDR_ABS, size: 3, cycles: 4 },
    0x1d: { ins: 34, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0x19: { ins: 34, mode: ADDR_ABSY, size: 3, cycles: 4 },
    0x01: { ins: 34, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
    0x11: { ins: 34, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
    0x48: { ins: 35, mode: ADDR_IMP, size: 1, cycles: 3 },
    0x08: { ins: 36, mode: ADDR_IMP, size: 1, cycles: 3 },
    0x68: { ins: 37, mode: ADDR_IMP, size: 1, cycles: 4 },
    0x28: { ins: 38, mode: ADDR_IMP, size: 1, cycles: 4 },
    0x2a: { ins: 39, mode: ADDR_ACC, size: 1, cycles: 2 },
    0x26: { ins: 39, mode: ADDR_ZP, size: 2, cycles: 5 },
    0x36: { ins: 39, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0x2e: { ins: 39, mode: ADDR_ABS, size: 3, cycles: 6 },
    0x3e: { ins: 39, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0x6a: { ins: 40, mode: ADDR_ACC, size: 1, cycles: 2 },
    0x66: { ins: 40, mode: ADDR_ZP, size: 2, cycles: 5 },
    0x76: { ins: 40, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0x6e: { ins: 40, mode: ADDR_ABS, size: 3, cycles: 6 },
    0x7e: { ins: 40, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0x40: { ins: 41, mode: ADDR_IMP, size: 1, cycles: 6 },
    0x60: { ins: 42, mode: ADDR_IMP, size: 1, cycles: 6 },
    0xe9: { ins: 43, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xeb: { ins: 43, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xe5: { ins: 43, mode: ADDR_ZP, size: 2, cycles: 3 },
    0xf5: { ins: 43, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0xed: { ins: 43, mode: ADDR_ABS, size: 3, cycles: 4 },
    0xfd: { ins: 43, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0xf9: { ins: 43, mode: ADDR_ABSY, size: 3, cycles: 4 },
    0xe1: { ins: 43, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
    0xf1: { ins: 43, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
    0x38: { ins: 44, mode: ADDR_IMP, size: 1, cycles: 2 },
    0xf8: { ins: 45, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x78: { ins: 46, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x85: { ins: 47, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x95: { ins: 47, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0x8d: { ins: 47, mode: ADDR_ABS, size: 3, cycles: 4 },
    0x9d: { ins: 47, mode: ADDR_ABSX, size: 3, cycles: 5 },
    0x99: { ins: 47, mode: ADDR_ABSY, size: 3, cycles: 5 },
    0x81: { ins: 47, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
    0x91: { ins: 47, mode: ADDR_POSTIDXIND, size: 2, cycles: 6 },
    0x86: { ins: 48, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x96: { ins: 48, mode: ADDR_ZPY, size: 2, cycles: 4 },
    0x8e: { ins: 48, mode: ADDR_ABS, size: 3, cycles: 4 },
    0x84: { ins: 49, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x94: { ins: 49, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0x8c: { ins: 49, mode: ADDR_ABS, size: 3, cycles: 4 },
    0xaa: { ins: 50, mode: ADDR_IMP, size: 1, cycles: 2 },
    0xa8: { ins: 51, mode: ADDR_IMP, size: 1, cycles: 2 },
    0xba: { ins: 52, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x8a: { ins: 53, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x9a: { ins: 54, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x98: { ins: 55, mode: ADDR_IMP, size: 1, cycles: 2 },
    0x4b: { ins: 56, mode: ADDR_IMM, size: 2, cycles: 2 },
    0x0b: { ins: 57, mode: ADDR_IMM, size: 2, cycles: 2 },
    0x2b: { ins: 57, mode: ADDR_IMM, size: 2, cycles: 2 },
    0x6b: { ins: 58, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xcb: { ins: 59, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xa3: { ins: 60, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
    0xa7: { ins: 60, mode: ADDR_ZP, size: 2, cycles: 3 },
    0xaf: { ins: 60, mode: ADDR_ABS, size: 3, cycles: 4 },
    0xb3: { ins: 60, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
    0xb7: { ins: 60, mode: ADDR_ZPY, size: 2, cycles: 4 },
    0xbf: { ins: 60, mode: ADDR_ABSY, size: 3, cycles: 4 },
    0x83: { ins: 61, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
    0x87: { ins: 61, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x8f: { ins: 61, mode: ADDR_ABS, size: 3, cycles: 4 },
    0x97: { ins: 61, mode: ADDR_ZPY, size: 2, cycles: 4 },
    0xc3: { ins: 62, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
    0xc7: { ins: 62, mode: ADDR_ZP, size: 2, cycles: 5 },
    0xcf: { ins: 62, mode: ADDR_ABS, size: 3, cycles: 6 },
    0xd3: { ins: 62, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
    0xd7: { ins: 62, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0xdb: { ins: 62, mode: ADDR_ABSY, size: 3, cycles: 7 },
    0xdf: { ins: 62, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0xe3: { ins: 63, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
    0xe7: { ins: 63, mode: ADDR_ZP, size: 2, cycles: 5 },
    0xef: { ins: 63, mode: ADDR_ABS, size: 3, cycles: 6 },
    0xf3: { ins: 63, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
    0xf7: { ins: 63, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0xfb: { ins: 63, mode: ADDR_ABSY, size: 3, cycles: 7 },
    0xff: { ins: 63, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0x23: { ins: 64, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
    0x27: { ins: 64, mode: ADDR_ZP, size: 2, cycles: 5 },
    0x2f: { ins: 64, mode: ADDR_ABS, size: 3, cycles: 6 },
    0x33: { ins: 64, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
    0x37: { ins: 64, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0x3b: { ins: 64, mode: ADDR_ABSY, size: 3, cycles: 7 },
    0x3f: { ins: 64, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0x63: { ins: 65, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
    0x67: { ins: 65, mode: ADDR_ZP, size: 2, cycles: 5 },
    0x6f: { ins: 65, mode: ADDR_ABS, size: 3, cycles: 6 },
    0x73: { ins: 65, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
    0x77: { ins: 65, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0x7b: { ins: 65, mode: ADDR_ABSY, size: 3, cycles: 7 },
    0x7f: { ins: 65, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0x03: { ins: 66, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
    0x07: { ins: 66, mode: ADDR_ZP, size: 2, cycles: 5 },
    0x0f: { ins: 66, mode: ADDR_ABS, size: 3, cycles: 6 },
    0x13: { ins: 66, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
    0x17: { ins: 66, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0x1b: { ins: 66, mode: ADDR_ABSY, size: 3, cycles: 7 },
    0x1f: { ins: 66, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0x43: { ins: 67, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
    0x47: { ins: 67, mode: ADDR_ZP, size: 2, cycles: 5 },
    0x4f: { ins: 67, mode: ADDR_ABS, size: 3, cycles: 6 },
    0x53: { ins: 67, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
    0x57: { ins: 67, mode: ADDR_ZPX, size: 2, cycles: 6 },
    0x5b: { ins: 67, mode: ADDR_ABSY, size: 3, cycles: 7 },
    0x5f: { ins: 67, mode: ADDR_ABSX, size: 3, cycles: 7 },
    0x80: { ins: 68, mode: ADDR_IMM, size: 2, cycles: 2 },
    0x82: { ins: 68, mode: ADDR_IMM, size: 2, cycles: 2 },
    0x89: { ins: 68, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xc2: { ins: 68, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xe2: { ins: 68, mode: ADDR_IMM, size: 2, cycles: 2 },
    0x0c: { ins: 69, mode: ADDR_ABS, size: 3, cycles: 4 },
    0x1c: { ins: 69, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0x3c: { ins: 69, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0x5c: { ins: 69, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0x7c: { ins: 69, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0xdc: { ins: 69, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0xfc: { ins: 69, mode: ADDR_ABSX, size: 3, cycles: 4 },
    0x04: { ins: 69, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x44: { ins: 69, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x64: { ins: 69, mode: ADDR_ZP, size: 2, cycles: 3 },
    0x14: { ins: 69, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0x34: { ins: 69, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0x54: { ins: 69, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0x74: { ins: 69, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0xd4: { ins: 69, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0xf4: { ins: 69, mode: ADDR_ZPX, size: 2, cycles: 4 },
    0x93: { ins: 71, mode: ADDR_POSTIDXIND, size: 2, cycles: 6 },
    0x9f: { ins: 71, mode: ADDR_ABSY, size: 3, cycles: 5 },
    0x9b: { ins: 72, mode: ADDR_ABSY, size: 3, cycles: 5 },
    0x9c: { ins: 73, mode: ADDR_ABSX, size: 3, cycles: 5 },
    0x9e: { ins: 74, mode: ADDR_ABSY, size: 3, cycles: 5 },
    0xbb: { ins: 75, mode: ADDR_ABSY, size: 3, cycles: 4 },
    0x8b: { ins: 76, mode: ADDR_IMM, size: 2, cycles: 2 },
    0xab: { ins: 77, mode: ADDR_IMM, size: 2, cycles: 2 },
};
/**
 * 反汇编一条 6502 指令 (参照 FCEUX Disassemble)
 * @param addr - 程序计数器地址 (CPU 地址)
 * @param memRead - 内存读取函数 (addr) => byte
 * @returns { text, size, bytes }
 */
function disassemble(addr, memRead) {
    const opcode = memRead(addr) & 0xff;
    const info = OPCODE_TABLE[opcode];
    if (!info) {
        // 未定义操作码
        return {
            text: `??? $${opcode.toString(16).padStart(2, '0')}`,
            size: 1,
            bytes: [opcode],
        };
    }
    const insName = INS_NAMES[info.ins] ?? '???';
    const bytes = [opcode];
    for (let i = 1; i < info.size; i++) {
        bytes.push(memRead((addr + i) & 0xffff) & 0xff);
    }
    let operand = '';
    switch (info.mode) {
        case ADDR_IMP:
            break;
        case ADDR_ACC:
            operand = 'A';
            break;
        case ADDR_IMM:
            operand = `#$${bytes[1].toString(16).padStart(2, '0')}`;
            break;
        case ADDR_ZP:
            operand = `$${bytes[1].toString(16).padStart(2, '0')}`;
            break;
        case ADDR_ZPX:
            operand = `$${bytes[1].toString(16).padStart(2, '0')},X`;
            break;
        case ADDR_ZPY:
            operand = `$${bytes[1].toString(16).padStart(2, '0')},Y`;
            break;
        case ADDR_ABS: {
            const absAddr = bytes[1] | (bytes[2] << 8);
            operand = `$${absAddr.toString(16).padStart(4, '0')}`;
            break;
        }
        case ADDR_ABSX: {
            const absAddr = bytes[1] | (bytes[2] << 8);
            operand = `$${absAddr.toString(16).padStart(4, '0')},X`;
            break;
        }
        case ADDR_ABSY: {
            const absAddr = bytes[1] | (bytes[2] << 8);
            operand = `$${absAddr.toString(16).padStart(4, '0')},Y`;
            break;
        }
        case ADDR_INDABS: {
            const absAddr = bytes[1] | (bytes[2] << 8);
            operand = `($${absAddr.toString(16).padStart(4, '0')})`;
            break;
        }
        case ADDR_PREIDXIND:
            operand = `($${bytes[1].toString(16).padStart(2, '0')},X)`;
            break;
        case ADDR_POSTIDXIND:
            operand = `($${bytes[1].toString(16).padStart(2, '0')}),Y`;
            break;
        case ADDR_REL: {
            const relOffset = bytes[1] < 128 ? bytes[1] : bytes[1] - 256;
            const target = (addr + info.size + relOffset) & 0xffff;
            operand = `$${target.toString(16).padStart(4, '0')}`;
            break;
        }
        default:
            operand = `$???`;
            break;
    }
    const text = operand ? `${insName} ${operand}` : insName;
    return { text, size: info.size, bytes };
}
function disassembleRange(startAddr, lineCount, memRead) {
    const entries = [];
    let addr = startAddr & 0xffff;
    for (let i = 0; i < lineCount; i++) {
        const result = disassemble(addr, memRead);
        entries.push({
            addr,
            size: result.size,
            bytes: result.bytes,
            text: result.text,
        });
        addr = (addr + result.size) & 0xffff;
    }
    return entries;
}
/**
 * 获取状态寄存器 flags 字符串 (参照 FCEUX ConsoleDebugger ppuCtrlRegDpy)
 * 格式: N-V-U-B-D-I-Z-C
 */
function flagsToString(p) {
    const n = (p & 0x80) ? 'N' : 'n';
    const v = (p & 0x40) ? 'V' : 'v';
    const u = (p & 0x20) ? 'U' : 'u'; // unused, always 1
    const b = (p & 0x10) ? 'B' : 'b';
    const d = (p & 0x08) ? 'D' : 'd';
    const i = (p & 0x04) ? 'I' : 'i';
    const z = (p & 0x02) ? 'Z' : 'z';
    const c = (p & 0x01) ? 'C' : 'c';
    return `${n}${v}${u}${b}${d}${i}${z}${c}`;
}
