/**
 * DeployScene.ts — 战前部署场景 (MENU I & MENU II)
 *
 * ROM 入口: 0xCA00 — 部署主循环 (execution-trace.md §2.3)
 * RAM 状态:
 *   $FFFFA61C = 5 (部署阶段)
 *   $FFFFAA10 = 0 (菜单等待)
 *   $FFFFAE50 = 菜单选项列表 (6项×2B, 0xFFFF=空)
 *   $FFFFA97C = 菜单状态位 (bit0=AI回合, bit1=禁用)
 *
 * MENU I (战前主菜单):
 *   1. 兵士配属 — 分配佣兵
 *   2. 道具装备 — 装备武器/防具/饰品
 *   3. 商店 → SHOP
 *   4. 指挥官配置 → MENU II
 *
 * MENU II (指挥官配置, 选中菜单项4进入):
 *   1. 指挥官位置配置
 *   2. 移动顺序变更
 *   3. 自动配置
 *   4. 部队一览
 *   5. 出击 → BATTLE_MAP
 *   B 键 → 退回 MENU I
 *
 * 按键:
 *   ↑↓: 菜单光标
 *   A: 确认选择
 *   B: MENU II 时退回 MENU I
 *
 * 资料来源:
 *   execution-trace.md §2.3-§2.4
 *   粉丝站: MENU I/II 说明
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import { GameState } from '../core/GameState.js';
import { SaveData } from '../systems/SaveSystem.js';
import { drawPanel, drawTextLines, drawMenuList, drawStatusBar, TextLine } from '../rendering/UI.js';

/** MENU I 菜单项定义 */
const MENU_I_ITEMS: TextLine[] = [
  { text: '1. 兵士配属',       color: '#ccc' },
  { text: '2. 道具装备',       color: '#ccc' },
  { text: '3. 商店',           color: '#ccc' },
  { text: '4. 指挥官配置 →',   color: '#ccc' },
];

/** MENU II 菜单项定义 */
const MENU_II_ITEMS: TextLine[] = [
  { text: '1. 指挥官位置配置', color: '#ccc' },
  { text: '2. 移动顺序变更',   color: '#ccc' },
  { text: '3. 自动配置',       color: '#ccc' },
  { text: '4. 部队一览',       color: '#ccc' },
  { text: '5. 出击 →',        color: '#0f0' },
];

export class DeployScene implements Scene {
  readonly name = 'Deploy';

  private vdp: VDP;
  private state: GameState;
  private save: SaveData;

  /** 当前显示 MENU I 还是 MENU II */
  private showMenuII = false;
  /** 菜单光标 */
  private cursorIdx = 0;

  /** 回调: 打开商店 */
  private onOpenShop: (() => void) | null = null;
  /** 回调: 出击 → 战斗地图 */
  private onSortie: (() => void) | null = null;

  constructor(vdp: VDP, state: GameState, save: SaveData) {
    this.vdp = vdp;
    this.state = state;
    this.save = save;
  }

  setShopCallback(cb: () => void): void { this.onOpenShop = cb; }
  setSortieCallback(cb: () => void): void { this.onSortie = cb; }

  // ============================================================================
  // Scene 接口
  // ============================================================================

  init(): void {
    this.vdp.displayEnabled = true;
    this.showMenuII = false;
    this.cursorIdx = 0;
    // RAM $FFFFA61C = 5 (部署阶段)
    this.state.gameState = 5;
    console.log('[Deploy] MENU I 初始化');
  }

  update(dt?: number, input?: Mapper): void {
    if (!input) return;

    const items = this.showMenuII ? MENU_II_ITEMS : MENU_I_ITEMS;

    // 光标移动
    if (input.justPressed(Button.DOWN)) {
      this.cursorIdx = (this.cursorIdx + 1) % items.length;
    }
    if (input.justPressed(Button.UP)) {
      this.cursorIdx = (this.cursorIdx - 1 + items.length) % items.length;
    }

    // 确认选择
    if (input.justPressed(Button.A)) {
      this._handleSelect();
    }

    // B 键: MENU II → MENU I
    if (input.justPressed(Button.B) && this.showMenuII) {
      this.showMenuII = false;
      this.cursorIdx = 0;
    }
  }

  renderUI(ctx: CanvasRenderingContext2D): void {
    // 背景
    drawPanel(ctx, { x: 0, y: 0, w: 320, h: 224 }, 1.0);

    // 标题区域
    const titleY = 20;
    const title = this.showMenuII ? 'MENU II — 指挥官配置' : 'MENU I — 战前准备';
    drawTextLines(ctx, 80, titleY, [
      { text: title, color: '#ff0' },
    ], { fontSize: 14 });

    // 关卡信息
    drawTextLines(ctx, 80, titleY + 20, [
      { text: `剧本 ${this.save.scenarioId} | 金币:${this.save.gold}G`, color: '#aaa' },
    ], { fontSize: 11 });

    // 菜单列表
    const rect = { x: 60, y: 65, w: 200, h: 120 };
    const items = this.showMenuII ? MENU_II_ITEMS : MENU_I_ITEMS;
    drawMenuList(ctx, items, this.cursorIdx, rect, {
      fontSize: 12, lineHeight: 20,
      cursorColor: '#0ff',
      hiliteColor: '#ff0',
      hiliteBg: '#333',
    });

    // 底部提示
    const hints = this.showMenuII
      ? [{ text: '↑↓:选择 A:确认 B:退回MENU I', color: '#888' }]
      : [{ text: '↑↓:选择 A:确认', color: '#888' }];
    drawStatusBar(ctx, hints);
  }

  destroy(): void {}

  // ============================================================================
  // 内部
  // ============================================================================

  private _handleSelect(): void {
    if (this.showMenuII) {
      // MENU II 菜单处理
      switch (this.cursorIdx) {
        case 4: { // 出击 → BATTLE_MAP
          // RAM $FFFFA61C = 10 (切换到战斗)
          this.state.gameState = 10;
          this.onSortie?.();
          break;
        }
        // TODO: 1-4 项 (位置配置/移动顺序/自动配置/部队一览)
        default: break;
      }
    } else {
      // MENU I 菜单处理
      switch (this.cursorIdx) {
        case 2: { // 商店 → SHOP
          this.onOpenShop?.();
          break;
        }
        case 3: { // 指挥官配置 → MENU II
          this.showMenuII = true;
          this.cursorIdx = 0;
          break;
        }
        // TODO: 1,2 项 (兵士配属/道具装备)
        default: break;
      }
    }
  }
}
