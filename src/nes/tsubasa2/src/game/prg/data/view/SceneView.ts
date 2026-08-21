/**
 * 场景 View 基类 — 渲染数据写入层 (对应 NES NMI 把 OAM/NT 写到 PPU)。
 *
 * 分层职责:
 *   service (逻辑)  → 返回 DisplayState (纯状态, 无渲染)
 *   view    (渲染写入) → 读 state, 写 DataStore NT/OAM/palette
 *   core/FrameCompositor + Renderer → 合成+呈现像素
 *
 * 每个 SceneView 对应一个场景, 由 Tsubasa2 主循环每帧调用 render(state)。
 * view 不持有逻辑状态, 只做 state→NT/OAM 的映射写入。
 */
import type { DataStore } from '../DataStore';

export abstract class SceneView {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 每帧渲染: 读 service state, 写 NT/OAM/palette 到 DataStore */
  abstract render(state: any): void;

  /** 进入场景时清屏 (对应 NES NT/OAM 清零) */
  clearScreen(): void {
    // OAM 清零 (对应 ram_04A5 区清空)
    this._store.clearOAM();
    // NT 清零 (对应 $9F04 区清空, 遍历写空白 tile)
    const blank = { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false };
    for (let y = 0; y < this._store.nt0.length; y++) {
      for (let x = 0; x < 32; x++) this._store.writeNT(0, x, y, blank);
    }
    for (let y = 0; y < this._store.nt1.length; y++) {
      for (let x = 0; x < 32; x++) this._store.writeNT(1, x, y, blank);
    }
    this._store.sprites = [];
  }
}
