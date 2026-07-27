/**
 * core/def — 纯类型定义与常量
 *
 * 本目录下所有文件均为纯类型/常量。
 * 不包含任何可变状态或实现类。
 */

// bank
export type { Bank, ChrBank } from './bank';
export {
  PRG_BANK_SIZE, PRG_BANK_COUNT, PRG_TOTAL_SIZE, PRG_BANK_META,
  CHR_VROM_SIZE, CHR_VROM_COUNT, CHR_TOTAL_SIZE,
  TILE_SIZE, TILES_PER_VROM, TOTAL_TILES, CHR_BANK_META,
} from './bank';

// frame
export type { Frame } from './frame';

// script
export {
  BytecodeOp, BYTECODE_TABLE,
  isDirectChar, getOpcodeInfo,
  BytecodeState,
} from './script';
export type { BytecodeOpInfo, BytecodeEvent } from './script';
