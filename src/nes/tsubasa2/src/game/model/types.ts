/**
 * 天使之翼2 — 领域模型类型定义
 *
 * 替代 NES 原始 ROM 中的字节数组，用结构化 TypeScript 类型表达游戏世界。
 * 数据来源: Banks 03-10, 13-15, 17-18, 21, 23, 25, 27, 29
 */

// ═══════════════════════════════════════════════════════════════
// 枚举
// ═══════════════════════════════════════════════════════════════

/** 球员位置 */
export enum PlayerPosition {
  GK = 0, // 门将
  DF = 1, // 后卫
  MF = 2, // 中场
  FW = 3, // 前锋
}

/** 比赛阶段 */
export enum MatchPhase {
  PRE_MATCH = 0,   // 赛前展示
  KICK_OFF = 1,    // 开球
  ATTACK = 2,      // 己方进攻
  DEFENSE = 3,     // 己方防守
  SHOOT = 4,       // 射门
  GOAL = 5,        // 进球动画
  CORNER = 6,      // 角球
  THROW_IN = 7,    // 界外球
  GOAL_KICK = 8,   // 球门球
  HALF_TIME = 9,   // 中场休息
  FULL_TIME = 10,  // 比赛结束
  PENALTY = 11,    // 点球大战
}

/** 阵型类型 */
export enum FormationType {
  FORM_433 = 0,
  FORM_442 = 1,
  FORM_352 = 2,
  FORM_343 = 3,
  FORM_451 = 4,
}

// ═══════════════════════════════════════════════════════════════
// 球员
// ═══════════════════════════════════════════════════════════════

/** 球员能力值 (扩展为 22 字段, 对应 ROM 0x39fde 真实布局) */
export interface PlayerStats {
  // 基础能力 (6 项, 偏移 1-6)
  shoot: number;        // 射门 0-255 (偏移1)
  pass: number;         // 传球 0-255 (偏移2)
  dribble: number;      // 盘带 0-255 (偏移3)
  block: number;        // 阻挡 0-255 (偏移4)
  tackle: number;       // 铲球 0-255 (偏移5)
  intercept: number;   // 拦截 0-255 (偏移6)
  // 低空能力 (7 项, 偏移 7-13)
  lowShot: number;       // 低空射门 (偏移7)
  lowPass: number;       // 低空传球 (偏移8)
  lowTrap: number;       // 低空停球 (偏移9)
  lowLetThrough: number; // 低空漏球 (偏移10)
  lowControlledClear: number; // 低空受控解围 (偏移11)
  lowUncontrolledClear: number; // 低空非受控解围 (偏移12)
  lowBallChallenge: number; // 低空争球 (偏移13)
  // 低空拦截 (偏移14, 单独项)
  lowInterception: number; // 低空拦截 (偏移14)
  // 高空能力 (7 项, 偏移 15-21)
  highShot: number;      // 高空射门 (偏移15)
  highPass: number;      // 高空传球 (偏移16)
  highTrap: number;      // 高空停球 (偏移17)
  highLetThrough: number; // 高空漏球 (偏移18)
  highControlledClear: number; // 高空受控解围 (偏移19)
  highUncontrolledClear: number; // 高空非受控解围 (偏移20)
  highBallChallenge: number; // 高空争球 (偏移21)
  // 高空拦截 (偏移22)
  highInterception: number; // 高空拦截 (偏移22)
  // 体力单独字段 (偏移0, 不在 22 能力内)
  stamina: number;      // 体力 0-255 (偏移0)
}

/** 球员必杀技 */
export interface SpecialMove {
  id: number;        // 必杀技 ID
  name: string;      // 名称
  type: 'shoot' | 'pass' | 'dribble' | 'tackle' | 'save' | 'catch';
  staminaCost: number; // 消费体力
  power: number;     // 威力值
}

/** 球员完整定义 */
export interface Player {
  id: number;
  name: string;
  position: PlayerPosition;
  stats: PlayerStats;
  specialMoves: number[]; // 拥有的必杀技 ID 列表
  portraitTile: number;   // 头像 tile 索引
  teamId: number;         // 所属队伍 ID
}

// ═══════════════════════════════════════════════════════════════
// 队伍
// ═══════════════════════════════════════════════════════════════

/** 队伍定义 */
export interface Team {
  id: number;
  name: string;
  /** 队员 ID 列表（按场上位置排序: GK→DF→MF→FW） */
  playerIds: number[];
  /** 阵型 */
  formation: FormationType;
  /** 战术风格 0-5 */
  style: number;
  /** 队长 ID */
  captainId: number;
}

// ═══════════════════════════════════════════════════════════════
// 比赛
// ═══════════════════════════════════════════════════════════════

/** 比赛状态 */
export interface MatchState {
  phase: MatchPhase;
  /** 上半场/下半场/加时: 0=上半场, 1=下半场, 2=加时 */
  half: number;
  /** 比赛计时 (秒) */
  timer: number;
  /** 主队比分 */
  scoreA: number;
  /** 客队比分 */
  scoreB: number;
  /** 当前持球队伍 ID */
  ballOwner: number | null;
  /** 当前持球球员 ID */
  ballPlayer: number | null;
}

