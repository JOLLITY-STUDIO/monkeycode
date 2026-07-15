/**
 * DialogueScene.ts — 剧情对话/过场场景 (Canvas UI)
 *
 * ROM 入口: 0x09FFE — 文本/剧本系统 (execution-trace.md §2.7)
 * 数据源: ROM $05E000-$06FFFF (SJIS 脚本) → english-script.txt → DialogueData.ts
 *
 * 用途:
 *   - 开场剧情 (战斗前剧情提要)
 *   - 关卡间剧情过场
 *   - 角色对话
 *
 * 按键:
 *   A/START: 推进对话/跳过
 *   B: 加速跳过
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import { drawPanel, drawTextLines, drawStatusBar, TextLine } from '../rendering/UI.js';
import type { DialogueLine } from '../data/DialogueData.js';

export class DialogueScene implements Scene {
  readonly name = 'Dialogue';

  private vdp: VDP;
  private lines: DialogueLine[] = [];
  private currentIdx = 0;

  private onDone: (() => void) | null = null;

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  /** 设置对话内容和完成回调 */
  open(lines: DialogueLine[], onDone?: () => void): void {
    this.lines = lines;
    this.currentIdx = 0;
    this.onDone = onDone || null;
  }

  get isFinished(): boolean { return this.currentIdx >= this.lines.length; }

  // ============================================================================
  // Scene 接口
  // ============================================================================

  init(): void {
    this.vdp.displayEnabled = true;
    console.log('[Dialogue] 对话场景 初始化');
  }

  update(dt?: number, input?: Mapper): void {
    if (!input) return;

    if (input.justPressed(Button.A) || input.justPressed(Button.START)) {
      this.currentIdx++;
      if (this.currentIdx >= this.lines.length) {
        this.onDone?.();
      }
    }
  }

  renderUI(ctx: CanvasRenderingContext2D): void {
    // 背景
    drawPanel(ctx, { x: 0, y: 0, w: 320, h: 224 }, 1.0);

    const line = this.lines[this.currentIdx];
    if (!line) return;

    // 对话框 (底部)
    const dw = 308, dh = 72;
    const dx = 6, dy = 224 - dh - 6;
    drawPanel(ctx, { x: dx, y: dy, w: dw, h: dh }, 0.92);

    // 说话者名称
    drawTextLines(ctx, dx + 8, dy + 4, [
      { text: line.speaker, color: '#ff0' },
    ], { fontSize: 12 });

    // 分隔线
    ctx.strokeStyle = '#555';
    ctx.beginPath();
    ctx.moveTo(dx + 8, dy + 20);
    ctx.lineTo(dx + dw - 8, dy + 20);
    ctx.stroke();

    // 对话文本 (自动换行)
    const words = line.text.split('');
    const maxW = dw - 20;
    let curLine = '';
    let row = 0;
    ctx.font = '11px monospace';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#fff';

    for (const ch of words) {
      const test = curLine + ch;
      if (ctx.measureText(test).width > maxW) {
        ctx.fillText(curLine, dx + 8, dy + 24 + row * 14);
        curLine = ch;
        row++;
      } else {
        curLine = test;
      }
    }
    if (curLine) {
      ctx.fillText(curLine, dx + 8, dy + 24 + row * 14);
    }

    // 底部提示
    drawStatusBar(ctx, [
      { text: `A/START:继续 (${this.currentIdx + 1}/${this.lines.length})`, color: '#888' },
    ]);
  }

  destroy(): void {}
}
