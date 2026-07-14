/**
 * IntermissionScene.ts — 战后结算/场景切换 (Canvas UI)
 *
 * ROM 入口: FUN_0001D1C0 (场景切换函数), ROM 0x1CFC2 (execution-trace.md §2.7)
 *
 * 流程 (对应 ROM 逻辑):
 *   1. 检查胜利条件达成
 *   2. 经验值结算 / 角色升级弹窗
 *   3. 道具获得提示
 *   4. 剧情对话 (如有) → DIALOGUE
 *   5. 设置下一场景: $FFFFAE90 → $FFFFA49C
 *   6. FUN_00010aec (新场景角色槽初始化)
 *   7. FUN_00009172 (场景激活, $FFFF95AE=1)
 *   8. → 回到 MENU I (DEPLOY) 下一关
 *
 * 场景范围: 1-31 (31关)
 *
 * 按键:
 *   A/START: 推进结算
 *
 * 资料来源:
 *   execution-trace.md §2.7 战后结算
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import { SaveData } from '../systems/SaveSystem.js';
import { drawPanel, drawTextLines, drawStatusBar, TextLine } from '../rendering/UI.js';

interface ResultLine {
  label: string;
  value: string;
  color?: string;
}

export class IntermissionScene implements Scene {
  readonly name = 'Intermission';

  private vdp: VDP;
  private save: SaveData = null!;

  private results: ResultLine[] = [];
  private phase = 0;  // 0=结算中, 1=结算完成
  private phaseTimer = 0;
  private onDone: (() => void) | null = null;

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  /**
   * 打开战后结算
   * @param save   存档数据
   * @param xpGain 总经验获得
   * @param newItems 获得的新道具
   * @param onDone 结算完成后回调 → DEPLOY (下一关)
   */
  open(save: SaveData, xpGain: number, newItems: string[], onDone?: () => void): void {
    this.save = save;
    this.onDone = onDone || null;
    this.phase = 0;
    this.phaseTimer = 0;

    this.results = [
      { label: '--- 战斗结算 ---', value: '', color: '#ff0' },
      { label: '剧本', value: `场景 ${save.scenarioId}` },
      { label: '经验值', value: `+${xpGain}` },
      { label: '金币', value: `${save.gold}G` },
      { label: '存活角色', value: `${save.characters.filter(c => c.alive).length}人` },
    ];

    if (newItems.length > 0) {
      this.results.push({ label: '--- 获得道具 ---', value: '', color: '#afa' });
      for (const name of newItems) {
        this.results.push({ label: `  ${name}`, value: '' });
      }
    } else {
      this.results.push({ label: '(无道具获得)', value: '', color: '#888' });
    }
  }

  // ============================================================================
  // Scene 接口
  // ============================================================================

  init(): void {
    this.vdp.displayEnabled = true;
    console.log('[Intermission] 战后结算 初始化');
  }

  update(dt?: number, input?: Mapper): void {
    this.phaseTimer++;

    if (this.phase === 0 && (input?.justPressed(Button.A) || input?.justPressed(Button.START))) {
      this.phase = 1;
    }

    if (this.phase === 1) {
      this.onDone?.();
    }
  }

  renderUI(ctx: CanvasRenderingContext2D): void {
    drawPanel(ctx, { x: 0, y: 0, w: 320, h: 224 }, 1.0);

    drawTextLines(ctx, 100, 16, [
      { text: '--- 战斗结算 ---', color: '#ff0' },
    ], { fontSize: 16 });

    const rect = { x: 40, y: 42, w: 240, h: 140 };
    drawPanel(ctx, rect, 0.85);

    const lines: TextLine[] = this.results.map(r => ({
      text: r.label + (r.value ? ` ${r.value}` : ''),
      color: r.color,
    }));

    drawTextLines(ctx, rect.x + 8, rect.y + 6, lines, {
      fontSize: 11, lineHeight: 15,
    });

    if (this.phase === 0) {
      drawStatusBar(ctx, [
        { text: 'A/START: 继续', color: '#888' },
      ]);
    }
  }

  destroy(): void {}
}
