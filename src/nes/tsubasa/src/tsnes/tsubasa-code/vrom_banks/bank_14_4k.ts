/**
 * CHR-ROM bank 14 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_7 from '../chr_banks/bank_7_8k';

/** VROM bank 14 (4KB) — first half of _CHR_BANK_7 */
const _VROM_BANK_14: readonly number[] = _CHR_BANK_7.slice(0, 4096);

export default _VROM_BANK_14;
