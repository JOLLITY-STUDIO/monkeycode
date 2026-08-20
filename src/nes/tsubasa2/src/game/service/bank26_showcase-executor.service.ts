/**
 * Bank26 演出执行器 — 技能演出状态机 (H5)
 *
 * 对应原始 Bank26 入口:
 *   $8021: JMP $8F72  能力计算 (射门/技能数值)
 *   $8036: JMP $85AC  射门演出状态机 (技能演出循环)
 *
 * 分层职责:
 *   service (本类) → 维护演出状态 (busy/帧数/类型), 返回 DisplayState
 *   view (ShowcaseView) → 读 DisplayState 写 OAM (演出画面渲染)
 *
 * 演出激活信号: ram_0516 bit7 (busy) + ram_0518 (演出 ID)
 *   请求: Bank30 $CBB0 requestShowcase(id) → 置 busy + 解释器
 *
 * TODO:
 *   - $8F72 能力计算的完整 6502 语义 (ram_00E2/00E3 方向合成, 当前为关键分支)
 *   - $85AC 演出子状态机完整链 (ram_0629/0635/0637/05FB 等)
 *   - Cyclone #46 的逐帧位移动画表 (当前为几何近似)
 */
import { DataStore } from '../data/DataStore';
import {
  SHOWCASE_D6DE,
  getShowcaseBlock,
  type ShowcaseBlockView,
} from '../data/showcase-data';
import { getShowcasePalette, SHOWCASE_PALETTE_DEFAULT } from '../data/showcase-palette';
import { nesColorToRGBA } from '../data/prg/ppu/pallete/paletteManager';

// ── RAM 语义键 ──
const KEY_003A = 'ram_003A';
const KEY_043B = 'ram_043B';
const KEY_043C = 'ram_043C';
const KEY_043F = 'ram_043F';
const KEY_0440 = 'ram_0440';
const KEY_0441 = 'ram_0441';
const KEY_0448 = 'ram_0448';
const KEY_0516 = 'ram_0516';
const KEY_0518 = 'ram_0518';
const KEY_062D = 'ram_062D';
const KEY_0635 = 'ram_0635';
const KEY_0637 = 'ram_0637';
const KEY_0600 = 'ram_0600';
const KEY_05FB = 'ram_05FB';
const KEY_00E2 = 'ram_00E2';
const KEY_00E3 = 'ram_00E3';
const KEY_0067 = 'ram_0067';
const KEY_0068 = 'ram_0068';

/** 演出最大演示时长 (帧) — 超过后若解释器未清 busy 则强制结束 (H5 演示兜底) */
const SHOW_MAX_FRAMES = 90;

/** 演出渲染状态 (View 只读) */
export interface ShowcaseDisplayState {
  /** 是否有演出在播 (ram_0516 bit7) */
  active: boolean;
  /** 演出 ID (ram_0518) */
  showId: number;
  /** 演出类型 (ram_043B → $D6DE 类型码) */
  type: number;
  /** 精灵块索引 (0-31) */
  blockIndex: number;
  /** 精灵块数据 */
  block: ShowcaseBlockView | null;
  /** x 偏移 (像素) */
  xOff: number;
  /** 已播帧数 */
  frame: number;
  /** 剩余帧数 (锁存驱动倒计时) */
  framesLeft: number;
  /** Cyclone 动画帧 (0-3, 旋转/闪烁相位) */
  cycloneFrame: number;
  /** 演出特效中心 X (像素, $911C 推进) */
  ballX: number;
  /** 演出特效中心 Y (像素, $911C 推进) */
  ballY: number;
}

export class Bank26ShowcaseExecutor {
  private _store: DataStore;
  /** 内部帧计数 (演出激活后递增) */
  private _frame = 0;
  /** 上一帧 busy 状态 (上升沿检测) */
  private _wasBusy = false;
  /** x 偏移 (对应 $E93D 传入的 X) */
  private _xOff = 0;
  /** 锁存当前演出 ID (新请求 → 重置演出计时) */
  private _latchedShow = 0;
  /** 演出剩余帧数 (锁存驱动, 演示可视化用) */
  private _framesLeft = 0;
  /** 演出特效中心 X (像素) — 对应 ram_0635, $911C 每帧 +4 */
  private _ballX = 0;
  /** 演出特效中心 Y (像素) — 对应 ram_0637, $911C 在 0x4C/0xB4 间跳变 */
  private _ballY = 0x4c;
  /** 方向查表 $92EA = [01, 05, 02, 07] (方向偏移) */
  private readonly _BALL_DIR_TABLE = [0x01, 0x05, 0x02, 0x07];

  constructor(store: DataStore) {
    this._store = store;
  }

  // ── 对外接口 ──

