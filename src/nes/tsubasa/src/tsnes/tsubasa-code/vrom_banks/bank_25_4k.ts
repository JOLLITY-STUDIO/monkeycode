/**
 * CHR-ROM bank 25 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_12 from '../chr_banks/bank_12_8k';

/** VROM bank 25 (4KB) — second half of _CHR_BANK_12 */
const _VROM_BANK_25: readonly number[] = _CHR_BANK_12.slice(4096, 8192);

export default _VROM_BANK_25;
