/**
 * VDP 芯片 — 完整的 Sega Genesis VDP 状态机
 *
 * 职责:
 * 1. 24 个寄存器状态
 * 2. 端口 I/O ($C00000-$C00011)
 * 3. VBlank/HBlank 时序
 * 4. DMA 传输协调
 *
 * 原理: CPU 通过端口写 VDP，VDP 在每帧扫描时读取 VRAM/CRAM/VSRAM
 * 输出像素。
 */

import { VdpPorts } from './VdpPorts';
import { Vram } from './Vram';
import { Cram } from './Cram';

import {
  DISPLAY, VDP_PORTS,
  VDP_REG_COUNT, VDP_STATUS, VDP_REG,
} from '../core/types';

export class VdpChip {
  /** 24 个 VDP 寄存器 */
  readonly reg: Uint8Array;

  /** VRAM (64KB) */
  readonly vram: Vram;

  /** CRAM (64 色) */
  readonly cram: Cram;

  /** VSRAM (40 word) */
  readonly vsram: Uint16Array;

  /** 端口 I/O 处理器 */
  readonly ports: VdpPorts;

  /** 状态寄存器 */
  private _status: number = 0;

  /** HV 计数器 (VDP 内部, 不可编程)*/
  private _hCounter: number = 0;     // 0-341 (420 per line in H40)
  private _vCounter: number = 0;     // 0-261 (NTSC) / 0-311 (PAL)

  /** 帧计数 */
  private _frameCount: number = 0;

  /** VBlank 标志 */
  private _inVBlank: boolean = false;

  /** VInt 挂起标志 */
  private _vIntPending: boolean = false;

  /** VInt 使能 (VDP reg $01 bit 5) */
  get vIntEnabled(): boolean {
    return (this.reg[1] & 0x20) !== 0;
  }

  /** HInt 使能 (VDP reg $00 bit 4) */
  get hIntEnabled(): boolean {
    return (this.reg[0] & 0x10) !== 0;
  }

  /** DMA 使能 (VDP reg $01 bit 4) */
  get dmaEnabled(): boolean {
    return (this.reg[1] & 0x10) !== 0;
  }

  /** 显示使能 (VDP reg $01 bit 6) */
  get displayEnabled(): boolean {
    return (this.reg[1] & 0x40) !== 0;
  }

  /** H40 模式 (320px wide) vs H32 (256px wide) — reg $0C bit 0 */
  get h40Mode(): boolean {
    return (this.reg[0x0C] & 0x01) !== 0;
  }

  /** PAL 模式 (reg $01 bit 3) — Langrisser II 是 NTSC */
  get palMode(): boolean {
    return (this.reg[1] & 0x08) !== 0;
  }

  /** 背景色 (reg $07): 指定 CRAM 的 palette 0 color 0 作为背景 */
  get backgroundColor(): number {
    return (this.reg[0x07] & 0x3F);
  }

  constructor() {
    this.reg = new Uint8Array(VDP_REG_COUNT);
    this.vram = new Vram();
    this.cram = new Cram();
    this.vsram = new Uint16Array(40);
    this.ports = new VdpPorts(this);
  }

  // ============================================================
  // 状态标志
  // ============================================================

  get status(): number {
    return this._status;
  }

  /** 读状态寄存器 + 清除 VInt 标志
   *  注意: 读状态后 VInt pending 清除
   */
  readStatus(): number {
    const s = this._status;
    this._status &= ~VDP_STATUS.VBLANK; // 清除 VBlank 标志
    this._vIntPending = false;
    return s;
  }

  /** 获取 HV 计数器值 (读 $C00008)
   *  格式: H[8:0] V[7:0]  (16-bit)
   */
  readHV(): number {
    const h = this._hCounter & 0x1FF;  // 9-bit H
    const v = this._vCounter & 0xFF;   // 8-bit V
    return (h << 8) | v;
  }

  // ============================================================
  // 寄存器访问
  // ============================================================

  /** 写寄存器 (通过 VDP_CTRL port)
   *  格式: 10tt tttt oooo oooo → reg[t], value=o
   *        00oo oooo oooo oooo → VRAM/CRAM/VSRAM 地址
   */
  writeRegister(regNum: number, value: number): void {
    this.reg[regNum] = value & 0xFF;

    // 特殊寄存器处理
    switch (regNum) {
      case VDP_REG.AUTOINC:
        this.vram.autoInc = value & 0xFF;
        break;
      case VDP_REG.BG_COLOR:
        this.cram.setBackgroundColorIndex(value & 0x3F);
        break;
    }
  }

  // ============================================================
  // 显示扫描 (模拟每帧行为)
  // ============================================================