  /**
   * $8021 → $8F72 能力计算 (对应原始 Bank26)。
   * 关键分支 (H5 简化):
   *   ram_05FB==0 && ram_043B==2 && ram_0600==0 → 清 ram_043F/0440 (位置差值参考清零)
   *   ram_00E2 < 8 → ram_043C |= 0x80 (射门方向标记)
   *   ram_0067/0068 = 能力值 (方向合成近似)
   */
  entry_8021(): void {
    const s = this._store;
    s.write(KEY_003A, 0);
    // $8F7E: LDA ram_05FB; BNE → 跳过清零分支
    if (s.read(KEY_05FB) === 0) {
      if (s.read(KEY_043B) === 2 && s.read(KEY_0600) === 0) {
        s.write(KEY_043F, 0);
        s.write(KEY_0440, 0);
      }
    }
    // $8F9E: ram_00E2 < 8 → ram_043C |= 0x80
    if (s.read(KEY_00E2) < 8) {
      s.write(KEY_043C, s.read(KEY_043C) | 0x80);
    }
    // $8FAF: 能力合成 (方向 0-7 近似, 对应 $8FB2-$8FC7)
    const e2 = s.read(KEY_00E2);
    const e3 = s.read(KEY_00E3);
    const r = (e2 + e3) >> 1;
    let v = (r | 0x80) & 0xff;
    let hi = 0;
    if (s.read(KEY_043C) & 0x80) {
      v &= 0x7f;
    }
    if (v >= 0x80) { hi = 1; v &= 0x7f; }
    s.write(KEY_0067, v);
    s.write(KEY_0068, hi);
  }

  /**
   * $8036 → $85AC 演出状态机入口。
   * 原始: 读 ram_0441 → 切 bank → 演出帧推进 → 名字区写入 → 主循环跳转。
   * H5: 记录演出起点 (xOff 偏移), 内部帧从 0 起播。
   */
  entry_8036(): void {
    const s = this._store;
    void s.read(KEY_0441); // TODO: $85B1 JSR $8BD4 的输入 — 待完整翻译
    this._xOff = 0;
    this._frame = 0;
  }

  /**
   * 加载演出精灵调色板 (Bank31 $FBCC 表) → DataStore。
   * 对应原 ROM 演出启动时加载专用调色板。BG 0 置黑底。
   */
  private _loadPalette(): void {
    const s = this._store;
    const pal = getShowcasePalette(SHOWCASE_PALETTE_DEFAULT);
    for (let p = 0; p < 4; p++) {
      for (let c = 0; c < 4; c++) {
        const col = nesColorToRGBA(pal[p * 4 + c] ?? 0x0f);
        s.writeSprColor(p as 0 | 1 | 2 | 3, c as 0 | 1 | 2 | 3, { r: col.r, g: col.g, b: col.b, a: col.a });
      }
    }
    for (let c = 0; c < 4; c++) {
      s.writeBgColor(0, c as 0 | 1 | 2 | 3, { r: 0, g: 0, b: 0, a: 255 });
    }
  }

  /** 每帧 tick (由 Tsubasa2._onFrame 调用) — 推进演出状态 */
  tick(): void {
    const s = this._store;
    const busy = (s.read(KEY_0516) & 0x80) !== 0;

    // 上升沿: 新演出请求 → 锁存 showId + 重置演出计时 + 加载演出调色板
    if (busy && !this._wasBusy) {
      this._latchedShow = s.read(KEY_0518);
      this._framesLeft = SHOW_MAX_FRAMES;
      this._frame = 0;
      this._loadPalette();
      // $911C 演出推进初始化: 特效中心 = 特写块中心, Y 起点 0x4C
      const ram043B = s.read(KEY_043B);
      const block = getShowcaseBlock(ram043B);
      if (block) {
        this._ballX = block.x + ((block.perRow >> 1) << 3);
        this._ballY = 0x4c;
      }
    }

    if (busy) {
      this._frame++;
      // 锁存倒计时驱动 (独立于解释器 busy, 保证演示可视化稳定)
      if (this._framesLeft > 0) {
        this._framesLeft--;
      }
      // $911C 演出推进: 每帧 X += 4; Y 在 0x4C/0xB4 间按符号位跳变
      this._ballX += 4;
      if (s.read(KEY_0637) & 0x80) {
        this._ballY = 0xb4;
      } else {
        this._ballY = 0x4c;
      }
      // 兜底: 超时强制结束 (解释器未消费时)
      if (this._framesLeft <= 0 || this._frame > SHOW_MAX_FRAMES) {
        s.write(KEY_0516, s.read(KEY_0516) & 0x7f);
        s.write(KEY_062D, 0);
        this._wasBusy = false;
        return;
      }
    }
    this._wasBusy = busy;
  }

  /** 读演出渲染状态 (View 只读) */
  getDisplayState(): ShowcaseDisplayState {
    const s = this._store;
    const busy = (s.read(KEY_0516) & 0x80) !== 0;
    // 优先锁存值 (上升沿捕获), 回退实时 ram_0518
    const showId = this._latchedShow !== 0 ? this._latchedShow : s.read(KEY_0518);
    const ram043B = s.read(KEY_043B);
    const type = SHOWCASE_D6DE[ram043B & 0x3f] ?? 0;
    const blockIndex = (type >> 2) & 0x1f;
    const block = getShowcaseBlock(ram043B);
    return {
      active: busy,
      showId,
      type,
      blockIndex,
      block,
      xOff: this._xOff,
      frame: this._frame,
      framesLeft: this._framesLeft,
      cycloneFrame: (this._frame >> 2) & 0x03,
      ballX: this._ballX,
      ballY: this._ballY,
    };
  }
}