/** 场上球员运行时状态 */
export interface PlayerOnField {
  playerId: number;
  x: number;      // 场上格子 X (0-13)
  y: number;      // 场上格子 Y (0-8)
  stamina: number; // 当前体力
  hasBall: boolean;
  isCaptain: boolean;
}

/** 球场 */
export interface Field {
  /** 场上 22 名球员 */
  players: PlayerOnField[];
  /** 球位置 */
  ballX: number;
  ballY: number;
  /** 当前行动方: true=主队, false=客队 */
  isHomeOffense: boolean;
}

// ═══════════════════════════════════════════════════════════════
// 场景 / 剧情
// ═══════════════════════════════════════════════════════════════

/** 场景类型 */
export enum SceneType {
  TITLE = 0,      // 标题画面
  MENU = 1,       // 主菜单
  PASSWORD = 2,   // 密码输入
  STORY = 3,      // 剧情对话
  MATCH = 4,      // 比赛中
  RESULT = 5,     // 赛果
  CREDITS = 6,    // 制作人员
}

/** 剧情对话指令 */
export interface DialogCommand {
  type: 'text' | 'wait' | 'clear' | 'choice' | 'jump';
  speaker?: string;   // 说话人
  text?: string;       // 文本内容（中文/SJIS）
  choices?: string[];  // 选项
  nextScene?: number;  // 跳转场景
}

/** 剧情脚本节点 */
export interface StoryNode {
  id: number;
  sceneId: number;
  commands: DialogCommand[];
}

// ═══════════════════════════════════════════════════════════════
// 动画 / 演出
// ═══════════════════════════════════════════════════════════════

/** 动画帧 */
export interface AnimationFrame {
  tileId: number;      // 使用的 tile 索引
  palette: number;     // 调色板组
  x: number;           // 屏幕 X
  y: number;           // 屏幕 Y
  flipH: boolean;
  flipV: boolean;
  duration: number;    // 帧持续帧数
}

/** 动画序列 */
export interface AnimationSequence {
  id: number;
  name: string;
  frames: AnimationFrame[];
  loop: boolean;
}

// ═══════════════════════════════════════════════════════════════
// 调色板
// ═══════════════════════════════════════════════════════════════

/** 单个 RGBA 颜色 */
export interface PaletteColor {
  r: number; // 0-255
  g: number;
  b: number;
  a: number; // 0-255，255=不透明 0=透明
}

/**
 * 一组调色板（4 色）
 *
 * NES 调色板规则:
 *   - colors[0]: 通用背景色 / 精灵透明索引
 *   - colors[1]: 颜色 1
 *   - colors[2]: 颜色 2
 *   - colors[3]: 颜色 3
 */
export interface PaletteEntry {
  colors: [PaletteColor, PaletteColor, PaletteColor, PaletteColor];
}

/**
 * 完整调色板表
 *
 * NES 共 8 组调色板:
 *   - bgPalettes[0..3]:  BG 背景用，均共享 bgPalettes[0].colors[0] 作为背景色
 *   - sprPalettes[0..3]: 精灵用，sprPalettes[*].colors[0] 强制透明
 */
export interface PaletteTable {
  /** BG 背景调色板 ×4 */
  bgPalettes: [PaletteEntry, PaletteEntry, PaletteEntry, PaletteEntry];
  /** 精灵调色板 ×4 */
  sprPalettes: [PaletteEntry, PaletteEntry, PaletteEntry, PaletteEntry];
}

/** 默认/空白 PaletteEntry（全黑） */
export const BLANK_PALETTE: PaletteEntry = {
  colors: [
    { r: 0, g: 0, b: 0, a: 255 },
    { r: 0, g: 0, b: 0, a: 255 },
    { r: 0, g: 0, b: 0, a: 255 },
    { r: 0, g: 0, b: 0, a: 255 },
  ],
};

/** 创建空白 PaletteTable */
export function createBlankPaletteTable(): PaletteTable {
  const blank = (): PaletteEntry => ({ colors: [...BLANK_PALETTE.colors] } as PaletteEntry);
  return {
    bgPalettes: [blank(), blank(), blank(), blank()],
    sprPalettes: [blank(), blank(), blank(), blank()],
  };
}

// ═══════════════════════════════════════════════════════════════
// 数据仓库接口
// ═══════════════════════════════════════════════════════════════

/** 球员仓库 */
export interface PlayerRepository {
  getById(id: number): Player | undefined;
  getAll(): Player[];
  getByTeam(teamId: number): Player[];
  getByPosition(pos: PlayerPosition): Player[];
  readonly count: number;
}

/** 队伍仓库 */
export interface TeamRepository {
  getById(id: number): Team | undefined;
  getAll(): Team[];
  readonly count: number;
}

/** 比赛仓库 */
export interface MatchRepository {
  getState(): MatchState;
  getField(): Field;
  getFieldPlayer(playerId: number): PlayerOnField | undefined;
  updateField(partial: Partial<Field>): void;
  updateState(partial: Partial<MatchState>): void;
}
