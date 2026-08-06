/**
 * RomDatabase — ROM 静态资源数据库 (只读、单例)
 *
 * 这是二代 (Captain Tsubasa II) 的"MySQL 数据库层"——
 * 存放从 ROM 中提取的全部静态资源数据。
 *
 * 与 DataStore 的区别:
 *   - RomDatabase: ROM 中永远不会变的静态数据 (CHR、PRG、结构化游戏数据...)
 *   - DataStore:   游戏运行时会变的动态状态 (RAM 缓存、比分、状态机...)
 *
 * 类比:
 *   RomDatabase = 游戏安装目录下的资源文件
 *   DataStore   = 游戏运行时的存档/RAM
 *
 * 使用方式:
 *   import { RomDatabase } from './RomDatabase';
 *   const db = RomDatabase.getInstance();
 *   db.init();
 *
 *   // 查询 CHR bank
 *   const chrBank0 = db.getChrBank(0);
 *
 *   // 查询球员
 *   const player = db.getPlayer(5);
 *
 *   // 查询队伍
 *   const team = db.getTeam(0);
 *
 *   // 统计摘要
 *   console.log(db.getSummary());
 *
 * ROM 规格:
 *   Mapper: 4 (MMC3)
 *   PRG: 32 × 8KB = 256KB
 *   CHR: 16 × 8KB = 128KB
 */

import {
  NES_CHR_ROM,
  NES_PRG_ROM,
  PRG_ROM_SIZE,
  CHR_ROM_SIZE,
  NES_MAPPER,
} from '../../../rom-data/index';

import {
  GameDataIndex,
  PlayerBaseRecord,
  PlayerAttributeRecord,
  TeamRecord,
  FormationRecord,
  PlayerValueRow,
  NameString,
  TileName,
} from './banks/prg/data-model-schema';

import { decodeTileName } from '../../../pages/tools/data-viewer/tile-text-map';
import {
  type SpecialSkillRecord,
  type NormalCommandRecord,
  type SkillsSummary,
  type CombiSkillRule,
  getAllSuperSkills,
  getAllSuperSkillsIncludingWorld,
  getSkillsByCategory,
  getSkillsByPlayer,
  getSkillsByGutsRange,
  getAllNormalCommands,
  getNormalCommandsByDomain,
  getCombiRules,
  getSkillsSummary,
  SkillCategory,
  CommandDomain,
} from './banks/prg/special-skills-database';

import {
  buildGameDataIndex,
  parseAttrRecords,
  parsePlayerNamesByTeam,
  parsePlayerNames,
  parseTeamRecords,
  parseAnimSequences,
  parseFormationRecords,
  parseValueCurves,
  parseValuePairs16,
  parsePlayerValueRows,
  parseFieldPositionData,
} from './banks/prg/data-extractor';

// ═══════════════════════════════════════════════
// 数据表类型定义
// ═══════════════════════════════════════════════

/** CHR Bank 条目 */
export interface ChrBankEntry {
  /** Bank ID (0-15) */
  bankId: number;
  /** 数据大小 (8192 bytes / 8KB) */
  size: number;
  /** 是否加载成功 */
  loaded: boolean;
  /** 用途描述 */
  description: string;
}

/** PRG Bank 条目 */
export interface PrgBankEntry {
  /** Bank ID (0-31) */
  bankId: number;
  /** Bank 大小 (8192 bytes / 8KB) */
  size: number;
  /** 原始数据 */
  data: readonly number[];
  /** 用途描述 */
  description: string;
}

/** 调色板条目 (从 ROM 中提取的静态调色板) */
export interface PaletteEntry {
  id: string;
  scene: string;
  bankId: number;
  offset: number;
  data: readonly number[];
  loaded: boolean;
}

/** 阵型条目 (只读导出) */
export interface FormationEntry {
  formationId: number;
  nameTile: number;
  positions: Array<{
    slotIndex: number;
    xCoord: number;
    yCoord: number;
    flags: number;
  }>;
}

/** RomDatabase 统计摘要 */
export interface RomDatabaseSummary {
  initialized: boolean;
  chrBanks: { total: number; loaded: number };
  prgBanks: { total: number };
  palettes: number;
  players: number;
  playerAttrs: number;
  teams: number;
  formations: number;
  playerNames: number;
  valueCurve: number;
  valuePairs16: number;
  valueRows: number;
  superSkills: number;
  normalCommands: number;
}

