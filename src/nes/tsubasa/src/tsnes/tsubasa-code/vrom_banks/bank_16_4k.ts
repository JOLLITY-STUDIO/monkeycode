/**
 * CHR-ROM bank 16 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_8 from '../chr_banks/bank_8_8k';

/** VROM bank 16 (4KB) — first half of _CHR_BANK_8 */
const _VROM_BANK_16: readonly number[] = _CHR_BANK_8.slice(0, 4096);

export default _VROM_BANK_16;
