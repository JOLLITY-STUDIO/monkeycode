/**
 * 标题场景控制器 — SceneRoot.TITLE (KICK OFF / CONTINUE 菜单)
 *
 * 开场动画 (BOOT) 播完后由 BootService 流转进入本场景。
 * 职责边界: 仅负责标题菜单的光标移动与 START 确认, 不碰开场/背景/比赛逻辑。
 *
 * 原始对应: 脚本 0x00 的标题菜单段 (bank03) + Bank00 标题主循环。
 */

import { BUTTON } from '../../../../core/types';
import { TitleMenu } from '../../data/scene/index';

/** 标题菜单项 (说明书: キックオフ=新游戏 / コンティニュー=续关→密码输入) */
const TITLE_ITEMS = [
  { label: 'KICK OFF', jp: 'キックオフ' },
  { label: 'CONTINUE', jp: 'コンティニュー' },
] as const;

/** 标题显示状态 (View 层消费) */
export interface TitleDisplayState {
  /** 光标位置 (TitleMenu) */
  cursor: TitleMenu;
  /** 菜单项列表 */
  items: ReadonlyArray<{ label: string; jp: string }>;
  /** 文本闪烁 (每 30 帧切换) */
  textBlink: boolean;
  /** 已运行帧数 */
  frame: number;
  /** 过渡透明度 0-1 */
  transitionAlpha: number;
  /** 主标题文本 */
  titleMain: string;
  /** 副标题文本 */
  titleSub: string;
}

export class TitleSceneController {
  private _cursor: TitleMenu = TitleMenu.KICKOFF;

  /** 帧计数 (驱动文本闪烁) */
  private _frame = 0;

  /** 本帧 START 确认的菜单项 (null = 未确认) */
  private _selected: TitleMenu | null = null;

  /** 进入标题场景时调用 */
  init(): void {
    this._cursor = TitleMenu.KICKOFF;
    this._frame = 0;
    this._selected = null;
  }

  get cursor(): TitleMenu { return this._cursor; }

  /** 本帧是否 START 确认 (返回确认项, 无则 null) */
  get selected(): TitleMenu | null { return this._selected; }

  /**
   * 每帧更新。
   * @param buttons 当前帧按键 bitmask
   * @returns START 确认项 (无确认返回 null)
   */
  update(buttons: number): TitleMenu | null {
    this._frame++;
    this._selected = null;

    // 光标移动 (上下, 两选项循环)
    if (buttons & BUTTON.UP) this._cursor = (this._cursor + 1) % 2;
    if (buttons & BUTTON.DOWN) this._cursor = (this._cursor + 1) % 2;

    // START 确认
    if (buttons & BUTTON.START) this._selected = this._cursor;

    return this._selected;
  }

  /** 当前显示状态快照 (View 层消费) */
  getDisplayState(): TitleDisplayState {
    return {
      cursor: this._cursor,
      items: TITLE_ITEMS,
      textBlink: Math.floor(this._frame / 30) % 2 === 0,
      frame: this._frame,
      transitionAlpha: 1,
      titleMain: 'CAPTAIN TSUBASA II',
      titleSub: 'SUPER STRIKER',
    };
  }
}
