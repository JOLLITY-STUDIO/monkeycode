/**
 * 天使之翼2 - 核心工具函数
 * 从 Bank $00 的 6502 汇编逐函数翻译为 TypeScript
 *
 * 对原始 6502 的约定:
 *   - ZP $00-$FF:    零页变量，现在直通 state.cpu.ram[addr]
 *   - $0200-$07FF:   CPU RAM, mem.ram[addr]
 *   - $2000-$2007:   PPU 寄存器 → state.ppu
 *   - $8000-$FFFF:   MMC3 寄存器 → state.mmc3
 */

import { GameState, PpuState, NesRam } from '../types';
import { NesMemory } from './Memory';

// 重新导出，方便上层使用
export type { GameState, NesRam } from '../types';
export type { NesMemory } from './Memory';

// ========================================================================
// $00:9FA8 → [9FB0,9FAD]  VBlank 等待
// 保存核心 ZP 变量到栈，等待一帧完成
// 6502: STA $19 / TXA PHA / TYA PHA / PHA × 10 / TSX / TXA / LDX $00
// 后面会等 VBlank 并恢复所有保存的寄存器
// ========================================================================
let vblankSavedRegs: number[] = []; // 模拟 6502 栈

export function waitVBlank(state: GameState, mem: NesMemory, param: number): void {
  // STA $19 - 保存A到$19(菜单偏移)，作为等待计数参数
  state.cpu.ram[0x19] = param;

  // 保存 X, Y, ED, EC, EB, EA, E9, E8, E7, E6 到栈（约11个push）
  // 实际6502中会push到实际的栈页，这里我们用数组模拟
  vblankSavedRegs = [
    state.cpu.x, state.cpu.y,
    state.cpu.ram[0xED], state.cpu.ram[0xEC], state.cpu.ram[0xEB],
    state.cpu.ram[0xEA], state.cpu.ram[0xE9], state.cpu.ram[0xE8],
    state.cpu.ram[0xE7], state.cpu.ram[0xE6],
  ];

  // 实际游戏逻辑：等待 PPU VBlank
  // 清 VBlank 标志，然后循环检查
  state.ppu.status &= ~0x80;

  // 设置 NMI 使能 bit (对应 PPU_CTRL bit 7)
  state.ppu.ctrl |= 0x80;

  // 运行一个模拟帧逻辑
  // 注意: 在真实 NES 上，这个函数会阻塞直到下一个 VBlank
  // 在 TS 版本中，我们标记为"等待帧"
}

/**
 * 恢复 VBlank 等待时保存的 ZP 变量
 * 6502: PLA × 10 / TAY / PLA / TAX / PLA
 */
export function restoreVBlank(state: GameState): void {
  if (vblankSavedRegs.length < 10) return;

  // 恢复 E6-E9, EA-ED, Y, X (按6502栈的LIFO顺序)
  state.cpu.ram[0xE6] = vblankSavedRegs[9];
  state.cpu.ram[0xE7] = vblankSavedRegs[8];
  state.cpu.ram[0xE8] = vblankSavedRegs[7];
  state.cpu.ram[0xE9] = vblankSavedRegs[6];
  state.cpu.ram[0xEA] = vblankSavedRegs[5];
  state.cpu.ram[0xEB] = vblankSavedRegs[4];
  state.cpu.ram[0xEC] = vblankSavedRegs[3];
  state.cpu.ram[0xED] = vblankSavedRegs[2];
  state.cpu.y = vblankSavedRegs[1];
  state.cpu.x = vblankSavedRegs[0];
  vblankSavedRegs = [];
}

