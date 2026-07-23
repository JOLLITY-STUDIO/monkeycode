/**
 * CHR-ROM bank 9 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_4 from '../chr_banks/bank_4_8k';

/** VROM bank 9 (4KB) — second half of _CHR_BANK_4 */
const _VROM_BANK_9: readonly number[] = _CHR_BANK_4.slice(4096, 8192);

export default _VROM_BANK_9;
