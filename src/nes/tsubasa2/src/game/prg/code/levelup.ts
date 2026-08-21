/**
 * LevelUp Service — 球员经验值/升级逻辑
 *
 * 真实 ROM (ROM修改参考.txt):
 *   - 经验值 RAM $0454 + playerIndex * 2 (16bit)
 *   - Stats Modifier ROM 地址 (23 bytes per character):
 *     Tsubasa $9FE6, Hyuga $A166, Ishizaki $A11E, 等
 *   - 升级规则: 设 stat=29, level=0x3E → 全属性达 246 无副作用
 *   - 显示体力 ROM 0x39F1E, 显示能力 ROM 0x39E5E (与真实值独立)
 *
 * RAM 地址 (运行时, ROM修改参考.txt Character Stats):
 *   玩家队: $0300 + idx*0C (Player ID + Guts 16bit + Level)
 *   替补: $0408 + idx*0C
 *   CPU 队: $0384 + idx*0C
 *
 * 数据来源文档: docs/rom-data-locations.md
 */
import { DataStore } from '../DataStore';

/** 经验值 RAM 基址 (16bit per player) */
const EXP_RAM_BASE = 0x0454;
/** 经验值记录步长 */
const EXP_RECORD_SIZE = 2;
/** 玩家队球员 RAM 基址 (Player ID + Guts + Level, 步长 $0C) */
const PLAYER_RAM_BASE = 0x0300;
const PLAYER_RAM_STEP = 0x0C;
/** 替补 RAM 基址 */
const BENCH_RAM_BASE = 0x0408;
/** CPU 队 RAM 基址 */
const CPU_RAM_BASE = 0x0384;

/** 升级规则常量 (ROM修改参考.txt) */
export const LEVELUP_RULES = {
  /** 极限 stat 值 (设此值 + level=0x3E → 全属性 246) */
  MAX_STAT: 29,
  /** 极限 level 值 */
  MAX_LEVEL: 0x3E,
  /** 升级后全属性值 */
  MAX_ALL_STATS: 246,
} as const;

/** 球员 RAM 槽结构 (每槽 12 字节, 步进 $0C) */
export interface PlayerRamSlot {
  /** 球员 ROM ID ($0300+idx*0C 第0字节) */
  playerId: number;
  /** Guts 体力 (16bit, $0301-$0302) */
  guts: number;
  /** 等级 ($0303) */
  level: number;
  /** 经验值 (16bit, RAM $0454+idx*2) */
  exp: number;
}

export class LevelUpService {
  constructor(private _store: DataStore) {}

  // ── 经验值 ──

  /** 读取球员经验值 (16bit, RAM $0454 + idx*2) */
  getExp(playerIndex: number): number {
    const lo = this._ram8(EXP_RAM_BASE + playerIndex * EXP_RECORD_SIZE);
    const hi = this._ram8(EXP_RAM_BASE + playerIndex * EXP_RECORD_SIZE + 1);
    return (hi << 8) | lo;
  }

  /** 设置球员经验值 */
  setExp(playerIndex: number, exp: number): void {
    const v = exp & 0xFFFF;
    this._store.write(this._expKey(playerIndex, 0), v & 0xFF);
    this._store.write(this._expKey(playerIndex, 1), (v >> 8) & 0xFF);
  }

  /** 增加经验值 (比赛后调用) */
  addExp(playerIndex: number, gain: number): void {
    const cur = this.getExp(playerIndex);
    this.setExp(playerIndex, Math.min(0xFFFF, cur + gain));
  }

  // ── 等级 ──

  /** 读取球员等级 (RAM $0303+idx*0C 的第3字节) */
  getLevel(playerIndex: number): number {
    return this._ram8(PLAYER_RAM_BASE + playerIndex * PLAYER_RAM_STEP + 3);
  }

  /** 设置球员等级 */
  setLevel(playerIndex: number, level: number): void {
    this._store.write(this._playerKey(playerIndex, 3), level & 0xFF);
  }

  // ── Guts (体力) ──

  /** 读取球员 Guts (16bit, RAM $0301+idx*0C) */
  getGuts(playerIndex: number): number {
    const lo = this._ram8(PLAYER_RAM_BASE + playerIndex * PLAYER_RAM_STEP + 1);
    const hi = this._ram8(PLAYER_RAM_BASE + playerIndex * PLAYER_RAM_STEP + 2);
    return (hi << 8) | lo;
  }

