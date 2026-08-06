/**
 * 球员数据表 — 类型定义和工厂
 * 从 Bank 3 PRG 数据提取，当前为推断结构
 * 
 * 球员数据结构 (推断, 32字节/人):
 *   Offset 0-1:  球员ID (16位)
 *   Offset 2-3:  名称指针 → Bank 7 文本表
 *   Offset 4:    位置 (0=GK, 1=DF, 2=MF, 3=FW)
 *   Offset 5:    射门能力
 *   Offset 6:    传球能力
 *   Offset 7:    盘带能力
 *   Offset 8:    拦截能力
 *   Offset 9:    速度能力
 *   Offset 10:   体力
 *   Offset 11-15: 必杀技ID列表 (5个)
 *   Offset 16-31: 其他属性
 */
import { PlayerData, PlayerPosition } from '../../core/types';

/** 单个球员的完整数据 */
export interface PlayerEntry {
  id: number;
  name: string;
  nameId: number;        // Bank 7 文本表索引
  position: PlayerPosition;
  shoot: number;
  pass: number;
  dribble: number;
  tackle: number;
  speed: number;
  stamina: number;
  specialMoves: number[];
  portraitTile: number;
  teamId: number;        // 所属球队ID
}

/**
 * 球员数据表
 * 关系型数据库风格的访问接口
 */
export class PlayerTable {
  private _players: Map<number, PlayerEntry> = new Map();
  private _byPosition: Map<PlayerPosition, PlayerEntry[]> = new Map();

  constructor() {
    for (const pos of [PlayerPosition.GK, PlayerPosition.DF, PlayerPosition.MF, PlayerPosition.FW]) {
      this._byPosition.set(pos, []);
    }
  }

  /** 注册球员 */
  register(player: PlayerEntry): void {
    this._players.set(player.id, player);
    this._byPosition.get(player.position)?.push(player);
  }

  /** 批量注册 */
  registerAll(players: PlayerEntry[]): void {
    for (const p of players) this.register(p);
  }

  /** 根据ID获取球员 */
  getById(id: number): PlayerEntry | undefined {
    return this._players.get(id);
  }

  /** 根据位置获取球员列表 */
  getByPosition(pos: PlayerPosition): PlayerEntry[] {
    return this._byPosition.get(pos) ?? [];
  }

  /** 获取所有球员 */
  getAll(): PlayerEntry[] {
    return Array.from(this._players.values());
  }

  /** 获取球员数量 */
  get count(): number {
    return this._players.size;
  }

  /** 从原始 Bank 3 字节解析球员数据 */
  static fromBank3(bank3: Uint8Array, startOffset: number, stride: number, count: number): PlayerTable {
    const table = new PlayerTable();

    for (let i = 0; i < count; i++) {
      const offset = startOffset + i * stride;
      if (offset + stride > bank3.length) break;

      const id = bank3[offset] | (bank3[offset + 1] << 8);
      if (id === 0 || id === 0xFFFF) continue;

      const nameId = bank3[offset + 2] | (bank3[offset + 3] << 8);
      const position = (bank3[offset + 4] & 0x03) as PlayerPosition;
      const shoot = bank3[offset + 5];
      const pass = bank3[offset + 6];
      const dribble = bank3[offset + 7];
      const tackle = bank3[offset + 8];
      const speed = bank3[offset + 9];
      const stamina = bank3[offset + 10];
      const specialMoves: number[] = [];
      for (let j = 0; j < 5; j++) {
        const m = bank3[offset + 11 + j];
        if (m !== 0 && m !== 0xFF) specialMoves.push(m);
      }
      const portraitTile = bank3[offset + 16] || 0;
      const teamId = bank3[offset + 2] || 0;

      table.register({
        id, name: `Player_${id}`,
        nameId, position,
        shoot, pass, dribble, tackle, speed, stamina,
        specialMoves, portraitTile,
        teamId,
      });
    }

    return table;
  }
}

/**
 * 球员数据仓库 (单例)
 * 提供全局球员数据访问
 */
export class PlayerRepository {
  private static _instance: PlayerRepository | null = null;
  private _table: PlayerTable = new PlayerTable();
  private _loaded: boolean = false;

  static getInstance(): PlayerRepository {
    if (!PlayerRepository._instance) {
      PlayerRepository._instance = new PlayerRepository();
    }
    return PlayerRepository._instance;
  }

  get table(): PlayerTable { return this._table; }
  get isLoaded(): boolean { return this._loaded; }

