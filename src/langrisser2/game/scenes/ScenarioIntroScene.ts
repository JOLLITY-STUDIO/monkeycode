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
import { drawPanel, drawStatusBar } from '../rendering/UI.js';
import { getPrologue, getScenarioTitle } from '../data/DialogueData.js';

export class ScenarioIntroScene implements Scene {
  readonly name = 'ScenarioIntro';

  private vdp: VDP;

  /** 当前场景号 (显示用) */
  private scenarioId = 1;
  /** 剧情文本 (从 DialogueData 提取) */
  private introText = '';
  /** 场景标题 */
  private scenarioTitle = '';

  private onDone: (() => void) | null = null;

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  open(scenarioId: number, onDone?: () => void): void {
    this.scenarioId = scenarioId;
    this.onDone = onDone || null;

    // 从 ROM 0x0C0000 区域提取的对话脚本 (通过解析 english-script.txt)
    this.scenarioTitle = getScenarioTitle(scenarioId);
    const prologue = getPrologue(scenarioId);

    if (prologue) {
      // 剧情提要文本 (ROM 0x0C0000 SJIS → english-script.txt 翻译)
      this.introText = prologue;
    } else {
      // 后备: 未提取到数据的关卡
      this.introText = `[剧情文本待提取 — Scenario ${scenarioId}]`;
    }
  }

  // ============================================================================
  // Scene 接口
  // ============================================================================

  init(): void {
    this.vdp.displayEnabled = true;
    console.log(`[ScenarioIntro] 剧情提要 — Scenario ${this.scenarioId}: ${this.scenarioTitle}`);
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

    // 场景标题 — 直接用 ctx.fillText 避免 FontRenderer 的 DOM 依赖
    ctx.font = 'bold 18px "Noto Sans JP", sans-serif';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e94560';
    ctx.fillText(this.scenarioTitle, 160, 30);

    // 剧情文字 (自动换行)
    ctx.font = '12px monospace';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ccc';
    const maxW = 290;
    const startX = 15;
    const startY = 75;
    const lineH = 15;
    const maxLines = 9;

    // 简单换行
    const words = this.introText.split(' ');
    const lines: string[] = [];
    let cur = '';
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (ctx.measureText(test).width > maxW) {
        if (cur) lines.push(cur);
        cur = w;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);

    for (let i = 0; i < Math.min(lines.length, maxLines); i++) {
      ctx.fillText(lines[i], startX, startY + i * lineH);
    }

    drawStatusBar(ctx, [
      { text: 'START/A: 跳过故事 → 出击准备', color: '#888' },
    ]);
  }

  destroy(): void {}
}
