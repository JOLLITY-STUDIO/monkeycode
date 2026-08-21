/**
 * 天使之翼2 — ROM 定义入口
 *
 * 完整 ROM = header + prg (翻译 bank 类) + chr (原始图块字节)。
 * core 的 ROM.loadTs(header, prg, chr) 直接加载本入口导出的数据。
 */
import { HEADER } from './header';
import { NES_CHR_ROM, CHR_BANKS, CHR_BANK_COUNT, CHR_BANK_SIZE } from './chr';
import * as PRG from './prg';

export { HEADER } from './header';
export { Mirroring, CONFIG } from './header';
export { NES_CHR_ROM, CHR_BANKS, CHR_BANK_COUNT, CHR_BANK_SIZE } from './chr';
export * from './prg';

/** ROM 定义 (header + prg + chr) — 传给 core ROM.loadTs */
export const ROM = {
  header: HEADER,
  prg: PRG,
  chr: NES_CHR_ROM,
} as const;