  /**
   * 推进一帧扫描
   * 模拟从行 0 → VBLANK_START → 行 TOTAL_LINES-1 的扫描过程
   *
   * 核心时序:
   * 0 - 223: 活动区域 (渲染)
   * 224-261: VBlank (不渲染, VInt 触发)
   */
  stepScanline(): boolean {
    this._vCounter++;

    if (this._vCounter >= DISPLAY.VBLANK_START &&
        this._vCounter < DISPLAY.TOTAL_LINES) {
      // VBlank 区域
      this._inVBlank = true;
      this._status |= VDP_STATUS.VBLANK;

      if (this.vIntEnabled && !this._vIntPending) {
        this._vIntPending = true;
      }
    } else {
      this._inVBlank = false;
    }

    // 水平扫描
    this._hCounter++;
    if (this._hCounter >= 3420) { // H40 total clocks
      this._hCounter = 0;
    }

    // 帧结束
    if (this._vCounter >= DISPLAY.TOTAL_LINES) {
      this._vCounter = 0;
      this._frameCount++;
      this._status &= ~VDP_STATUS.VBLANK; // 新帧, 清除 VBlank 标志
      return true; // 帧边界
    }

    return false;
  }

  /**
   * 跳过 VBlank 区域，直接推进到新帧开始
   * 用于非逐行扫描模拟 (直接帧步进)
   */
  stepFrame(): void {
    this._vCounter = 0;
    this._hCounter = 0;
    this._frameCount++;
    this._status &= ~VDP_STATUS.VBLANK;
    this._inVBlank = false;
  }

  /** 帧计数 */
  get frameCount(): number {
    return this._frameCount;
  }

  /** 是否在 VBlank */
  get inVBlank(): boolean {
    return this._inVBlank;
  }

  /** VInt 是否挂起 */
  get vIntPending(): boolean {
    return this._vIntPending;
  }

  /** 确认 VInt (VBlank 中断处理完后调用) */
  acknowledgeVInt(): void {
    this._vIntPending = false;
    this._status &= ~VDP_STATUS.VBLANK;
  }

  // ============================================================
  // DMA
  // ============================================================

  /**
   * 获取 DMA 参数 (从 VDP 寄存器)
   * DMA 长度: reg $13, $14 (lo, hi)
   * DMA 源:   reg $15, $16, $17 (lo, mid, hi) — 68K 地址空间
   */
  get dmaLength(): number {
    return (this.reg[0x14] << 8) | this.reg[0x13];
  }

  get dmaSource(): number {
    return (this.reg[0x17] << 17) | (this.reg[0x16] << 9) | (this.reg[0x15] << 1);
  }

  // ============================================================
  // Display
  // ============================================================

  /** Plane 宽度 (tile 数): 从 reg $10 bits 0-1 解码
   *  0=32, 1=64, 3=128
   */
  get planeWidth(): number {
    const v = this.reg[0x10] & 0x03;
    return v === 0 ? 32 : v === 1 ? 64 : 128;
  }

  /** Plane 高度 (tile 数): 从 reg $10 bits 4-5 解码
   *  0=32, 1=64, 3=128
   */
  get planeHeight(): number {
    const v = (this.reg[0x10] >> 4) & 0x03;
    return v === 0 ? 32 : v === 1 ? 64 : 128;
  }

  /** @deprecated 请使用 planeWidth/planeHeight (reg $10 是共享尺寸) */
  get planeASize(): number { return this.planeWidth; }

  /** @deprecated 请使用 planeWidth/planeHeight (reg $10 是共享尺寸) */
  get planeBSize(): number { return this.planeHeight; }

  /** Plane A Nametable 基地址 (VRAM offset, reg $02 × $400) */
  get planeAAddr(): number {
    return this.reg[0x02] * 0x400;
  }

  /** Plane B Nametable 基地址
   *  Genesis VDP 规格: Plane B 基地址 = reg $04 × $2000
   *  (不同于 Plane A 的 reg × $400)
   *  reg $04=0x07 → 0xE000
   *
   *  BUG FIX #2: 之前错误使用 *0x400 (=0x1C00),
   *  虽读写一致未造成渲染错误, 但与 Genesis 硬件不符
   */
  get planeBAddr(): number {
    return this.reg[0x04] * 0x2000;
  }

  /** Window Nametable 基地址 */
  get windowAddr(): number {
    return this.reg[0x03] * 0x400;
  }

  /** Sprite Attribute Table 基地址 (reg $05 × $200) */
  get spriteTableAddr(): number {
    return this.reg[0x05] * 0x200;
  }

  /** HScroll 表基地址 (reg $0D × $400) */
  get hScrollAddr(): number {
    return this.reg[0x0D] * 0x400;
  }

  /** HScroll 模式 (reg $0A) */
  get hScrollMode(): number {
    return this.reg[0x0A] & 0x03;
  }

  /** Window H 位置 (reg $11) */
  get windowHPos(): number {
    return this.reg[0x11] & 0x1F; // 0-31 cells
  }

  /** Window V 位置 (reg $12) */
  get windowVPos(): number {
    return this.reg[0x12] & 0x1F;
  }

  // ============================================================
  // 重置
  // ============================================================

  reset(): void {
    this.reg.fill(0);
    this.vram.clear();
    this.cram.clear();
    this.vsram.fill(0);
    this._status = 0;
    this._hCounter = 0;
    this._vCounter = 0;
    this._frameCount = 0;
    this._inVBlank = false;
    this._vIntPending = false;
  }
}
