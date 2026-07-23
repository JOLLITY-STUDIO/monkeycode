/**
 * CHR-ROM bank 26 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_13 from '../chr_banks/bank_13_8k';

/** VROM bank 26 (4KB) — first half of _CHR_BANK_13 */
const _VROM_BANK_26: readonly number[] = _CHR_BANK_13.slice(0, 4096);

export default _VROM_BANK_26;
