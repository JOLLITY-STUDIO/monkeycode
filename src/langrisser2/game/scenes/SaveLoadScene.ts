/**
 * SaveLoadScene.ts — 存档/读档界面 (Canvas UI)
 *
 * ROM 入口: SRAM 系统 (execution-trace.md §附加: 存档系统)
 *
 * 触发:
 *   - 标题画面选 LOAD
 *   - 战斗 START 菜单选 SAVE/LOAD
 *
 * 模式:
 *   SAVE: 选择空槽位 → 保存当前进度
 *   LOAD: 选择已有存档槽位 → 读取并继续
 *
 * 按键:
 *   ↑↓: 选择槽位
 *   A: 确认
 *   B: 取消/返回
 *
 * 资料来源:
 *   execution-trace.md §存档系统
 */

import { VDP } from '../hw/vdp/vdp.js';
import { Scene } from '../core/SceneManager.js';
import { Mapper, Button } from '../systems/InputSystem.js';
import { SaveData, saveData as doSave, loadData } from '../systems/SaveSystem.js';
import { drawPanel, drawMenuList, drawStatusBar, TextLine } from '../rendering/UI.js';

type SaveLoadMode = 'save' | 'load';

export class SaveLoadScene implements Scene {
  readonly name = 'SaveLoad';

  private vdp: VDP;
  private mode: SaveLoadMode = 'load';

  private cursorIdx = 0;
  private save: SaveData | null = null;

  /** 存档槽位列表 (默认 4 个槽) */
  private readonly slotCount = 4;

  /** 回调: 完成操作 → 返回 (携带读取到的 saveData, 或 null) */
  private onDone: ((saved: SaveData | null) => void) | null = null;

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  /** 打开存/读档界面 */
  open(mode: SaveLoadMode, currentSave: SaveData, onDone: (saved: SaveData | null) => void): void {
    this.mode = mode;
    this.save = currentSave;
    this.cursorIdx = 0;
    this.onDone = onDone;
  }

  // ============================================================================
  // Scene 接口
  // ============================================================================

  init(): void {
    this.vdp.displayEnabled = true;
    console.log(`[SaveLoad] ${this.mode === 'save' ? '存档' : '读档'} 界面 初始化`);
  }

  update(dt?: number, input?: Mapper): void {
    if (!input) return;

    if (input.justPressed(Button.DOWN)) {
      this.cursorIdx = (this.cursorIdx + 1) % this.slotCount;
    }
    if (input.justPressed(Button.UP)) {
      this.cursorIdx = (this.cursorIdx - 1 + this.slotCount) % this.slotCount;
    }

    if (input.justPressed(Button.A)) {
      if (this.mode === 'save') {
        this._doSave();
      } else {
        this._doLoad();
      }
    }

    if (input.justPressed(Button.B)) {
      this.onDone?.(null);
    }
  }

  renderUI(ctx: CanvasRenderingContext2D): void {
    drawPanel(ctx, { x: 0, y: 0, w: 320, h: 224 }, 1.0);

    const title = this.mode === 'save' ? '存档 (SAVE)' : '读档 (LOAD)';
    ctx.font = 'bold 14px monospace';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ff0';
    const tw = ctx.measureText(title).width;
    ctx.fillText(title, Math.floor((320 - tw) / 2), 16);

    // 槽位列表
    const items: TextLine[] = [];
    for (let i = 0; i < this.slotCount; i++) {
      const loaded = loadData(i + 1);
      const info = loaded
        ? `槽位 ${i + 1} | 剧本${loaded.scenarioId} | 回合${loaded.turn} | ${loaded.timestamp ? new Date(loaded.timestamp).toLocaleDateString() : ''}  `
        : `槽位 ${i + 1} | --- 空 ---`;
      items.push({
        text: info,
        color: loaded ? '#cfc' : '#888',
      });
    }

    const rect = { x: 16, y: 45, w: 288, h: 120 };
    drawMenuList(ctx, items, this.cursorIdx, rect, {
      fontSize: 11, lineHeight: 28,
      cursorColor: '#ff0',
    });

    drawStatusBar(ctx, [
      { text: `↑↓:选择 A:${this.mode === 'save' ? '保存' : '读取'} B:返回`, color: '#888' },
    ]);
  }

  destroy(): void {}

  // ============================================================================
  // Private
  // ============================================================================

  private _doSave(): void {
    if (!this.save) return;
    this.save.slot = this.cursorIdx + 1;
    this.save.timestamp = Date.now();
    const result = doSave(this.save);
    if (result.success) {
      console.log(`[SaveLoad] 已保存到槽 ${this.save.slot}`);
      this.onDone?.(this.save);
    }
  }

  private _doLoad(): void {
    const loaded = loadData(this.cursorIdx + 1);
    if (loaded) {
      console.log(`[SaveLoad] 从槽 ${this.cursorIdx + 1} 读取 (剧本${loaded.scenarioId})`);
      this.onDone?.(loaded);
    }
    // 空槽位不响应
  }
}