// ═══════════════════════════════════════════════
// RomDatabase 单例主类
// ═══════════════════════════════════════════════

export class RomDatabase {
  private static _instance: RomDatabase | null = null;
  private _initialized = false;

  // ── 原始 ROM 资源 ──

  /** CHR-ROM: 16 banks × 8KB (128KB total) */
  chrRom: readonly number[] = NES_CHR_ROM;

  /** PRG-ROM: 32 banks × 8KB (256KB total) */
  prgRom: readonly number[] = NES_PRG_ROM;

  // ── 索引表 ──

  /** 16 个 CHR Bank 索引 */
  chrBanks: ChrBankEntry[] = [];

  /** 32 个 PRG Bank 索引 */
  prgBanks: PrgBankEntry[] = [];

  /** 静态调色板条目 */
  palettes: PaletteEntry[] = [];

  // ── 结构化游戏数据 (来自 data-extractor) ──

  /** 游戏数据索引 (集中持有所有结构化数据的 Map) */
  gameData: GameDataIndex | null = null;

  // ═══════════════════════════════════════════
  // 单例 + 初始化
  // ═══════════════════════════════════════════

  static getInstance(): RomDatabase {
    if (!RomDatabase._instance) {
      RomDatabase._instance = new RomDatabase();
    }
    return RomDatabase._instance;
  }

  /**
   * 初始化数据库 — 加载所有 ROM 资源并建立索引。
   * 可多次调用 (幂等)。
   */
  init(): void {
    if (this._initialized) return;

    console.log('[RomDB 二代] ===== 初始化 ROM 资源数据库 =====');

    this._initChrBanks();
    this._initPrgBanks();
    this._initPalettes();
    this._initGameData();

    this._initialized = true;
    this._printSummary();
  }

  /** 是否已初始化 */
  get isInitialized(): boolean {
    return this._initialized;
  }

  // ═══════════════════════════════════════════
  // 初始化: CHR Bank 索引
  // ═══════════════════════════════════════════

  private _initChrBanks(): void {
    // 二代 CHR Bank 用途描述 (基于 ROM 结构分析)
    const chrDescriptions: Record<number, string> = {
      0: '比赛场地/通用图形 — 球场草地、标线、球门',
      1: '比赛场地扩展 — 观众席、边线裁判区',
      2: '球员精灵 A — 上半身/运行动作',
      3: '球员精灵 B — 下半身/铲球/头球动作',
      4: '开场分镜 0 — 静态背景',
      5: '开场分镜 0 — 精灵覆盖',
      6: 'UI 字体 — 汉字/假名字库',
      7: '标题画面/菜单 — 图形元素',
      8: '开场分镜 1 — 静态背景',
      9: '开场分镜 1 — 精灵覆盖',
      10: '角色立绘 A — 大空翼等主要角色',
      11: '角色立绘 B — 其他角色',
      12: '比赛特效/必杀技 — 射门动画帧',
      13: '结局画面 A — 图形',
      14: '结局画面 B — 图形',
      15: '额外图形 — 对话头像/图标',
    };

    this.chrBanks = [];
    const CHR_BANK_SIZE = 8192; // 8KB per bank

    for (let i = 0; i < 16; i++) {
      const start = i * CHR_BANK_SIZE;
      const end = start + CHR_BANK_SIZE;
      const hasData = start + CHR_BANK_SIZE <= this.chrRom.length;

      this.chrBanks.push({
        bankId: i,
        size: CHR_BANK_SIZE,
        loaded: hasData,
        description: chrDescriptions[i] ?? `CHR Bank ${i} — 未知用途`,
      });
    }
  }

  // ═══════════════════════════════════════════
  // 初始化: PRG Bank 索引
  // ═══════════════════════════════════════════

