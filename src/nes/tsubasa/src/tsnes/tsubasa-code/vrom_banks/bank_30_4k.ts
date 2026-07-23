/**
 * CHR-ROM bank 30 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_15 from '../chr_banks/bank_15_8k';

/** VROM bank 30 (4KB) — first half of _CHR_BANK_15 */
const _VROM_BANK_30: readonly number[] = _CHR_BANK_15.slice(0, 4096);

export default _VROM_BANK_30;
