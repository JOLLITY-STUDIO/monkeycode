/**
 * ═══════════════════════════════════════════════
 * 数据模型总设计 — Captain Tsubasa II 结构化数据定义
 * ═══════════════════════════════════════════════
 *
 * 目标: 将所有 ROM 中的原始字节数据，结构化转写为 TypeScript 接口与类型。
 * 类似数据库 Schema 设计，每条记录 = 一个数据实体，每个 bank = 一个数据域。
 *
 * 数据来源:
 *   Bank 27 (Player Data):      球员基础信息、队伍名称、球员名称
 *   Bank 28 (Player Attributes): 球员属性表、阵型数据、属性计算表
 *   Bank 29 (Player Values):     球员数值矩阵、位置网格、队伍/球员属性关系
 *
 * ═══════════════════════════════════
 * 数据分类:
 *   A. 球员域 (Player Domain)
 *      - PlayerBaseRecord:     基础身份 (号码/名字/位置)
 *      - PlayerAttributeRecord: 能力值 (射门/速度/技术...)
 *      - PlayerValueRow:        数值矩阵行 (队伍 × 球员 22字节)
 *      - PlayerStatusFlags:     特殊技能标志
 *
 *   B. 队伍域 (Team Domain)
 *      - TeamRecord:            队伍元数据 (名称/球员数量/指针)
 *      - TeamFormation:         阵型布局
 *
 *   C. 场景域 (Field Domain)
 *      - FieldPositionCell:     场地位置属性 (metatile 属性)
 *      - FormationLayout:       阵型站位坐标
 */

// ═══════════════════════════════════════════════
// 1. 基础类型
// ═══════════════════════════════════════════════

/** 位置枚举 (NES 原始: 0=GK, 1=DF, 2=MF, 3=FW) */
export enum Position {
  GK = 0, // 门将
  DF = 1, // 后卫
  MF = 2, // 中场
  FW = 3, // 前锋
}

/** 能力值 (0-255, 越高越强) */
export type StatValue = number;

/** Tile 编码的名字 (4 字节) — 对应 CHR 字库 tile 索引 */
export type TileName = [number, number, number, number];

/** 名称字符串 (FF 终止的 tile 索引列表) */
export type NameString = number[];

// ═══════════════════════════════════════════════
// 2. 球员域 (Player Domain) — Bank 27
// ═══════════════════════════════════════════════

/**
 * 球员基础记录 (16 字节)
 *
 * ROM 来源: Bank 27 DATA_$8448_$94F0
 * 每球员占 16 字节:
 *   [0]:          号码 (1-99)
 *   [1-4]:        名字 (4 字节 tile 编码)
 *   [5]:          位置 (Position 枚举)
 *   [6]:          射门力
 *   [7]:          速度
 *   [8]:          技术
 *   [9]:          体力
 *   [10]:         传球
 *   [11]:         拦截
 *   [12]:         头球
 *   [13]:         守门
 *   [14-15]:      特殊技能标志
 */
export interface PlayerBaseRecord {
  /** 球员唯一索引 (在全局球员数组中的位置) */
  playerId: number;
  /** 球衣号码 (1-99) */
  jerseyNumber: number;
  /** 名字 (4 tile, 直接用 CHR tile 索引) */
  name: TileName;
  /** 场上位置 */
  position: Position;
  /** 射门力 [0-255] */
  shot: StatValue;
  /** 速度 [0-255] */
  speed: StatValue;
  /** 技术 [0-255] */
  technique: StatValue;
  /** 体力 [0-255] */
  stamina: StatValue;
  /** 传球 [0-255] */
  pass: StatValue;
  /** 拦截 [0-255] */
  tackle: StatValue;
  /** 头球 [0-255] */
  header: StatValue;
  /** 守门 [0-255] */
  goalkeep: StatValue;
  /** 特殊技能标志 (bits: 射门特技, 传球特技, 拦截特技 等) */
  specialFlags: number; // 2 bytes -> 16 bits
}

