/**
 * Meeting View — MEETING 赛前会议界面 (含 チームデータ 子菜单) 渲染层。
 *
 * 真实 ROM (Bank01 DataQueryService 已转写 service 层):
 *   - 主菜单 4 项: 情報/スコアメモ/チームデータ/キックオフ
 *   - チームデータ子菜单 5 项: フォーメーション/ディフェンスタイプ/チェンジ/レベル/もどる
 *   - 二级: 阵型 4 / 防守 3 / 换人 3 / 等级 4
 *   - 三级: 选选手 11 人
 *
 * 分层职责:
 *   service (DataQueryService) → 维护菜单状态机, 返回 TeamDataDisplayState
 *   view (本类) → 读 state, 写 DataStore NT (菜单项字符) + OAM (光标精灵)
 *   core (FrameCompositor) → 合成像素帧
 *
 * 渲染策略:
 *   - NT 背景用 ASCII 字符 tile (便于验证, 真实 ROM 用日文假名 tile)
 *   - 光标用 OAM 精灵 (tile=0x7F 箭头占位, 真实 ROM 用专属光标 tile)
 *   - 当前选中项 tile 调色板高亮 (palette=1)
 *   - 每帧重写 NT (清屏 → 重绘) — NES NMI 风格
 */
import { SceneView } from './SceneView';
import type { TeamDataDisplayState } from '../service/bank01_data-query.service';
import type { SpriteEntry, NameTableEntry } from '../data/DataStore';
import { getCharacterName, getCharacterNameCn, isGoalkeeper } from '../data/prg/character-list';
import { getPlayerStatsById, codeToStamina, codeToAbility } from '../data/rom-data/player-stats';
import { PLAYER_TEAMS } from '../data/rom-data/team-roster';
import { SHOT_DIGITS, DRIBBLE_DIGITS, PASS_DIGITS, getSpecialMoves } from '../data/rom-data/special-moves';

// ── CHR Bank (文字 tile, 暂用 bank 14 与标题背景一致) ──
const CHR_BANK = 14;

// ── 光标精灵 tile (占位: 箭头符号) ──
const CURSOR_TILE = 0x7F;

// ── 菜单坐标 (NT tile 位置) ──
/** 主菜单起点 (X=4, Y=8) */
const MAIN_MENU_X = 4;
const MAIN_MENU_Y = 8;
/** 主菜单行距 */
const MENU_DY = 2;

// ── ASCII → tile 索引映射 (bank 14 偏移, 待对齐真实 CHR) ──
// 真实 ROM 用日文假名 tile; H5 占位用 ASCII 可见字符, A=$41..Z=$5A, a=$61..z=$7A, 0=$30..9=$39
function asciiToTile(ch: string): number {
  const c = ch.charCodeAt(0);
  if (c >= 0x20 && c <= 0x7E) return c;
  return 0x20; // 空格
}

// ── 菜单文本 (说明书原文日文, 此处用罗马字/英文占位, 真实 ROM 是假名) ──
const MAIN_MENU_ITEMS = [
  'JOUHOU',      // 情報
  'SCORE MEMO',  // スコアメモ
  'TEAM DATA',   // チームデータ
  'KICK OFF',    // キックオフ
];

const SUB_MENU_ITEMS = [
  'FORMATION',     // フォーメーション
  'DEFENSE TYPE',  // ディフェンスタイプ
  'CHANGE',        // チェンジ
  'LEVEL',         // レベル
  'BACK',          // もどる
];

const FORMATION_ITEMS = [
  '4-3-3',
  '4-4-2',
  '3-5-2',
  'BRAZIL',
];

const DEFENSE_ITEMS = [
  'NORMAL',
  'PRESS',
  'COUNTER',
];

const CHANGE_ITEMS = [
  'POSITION',
  'MEMBER',
  'BACK',
];

const LEVEL_ITEMS = [
  'SELECT',
  'DETAIL',
  'SP DETAIL',
  'BACK',
];

// ── 选手列表 (真实 ROM, 从 team-roster.ts Sao Paulo 队读取) ──
// 比赛中玩家队默认是 Sao Paulo (圣保罗赛事), 11 人首发
const PLAYER_TEAM = PLAYER_TEAMS[0]; // Sao Paulo
const PLAYER_ITEMS = PLAYER_TEAM.starters.map((id, idx) => {
  const name = getCharacterName(id);
  const gk = isGoalkeeper(id) ? 'GK' : '';
  return `${(idx + 1).toString().padStart(2, '0')} ${name}${gk ? ' ' + gk : ''}`.slice(0, 12);
});

