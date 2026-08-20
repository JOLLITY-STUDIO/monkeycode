/**
 * FrameCompositor — 帧合成器 (game 层)
 *
 * 消费 DataStore (NT/OAM/调色板/CHR) → Uint32Array 帧缓冲 (RGBA8888)。
 * 对应 NES PPU 一帧渲染: NT tile → pattern table → palette → 像素。
 *
 * 微信小程序无 DOM, 纯计算合成, 结果交 Renderer.putImageData。
 */
import type { DataStore } from './data/prg/DataStore';

export class FrameCompositor {
  /** CHR Bank 注册表 (16 个, 每个 8KB=512 tiles) */
  private _chrBanks: Map<number, Uint8Array> = new Map();
  /** 帧缓冲 (RGBA8888, NES_WIDTH*NES_HEIGHT) */
  private _frameBuf: Uint32Array;

  constructor(private _store: DataStore) {
    this._frameBuf = new Uint32Array(256 * 240);
  }

  /** 注册 CHR Bank 数据 */
  registerChrBank(bankId: number, data: Uint8Array): void {
    this._chrBanks.set(bankId, data);
  }

  /**
   * 合成一帧 → 返回 RGBA8888 帧缓冲。
   * 当前实现: 简化版, 读 NT0 + palette + CHR → 像素。
   * TODO: OAM 精灵叠加 / 滚动 / NT1。
   */
  compose(): Uint32Array {
    const store = this._store;
    const nt0 = store.nt0;
    const buf = this._frameBuf;

    // 简化: 遍历 NT0 (32×30 tiles), 每个 tile 8×8 像素
    for (let ty = 0; ty < 30; ty++) {
      for (let tx = 0; tx < 32; tx++) {
        const entry = nt0[ty * 32 + tx];
        if (!entry) continue;
        const chrBank = this._chrBanks.get(entry.bank);
        if (!chrBank) continue;
        // tile 索引 × 16 = pattern data 偏移
        const tileBase = entry.tile * 16;
        for (let py = 0; py < 8; py++) {
          const p0 = chrBank[tileBase + py] || 0;
          const p1 = chrBank[tileBase + 8 + py] || 0;
          for (let px = 0; px < 8; px++) {
            const bit = 7 - px;
            const colorIdx = ((p1 >> bit) & 1) << 1 | ((p0 >> bit) & 1);
            // TODO: 查 palette 取真实颜色, 当前用灰度占位
            const gray = colorIdx * 85; // 0/85/170/255
            const rgba = (255 << 24) | (gray << 16) | (gray << 8) | gray;
            const x = tx * 8 + px;
            const y = ty * 8 + py;
            if (x < 256 && y < 240) {
              buf[y * 256 + x] = rgba;
            }
          }
        }
      }
    }
    return buf;
  }
}
