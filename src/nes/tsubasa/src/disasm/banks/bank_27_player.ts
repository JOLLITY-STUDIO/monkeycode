import { ROM } from './_romdata/bank_27_data';
/**
 * ============================================================
 * Bank 27: 小工具函数 (384 bytes code)
 *
 * CPU: $8000-$9FFF | CDL: code=384 data=6021 unacc=1787
 * 功能: 球员数据查询, 数据表读取
 * ============================================================
 */
// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';

const u8 = (v: number): number => v & 0xFF;
const DATA: Readonly<Uint8Array> = ROM;
const romSlice = { u8(o: number) { return DATA[o]??0; }, u16le(o: number) { return (DATA[o]??0)|((DATA[o+1]??0)<<8); }, data: DATA, romBase: 0x36010 };

/** $8103 playerDataQuery: 球员数据查询 (唯一入口) */
function playerDataQuery(ctx: GameContext, rom: RomReader): void {
  const playerIdx = ctx.ram.u8(0x34);
  const dataType = ctx.ram.u8(0x35); // 0=name, 1=stat, 2=pos
  const tableBase = 0x8103 - 0x8000;
  const offset = dataType * 32 + playerIdx * 2;
  const lo = romSlice.u8(tableBase + offset);
  const hi = romSlice.u8(tableBase + offset + 1);
  ctx.ram.setU8(0x36, lo);
  ctx.ram.setU8(0x37, hi);
}

const fns: Record<string, BankFn> = {
  '$8000': playerDataQuery,
};

function dispatch(ctx: GameContext, rom: RomReader): void {
  playerDataQuery(ctx, rom);
}

export const bank_27: BankModule = {
  rom: romSlice, dispatch, fns,
  playerDataQuery,
};