export class MeetingView extends SceneView {
  /** 读 service state, 写 NT/OAM (对应 NES NMI 把场景数据写到 PPU) */
  render(state: TeamDataDisplayState): void {
    // 1. 清屏 (NT + OAM)
    this.clearScreen();

    // 2. 按 menuLevel 分发渲染
    switch (state.menuLevel) {
      case 0:
        this._renderMainMenu(state);
        break;
      case 1:
        this._renderMainMenu(state);     // 主菜单仍可见
        this._renderSubMenu(state);       // 子菜单叠加
        break;
      case 2:
        this._renderMainMenu(state);
        this._renderSubMenu(state);
        this._renderLevel2(state);        // 二级叠加
        break;
      case 3:
        this._renderMainMenu(state);
        this._renderSubMenu(state);
        this._renderLevel3(state);        // 三级 (选选手)
        break;
    }

    // 3. 光标精灵 (OAM)
    this._renderCursor(state);
  }

  // ── 主菜单 (4 项) ──
  private _renderMainMenu(state: TeamDataDisplayState): void {
    const cursor = state.subCursor !== undefined ? -1 : state.subCursor;
    void cursor;
    // 用 getMeetingCursor 从 service 读取主菜单光标 (state.menuLevel=0 时)
    // state 里没有显式 mainCursor 字段, 由 subCursor 间接体现
    // 此处简化: 主菜单光标 = 当前光标行 (menuLevel=0 时 cursorPos, menuLevel>0 时保留)
    const mainCursor = state.menuLevel === 0 ? state.subCursor : -1;
    for (let i = 0; i < MAIN_MENU_ITEMS.length; i++) {
      const y = MAIN_MENU_Y + i * MENU_DY;
      const text = MAIN_MENU_ITEMS[i];
      const isCursor = (i === mainCursor);
      this._drawText(text, MAIN_MENU_X, y, isCursor);
    }
  }

  // ── チームデータ子菜单 (5 项) ──
  private _renderSubMenu(state: TeamDataDisplayState): void {
    // 子菜单在屏幕右侧 (X=16)
    const SUB_X = 16;
    const SUB_Y = MAIN_MENU_Y;
    const cursor = state.menuLevel === 1 ? state.subCursor : -1;
    for (let i = 0; i < SUB_MENU_ITEMS.length; i++) {
      const y = SUB_Y + i * MENU_DY;
      const text = SUB_MENU_ITEMS[i];
      const isCursor = (i === cursor);
      this._drawText(text, SUB_X, y, isCursor);
    }
  }

  // ── 二级菜单 (阵型/防守/换人/等级) ──
  private _renderLevel2(state: TeamDataDisplayState): void {
    // 二级在屏幕下方
    const L2_X = 4;
    const L2_Y = 18;
    const items = this._getLevel2Items(state);
    const cursor = state.menuLevel === 2 ? state.level2Cursor : -1;
    for (let i = 0; i < items.length; i++) {
      const y = L2_Y + i;
      const text = items[i];
      const isCursor = (i === cursor);
      this._drawText(text, L2_X, y, isCursor);
    }
    // 标题: 当前选中项类型
    const title = this._getLevel2Title(state);
    this._drawText(title, L2_X, L2_Y - 2, false);
  }

  // ── 三级菜单 (选选手) ──
  private _renderLevel3(state: TeamDataDisplayState): void {
    // 三级在屏幕下方, 11 人 2 列布局
    const L3_X0 = 4;
    const L3_Y = 18;
    const cursor = state.menuLevel === 3 ? state.level3Cursor : -1;
    for (let i = 0; i < PLAYER_ITEMS.length; i++) {
      const col = i % 6;
      const row = Math.floor(i / 6);
      const x = L3_X0 + col * 5;
      const y = L3_Y + row;
      const text = PLAYER_ITEMS[i];
      const isCursor = (i === cursor);
      // 换人模式下标记已选换下/换上
      let suffix = '';
      if (state.swapOutIdx === i) suffix = '<O';
      if (state.swapInIdx === i) suffix = '<I';
      this._drawText(text + suffix, x, y, isCursor);
    }
    // 标题
    const title = this._getLevel3Title(state);
    this._drawText(title, L3_X0, L3_Y - 2, false);

    // 等级查看模式: 选中选手后显示能力值面板
    if (state.subConfirmed === 3 && state.selectedPlayerIdx >= 0) {
      this._renderPlayerStatsPanel(state.selectedPlayerIdx, state.levelDetailMode);
    }
  }

