/**
 * CharActionMenuScene.ts — 角色行动菜单 (Canvas UI)
 *
 * 触发: 战斗地图中选中己方角色按 A
 * 对应 execution-trace.md §2.5.1 角色行动菜单
 *
 * ROM 菜单对象: $FFFFA628 (菜单指针), $FFFFA984 (光标位置)
 *
 * 菜单选项:
 *   1. 移动  — 显示移动范围 → 选择目标位置
 *   2. 攻击  — 显示攻击范围 → 选择目标 → 战斗动画
 *   3. 魔法  — 显示可用魔法列表 → 施放
 *   4. 召唤  — 召唤职业特有 (消耗MP)
 *   5. 治疗  — HP+3, MP+2, 邻接佣兵HP+3
 *   6. 指令  — 佣兵AI (突击/防御/待机)
 *
 * 按键:
 *   ↑↓: 菜单光标
 *   A: 确认
 *   B: 取消 → 返回战斗地图
 *
 * 资料来源:
 *   execution-trace.md §2.5.1
 *   粉丝站: 战斗指令说明
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import { drawPanel, drawMenuList, drawStatusBar, TextLine } from '../rendering/UI.js';

/** 角色行动菜单项 (6 项) */
const ACTION_ITEMS: TextLine[] = [
  { text: '1. 移动',  color: '#ccc' },
  { text: '2. 攻击',  color: '#c44' },
  { text: '3. 魔法',  color: '#44c' },
  { text: '4. 召唤',  color: '#cc4' },
  { text: '5. 治疗',  color: '#4c4' },
  { text: '6. 指令',  color: '#ccc' },
];

export type CharActionType =
  | 'move' | 'attack' | 'magic'
  | 'summon' | 'heal'   | 'command'
  | 'cancel';

export class CharActionMenuScene implements Scene {
  readonly name = 'CharActionMenu';

  private vdp: VDP;
  private cursorIdx = 0;

  /** 当前选中的角色名称 (外部设置) */
  private charName = '';

  /** 回调: 返回动作类型 */
  private onAction: ((action: CharActionType) => void) | null = null;

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  setCharName(name: string): void { this.charName = name; }
  setOnAction(cb: (action: CharActionType) => void): void { this.onAction = cb; }

  // ============================================================================
  // Scene 接口
  // ============================================================================

  init(): void {
    this.vdp.displayEnabled = true;
    this.cursorIdx = 0;
    console.log('[CharActionMenu] 角色行动菜单 打开');
  }

  update(dt?: number, input?: Mapper): void {
    if (!input) return;

    if (input.justPressed(Button.DOWN)) {
      this.cursorIdx = (this.cursorIdx + 1) % ACTION_ITEMS.length;
    }
    if (input.justPressed(Button.UP)) {
      this.cursorIdx = (this.cursorIdx - 1 + ACTION_ITEMS.length) % ACTION_ITEMS.length;
    }

    if (input.justPressed(Button.A)) {
      const actions: CharActionType[] = [
        'move', 'attack', 'magic', 'summon', 'heal', 'command',
      ];
      this.onAction?.(actions[this.cursorIdx]);
    }

    if (input.justPressed(Button.B)) {
      this.onAction?.('cancel');
    }
  }

  renderUI(ctx: CanvasRenderingContext2D): void {
    // 半透明遮罩 (保留 VDP 战斗背景可见)
    drawPanel(ctx, { x: 0, y: 0, w: 320, h: 224 }, 0.25);

    // 菜单面板 (靠右侧)
    const pw = 150, ph = 160;
    const px = 160, py = 30;

    drawPanel(ctx, { x: px, y: py, w: pw, h: ph }, 0.92);

    // 角色名
    ctx.font = 'bold 12px monospace';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ff0';
    ctx.fillText(this.charName, px + 8, py + 6);

    // 分隔线
    ctx.strokeStyle = '#555';
    ctx.beginPath();
    ctx.moveTo(px + 8, py + 22);
    ctx.lineTo(px + pw - 8, py + 22);
    ctx.stroke();

    drawMenuList(ctx, ACTION_ITEMS, this.cursorIdx,
      { x: px + 8, y: py + 26, w: pw - 16, h: ph - 30 },
      { fontSize: 12, lineHeight: 20 });

    drawStatusBar(ctx, [
      { text: '↑↓:选择 A:确认 B:返回', color: '#888' },
    ]);
  }

  destroy(): void {}
}
