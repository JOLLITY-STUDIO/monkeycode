/**
 * disasm_rom.mjs — 天使之翼 NES ROM 反汇编工具
 *
 * 读取 .nes ROM 文件，解析 iNES 头，按 PRG bank 逐条反汇编 6502 指令。
 * 输出 .asm 文件，供阅读分析。
 *
 * 用法: node tools/disasm_rom.mjs [rom路径]
 * 默认: src/legacy/romdata/Captain Tsubasa (Japan).nes
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

// ─── 命令行参数 ────────────────────────────────────────────
const args = process.argv.slice(2);
const ROM_PATH = args[0] || resolve(PROJECT_ROOT, 'src/legacy/romdata/Captain Tsubasa (Japan).nes');
const OUT_DIR = resolve(PROJECT_ROOT, '_tmp_disasm_out');

// ─── 6502 操作码表 ─────────────────────────────────────────
// 每条记录: [指令名, 长度, 寻址模式]
// 寻址模式: 0=implied, 1=imm, 2=zp, 3=zpx, 4=zpy, 5=abs, 6=absx, 7=absy,
//           8=indirect, 9=pre_idx_ind, 10=post_idx_ind, 11=rel, 12=acc, 13=ind_abs
const OPCODES = {
  0x00: ['BRK', 1, 0], 0x01: ['ORA', 2, 9], 0x02: ['???', 1, 0], 0x03: ['SLO', 2, 9],
  0x04: ['NOP', 2, 2], 0x05: ['ORA', 2, 2], 0x06: ['ASL', 2, 2], 0x07: ['SLO', 2, 2],
  0x08: ['PHP', 1, 0], 0x09: ['ORA', 2, 1], 0x0A: ['ASL', 1, 12], 0x0B: ['ANC', 2, 1],
  0x0C: ['NOP', 3, 5], 0x0D: ['ORA', 3, 5], 0x0E: ['ASL', 3, 5], 0x0F: ['SLO', 3, 5],
  0x10: ['BPL', 2, 11], 0x11: ['ORA', 2, 10], 0x12: ['???', 1, 0], 0x13: ['SLO', 2, 10],
  0x14: ['NOP', 2, 3], 0x15: ['ORA', 2, 3], 0x16: ['ASL', 2, 3], 0x17: ['SLO', 2, 3],
  0x18: ['CLC', 1, 0], 0x19: ['ORA', 3, 7], 0x1A: ['NOP', 1, 0], 0x1B: ['SLO', 3, 7],
  0x1C: ['NOP', 3, 6], 0x1D: ['ORA', 3, 6], 0x1E: ['ASL', 3, 6], 0x1F: ['SLO', 3, 6],
  0x20: ['JSR', 3, 5], 0x21: ['AND', 2, 9], 0x22: ['???', 1, 0], 0x23: ['RLA', 2, 9],
  0x24: ['BIT', 2, 2], 0x25: ['AND', 2, 2], 0x26: ['ROL', 2, 2], 0x27: ['RLA', 2, 2],
  0x28: ['PLP', 1, 0], 0x29: ['AND', 2, 1], 0x2A: ['ROL', 1, 12], 0x2B: ['ANC', 2, 1],
  0x2C: ['BIT', 3, 5], 0x2D: ['AND', 3, 5], 0x2E: ['ROL', 3, 5], 0x2F: ['RLA', 3, 5],
  0x30: ['BMI', 2, 11], 0x31: ['AND', 2, 10], 0x32: ['???', 1, 0], 0x33: ['RLA', 2, 10],
  0x34: ['NOP', 2, 3], 0x35: ['AND', 2, 3], 0x36: ['ROL', 2, 3], 0x37: ['RLA', 2, 3],
  0x38: ['SEC', 1, 0], 0x39: ['AND', 3, 7], 0x3A: ['NOP', 1, 0], 0x3B: ['RLA', 3, 7],
  0x3C: ['NOP', 3, 6], 0x3D: ['AND', 3, 6], 0x3E: ['ROL', 3, 6], 0x3F: ['RLA', 3, 6],
  0x40: ['RTI', 1, 0], 0x41: ['EOR', 2, 9], 0x42: ['???', 1, 0], 0x43: ['SRE', 2, 9],
  0x44: ['NOP', 2, 2], 0x45: ['EOR', 2, 2], 0x46: ['LSR', 2, 2], 0x47: ['SRE', 2, 2],
  0x48: ['PHA', 1, 0], 0x49: ['EOR', 2, 1], 0x4A: ['LSR', 1, 12], 0x4B: ['ALR', 2, 1],
  0x4C: ['JMP', 3, 5], 0x4D: ['EOR', 3, 5], 0x4E: ['LSR', 3, 5], 0x4F: ['SRE', 3, 5],
  0x50: ['BVC', 2, 11], 0x51: ['EOR', 2, 10], 0x52: ['???', 1, 0], 0x53: ['SRE', 2, 10],
  0x54: ['NOP', 2, 3], 0x55: ['EOR', 2, 3], 0x56: ['LSR', 2, 3], 0x57: ['SRE', 2, 3],
  0x58: ['CLI', 1, 0], 0x59: ['EOR', 3, 7], 0x5A: ['NOP', 1, 0], 0x5B: ['SRE', 3, 7],
  0x5C: ['NOP', 3, 6], 0x5D: ['EOR', 3, 6], 0x5E: ['LSR', 3, 6], 0x5F: ['SRE', 3, 6],
  0x60: ['RTS', 1, 0], 0x61: ['ADC', 2, 9], 0x62: ['???', 1, 0], 0x63: ['RRA', 2, 9],
  0x64: ['NOP', 2, 2], 0x65: ['ADC', 2, 2], 0x66: ['ROR', 2, 2], 0x67: ['RRA', 2, 2],
  0x68: ['PLA', 1, 0], 0x69: ['ADC', 2, 1], 0x6A: ['ROR', 1, 12], 0x6B: ['ARR', 2, 1],
  0x6C: ['JMP', 3, 13], 0x6D: ['ADC', 3, 5], 0x6E: ['ROR', 3, 5], 0x6F: ['RRA', 3, 5],
  0x70: ['BVS', 2, 11], 0x71: ['ADC', 2, 10], 0x72: ['???', 1, 0], 0x73: ['RRA', 2, 10],
  0x74: ['NOP', 2, 3], 0x75: ['ADC', 2, 3], 0x76: ['ROR', 2, 3], 0x77: ['RRA', 2, 3],
  0x78: ['SEI', 1, 0], 0x79: ['ADC', 3, 7], 0x7A: ['NOP', 1, 0], 0x7B: ['RRA', 3, 7],
  0x7C: ['NOP', 3, 6], 0x7D: ['ADC', 3, 6], 0x7E: ['ROR', 3, 6], 0x7F: ['RRA', 3, 6],
  0x80: ['NOP', 2, 1], 0x81: ['STA', 2, 9], 0x82: ['NOP', 2, 1], 0x83: ['SAX', 2, 9],
  0x84: ['STY', 2, 2], 0x85: ['STA', 2, 2], 0x86: ['STX', 2, 2], 0x87: ['SAX', 2, 2],
  0x88: ['DEY', 1, 0], 0x89: ['NOP', 2, 1], 0x8A: ['TXA', 1, 0], 0x8B: ['XAA', 2, 1],
  0x8C: ['STY', 3, 5], 0x8D: ['STA', 3, 5], 0x8E: ['STX', 3, 5], 0x8F: ['SAX', 3, 5],
  0x90: ['BCC', 2, 11], 0x91: ['STA', 2, 10], 0x92: ['???', 1, 0], 0x93: ['???', 2, 10],
  0x94: ['STY', 2, 3], 0x95: ['STA', 2, 3], 0x96: ['STX', 2, 4], 0x97: ['SAX', 2, 4],
  0x98: ['TYA', 1, 0], 0x99: ['STA', 3, 7], 0x9A: ['TXS', 1, 0], 0x9B: ['TAS', 3, 7],
  0x9C: ['SHY', 3, 6], 0x9D: ['STA', 3, 6], 0x9E: ['SHX', 3, 7], 0x9F: ['???', 3, 7],
  0xA0: ['LDY', 2, 1], 0xA1: ['LDA', 2, 9], 0xA2: ['LDX', 2, 1], 0xA3: ['LAX', 2, 9],
  0xA4: ['LDY', 2, 2], 0xA5: ['LDA', 2, 2], 0xA6: ['LDX', 2, 2], 0xA7: ['LAX', 2, 2],
  0xA8: ['TAY', 1, 0], 0xA9: ['LDA', 2, 1], 0xAA: ['TAX', 1, 0], 0xAB: ['ATX', 2, 1],
  0xAC: ['LDY', 3, 5], 0xAD: ['LDA', 3, 5], 0xAE: ['LDX', 3, 5], 0xAF: ['LAX', 3, 5],
  0xB0: ['BCS', 2, 11], 0xB1: ['LDA', 2, 10], 0xB2: ['???', 1, 0], 0xB3: ['LAX', 2, 10],
  0xB4: ['LDY', 2, 3], 0xB5: ['LDA', 2, 3], 0xB6: ['LDX', 2, 4], 0xB7: ['LAX', 2, 4],
  0xB8: ['CLV', 1, 0], 0xB9: ['LDA', 3, 7], 0xBA: ['TSX', 1, 0], 0xBB: ['LAS', 3, 7],
  0xBC: ['LDY', 3, 6], 0xBD: ['LDA', 3, 6], 0xBE: ['LDX', 3, 7], 0xBF: ['LAX', 3, 7],
  0xC0: ['CPY', 2, 1], 0xC1: ['CMP', 2, 9], 0xC2: ['NOP', 2, 1], 0xC3: ['DCP', 2, 9],
  0xC4: ['CPY', 2, 2], 0xC5: ['CMP', 2, 2], 0xC6: ['DEC', 2, 2], 0xC7: ['DCP', 2, 2],
  0xC8: ['INY', 1, 0], 0xC9: ['CMP', 2, 1], 0xCA: ['DEX', 1, 0], 0xCB: ['AXS', 2, 1],
  0xCC: ['CPY', 3, 5], 0xCD: ['CMP', 3, 5], 0xCE: ['DEC', 3, 5], 0xCF: ['DCP', 3, 5],
  0xD0: ['BNE', 2, 11], 0xD1: ['CMP', 2, 10], 0xD2: ['???', 1, 0], 0xD3: ['DCP', 2, 10],
  0xD4: ['NOP', 2, 3], 0xD5: ['CMP', 2, 3], 0xD6: ['DEC', 2, 3], 0xD7: ['DCP', 2, 3],
  0xD8: ['CLD', 1, 0], 0xD9: ['CMP', 3, 7], 0xDA: ['NOP', 1, 0], 0xDB: ['DCP', 3, 7],
  0xDC: ['NOP', 3, 6], 0xDD: ['CMP', 3, 6], 0xDE: ['DEC', 3, 6], 0xDF: ['DCP', 3, 6],
  0xE0: ['CPX', 2, 1], 0xE1: ['SBC', 2, 9], 0xE2: ['NOP', 2, 1], 0xE3: ['ISB', 2, 9],
  0xE4: ['CPX', 2, 2], 0xE5: ['SBC', 2, 2], 0xE6: ['INC', 2, 2], 0xE7: ['ISB', 2, 2],
  0xE8: ['INX', 1, 0], 0xE9: ['SBC', 2, 1], 0xEA: ['NOP', 1, 0], 0xEB: ['SBC', 2, 1],
  0xEC: ['CPX', 3, 5], 0xED: ['SBC', 3, 5], 0xEE: ['INC', 3, 5], 0xEF: ['ISB', 3, 5],
  0xF0: ['BEQ', 2, 11], 0xF1: ['SBC', 2, 10], 0xF2: ['???', 1, 0], 0xF3: ['ISB', 2, 10],
  0xF4: ['NOP', 2, 3], 0xF5: ['SBC', 2, 3], 0xF6: ['INC', 2, 3], 0xF7: ['ISB', 2, 3],
  0xF8: ['SED', 1, 0], 0xF9: ['SBC', 3, 7], 0xFA: ['NOP', 1, 0], 0xFB: ['ISB', 3, 7],
  0xFC: ['NOP', 3, 6], 0xFD: ['SBC', 3, 6], 0xFE: ['INC', 3, 6], 0xFF: ['ISB', 3, 6],
};

// ─── ROM 读取 ──────────────────────────────────────────────
function loadRom(filePath) {
  const buf = readFileSync(filePath);
  if (buf[0] !== 0x4E || buf[1] !== 0x45 || buf[2] !== 0x53 || buf[3] !== 0x1A) {
    throw new Error('不是有效的 NES ROM 文件');
  }

  const prgPages = buf[4];       // 16KB PRG-ROM pages
  const chrPages = buf[5];       // 8KB CHR-ROM pages
  const mapperLo = (buf[6] >> 4) & 0x0F;
  const mapperHi = buf[7] & 0xF0;
  const mapper = mapperHi | mapperLo;
  const fourScreen = (buf[6] & 0x08) !== 0;
  const batteryRam = (buf[6] & 0x02) !== 0;
  const trainer = (buf[6] & 0x04) !== 0;
  const mirroring = (buf[6] & 0x01) ? 'Vertical' : 'Horizontal';

  const prgSize = prgPages * 16384;
  const chrSize = chrPages * 8192;
  let offset = 16 + (trainer ? 512 : 0);

  // 读取 PRG ROM 并切成 16KB banks
  const prgRom = new Uint8Array(prgSize);
  for (let i = 0; i < prgSize && offset + i < buf.length; i++) {
    prgRom[i] = buf[offset + i];
  }
  offset += prgSize;

  // 读取 CHR ROM 并切成 8KB banks
  const chrRom = new Uint8Array(chrSize);
  for (let i = 0; i < chrSize && offset + i < buf.length; i++) {
    chrRom[i] = buf[offset + i];
  }

  const prgBanks = []; // 每个 16KB
  for (let i = 0; i < prgPages; i++) {
    prgBanks.push(prgRom.slice(i * 16384, (i + 1) * 16384));
  }

  const chrBanks = []; // 每个 8KB
  for (let i = 0; i < chrPages; i++) {
    chrBanks.push(chrRom.slice(i * 8192, (i + 1) * 8192));
  }

  // 提取中断向量 (最后 6 字节)
  const lastBank = prgBanks[prgPages - 1];
  const vectors = {
    nmi: lastBank[lastBank.length - 6] | (lastBank[lastBank.length - 5] << 8),
    reset: lastBank[lastBank.length - 4] | (lastBank[lastBank.length - 3] << 8),
    irq: lastBank[lastBank.length - 2] | (lastBank[lastBank.length - 1] << 8),
  };

  return { prgPages, chrPages, mapper, fourScreen, batteryRam, mirroring,
           prgSize, chrSize, prgBanks, chrBanks, vectors };
}

// ─── 6502 反汇编 ───────────────────────────────────────────
function disassemble(bankData, offset, cpuAddr) {
  const opcode = bankData[offset];
  const info = OPCODES[opcode];
  if (!info) {
    return { text: `.byte $${opcode.toString(16).padStart(2, '0')}`, size: 1 };
  }

  const [ins, len, mode] = info;
  const bytes = [opcode];
  for (let i = 1; i < len && offset + i < bankData.length; i++) {
    bytes.push(bankData[offset + i]);
  }

  let operand = '';

  // mode 0: implied — no operand
  // mode 1: immediate — #$XX
  // mode 2: zero page — $XX
  // mode 3: zero page,X — $XX,X
  // mode 4: zero page,Y — $XX,Y
  // mode 5: absolute — $XXXX
  // mode 6: absolute,X — $XXXX,X
  // mode 7: absolute,Y — $XXXX,Y
  // mode 8: indirect — not used for operands
  // mode 9: (indirect,X) — ($XX,X)
  // mode 10: (indirect),Y — ($XX),Y
  // mode 11: relative — branch target address
  // mode 12: accumulator — A
  // mode 13: indirect absolute — ($XXXX)

  switch (mode) {
    case 0: // implied
      break;
    case 1: // #immediate
      operand = `#$${bytes[1].toString(16).padStart(2, '0')}`;
      break;
    case 2: // $zp
      operand = `$${bytes[1].toString(16).padStart(2, '0')}`;
      break;
    case 3: // $zp,X
      operand = `$${bytes[1].toString(16).padStart(2, '0')},X`;
      break;
    case 4: // $zp,Y
      operand = `$${bytes[1].toString(16).padStart(2, '0')},Y`;
      break;
    case 5: { // $abs
      const addr = bytes[1] | (bytes[2] << 8);
      operand = `$${addr.toString(16).padStart(4, '0')}`;
      break;
    }
    case 6: { // $abs,X
      const addr = bytes[1] | (bytes[2] << 8);
      operand = `$${addr.toString(16).padStart(4, '0')},X`;
      break;
    }
    case 7: { // $abs,Y
      const addr = bytes[1] | (bytes[2] << 8);
      operand = `$${addr.toString(16).padStart(4, '0')},Y`;
      break;
    }
    case 9: // ($zp,X)
      operand = `($${bytes[1].toString(16).padStart(2, '0')},X)`;
      break;
    case 10: // ($zp),Y
      operand = `($${bytes[1].toString(16).padStart(2, '0')}),Y`;
      break;
    case 11: { // branch relative
      const offset_val = bytes[1] < 128 ? bytes[1] : bytes[1] - 256;
      const target = (cpuAddr + len + offset_val) & 0xFFFF;
      operand = `$${target.toString(16).padStart(4, '0')}`;
      break;
    }
    case 12: // A
      operand = 'A';
      break;
    case 13: { // ($abs)
      const addr = bytes[1] | (bytes[2] << 8);
      operand = `($${addr.toString(16).padStart(4, '0')})`;
      break;
    }
    case 8: // indirect (unused in this table)
    default:
      operand = `???`;
      break;
  }

  const insName = ins;
  return {
    text: operand ? `${insName} ${operand}` : insName,
    size: len,
  };
}

// ─── 输出格式 ──────────────────────────────────────────────
function formatByte(b) {
  return b.toString(16).padStart(2, '0').toUpperCase();
}

function formatLine(addr, result) {
  const hexAddr = addr.toString(16).padStart(4, '0').toUpperCase();
  const opcodeHex = result.bytes.map(formatByte).join(' ');
  return `  $${hexAddr}: ${opcodeHex.padEnd(8)}  ${result.text}`;
}

// ─── Bank 反汇编输出 ───────────────────────────────────────
function disassembleBank(bankData, bankIndex, startCpuAddr) {
  const lines = [];
  let offset = 0;
  let cpuAddr = startCpuAddr;

  lines.push(`; ============================================================`);
  lines.push(`; PRG Bank $${bankIndex.toString(16).padStart(2, '0').toUpperCase()}`);
  lines.push(`; CPU Address Range: $${startCpuAddr.toString(16).padStart(4, '0').toUpperCase()} - $${(startCpuAddr + 0x3FFF).toString(16).padStart(4, '0').toUpperCase()}`);
  lines.push(`; ROM Offset: $${(bankIndex * 0x4000).toString(16).toUpperCase()}`);
  lines.push(`; ============================================================`);
  lines.push('');

  while (offset < bankData.length) {
    const result = disassemble(bankData, offset, cpuAddr);
    // 确保 result 有 bytes 属性
    if (!result.bytes) {
      const bytes = [];
      for (let i = 0; i < result.size && offset + i < bankData.length; i++) {
        bytes.push(bankData[offset + i]);
      }
      result.bytes = bytes;
    }
    lines.push(formatLine(cpuAddr, result));
    cpuAddr += result.size;
    offset += result.size;
  }

  return lines.join('\n');
}

// ─── 主流程 ────────────────────────────────────────────────
function main() {
  console.log(`读取 ROM: ${ROM_PATH}`);
  const rom = loadRom(ROM_PATH);

  console.log(`PRG: ${rom.prgPages} × 16KB = ${(rom.prgSize / 1024).toFixed(0)}KB`);
  console.log(`CHR: ${rom.chrPages} × 8KB = ${(rom.chrSize / 1024).toFixed(0)}KB`);
  console.log(`Mapper: ${rom.mapper}${rom.mapper === 1 ? ' (MMC1)' : ''}`);
  console.log(`Mirroring: ${rom.mirroring}`);

  const mapperNames = { 0: 'NROM', 1: 'MMC1', 2: 'UNROM', 3: 'CNROM', 4: 'MMC3', 5: 'MMC5', 7: 'AOROM' };
  const mapperName = mapperNames[rom.mapper] || `Unknown(${rom.mapper})`;

  // 对于 MMC1（Mapper 1），PRG 切换是 16KB bank
  // CPU 地址空间:
  //   $8000-$BFFF: 可切换 16KB bank
  //   $C000-$FFFF: 固定为最后一个 16KB bank (或可切换，取决于模式)

  // 确保输出目录存在
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  // 输出 ROM 信息文件
  let infoText = `; ──────────────────────────────────────────────────
; 天使之翼 (Captain Tsubasa) NES ROM 反汇编
; ──────────────────────────────────────────────────
; PRG-ROM: ${rom.prgSize / 1024}KB (${rom.prgPages} × 16KB banks)
; CHR-ROM: ${rom.chrSize / 1024}KB (${rom.chrPages} × 8KB banks)
; Mapper: ${rom.mapper} (${mapperName})
; Mirroring: ${rom.mirroring}
; Four-screen: ${rom.fourScreen ? 'Yes' : 'No'}
; Battery RAM: ${rom.batteryRam ? 'Yes' : 'No'}
;
; 中断向量:
;   RESET: $${rom.vectors.reset.toString(16).padStart(4, '0').toUpperCase()}
;   NMI:   $${rom.vectors.nmi.toString(16).padStart(4, '0').toUpperCase()}
;   IRQ:   $${rom.vectors.irq.toString(16).padStart(4, '0').toUpperCase()}
;
; 反汇编使用线性扫描（非递归下降），不区分 code/data。
; 所有字节按 6502 操作码解析，数据区域会产生无意义的指令。
; ──────────────────────────────────────────────────
;
`;

  // 反汇编每个 bank
  const allOutputs = [infoText];

  for (let i = 0; i < rom.prgPages; i++) {
    const bankData = rom.prgBanks[i];
    // MMC1 固定 bank 模式下:
    // Bank 0-6 → 映射到 $8000-$BFFF (可切换)
    // Bank 7   → 映射到 $C000-$FFFF (通常固定)
    // 简化处理：每个 bank 标注为 $8000 起始
    const cpuAddr = 0x8000 + (i < rom.prgPages - 1 ? 0 : 0); // 最后一个 bank 通常是 $C000 固定
    const startAddr = (i === rom.prgPages - 1 && rom.mapper === 1) ? 0xC000 : 0x8000;
    const bankText = disassembleBank(bankData, i, startAddr);
    allOutputs.push(bankText);
    allOutputs.push('');
    console.log(`  Bank $${i.toString(16).padStart(2, '0')}: ${bankText.split('\n').length - 9} 行`);
  }

  // 输出 CHR bank 信息
  allOutputs.push('; ============================================================');
  allOutputs.push('; CHR Banks (Pattern Table Data, not disassembled)');
  allOutputs.push('; ============================================================');
  for (let i = 0; i < rom.chrPages; i++) {
    const chrData = rom.chrBanks[i];
    // 检查是否全零
    const isZero = chrData.every(b => b === 0);
    const nonZero = chrData.filter(b => b !== 0).length;
    allOutputs.push(`; CHR Bank $${i.toString(16).padStart(2, '0').toUpperCase()}: ${chrData.length}B, non-zero bytes: ${nonZero}${isZero ? ' (ALL ZERO)' : ''}`);
  }

  // 写入文件
  const outPath = OUT_DIR + '/tsubasa_disasm.asm';
  writeFileSync(outPath, allOutputs.join('\n'), 'utf-8');
  console.log(`\n输出: ${outPath}`);
  console.log(`大小: ${(allOutputs.join('\n').length / 1024).toFixed(0)}KB`);
}

main();
