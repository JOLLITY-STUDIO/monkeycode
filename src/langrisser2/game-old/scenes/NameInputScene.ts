/**
 * NameInputScene.ts — 名称输入画面 (Canvas UI)
 *
 * ROM 入口: 0xCCB0 — 假名选择循环 (execution-trace.md §2.2)
 * 任务链: 0xCA32 (init) → 0xCA68 (UI加载: 资源0x8001) → 0xCA8A (过渡)
 *         → 0xCA9E (假名面板绘制) → 0xCCB0 (选择循环)
 *
 * RAM 状态:
 *   $FF78FA = 0xFFFF (新游戏标志, 触发条件)
 *   $FFFFA612 = 假名选择索引 (0-31, 上半≤27 / 下半28-31)
 *   $FFFF94A2 = ROM 0x082114 字体数据指针
 *
 * 按键:
 *   ↑↓: 移动假名光标
 *   A: 确定当前字符
 *   B: 退格删除
 *   START: 确认完成 → 进入 MENU I (DEPLOY)
 *
 * 资料来源:
 *   execution-trace.md §2.2 名称输入画面
 *   rom.asm §0xCCB0 循环
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import { drawPanel, drawTextLines, drawStatusBar, TextLine } from '../rendering/UI.js';

export class NameInputScene implements Scene {
  readonly name = 'NameInput';

  private vdp: VDP;
  private onDone: (() => void) | null = null;

  /** 默认名称 = エルウィン (艾尔文) */
  private nameChars: string[] = [
    'エ', 'ル', 'ウ', 'ィ', 'ン', '', '', '', '', '', '', '',
  ];
  private nameIdx = 0;  // 当前编辑字符位置

  /** 假名面板 — 32 个假名, 5 列布局 (ROM 0x082114) */
  private readonly kanaPanel: string[] = [
    'ア', 'イ', 'ウ', 'エ', 'オ',
    'カ', 'キ', 'ク', 'ケ', 'コ',
    'サ', 'シ', 'ス', 'セ', 'ソ',
    'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
    'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ',
  ];

  private kanaRow = 0;  // 假名面板行光标
  private kanaCol = 0;  // 假名面板列光标
  private readonly KANA_COLS = 5;

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  /** 设置完成回调 → DEPLOY */
  setOnDone(cb: () => void): void { this.onDone = cb; }

  // ============================================================================
  // Scene 接口
  // ============================================================================

  init(): void {
    this.vdp.displayEnabled = true;
    console.log('[NameInput] 名称输入画面 初始化');
  }

  update(dt?: number, input?: Mapper): void {
    if (!input) return;

    const dir = input.getDirection();
    if (dir.y !== 0) {
      this.kanaRow = (this.kanaRow + dir.y + Math.ceil(this.kanaPanel.length / this.KANA_COLS))
        % Math.ceil(this.kanaPanel.length / this.KANA_COLS);
    }
    if (dir.x !== 0) {
      this.kanaCol = (this.kanaCol + dir.x + this.KANA_COLS) % this.KANA_COLS;
    }

    if (input.justPressed(Button.A)) {
      const ci = this.kanaRow * this.KANA_COLS + this.kanaCol;
      if (ci < this.kanaPanel.length && this.nameIdx < this.nameChars.length) {
        this.nameChars[this.nameIdx] = this.kanaPanel[ci];
        this.nameIdx++;
      }
    }
    if (input.justPressed(Button.B)) {
      if (this.nameIdx > 0) {
        this.nameIdx--;
        this.nameChars[this.nameIdx] = '';
      }
    }
    if (input.justPressed(Button.START)) {
      // 确认名称 → MENU I
      this.onDone?.();
    }
  }

  renderUI(ctx: CanvasRenderingContext2D): void {
    // 背景
    drawPanel(ctx, { x: 0, y: 0, w: 320, h: 224 }, 1.0);

    // 标题
    drawTextLines(ctx, 100, 20, [
      { text: '名前を決めて下さい', color: '#ff0' },
    ], { fontSize: 14 });

    // 当前名称
    const curName = this.nameChars.filter(c => c).join('');
    drawTextLines(ctx, 60, 50, [
      { text: curName.padEnd(12, '_'), color: '#fff' },
    ], { fontSize: 16 });

    // 假名面板
    const kanaLines: TextLine[] = [];
    for (let r = 0; r < Math.ceil(this.kanaPanel.length / this.KANA_COLS); r++) {
      let line = '';
      for (let c = 0; c < this.KANA_COLS; c++) {
        const ci = r * this.KANA_COLS + c;
        if (ci < this.kanaPanel.length) {
          line += this.kanaPanel[ci] + ' ';
        } else {
          line += '   ';
        }
      }
      kanaLines.push({
        text: line,
        color: r === this.kanaRow ? '#ff0' : '#aaa',
      });
    }
    drawTextLines(ctx, 52, 80, kanaLines, { fontSize: 14, lineHeight: 18 });

    // 底部提示
    drawStatusBar(ctx, [
      { text: '↑↓←→:选择假名 A:确定 B:退格 START:完成', color: '#888' },
    ]);
  }

  destroy(): void {}
}
