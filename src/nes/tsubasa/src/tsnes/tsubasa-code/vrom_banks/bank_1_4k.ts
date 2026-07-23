/**
 * CHR-ROM bank 1 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_0 from '../chr_banks/bank_0_8k';

/** VROM bank 1 (4KB) — second half of _CHR_BANK_0 */
const _VROM_BANK_1: readonly number[] = _CHR_BANK_0.slice(4096, 8192);

export default _VROM_BANK_1;