  /** 设置球员 Guts */
  setGuts(playerIndex: number, guts: number): void {
    const v = guts & 0xFFFF;
    this._store.write(this._playerKey(playerIndex, 1), v & 0xFF);
    this._store.write(this._playerKey(playerIndex, 2), (v >> 8) & 0xFF);
  }

  // ── 球员 ID ──

  /** 读取球员 ROM ID (RAM $0300+idx*0C 第0字节) */
  getPlayerId(playerIndex: number): number {
    return this._ram8(PLAYER_RAM_BASE + playerIndex * PLAYER_RAM_STEP);
  }

  /** 设置球员 ROM ID */
  setPlayerId(playerIndex: number, romId: number): void {
    this._store.write(this._playerKey(playerIndex, 0), romId & 0xFF);
  }

  // ── 升级 ──

  /**
   * 升级检查 — 经验值达阈值则升级。
   * 真实 ROM 升级阈值表待提取, 当前用简化公式: level*100
   */
  tryLevelUp(playerIndex: number): boolean {
    const level = this.getLevel(playerIndex);
    const exp = this.getExp(playerIndex);
    const threshold = (level + 1) * 100;
    if (exp >= threshold && level < LEVELUP_RULES.MAX_LEVEL) {
      this.setLevel(playerIndex, level + 1);
      return true;
    }
    return false;
  }

  /**
   * 满级满属性 (调试/作弊, 对应 ROM修改参考.txt: stat=29+level=0x3E → 246)
   * 真实 ROM 需写 Stats Modifier 区, H5 仅标记 Level/Exp
   */
  maxOut(playerIndex: number): void {
    this.setLevel(playerIndex, LEVELUP_RULES.MAX_LEVEL);
    this.setExp(playerIndex, 0xFFFF);
    this.setGuts(playerIndex, LEVELUP_RULES.MAX_ALL_STATS);
  }

  // ── 球员槽读取 (完整结构) ──

  /** 读取球员完整 RAM 槽 */
  getPlayerSlot(playerIndex: number): PlayerRamSlot {
    return {
      playerId: this.getPlayerId(playerIndex),
      guts: this.getGuts(playerIndex),
      level: this.getLevel(playerIndex),
      exp: this.getExp(playerIndex),
    };
  }

  /** 读取替补球员槽 (RAM $0408+) */
  getBenchSlot(benchIndex: number): PlayerRamSlot {
    const base = BENCH_RAM_BASE + benchIndex * PLAYER_RAM_STEP;
    const expBase = EXP_RAM_BASE + (11 + benchIndex) * EXP_RECORD_SIZE;
    const lo = this._ram8(expBase);
    const hi = this._ram8(expBase + 1);
    return {
      playerId: this._ram8(base),
      guts: (this._ram8(base + 2) << 8) | this._ram8(base + 1),
      level: this._ram8(base + 3),
      exp: (hi << 8) | lo,
    };
  }

  /** 读取 CPU 球员槽 (RAM $0384+) */
  getCpuSlot(cpuIndex: number): PlayerRamSlot {
    const base = CPU_RAM_BASE + cpuIndex * PLAYER_RAM_STEP;
    return {
      playerId: this._ram8(base),
      guts: (this._ram8(base + 2) << 8) | this._ram8(base + 1),
      level: this._ram8(base + 3),
      exp: 0,  // CPU 队无经验值
    };
  }

  // ── 内部: RAM 读写辅助 ──

  /** 读 RAM 字节 (键名 ram_XXXX, 4位大写16进制) */
  private _ram8(addr: number): number {
    return this._store.read(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`);
  }

  /** 经验值键名 */
  private _expKey(playerIndex: number, offset: number): string {
    const addr = EXP_RAM_BASE + playerIndex * EXP_RECORD_SIZE + offset;
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
  }

  /** 球员槽键名 */
  private _playerKey(playerIndex: number, offset: number): string {
    const addr = PLAYER_RAM_BASE + playerIndex * PLAYER_RAM_STEP + offset;
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
  }
}
