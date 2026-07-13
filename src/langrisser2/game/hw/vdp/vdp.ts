/**
 * Genesis VDP (Video Display Processor) 硬件模拟
 *
 * 严格基于 execution-trace.md "第一部分附录: VDP 硬件结构与初始配置"
 * 数据来源: ROM 0x80B2 (Reset函数复制24字节VDP寄存器配置) + Genesis硬件手册
 *
 * VDP 内存映射:
 *   VRAM   64KB    图案数据 + nametable + sprite表
 *   CRAM   128B    调色板 (4组×16色, 每色2字节)
 *   VSRAM  80B     垂直滚动值 (40×2字节)
 *   寄存器 24个     R0-R23 (8位)
 *
 * @see execution-trace.md "第一部分附录: VDP 硬件结构与初始配置"
 */

// ============================================================
// 常量
// ============================================================

/** VRAM 大小: 64KB */
export const VRAM_SIZE = 0x10000;
/** CRAM 大小: 128 字节 (64色 × 2字节) */
export const CRAM_SIZE = 128;
/** VSRAM 大小: 80 字节 (40 × 2字节) */
export const VSRAM_SIZE = 80;
/** VDP 寄存器数量: 24 个 (R0-R23) */
export const VDP_REG_COUNT = 24;

/**
 * VDP 寄存器初始值
 * 来源: ROM 0x80B2 (Reset函数从此地址复制24字节到VDP寄存器)
 * 参考: execution-trace.md "VDP 寄存器初始值 (ROM 0x80B2, Reset 复制)"
 *
 * Reset 复制流程 (ghidra-decompile.c:863-918):
 *   puVar11 = &DAT_000080b2;
 *   do {
 *     VDP_CTRL = *(byte*)puVar13 | 0x8000;  // 寄存器号 | 0x8000
 *     VDP_DATA = 0;                          // 写入配置值
 *   } while (sVar4 != -1);
 */
export const VDP_INIT_REGS: ReadonlyArray<number> = Object.freeze([
  0x04, // R0  模式第0组: bit2=1 视频输出禁用 (复位后)
  0x14, // R1  模式第1组: bit2=1 DMA可用, bit4=1 显示输出未启用
  0x30, // R2  Plane A nametable 基址 → VRAM 0xC000
  0x3C, // R3  Window nametable 基址  → VRAM 0xF000
  0x07, // R4  Plane B nametable 基址 → VRAM 0xE000
  0x6C, // R5  Sprite attribute table → VRAM 0xD800
  0x00, // R6  Sprite tile 基址       → VRAM 0x0000
  0x00, // R7  背景色: 调色板0 索引0
  0x00, // R8  保留
  0x00, // R9  保留
  0xFF, // R10 H中断计数: 每帧 255 行
  0x00, // R11 模式第2组: HSync=0, VScroll=全屏滚动
  0x81, // R12 模式第3组: bit0=1 H32(32列), bit7=1 隔行模式? (待确认)
  0x37, // R13 DMA控制: bit1=1 DMA填充, bit2=1 DMA复制, bit4-5=01
  0x00, // R14 保留
  0x01, // R15 保留 (复位值)
  0x01, // R16 保留 (复位值)
  0x00, // R17 保留
  0x00, // R18 保留
  0xFF, // R19 保留 (复位值)
  0xFF, // R20 保留 (复位值)
  0x00, // R21 保留
  0x00, // R22 保留
  0x80, // R23 保留 (复位值)
]);

// ============================================================
// VDP 寄存器位定义
// ============================================================

/** R0 位定义: 模式第0组 */
export const REG0_LCB    = 0x01; // 保留
export const REG0_IE1    = 0x02; // HBlank中断使能
export const REG0_MODE4  = 0x04; // 1=Mega Drive模式 (必须为1)
export const REG0_HBLANK = 0x10; // 保留 (Mega Drive模式)
export const REG0_PSG    = 0x40; // PSG静音? (保留)
export const REG0_M5     = 0x80; // 模式5 (Mega Drive VDP)

