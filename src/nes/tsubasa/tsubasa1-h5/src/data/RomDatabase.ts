/**
 * RomDatabase — ROM静态资源数据库 (只读、单例)
 * 
 * 这是整个项目的"MySQL数据库层"—存放从ROM中提取的全部静态资源数据。
 * 
 * 与 DataStore 的区别:
 *   - RomDatabase: ROM中永远不会变的静态数据 (CHR、PRG、调色板表、Nametable模板、精灵定义、音频数据...)
 *   - DataStore:   游戏运行时会变的动态状态 (RAM、OAM、VRAM、比分、状态机...)
 * 
 * 类比:
 *   RomDatabase = 游戏安装目录下的资源文件
 *   DataStore   = 游戏运行存档
 * 
 * 使用方式:
 *   import { RomDatabase } from '../data/RomDatabase';
 *   const db = RomDatabase.getInstance();
 *   const chrBanks = db.chr.getAllBanks();
 *   const palette = db.palettes.getByScene('title');
 */

import { initChrBanks, CHR_BANKS } from '../assets/chr/chr_data';
import { getPrgBank } from './raw/PrgLoader';
import { NES_PALETTE } from '../core/types';

// ==================== 数据表类型定义 ====================

/** CHR Bank 状态 */
export interface ChrBankEntry {
  bankId: number;       // 0-31
  size: number;         // 4096 bytes
  loaded: boolean;
  pngPath: string;      // PNG文件路径
  description: string;  // 用途描述
}

/** 调色板表条目 */
export interface PaletteTableEntry {
  id: string;           // 标识符 e.g. "title", "match_field"
  scene: string;        // 场景名称
  bankId: number;       // 来源PRG Bank
  offset: number;       // ROM偏移
  data: number[];       // 32字节调色板 (BG 16 + SPR 16)
  loaded: boolean;
}

/** Nametable 模板条目 */
export interface NametableTemplateEntry {
  id: string;
  scene: string;
  bankId: number;
  offset: number;
  size: number;         // 数据大小 (可能是RLE压缩后的)
  rleCompressed: boolean;
  loaded: boolean;
  data: Uint8Array | null;
}

/** 精灵定义条目 (元精灵) */
export interface SpriteDefinitionEntry {
  id: string;
  name: string;
  bankId: number;
  offset: number;
  tileCount: number;    // 组成精灵的tile数量
  loaded: boolean;
  data: Uint8Array | null;
}

/** 音频资源条目 */
export interface AudioEntry {
  id: number;
  name: string;
  type: 'bgm' | 'sfx';
  bankId: number;
  offset: number;
  size: number;
  loaded: boolean;
}

/** PRG Bank 条目 */
export interface PrgBankEntry {
  bankId: number;       // 0-7
  size: number;         // 16384 bytes
  loaded: boolean;
  description: string;
}

/** 球员数据条目 (从Bank 3) */
export interface PlayerDbEntry {
  id: number;
  name: string;
  nameId: number;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  shoot: number;
  pass: number;
  dribble: number;
  tackle: number;
  speed: number;
  stamina: number;
  specialMoves: number[];
}

/** 球队数据条目 (从Bank 3) */
export interface TeamDbEntry {
  id: number;
  name: string;
  nameId: number;
  playerIds: number[];
  formation: number;
  style: number;
}

// ==================== RomDatabase 主类 ====================

export class RomDatabase {
  private static _instance: RomDatabase | null = null;
  private _initialized = false;

  // ---- 各数据子表 ----
  
  /** 32个CHR Bank (各4096字节) */
  chrBanks: ChrBankEntry[] = [];
  
  /** 8个PRG Bank (各16384字节) */
  prgBanks: PrgBankEntry[] = [];
  
  /** NES系统64色调色板 (固定不变) */
  systemPalette: number[] = NES_PALETTE;
  
  /** 场景调色板表 (从ROM提取的静态调色板数据) */
  paletteTables: PaletteTableEntry[] = [];
  
  /** Nametable模板表 (从ROM提取的静态nametable布局) */
  nametableTemplates: NametableTemplateEntry[] = [];
  
  /** 精灵定义表 (从ROM提取的元精灵数据) */
  spriteDefinitions: SpriteDefinitionEntry[] = [];
  
  /** 音频资源表 (从Bank 5提取) */
  audioEntries: AudioEntry[] = [];
  
  /** 球员数据表 (从Bank 3提取) */
  players: PlayerDbEntry[] = [];
  
  /** 球队数据表 (从Bank 3提取) */
  teams: TeamDbEntry[] = [];

  // ---- 初始化 ----

  static getInstance(): RomDatabase {
    if (!RomDatabase._instance) {
      RomDatabase._instance = new RomDatabase();
    }
    return RomDatabase._instance;
  }

