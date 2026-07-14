/**
 * ScenarioIntroScene.ts — 剧情提要 & 全体地图 (Canvas UI)
 *
 * ROM 入口: 0xCA00 之前的过渡阶段
 * 显示进攻路线图 + 简短剧情文字
 *
 * 触发: 名称输入完成 / 读档完成后, 进入 MENU I 前
 * 按 START 跳过 → DEPLOY
 *
 * 按键:
 *   START/A: 跳过 → DEPLOY
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import { drawPanel, drawTitle, drawStatusBar } from '../rendering/UI.js';

export class ScenarioIntroScene implements Scene {
  readonly name = 'ScenarioIntro';

  private vdp: VDP;

  /** 当前场景号 (显示用) */
  private scenarioId = 1;
  /** 剧情文本 (硬编码, 后续从 ROM 0x0C0000 提取) */
  private introText = '';

  private onDone: (() => void) | null = null;

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  open(scenarioId: number, onDone?: () => void): void {
    this.scenarioId = scenarioId;
    this.onDone = onDone || null;

    // 后续从 ROM 文本库按 scenarioId 索引提取
    switch (scenarioId) {
      case 1:
        this.introText = '大陆和平百年...\n艾尔文的旅程\n从萨尔拉斯城开始。';
        break;
      default:
        this.introText = `Scenario ${scenarioId}\n[待从 ROM 提取]`;
    }
  }

  // ============================================================================
  // Scene 接口
  // ============================================================================

  init(): void {
    this.vdp.displayEnabled = true;
    console.log(`[ScenarioIntro] 剧情提要 — 场景 ${this.scenarioId}`);
  }

  update(dt?: number, input?: Mapper): void {
    if (!input) return;
    // START 或 A 跳过
    if (input.justPressed(Button.START) || input.justPressed(Button.A)) {
      this.onDone?.();
    }
  }

  renderUI(ctx: CanvasRenderingContext2D): void {
    // 背景: 深蓝色 (模仿 Genesis 风格)
    drawPanel(ctx, { x: 0, y: 0, w: 320, h: 224 }, 1.0);

    // 场景标题
    drawTitle(ctx, `Scenario ${this.scenarioId}`, 30, {
      fontSize: 18, color: '#e94560',
    });

    // 剧情文字 (居中)
    const lines = this.introText.split('\n');
    ctx.font = '13px monospace';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ccc';
    const startY = 80;
    for (let i = 0; i < lines.length; i++) {
      const tw = ctx.measureText(lines[i]).width;
      ctx.fillText(lines[i], Math.floor((320 - tw) / 2), startY + i * 20);
    }

    drawStatusBar(ctx, [
      { text: 'START/A: 跳过', color: '#888' },
    ]);
  }

  destroy(): void {}
}