/** R1 位定义: 模式第1组 */
export const REG1_DISPLAY_OFF = 0x00; // 显示使能位 (0=关)
export const REG1_IE0         = 0x10; // VBlank中断使能
export const REG1_DMA_ENABLE  = 0x10; // DMA使能 (bit4)
export const REG1_V30         = 0x08; // 0=V28(224行), 1=V30(240行)
export const REG1_H40         = 0x01; // 0=H32(32列), 1=H40(40列)

/** R12 位定义: 模式第3组 */
export const REG12_RS0 = 0x01; // 0=H32(32列,256px), 1=H40(40列,320px)
export const REG12_RS1 = 0x02; // 保留
export const REG12_INTERLACE_MASK = 0x06; // 隔行模式位 (bit1-2)

// ============================================================
// VRAM 基址计算 (基于寄存器值)
// ============================================================

/**
 * Plane A nametable 基址 (R2)
 * R2 高6位有效, 左移 10 位得到 VRAM 地址
 * 例: R2=0x30 → 0x30 << 10 = 0xC000
 */
export function planeABase(reg2: number): number {
  return (reg2 & 0x38) << 10; // bit3-5 有效, 左移10位
}

/**
 * Window nametable 基址 (R3)
 * R3 高4位有效, 左移 10 位
 * 例: R3=0x3C → 0x3C << 10 = 0xF000
 */
export function windowBase(reg3: number): number {
  return (reg3 & 0x3C) << 10; // bit2-5 有效, 左移10位
}

/**
 * Plane B nametable 基址 (R4)
 * R4 低3位有效, 左移 13 位
 * 例: R4=0x07 → 0x07 << 13 = 0xE000
 */
export function planeBBase(reg4: number): number {
  return (reg4 & 0x07) << 13; // bit0-2 有效, 左移13位
}

/**
 * Sprite attribute table 基址 (R5)
 * R5 低7位有效, 左移 9 位
 * 例: R5=0x6C → 0x6C << 9 = 0xD800
 */
export function spriteTableBase(reg5: number): number {
  return (reg5 & 0x7F) << 9; // bit0-6 有效, 左移9位
}

/**
 * Sprite tile 基址 (R6)
 * R6 低3位有效, 左移 13 位
 * 例: R6=0x00 → 0x00 << 13 = 0x0000
 */
export function spriteTileBase(reg6: number): number {
  return (reg6 & 0x07) << 13; // bit0-2 有效, 左移13位
}

// ============================================================
// 显示参数 (基于寄存器计算)
// ============================================================

/** 显示宽度 (像素) */
export function displayWidth(reg12: number): number {
  return (reg12 & REG12_RS0) ? 320 : 256;
}

/** 显示高度 (行) */
export function displayHeight(reg1: number): number {
  return (reg1 & REG1_V30) ? 240 : 224;
}

// ============================================================
// VDP 核心
// ============================================================

/**
 * VDP 硬件状态
 *
 * 包含 VRAM/CRAM/VSRAM/寄存器, 以及访问端口状态
 * 纯 TS 实现, 不依赖任何模拟器
 */
export class VDP {
  /** VRAM: 64KB, 存图案+nametable+sprite表 */
  readonly vram: Uint8Array = new Uint8Array(VRAM_SIZE);
  /** CRAM: 128字节, 4组×16色×2字节 (big-endian) */
  readonly cram: Uint8Array = new Uint8Array(CRAM_SIZE);
  /** VSRAM: 80字节, 40×2字节 (垂直滚动) */
  readonly vsram: Uint8Array = new Uint8Array(VSRAM_SIZE);
  /** 寄存器: R0-R23 */
  readonly regs: Uint8Array = new Uint8Array(VDP_REG_COUNT);

