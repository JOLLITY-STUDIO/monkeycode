/**
 * CHR-ROM bank 15 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_7 from '../chr_banks/bank_7_8k';

/** VROM bank 15 (4KB) — second half of _CHR_BANK_7 */
const _VROM_BANK_15: readonly number[] = _CHR_BANK_7.slice(4096, 8192);

export default _VROM_BANK_15;
