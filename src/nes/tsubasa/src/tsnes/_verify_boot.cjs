/**
 * 验证 bank 引擎 boot 阶段 PPU frame 数据
 * 输出到 temp/_verify_output.txt
 */
const fs = require('fs');
const path = require('path');

let OUT = '';
function log(s) { OUT += s + '\n'; process.stdout.write(s + '\n'); }

// ============================================================
// 轻量 PPU mock
// ============================================================
class MockPPU {
  constructor() {
    this.vramMem = new Uint8Array(0x4000);
    this.sramMem = new Uint8Array(256);
    this.vramAddr = 0;
    this.vramAddrFlip = 0;
    this.reg2000 = 0;
    this.reg2001 = 0;
    this.scrollX = 0;
    this.scrollY = 0;
    this.scrollFlip = 0;
  }
  updateControlReg1(val) { this.reg2000 = val; }
  updateControlReg2(val) { this.reg2001 = val; }
  writeVRAMAddress(val) {
    if (this.vramAddrFlip === 0) {
      this.vramAddr = (this.vramAddr & 0x00FF) | ((val & 0x3F) << 8);
    } else {
      this.vramAddr = (this.vramAddr & 0xFF00) | val;
    }
    this.vramAddr &= 0x3FFF;
    this.vramAddrFlip ^= 1;
  }
  vramWrite(val) {
    this.vramMem[this.vramAddr] = val;
    this.vramAddr = (this.vramAddr + ((this.reg2000 & 0x04) ? 32 : 1)) & 0x3FFF;
  }
  readStatusRegister() { this.vramAddrFlip = 0; return 0x80; }
  vramLoad() {
    const v = this.sramMem[this.vramAddr & 0xFF] ?? 0;
    this.vramAddr = (this.vramAddr + ((this.reg2000 & 0x04) ? 32 : 1)) & 0x3FFF;
    return v;
  }
  scrollWrite(val) {
    if (this.scrollFlip === 0) this.scrollX = val;
    else this.scrollY = val;
    this.scrollFlip ^= 1;
  }
  sramWrite(val) { this.sramMem[this.vramAddr & 0xFF] = val; }
  sramLoad() { return this.sramMem[this.vramAddr & 0xFF] ?? 0; }
  writeSRAMAddress(val) { this.vramAddr = val & 0xFF; }
  sramDMA(val) { /* no-op */ }
}