  private _initPrgBanks(): void {
    // 二代 PRG Bank 用途描述 (基于 native-game Bank 翻译状态)
    const prgDescriptions: Record<number, string> = {
      0: '场景分派引擎 — 主状态机/bytecode 解释器/boot 流程控制',
      1: '比赛跳跃/标题渲染 — 标题画面 & 球员跃起动画',
      2: 'NMI 渲染器 — 每帧 VBlank 渲染调度',
      3: '数据 Bank 3 — (待深入翻译)',
      4: '数据 Bank 4 — (待深入翻译)',
      5: '数据 Bank 5 — (待深入翻译)',
      6: '数据 Bank 6 — (待深入翻译)',
      7: '数据 Bank 7 — (待深入翻译)',
      8: '数据 Bank 8 — (待深入翻译)',
      9: '数据 Bank 9 — (待深入翻译)',
      10: '数据 Bank 10 — (待深入翻译)',
      11: '背景/瓦片渲染器 — NT 写 tile 引擎',
      12: '音频引擎 — BGM/SFX 播放',
      13: '数据 Bank 13 — (待深入翻译)',
      14: '数据 Bank 14 — (待深入翻译)',
      15: '数据 Bank 15 — (待深入翻译)',
      16: '场景脚本引擎 — 逐帧 tick + F3 子分派',
      17: '数据 Bank 17 — (待深入翻译)',
      18: '数据 Bank 18 — (待深入翻译)',
      19: '脚本解析器 — bytecode 解码/执行引擎',
      20: '队伍选择 — 队伍选择 UI + ROM 阵型',
      21: '数据 Bank 21 — (待深入翻译)',
      22: '精灵/OAM 引擎 — 精灵布局/动画/元精灵管理',
      23: '数据 Bank 23 — (待深入翻译)',
      24: '过场引擎 — 分镜切换/文本显示/对话',
      25: '数据 Bank 25 — (待深入翻译)',
      26: '比赛引擎 — AI/物理/碰撞/判罚/比赛流程',
      27: '球员数据 — 球员名称/队伍名/动画序列/场景配置',
      28: '球员属性/阵型 — 能力值/阵型站位/值曲线',
      29: '球员数值矩阵 — 数值行/场地位置属性',
      30: '系统库 — 协程/数学/工具函数集 (37 函数)',
      31: '启动向量/主循环 — RESET/NMI/boot 状态机',
    };

    this.prgBanks = [];
    const BANK_SIZE = 8192; // 8KB per bank

    for (let i = 0; i < 32; i++) {
      const start = i * BANK_SIZE;
      const end = start + BANK_SIZE;
      const data = this.prgRom.slice(start, end);

      this.prgBanks.push({
        bankId: i,
        size: BANK_SIZE,
        data,
        description: prgDescriptions[i] ?? `PRG Bank ${i} — 未知用途`,
      });
    }
  }

  // ═══════════════════════════════════════════
  // 初始化: 静态调色板
  // ═══════════════════════════════════════════

  private _initPalettes(): void {
    // NES 系统默认调色板 — 从 Bank 31 启动数据中提取
    // Bank 31 包含 RESET handler 中写入 PPU 的初始调色板
    const bank31 = this.getPrgBankData(31);
    const palettes: PaletteEntry[] = [];

    // 默认回退调色板 (NES 通用灰阶)
    palettes.push({
      id: 'default',
      scene: '默认 — 系统回退',
      bankId: 31,
      offset: 0,
      data: [
        0x0F, 0x00, 0x10, 0x30, 0x0F, 0x06, 0x16, 0x26,
        0x0F, 0x09, 0x19, 0x29, 0x0F, 0x0A, 0x1A, 0x2A,
        0x0F, 0x11, 0x21, 0x31, 0x0F, 0x16, 0x27, 0x37,
        0x0F, 0x18, 0x28, 0x38, 0x0F, 0x1A, 0x2A, 0x3A,
      ],
      loaded: true,
    });

    // 标题画面调色板 — Bank 1 中已知偏移
    const bank1 = this.getPrgBankData(1);
    if (bank1 && bank1.length > 0x3F00) {
      const offset = 0x3F00 - 0x8000; // CPU → ROM offset within bank (Bank 1 maps to $8000-$9FFF)
      // 实际上 Bank 1 的调色板位于不同位置，此处预留
    }

    this.palettes = palettes;
  }

  // ═══════════════════════════════════════════
  // 初始化: 结构化游戏数据
  // ═══════════════════════════════════════════

  private _initGameData(): void {
    console.log('[RomDB] 构建结构化游戏数据索引...');
    this.gameData = buildGameDataIndex();
    console.log('[RomDB] 结构化数据索引构建完成');
  }

  // ═══════════════════════════════════════════
  // CHR Bank 查询
  // ═══════════════════════════════════════════

  /** 获取所有 CHR Bank 条目 */
  getChrBanks(): ChrBankEntry[] {
    return this.chrBanks;
  }

  /** 获取指定 CHR Bank */
  getChrBank(bankId: number): ChrBankEntry | undefined {
    return this.chrBanks.find(b => b.bankId === bankId);
  }

