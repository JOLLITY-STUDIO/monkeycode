// ============================================================================
// frame/pipeline.ts — NMI 帧渲染管线
//
// 对应 ROM Bank 2 ($8000-$8137):
//   $8000-$8065  — NMI 入口: OAM DMA + sprite OAM 逐条写入
//   $8073-$8106  — Scroll 寄存器计算 ($2000/$2005 设置)
//   $8107-$8137  — Joypad 读取边沿检测 + RNG 推进 + NMI flag
//
// 每帧顺序:
//   1. beginFrame(input)  — 计算 joypad 边沿, 重置 latch, OAM prep
//   2. (game logic runs)  — scenes.update() + bytecode.runFrame()
//   3. ppu.render()
//   4. endFrame()         — RNG ++, frame counter ++, NMI done flag
// ============================================================================

import type { JoypadInput } from '../scene/types';
import { NO_INPUT } from '../scene/types';
import { wram } from '../core/memory';
import type { Ppu } from '../ppu/ppu';

// ═══════════════════════════════════════════════
// RAM 地址常量 — 对应 ROM Zero Page 关键变量
// ═══════════════════════════════════════════════

/** $1B: NMI done flag (bit7) + joypad_held[0..3] */
const ADDR_NMI_FLAGS   = 0x1B;
/** $1C: joypad held (port 1) */
const ADDR_JOY_HELD    = 0x1C;
/** $1D: joypad released/auto-repeat (port 1) */
const ADDR_JOY_RELEASED = 0x1D;
/** $1E: joypad edge / just-pressed (port 1) */
const ADDR_JOY_EDGE    = 0x1E;
/** $3A: 帧计数器 */
const ADDR_FRAME_CTR   = 0x3A;
/** $3F: joypad temp (NMI scratch) */
const ADDR_JOY_TMP     = 0x3F;
/** $40: 连续读取重试 */
const ADDR_RETRY       = 0x40;
/** $41: 上次读取值 (用于去抖) */
const ADDR_LAST_READ   = 0x41;
/** $46, $47: 帧末清零 */
const ADDR_CLEAR_A     = 0x46;
const ADDR_CLEAR_B     = 0x47;
/** $E1-$E3: 24-bit RNG (线性同余: +$0D1183) */
const ADDR_RNG_LO      = 0xE1;
const ADDR_RNG_MID     = 0xE2;
const ADDR_RNG_HI      = 0xE3;

// ═══════════════════════════════════════════════
// Joypad 位掩码 (NES 标准)
// ═══════════════════════════════════════════════

const BTN_A      = 0x80; // bit 7
const BTN_B      = 0x40; // bit 6
const BTN_SELECT = 0x20; // bit 5
const BTN_START  = 0x10; // bit 4
const BTN_UP     = 0x08; // bit 3
const BTN_DOWN   = 0x04; // bit 2
const BTN_LEFT   = 0x02; // bit 1
const BTN_RIGHT  = 0x01; // bit 0

/** JoypadInput → NES 位掩码 */
function inputToMask(input: JoypadInput): number {
  let mask = 0;
  if (input.a)      mask |= BTN_A;
  if (input.b)      mask |= BTN_B;
  if (input.select) mask |= BTN_SELECT;
  if (input.start)  mask |= BTN_START;
  if (input.up)     mask |= BTN_UP;
  if (input.down)   mask |= BTN_DOWN;
  if (input.left)   mask |= BTN_LEFT;
  if (input.right)  mask |= BTN_RIGHT;
  return mask;
}

// ═══════════════════════════════════════════════
// NMI 帧管线
// ═══════════════════════════════════════════════

export class FramePipeline {
  /** PPU 引用 */
  ppu: Ppu;

  /** 上一帧的 joypad held 掩码 (用于边沿检测) */
  private prevHeld: number = 0;

  /** 当前帧 joypad held 掩码 → wram[$1C] */
  get joyHeld(): number { return wram[ADDR_JOY_HELD]; }
  /** 当前帧 joypad edge (rising) → wram[$1E] */
  get joyEdge(): number { return wram[ADDR_JOY_EDGE]; }
  /** 帧计数器 → wram[$3A] */
  get frameCount(): number { return wram[ADDR_FRAME_CTR]; }

  constructor(ppu: Ppu) {
    this.ppu = ppu;
  }

  // ================================================================
  // 帧开始: 对应 NMI $8000-$8137
  // ================================================================

