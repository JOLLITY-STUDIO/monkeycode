/**
 * Bank 類型定義 - 支援 ASM→TS 逐指令翻譯
 * @see _asm2ts_spec.md
 */
import type { Byte, Word } from '../../disasm/_types';
import type { GameContext } from '../../disasm/_context';

// ============================================================
// ROM 讀取介面 (模擬 6502 從 ROM 讀取資料)
// ============================================================

export interface BankRomSlice {
  /** 讀取單 byte (相對目前 bank CPU $8000 位址偏移量, 即 offset = cpuAddr - 0x8000) */
  u8(offset: number): Byte;
  /** 讀取 little-endian word */
  u16le(offset: number): Word;
  /** bank 數據陣列 (0x2000 bytes = $8000-$9FFF) */
  readonly data: Readonly<Uint8Array>;
  /** bank 原始 ROM 偏移 (用於調試) */
  readonly romBase: number;
}

/**
 * 完整 ROM 讀取介面 - 跨 bank JSR 呼叫時用
 * 根據 CPU 位址解析到對應的 bank 切片
 */
export interface RomReader {
  /** 取得指定 CPU 位址所在 bank 的數據切片 */
  bank(addr: number): BankRomSlice;
  /** 讀取指定 CPU 位址的 byte (自動解析 bank) */
  u8(addr: number): Byte;
  /** 讀取指定 CPU 位址的 word */
  u16le(addr: number): Word;
}

// ============================================================
// Section 類型 (向後相容原有的覆蓋率追蹤)
// ============================================================

export type SectionType = 'code' | 'data' | 'comment' | 'empty' | 'other';

export interface BankSection {
  asm: [number, number];
  type: SectionType;
  cpu: [number | null, number | null];
  desc: string;
  entries?: Record<string, { target?: string; desc: string }>;
  ram_read?: string[];
  ram_write?: string[];
  calls?: string[];
  struct?: Array<{ offset: number; size: number; name: string; desc: string }>;
  notes?: string[];
}

// ============================================================
// Bank 函數類型: 每個翻譯後的函數簽名
// ============================================================

/** bank_XX.ts 中每個導出的翻譯函數 */
export type BankFn = (ctx: GameContext, rom: RomReader) => void;

/** Bank 模組結構: 每個 bank_NN.ts 導出此型別 */
export interface BankModule {
  /** bank 內部數據切片引用 (在 bank init 時設定) */
  readonly rom: BankRomSlice;
  /** 跳轉表分派: 根據 ctx.jumpIdx ($27) 執行對應子程序 */
  dispatch(ctx: GameContext, reader: RomReader): void;
  /** 所有導出的函數映射 (由 CPU 位址鍵索引) */
  readonly fns: Record<string, BankFn>;
}
