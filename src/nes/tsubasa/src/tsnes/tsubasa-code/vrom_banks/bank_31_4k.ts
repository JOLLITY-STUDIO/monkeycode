/**
 * CHR-ROM bank 31 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_15 from '../chr_banks/bank_15_8k';

/** VROM bank 31 (4KB) — second half of _CHR_BANK_15 */
const _VROM_BANK_31: readonly number[] = _CHR_BANK_15.slice(4096, 8192);

export default _VROM_BANK_31;
