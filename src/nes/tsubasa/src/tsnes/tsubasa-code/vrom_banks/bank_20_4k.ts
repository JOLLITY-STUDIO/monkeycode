/**
 * CHR-ROM bank 20 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_10 from '../chr_banks/bank_10_8k';

/** VROM bank 20 (4KB) — first half of _CHR_BANK_10 */
const _VROM_BANK_20: readonly number[] = _CHR_BANK_10.slice(0, 4096);

export default _VROM_BANK_20;
