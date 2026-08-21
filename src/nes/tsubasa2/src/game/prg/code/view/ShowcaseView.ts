/**
 * 演出画面 View — 球员射门特写 + 名字横幅 + 球
 *
 * 对应 Bank31 $E93D 演出精灵展开 + Bank26 技能演出渲染。
 * 读 Bank26ShowcaseExecutor 的 DisplayState, 写 OAM 精灵 (RamStore.oam)。
 *
 * 精灵块语义 (showcase-data.ts):
 *   block = { x, y, rows, perRow, tiles[][] }
 *   tiles[r][c] = CHR tile 索引 (0x00 = 透明跳过)
 *   位置: (x + c*8, y + r*8) 像素
 *
 * CHR bank: 7 (人脸特写 + 名字横幅 tile 所在 bank)。
 * 普通射门 (skill 0x00): 特写块 + 名字横幅 + 球飞向球门。
 *
 * TODO:
 *   - 演出 #3D/#38 的独立布局 (当前共用特写块)
 *   - 名字横幅 tile 字体渲染 (当前直接用块内 tile)
 */
import { SceneView } from './SceneView';
import type { ShowcaseDisplayState } from '../bank26_showcase-executor';

/** 演出精灵 CHR bank (人脸特写图案所在) */
export const SHOWCASE_CHR_BANK = 7;

/** 球 tile (CHR bank 7 圆形球) */
const BALL_TILE = 0x60;

export class ShowcaseView extends SceneView {
  /** 上一帧演出占用的精灵槽数 (用于本帧清理, 不误伤其他 OAM 用户) */
  private _prevSlotCount = 0;

  render(state: ShowcaseDisplayState): void {
    const oam = this._store.oam;

    // 清理上一帧演出精灵槽 (不清 OamManager 其他用户的槽)
    for (let i = 0; i < this._prevSlotCount && i < oam.slotCount(); i++) {
      oam.clearSlot(i);
    }
    this._prevSlotCount = 0;

    // 演出结束 → 隐藏特写
    if (!state.active || !state.block) {
      // 仅当 OamManager 有内容时才整体导出 — 空表时导出 [] 会冲掉
      // 其他 View (PasswordView/BOOT) 直接写入 store.sprites 的精灵
      if (oam.slotCount() > 0) oam.emitSprites();
      return;
    }

    // 每帧重建精灵 (writeSlot → setPos → emitSprites)
    let slot = 0;
    const block = state.block;
    const baseX = block.x + state.xOff;
    const baseY = block.y;

    // ── 特写块: 每行每列写一个 8×8 精灵 ──
    for (let r = 0; r < block.rows; r++) {
      for (let c = 0; c < block.perRow; c++) {
        const tile = block.tiles[r][c];
        if (tile === 0) continue; // 透明
        if (slot >= 64) break;
        oam.writeSlot(slot, 0, tile, 0);
        oam.setBank(slot, SHOWCASE_CHR_BANK);
        oam.setPos(slot, baseX + c * 8, baseY + r * 8, true);
        slot++;
      }
    }

    // ── 普通射门: 球从特写位置飞向球门 (上方) ──
    // 对应 Bank26 $911C 演出推进: X += 4 / Y 按符号跳变 (H5 简化为抛物线)
    if (slot < 64) {
      const t = state.frame / 90;
      const cx = baseX + ((block.perRow >> 1) << 3);
      const cy = baseY + 4;
      const bx = cx - 8 + t * 160;
      const by = cy - 4 - Math.sin(t * Math.PI) * 40 - t * 30;
      oam.writeSlot(slot, 0, BALL_TILE, 0);
      oam.setBank(slot, SHOWCASE_CHR_BANK);
      oam.setPos(slot, Math.round(bx), Math.round(by), true);
      slot++;
    }

    this._prevSlotCount = slot;
    oam.emitSprites();
  }

  /** 强制隐藏演出精灵 (切场景时调用) */
  hide(): void {
    const oam = this._store.oam;
    for (let i = 0; i < this._prevSlotCount && i < oam.slotCount(); i++) {
      oam.clearSlot(i);
    }
    this._prevSlotCount = 0;
    oam.emitSprites();
  }
}
