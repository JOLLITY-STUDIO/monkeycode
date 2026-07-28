/**
 * CHR-ROM 数据层 — 对应 tsubasa-hex2asm/chr_rom_data.ts
 *
 * 直接从上层聚合文件 re-export CHR/VROM bank 数据。
 * CHR-ROM: 16 个 8KB bank (8192 tiles)，用于 buildRomBuffer 组装和 mapper CHR 切页。
 * VROM: 32 个 4KB bank，兼容 rom.ts 内部格式。
 */

export {
  CHR_ROM_BANKS,
  CHR_VROM_BANKS,
  CHR_ROM_SIZE,
  CHR_BANK_COUNT,
  CHR_VROM_COUNT,
} from '../../tsubasa-hex2asm/chr_rom_data';
