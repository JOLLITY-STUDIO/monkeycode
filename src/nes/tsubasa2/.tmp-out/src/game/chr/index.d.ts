export declare const CHR_BANK_SIZE = 8192;
export declare const CHR_BANK_COUNT = 16;
/** CHR bank 表 (每个 8KB) */
export declare const CHR_BANKS: readonly (readonly number[])[];
/** 完整 CHR ROM (128KB Uint8Array, 供 core ROM.loadTs 直接加载) */
export declare const NES_CHR_ROM: Uint8Array;