// ============================================================
// 加载 ROM
// ============================================================
const romPath = path.join(__dirname, 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const romBuf = fs.readFileSync(romPath);
const prgSize = romBuf[4] * 16384;
const prgRom = new Uint8Array(romBuf.subarray(16, 16 + prgSize));
log(`[load] PRG ROM: ${prgSize} bytes, ${prgRom.length} actual`);

const BANK_SIZE = 8192;
const prgBanks = [];
for (let i = 0; i < 32; i++) {
  const d = new Uint8Array(BANK_SIZE);
  for (let j = 0; j < BANK_SIZE; j++) d[j] = prgRom[i * BANK_SIZE + j] ?? 0;
  prgBanks.push(d);
}

// ============================================================
// SystemState
// ============================================================
function createSys(ppu) {
  const mem = new Uint8Array(0x10000);
  const bm = new Uint8Array([0, 1, 30, 31]);
  return {
    mem, regs: { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0, P: 0x34 },
    ppu, papu: null, bankMap: bm,
    nmiPending: false, frameCount: 0,
    bootPhase: 0, bootSubStep: 0, bootTableVal: 0,
  };
}

function readMem(sys, addr) {
  if (addr < 0x2000) return sys.mem[addr & 0x07FF];
  if (addr < 0x4000) {
    switch (addr & 0x7) {
      case 0x2: return sys.ppu.readStatusRegister();
      case 0x4: return sys.ppu.sramLoad();
      case 0x7: return sys.ppu.vramLoad();
      default: return 0;
    }
  }
  if (addr >= 0x8000) {
    const wi = (addr - 0x8000) >> 13;
    const bi = sys.bankMap[wi];
    return prgBanks[bi]?.[addr & 0x1FFF] ?? 0;
  }
  return 0;
}

function writeMem(sys, addr, val) {
  if (addr < 0x2000) { sys.mem[addr & 0x07FF] = val; return; }
  if (addr < 0x4000) {
    switch (addr & 0x7) {
      case 0x0: sys.ppu.updateControlReg1(val); break;
      case 0x1: sys.ppu.updateControlReg2(val); break;
      case 0x3: sys.ppu.writeSRAMAddress(val); break;
      case 0x4: sys.ppu.sramWrite(val); break;
      case 0x5: sys.ppu.scrollWrite(val); break;
      case 0x6: sys.ppu.writeVRAMAddress(val); break;
      case 0x7: sys.ppu.vramWrite(val); break;
    }
    return;
  }
  if (addr >= 0x8000 && addr < 0xA000) {
    if ((addr & 1) === 0) sys.mem[0x0622] = val;
    return;
  }
}

function bankSwitch(sys, bankNum) {
  sys.bankMap[0] = bankNum & 0x1F;
}

// ============================================================
// Bytecode interpreter (从 ROM 直接读)
// ============================================================

// $83EE-$83F9: script param lookup (6 entries, each 2 bytes, in bank 00)
function getScriptParamPtr(param) {
  const lo = prgBanks[0][0x3EE + param * 2];
  const hi = prgBanks[0][0x3EE + param * 2 + 1];
  return (hi << 8) | lo;
}

// $8AE7-$8AF6: D8-DF delay table (8 bytes, in bank 00)
function getDelayD8(idx) { return prgBanks[0][0xAE7 + idx] ?? 0x0A; }

function _bytecode_setupParam(sys, param) {
  const ptr = getScriptParamPtr(param);
  log(`[_bytecode_setupParam] param=${param} ptr=$${ptr.toString(16)}`);
  if (ptr === 0) return false;
  sys.mem[0x4D] = ptr & 0xFF;
  sys.mem[0x4E] = ptr >> 8;
  // Init nametable write state
  sys.ppu.writeVRAMAddress(0x23); sys.ppu.writeVRAMAddress(0xE0);
  for (let i = 0; i < 0x20; i++) sys.ppu.vramWrite(0x55);
  sys.mem[0xE6] = 0xE0;
  sys.mem[0xE7] = 0x23;
  sys.mem[0x55] = 0x08;
  sys.mem[0x4F] = 0x49;
  sys.mem[0x50] = 0x22;
  sys.mem[0x51] = 0x49;
  sys.mem[0x52] = 0x22;
  sys.mem[0x53] = 0x49;
  sys.mem[0x54] = 0x49 & 0x1F;
  sys.mem[0xED] = sys.mem[0x25];
  return true;
}

function _bytecode_writePPUTile(sys, tile) {
  writeMem(sys, 0x2006, sys.mem[0x52]);
  writeMem(sys, 0x2006, sys.mem[0x53]);
  writeMem(sys, 0x2007, tile);
  sys.mem[0x53] = (sys.mem[0x53] + 1) & 0xFF;
  if (sys.mem[0x55] !== 0) {
    if ((sys.mem[0x53] & 0x1F) > (sys.mem[0x54] & 0x1F)) {
      sys.mem[0x53] = ((sys.mem[0x53] + 0x20) & 0xE0) | (sys.mem[0x4F] & 0x1F);
    }
  }
}

function bank00_execBytecode(sys, param) {
  if (param !== undefined) {
    if (!_bytecode_setupParam(sys, param)) return 0;
  }
  let safety = 0;
  let tilesWritten = 0;
  while (safety < 50000) {
    safety++;
    const ptr = ((sys.mem[0x4E] ?? 0) << 8) | (sys.mem[0x4D] ?? 0);
    if (ptr === 0) { log(`[bytecode] done after ${tilesWritten} tiles`); return 0; }
    const op = readMem(sys, ptr);
    sys.mem[0x4D] = (ptr + 1) & 0xFF;
    if (sys.mem[0x4D] === 0) sys.mem[0x4E] = (sys.mem[0x4E] + 1) & 0xFF;
    
    let delay = 0;
    if (op < 0xD8) {
      _bytecode_writePPUTile(sys, op);
      tilesWritten++;
      delay = 0;
    } else if (op < 0xE0) {
      delay = getDelayD8(op - 0xD8);
    } else if (op < 0xE8) {
      // E0-E7: relative branch — skip
      delay = 0;
    } else {
      // E8-FF: extended opcodes
      if (op === 0xE8) {
        const lo2 = readMem(sys, ptr);
        const hi2 = readMem(sys, ptr + 1);
        const newPtr = (hi2 << 8) | lo2;
        if (newPtr === 0) return 0;
        sys.mem[0x4D] = lo2;
        sys.mem[0x4E] = hi2;
        continue;
      }
      if (op === 0xEC || op === 0xE9) { delay = op === 0xE9 ? 2 : 10; }
      else if (op === 0xED) {
        const subParam = readMem(sys, ptr + 1);
        sys.mem[0x4D] = (ptr + 2) & 0xFF;
        if (sys.mem[0x4D] < 2) sys.mem[0x4E] = (sys.mem[0x4E] + 1) & 0xFF;
        // Current script pointer saved on "stack"
        sys.mem[0x1F7] = ptr & 0xFF;
        sys.mem[0x1F8] = ptr >> 8;
        _bytecode_setupParam(sys, subParam);
        continue;
      } else {
        delay = 2; // default
      }
    }
    if (delay > 0) return delay;
  }
  sys.mem[0x4D] = 0; sys.mem[0x4E] = 0;
  return 0;
}

function bank00_bytecodeWaitTick(sys) {
  if ((sys.mem[0x4D] ?? 0) === 0 && (sys.mem[0x4E] ?? 0) === 0) return false;
  if ((sys.mem[0xE9] ?? 0) > 0) { sys.mem[0xE9]--; return true; }
  const delay = bank00_execBytecode(sys);
  if ((sys.mem[0x4D] ?? 0) === 0 && (sys.mem[0x4E] ?? 0) === 0) return false;
  if (delay > 0) sys.mem[0xE9] = delay;
  return true;
}

// ============================================================
// Boot state machine
// ============================================================
function bank00_ppuClear(sys) {
  sys.ppu.writeVRAMAddress(0x20); sys.ppu.writeVRAMAddress(0x00);
  for (let i = 0; i < 1024; i++) sys.ppu.vramWrite(0);
}

function bank00_execBytecodeInit(sys, param) {
  return _bytecode_setupParam(sys, param);
}

function bank00_tickBoot(sys) {
  switch (sys.bootPhase) {
    case 0:
      bank00_ppuClear(sys);
      bank00_execBytecodeInit(sys, 1);
      sys.bootPhase = 1; sys.bootSubStep = 0;
      break;
    case 1:
      sys.bootSubStep++;
      if (sys.bootSubStep > 10000) { sys.mem[0x4D] = 0; sys.mem[0x4E] = 0; }
      if (!bank00_bytecodeWaitTick(sys)) {
        sys.bootPhase = 2; sys.bootSubStep = 0;
      }
      break;
    case 2:
      sys.mem[0xE0] = 0xC0;
      bankSwitch(sys, 2);
      sys.bootPhase = 3;
      break;
    case 3:
      sys.mem[0x28] = 0; sys.mem[0x29] = 0; sys.mem[0x27] = 0;
      writeMem(sys, 0x0700, 0x01);
      sys.bootPhase = 4;
      break;
    case 4: bankSwitch(sys, 2); sys.bootPhase = 5; break;
    case 5:
      sys.mem[0x4D] = 0; sys.mem[0x4E] = 0;
      sys.mem[0x55] = 0x08; sys.mem[0x4F] = 0x49;
      sys.mem[0x50] = 0x22; sys.mem[0x51] = 0x49;
      sys.mem[0x52] = 0x22; sys.mem[0x53] = 0x49;
      sys.mem[0x54] = 0x49 & 0x1F; sys.mem[0xE9] = 0;
      sys.bootPhase = 6;
      break;
    case 6: bankSwitch(sys, 1); sys.bootPhase = 7; break;
    case 7: sys.bootPhase = 8; break;
    case 8:
      if (sys.mem[0x26] >= 0x20) {
        writeMem(sys, 0x0700, 0x4C);
      }
      sys.bootPhase = 9;
      break;
    case 9: bankSwitch(sys, 2); sys.bootPhase = 10; break;
    case 10:
      bankSwitch(sys, 1);
      writeMem(sys, 0x0700, 0x33);
      sys.bootPhase = 11;
      break;
    case 11: break; // DONE
  }
}

// ============================================================
// 便捷函数：转储 nametable
// ============================================================
function dumpNT(ppu, label) {
  log(label);
  let rows = 0;
  for (let r = 0; r < 30; r++) {
    let ln = '';
    let has = false;
    for (let c = 0; c < 32; c++) {
      const t = ppu.vramMem[0x2000 + r * 32 + c] ?? 0;
      ln += t.toString(16).padStart(2, '0') + ' ';
      if (t !== 0) has = true;
    }
    if (has) { log(`  R${String(r).padStart(2)}: ${ln.trim()}`); rows++; }
  }
  if (rows === 0) log('  (all zero)');
  log('');
}

function countNonZeroNT(ppu) {
  let c = 0;
  for (let i = 0x2000; i < 0x2400; i++) if (ppu.vramMem[i] !== 0) c++;
  return c;
}

function dumpPalette(ppu, label) {
  log(label);
  let bg = '  BG: ';
  for (let i = 0; i < 16; i++) bg += '0x' + (ppu.vramMem[0x3F00 + i] ?? 0).toString(16).padStart(2,'0') + ' ';
  let sp = '  SPR:';
  for (let i = 0; i < 16; i++) sp += '0x' + (ppu.vramMem[0x3F10 + i] ?? 0).toString(16).padStart(2,'0') + ' ';
  log(bg); log(sp); log('');
}

// ============================================================
// 主测试
// ============================================================
log('========== BOOT FRAME VERIFICATION ==========\n');

const ppu = new MockPPU();
const sys = createSys(ppu);
sys.mem[0x0021] = 0x1E; // PPUMASK
sys.bootPhase = 0;

// 预先读取 param=1 的脚本指针
log(`[info] Script param table (6 entries):`);
for (let i = 0; i < 6; i++) {
  const ptr = getScriptParamPtr(i);
  log(`  param[${i}] = $${ptr.toString(16).padStart(4,'0')}`);
}
log('');

// 读取 param=1 指针对应的脚本开头几个字节
const p1ptr = getScriptParamPtr(1);
log(`[info] Bytecode script param=1 at $${p1ptr.toString(16)} (bank 00, offset=$${(p1ptr-0x8000).toString(16)})`);
let scriptHead = '';
for (let i = 0; i < 64; i++) {
  scriptHead += prgBanks[0][p1ptr - 0x8000 + i]?.toString(16).padStart(2,'0') + ' ';
}
log(`  First 64 bytes: ${scriptHead}`);
log('');

// 运行 boot
log('=== Running boot frames ===');
let lastPhase = -1;
for (let f = 0; f < 200; f++) {
  if (sys.bootPhase >= 11) break;
  sys.frameCount = f;
  bank00_tickBoot(sys);
  
  if (f % 10 === 0 || f < 5 || sys.bootPhase !== lastPhase) {
    const ntNZ = countNonZeroNT(ppu);
    log(`F#${String(f).padStart(3)} phase=${sys.bootPhase} sub=${sys.bootSubStep} ntNZ=${ntNZ} ptr=$${((sys.mem[0x4E]<<8)|sys.mem[0x4D]).toString(16).padStart(4,'0')} $E9=$${(sys.mem[0xE9]??0).toString(16)}`);
    lastPhase = sys.bootPhase;
  }
}

log(`\n=== Boot finished at frame ${sys.frameCount}, phase=${sys.bootPhase} ===\n`);

// 最终 dump
dumpNT(ppu, '=== Final Nametable (NT 0x2000) ===');
dumpPalette(ppu, '=== Final Palette ===');

// 与参考对比 — ref frame #96 NT 0x2000
log('=== Comparison with ref (frame #96, NT 0x2000) ===');

// Row 12 expected (cols 13-21): 28,29,2C,2D,38,37,39,3C,3D
// Row 13 expected (cols 13-21): 2A,2B,2E,2F,3A,2A,3B,3E,3F
// Row 15 expected (cols 13-22): 14,0A,07,03,14,07,12
const expRows = {
  12: { cols: [13,21], data: [0x28,0x29,0x2C,0x2D,0x38,0x37,0x39,0x3C,0x3D] },
  13: { cols: [13,21], data: [0x2A,0x2B,0x2E,0x2F,0x3A,0x2A,0x3B,0x3E,0x3F] },
  15: { cols: [13,20], data: [0x14,0x0A,0x07,0x03,0x14,0x07,0x12] },
};

for (const [row, expected] of Object.entries(expRows)) {
  const [cStart, cEnd] = expected.cols;
  let actual = [];
  let match = true;
  for (let c = cStart; c <= cEnd; c++) {
    const v = ppu.vramMem[0x2000 + parseInt(row) * 32 + c];
    actual.push(v);
  }
  for (let i = 0; i < expected.data.length; i++) {
    if (actual[i] !== expected.data[i]) match = false;
  }
  log(`Row ${String(row).padStart(2)} expected: ${expected.data.map(v=>'0x'+v.toString(16)).join(' ')}`);
  log(`Row ${String(row).padStart(2)} actual:   ${actual.map(v=>'0x'+v.toString(16).padStart(2,'0')).join(' ')}`);
  log(`  Match: ${match ? 'OK ✅' : 'MISMATCH ❌'}`);
}

// 对比整个 nametable 非零区域
log('\n=== Full NT non-zero areas ===');
for (let r = 0; r < 30; r++) {
  let hasAny = false;
  let ln = '';
  for (let c = 0; c < 32; c++) {
    const t = ppu.vramMem[0x2000 + r*32 + c] ?? 0;
    if (t !== 0) {
      ln += `(${c},0x${t.toString(16).padStart(2,'0')}) `;
      hasAny = true;
    }
  }
  if (hasAny) log(`  R${String(r).padStart(2)}: ${ln.trim()}`);
}

// 保存到文件
fs.mkdirSync(path.join(__dirname, 'temp'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'temp', '_verify_output.txt'), OUT, 'utf-8');
console.log('Done. Output saved to temp/_verify_output.txt');