  /**
   * 初始化数据库 — 加载所有ROM资源并建立索引
   * 可以多次调用 (幂等)
   */
  init(): void {
    if (this._initialized) return;
    
    console.log('[RomDB] ===== 初始化 ROM 资源数据库 =====');
    
    this._initChrBanks();
    this._initPrgBanks();
    this._initPaletteTables();
    this._initNametableTemplates();
    this._initSpriteDefinitions();
    this._initAudioEntries();
    this._initPlayerData();
    this._initTeamData();
    
    this._initialized = true;
    this._printSummary();
  }

  /** 是否已初始化 */
  get isInitialized(): boolean { return this._initialized; }

  // ---- 各子表初始化 ----

  /** 初始化 CHR Bank 索引 */
  private _initChrBanks(): void {
    initChrBanks();
    
    // CHR Bank 用途描述 (来自ROM结构分析)
    const chrDescriptions: Record<number, string> = {
      0x00: '比赛场地/通用图形',
      0x01: '比赛场地扩展',
      0x02: '球员精灵图形A',
      0x03: '球员精灵图形B',
      0x04: '开场分镜0 静态图',
      0x05: '开场分镜0 精灵',
      0x06: '开场动画 通用精灵/字体',
      0x07: '开场动画 辅助图形',
      0x08: '开场分镜1 静态图',
      0x09: '开场分镜1 精灵',
      0x0A: '开场分镜2 静态图',
      0x0B: '开场分镜2 精灵',
      0x0C: '开场分镜3/4 静态图',
      0x0D: '开场分镜3 精灵',
      0x0E: '立绘 大空翼',
      0x0F: '立绘 其他角色',
      0x10: '标题画面 图形',
      0x11: '菜单/UI 图形',
      0x12: '比赛场地 草地',
      0x13: '比赛 球员大图A',
      0x14: '比赛 球员大图B',
      0x15: '比赛 特效/图标',
      0x16: '比分/计时 字体',
      0x17: '结果画面 图形',
      0x18: '欧洲场景',
      0x19: '开场分镜4/结局 精灵',
      0x1A: '结局 图形A',
      0x1B: '结局 图形B',
      0x1C: '额外场景A',
      0x1D: '额外场景B',
      0x1E: '额外场景C',
      0x1F: '额外场景D',
    };

    this.chrBanks = [];
    for (let i = 0; i < 32; i++) {
      const data = CHR_BANKS[i];
      this.chrBanks.push({
        bankId: i,
        size: data && data.length >= 4096 ? 4096 : 0,
        loaded: data !== null && data.length >= 4096,
        pngPath: `src/assets/chr/bank_${i.toString(16).toUpperCase().padStart(2, '0')}.png`,
        description: chrDescriptions[i] ?? '未知用途',
      });
    }
  }

  /** 初始化 PRG Bank 索引 */
  private _initPrgBanks(): void {
    const prgDescriptions: Record<number, string> = {
      0: '核心引擎 (RESET/NMI/主循环/状态机/PPU/输入)',
      1: '开场动画+故事板 (RLE解压/分镜控制)',
      2: 'NMI辅助+指针表+标题调色板',
      3: '球员/球队数据+比赛辅助',
      4: '比赛引擎 (AI/物理/碰撞/判罚)',
      5: '标题画面+音频引擎数据',
      6: '菜单/事件/结果画面',
      7: '固定Bank (向量表+事件脚本+文本)',
    };

    this.prgBanks = [];
    for (let i = 0; i < 8; i++) {
      const data = getPrgBank(i);
      this.prgBanks.push({
        bankId: i,
        size: 16384,
        loaded: data !== null,
        description: prgDescriptions[i] ?? '未知',
      });
    }
  }

