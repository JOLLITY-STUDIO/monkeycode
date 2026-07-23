/**
 * CHR-ROM bank 17 (4KB) — auto-split from chr_rom_data.ts
 * Mapper: 4 (MMC3)
 *
 * 256 个 8×8 tile
 */

import _CHR_BANK_8 from '../chr_banks/bank_8_8k';

/** VROM bank 17 (4KB) — second half of _CHR_BANK_8 */
const _VROM_BANK_17: readonly number[] = _CHR_BANK_8.slice(4096, 8192);

export default _VROM_BANK_17;