  // === 访问端口状态 (VDP 控制端口写入分两次) ===
  /** 第一字节待定 */
  private _ctrlLow: number = 0;
  /** 是否已经收到第一字节 */
  private _ctrlPending: boolean = false;

  // === 当前 DMA 状态 ===
  private _dmaSrcAddr: number = 0;
  private _dmaLength: number = 0;
  private _dmaWriteAddr: number = 0;
  private _dmaMode: number = 0;

  // ============================================================
  // 初始化
  // ============================================================

  /**
   * 复位 VDP
   *
   * 严格按 Reset 函数流程 (ghidra-decompile.c:863-918):
   *   1. 从 ROM 0x80B2 复制 24 字节寄存器配置
   *   2. 寄存器写入值实际是 0 (Reset 先写 0, 后续游戏再配置)
   *
   * 注: Reset 阶段 VDP_DATA 写 0, 寄存器值来自 VDP_INIT_REGS
   *     但游戏主初始化 FUN_0000c80c 会再次配置, 这里只清 VRAM/CRAM/VSRAM
   */
  reset(): void {
    this.vram.fill(0);
    this.cram.fill(0);
    this.vsram.fill(0);
    // 写入初始寄存器值 (ROM 0x80B2)
    this.regs.set(VDP_INIT_REGS);
    this._ctrlLow = 0;
    this._ctrlPending = false;
    this._dmaSrcAddr = 0;
    this._dmaLength = 0;
    this._dmaWriteAddr = 0;
    this._dmaMode = 0;
  }

  // ============================================================
  // 寄存器便捷访问 (基于执行流程中常用字段)
  // ============================================================

  /** R0: 是否启用 HBlank 中断 */
  get hblankIrqEnabled(): boolean { return !!(this.regs[0] & REG0_IE1); }
  /** R1: 是否启用显示输出 (bit6) */
  get displayEnabled(): boolean { return !!(this.regs[1] & 0x40); }
  set displayEnabled(value: boolean) {
    if (value) this.regs[1] |= 0x40;
    else this.regs[1] &= ~0x40;
  }
  /** R1: 是否启用 VBlank 中断 (bit5) */
  get vblankIrqEnabled(): boolean { return !!(this.regs[1] & REG1_IE0); }
  /** R1: 是否启用 DMA (bit4) */
  get dmaEnabled(): boolean { return !!(this.regs[1] & 0x10); }
  /** R1: 是否 240 行模式 (bit3) */
  get isV30(): boolean { return !!(this.regs[1] & REG1_V30); }

  /** R12: 是否 320 像素宽 (H40) */
  get isH40(): boolean { return !!(this.regs[12] & REG12_RS0); }

  /** 显示宽度 */
  get width(): number { return displayWidth(this.regs[12]); }
  /** 显示高度 */
  get height(): number { return displayHeight(this.regs[1]); }

  /** Plane A nametable VRAM 基址 */
  get planeABaseAddr(): number { return planeABase(this.regs[2]); }
  /** Window nametable VRAM 基址 */
  get windowBaseAddr(): number { return windowBase(this.regs[3]); }
  /** Plane B nametable VRAM 基址 */
  get planeBBaseAddr(): number { return planeBBase(this.regs[4]); }
  /** Sprite attribute table VRAM 基址 */
  get spriteTableAddr(): number { return spriteTableBase(this.regs[5]); }
  /** Sprite tile 基址 */
  get spriteTileAddr(): number { return spriteTileBase(this.regs[6]); }

  /** 背景色索引 (R7, 低6位=调色板0索引) */
  get backgroundColor(): number { return this.regs[7] & 0x3F; }

  // ============================================================
  // VRAM/CRAM/VSRAM 读取
  // ============================================================

  /** 读取 VRAM 字节 */
  readVRAM(addr: number): number {
    return this.vram[addr & 0xFFFF];
  }

  /** 读取 VRAM 字 (big-endian) */
  readVRAMWord(addr: number): number {
    return (this.vram[addr & 0xFFFF] << 8) | this.vram[(addr + 1) & 0xFFFF];
  }

