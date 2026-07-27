/**
 * header — iNES ROM 头部解析（通用）
 *
 * 从 16 字节 raw header 解析 RomHeader 结构。
 * 所有数值十进制，无 hex。
 */

/** 文件魔数: N E S 0x1A → [78, 69, 83, 26] */
export const MAGIC_NES = [78, 69, 83, 26];

/**
 * 从原始 16 字节解析 iNES / NES 2.0 头部
 */
export function parseHeader(raw: number[]) {
  const prgPages = raw[4] ?? 0;
  const chrPages = raw[5] ?? 0;
  const flags6   = raw[6] ?? 0;
  const flags7   = raw[7] ?? 0;

  // Mapper = flags6.high4 | flags7.high4
  const mapperLo  = (flags6 >>> 4);
  const mapperHi  = (flags7 & 240);
  const mapper    = mapperLo | mapperHi;

  // Mirroring: flags6.bit0
  const mirroring = flags6 & 1;

  // Trainer: flags6.bit2
  const hasTrainer    = (flags6 & 4) !== 0;
  // Battery: flags6.bit1
  const hasBatteryRam = (flags6 & 2) !== 0;

  // NES 2.0: flags7.bit2-3 = 10
  const isNes20 = (flags7 & 12) === 8;

  // PRG-RAM / CHR-RAM (NES 2.0)
  let prgRamSize = 0;
  let chrRamSize = 0;
  if (isNes20 && raw.length >= 16) {
    const ramShift = raw[10] & 15;
    if (ramShift > 0) prgRamSize = 64 * (1 << ramShift);
    const chrShift = raw[11] & 15;
    if (chrShift > 0) chrRamSize = 64 * (1 << chrShift);
  }

  return {
    magic: MAGIC_NES,
    prgRomPages: prgPages,
    chrRomPages: chrPages,
    flags6: flags6,
    flags7: flags7,
    mapper: mapper,
    mirroring: mirroring,
    hasTrainer: hasTrainer,
    hasBatteryRam: hasBatteryRam,
    prgRamSize: prgRamSize,
    chrRamSize: chrRamSize,
  };
}

