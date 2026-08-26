/**
 * TitleMenuCursorService — bank00 cursor 协议 TS 翻译
 *
 * 原作 asm 来源 (bank00 $9B25-$9B6E):
 *
 *   cursor handler $9B25-$9B5C:
 *     $9B25 PHA                    push input direction (+1 down / -1 up)
 *     $9B26 BIT $0629              check if V flag (bit 6) → already-pending retry
 *     $9B29 BVC $9B37              if V clear, skip the retry branch
 *     $9B2C LDA #$01 / JSR $9FA8   schedule 1 frame wait (pending deferred)
 *     $9B30 PLA / JMP $9B28        re-enter (recursive)
 *     $9B34 AND #$3F               mask out bit 6 → current idx (0..0x3D)
 *     $9B37 CLC
 *     $9B39 ADC $0628              + step (1 by default)
 *     $9B3A CMP #$3D               bound check (max = 0x3D = 61)
 *     $9B3D BCS $9B2E              if overflow → wrap branch
 *     $9B3F PLA
 *     $9B41 ORA #$40 / STA $0629   store new state with bit 6 (changed flag) set
 *     $9B44 TXA / LDX $0628        X = step counter → OAM table index
 *     $9B48 STA $05EA,X            write cursor X position to OAM table
 *     $9B4B TYA / STA $05E9,X     write cursor Y position
 *     $9B4F LDA $0629 / AND #$BF / STA $05E8,X   write palette attr (bit6 cleared)
 *     $9B57 INX*3 / RTS
 *
 *   changed-flag consumer $9B66-$9B6E:
 *     $9B66 LDA $0629
 *     $9B69 AND #$BF
 *     $9B6B STA $0629              consume (clear) bit 6
 *     $9B6E RTS
 *
 * H5 翻译落点:
 *   - state byte mirror of $0629 (高 6 bit = cursor idx; bit 6 = "changed" flag)
 *   - processDelta(delta, y, x): 完整复刻 $9B25-$9B5C up/down handler
 *   - consumeChanged(): 复刻 $9B66-$9B6E consumer;返回 boolean 表示本次有变化
 *   - 跳过 ASM 的 'pending retry' 调度语义 — H5 用 onUpdate 每帧直接驱动
 *     (没有 1-frame 延迟,因 BootRouter.update 每帧调 onUpdate)
 *
 * 范围限制 (避开 ROM data tables):
 *   - maxIdx 参数化 (ROM 原 $3D=61 项无意义, title 只 2 项)
 *   - palette attr 写入用 placeholder 配色 (等 ROM $9EA2 抽出后用真表)
 */
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import { Button } from '../system/InputService';

/** $0629 byte layout */
const CURSOR_CHANGED_FLAG = 0x40;
const CURSOR_IDX_MASK = 0x3f;

/** $0628 step byte (默认 1) */
const CURSOR_STEP_DEFAULT = 1;

/** OAM slot reserved for cursor sprite (复用 OPENING_SCREENS[12].mid.oam[63] placeholder) */
const CURSOR_OAM_SLOT = 63;

/** Cursor sprite X coord (文字 "KICK OFF" 左侧,等最终视觉调整) */
const CURSOR_X_DEFAULT = 88;

/**
 * Bank00 $9EA2 cursor palette attr index table — 8 项 (cursor 颜色索引).
 * TODO: 等 ROM $9EA2 抽出后替换为真实 byte 序列。
 */
const CURSOR_PALETTE_BASE: ReadonlyArray<number> = [
  0x00, 0x20, 0x40, 0x60,
  0x80, 0xa0, 0xc0, 0xe0,
];

export class TitleMenuCursorService {
  private readonly store: DataStore;
  private readonly input: InputService;

  /** mirror of $0629 */
  private state = 0;

  /** mirror of $0628 (step) */
  private step: number = CURSOR_STEP_DEFAULT;

  /** maxIdx (N-1); ROM 默认 0x3D=61,title 屏只有 2 项 (kickoff/continue),所以 1 */
  private readonly maxIdx: number;

  /** 缓存当前 cursor 应对到的 sprite Y/X — caller (Scene) 设置 */
  private spriteY = 0xc0;
  private spriteX = CURSOR_X_DEFAULT;

  constructor(store: DataStore, input: InputService, maxIdx: number = 1) {
    this.store = store;
    this.input = input;
    this.maxIdx = maxIdx & CURSOR_IDX_MASK;
  }

