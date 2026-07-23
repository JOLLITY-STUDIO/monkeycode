/**
 * CHR-ROM bank 7 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_3 from '../chr_banks/bank_3_8k';

/** VROM bank 7 (4KB) — second half of _CHR_BANK_3 */
const _VROM_BANK_7: readonly number[] = _CHR_BANK_3.slice(4096, 8192);

export default _VROM_BANK_7;
