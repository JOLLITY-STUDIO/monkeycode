/**
 * OpeningSceneController — BOOT 开场场景 (TECMO Theater)
 * @bank 00 (BOOT 协程)
 *
 * 职责: 开场动画自动播放 (无需按键), 调色板渐显, 300 帧后切 TITLE。
 *
 * 命名规范: 旧名 OpeningSceneController → 新名 OpeningSceneController (不变)。
 *
 * TODO: 翻译 BOOT 协程 + 调色板渐显
 */
import { DataStore } from '../../data/store/DataStore';

export interface OpeningDisplayState {
  frame: number;
  paletteStep: number;
  showText: boolean;
}

export class OpeningSceneController {
  protected _store: DataStore;
  protected _frame = 0;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 开场初始化 (原 initBoot) */
  init(): void {
    // TODO: 翻译 BOOT 初始化
  }

  /** 每帧推进 (原 _spawnCoroutine + syncBootFrame) */
  update(frame: number): void {
    this._frame = frame;
    // TODO: 翻译 BOOT 协程每帧逻辑
  }

  get isTitle(): boolean {
    // TODO: 开场结束进入 TITLE 判断
    return this._frame >= 300;
  }
}

export default OpeningSceneController;