  /** 重置 — bank00 $9B11 init phase (state 清零, step 默认) */
  reset(): void {
    this.state = 0;
    this.step = CURSOR_STEP_DEFAULT;
    this.hide();
  }

  /** 当前 cursor idx (剔除 bit 6) */
  getIdx(): number {
    return this.state & CURSOR_IDX_MASK;
  }

  /** bit 6 是否置位 */
  isChanged(): boolean {
    return (this.state & CURSOR_CHANGED_FLAG) !== 0;
  }

  /**
   * 设置当前 sprite 的 X/Y 坐标 — bank00 $9B44-$9B4B (cursor screen position)
   * 调用约定: 通常 processDelta 前由 Scene 根据当前 item idx 计算位置
   */
  setSpritePos(y: number, x: number): void {
    this.spriteY = y & 0xff;
    this.spriteX = x & 0xff;
  }

  /**
   * Bank00 $9B25-$9B5C 协议精简版 (无 'pending retry'):
   *   delta = +1 → down; delta = -1 → up
   *   越界 wrap (over maxIdx → 0; under 0 → maxIdx)
   *   ORA #$40 置 changed 标志
   */
  processDelta(delta: -1 | 1): void {
    if (delta !== -1 && delta !== 1) return;
    const cur = this.state & CURSOR_IDX_MASK;
    let next = (cur + delta * this.step) & CURSOR_IDX_MASK;
    if (next > this.maxIdx) next = 0;
    if (next < 0) next = this.maxIdx;
    this.state = (next & CURSOR_IDX_MASK) | CURSOR_CHANGED_FLAG;
    this.paintToShadowOam();
  }

  /**
   * Bank00 $9B66-$9B6E consumer:
   *   消费 changed 标志 → 清除 bit 6
   *   返回是否本次消费是真实"有变化" → 触发右侧 panel 重绘
   */
  consumeChanged(): boolean {
    if ((this.state & CURSOR_CHANGED_FLAG) === 0) return false;
    this.state &= ~CURSOR_CHANGED_FLAG;
    return true;
  }

  /**
   * 每帧调用 — 检测 Up/Down 沿 + 消费 changed。
   * 返回 whether a frame write occurred。
   */
  tickPerFrame(itemYPositions: ReadonlyArray<number>): boolean {
    let moved = false;
    if (this.input.isPressed(1, Button.Down)) {
      this.processDelta(1);
      moved = true;
    } else if (this.input.isPressed(1, Button.Up)) {
      this.processDelta(-1);
      moved = true;
    }
    // 不管是否 moved,都消费 changed (消费帧 1 次,与 ROM 协议一致)
    const wasChanged = this.consumeChanged();
    if (moved) {
      const idx = this.getIdx();
      const y = itemYPositions[idx];
      if (typeof y === 'number') this.setSpritePos(y, CURSOR_X_DEFAULT);
      // 重新画 sprite (Y 变了 → OAM 也更新)
      this.paintToShadowOam();
    }
    return moved || wasChanged;
  }

  /** Bank00 $9B5E-$9B5C reset cursor OAM table — 隐藏 cursor */
  hide(): void {
    this.paintToShadowOam();
  }

  // ---------- private ----------

  /**
   * 把 cursor sprite 写到 shadowOam[CURSOR_OAM_SLOT]:
   *   [Y=tile1, tile=tile2, attr=palette, X=xpos]
   * ROM: $9B48 STA $05EA,X (Y); $9B4B STA $05E9,X (X); $9B52 STA $05E8,X (palette attr)
   * H5 简化: 不拆 cursor table 三段;直接填 OAM 4-tuple。
   */
  private paintToShadowOam(): void {
    const shadow = this.store.oam.shadowOam;
    const base = CURSOR_OAM_SLOT * 4;
    const idx = this.state & CURSOR_IDX_MASK;
    // 若 idx 越界 (用了默认值 0 但 maxIdx=1 反过来),保持原状态
    const palIdx = CURSOR_PALETTE_BASE[idx & 0x07] ?? 0;
    shadow[base + 0] = this.spriteY & 0xff;        // Y
    shadow[base + 1] = (palIdx >> 1) & 0x7f;       // tile (= palette idx / 2 简化,待 CHR 抽出后改 tile id)
    shadow[base + 2] = (palIdx | 0x20) & 0xff;     // attr: palette 1 + base
    shadow[base + 3] = this.spriteX & 0xff;        // X
  }
}
