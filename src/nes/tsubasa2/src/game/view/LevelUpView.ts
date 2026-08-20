/**
 * LevelUp View — 升级界面渲染层 (每场赛后显示选手经验/等级变化)
 *
 * 真实 ROM: 每场比赛结束后显示选手经验值增加 + 等级提升
 *   - 经验值 RAM $0454 + idx*2 (16bit)
 *   - 等级 RAM $0300 + idx*0C + 3
 *   - Guts RAM $0301 + idx*0C (16bit)
 *
 * 分层职责:
 *   service (LevelUpService) → 经验值/等级 RAM 读写
 *   view (本类) → 读 service state, 写 DataStore NT (选手名 + 等级 + 经验)
 *   core (FrameCompositor) → 合成像素帧
 *
 * 显示布局:
 *   标题: LEVEL UP
 *   11 选手列表: 序号 + 名字(简) + Lv + Exp
 */
import { SceneView } from './SceneView';
import type { NameTableEntry, SpriteEntry } from '../data/prg/DataStore';
import { getCharacterName, getCharacterNameCn, isGoalkeeper } from '../data/prg/character-list';
import { PLAYER_TEAMS } from '../data/rom-data/team-roster';
import type { LevelUpService, PlayerRamSlot } from '../service/levelup.service';

/** 玩家队 (Sao Paulo) 11 人首发 */
const PLAYER_TEAM = PLAYER_TEAMS[0];

export class LevelUpView extends SceneView {
  /** 读 LevelUpService, 写 NT 显示升级面板 */
  render(levelup: LevelUpService): void {
    this.clearScreen();

    // 标题
    this._drawText('LEVEL UP', 10, 2, true);

    // 11 选手列表: 序号 + 名字 + Lv + Exp
    const LIST_X = 2;
    const LIST_Y = 5;
    for (let i = 0; i < 11; i++) {
      const slot = levelup.getPlayerSlot(i);
      const playerId = PLAYER_TEAM.starters[i] ?? 0;
      const name = getCharacterName(playerId).slice(0, 8);
      const gk = isGoalkeeper(playerId) ? 'GK' : '  ';
      const lv = slot.level.toString().padStart(2, '0');
      const exp = slot.exp.toString().padStart(4, '0');
      const guts = slot.guts.toString().padStart(4, '0');
      const row = `${(i + 1).toString().padStart(2, '0')} ${name}${gk} L${lv} E${exp} G${guts}`.slice(0, 28);
      this._drawText(row, LIST_X, LIST_Y + i, false);
    }

    // 提示: 按 A/START 继续
    this._drawText('A/START ->', 18, 27, false);

    // 光标精灵 (闪烁箭头)
    this._renderCursor();
  }

  // ── 辅助: 写文本到 NT ──
  private _drawText(text: string, tileX: number, tileY: number, highlight: boolean): void {
    const CHR_BANK = 14;
    const entry: NameTableEntry = {
      tile: 0,
      palette: highlight ? 1 : 0,
      bank: CHR_BANK,
      flipH: false,
      flipV: false,
      behindBg: false,
    };
    for (let i = 0; i < text.length && tileX + i < 32; i++) {
      const c = text.charCodeAt(i);
      entry.tile = (c >= 0x20 && c <= 0x7E) ? c : 0x20;
      this._store.writeNT(0, tileX + i, tileY, entry);
    }
  }

  /** 光标精灵 (闪烁, 不随选手移动, 固定在标题旁) */
  private _renderCursor(): void {
    const sprites: SpriteEntry[] = [{
      active: true,
      x: 8 * 8,        // X=8 tile 位置 (标题左边)
      y: 2 * 8,        // Y=2 tile 位置
      tile: 0x7F,      // 箭头占位 tile
      palette: 1,
      priority: false,
      flipH: false,
      flipV: false,
      bank: 14,
    }];
    this._store.sprites = sprites;
  }
}
