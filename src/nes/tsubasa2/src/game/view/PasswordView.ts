/**
 * 密码界面 View — 读 PasswordDisplayState, 写 DataStore OAM 精灵。
 *
 * 真实 ROM (tsnes trace + 反汇编确认, 2026-08):
 *   - 静态假名网格/边框/标题: OAM 精灵 (PASSWORD_SPRITES, 真实 trace 数据)
 *   - 密码输入槽位 (16 字符): shadow OAM $0478 起步长 4 (Y/tile/attr/X), 2行×8列精灵
 *   - NT 背景 (Cut 0x17) 由 boot 协程委派 bank02.entryF(0) 写入, 本 View 不清屏
 *
 * 职责: 把 state.chars (0-35) 映射成 CHR tile 精灵写到 DataStore.sprites
 * (对应 NES NMI OAM DMA 传输), 光标位置 (state.charIdx) 调色板高亮。
 */
import { SceneView } from './SceneView';
import { passwordCharToTile, type PasswordDisplayState } from '../service/bank02_password.service';
import { PASSWORD_SPRITES } from '../data/password-sprites';

/** 光标高亮调色板 (attr 切换) */
const CURSOR_ATTR_HIGHLIGHT = 0x01;

/** 输入槽位精灵起始坐标 (对应 shadow OAM $0478: X=0x78, 2行×8列, 假名网格下方) */
const SLOT_X0 = 0x78;
const SLOT_Y0 = 0x88;
const SLOT_DX = 8;
const SLOT_DY = 16;

export class PasswordView extends SceneView {
  render(state: PasswordDisplayState): void {
    // 背景 NT (Cut 0x17) 由 boot 协程委派 bank02.entryF(0) 写入, 不清屏 (否则清掉背景)

    // 1. 静态假名网格/边框/标题精灵 (真实 trace)
    const sprites: Array<Record<string, unknown>> = PASSWORD_SPRITES.map((spr) => ({
      active: true,
      x: spr.x,
      y: spr.y,
      tile: spr.tile,
      palette: spr.attr & 0x03,
      priority: (spr.attr & 0x80) !== 0,
      flipH: (spr.attr & 0x20) !== 0,
      flipV: (spr.attr & 0x40) !== 0,
      bank: 0, // FIXME: CHR bank 待确认 (大概率 bank00/bank01 文字)
    }));

    // 2. 16 个密码输入槽位精灵 (真实 ROM shadow OAM $0478 起步长 4, 2行×8列)
    for (let i = 0; i < state.charCount; i++) {
      const col = i % state.cols;
      const row = Math.floor(i / state.cols);
      const isCursor = i === state.charIdx;
      sprites.push({
        active: true,
        x: SLOT_X0 + col * SLOT_DX,
        y: SLOT_Y0 + row * SLOT_DY,
        tile: passwordCharToTile(state.chars[i]),
        palette: (isCursor ? CURSOR_ATTR_HIGHLIGHT : 0) & 0x03,
        priority: false,
        flipH: false,
        flipV: false,
        bank: 0,
      });
    }
    this._store.sprites = sprites;
  }

  /** 重置 (切回本场景时背景由协程 entryF 重建, 无需清屏) */
  reset(): void {}
}
