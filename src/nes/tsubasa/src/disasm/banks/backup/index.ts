/**
 * Bank 统一导出模块 — 48 banks complete
 * 所有 bank_XX.ts 导出格式: export const bank_XX: BankModule
 */

import type { BankModule } from './_bank_types';
import { registerBank } from './_crossbank';
import { bank_00 } from './bank_00';
import { bank_01 } from './bank_01';
import { bank_02 } from './bank_02';
import { bank_03 } from './bank_03';
import { bank_04 } from './bank_04';
import { bank_05 } from './bank_05';
import { bank_06 } from './bank_06';
import { bank_07 } from './bank_07';
import { bank_08 } from './bank_08';
import { bank_09 } from './bank_09';
import { bank_10 } from './bank_10';
import { bank_11 } from './bank_11';
import { bank_12 } from './bank_12';
import { bank_13 } from './bank_13';
import { bank_14 } from './bank_14';
import { bank_15 } from './bank_15';
import { bank_16 } from './bank_16';
import { bank_17 } from './bank_17';
import { bank_18 } from './bank_18';
import { bank_19 } from './bank_19';
import { bank_20 } from './bank_20';
import { bank_21 } from './bank_21';
import { bank_22 } from './bank_22';
import { bank_23 } from './bank_23';
import { bank_24 } from './bank_24';
import { bank_25 } from './bank_25';
import { bank_26 } from './bank_26';
import { bank_27 } from './bank_27';
import { bank_28 } from './bank_28';
import { bank_29 } from './bank_29';
import { bank_30 } from './bank_30';
import { bank_31 } from './bank_31';
import { bank_32 } from './bank_32';
import { bank_33 } from './bank_33';
import { bank_34 } from './bank_34';
import { bank_35 } from './bank_35';
import { bank_36 } from './bank_36';
import { bank_37 } from './bank_37';
import { bank_38 } from './bank_38';
import { bank_39 } from './bank_39';
import { bank_40 } from './bank_40';
import { bank_41 } from './bank_41';
import { bank_42 } from './bank_42';
import { bank_43 } from './bank_43';
import { bank_44 } from './bank_44';
import { bank_45 } from './bank_45';
import { bank_46 } from './bank_46';
import { bank_47 } from './bank_47';

export const allBanks: Record<number, BankModule> = {
  0: bank_00,   1: bank_01,   2: bank_02,   3: bank_03,
  4: bank_04,   5: bank_05,   6: bank_06,   7: bank_07,
  8: bank_08,   9: bank_09,  10: bank_10,  11: bank_11,
  12: bank_12, 13: bank_13, 14: bank_14, 15: bank_15,
  16: bank_16, 17: bank_17, 18: bank_18, 19: bank_19,
  20: bank_20, 21: bank_21, 22: bank_22, 23: bank_23,
  24: bank_24, 25: bank_25, 26: bank_26, 27: bank_27,
  28: bank_28, 29: bank_29, 30: bank_30, 31: bank_31,
  32: bank_32, 33: bank_33, 34: bank_34, 35: bank_35,
  36: bank_36, 37: bank_37, 38: bank_38, 39: bank_39,
  40: bank_40, 41: bank_41, 42: bank_42, 43: bank_43,
  44: bank_44, 45: bank_45, 46: bank_46, 47: bank_47,
};

// Register all banks for cross-bank dispatch
for (let i = 0; i < 48; i++) {
  registerBank(i, allBanks[i]);
}

export type { BankModule, BankFn, BankRomSlice, RomReader, BankSection, SectionType } from './_bank_types';
export { VECTORS } from './bank_31';
