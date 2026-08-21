/**
 * OpeningSceneController — BOOT 开场场景 (TECMO Theater)
 * @bank 00 (BOOT 协程) / bank0 渲染子程
 *
 * 职责: 开场动画自动播放 (无需按键), 调色板渐显, 300 帧后切 TITLE。
 *
 * init(): 灌入真实 BOOT 场景数据 (NT0 文本 + 40 精灵 + 调色板渐显起点)。
 * update(): 按 bank0 $9A71 fade 机制逐帧推进调色板渐显 (bootFadeStep/bootFadeByte)。
 *
 * 精灵 pattern: BOOT_SPR_CHR_SEGMENTS (CHR bank 14/10) 由组合根 writeStoreToPpu
 * 直写 PPU pattern table 1 (ptTile[0x100+tile]), 本控制器不持有 PPU。
 */
import { DataStore } from '../../data/store/DataStore';
import {
  BOOT_OAM,
  BOOT_TOTAL_FRAMES,
  buildBootNT,
  buildBootPalette,
  bootFadeStep,
} from '../../data/scene/boot-scene';

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

  /** 开场初始化 (原 initBoot): 灌 NT0 + 40 精灵 + 调色板渐显起点(全黑) */
  init(): void {
    this._frame = 0;
    this._paletteStep = 0;
    this._initialized = true;
    // NT0 背景 (标题字母 + 版权文字 tile)
    this._store.nt0 = buildBootNT();
    // 40 精灵 → 影子 OAM → 硬件 OAM ($0200, writeOam 消费)
    this._store.oamShadow.clearAll(0xf8);
    BOOT_OAM.forEach((s, i) => {
      this._store.oamShadow.writeSlot(i * 4, s.y, s.tile, s.attr, s.x);
    });
    this._store.oamShadow.copyToHw();
    // 调色板: step 0 = 全黑 (渐显起点)
    this._store.setPaletteTable(buildBootPalette(0));
  }

  /** 每帧推进 (原 _spawnCoroutine + syncBootFrame): 调色板渐显 */
  update(frame: number): void {
    if (!this._initialized) this.init();
    this._frame = frame;
    // bank0 $9A71 fade: 帧 11 起每 2 帧升一级, 9 级封顶
    const step = bootFadeStep(frame);
    if (step !== this._paletteStep) {
      this._paletteStep = step;
      this._store.setPaletteTable(buildBootPalette(step));
    }
  }

  get isTitle(): boolean {
    // 开场结束进入 TITLE
    return this._frame >= BOOT_TOTAL_FRAMES;
  }

  get displayState(): OpeningDisplayState {
    return {
      frame: this._frame,
      paletteStep: this._paletteStep,
      showText: this._frame >= 60,
    };
  }
}

export default OpeningSceneController;
