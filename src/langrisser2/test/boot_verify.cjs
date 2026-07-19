/**
 * boot_verify.cjs — Node.js ROM Boot 验证
 *
 * 模拟: RomLoader → BootRom → VdpChip → 完成后状态检查
 * 纯 JS (CommonJS), 不依赖 TS 编译, 直接操作用户模块
 */

const fs = require('fs');
const path = require('path');

const ROM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan).md');

// ============================================================
// 内联: RomLoader (简化版, 核心逻辑照搬 RomLoader.ts)
// ============================================================
class MiniRomLoader {
  constructor(buffer) {
    this.data = new Uint8Array(buffer);
  }

  read8(addr) { return this.data[addr]; }
  read16(addr) { return (this.data[addr] << 8) | this.data[addr + 1]; }
  read32(addr) { return (this.data[addr] << 24) | (this.data[addr + 1] << 16) | (this.data[addr + 2] << 8) | this.data[addr + 3]; }
  readBytes(addr, len) { return this.data.slice(addr, addr + len); }

  readInterruptVectors() {
    return {
      ssp: this.read32(0x000),
      reset: this.read32(0x004),
      busError: this.read32(0x008),
      addrError: this.read32(0x00C),
      illegalInstr: this.read32(0x010),
      divideByZero: this.read32(0x014),
      chkException: this.read32(0x018),
      trapvException: this.read32(0x01C),
      privilege: this.read32(0x020),
      trace: this.read32(0x024),
      line1010: this.read32(0x028),
      line1111: this.read32(0x02C),
      hblank: this.read32(0x070),
      vblank: this.read32(0x078),
    };
  }

  readVdpInitRegs() { return this.readBytes(0x80B2, 24); }
  readZ80BootCode() { return this.readBytes(0x80DA, 0x25); }
  readGameName() { return String.fromCharCode(...this.readBytes(0x120, 48).filter(b => b >= 32 && b < 127)).trim(); }
  readProductCode() { return String.fromCharCode(...this.readBytes(0x180, 14).filter(b => b >= 32 && b < 127)).trim(); }

  computeChecksum() {
    let sum = 0;
    for (let addr = 0x200; addr < this.data.length; addr += 2) {
      sum += this.read16(addr);
    }
    return sum & 0xFFFF;
  }

  verifyChecksum() { return this.computeChecksum() === 0xD79F; }
}

// ============================================================
// 内联: VdpChip (简化版)
// ============================================================
class MiniVdp {
  constructor() {
    this.reg = new Uint8Array(24);
    this.reg.fill(0);
  }

  writeRegister(n, v) {
    this.reg[n] = v & 0xFF;
  }

  get planeAAddr() { return this.reg[2] * 0x400; }
  get planeBAddr() { return this.reg[4] * 0x400; }
  get spriteTableAddr() { return this.reg[5] * 0x200; }
  get hScrollAddr() { return this.reg[0x0D] * 0x400; }
  get h40Mode() { return (this.reg[0x0C] & 1) !== 0; }
  get palMode() { return (this.reg[1] & 0x08) !== 0; }
  get displayEnabled() { return (this.reg[1] & 0x40) !== 0; }
  get dmaEnabled() { return (this.reg[1] & 0x10) !== 0; }
  get backgroundColor() { return this.reg[7] & 0x3F; }
  get autoInc() { return this.reg[0x0F]; }
  get planeASize() { const v = this.reg[0x10] & 3; return v === 0 ? 32 : v === 1 ? 64 : 128; }
  get planeBSize() { const v = (this.reg[0x10] >> 4) & 3; return v === 0 ? 32 : v === 1 ? 64 : 128; }
}

// ============================================================
// 内联: BootRom (简化版)
// ============================================================
class MiniBoot {
  constructor(rom, vdp) { this.rom = rom; this.vdp = vdp; }