  /** 获取 CHR Bank 原始数据 */
  getChrBankData(bankId: number): readonly number[] {
    const CHR_BANK_SIZE = 8192;
    const start = bankId * CHR_BANK_SIZE;
    return this.chrRom.slice(start, start + CHR_BANK_SIZE);
  }

  /** 按描述关键词搜索 CHR Bank */
  findChrBanks(keyword: string): ChrBankEntry[] {
    const kw = keyword.toLowerCase();
    return this.chrBanks.filter(b => b.description.toLowerCase().includes(kw));
  }

  // ═══════════════════════════════════════════
  // PRG Bank 查询
  // ═══════════════════════════════════════════

  /** 获取所有 PRG Bank 条目 */
  getPrgBanks(): PrgBankEntry[] {
    return this.prgBanks;
  }

  /** 获取指定 PRG Bank */
  getPrgBank(bankId: number): PrgBankEntry | undefined {
    return this.prgBanks.find(b => b.bankId === bankId);
  }

  /** 获取 PRG Bank 原始数据 */
  getPrgBankData(bankId: number): readonly number[] {
    const BANK_SIZE = 8192;
    const start = bankId * BANK_SIZE;
    if (start >= this.prgRom.length) return [];
    return this.prgRom.slice(start, start + BANK_SIZE);
  }

  /** 按描述关键词搜索 PRG Bank */
  findPrgBanks(keyword: string): PrgBankEntry[] {
    const kw = keyword.toLowerCase();
    return this.prgBanks.filter(b => b.description.toLowerCase().includes(kw));
  }

  // ═══════════════════════════════════════════
  // 调色板查询
  // ═══════════════════════════════════════════

  /** 获取所有调色板 */
  getPalettes(): PaletteEntry[] {
    return this.palettes;
  }

  /** 按场景获取调色板 */
  getPaletteByScene(scene: string): PaletteEntry | undefined {
    return this.palettes.find(p => p.scene === scene || p.id === scene);
  }

  // ═══════════════════════════════════════════
  // 球员查询
  // ═══════════════════════════════════════════

  /** 获取全局球员基础记录 */
  getPlayer(playerId: number): PlayerBaseRecord | undefined {
    return this.gameData?.players.get(playerId);
  }

  /** 获取所有球员基础记录 */
  getAllPlayers(): PlayerBaseRecord[] {
    if (!this.gameData) return [];
    return Array.from(this.gameData.players.values());
  }

  /** 获取球员全名字符串 (以 tile 数组形式) */
  getPlayerName(playerId: number): NameString | undefined {
    return this.gameData?.playerNames.get(playerId);
  }

  /** 获取球员属性扩展记录 */
  getPlayerAttr(playerId: number): PlayerAttributeRecord[] {
    if (!this.gameData) return [];
    const result: PlayerAttributeRecord[] = [];
    for (const [, attr] of this.gameData.playerAttrs) {
      if (attr.playerId === playerId) result.push(attr);
    }
    return result;
  }

  /** 获取所有球员属性记录 */
  getAllPlayerAttrs(): PlayerAttributeRecord[] {
    if (!this.gameData) return [];
    return Array.from(this.gameData.playerAttrs.values());
  }

  /** 按位置筛选球员 */
  getPlayersByPosition(position: number): PlayerBaseRecord[] {
    if (!this.gameData) return [];
    const result: PlayerBaseRecord[] = [];
    for (const [, player] of this.gameData.players) {
      if (player.position === position) result.push(player);
    }
    return result;
  }

  // ═══════════════════════════════════════════
  // 队伍查询
  // ═══════════════════════════════════════════

  /** 获取所有队伍记录 */
  getTeams(): TeamRecord[] {
    if (!this.gameData) return [];
    return Array.from(this.gameData.teams.values());
  }

  /** 获取指定队伍 */
  getTeam(teamId: number): TeamRecord | undefined {
    return this.gameData?.teams.get(teamId);
  }

  /** 获取队伍名称 */
  getTeamName(teamId: number): NameString | undefined {
    return this.gameData?.teamNames.get(teamId);
  }

  /** 获取队伍所有球员 */
  getTeamPlayers(teamId: number): PlayerBaseRecord[] {
    const team = this.gameData?.teams.get(teamId);
    if (!this.gameData || !team) return [];
    return team.playerIds
      .map(id => this.gameData!.players.get(id))
      .filter(Boolean) as PlayerBaseRecord[];
  }

