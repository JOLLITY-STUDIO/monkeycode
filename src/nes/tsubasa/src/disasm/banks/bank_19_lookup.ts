import { ROM } from './_romdata/bank_19_data';
/**
 * ============================================================
 * Bank 19: 辅助数据 (877 bytes code, mostly data)
 *
 * CPU: $8000-$9FFF | CDL: code=877 data=5021 unacc=2294
 * 主要用于 ROM 数据表读取
 * ============================================================
 */
// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';

const u8 = (v: number): number => v & 0xFF;
const DATA: Readonly<Uint8Array> = ROM;
const romSlice = { u8(o: number) { return DATA[o]??0; }, u16le(o: number) { return (DATA[o]??0)|((DATA[o+1]??0)<<8); }, data: DATA, romBase: 0x26010 };

/** dataLookup: 通用数据表查找 */
function dataLookup(ctx: GameContext, rom: RomReader): void {
  const tableIdx = ctx.ram.u8(0x3A);
  const offset = ctx.ram.u8(0x3B);
  const val = romSlice.u8(tableIdx * 0x100 + offset);
  ctx.ram.setU8(0x3C, val);
}

const fns: Record<string, BankFn> = {
  '$8000': dataLookup,
};

function dispatch(ctx: GameContext, rom: RomReader): void {
  dataLookup(ctx, rom);
}

export const bank_19: BankModule = {
  rom: romSlice, dispatch, fns,
  dataLookup,
};