/**
 * 球员名称表记录 (FF 终止的 tile 序列)
 *
 * ROM 来源: Bank 27 DATA_$801C_$805D / $805E_$8073 / $8074_$80E2 等
 * 按队伍分组的球员全名称列表，每个名称以 0xFF 终止
 */
export interface PlayerNameRecord {
  /** 对应的球员 ID */
  playerId: number;
  /** FF 终止的 tile 序列 (包含完整名字 tiles) */
  nameTiles: NameString;
}

/**
 * 球员动画序列 (裁剪/特效框架)
 *
 * ROM 来源: Bank 27 DATA_$8292_$8429
 * 格式: [指针表: 13×2 字节] + [序列数据: (时长, tileId)*, 0xFF]
 * 控制球员外形切换/动画帧播放
 */
export interface PlayerAnimSequence {
  /** 序列索引 (0-12) */
  seqId: number;
  /** 帧列表: [duration, tileId] 对 */
  frames: Array<{ duration: number; tileId: number }>;
}

// ═══════════════════════════════════════════════
// 3. 球员属性域 (Player Attribute Domain) — Bank 28
// ═══════════════════════════════════════════════

/**
 * 球员属性扩展记录 (12 字节)
 *
 * ROM 来源: Bank 28 DATA_$9616_$9E4D (每个 12 字节)
 * 属性解释 (根据 6502 代码推断):
 *   [0]:          playerId (球员 ID)
 *   [1]:          未知属性 A (可能: 进攻意识/rating)
 *   [2]:          体力系数/倍率
 *   [3]:          防守相关
 *   [4]:          冲锋能力
 *   [5]:          拦截增强
 *   [6]:          技能激活标志
 *   [7]:          对位属性
 *   [8]:          速度修饰
 *   [9]:          体能调控
 *   [10]:         技战参数
 *   [11]:         综合数值/等级
 */
export interface PlayerAttributeRecord {
  /** 球员 ID */
  playerId: number;
  /** 属性位图或 rating base */
  attrA: number;         // byte 1
  /** stamina multiplier */
  attrStaminaMul: number; // byte 2
  /** 防守值 */
  attrDefense: number;    // byte 3
  /** 冲锋/冲刺 */
  attrCharge: number;     // byte 4
  /** 拦截/狙击增强 */
  attrTacklePlus: number; // byte 5
  /** 技能激活 */
  attrSkillActivate: number; // byte 6
  /** 对位属性 */
  attrMatchup: number;    // byte 7
  /** 速度修正 */
  attrSpeedMod: number;   // byte 8
  /** 体能调节 */
  attrStaminaMod: number; // byte 9
  /** 技术参数 */
  attrTechParam: number;  // byte 10
  /** 综合等级/梯度 */
  attrLevel: number;      // byte 11
}

/**
 * 球员能力值查找表 (动态属性曲线)
 *
 * ROM 来源: Bank 28 DATA_$9E4E_$9ECE (129 bytes)
 * 用于将基础属性值映射为游戏中实际生效的能力曲线
 * 0-127 的索引 => 0-255 的实际能力值
 */
export interface PlayerValueCurve {
  /** 基础值 (0-127) */
  baseValue: number;
  /** 映射后的实际能力值 (0-255) */
  curvedValue: number;
}

/**
 * 能力值扩展曲线 (高值域)
 *
 * ROM 来源: Bank 28 DATA_$9ECF_$9EFB + DATA_$9EFC_$9F0D
 * 用于更高数值范围的曲线映射
 */
export interface PlayerValueCurveHigh {
  /** 扩展索引 (128+) */
  baseValue: number;
  /** 映射值 (0-255) */
  curvedValue: number;
}

/**
 * 16-bit 附加值对
 *
 * ROM 来源: Bank 28 DATA_$9F0E_$9FB1 / DATA_$9FB2_$9FCD
 * 小端序 16-bit 值对，用于某种属性计算
 */
