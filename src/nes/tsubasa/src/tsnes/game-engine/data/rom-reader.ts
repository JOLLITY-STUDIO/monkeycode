/**
 * ============================================================================
 * ROM Reader — wraps PRG-ROM bank access for the SceneManager bytecode engine
 *
 * Maps logical CPU addresses (0x8000-0xFFFF) to physical ROM bytes using
 * the MMC3 bank mapping registers. Supports runtime bank switching to
 * enable cross-bank script execution.
 *
 * Usage:
 *   const reader = new RomReader(PRG_ROM_BANKS);
 *   const byte = reader.read(0x8000); // reads from bank0[0]
 *   reader.setBank6(3);                // switch $8000 to bank 3
 * ============================================================================
 */

import { PRG_ROM_BANKS, MMC3_INIT_MAP, readPrgRom } from '../../tsubasa-WITHOUT6502CPU/prg_rom_data';

/**
 * ROM data reader that translates logical CPU addresses to physical ROM bytes
 * using the MMC3 bank mapping scheme.
 */
export class RomReader {
  /** All 32 PRG-ROM 8KB banks (readonly) */
  readonly banks: readonly Uint8Array[] = PRG_ROM_BANKS;

  /** Current bank mapping (8KB window base → bank index) */
  private _map: Record<number, number>;

  constructor() {
    // Initialize with MMC3 defaults
    this._map = { ...MMC3_INIT_MAP };
  }

  // ─── Bank Switching ───────────────────────────────────

  /** Set PRG bank at $8000-$9FFF (R6) */
  setBank6(bank: number): void {
    this._map[0x8000] = bank & 0x3F;
  }

  /** Set PRG bank at $A000-$BFFF (R7) */
  setBank7(bank: number): void {
    this._map[0xA000] = bank & 0x3F;
  }

  /** Get current bank at $8000 */
  get bank6(): number { return this._map[0x8000]; }

  /** Get current bank at $A000 */
  get bank7(): number { return this._map[0xA000]; }

  /**
   * Synchronize bank map from GameState MMC3 registers.
   * Call this at the start of each frame/scene dispatch.
   */
  syncFromState(state: { prgBank6: number; prgBank7: number }): void {
    this._map[0x8000] = state.prgBank6 & 0x3F;
    this._map[0xA000] = state.prgBank7 & 0x3F;
  }

  // ─── Byte Reading ─────────────────────────────────────

  /**
   * Read one byte from the given logical CPU address.
   * @param addr CPU address (0x4020-0xFFFF). Addresses below 0x8000 return 0.
   * @returns the ROM byte at that address, or 0 if out of range
   */
  read(addr: number): number {
    return readPrgRom(addr, this.banks as Uint8Array[], this._map);
  }

  /**
   * Read a 16-bit little-endian word from the given address.
   * Returns (read(addr+1) << 8) | read(addr).
   */
  readWord(addr: number): number {
    const lo = this.read(addr);
    const hi = this.read((addr + 1) & 0xFFFF);
    return (hi << 8) | lo;
  }

  /**
   * Read bytes from ROM starting at addr.
   * Useful for debugging/snapshot comparison.
   */
  readBytes(addr: number, count: number): number[] {
    const bytes: number[] = [];
    for (let i = 0; i < count; i++) {
      bytes.push(this.read((addr + i) & 0xFFFF));
    }
    return bytes;
  }

  /**
   * Get the physical bank index for a given CPU address.
   * Returns the 8KB bank index that the address maps to.
   */
  getPhysicalBank(addr: number): number {
    const windowBase = addr & 0xE000;
    return this._map[windowBase] ?? 0;
  }

  /**
   * Get the bank-local offset for a given CPU address.
   */
  getOffset(addr: number): number {
    return addr & 0x1FFF;
  }
}

/** Singleton instance — use getRomReader() to access */
let _defaultReader: RomReader | null = null;

export function getDefaultRomReader(): RomReader {
  if (!_defaultReader) {
    _defaultReader = new RomReader();
  }
  return _defaultReader;
}

/**
 * Create a ROM reader with pre-set bank mapping.
 * Useful for tests that need specific bank configurations.
 */
export function createRomReader(bank6: number = 0, bank7: number = 1): RomReader {
  const reader = new RomReader();
  reader.setBank6(bank6);
  reader.setBank7(bank7);
  return reader;
}
