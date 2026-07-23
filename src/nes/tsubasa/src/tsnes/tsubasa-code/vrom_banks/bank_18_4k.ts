/**
 * CHR-ROM bank 18 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_9 from '../chr_banks/bank_9_8k';

/** VROM bank 18 (4KB) — first half of _CHR_BANK_9 */
const _VROM_BANK_18: readonly number[] = _CHR_BANK_9.slice(0, 4096);

export default _VROM_BANK_18;
