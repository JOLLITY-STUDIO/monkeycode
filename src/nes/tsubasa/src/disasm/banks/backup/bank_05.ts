/**
 * ============================================================
 * Bank 5: bank_05 (data-only)
 *
 * ROM:  0xa010-0xc00f
 * CPU:  $8000-$9FFF
 * CDL:  code=0 data=8157 unacc=35
 *
 * 功能: ROM 資料區段 (無可執行代碼)
 * ============================================================
 */

// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankRomSlice } from './_bank_types';
import { ROM_DATA } from './_romdata';

const DATA: Readonly<Uint8Array> = ROM_DATA[5];

const romSlice: BankRomSlice = {
  u8(offset: number) { return DATA[offset] ?? 0; },
  u16le(offset: number) { return (DATA[offset] ?? 0) | ((DATA[offset + 1] ?? 0) << 8); },
  data: DATA,
  romBase: 40976,
};

function dispatch(_ctx: GameContext, _reader: RomReader): void {
  // Data bank — no executable code
}

export const bank_05: BankModule = {
  rom: romSlice,
  dispatch,
  fns: {},
};