export interface ValuePair16 {
  /** 小端序 16-bit 值 */
  valLo: number;
  valHi: number;
  /** 组合为完整 16-bit 值 */
  get value16(): number;
}

// ═══════════════════════════════════════════════
// 4. 队伍域 (Team Domain) — Bank 27/28
// ═══════════════════════════════════════════════

/**
 * 队伍记录
 *
 * ROM 来源:
 *   Bank 27 DATA_$8000_$8005: 队伍指针表 (每队 2 字节)
 *   Bank 27 DATA_$8006_$801B etc: 队伍名称表
 *   Bank 27 DATA_$8448_$94F0: 队伍球员数据块
 */
export interface TeamRecord {
  /** 队伍唯一 ID (0-based) */
  teamId: number;
  /** 队伍全名称 (tile 序列, FF 终止) */
  name: NameString;
  /** 队伍简称/编号 tile */
  shortNameTile: number;
  /** 该队球员列表 (指向基础记录的 playerId 数组) */
  playerIds: number[];
}

/**
 * 阵型记录
 *
 * ROM 来源: Bank 28 DATA_$9460_$95A7 (328 bytes)
 * 格式: [指针: 2字节] × N + [阵型数据: 4字节 × M]
 * 每阵型条目 4 字节: [x, y, x, y] 或 [playerSlot, positionX, positionY, flags]
 */
export interface FormationRecord {
  /** 阵型 ID */
  formationId: number;
  /** 阵型名称/描述 tile */
  nameTile: number;
  /** 该阵型的球员站位数据 */
  positions: FormationPlayerSlot[];
}

/**
 * 阵型内单个站位
 *
 * 4 字节: [slotIndex, xCoord, yCoord, flags]
 * slotIndex: 球员槽位 (0=GK, 1-4=DF, 5-8=MF, 9-10=FW)
 */
export interface FormationPlayerSlot {
  /** 槽位索引 */
  slotIndex: number;
  /** X 坐标 */
  xCoord: number;
  /** Y 坐标 */
  yCoord: number;
  /** 标志 (位编码: 角色、方向、激活状态) */
  flags: number;
}

// ═══════════════════════════════════════════════
// 5. 球员数值矩阵域 (Player Value Matrix) — Bank 29
// ═══════════════════════════════════════════════

/**
 * 球员数值矩阵行 (22 字节包，实际数据 21 字节 + 0x00 终止符)
 *
 * ROM 来源: Bank 29 PRG_BANK_29_DATA (前 ~136 条)
 * 实测结构 (136 行, 平均 22 字节):
 *   [0]:       marker (行/队标识, 0x01-0x76)
 *   [1-N]:     player slot data (21 bytes, 含镜像重复后缀)
 *   [last]:    0x00 (终止符)
 *
 * 关键发现 — 镜像重复模式:
 *   行内最后 ~8 字节 = 前部某段的完整重复。
 *   例: [marker][unique4][shared8][shared8_repeat]
 *   这表示同一行的两个"子槽"共享最后 8 个属性值。
 *   游戏代码需要在读取时识别并折叠这个重复。
 *
 * Marker 字节分布: 0x01-0x76，每个值出现 1-8 次。
 * 推测 marker 对应球员在全局属性矩阵中的行索引。
 */
export interface PlayerValueRow {
  /** 行索引 (0-135, 全局顺序) */
  rowId: number;
  /** ROM 内偏移 */
  romOffset: number;
  /** 行标识 (teamMarker / row index) */
  teamMarker: number;
  /** 实际数据字节 (不含 0x00 终止符，21-24 字节) */
  rawData: number[];
  /** 末尾重复的字节数 (镜像后缀长度，0=无重复) */
  mirrorLen: number;
}

/**
 * 场地位置格属性块
 *
 * ROM 来源: Bank 29 中间/后段 (~0xBF0-0xD00)
 * 足球场 metatile 的属性判定数据。
 * 格式: 变长编码块 [tileId, attr, tileId, attr...] 带 0x01 0x23 等定界符。
 * 属性含义: 球门区/禁区/中圈/边线/角球区等场地区域判定
 */