// ========================================================================
// $00:9B11  画面初始化 (关 PPU 渲染)
// 6502: LDA #$00 / STA $48 / STA $49 / STA $4A / STA $4B
//       LDA #$0F / LDY #$E0 / STA $054A,Y / INY / BNE loop
//       JMP $9A71
// 作用: 清除精灵指针，把精灵 Y 缓冲区全部写到屏幕外
// ========================================================================
export function screenInit(state: GameState, mem: NesMemory): void {
  // STA $48 - 精灵OAM索引清零
  state.cpu.ram[0x48] = 0;
  state.cpu.ram[0x49] = 0;
  state.cpu.ram[0x4A] = 0;
  state.cpu.ram[0x4B] = 0;

  // 填充 $054A-$0649 (256字节) 为 $0F → 精灵 Y 坐标 $0F = 屏幕外
  // LDA #$0F / LDY #$E0 / loop: STA $054A,Y / INY / BNE loop
  for (let i = 0; i < 256; i++) {
    mem.ram[0x054A + i] = 0x0F; // $0F 是 black/透明，精灵Y=15（屏幕外）
  }

  // JMP $9A71 → 继续初始化流程
  initScreenContinued(state, mem);
}

/**
 * $00:9A71 画面初始化(续) - 设置PPU为单屏幕模式，写入空白VRAM
 */
function initScreenContinued(state: GameState, mem: NesMemory): void {
  const ppu = state.ppu;

  // 清除 PPU CTRL bit 7 (NMI off) & bit 1-0 (nametable 0)
  ppu.ctrl = (ppu.ctrl & 0x7F) | 0x00; // nametable 0
  
  // 清除 PPU MASK (关闭所有渲染)
  ppu.mask = 0x00;
}

// ========================================================================
// $00:9B7F  画面还原 (开 PPU 渲染，清 OAM)
// 6502: LDX #$00 / LDA #$F8 / loop1: STA $0468,X / INX / BNE loop1
//       LDA #$F8 / loop2: STA $0200,X / INX / BNE loop2
// 作用: 把 OAM 缓冲区和 DMA 缓冲区全部设为 $F8（屏幕外的Y坐标）
// ========================================================================
export function screenOn(state: GameState, mem: NesMemory): void {
  // 填充 $0468-$0567 → $F8（OAM sprite Y = 屏幕外）
  for (let i = 0; i < 256; i++) {
    mem.ram[0x0468 + i] = 0xF8;
  }

  // 填充 $0200-$02FF → $F8（OAM DMA 缓冲区）
  for (let i = 0; i < 256; i++) {
    mem.ram[0x0200 + i] = 0xF8;
  }

  // 清除 4 个线程状态字
  mem.ram[0x0568] = 0;
  mem.ram[0x0588] = 0;
  mem.ram[0x05A8] = 0;
  mem.ram[0x05C8] = 0;

  // 设置 PPU MASK 开启渲染
  // 游戏通常用 $1E (背景+精灵+左8列裁剪)
  state.ppu.mask = 0x1E;
}

// ========================================================================
// $00:9BA0  画面关闭 (screenOff)
// 6502: JSR $99F0 / JSR $98A0 / JMP $9B7F
// 作用: 先做一些清理，然后写VRAM，最后 screenOn
// ========================================================================
export function screenOff(state: GameState, mem: NesMemory): void {
  // JSR $99F0 - 输入/计时器初始化
  inputInit(state, mem);

  // JSR $98A0 - 清理 VRAM
  clearVram(state, mem);

  // JMP $9B7F - 画面还原
  screenOn(state, mem);
}

// ========================================================================
// $00:99F0  输入/计时器初始化
// ========================================================================
function inputInit(state: GameState, mem: NesMemory): void {
  // 清除输入状态
  state.cpu.ram[0x1D] = 0; // 控制器1原始
  state.cpu.ram[0x1E] = 0; // 控制器1上升沿
  state.cpu.ram[0x1F] = 0; // 控制器2原始
  state.cpu.ram[0x20] = 0; // 控制器2上升沿

  // 清除帧计数器
  state.cpu.ram[0x23] = 0; // VBlank计数器
  state.cpu.ram[0x24] = 0; // 帧计数低
  state.cpu.ram[0x25] = 0; // 帧计数高
}

