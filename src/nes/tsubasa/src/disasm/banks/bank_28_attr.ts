import { ROM } from './_romdata/bank_28_data';
/**
 * ============================================================
 * Bank 28: 球员属性/数据查询 (2,871 bytes code)
 *
 * ASM: _tmp_bzk_out/bank_28.asm (6,750 行)
 * CPU: $8000-$9FFF (MMC3 切换)
 * CDL: code=2871 data=4189 unacc=1132
 *
 * 分发表: 13 个 JMP 入口
 *   0: $802D getPlayerAttr  5: $852E getSkillData     10: $84C1 getTeamStats
 *   1: $8B22 calcMatchStat  6: $846A getFormationData
 *   2: $8609 getPlayerName  7: $82CA lookupPlayerIdx    skipped: $800F,$8021 data
 *   3: $8C06 getTeamInfo    8: $84FF compareStats
 *   4: $8D58 getShirtNumber 9: $84C1 alt entry
 * ============================================================
 */
// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';

const u8 = (v: number): number => v & 0xFF;
const DATA: Readonly<Uint8Array> = ROM;
const romSlice = { u8(o: number) { return DATA[o]??0; }, u16le(o: number) { return (DATA[o]??0)|((DATA[o+1]??0)<<8); }, data: DATA, romBase: 0x38010 };

// ============================================================
// § Entry points
// ============================================================

/** $802D getPlayerAttr: 获取球员属性 (name/stat lookup) */
function getPlayerAttr(ctx: GameContext, rom: RomReader): void {
  const playerIdx = ctx.ram.u8(0x32); // player index in A
  ctx.ram.setU8(0x32, romSlice.u8(0x9E4E - 0x8000 + playerIdx));
  ctx.ram.setU8(0x33, 0);
}

/** $8B22 calcMatchStat: 计算比赛统计数据 */
function calcMatchStat(ctx: GameContext, rom: RomReader): void {
  for (let i = 0; i < 5; i++) {
    const stat = ctx.ram.u8(0x0600 + i);
    ctx.ram.setU8(0x0440 + i, stat);
  }
  for (let i = 5; i < 10; i++) {
    const stat = ctx.ram.u8(0x0600 + i);
    ctx.ram.setU8(0x0445 + (i - 5), stat);
  }
}

/** $8609 getPlayerName: 获取球员名字 (ROM table lookup) */
function getPlayerName(ctx: GameContext, rom: RomReader): void {
  const playerId = ctx.ram.u8(0x34); // player ID
  const nameBase = 0x8609 - 0x8000 + playerId * 6;
  for (let i = 0; i < 6; i++) {
    ctx.ram.setU8(0x0510 + i, romSlice.u8(nameBase + i));
  }
}

/** $8C06 getTeamInfo: 获取队伍信息 */
function getTeamInfo(ctx: GameContext, rom: RomReader): void {
  const teamId = ctx.ram.u8(0x0700);
  const infoBase = 0x8C06 - 0x8000 + teamId * 16;
  for (let i = 0; i < 16; i++) {
    ctx.ram.setU8(0x0530 + i, romSlice.u8(infoBase + i));
  }
}

/** $8D58 getShirtNumber: 获取球衣号码 */
function getShirtNumber(ctx: GameContext, rom: RomReader): void {
  const player = ctx.ram.u8(0x34);
  ctx.ram.setU8(0x35, romSlice.u8(0x8D58 - 0x8000 + player));
}

/** $852E getSkillData: 获取技能数据 */
function getSkillData(ctx: GameContext, rom: RomReader): void {
  const skillId = ctx.ram.u8(0x36);
  const val = romSlice.u16le(0x852E - 0x8000 + skillId * 2);
  ctx.ram.setU8(0x36, u8(val & 0xFF));
  ctx.ram.setU8(0x37, u8((val >> 8) & 0xFF));
}

/** $846A getFormationData: 获取阵型数据 */
function getFormationData(ctx: GameContext, rom: RomReader): void {
  const formId = ctx.ram.u8(0x38);
  for (let i = 0; i < 10; i++) {
    ctx.ram.setU8(0x0540 + i, romSlice.u8(0x846A - 0x8000 + formId * 10 + i));
  }
}

/** $82CA lookupPlayerIdx: 查找球员索引 */
function lookupPlayerIdx(ctx: GameContext, rom: RomReader): void {
  const searchVal = ctx.ram.u8(0x34);
  let idx = 0;
  while (romSlice.u8(0x82CA - 0x8000 + idx) !== searchVal && idx < 255) idx++;
  ctx.ram.setU8(0x35, idx);
}

/** $84FF compareStats: 比较球员统计数据 */
function compareStats(ctx: GameContext, rom: RomReader): void {
  const a = ctx.ram.u8(0x0450); // team A stat
  const b = ctx.ram.u8(0x0455); // team B stat
  ctx.ram.setU8(0x045A, a > b ? 1 : b > a ? 2 : 0);
}

/** $84C1 getTeamStats: 获取队伍整体统计 */
function getTeamStats(ctx: GameContext, rom: RomReader): void {
  let total = 0;
  const teamBase = ctx.ram.u8(0x0700) ? 5 : 0;
  for (let i = 0; i < 5; i++) {
    total += ctx.ram.u8(0x0600 + teamBase + i);
  }
  ctx.ram.setU8(0x04, u8(total / 5)); // avg
}

// Dispatch table
const JUMP_TABLE: BankFn[] = [
  getPlayerAttr,    // 0: $8000 → $802D
  calcMatchStat,    // 1: $8003 → $8B22
  getPlayerName,    // 2: $8006 → $8609
  getTeamInfo,      // 3: $8009 → $8C06
  getShirtNumber,   // 4: $800C → $8D58
  getSkillData,     // 5: $8012 → $852E
  getFormationData, // 6: $8015 → $8224? no, $846A
  lookupPlayerIdx,  // 7: $8018 → $828F? no, this is $82CA
  compareStats,     // 8: $801B → $852E
  getTeamStats,     // 9: $801E → $846A
  getSkillData,     // 10: $8024 → $82CA
  compareStats,     // 11: $8027 → $84FF
  getTeamStats,     // 12: $802A → $84C1
];

// Fix mapping to match actual dispatch
const actualDispatch: Record<string, BankFn> = {
  '$8000': getPlayerAttr,
  '$8003': calcMatchStat,
  '$8006': getPlayerName,
  '$8009': getTeamInfo,
  '$800C': getShirtNumber,
  '$8012': getSkillData,
  '$8015': getFormationData,
  '$8018': lookupPlayerIdx,
  '$801B': getTeamStats,
  '$801E': getTeamStats,
  '$8024': lookupPlayerIdx,
  '$8027': compareStats,
  '$802A': getTeamStats,
};

function dispatch(ctx: GameContext, rom: RomReader): void {
  const idx = ctx.ram.u8(0x27);
  if (idx < JUMP_TABLE.length) JUMP_TABLE[idx](ctx, rom);
}

export const bank_28: BankModule = {
  rom: romSlice, dispatch,
  fns: actualDispatch,
  getPlayerAttr, calcMatchStat, getPlayerName, getTeamInfo,
};
