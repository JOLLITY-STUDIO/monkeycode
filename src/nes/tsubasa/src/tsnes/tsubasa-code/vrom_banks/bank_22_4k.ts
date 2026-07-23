/**
 * CHR-ROM bank 22 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_11 from '../chr_banks/bank_11_8k';

/** VROM bank 22 (4KB) — first half of _CHR_BANK_11 */
const _VROM_BANK_22: readonly number[] = _CHR_BANK_11.slice(0, 4096);

export default _VROM_BANK_22;