// ========================================================================
// $00:98A0  写入 VRAM 数据 (清空全部 VRAM $2000-$3FFF)
// 6502: STA $2000(disable NMI) / STA $2001(disable render)
//       STA $2006=$20,$2006=$00 / LDY #8 / LDA #0
//       loop: STA $2007, X++ / BNE loop / DEY / BNE loop
// 作用: 关闭渲染，把 PPU地址设为$2000，写入 8×256 字节的$00
// ========================================================================
export function clearVram(state: GameState, mem: NesMemory): void {
  const ppu = state.ppu;

  // 存当前 PPU 状态以便恢复
  const savedCtrl = ppu.ctrl;
  const savedMask = ppu.mask;

  // 关 NMI + 关渲染
  ppu.ctrl &= 0x7F;   // bit 7 = 0: NMI off
  ppu.mask = 0x00;    // 完全关闭渲染

  // 设置 VRAM 地址 = $2000 (nametable 0)
  ppu.v = 0x2000;
  ppu.w = 0; // 重置地址写入锁存

  // 写入 8×256 = 2048 字节的 $00
  // 这会填充 nametable 0 和 nametable 1
  for (let block = 0; block < 8; block++) {
    for (let i = 0; i < 256; i++) {
      writePpuByte(ppu, ppu.v + i, 0x00);
    }
  }

  // 恢复 PPU 状态
  ppu.ctrl = savedCtrl;
  ppu.mask = savedMask;
}

// ========================================================================
// $00:98E8 / $98EA VRAM写入（带参数）
// 6502: LDA #$00 / STA $EB / LDA $4A / ORA $4B / BEQ $992C
//       86 E8 / A5 E9 / A4 E6 / A6 E7 / JSR $9B28
// 作用: 如果 $4A|$4B != 0，保存 Y→$E8(长度), X→$E9(类型)
// ========================================================================
export function writeVramBuffered(
  state: GameState, mem: NesMemory,
  dataPtrLow: number, dataPtrHigh: number,
  dataLen: number, dataType: number
): void {
  const ram = state.cpu.ram;

  // STA $EB = 0 (VRAM地址暂存)
  ram[0xEB] = 0;

  // 如果 $4A | $4B == 0 则跳过
  if ((ram[0x4A] | ram[0x4B]) === 0) {
    writeVramDirect(state, mem);
    return;
  }

  // 保存参数
  ram[0xE8] = dataLen;    // 数据长度
  ram[0xE9] = dataType;    // 数据类型
  ram[0xE6] = dataPtrLow;  // 数据指针低
  ram[0xE7] = dataPtrHigh; // 数据指针高

  // JSR $9B28 - 等待 PPU 准备好
  waitPpuReady(state, mem);

  // 把数据写入 VRAM 缓冲区 $05E8+
  const len = dataLen & 0xFF;
  for (let i = 0; i < len; i++) {
    mem.ram[0x05E8 + i] = ram[0xEB];
  }

  // JSR $9B5E - OAM DMA 更新
  oamDmaUpdate(state, mem);
}

/**
 * $00:992C+ 无缓冲直接VRAM写入
 */
function writeVramDirect(state: GameState, mem: NesMemory): void {
  // 关 NMI bit
  state.ppu.ctrl &= 0x7F;
  state.cpu.ram[0x20] = state.ppu.ctrl;

  // 关渲染
  state.ppu.mask = 0x00;
}

// ========================================================================
// $00:9B28  等待 PPU 就绪
// 检查 $0629 bit 6，如果溢出则等一帧
// ========================================================================
function waitPpuReady(state: GameState, mem: NesMemory): void {
  // BIT $0629 / BVC $9B37
  if (mem.ram[0x0629] & 0x40) {
    // 等待一帧 $00:9B2E: LDA #1 / JSR $9FA8
    waitVBlank(state, mem, 1);
  }
}