  /** 从 Bank 3 数据加载 */
  loadFromBank3(bank3: Uint8Array): void {
    // 尝试多个可能的起始偏移
    // Bank 3 代码跳转表: $0000-$0017 (8个JMP)
    // 代码段可能延续到约 $0400
    // 数据区域可能在 $0400+ 
    console.log(`[PlayerRepo] 扫描 Bank 3 寻找球员数据...`);

    let bestTable: PlayerTable | null = null;

    // 尝试不同的起始偏移和 stride
    for (const start of [0x400, 0x800, 0xC00, 0x1000, 0x1400, 0x1800]) {
      for (const stride of [16, 24, 32, 48]) {
        const table = PlayerTable.fromBank3(bank3, start, stride, 50);
        if (table.count >= 20) {
          console.log(`[PlayerRepo]   start=$${start.toString(16).toUpperCase()}, stride=${stride}: ${table.count} players`);
          if (!bestTable || table.count > bestTable.count) {
            bestTable = table;
          }
        }
      }
    }

    if (bestTable && bestTable.count > 0) {
      this._table = bestTable;
      this._loaded = true;
      console.log(`[PlayerRepo] ✅ 加载了 ${bestTable.count} 名球员`);
    } else {
      console.warn('[PlayerRepo] ⚠️ 未找到球员数据，使用空表');
      this._loaded = true;
    }
  }

  /** 用测试数据填充 (开发阶段) */
  loadTestData(): void {
    const testPlayers: PlayerEntry[] = [
      { id: 1, name: '大空翼', nameId: 0, position: PlayerPosition.MF, shoot: 90, pass: 85, dribble: 88, tackle: 70, speed: 80, stamina: 95, specialMoves: [1, 2], portraitTile: 0, teamId: 1 },
      { id: 2, name: '日向小次郎', nameId: 0, position: PlayerPosition.FW, shoot: 95, pass: 65, dribble: 72, tackle: 60, speed: 78, stamina: 90, specialMoves: [3], portraitTile: 0, teamId: 9 },
      { id: 3, name: '若林源三', nameId: 0, position: PlayerPosition.GK, shoot: 30, pass: 60, dribble: 40, tackle: 50, speed: 55, stamina: 85, specialMoves: [4], portraitTile: 0, teamId: 1 },
      { id: 4, name: '岬太郎', nameId: 0, position: PlayerPosition.MF, shoot: 75, pass: 92, dribble: 82, tackle: 65, speed: 78, stamina: 82, specialMoves: [5], portraitTile: 0, teamId: 1 },
      { id: 5, name: '松山光', nameId: 0, position: PlayerPosition.DF, shoot: 80, pass: 75, dribble: 68, tackle: 88, speed: 75, stamina: 88, specialMoves: [6], portraitTile: 0, teamId: 1 },
      { id: 6, name: '石崎了', nameId: 0, position: PlayerPosition.DF, shoot: 45, pass: 55, dribble: 50, tackle: 72, speed: 65, stamina: 70, specialMoves: [], portraitTile: 0, teamId: 1 },
      { id: 7, name: '井泽守', nameId: 0, position: PlayerPosition.DF, shoot: 55, pass: 60, dribble: 55, tackle: 75, speed: 68, stamina: 73, specialMoves: [], portraitTile: 0, teamId: 1 },
      { id: 8, name: '来生哲兵', nameId: 0, position: PlayerPosition.FW, shoot: 72, pass: 58, dribble: 65, tackle: 40, speed: 82, stamina: 75, specialMoves: [], portraitTile: 0, teamId: 1 },
      { id: 9, name: '龍一', nameId: 0, position: PlayerPosition.FW, shoot: 78, pass: 60, dribble: 70, tackle: 45, speed: 85, stamina: 78, specialMoves: [7], portraitTile: 0, teamId: 1 },
      { id: 10, name: '森崎有三', nameId: 0, position: PlayerPosition.GK, shoot: 25, pass: 50, dribble: 35, tackle: 45, speed: 50, stamina: 70, specialMoves: [], portraitTile: 0, teamId: 1 },
      { id: 11, name: '早田誠', nameId: 0, position: PlayerPosition.DF, shoot: 65, pass: 62, dribble: 58, tackle: 80, speed: 70, stamina: 76, specialMoves: [], portraitTile: 0, teamId: 1 },
    ];

    for (const p of testPlayers) {
      this._table.register(p);
    }
    this._loaded = true;
    console.log(`[PlayerRepo] ✅ 测试数据: ${testPlayers.length} 名球员`);
  }
}
