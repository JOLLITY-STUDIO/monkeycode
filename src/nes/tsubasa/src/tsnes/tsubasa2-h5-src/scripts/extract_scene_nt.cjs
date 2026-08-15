/**
 * 场景 NT 数据提取器 v2 — 模拟 $8AF7 场景加载函数
 *
 * 修正:
 *   - Bank 00 映射在 $8000-$9FFF (代码区)
 *   - Bank 07 映射在 $A000-$BFFF (场景数据)
 *   - Bank 30 映射在 $C000-$DFFF ($C4B9 MMC3 切换)
 *   - Bank 31 映射在 $E000-$FFFF
 *   - $8000/$8001 写入作为 MMC3 寄存器处理
 *   - $2006/$2007 写入作为 PPU 处理
 *
 * 用法: node scripts/extract_scene_nt.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');

// ── 加载所有 32 个 ROM bank ──
const BANKS = [];
for (let i = 0; i < 32; i++) {
  const id = i.toString().padStart(2, '0');
  const p = path.resolve(__dirname, `../../rom-data/prg-bank-${id}.ts`);
  const src = fs.readFileSync(p, 'utf-8');
  const m = src.match(/const PRG_BANK_\d+[\s\S]*?=\s*\[([\s\S]*?)\]/);
  if (!m) throw new Error(`无法解析 bank ${id}`);
  BANKS[i] = m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-Fa-f]+$/.test(s)).map(s => parseInt(s, 16));
}
console.log(`已加载 ${BANKS.length} 个 bank, 每个 ${BANKS[0].length} 字节`);

// ── MMC3 状态 ──
const mmc3 = {
  prgMode: 0,      // bit 6 of $8000
  chrInvert: 0,    // bit 7 of $8000
  regSelect: 0,    // bits 0-2 of $8000
  regs: new Array(8).fill(0), // $8001 values for registers 0-7
  // 当前 bank 映射
  bank8000: 0,     // $8000-$9FFF 映射的 bank
  bankA000: 7,     // $A000-$BFFF 映射的 bank (初始 = 7, 由 reset 设置)
};

function updateMmc3Mapping() {
  // MMC3 PRG bank mode (bit 6):
  //   0: $8000-$9FFF = reg[6], $C000-$DFFF = fixed (second-to-last)
  //   1: $C000-$DFFF = reg[6], $8000-$9FFF = fixed (second-to-last)
  const lastBank = 30;  // 32 banks, second-to-last = 30
  if (mmc3.prgMode === 0) {
    mmc3.bank8000 = mmc3.regs[6];
    // bankA000 不受 prgMode 影响, 由 reg[7] 控制
    mmc3.bankA000 = mmc3.regs[7];
  } else {
    mmc3.bank8000 = lastBank;
    mmc3.bankA000 = mmc3.regs[7];
  }
}

// ── 内存映射 ──
const RAM = new Uint8Array(0x800);
let ppuAddr = 0;
let ppuAddrHigh = false;
const ppuVram = new Uint8Array(0x4000);

function getBankData(bankId) {
  return BANKS[bankId] || null;
}

function readByte(addr) {
  addr &= 0xFFFF;
  if (addr < 0x2000) return RAM[addr & 0x7FF];
  if (addr === 0x2002) return 0x80; // PPUSTATUS (vblank)
  if (addr >= 0x8000 && addr <= 0x9FFF) {
    const bank = getBankData(mmc3.bank8000);
    return bank ? bank[addr - 0x8000] || 0 : 0;
  }
  if (addr >= 0xA000 && addr <= 0xBFFF) {
    const bank = getBankData(mmc3.bankA000);
    return bank ? bank[addr - 0xA000] || 0 : 0;
  }
  if (addr >= 0xC000 && addr <= 0xDFFF) {
    // 固定映射到倒数第二个 bank (30)
    return BANKS[30][addr - 0xC000] || 0;
  }
  if (addr >= 0xE000 && addr <= 0xFFFF) {
    // 固定映射到最后一个 bank (31)
    return BANKS[31][addr - 0xE000] || 0;
  }
  return 0;
}

function writeByte(addr, val) {
  addr &= 0xFFFF;
  val &= 0xFF;
  if (addr < 0x2000) { RAM[addr & 0x7FF] = val; return; }
  if (addr === 0x2000) return; // PPUCTRL
  if (addr === 0x2001) return; // PPUMASK
  if (addr === 0x2006) {
    if (!ppuAddrHigh) {
      ppuAddr = (ppuAddr & 0x00FF) | (val << 8);
      ppuAddrHigh = true;
    } else {
      ppuAddr = (ppuAddr & 0xFF00) | val;
      ppuAddrHigh = false;
    }
    return;
  }
  if (addr === 0x2007) {
    ppuVram[ppuAddr & 0x3FFF] = val;
    ppuAddr = (ppuAddr + 1) & 0xFFFF; // increment by 1 (PPUCTRL bit 2 = 0)
    return;
  }
  // MMC3 寄存器
  if (addr === 0x8000) {
    mmc3.regSelect = val & 0x07;
    mmc3.prgMode = (val >> 6) & 1;
    mmc3.chrInvert = (val >> 7) & 1;
    return;
  }
  if (addr === 0x8001) {
    mmc3.regs[mmc3.regSelect] = val;
    updateMmc3Mapping();
    return;
  }
}

// ── 6502 CPU ──
class Cpu6502 {
  constructor() {
    this.A = 0; this.X = 0; this.Y = 0;
    this.S = 0xFD; this.P = 0x24;
    this.PC = 0; this.cycles = 0;
    this.maxCycles = 2000000;
    this.halted = false;
    this.callDepth = 0;
    this.maxCallDepth = 100;
    this.traceLog = [];
    this.traceEnabled = false;
  }
  get C() { return this.P & 1; }
  set C(v) { this.P = (this.P & ~1) | (v ? 1 : 0); }
  get Z() { return (this.P >> 1) & 1; }
  set Z(v) { this.P = (this.P & ~2) | (v ? 2 : 0); }
  get V() { return (this.P >> 6) & 1; }
  set V(v) { this.P = (this.P & ~0x40) | (v ? 0x40 : 0); }
  get N() { return (this.P >> 7) & 1; }
  set N(v) { this.P = (this.P & ~0x80) | (v ? 0x80 : 0); }
  setNZ(v) { v &= 0xFF; this.Z = v === 0 ? 1 : 0; this.N = (v & 0x80) ? 1 : 0; }
  push(v) { writeByte(0x100 + this.S, v); this.S = (this.S - 1) & 0xFF; }
  pop() { this.S = (this.S + 1) & 0xFF; return readByte(0x100 + this.S); }
  read16(a) { return (readByte((a + 1) & 0xFFFF) << 8) | readByte(a); }
  read16Zp(zp) { return (readByte((zp + 1) & 0xFF) << 8) | readByte(zp & 0xFF); }

  step() {
    if (this.halted || this.cycles > this.maxCycles) { this.halted = true; return 0; }
    const op = readByte(this.PC);
    const oldPC = this.PC;
    this.PC = (this.PC + 1) & 0xFFFF;
    let cyc = 1;
    const imm = () => { const v = readByte(this.PC); this.PC = (this.PC + 1) & 0xFFFF; return v; };
    const zp = () => { const v = readByte(this.PC); this.PC = (this.PC + 1) & 0xFFFF; return v; };
    const zpIdx = (r) => { const a = (readByte(this.PC) + r) & 0xFF; this.PC = (this.PC + 1) & 0xFFFF; return a; };
    const abs = () => { const a = this.read16(this.PC); this.PC = (this.PC + 2) & 0xFFFF; return a; };
    const absIdx = (r) => { const b = this.read16(this.PC); this.PC = (this.PC + 2) & 0xFFFF; const a = (b + r) & 0xFFFF; if ((b & 0xFF00) !== (a & 0xFF00)) cyc++; return a; };
    const ind = () => { const p = this.read16(this.PC); this.PC = (this.PC + 2) & 0xFFFF; const lo = readByte(p); const hi = readByte((p & 0xFF00) | ((p + 1) & 0xFF)); return (hi << 8) | lo; };
    const indY = () => { const p = readByte(this.PC); this.PC = (this.PC + 1) & 0xFFFF; const b = this.read16Zp(p); const a = (b + this.Y) & 0xFFFF; if ((b & 0xFF00) !== (a & 0xFF00)) cyc++; return a; };
    const indX = () => { const p = (readByte(this.PC) + this.X) & 0xFF; this.PC = (this.PC + 1) & 0xFFFF; return this.read16Zp(p); };
    const adc = (v) => { const s = this.A + v + this.C; this.V = (~(this.A ^ v) & (this.A ^ s) & 0x80) ? 1 : 0; this.C = s > 0xFF ? 1 : 0; this.A = s & 0xFF; this.setNZ(this.A); };
    const sbc = (v) => { const d = this.A - v - (1 - this.C); this.V = ((this.A ^ v) & (this.A ^ d) & 0x80) ? 1 : 0; this.C = d >= 0 ? 1 : 0; this.A = d & 0xFF; this.setNZ(this.A); };
    const cmp = (r, v) => { const d = r - v; this.C = r >= v ? 1 : 0; this.setNZ(d & 0xFF); };
    const branch = (c) => { const o = imm(); if (c) { const t = (this.PC + (o > 0x7F ? o - 0x100 : o)) & 0xFFFF; if ((this.PC & 0xFF00) !== (t & 0xFF00)) cyc++; this.PC = t; cyc++; } };

    if (this.traceEnabled) {
      this.traceLog.push(`$${oldPC.toString(16).padStart(4,'0')}: op=$${op.toString(16).padStart(2,'0')} A=$${this.A.toString(16).padStart(2,'0')} X=$${this.X.toString(16).padStart(2,'0')} Y=$${this.Y.toString(16).padStart(2,'0')} S=$${this.S.toString(16).padStart(2,'0')} d=${this.callDepth}`);
      if (this.traceLog.length > 5000) this.traceLog.shift();
    }

    switch (op) {
    case 0xA9: this.A = imm(); this.setNZ(this.A); break;
    case 0xA5: this.A = readByte(zp()); this.setNZ(this.A); break;
    case 0xB5: this.A = readByte(zpIdx(this.X)); this.setNZ(this.A); break;
    case 0xAD: this.A = readByte(abs()); this.setNZ(this.A); break;
    case 0xBD: this.A = readByte(absIdx(this.X)); this.setNZ(this.A); break;
    case 0xB9: this.A = readByte(absIdx(this.Y)); this.setNZ(this.A); break;
    case 0xA1: this.A = readByte(indX()); this.setNZ(this.A); break;
    case 0xB1: this.A = readByte(indY()); this.setNZ(this.A); break;
    case 0xA2: this.X = imm(); this.setNZ(this.X); break;
    case 0xA6: this.X = readByte(zp()); this.setNZ(this.X); break;
    case 0xB6: this.X = readByte(zpIdx(this.Y)); this.setNZ(this.X); break;
    case 0xAE: this.X = readByte(abs()); this.setNZ(this.X); break;
    case 0xBE: this.X = readByte(absIdx(this.Y)); this.setNZ(this.X); break;
    case 0xA0: this.Y = imm(); this.setNZ(this.Y); break;
    case 0xA4: this.Y = readByte(zp()); this.setNZ(this.Y); break;
    case 0xB4: this.Y = readByte(zpIdx(this.X)); this.setNZ(this.Y); break;
    case 0xAC: this.Y = readByte(abs()); this.setNZ(this.Y); break;
    case 0xBC: this.Y = readByte(absIdx(this.X)); this.setNZ(this.Y); break;
    case 0x85: writeByte(zp(), this.A); break;
    case 0x95: writeByte(zpIdx(this.X), this.A); break;
    case 0x8D: writeByte(abs(), this.A); break;
    case 0x9D: writeByte(absIdx(this.X), this.A); break;
    case 0x99: writeByte(absIdx(this.Y), this.A); break;
    case 0x81: writeByte(indX(), this.A); break;
    case 0x91: writeByte(indY(), this.A); break;
    case 0x86: writeByte(zp(), this.X); break;
    case 0x96: writeByte(zpIdx(this.Y), this.X); break;
    case 0x8E: writeByte(abs(), this.X); break;
    case 0x84: writeByte(zp(), this.Y); break;
    case 0x94: writeByte(zpIdx(this.X), this.Y); break;
    case 0x8C: writeByte(abs(), this.Y); break;
    case 0xAA: this.X = this.A; this.setNZ(this.X); break;
    case 0xA8: this.Y = this.A; this.setNZ(this.Y); break;
    case 0x8A: this.A = this.X; this.setNZ(this.A); break;
    case 0x98: this.A = this.Y; this.setNZ(this.A); break;
    case 0xBA: this.X = this.S; this.setNZ(this.X); break;
    case 0x9A: this.S = this.X; break;
    case 0xE6: { const a = zp(); const v = (readByte(a) + 1) & 0xFF; writeByte(a, v); this.setNZ(v); break; }
    case 0xF6: { const a = zpIdx(this.X); const v = (readByte(a) + 1) & 0xFF; writeByte(a, v); this.setNZ(v); break; }
    case 0xEE: { const a = abs(); const v = (readByte(a) + 1) & 0xFF; writeByte(a, v); this.setNZ(v); break; }
    case 0xFE: { const a = absIdx(this.X); const v = (readByte(a) + 1) & 0xFF; writeByte(a, v); this.setNZ(v); break; }
    case 0xC6: { const a = zp(); const v = (readByte(a) - 1) & 0xFF; writeByte(a, v); this.setNZ(v); break; }
    case 0xD6: { const a = zpIdx(this.X); const v = (readByte(a) - 1) & 0xFF; writeByte(a, v); this.setNZ(v); break; }
    case 0xCE: { const a = abs(); const v = (readByte(a) - 1) & 0xFF; writeByte(a, v); this.setNZ(v); break; }
    case 0xDE: { const a = absIdx(this.X); const v = (readByte(a) - 1) & 0xFF; writeByte(a, v); this.setNZ(v); break; }
    case 0xE8: this.X = (this.X + 1) & 0xFF; this.setNZ(this.X); break;
    case 0xC8: this.Y = (this.Y + 1) & 0xFF; this.setNZ(this.Y); break;
    case 0xCA: this.X = (this.X - 1) & 0xFF; this.setNZ(this.X); break;
    case 0x88: this.Y = (this.Y - 1) & 0xFF; this.setNZ(this.Y); break;
    case 0x69: adc(imm()); break;
    case 0x65: adc(readByte(zp())); break;
    case 0x75: adc(readByte(zpIdx(this.X))); break;
    case 0x6D: adc(readByte(abs())); break;
    case 0x7D: adc(readByte(absIdx(this.X))); break;
    case 0x79: adc(readByte(absIdx(this.Y))); break;
    case 0x61: adc(readByte(indX())); break;
    case 0x71: adc(readByte(indY())); break;
    case 0xE9: case 0xEB: sbc(imm()); break;
    case 0xE5: sbc(readByte(zp())); break;
    case 0xF5: sbc(readByte(zpIdx(this.X))); break;
    case 0xED: sbc(readByte(abs())); break;
    case 0xFD: sbc(readByte(absIdx(this.X))); break;
    case 0xF9: sbc(readByte(absIdx(this.Y))); break;
    case 0xE1: sbc(readByte(indX())); break;
    case 0xF1: sbc(readByte(indY())); break;
    case 0x29: this.A &= imm(); this.setNZ(this.A); break;
    case 0x25: this.A &= readByte(zp()); this.setNZ(this.A); break;
    case 0x35: this.A &= readByte(zpIdx(this.X)); this.setNZ(this.A); break;
    case 0x2D: this.A &= readByte(abs()); this.setNZ(this.A); break;
    case 0x3D: this.A &= readByte(absIdx(this.X)); this.setNZ(this.A); break;
    case 0x39: this.A &= readByte(absIdx(this.Y)); this.setNZ(this.A); break;
    case 0x21: this.A &= readByte(indX()); this.setNZ(this.A); break;
    case 0x31: this.A &= readByte(indY()); this.setNZ(this.A); break;
    case 0x09: this.A |= imm(); this.setNZ(this.A); break;
    case 0x05: this.A |= readByte(zp()); this.setNZ(this.A); break;
    case 0x15: this.A |= readByte(zpIdx(this.X)); this.setNZ(this.A); break;
    case 0x0D: this.A |= readByte(abs()); this.setNZ(this.A); break;
    case 0x1D: this.A |= readByte(absIdx(this.X)); this.setNZ(this.A); break;
    case 0x19: this.A |= readByte(absIdx(this.Y)); this.setNZ(this.A); break;
    case 0x01: this.A |= readByte(indX()); this.setNZ(this.A); break;
    case 0x11: this.A |= readByte(indY()); this.setNZ(this.A); break;
    case 0x49: this.A ^= imm(); this.setNZ(this.A); break;
    case 0x45: this.A ^= readByte(zp()); this.setNZ(this.A); break;
    case 0x55: this.A ^= readByte(zpIdx(this.X)); this.setNZ(this.A); break;
    case 0x4D: this.A ^= readByte(abs()); this.setNZ(this.A); break;
    case 0x5D: this.A ^= readByte(absIdx(this.X)); this.setNZ(this.A); break;
    case 0x59: this.A ^= readByte(absIdx(this.Y)); this.setNZ(this.A); break;
    case 0x41: this.A ^= readByte(indX()); this.setNZ(this.A); break;
    case 0x51: this.A ^= readByte(indY()); this.setNZ(this.A); break;
    case 0xC9: cmp(this.A, imm()); break;
    case 0xC5: cmp(this.A, readByte(zp())); break;
    case 0xD5: cmp(this.A, readByte(zpIdx(this.X))); break;
    case 0xCD: cmp(this.A, readByte(abs())); break;
    case 0xDD: cmp(this.A, readByte(absIdx(this.X))); break;
    case 0xD9: cmp(this.A, readByte(absIdx(this.Y))); break;
    case 0xC1: cmp(this.A, readByte(indX())); break;
    case 0xD1: cmp(this.A, readByte(indY())); break;
    case 0xE0: cmp(this.X, imm()); break;
    case 0xE4: cmp(this.X, readByte(zp())); break;
    case 0xEC: cmp(this.X, readByte(abs())); break;
    case 0xC0: cmp(this.Y, imm()); break;
    case 0xC4: cmp(this.Y, readByte(zp())); break;
    case 0xCC: cmp(this.Y, readByte(abs())); break;
    case 0x0A: this.C = (this.A >> 7) & 1; this.A = (this.A << 1) & 0xFF; this.setNZ(this.A); break;
    case 0x06: { const a = zp(); const v = readByte(a); this.C = (v >> 7) & 1; const nv = (v << 1) & 0xFF; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x16: { const a = zpIdx(this.X); const v = readByte(a); this.C = (v >> 7) & 1; const nv = (v << 1) & 0xFF; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x0E: { const a = abs(); const v = readByte(a); this.C = (v >> 7) & 1; const nv = (v << 1) & 0xFF; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x1E: { const a = absIdx(this.X); const v = readByte(a); this.C = (v >> 7) & 1; const nv = (v << 1) & 0xFF; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x4A: this.C = this.A & 1; this.A >>= 1; this.setNZ(this.A); break;
    case 0x46: { const a = zp(); const v = readByte(a); this.C = v & 1; const nv = v >> 1; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x56: { const a = zpIdx(this.X); const v = readByte(a); this.C = v & 1; const nv = v >> 1; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x4E: { const a = abs(); const v = readByte(a); this.C = v & 1; const nv = v >> 1; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x5E: { const a = absIdx(this.X); const v = readByte(a); this.C = v & 1; const nv = v >> 1; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x2A: { const oc = this.C; this.C = (this.A >> 7) & 1; this.A = ((this.A << 1) | oc) & 0xFF; this.setNZ(this.A); break; }
    case 0x26: { const a = zp(); const v = readByte(a); const oc = this.C; this.C = (v >> 7) & 1; const nv = ((v << 1) | oc) & 0xFF; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x36: { const a = zpIdx(this.X); const v = readByte(a); const oc = this.C; this.C = (v >> 7) & 1; const nv = ((v << 1) | oc) & 0xFF; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x2E: { const a = abs(); const v = readByte(a); const oc = this.C; this.C = (v >> 7) & 1; const nv = ((v << 1) | oc) & 0xFF; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x3E: { const a = absIdx(this.X); const v = readByte(a); const oc = this.C; this.C = (v >> 7) & 1; const nv = ((v << 1) | oc) & 0xFF; writeByte(a, nv); this.setNZ(nv); break; }
    case 0x6A: { const oc = this.C; this.C = this.A & 1; this.A = (this.A >> 1) | (oc << 7); this.setNZ(this.A); break; }
    case 0x66: { const a = zp(); const v = readByte(a); const oc = this.C; this.C = v & 1; const nv = (v >> 1) | (oc << 7); writeByte(a, nv); this.setNZ(nv); break; }
    case 0x76: { const a = zpIdx(this.X); const v = readByte(a); const oc = this.C; this.C = v & 1; const nv = (v >> 1) | (oc << 7); writeByte(a, nv); this.setNZ(nv); break; }
    case 0x6E: { const a = abs(); const v = readByte(a); const oc = this.C; this.C = v & 1; const nv = (v >> 1) | (oc << 7); writeByte(a, nv); this.setNZ(nv); break; }
    case 0x7E: { const a = absIdx(this.X); const v = readByte(a); const oc = this.C; this.C = v & 1; const nv = (v >> 1) | (oc << 7); writeByte(a, nv); this.setNZ(nv); break; }
    case 0x24: { const v = readByte(zp()); this.Z = (this.A & v) === 0 ? 1 : 0; this.N = (v >> 7) & 1; this.V = (v >> 6) & 1; break; }
    case 0x2C: { const v = readByte(abs()); this.Z = (this.A & v) === 0 ? 1 : 0; this.N = (v >> 7) & 1; this.V = (v >> 6) & 1; break; }
    case 0x4C: this.PC = abs(); break;
    case 0x6C: this.PC = ind(); break;
    case 0x20: { const t = abs(); const r = (this.PC - 1) & 0xFFFF; this.push((r >> 8) & 0xFF); this.push(r & 0xFF); this.PC = t; this.callDepth++; if (this.callDepth > this.maxCallDepth) { console.error(`Max depth at $${t.toString(16)}`); this.halted = true; } break; }
    case 0x60: { const lo = this.pop(); const hi = this.pop(); this.PC = (((hi << 8) | lo) + 1) & 0xFFFF; this.callDepth = Math.max(0, this.callDepth - 1); break; }
    case 0x40: { this.P = this.pop(); const lo = this.pop(); const hi = this.pop(); this.PC = ((hi << 8) | lo) & 0xFFFF; break; }
    case 0x10: branch(this.N === 0); break;
    case 0x30: branch(this.N === 1); break;
    case 0x50: branch(this.V === 0); break;
    case 0x70: branch(this.V === 1); break;
    case 0x90: branch(this.C === 0); break;
    case 0xB0: branch(this.C === 1); break;
    case 0xD0: branch(this.Z === 0); break;
    case 0xF0: branch(this.Z === 1); break;
    case 0x48: this.push(this.A); break;
    case 0x68: this.A = this.pop(); this.setNZ(this.A); break;
    case 0x08: this.push(this.P); break;
    case 0x28: this.P = this.pop(); break;
    case 0x18: this.C = 0; break;
    case 0x38: this.C = 1; break;
    case 0x58: this.P &= ~0x08; break;
    case 0x78: this.P |= 0x08; break;
    case 0xB8: this.V = 0; break;
    case 0xD8: this.P &= ~0x10; break;
    case 0xF8: this.P |= 0x10; break;
    case 0xEA: break;
    // BRK - 跳过 (可能是数据字节被误执行)
    case 0x00:
      this.PC = (this.PC + 1) & 0xFFFF; // 跳过 BRK 后的填充字节
      break;
    default:
      // 未知指令: 记录但继续 (跳过)
      if (!this._unknownOps) this._unknownOps = {};
      this._unknownOps[oldPC] = (this._unknownOps[oldPC] || 0) + 1;
      if (!this._unknownLogged) {
        console.error(`Unknown op $${op.toString(16).padStart(2,'0')} at $${oldPC.toString(16).padStart(4,'0')}`);
        this._unknownLogged = true;
      }
      break;
    }
    this.cycles += cyc;
    return cyc;
  }
  runUntilReturn() {
    const startDepth = this.callDepth;
    while (!this.halted && this.cycles < this.maxCycles) {
      this.step();
      if (this.callDepth < startDepth) break;
    }
  }
}

// ── 提取场景 ──
function extractScene(sceneId) {
  console.log(`\n=== 提取场景 0x${sceneId.toString(16).padStart(2,'0')} ===`);
  RAM.fill(0);
  ppuVram.fill(0);
  ppuAddr = 0;
  ppuAddrHigh = false;

  // MMC3 初始状态 (reset 后)
  mmc3.prgMode = 0;
  mmc3.chrInvert = 0;
  mmc3.regs.fill(0);
  mmc3.regs[6] = 0;  // Bank 00 at $8000
  mmc3.regs[7] = 7;  // Bank 07 at $A000 (场景数据)
  updateMmc3Mapping();

  // 初始 RAM 状态
  RAM[0x5B] = 0;  // ram_005B
  RAM[0x25] = 0;  // ram_0025 (影响 $C4B9)
  RAM[0x7B] = 0;  // ram_007B
  RAM[0x22] = 0;  // ram_0022 (影响 $C4B9 的 ORA)
  RAM[0x4A] = 0;  // ram_004A (PPU buffer 控制, =0 走直接 PPU 写入)
  RAM[0x4B] = 0;  // ram_004B

  const cpu = new Cpu6502();
  cpu.A = sceneId;
  cpu.PC = 0x8AF7;
  cpu.callDepth = 0;
  cpu.traceEnabled = true;
  cpu.maxCycles = 5000000;
  cpu.runUntilReturn();

  console.log(`执行: ${cpu.cycles} cycles, halted=${cpu.halted}, depth=${cpu.callDepth}`);
  if (cpu.traceLog.length > 0) {
    console.log('最后 50 条 trace:');
    cpu.traceLog.slice(-50).forEach(l => console.log('  ' + l));
  }
  // 输出完整 trace 到文件
  const tracePath = path.resolve(__dirname, 'trace_8AF7.log');
  fs.writeFileSync(tracePath, cpu.traceLog.join('\n'));
  console.log(`完整 trace (${cpu.traceLog.length} 条) 已写入: ${tracePath}`);

  // 收集 NT 数据
  const nt0 = []; const nt1 = [];
  for (let i = 0; i < 960; i++) {
    nt0.push(ppuVram[0x2000 + i]);
    nt1.push(ppuVram[0x2400 + i]);
  }
  const attr0 = []; const attr1 = [];
  for (let i = 0; i < 64; i++) {
    attr0.push(ppuVram[0x23C0 + i]);
    attr1.push(ppuVram[0x27C0 + i]);
  }
  const palBg = []; const palSpr = [];
  for (let i = 0; i < 16; i++) {
    palBg.push(ppuVram[0x3F00 + i]);
    palSpr.push(ppuVram[0x3F10 + i]);
  }

  const nt0NZ = nt0.filter(t => t !== 0).length;
  const nt1NZ = nt1.filter(t => t !== 0).length;
  console.log(`NT0: ${nt0NZ}/960 non-zero, NT1: ${nt1NZ}/960 non-zero`);
  console.log(`BG Pal: ${palBg.map(p => '$' + p.toString(16).padStart(2,'0')).join(' ')}`);
  console.log(`SPR Pal: ${palSpr.map(p => '$' + p.toString(16).padStart(2,'0')).join(' ')}`);

  return { nt0, nt1, attr0, attr1, palBg, palSpr };
}

const result = extractScene(0x17);

// NT0 可视化
console.log('\n=== NT0 (32×30) ===');
for (let y = 0; y < 30; y++) {
  let line = '';
  for (let x = 0; x < 32; x++) {
    const t = result.nt0[y * 32 + x];
    line += (t === 0 ? ' .' : t.toString(16).padStart(2, '0')) + ' ';
  }
  console.log(`${y.toString().padStart(2,'0')}: ${line}`);
}

// 属性表
console.log('\n=== ATTR0 (8×8) ===');
for (let y = 0; y < 8; y++) {
  let line = '';
  for (let x = 0; x < 8; x++) {
    const t = result.attr0[y * 8 + x];
    line += t.toString(16).padStart(2, '0') + ' ';
  }
  console.log(`${y}: ${line}`);
}

// 导出 TypeScript
const outPath = path.resolve(__dirname, '../src/data/scene/00-boot/scene_0x17_nt.ts');
function fmt(arr, per) {
  const lines = [];
  for (let i = 0; i < arr.length; i += per) {
    lines.push('  ' + arr.slice(i, i + per).map(v => '0x' + v.toString(16).padStart(2,'0').toUpperCase()).join(', ') + ',');
  }
  return lines.join('\n');
}
const ts = `/** 场景 0x17 (TECMO Theater) NT 数据 — 由 scripts/extract_scene_nt.cjs 自动生成 */
export const SCENE_0x17_NT0: readonly number[] = [
${fmt(result.nt0, 32)}
];
export const SCENE_0x17_NT1: readonly number[] = [
${fmt(result.nt1, 32)}
];
export const SCENE_0x17_ATTR0: readonly number[] = [
${fmt(result.attr0, 16)}
];
export const SCENE_0x17_ATTR1: readonly number[] = [
${fmt(result.attr1, 16)}
];
export const SCENE_0x17_BG_PALETTE: readonly number[] = [
${fmt(result.palBg, 16)}
];
export const SCENE_0x17_SPR_PALETTE: readonly number[] = [
${fmt(result.palSpr, 16)}
];
`;
fs.writeFileSync(outPath, ts);
console.log(`\n已写入: ${outPath}`);