// ========================================================================
// $00:9B5E  OAM DMA 更新
// 把 $0200-$02FF 复制到 PPU OAM
// ========================================================================
function oamDmaUpdate(state: GameState, mem: NesMemory): void {
  const ppu = state.ppu;
  for (let i = 0; i < 256; i++) {
    ppu.oam[i] = mem.ram[0x0200 + i];
  }
}

// ========================================================================
// $00:9B28  VRAM 队列分配 — 完整实现
// 调用约定: A = control byte, X = PPU addr hi, Y = PPU addr lo
// 返回: X = 数据区起始位置 (原 $0628 + 3)
// 副作用: 写 $0629 (busy flag), $0628 不动 (commit 时才更新)
// ========================================================================
export function allocVramQueueEntry(
  mem: NesMemory, ctrl: number, addrHi: number, addrLo: number
): number {
  const ram = mem.ram;
  // $9B37: AND #$3F / ADC $0628 / CMP #$3D — 溢出检查
  const count = ctrl & 0x3F;
  const nextFree = ram[0x0628] + count;
  if (nextFree >= 0x3D) {
    // $9B3F: BCS $9B2E → 溢出则无法进队列，返回 -1
    return -1;
  }
  // $9B42: ORA #$40 / STA $0629 — 设 busy flag
  ram[0x0629] |= 0x40;
  // $9B47: TXA — A = PPU addr hi
  // $9B48: LDX $0628 — X = 当前队列写位置
  const x = ram[0x0628];
  ram[0x05EA + x] = addrHi & 0xFF;    // $9B4B: STA $05EA,X
  ram[0x05E9 + x] = addrLo & 0xFF;    // $9B4E: STA $05E9,X
  // $9B52-$9B57: 写 control byte (clear bit6 for this entry)
  ram[0x05E8 + x] = ctrl & 0xBF;
  // $9B5A-$9B5C: INX×3 → 返回数据区位置
  return x + 3;
}

// ========================================================================
// $00:9B5E  VRAM 队列提交 — 完整实现
// 调用约定: X = 当前数据写入位置
// 副作用: 写 $00 终止符, 更新 $0628 写指针, clear $0629 busy flag
// ========================================================================
export function commitVramQueueEntry(mem: NesMemory, x: number): void {
  const ram = mem.ram;
  ram[0x05E8 + x] = 0;                // $9B60: STA $05E8,X (null terminator)
  ram[0x0628] = x & 0xFF;             // $9B63: STX $0628
  ram[0x0629] &= 0xBF;                // $9B69: AND #$BF / STA $0629
}

// ========================================================================
// $00:C4B9  MMC3 Bank 切换
// 6502: 根据函数参数设置 MMC3 bank
// 这个函数在 PRG rom 内存中 (不是在 ZP/CPU ram)
// 调用模式: LDX #bankNum / JSR $C4B9
// 作用: 写 $8000 = bank_select, $8001 = bank_num
// ========================================================================
export function switchMmc3Bank(state: GameState, bankSelect: number, bankNum: number): void {
  const mmc3 = state.mmc3;
  mmc3.bankSelect = bankSelect & 0x07;
  mmc3.bankData[mmc3.bankSelect] = bankNum;
}

// ========================================================================
// $00:8920  PPU nametable 地址设置
// 6502: LDX #$13 / JSR $9DEE / (...)
// 实际: 设置 PPU VRAM 读写地址
// ========================================================================
export function setPpuAddr(state: GameState, nametable: number, offset: number): void {
  const ppu = state.ppu;

  // 计算 VRAM 地址
  // nametable 0=$2000, 1=$2400, 2=$2800, 3=$2C00
  const base = 0x2000 + (nametable & 0x03) * 0x0400;
  ppu.v = base + (offset & 0x03FF);
  ppu.w = 0;
}