  /** 初始化调色板表 — 从ROM提取已知的静态调色板 */
  private _initPaletteTables(): void {
    const tables: PaletteTableEntry[] = [];

    // 1. 标题画面调色板 (Bank 2, CPU $B24F → ROM offset $0B25F)
    // 这是已知的静态调色板位置
    const titlePalBank2 = getPrgBank(2);
    if (titlePalBank2) {
      const offset = 0xB24F - 0x8000; // CPU → ROM offset within bank
      const data: number[] = [];
      for (let i = 0; i < 32; i++) {
        data.push(titlePalBank2[offset + i] ?? 0x0F);
      }
      tables.push({
        id: 'title',
        scene: '标题画面',
        bankId: 2,
        offset,
        data,
        loaded: true,
      });
    }

    // 2. 默认比赛调色板 (通用NROM调色板, Bank 4)
    const matchPalBank4 = getPrgBank(4);
    if (matchPalBank4) {
      // 尝试在Bank 4中找到调色板数据 (通常在 $8000 附近或 $BFxx)
      // 先尝试 $BF00 附近 (常见位置)
      const tryOffsets = [0x3F00, 0x3E00, 0x0100, 0x0200];
      for (const off of tryOffsets) {
        // 检查是否像有效调色板数据 (值都在$00-$3F范围内且有$0F)
        let isValid = true;
        for (let i = 0; i < 8; i++) {
          const val = matchPalBank4[off + i];
          if (val !== undefined && (val > 0x3F)) {
            isValid = false;
            break;
          }
        }
        if (isValid) {
          const data: number[] = [];
          for (let i = 0; i < 32; i++) {
            data.push(matchPalBank4[off + i] ?? 0x0F);
          }
          tables.push({
            id: `match_bank4_${off.toString(16)}`,
            scene: '比赛画面 (Bank 4)',
            bankId: 4,
            offset: off,
            data,
            loaded: true,
          });
          break;
        }
      }
    }

    // 3. 默认调色板 (fallback: NES标准灰阶)
    tables.push({
      id: 'default',
      scene: '默认 (系统回退)',
      bankId: 0,
      offset: 0,
      data: [0x0F, 0x00, 0x10, 0x30, 0x0F, 0x06, 0x16, 0x26, 0x0F, 0x09, 0x19, 0x29, 0x0F, 0x0A, 0x1A, 0x2A, 0x0F, 0x11, 0x21, 0x31, 0x0F, 0x16, 0x27, 0x37, 0x0F, 0x18, 0x28, 0x38, 0x0F, 0x1A, 0x2A, 0x3A],
      loaded: true,
    });

    this.paletteTables = tables;
  }

  /** 初始化 Nametable 模板表 */
  private _initNametableTemplates(): void {
    // Nametable 模板存储在ROM中
    // Bank 1 包含RLE编码的开场动画nametable数据
    // Bank 5 包含标题画面nametable
    // Bank 6 包含菜单nametable
    
    const templates: NametableTemplateEntry[] = [];

    // Bank 1: 开场动画RLE数据 (已知偏移)
    templates.push({
      id: 'opening_page0',
      scene: '开场分镜0',
      bankId: 1,
      offset: 0x1068,  // CPU $D068 - $8000
      size: 820,
      rleCompressed: true,
      loaded: false,
      data: null,
    });

    templates.push({
      id: 'opening_page1',
      scene: '开场分镜1',
      bankId: 1,
      offset: 0x107F,
      size: 834,
      rleCompressed: true,
      loaded: false,
      data: null,
    });

    templates.push({
      id: 'opening_page2',
      scene: '开场分镜2',
      bankId: 1,
      offset: 0x1093,
      size: 870,
      rleCompressed: true,
      loaded: false,
      data: null,
    });

    templates.push({
      id: 'opening_page3',
      scene: '开场分镜3',
      bankId: 1,
      offset: 0x10A5,
      size: 889,
      rleCompressed: true,
      loaded: false,
      data: null,
    });

    // 标记: RLE数据需要Bank 1逻辑实现后才能解码
    // 暂时保持 loaded=false

    this.nametableTemplates = templates;
  }

  /** 初始化精灵定义表 */
  private _initSpriteDefinitions(): void {
    // 元精灵数据在ROM中的位置尚未完全分析
    // 精灵通常定义在 Bank 3/4 中 (比赛球员精灵)
    // 暂时创建索引占位

    const defs: SpriteDefinitionEntry[] = [];

    // 从Bank 3/4 中标记已知精灵数据区域
    // 实际数据需要进一步分析汇编代码确认

    defs.push({
      id: 'player_tsubasa',
      name: '大空翼 (球员精灵)',
      bankId: 3,
      offset: 0,
      tileCount: 0,
      loaded: false,
      data: null,
    });

    this.spriteDefinitions = defs;
  }

  /** 初始化音频资源表 */
  private _initAudioEntries(): void {
    // 音频数据在 Bank 5 中
    // 需要音频引擎实现后才能确定具体偏移和大小
    this.audioEntries = [
      { id: 1, name: '标题画面BGM', type: 'bgm', bankId: 5, offset: 0, size: 0, loaded: false },
      { id: 2, name: '比赛BGM', type: 'bgm', bankId: 5, offset: 0, size: 0, loaded: false },
      { id: 3, name: '进球BGM', type: 'bgm', bankId: 5, offset: 0, size: 0, loaded: false },
      { id: 4, name: '结局BGM', type: 'bgm', bankId: 5, offset: 0, size: 0, loaded: false },
      { id: 5, name: '哨声', type: 'sfx', bankId: 5, offset: 0, size: 0, loaded: false },
      { id: 6, name: '踢球声', type: 'sfx', bankId: 5, offset: 0, size: 0, loaded: false },
      { id: 7, name: '进球欢呼', type: 'sfx', bankId: 5, offset: 0, size: 0, loaded: false },
      { id: 8, name: '菜单选择', type: 'sfx', bankId: 5, offset: 0, size: 0, loaded: false },
    ];
  }

