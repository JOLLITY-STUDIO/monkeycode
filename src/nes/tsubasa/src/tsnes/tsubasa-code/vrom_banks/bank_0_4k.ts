/**
 * CHR-ROM bank 0 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_0 from '../chr_banks/bank_0_8k';

/** VROM bank 0 (4KB) — first half of _CHR_BANK_0 */
const _VROM_BANK_0: readonly number[] = _CHR_BANK_0.slice(0, 4096);

export default _VROM_BANK_0;