export interface FieldPositionData {
  /** 场地 tile 索引列表 */
  tiles: number[];
  /** 每格属性值列表 */
  attrs: number[];
}

// ═══════════════════════════════════════════════
// 6. 集中数据索引
// ═══════════════════════════════════════════════

/**
 * 全局球员/队伍/阵型编号映射
 *
 * NES 原始使用 256 个槽位索引球员 ($00-$FF)
 * 玩家队伍固定为 $00-$0F，对方队伍为 $10-$1F
 */
export interface GameDataIndex {
  /** 全局球员基础记录 (playerId → PlayerBaseRecord) */
  players: Map<number, PlayerBaseRecord>;
  /** 球员属性扩展映射 (recordIndex → PlayerAttributeRecord) */
  playerAttrs: Map<number, PlayerAttributeRecord>;
  /** 队伍映射 (teamId → TeamRecord) */
  teams: Map<number, TeamRecord>;
  /** 阵型映射 (formationId → FormationRecord) */
  formations: Map<number, FormationRecord>;
  /** 球员名称映射 (playerId → 全名称 tiles) */
  playerNames: Map<number, NameString>;
  /** 队伍名称映射 (teamId → 队伍全名称) */
  teamNames: Map<number, NameString>;
  /** 能力值曲线 (index → curvedValue) */
  valueCurve: number[];
  /** 16-bit 值对表 (index → 16-bit value) */
  valuePairs16: number[];
  /** 球员数值矩阵行 (Bank 29, rowId → PlayerValueRow) */
  valueRows: Map<number, PlayerValueRow>;
  /** 场地位置数据 (Bank 29) */
  fieldData: FieldPositionData | null;
}

/** 全局单例 */
export let gameDataIndex: GameDataIndex;

/**
 * 初始化全局数据索引
 * 必须在 boot 阶段调用，读取所有 ROM 数据并构建结构化内存
 */
export function initGameDataIndex(): GameDataIndex {
  gameDataIndex = {
    players: new Map(),
    playerAttrs: new Map(),
    teams: new Map(),
    formations: new Map(),
    playerNames: new Map(),
    teamNames: new Map(),
    valueCurve: [],
    valuePairs16: [],
    valueRows: new Map(),
    fieldData: null,
  };
  return gameDataIndex;
}

/**
 * 获取球员基础记录 (O(1) 查找)
 */
export function getPlayer(playerId: number): PlayerBaseRecord | undefined {
  return gameDataIndex?.players.get(playerId);
}

/**
 * 获取球员全名 (以 tile 序列形式)
 */
export function getPlayerFullName(playerId: number): TileName | undefined {
  return gameDataIndex?.players.get(playerId)?.name;
}

/**
 * 获取队伍所有球员
 */
export function getTeamPlayers(teamId: number): PlayerBaseRecord[] {
  const team = gameDataIndex?.teams.get(teamId);
  if (!team) return [];
  return team.playerIds
    .map(id => gameDataIndex.players.get(id))
    .filter(Boolean) as PlayerBaseRecord[];
}

/**
 * 获取球员属性扩展
 */
export function getPlayerAttr(playerId: number): PlayerAttributeRecord | undefined {
  return gameDataIndex?.playerAttrs.get(playerId);
}

/**
 * 获取阵型站位
 */
export function getFormation(formId: number): FormationRecord | undefined {
  return gameDataIndex?.formations.get(formId);
}

/**
 * 能力值曲线查表: 将基础值映射为游戏中实际生效值
 */
export function applyValueCurve(baseValue: number): number {
  if (!gameDataIndex) return baseValue;
  if (baseValue < 0) return 0;
  if (baseValue >= gameDataIndex.valueCurve.length) return 0xFF;
  return gameDataIndex.valueCurve[baseValue];
}