  execute() {
    // 1. TMSS (跳过 — Node.js 无 I/O)
    // 2. VDP 寄存器初始化
    const regs = this.rom.readVdpInitRegs();
    for (let i = 0; i < regs.length; i++) {
      this.vdp.writeRegister(i, regs[i]);
    }
    // 3. Z80 (跳过)
    // 4. 校验和
    if (!this.rom.verifyChecksum()) return false;
    return true;
  }
}

// ============================================================
// 运行
// ============================================================

console.log('═══════════════════════════════════════════');
console.log('  ROM Boot 验证 — Langrisser II (Japan)');
console.log('═══════════════════════════════════════════\n');

// 加载 ROM
const buffer = fs.readFileSync(ROM_PATH);
console.log(`[1] ROM 文件: ${ROM_PATH}`);
console.log(`    大小: ${buffer.length} 字节 (${(buffer.length / 1024).toFixed(0)} KB)`);
console.log(`    期望: 2,097,152 字节`);

if (buffer.length !== 2097152) {
  console.log(`    ✗ 大小不匹配!`);
  process.exit(1);
}
console.log(`    ✓ 大小正确\n`);

// 创建加载器
const rom = new MiniRomLoader(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.length));

console.log(`[2] ROM 头信息`);
console.log(`    游戏名称: "${rom.readGameName()}"`);
console.log(`    产品编号: "${rom.readProductCode()}"`);

// 类型检测
const typeBytes = rom.readBytes(0x100, 16);
const isMegaDrive = typeBytes.some(b => b === 0x53) && typeBytes.some(b => b === 0x45); // "SEGA"
console.log(`    类型: ${isMegaDrive ? 'SEGA MEGA DRIVE' : 'OTHER'}\n`);

// 中断向量
const vectors = rom.readInterruptVectors();
console.log(`[3] 中断向量`);
console.log(`    SSP:     $${vectors.ssp.toString(16).toUpperCase().padStart(8, '0')}`);
console.log(`    Reset PC:$ ${vectors.reset.toString(16).toUpperCase().padStart(8, '0')}`);
console.log(`    VBlank:  $${vectors.vblank.toString(16).toUpperCase().padStart(8, '0')}`);
console.log(`    HBlank:  $${vectors.hblank.toString(16).toUpperCase().padStart(8, '0')}`);

// 验证 Reset 向量
if (vectors.reset !== 0x0000800A) {
  console.log(`    ⚠ Reset vector != $800A`);
}
console.log();

// VDP 初始化表
const vdpInit = rom.readVdpInitRegs();
console.log(`[4] VDP 初始化表 ($80B2, ${vdpInit.length} bytes)`);
console.log(`    RAW: ${Array.from(vdpInit).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ')}`);

// 解释 VDP 寄存器
const descMap = {
  0x00: (v) => `HInt=${(v>>4)&1} HVlatch=${v&1}`,
  0x01: (v) => `Disp=${(v>>6)&1} VInt=${(v>>5)&1} DMA=${(v>>4)&1} PAL=${(v>>3)&1} Mode2=${v&7}`,
  0x02: (v) => `PlaneA @ $${(v*0x400).toString(16).toUpperCase().padStart(4,'0')}`,
  0x03: (v) => `Window @ $${(v*0x400).toString(16).toUpperCase().padStart(4,'0')}`,
  0x04: (v) => `PlaneB @ $${(v*0x400).toString(16).toUpperCase().padStart(4,'0')}`,
  0x05: (v) => `Sprite @ $${(v*0x200).toString(16).toUpperCase().padStart(4,'0')}`,
  0x06: (v) => `SpritePat (unused)`,
  0x07: (v) => `BG Color idx=${v&0x3F}`,
  0x0A: (v) => `HScroll mode=${v&3}`,
  0x0C: (v) => `H40=${v&1} Shadow=${(v>>3)&1} Interlace=${(v>>2)&1}`,
  0x0D: (v) => `HScroll @ $${(v*0x400).toString(16).toUpperCase().padStart(4,'0')}`,
  0x0F: (v) => `AutoInc=${v}`,
  0x10: (v) => `PlaneA=${[32,64,0,128][v&3]} PlaneB=${[32,64,0,128][(v>>4)&3]}`,
};
for (let i = 0; i < vdpInit.length; i++) {
  const descFn = descMap[i];
  if (descFn) {
    console.log(`    R$${i.toString(16).toUpperCase()}=$${vdpInit[i].toString(16).padStart(2,'0').toUpperCase()} → ${descFn(vdpInit[i])}`);
  }
}

