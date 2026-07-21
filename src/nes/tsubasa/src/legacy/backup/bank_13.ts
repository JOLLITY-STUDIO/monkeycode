/**
 * ============================================================
 * Bank 13: bank_13 (data-only)
 *
 * ROM:  0x1a010-0x1c00f
 * CPU:  $8000-$9FFF
 * CDL:  code=0 data=8176 unacc=16
 *
 * 功能: ROM 資料區段 (無可執行代碼)
 * ============================================================
 */

// @ts-nocheck
import type { GameContext } from '../_context';
import type { BankModule, RomReader, BankRomSlice } from './_bank_types';
import { ROM_DATA } from './_romdata';

const DATA: Readonly<Uint8Array> = ROM_DATA[13];

const romSlice: BankRomSlice = {
  u8(offset: number) { return DATA[offset] ?? 0; },
  u16le(offset: number) { return (DATA[offset] ?? 0) | ((DATA[offset + 1] ?? 0) << 8); },
  data: DATA,
  romBase: 106512,
};

function dispatch(_ctx: GameContext, _reader: RomReader): void {
  // Data bank — no executable code
}

export const bank_13: BankModule = {
  rom: romSlice,
  dispatch,
  fns: {},
};
