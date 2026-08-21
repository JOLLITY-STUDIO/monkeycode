/**
 * OpeningSceneController — BOOT 开场场景 (TECMO Theater)
 * @bank 00 (BOOT 协程)
 *
 * 职责: 开场动画自动播放 (无需按键), 调色板渐显, 300 帧后切 TITLE。
 *
 * _applyBootPalette 必须 palWriteAll 写 DataStore.paletteTable 与 paletteRAM。
 *
 * 命名规范: 旧名 OpeningSceneController → 新名 OpeningSceneController (不变)。
 */
import { DataStore } from '../../data/store/DataStore';
import { BOOT_PALETTE, BOOT_TOTAL_FRAMES, BOOT_PALETTE_STEPS, BOOT_TEXT_START_FRAME } from '../../data/scene/opening-scene';

export interface OpeningDisplayState {
  frame: number;
  paletteStep: number;
  showText: boolean;
}

export class OpeningSceneController {
  protected _store: DataStore;
  protected _frame = 0;
  protected _paletteStep = 0;
  protected _initialized = false;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 开场初始化 (原 initBoot) */
  init(): void {
    this._frame = 0;
    this._paletteStep = 0;
    this._initialized = true;
    // 清空精灵
    this._store.oamShadow.clearAll(0xf8);
    // 应用开场调色板 (渐显初始全黑)
    this._applyBootPalette(0);
  }

  /** 每帧推进 (原 _spawnCoroutine + syncBootFrame) */
  update(frame: number): void {
    if (!this._initialized) this.init();
    this._frame = frame;
    // 调色板渐显: 前 BOOT_PALETTE_STEPS 帧每帧亮一级
    const step = Math.floor(frame / (BOOT_TOTAL_FRAMES / BOOT_PALETTE_STEPS));
    if (step !== this._paletteStep && step <= BOOT_PALETTE_STEPS) {
      this._paletteStep = step;
      this._applyBootPalette(step);
    }
  }

  /** 调色板渐显并写 DataStore.paletteTable (palWriteAll) */
  protected _applyBootPalette(step: number): void {
    // 渐显比例 (0..1), 从全黑淡入
    const t = Math.min(1, step / BOOT_PALETTE_STEPS);
    // 写实时调色板表
    this._store.setPaletteTable(BOOT_PALETTE);
    // 按渐显比例压暗 BG 调色板 (模拟 paletteWriteAll 渐显)
    const cur = this._store.paletteTable;
    const orig = BOOT_PALETTE;
    for (let p = 0; p < 4; p++) {
      for (let c = 0; c < 4; c++) {
        const o = orig.bgPalettes[p].colors[c];
        const col = cur.bgPalettes[p].colors[c];
        col.r = Math.round(o.r * t);
        col.g = Math.round(o.g * t);
        col.b = Math.round(o.b * t);
        const so = orig.sprPalettes[p].colors[c];
        const sc = cur.sprPalettes[p].colors[c];
        sc.r = Math.round(so.r * t);
        sc.g = Math.round(so.g * t);
        sc.b = Math.round(so.b * t);
      }
    }
    // 精灵清空 (开场无精灵)
    this._store.oamShadow.clearAll(0xf8);
  }

  get isTitle(): boolean {
    // 开场结束进入 TITLE
    return this._frame >= BOOT_TOTAL_FRAMES;
  }

  get displayState(): OpeningDisplayState {
    return {
      frame: this._frame,
      paletteStep: this._paletteStep,
      showText: this._frame >= BOOT_TEXT_START_FRAME,
    };
  }
}

export default OpeningSceneController;
