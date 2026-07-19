/**
 * ============================================================
 * Bank 45: bank_45 (data-only)
 *
 * ROM:  0x5a010-0x5c00f
 * CPU:  $8000-$9FFF
 * CDL:  code=8016 data=0 unacc=176
 *
 * 功能: ROM 資料區段 (無可執行代碼)
 * ============================================================
 */

// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankRomSlice } from './_bank_types';
import { ROM_DATA } from './_romdata';

const DATA: Readonly<Uint8Array> = ROM_DATA[45];

const romSlice: BankRomSlice = {
  u8(offset: number) { return DATA[offset] ?? 0; },
  u16le(offset: number) { return (DATA[offset] ?? 0) | ((DATA[offset + 1] ?? 0) << 8); },
  data: DATA,
  romBase: 368656,
};

function dispatch(_ctx: GameContext, _reader: RomReader): void {
  // Data bank — no executable code
}

export const bank_45: BankModule = {
  rom: romSlice,
  dispatch,
  fns: {},
};