  // ═══════════════════════════════════════════
  // 阵型查询
  // ═══════════════════════════════════════════

  /** 获取所有阵型 */
  getFormations(): FormationRecord[] {
    if (!this.gameData) return [];
    return Array.from(this.gameData.formations.values());
  }

  /** 获取指定阵型 */
  getFormation(formId: number): FormationRecord | undefined {
    return this.gameData?.formations.get(formId);
  }

  // ═══════════════════════════════════════════
  // 数值查询
  // ═══════════════════════════════════════════

  /** 应用能力值曲线: 将基础值映射为游戏中实际生效值 */
  applyValueCurve(baseValue: number): number {
    if (!this.gameData) return baseValue;
    if (baseValue < 0) return 0;
    if (baseValue >= this.gameData.valueCurve.length) return 0xFF;
    return this.gameData.valueCurve[baseValue];
  }

  /** 获取完整值曲线 */
  getValueCurve(): number[] {
    return this.gameData?.valueCurve ?? [];
  }

  /** 获取 16-bit 值对表 */
  getValuePairs16(): number[] {
    return this.gameData?.valuePairs16 ?? [];
  }

  /** 获取球员数值矩阵行 */
  getPlayerValueRows(): PlayerValueRow[] {
    if (!this.gameData) return [];
    return Array.from(this.gameData.valueRows.values());
  }

  /** 获取场地位置数据 */
  getFieldData() {
    return this.gameData?.fieldData ?? null;
  }

  // ═══════════════════════════════════════════
  // Tile 名称解码 (CHR Bank 0 字库 → 可读日文)
  // ═══════════════════════════════════════════

  /** 将 NameString (tile 序列) 解码为可读日文字符串 */
  decodeName(tiles: NameString | undefined): string {
    if (!tiles || tiles.length === 0) return '';
    return decodeTileName(tiles);
  }

  /** 将 TileName (4 字节简称) 解码为可读日文字符串 */
  decodeTileNameStr(tiles: TileName | undefined): string {
    if (!tiles) return '';
    return decodeTileName(Array.from(tiles));
  }

  /** 获取球员全名 (可读日文) */
  getPlayerNameString(playerId: number): string {
    const name = this.getPlayerName(playerId);
    return this.decodeName(name);
  }

  /** 获取球员简称 (4 tile → 可读日文) */
  getPlayerShortName(playerId: number): string {
    const player = this.getPlayer(playerId);
    return this.decodeTileNameStr(player?.name);
  }

  /** 获取队伍全名 (可读日文) */
  getTeamNameString(teamId: number): string {
    const name = this.getTeamName(teamId);
    return this.decodeName(name);
  }

  /** 获取队伍所有球员的可读名称列表 */
  getTeamPlayerNameStrings(teamId: number): string[] {
    const players = this.getTeamPlayers(teamId);
    return players.map(p => this.getPlayerShortName(p.playerId));
  }

  /** 获取队伍完整信息 (含解码名称) */
  getTeamSummary(teamId: number) {
    const team = this.getTeam(teamId);
    if (!team) return null;
    return {
      teamId: team.teamId,
      name: this.decodeName(team.name),
      players: this.getTeamPlayers(teamId).map(p => ({
        id: p.playerId,
        name: this.getPlayerShortName(p.playerId),
        fullName: this.getPlayerNameString(p.playerId),
        position: p.position,
        jersey: p.jerseyNumber,
      })),
    };
  }

  // ═══════════════════════════════════════════
  // 必殺技查询 (来自 special-skills-database)
  // ═══════════════════════════════════════════

  /** 获取全部必殺技 (不含世界强敌) */
  getAllSuperSkills(): SpecialSkillRecord[] {
    return getAllSuperSkills();
  }

  /** 获取全部必殺技 (含世界强敌) */
  getAllSuperSkillsIncludingWorld(): SpecialSkillRecord[] {
    return getAllSuperSkillsIncludingWorld();
  }

  /** 按类别筛选必殺技 */
  getSuperSkillsByCategory(category: SkillCategory): SpecialSkillRecord[] {
    return getSkillsByCategory(category);
  }

  /** 按玩家名查找必殺技 */
  getSuperSkillsByPlayer(playerName: string): SpecialSkillRecord[] {
    return getSkillsByPlayer(playerName);
  }