  /**
   * 渲染选手能力值面板 (等级查看模式)
   * @param playerIdx 选手列表索引 (0-10)
   * @param detailMode 0=能力, 1=必杀技
   */
  private _renderPlayerStatsPanel(playerIdx: number, detailMode: number): void {
    // 面板在屏幕右下 (X=16, Y=18-27)
    const PX = 16;
    const PY = 18;
    const playerId = PLAYER_TEAM.starters[playerIdx] ?? 0;
    const nameCn = getCharacterNameCn(playerId);
    const nameEn = getCharacterName(playerId);

    // 标题: 选手名
    this._drawText(`>${nameEn.slice(0, 10)}`, PX, PY - 1, false);

    if (detailMode === 0) {
      // 能力值模式: 显示 体力 + Shot/Pass/Dribble/Block/Tackle/Intercept (编码→查表真实值)
      // 数据链路 (docs/number-display-pipeline.md): ROM编码 → STAMINA_TABLE/ABILITY_TABLE → 真实显示值
      const stats = getPlayerStatsById(playerId);
      const stamina = codeToStamina(stats[0]);        // 体力 (16bit, 查 STAMINA_TABLE)
      const fields = [
        { label: 'STM', value: stamina },              // 体力 (真实值, 如 748)
        { label: 'SHT', value: codeToAbility(stats[1]) },  // Shot
        { label: 'PAS', value: codeToAbility(stats[2]) },  // Pass
        { label: 'DRB', value: codeToAbility(stats[3]) },  // Dribble
        { label: 'BLK', value: codeToAbility(stats[4]) },  // Block
        { label: 'TCK', value: codeToAbility(stats[5]) },  // Tackle
        { label: 'ITC', value: codeToAbility(stats[6]) },  // Intercept
      ];
      for (let i = 0; i < fields.length; i++) {
        const valStr = fields[i].value.toString().padStart(3, ' ');
        this._drawText(`${fields[i].label}:${valStr}`, PX, PY + i, false);
      }
    } else {
      // 必杀技模式: 显示 Shot/Pass/Dribble 技能名
      const moves = getSpecialMoves(playerId);
      if (moves) {
        const fields: Array<{key: 'shot'|'pass'|'dribble', label: string, table: ReadonlyMap<number,string>}> = [
          { key: 'shot', label: 'SHT', table: SHOT_DIGITS },
          { key: 'pass', label: 'PAS', table: PASS_DIGITS },
          { key: 'dribble', label: 'DRB', table: DRIBBLE_DIGITS },
        ];
        for (let i = 0; i < fields.length; i++) {
          const m = moves.moves[fields[i].key];
          const moveName = fields[i].table.get(m[1]) ?? `#${m[1]}`;
          this._drawText(`${fields[i].label}:${moveName.slice(0, 8)}`, PX, PY + i, false);
        }
      }
    }
  }

  // ── 光标精灵 (OAM) ──
  private _renderCursor(state: TeamDataDisplayState): void {
    // 根据 menuLevel 决定光标位置
    let x = 0, y = 0;
    switch (state.menuLevel) {
      case 0: {
        // 主菜单光标 (X=左侧, Y=对应行)
        const i = state.subCursor;
        x = (MAIN_MENU_X - 1) * 8;
        y = (MAIN_MENU_Y + i * MENU_DY) * 8;
        break;
      }
      case 1: {
        // 子菜单光标
        const i = state.subCursor;
        x = (16 - 1) * 8;
        y = (MAIN_MENU_Y + i * MENU_DY) * 8;
        break;
      }
      case 2: {
        // 二级光标
        const i = state.level2Cursor;
        x = (4 - 1) * 8;
        y = (18 + i) * 8;
        break;
      }
      case 3: {
        // 三级光标
        const i = state.level3Cursor;
        const col = i % 6;
        const row = Math.floor(i / 6);
        x = (4 + col * 5 - 1) * 8;
        y = (18 + row) * 8;
        break;
      }
    }
    const sprites: SpriteEntry[] = [{
      active: true,
      x: x,
      y: y,
      tile: CURSOR_TILE,
      palette: 1,
      priority: false,
      flipH: false,
      flipV: false,
      bank: CHR_BANK,
    }];
    this._store.sprites = sprites;
  }

  // ── 辅助: 写文本到 NT ──
  private _drawText(text: string, tileX: number, tileY: number, highlight: boolean): void {
    const entry: NameTableEntry = {
      tile: 0,
      palette: highlight ? 1 : 0,
      bank: CHR_BANK,
      flipH: false,
      flipV: false,
      behindBg: false,
    };
    for (let i = 0; i < text.length; i++) {
      entry.tile = asciiToTile(text[i]);
      this._store.writeNT(0, tileX + i, tileY, entry);
    }
  }

  // ── 辅助: 二级菜单项 ──
  private _getLevel2Items(state: TeamDataDisplayState): string[] {
    switch (state.subConfirmed) {
      case 0: return FORMATION_ITEMS;  // FORMATION
      case 1: return DEFENSE_ITEMS;    // DEFENSE_TYPE
      case 2: return CHANGE_ITEMS;      // CHANGE
      case 3: return LEVEL_ITEMS;      // LEVEL
      default: return [];
    }
  }

  private _getLevel2Title(state: TeamDataDisplayState): string {
    switch (state.subConfirmed) {
      case 0: return '> FORMATION';
      case 1: return '> DEFENSE TYPE';
      case 2: return '> CHANGE';
      case 3: return '> LEVEL';
      default: return '';
    }
  }

  private _getLevel3Title(state: TeamDataDisplayState): string {
    if (state.subConfirmed === 2) {
      // 换人
      if (state.swapOutIdx < 0) return '> SELECT OUT';
      if (state.swapInIdx < 0) return '> SELECT IN';
      return '> SWAP DONE';
    }
    if (state.subConfirmed === 3) {
      // 等级查看
      return state.levelDetailMode === 1 ? '> SPECIAL' : '> STATS';
    }
    return '';
  }
}