  /**
   * 每帧开始时调用 — 处理整个 NMI 管线
   *
   * ROM NMI 流程:
   *   1. OAM DMA ($8000-$8065): 处理 $05E8-$0629 精灵缓冲区
   *   2. Scroll 寄存器 ($8073-$8106): 设置 $2000/$2005
   *   3. Joypad 读取 ($8107-$8137): 边沿检测 + RNG + NMI flag
   */
  beginFrame(input: JoypadInput = NO_INPUT): void {
    this._processOam();
    this._updateScroll();
    this._readJoypad(input);
  }

  /**
   * 帧结束时调用 — RNG + frame counter + NMI flag
   * 对应 ROM NMI 末尾 ($8107-$8137 后半)
   */
  endFrame(): void {
    this._advanceRng();
    wram[ADDR_CLEAR_A] = 0;
    wram[ADDR_CLEAR_B] = 0;
    this._setNmiDone();
    wram[ADDR_FRAME_CTR]++;
  }

  // ================================================================
  // OAM 精灵处理 — ROM $8000-$8065
  // ================================================================

  /**
   * 将 OAM 阴影缓冲区 ($05E8-$0629) 同步到 PPU OAM
   *
   * ROM 流程:
   *   $8000: LDA #$00, STA $2003   ; OAMADDR = 0
   *   $8003: LDA #$02, STA $4014   ; OAMDMA page=$02 (拷贝 $0200-$02FF → OAM)
   *   $8008: LDA $0628             ; 检查 OAM 脏标志
   *   $800B: BEQ skip              ; 0 → 跳过
   *   $800D: BIT $0629             ; 检查 bit7
   *   $8010: BVS skip              ; bit7=1 → 跳过
   *   $8012: LDA #$00, STA $2001   ; 关闭渲染
   *   ...  逐条写 OAM via $2004 ...
   *   $8043: LDA #$00, STA $0628   ; 清脏标志
   *   $8048: 重置 PPUADDR=$3F00
   *   $8053: 恢复 PPUMASK
   *
   * 语义化实现: 直接用 OAMDMA 整页拷贝 $0200-$02FF → PPU OAM
   */
  private _processOam(): void {
    // ROM 行为: OAM DMA 整页拷贝 page $02 (NMI_start)
    // 等价于把 WRAM[$0200..$02FF] 复制到 PPU OAM
    this.ppu.oamDma(2, wram);
  }

  // ================================================================
  // Scroll 寄存器 — ROM $8073-$8106
  // ================================================================

  /**
   * Scroll 寄存器更新
   *
   * ROM 流程 ($8073):
   *   LSR $20, LSR $20         ; shift PPUCTRL temp right 2
   *   LDA $45                   ; scroll Y fine + NT bit
   *   LSR                       ; NT horizontal select bit → carry
   *   ROL $20                   ; rotate into PPUCTRL
   *   LDA $7B                   ; scroll X coarse
   *   LSR                       ; NT select bit → carry
   *   ROL $20                   ; rotate into PPUCTRL
   *   LDA $20, STA $2000        ; final PPUCTRL
   *   LDA $7A, STA $2005        ; scroll X fine
   *   LDX $44, DEX, STX $2005   ; scroll Y fine - 1
   *
   * 语义化: 从 WRAM 变量 ($7A, $7B, $44, $45) 重建 PPU 滚动寄存器。
   * 这些值由场景逻辑（SET_SCROLL opcode 等）写入。
   */
  private _updateScroll(): void {
    // 读取游戏逻辑设置的滚动变量
    const scrollXFine = wram[0x7A];   // 应该存的是 fine X (0-7)
    const scrollXCoarse = wram[0x7B]; // coarse X + NT X bit
    const scrollYFine = wram[0x44];   // fine Y (0-7)
    const scrollYData = wram[0x45];   // fine Y + NT Y bit

    // 基础 PPUCTRL = $08 (NMI off, BG $0000, inc +1)
    // 加上 nametable select bits (从 scroll 变量中提取)
    let ppuCtrl = 0x08;

    // NT select bit 0 = scrollYData bit 0
    if (scrollYData & 0x01) ppuCtrl |= 0x01;
    // NT select bit 1 = scrollXCoarse bit 0 (after LSR, it's in bit 0)
    if (scrollXCoarse & 0x01) ppuCtrl |= 0x02;

    // 写入 PPU 寄存器
    // 注意: 保持 NMI enable bit 与原设定一致
    this.ppu.writeReg(0x2000, ppuCtrl | (this.ppu.regs.ctrl & 0x80));

    // scroll X = fine X + coarse 的 pixel offset
    // 简化: 直接用 $7A 作为 X fine, $7B 作为 coarse
    // 实际 NES scroll 需要两次写 $2005:
    //   第 1 次 = X fine (0-7) 放在高位的实际值
    // 但 ROM 直接写 $7A, 说明 $7A 已经是正确格式
    const sx = scrollXCoarse; // coarse 已经是组合值
    this.ppu.writeReg(0x2005, sx);

    // scroll Y = Y fine - 1 (NES 惯例: 渲染延迟一个像素)
    const sy = (scrollYFine > 0) ? scrollYFine - 1 : 0;
    this.ppu.writeReg(0x2005, sy);
  }