  /** 读取 CRAM 颜色 (返回 16 位, big-endian) */
  readCRAM(index: number): number {
    const off = (index & 0x3F) * 2;
    return (this.cram[off] << 8) | this.cram[off + 1];
  }

  /** 读取 VSRAM 值 (返回 16 位, big-endian) */
  readVSRAM(index: number): number {
    const off = (index & 0x3F) * 2;
    return (this.vsram[off] << 8) | this.vsram[off + 1];
  }

  // ============================================================
  // VRAM/CRAM/VSRAM 写入
  // ============================================================

  /** 写入 VRAM 字节 */
  writeVRAM(addr: number, value: number): void {
    this.vram[addr & 0xFFFF] = value & 0xFF;
  }

  /** 写入 VRAM 字 (big-endian) */
  writeVRAMWord(addr: number, value: number): void {
    this.vram[addr & 0xFFFF] = (value >> 8) & 0xFF;
    this.vram[(addr + 1) & 0xFFFF] = value & 0xFF;
  }

  /** 写入 CRAM 颜色 (16 位, big-endian) */
  writeCRAM(index: number, value: number): void {
    const off = (index & 0x3F) * 2;
    // CRAM 写入时低字节 bit0 被忽略 ( Genesis 硬件特性)
    this.cram[off] = (value >> 8) & 0xFF;
    this.cram[off + 1] = value & 0xFE;
  }

  /** 写入 VSRAM (16 位, big-endian) */
  writeVSRAM(index: number, value: number): void {
    const off = (index & 0x3F) * 2;
    this.vsram[off] = (value >> 8) & 0xFF;
    this.vsram[off + 1] = value & 0xFF;
  }

  // ============================================================
  // 寄存器写入
  // ============================================================

  /**
   * 写入 VDP 寄存器
   *
   * 68K 通过 VDP 控制端口写入:
   *   第一次写: 低字节 (0x1000 | (reg << 8) | value) 的低8位
   *   第二次写: 高字节
   * 完整命令 = (0x1000 | (reg << 8) | value), bit15-13=001
   *
   * 实际硬件流程见 writeControl
   */
  writeRegister(reg: number, value: number): void {
    if (reg < 0 || reg >= VDP_REG_COUNT) return;
    this.regs[reg] = value & 0xFF;
  }

  // ============================================================
  // 控制端口写入 (68K 接口)
  // ============================================================

  /**
   * 写入控制端口 (VDP_CTRL = 0x00C00004)
   *
   * 68K 写 VDP 控制端口分两次:
   *   第1次 (byte/word): 低8位/低16位
   *   第2次 (word): 高8位组合成完整命令
   *
   * 命令格式 (32位, 但分两次 16 位写):
   *   bit31-30: CD1-CD0 (命令类型)
   *     00 = VRAM 读
   *     01 = VRAM 写
   *     11 = CRAM 写
   *     00 = VSRAM 写 (配合 bit1-0)
   *   bit29-21: 目标地址 bits 16-8 (因 VRAM 64KB)
   *   bit20-16: 保留 (0)
   *   bit15-1:  目标地址 bits 14-0 (实际只用 14 位)
   *   bit0:     DMA 标志 (1=启动 DMA)
   *
   * 实际两次写流程:
   *   第1次 word 写入: 低16位 (bit15-0)
   *     → 设置目标地址低16位
   *   第2次 word 写入: 高16位 (bit31-16)
   *     → 设置命令类型 + 目标地址高8位
   *     → 若 bit0=1 且 DMA 使能, 启动 DMA
   */
  writeControl(value: number): void {
    if (!this._ctrlPending) {
      // 第一次写: 保存低字节
      this._ctrlLow = value & 0xFF;
      this._ctrlPending = true;
      return;
    }

    // 第二次写: 组合完整命令
    const cmdHigh = value & 0xFF;
    const addr = (cmdHigh << 8) | this._ctrlLow;
    const cd = (cmdHigh >> 6) & 0x03; // 命令类型

    // 处理不同命令类型
    switch (cd) {
      case 0x00: // 寄存器写入或 VSRAM 读
        if ((cmdHigh & 0x80) === 0) {
          // bit7=0: 寄存器写入 (0x80 | reg << 0 | value)
          const reg = (cmdHigh >> 0) & 0x1F;
          this.writeRegister(reg, this._ctrlLow);
        }
        // 否则是 VSRAM 读设置 (实际读操作在 readData)
        break;
      case 0x01: // VRAM 写
        this._dmaWriteAddr = addr & 0xFFFF;
        break;
      case 0x03: // CRAM 写
        this._dmaWriteAddr = addr & 0x7F; // CRAM 128B
        break;
      case 0x04: // VSRAM 写
        this._dmaWriteAddr = addr & 0x7F; // VSRAM 80B, 但地址空间映射 128B
        break;
      case 0x00 + 0x04: // VRAM 读 (CD=00, bit1=1)
        this._dmaWriteAddr = addr & 0xFFFF;
        break;
    }

    this._ctrlPending = false;
  }