// ========================================================================
// $00:88FB  延时 (常配合画面过渡)
// 6502: LDX #$00 / loop: LDA $046A,X / EOR #$20 / STA $046A,X / INX×4 / BNE loop
// 作用: 每 4 个字节翻转 OAM 缓冲区 bit 5，64 次 (产生闪烁效果)
// ========================================================================
export function delayFlicker(state: GameState, mem: NesMemory): void {
  // 每隔 4 字节翻转 $046A+ 的 bit 5
  let x = 0;
  do {
    // LDA $046A,X / EOR #$20 / STA $046A,X
    mem.ram[0x046A + x] ^= 0x20;
    x = (x + 4) & 0xFF;
  } while (x !== 0); // 6502 X 是 8 位，需按 256 取模回绕
}

// ========================================================================
// $00:890C  长延时
// 6502: STA $ED / LDX #$00 / loop: LDA $0468,X / CLC / ADC $ED / STA $0468,X
//       INX×4 / BNE loop
// 作用: 每个 4 字节的 OAM 缓冲加上参数 A，64 次
// ========================================================================
export function delayLong(state: GameState, mem: NesMemory, delayVal: number): void {
  state.cpu.ram[0xED] = delayVal;

  let x = 0;
  do {
    const val = mem.ram[0x0468 + x] + delayVal;
    mem.ram[0x0468 + x] = val & 0xFF;
    x = (x + 4) & 0xFF;
  } while (x !== 0);
}

// ========================================================================
// $00:82B5  等待画面处理完成
// 6502: LDA #1 / JSR $9FA8 / LDA $4D / ORA $4E / BEQ done / BNE loop
// 作用: 等待 $4D和$4E 都为零，表示 VRAM 操作完成
// ========================================================================
export function waitScreenReady(state: GameState, mem: NesMemory): void {
  do {
    waitVBlank(state, mem, 1);
  } while ((state.cpu.ram[0x4D] | state.cpu.ram[0x4E]) !== 0);
}

// ========================================================================
// $00:9A35  读取控制器输入
// 6502: 从 $4016 读取手柄状态，存入 $1D/$1E（当前/按下）
// ========================================================================
export function readInput(state: GameState, mem: NesMemory): void {
  const prevInput = state.cpu.ram[0x1D] & 0xFF;
  const currInput = state.controller1;

  // $1D = 当前输入
  state.cpu.ram[0x1D] = currInput;

  // $1E = 刚按下的键 (上升沿: (curr XOR prev) AND curr)
  state.cpu.ram[0x1E] = (currInput ^ prevInput) & currInput;

  // $1F = 控制器2原始数据
  state.cpu.ram[0x1F] = state.controller2;

  // $20 = 控制器2上升沿
  const prevInput2 = state.cpu.ram[0x1F] ^ state.controller2;
  state.cpu.ram[0x20] = (state.controller2 ^ prevInput2) & state.controller2;
}

// ========================================================================
// 辅助: 写 PPU 寄存器（通过 VRAM 地址和数据口）
// ========================================================================
function writePpuByte(ppu: PpuState, addr: number, value: number): void {
  // 实际 6502 通过 $2006/$2007，这里直接操作
  const offset = addr & 0x3FFF;

  if (offset >= 0x2000 && offset < 0x3F00) {
    // VRAM nametable
    ppu.vram[offset & 0x0FFF] = value;
  } else if (offset >= 0x3F00 && offset < 0x3F20) {
    // 调色板
    const idx = offset & 0x1F;
    ppu.palette[idx === 0x10 ? 0x00 : idx === 0x14 ? 0x04 : idx === 0x18 ? 0x08 : idx === 0x1C ? 0x0C : idx] = value;
  }
}

// ========================================================================
// $00:8464  Bank切换 + 画面初始化
// 被多处调用，用于切换 MMC3 bank 来加载资源
// ========================================================================
export function switchBankAndInit(state: GameState, mem: NesMemory, bankId: number): void {
  switchMmc3Bank(state, 6, bankId);
  state.cpu.ram[0x56] = bankId; // 记录当前 bank 编号
}