  /** 初始化球员数据 (从Bank 3) */
  private _initPlayerData(): void {
    // 球员数据在 Bank 3 中
    // 数据结构需要进一步分析 (32字节/人或类似)
    // 目前占位 — 实际数据将在Phase 5中提取
    this.players = [];
  }

  /** 初始化球队数据 (从Bank 3) */
  private _initTeamData(): void {
    this.teams = [];
  }

  // ==================== 查询接口 (类SQL) ====================

  /** 获取所有CHR Bank */
  getChrBanks(): ChrBankEntry[] { return this.chrBanks; }

  /** 获取已加载的CHR Bank */
  getLoadedChrBanks(): ChrBankEntry[] {
    return this.chrBanks.filter(b => b.loaded);
  }

  /** 根据ID获取CHR Bank */
  getChrBank(bankId: number): ChrBankEntry | undefined {
    return this.chrBanks.find(b => b.bankId === bankId);
  }

  /** 获取CHR Bank原始数据 */
  getChrBankData(bankId: number): Uint8Array | null {
    return CHR_BANKS[bankId] ?? null;
  }

  /** 获取系统调色板 */
  getSystemPalette(): number[] { return this.systemPalette; }

  /** 获取所有场景调色板 */
  getPaletteTables(): PaletteTableEntry[] { return this.paletteTables; }

  /** 根据场景获取调色板 */
  getPaletteByScene(scene: string): PaletteTableEntry | undefined {
    return this.paletteTables.find(p => p.scene === scene || p.id === scene);
  }

  /** 获取所有Nametable模板 */
  getNametableTemplates(): NametableTemplateEntry[] { return this.nametableTemplates; }

  /** 获取所有精灵定义 */
  getSpriteDefinitions(): SpriteDefinitionEntry[] { return this.spriteDefinitions; }

  /** 获取所有音频条目 */
  getAudioEntries(): AudioEntry[] { return this.audioEntries; }

  /** 按类型获取音频 */
  getAudioByType(type: 'bgm' | 'sfx'): AudioEntry[] {
    return this.audioEntries.filter(a => a.type === type);
  }

  /** 获取所有PRG Bank */
  getPrgBanks(): PrgBankEntry[] { return this.prgBanks; }

  /** 获取PRG Bank原始数据 */
  getPrgBankData(bankId: number): Uint8Array | null {
    return getPrgBank(bankId);
  }

  /** 获取所有球员 */
  getPlayers(): PlayerDbEntry[] { return this.players; }

  /** 获取所有球队 */
  getTeams(): TeamDbEntry[] { return this.teams; }

  // ==================== 统计信息 ====================

  /** 获取数据库统计摘要 */
  getSummary() {
    return {
      initialized: this._initialized,
      chrBanks: { total: this.chrBanks.length, loaded: this.getLoadedChrBanks().length },
      prgBanks: { total: this.prgBanks.length, loaded: this.prgBanks.filter(b => b.loaded).length },
      paletteTables: this.paletteTables.length,
      nametableTemplates: this.nametableTemplates.length,
      ntLoaded: this.nametableTemplates.filter(nt => nt.loaded).length,
      spriteDefinitions: this.spriteDefinitions.length,
      spriteLoaded: this.spriteDefinitions.filter(s => s.loaded).length,
      audioEntries: this.audioEntries.length,
      audioLoaded: this.audioEntries.filter(a => a.loaded).length,
      players: this.players.length,
      teams: this.teams.length,
    };
  }

  private _printSummary(): void {
    const s = this.getSummary();
    console.log('[RomDB] ===== 数据库摘要 =====');
    console.log(`  CHR Banks: ${s.chrBanks.loaded}/${s.chrBanks.total} loaded`);
    console.log(`  PRG Banks: ${s.prgBanks.loaded}/${s.prgBanks.total} loaded`);
    console.log(`  Palette Tables: ${s.paletteTables}`);
    console.log(`  Nametable Templates: ${s.ntLoaded}/${s.nametableTemplates} loaded`);
    console.log(`  Sprite Definitions: ${s.spriteLoaded}/${s.spriteDefinitions} loaded`);
    console.log(`  Audio Entries: ${s.audioLoaded}/${s.audioEntries} loaded`);
    console.log(`  Players: ${s.players} extracted`);
    console.log(`  Teams: ${s.teams} extracted`);
    console.log('[RomDB] ====================');
  }
}
