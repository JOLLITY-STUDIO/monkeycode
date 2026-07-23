/**
 * CHR-ROM bank 2 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_1 from '../chr_banks/bank_1_8k';

/** VROM bank 2 (4KB) — first half of _CHR_BANK_1 */
const _VROM_BANK_2: readonly number[] = _CHR_BANK_1.slice(0, 4096);

export default _VROM_BANK_2;