  // ================================================================
  // Joypad 边沿检测 — ROM $8107-$8137
  // ================================================================

  /**
   * Joypad 读取 + 边沿检测
   *
   * ROM 流程 ($8107):
   *   LDX #02        ; 处理两个手柄 (先从 2 开始)
   *   loop:
   *     LDA $1B,X     ; 当前 held
   *     EOR $3F       ; XOR 上一帧 raw
   *     AND $3F       ; AND 当前 raw → 只保留"从 0→1" 的位
   *     STA $1D,X     ; → edge (rising)
   *     LDA $3F       ; 当前 raw
   *     STA $1B,X     ; → held
   *     DEX
   *     BNE loop
   *
   * 结果:
   *   $1C = joypad held (当前按钮状态)
   *   $1E = joypad edge (刚按下的按钮, 上升沿)
   *
   * NES 位顺序:
   *   bit7=A, bit6=B, bit5=Select, bit4=Start,
   *   bit3=Up, bit2=Down, bit1=Left, bit0=Right
   */
  private _readJoypad(input: JoypadInput): void {
    const raw = inputToMask(input); // 当前帧按钮状态

    // 边沿检测: edge = (~prev & raw) 即从 0→1 的位
    const edge = raw & (raw ^ this.prevHeld);

    // 存储到 WRAM (ZP 区域)
    wram[ADDR_JOY_HELD]    = raw;   // $1C: held
    wram[ADDR_JOY_EDGE]    = edge;  // $1E: edge
    wram[ADDR_JOY_RELEASED] = 0;    // $1D: unused in port

    // 保存供下一帧比较
    this.prevHeld = raw;
  }

  // ================================================================
  // RNG 推进 — ROM $8107-$8137
  // ================================================================

  /**
   * 24-bit RNG 线性同余推进
   *
   * ROM:
   *   CLC
   *   LDA $E1, ADC #$83, STA $E1   ; RNG_lo  += 0x83
   *   LDA $E2, ADC #$0D, STA $E2   ; RNG_mid += 0x0D + carry
   *   LDA $E3, ADC #$11, STA $E3   ; RNG_hi  += 0x11 + carry
   *
   * 这产生一个周期很长的伪随机序列，因为步进值 $110D83 与 2^24 互质。
   */
  private _advanceRng(): void {
    let lo  = wram[ADDR_RNG_LO]  + 0x83;
    let mid = wram[ADDR_RNG_MID] + 0x0D + (lo >> 8);
    let hi  = wram[ADDR_RNG_HI]  + 0x11 + (mid >> 8);

    wram[ADDR_RNG_LO]  = lo  & 0xFF;
    wram[ADDR_RNG_MID] = mid & 0xFF;
    wram[ADDR_RNG_HI]  = hi  & 0xFF;
  }

  // ================================================================
  // NMI done flag
  // ================================================================

  /**
   * 设置 NMI done flag
   *
   * ROM:
   *   LDA $1B
   *   ORA #$80        ; bit7 = NMI done
   *   STA $1B
   *
   * 游戏主循环通过轮询 $1B bit7 来判断 NMI 是否完成。
   */
  private _setNmiDone(): void {
    wram[ADDR_NMI_FLAGS] |= 0x80;
  }

  /** 清除 NMI done flag (游戏逻辑消费后调用) */
  clearNmiDone(): void {
    wram[ADDR_NMI_FLAGS] &= 0x7F;
  }

  // ================================================================
  // 初始化 / 重置
  // ================================================================

  reset(): void {
    this.prevHeld = 0;
    wram[ADDR_FRAME_CTR]  = 0;
    wram[ADDR_NMI_FLAGS]  = 0;
    wram[ADDR_JOY_HELD]   = 0;
    wram[ADDR_JOY_EDGE]   = 0;
    wram[ADDR_JOY_RELEASED] = 0;
    wram[ADDR_RNG_LO]     = 0;
    wram[ADDR_RNG_MID]    = 0;
    wram[ADDR_RNG_HI]     = 0;
    wram[ADDR_CLEAR_A]    = 0;
    wram[ADDR_CLEAR_B]    = 0;
  }
}
