/**
 * CHR-ROM bank 5 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_2 from '../chr_banks/bank_2_8k';

/** VROM bank 5 (4KB) — second half of _CHR_BANK_2 */
const _VROM_BANK_5: readonly number[] = _CHR_BANK_2.slice(4096, 8192);

export default _VROM_BANK_5;
