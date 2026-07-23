/**
 * CHR-ROM bank 6 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_3 from '../chr_banks/bank_3_8k';

/** VROM bank 6 (4KB) — first half of _CHR_BANK_3 */
const _VROM_BANK_6: readonly number[] = _CHR_BANK_3.slice(0, 4096);

export default _VROM_BANK_6;
