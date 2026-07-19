/**
 * StartMenuScene.ts — 战斗中的 START 机能菜单 (Canvas UI)
 *
 * 触发: 战斗地图按 START (Button.START)
 * 对应 execution-trace.md §2.5.2 START 机能菜单
 *
 * 菜单选项:
 *   1. SAVE       — 存档到 CONTINUE
 *   2. LOAD       — 读取存档
 *   3. 胜利条件    — 查看当前关过关条件
 *   4. GAME设定   — 变更背景颜色等
 *   5. 当天指令终了 — 结束玩家回合 → 敌方/友军回合
 *
 * 按键:
 *   ↑↓: 菜单光标
 *   A: 确认
 *   B/START: 关闭菜单
 *
 * 资料来源:
 *   粉丝站: START 菜单说明
 *   execution-trace.md §6 状态切换 (BATTLE_MAP → START_MENU)
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import { drawPanel, drawMenuList, drawStatusBar, TextLine } from '../rendering/UI.js';

/** START 机能菜单项 (5 项) */
const MENU_ITEMS: TextLine[] = [
  { text: '1. SAVE',          color: '#ccc' },
  { text: '2. LOAD',          color: '#ccc' },
  { text: '3. 胜利条件',      color: '#ccc' },
  { text: '4. GAME 设定',     color: '#ccc' },
  { text: '5. 当天指令终了',  color: '#faa' },
];

export type StartMenuAction =
  | 'save' | 'load' | 'victory_condition'
  | 'game_settings' | 'end_turn' | 'close';

export class StartMenuScene implements Scene {
  readonly name = 'StartMenu';

  private vdp: VDP;
  private cursorIdx = 0;

  /** 回调: 返回动作类型 */
  private onAction: ((action: StartMenuAction) => void) | null = null;

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  setOnAction(cb: (action: StartMenuAction) => void): void {
    this.onAction = cb;
  }

  // ============================================================================
  // Scene 接口
  // ============================================================================

  init(): void {
    this.vdp.displayEnabled = true;
    this.cursorIdx = 0;
    console.log('[StartMenu] START 机能菜单 打开');
  }

  update(dt?: number, input?: Mapper): void {
    if (!input) return;

    // 光标移动
    if (input.justPressed(Button.DOWN)) {
      this.cursorIdx = (this.cursorIdx + 1) % MENU_ITEMS.length;
    }
    if (input.justPressed(Button.UP)) {
      this.cursorIdx = (this.cursorIdx - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
    }

    // 确认
    if (input.justPressed(Button.A)) {
      const actions: StartMenuAction[] = [
        'save', 'load', 'victory_condition',
        'game_settings', 'end_turn',
      ];
      this.onAction?.(actions[this.cursorIdx]);
    }

    // 关闭 (B 或 再按 START)
    if (input.justPressed(Button.B) || input.justPressed(Button.START)) {
      this.onAction?.('close');
    }
  }

  renderUI(ctx: CanvasRenderingContext2D): void {
    // VDP 背景保持不变, 叠加半透明面板
    drawPanel(ctx, { x: 0, y: 0, w: 320, h: 224 }, 0.3);

    // 菜单面板 (居中)
    const pw = 180, ph = 130;
    const px = Math.floor((320 - pw) / 2);
    const py = Math.floor((224 - ph) / 2);

    drawPanel(ctx, { x: px, y: py, w: pw, h: ph }, 0.92);

    drawMenuList(ctx, MENU_ITEMS, this.cursorIdx,
      { x: px + 8, y: py + 8, w: pw - 16, h: ph - 16 },
      { fontSize: 12, lineHeight: 22 });

    // 底部按键提示
    drawStatusBar(ctx, [
      { text: '↑↓:选择 A:确认 B/START:关闭', color: '#888' },
    ]);
  }

  destroy(): void {}
}
