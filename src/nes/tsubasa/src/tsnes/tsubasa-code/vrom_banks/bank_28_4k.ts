/**
 * CHR-ROM bank 28 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_14 from '../chr_banks/bank_14_8k';

/** VROM bank 28 (4KB) — first half of _CHR_BANK_14 */
const _VROM_BANK_28: readonly number[] = _CHR_BANK_14.slice(0, 4096);

export default _VROM_BANK_28;