  /**
   * 写入数据端口 (VDP_DATA = 0x00C00000)
   *
   * 68K 写数据端口时, VDP 将数据写入当前地址, 然后地址自增
   * 写入目标由上一次控制端口命令决定
   */
  writeData(value: number): void {
    // 简化实现: 假设上一次控制端口写入设置了写入目标
    // 实际需要追踪命令类型
    // 这里先实现 VRAM 写入
    this.writeVRAM(this._dmaWriteAddr, value & 0xFF);
    this._dmaWriteAddr = (this._dmaWriteAddr + 1) & 0xFFFF;
  }

  // ============================================================
  // DMA 操作
  // ============================================================

  /**
   * 执行 DMA 传输
   *
   * DMA 命令队列见 execution-trace.md "函数15: FUN_00008a6c — DMA命令处理器"
   * 命令格式:
   *   0xFFF5: VRAM 填充
   *   0xFFF6: DMA 传输 (带长度)
   *   0xFFF8: DMA 传输 (简化)
   *   0xFFF9: DMA 传输 (标准)
   *   0xFFFA: DMA 传输 (VRAM)
   *   0xFFFB: DMA 传输 (VSRAM)
   *   0xFFFC: 单 word 写入
   *   0xFFFD: VSRAM 写入
   *   0xFFFE: VDP 寄存器写入
   *   0xFFFF: VDP 数据写入
   *
   * @param srcAddr 源地址 (ROM 或 RAM)
   * @param dstAddr 目标 VRAM 地址
   * @param length 传输长度 (字数)
   * @param srcData 源数据 (由调用方提供, 可能是 ROM 或 RAM)
   */
  dmaTransfer(
    srcAddr: number,
    dstAddr: number,
    length: number,
    srcData: Uint8Array
  ): void {
    let dst = dstAddr & 0xFFFF;
    let src = srcAddr;
    for (let i = 0; i < length; i++) {
      // 每次传输 1 个 word (2 字节, big-endian)
      const hi = srcData[src] || 0;
      const lo = srcData[src + 1] || 0;
      this.writeVRAM(dst, hi);
      this.writeVRAM(dst + 1, lo);
      dst = (dst + 2) & 0xFFFF;
      src += 2;
    }
  }

  /**
   * VRAM 填充
   *
   * 命令 0xFFF5: 用指定值填充 VRAM 区域
   */
  dmaFill(dstAddr: number, value: number, length: number): void {
    let dst = dstAddr & 0xFFFF;
    for (let i = 0; i < length; i++) {
      this.writeVRAM(dst, value);
      dst = (dst + 2) & 0xFFFF; // DMA 填充每次 +2 (word 模式)
    }
  }
}