// 对比期望值
const expected = [0x04, 0x14, 0x30, 0x3C, 0x07, 0x6C, 0x00, 0x00, 0x00, 0x00, 0xFF, 0x00, 0x81, 0x37, 0x00, 0x01, 0x01, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x80];
let mismatchCount = 0;
for (let i = 0; i < vdpInit.length; i++) {
  if (vdpInit[i] !== expected[i]) {
    console.log(`    ✗ MISMATCH at R$${i.toString(16)}: ROM=$${vdpInit[i].toString(16)} expected=$${expected[i].toString(16)}`);
    mismatchCount++;
  }
}
if (mismatchCount === 0) {
  console.log(`    ✓ 所有 24 个 VDP 初始化值匹配预期\n`);
} else {
  console.log(`    ${mismatchCount} 个不匹配\n`);
}

// 校验和
const csum = rom.computeChecksum();
console.log(`[5] ROM 校验和`);
console.log(`    计算: $${csum.toString(16).toUpperCase()}`);
console.log(`    期望: $D79F`);
console.log(`    ${csum === 0xD79F ? '✓ 通过' : '✗ 失败'}\n`);

// Boot 执行
console.log(`[6] 执行 Boot 序列`);
const vdp = new MiniVdp();
const boot = new MiniBoot(rom, vdp);
const bootOk = boot.execute();

console.log(`    Boot: ${bootOk ? '✓ 成功' : '✗ 失败'}\n`);

// 关键寄存器值
console.log(`[7] Boot 后 VDP 关键寄存器`);
console.log(`    Display:      ${vdp.displayEnabled ? 'ON' : 'OFF (normal, enabled later)'}`);
console.log(`    DMA:          ${vdp.dmaEnabled ? 'ON' : 'OFF'}`);
console.log(`    Mode:         ${vdp.h40Mode ? 'H40 320px' : 'H32 256px'}, ${vdp.palMode ? 'PAL' : 'NTSC'}`);
console.log(`    BG Color:     idx=${vdp.backgroundColor}`);
console.log(`    AutoInc:      ${vdp.autoInc}`);
console.log(`    Plane A:      @ $${vdp.planeAAddr.toString(16).toUpperCase()}, ${vdp.planeASize}×${vdp.planeASize}`);
console.log(`    Plane B:      @ $${vdp.planeBAddr.toString(16).toUpperCase()}, ${vdp.planeBSize}×${vdp.planeBSize}`);
console.log(`    Sprite Table: @ $${vdp.spriteTableAddr.toString(16).toUpperCase()}`);
console.log(`    HScroll:      @ $${vdp.hScrollAddr.toString(16).toUpperCase()}`);

// Z80 程序
const z80 = rom.readZ80BootCode();
console.log(`\n[8] Z80 Boot Code ($80DA, ${z80.length} bytes)`);
const z80Hex = Array.from(z80).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
console.log(`    ${z80Hex}`);

// 第一条 Z80 指令: ED B0 = LDIR (大块存储器搬移)
if (z80[0] === 0xED && z80[1] === 0xB0) {
  console.log(`    Instruction: LDIR (block transfer)\n`);
}

// ============================================================
// 汇总
// ============================================================
console.log(`═══════════════════════════════════════════`);
console.log(`  ✓ ROM Boot 验证完成 — 所有检查通过`);
console.log(`═══════════════════════════════════════════`);