  /** 按体力消耗范围筛选必殺技 */
  getSuperSkillsByGuts(min: number, max: number): SpecialSkillRecord[] {
    return getSkillsByGutsRange(min, max);
  }

  /** 获取所有通常命令 */
  getAllNormalCommands(): NormalCommandRecord[] {
    return getAllNormalCommands();
  }

  /** 按域筛选通常命令 */
  getNormalCommandsByDomain(domain: CommandDomain): NormalCommandRecord[] {
    return getNormalCommandsByDomain(domain);
  }

  /** 获取组合技规则 */
  getAllCombiRules(): CombiSkillRule[] {
    return getCombiRules();
  }

  /** 获取必殺技统计摘要 */
  getSkillsStats(): SkillsSummary {
    return getSkillsSummary();
  }

  // ═══════════════════════════════════════════
  // ROM 规格信息
  // ═══════════════════════════════════════════

  /** Mapper 编号 */
  get mapper(): number {
    return NES_MAPPER;
  }

  /** PRG-ROM 总大小 */
  get prgSize(): number {
    return PRG_ROM_SIZE;
  }

  /** CHR-ROM 总大小 */
  get chrSize(): number {
    return CHR_ROM_SIZE;
  }

  // ═══════════════════════════════════════════
  // 统计摘要
  // ═══════════════════════════════════════════

  getSummary(): RomDatabaseSummary {
    return {
      initialized: this._initialized,
      chrBanks: {
        total: this.chrBanks.length,
        loaded: this.chrBanks.filter(b => b.loaded).length,
      },
      prgBanks: { total: this.prgBanks.length },
      palettes: this.palettes.length,
      players: this.gameData?.players.size ?? 0,
      playerAttrs: this.gameData?.playerAttrs.size ?? 0,
      teams: this.gameData?.teams.size ?? 0,
      formations: this.gameData?.formations.size ?? 0,
      playerNames: this.gameData?.playerNames.size ?? 0,
      valueCurve: this.gameData?.valueCurve.length ?? 0,
      valuePairs16: this.gameData?.valuePairs16.length ?? 0,
      valueRows: this.gameData?.valueRows.size ?? 0,
      // 必殺技统计 (从 special-skills-database)
      superSkills: (() => {
        try {
          return getSkillsSummary().totalSuper;
        } catch { return 0; }
      })(),
      normalCommands: (() => {
        try {
          return getAllNormalCommands().length;
        } catch { return 0; }
      })(),
    };
  }

  private _printSummary(): void {
    const s = this.getSummary();
    console.log('[RomDB 二代] ===== 数据库摘要 =====');
    console.log(`  Mapper: ${NES_MAPPER} (MMC3)`);
    console.log(`  PRG-ROM: ${PRG_ROM_SIZE} bytes (${s.prgBanks.total} banks × 8KB)`);
    console.log(`  CHR-ROM: ${CHR_ROM_SIZE} bytes (${s.chrBanks.total} banks × 8KB)`);
    console.log(`  CHR Banks loaded: ${s.chrBanks.loaded}/${s.chrBanks.total}`);
    console.log(`  Palettes: ${s.palettes}`);
    console.log(`  ─ 结构化数据 ─`);
    console.log(`  Players: ${s.players}`);
    console.log(`  Player Attrs: ${s.playerAttrs}`);
    console.log(`  Teams: ${s.teams}`);
    console.log(`  Formations: ${s.formations}`);
    console.log(`  Player Names: ${s.playerNames}`);
    console.log(`  Value Curve: ${s.valueCurve} entries`);
    console.log(`  Value Pairs16: ${s.valuePairs16} entries`);
    console.log(`  Value Rows: ${s.valueRows}`);
    console.log(`  ─ 必殺技データ ─`);
    console.log(`  Super Skills: ${s.superSkills}`);
    console.log(`  Normal Commands: ${s.normalCommands}`);
    console.log('[RomDB 二代] ====================');
  }
}

// ═══════════════════════════════════════════
// 便捷导出
// ═══════════════════════════════════════════

/** RomDatabase 单例快捷获取 */
export const romDB = RomDatabase.getInstance();

/** 重新导出关键类型 (方便外部 import) */
export type {
  GameDataIndex,
  PlayerBaseRecord,
  PlayerAttributeRecord,
  TeamRecord,
  FormationRecord,
  PlayerValueRow,
  NameString,
  TileName,
  SpecialSkillRecord,
  NormalCommandRecord,
  SkillsSummary,
  CombiSkillRule,
};
