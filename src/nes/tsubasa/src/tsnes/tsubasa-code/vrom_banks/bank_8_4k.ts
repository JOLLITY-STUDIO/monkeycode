/**
 * CHR-ROM bank 8 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_4 from '../chr_banks/bank_4_8k';

/** VROM bank 8 (4KB) — first half of _CHR_BANK_4 */
const _VROM_BANK_8: readonly number[] = _CHR_BANK_4.slice(0, 4096);

export default _VROM_BANK_8;
