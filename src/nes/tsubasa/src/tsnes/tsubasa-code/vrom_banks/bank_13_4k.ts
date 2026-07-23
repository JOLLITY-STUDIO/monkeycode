/**
 * CHR-ROM bank 13 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_6 from '../chr_banks/bank_6_8k';

/** VROM bank 13 (4KB) — second half of _CHR_BANK_6 */
const _VROM_BANK_13: readonly number[] = _CHR_BANK_6.slice(4096, 8192);

export default _VROM_BANK_13;
