/**
 * Opening sprite table - Tecmo logo (frame 30 emulator-observed)
 * Source: tsnes emulator OAM dump (output/emu-reference/frame-030/oam.json).
 * Placeholder until WBS L1/L2/L3 (PRG $21CA/$1DD1/$85EB) translated.
 */
export interface BootSpriteEntry {
  readonly slot: number;
  readonly y: number;
  readonly tile: number;
  readonly attr: number;
  readonly x: number;
}

export const BOOT_TECMO_OAM_TABLE: ReadonlyArray<BootSpriteEntry> = [
  { slot: 0,  y: 72,  tile: 80,  attr: 0, x: 72 },
  { slot: 1,  y: 112, tile: 246, attr: 2, x: 72 },
  { slot: 2,  y: 120, tile: 252, attr: 2, x: 72 },
  { slot: 3,  y: 128, tile: 234, attr: 1, x: 72 },
  { slot: 4,  y: 128, tile: 254, attr: 2, x: 72 },
  { slot: 5,  y: 72,  tile: 230, attr: 1, x: 78 },
  { slot: 6,  y: 80,  tile: 82,  attr: 0, x: 78 },
  { slot: 7,  y: 80,  tile: 250, attr: 1, x: 78 },
  { slot: 8,  y: 80,  tile: 83,  attr: 0, x: 86 },
  { slot: 9,  y: 80,  tile: 251, attr: 1, x: 86 },
  { slot: 10, y: 88,  tile: 88,  attr: 0, x: 80 },
  { slot: 11, y: 88,  tile: 229, attr: 1, x: 80 },
  { slot: 12, y: 96,  tile: 90,  attr: 0, x: 80 },
  { slot: 13, y: 96,  tile: 231, attr: 1, x: 80 },
  { slot: 14, y: 104, tile: 86,  attr: 0, x: 76 },
  { slot: 15, y: 104, tile: 87,  attr: 0, x: 84 },
  { slot: 16, y: 104, tile: 237, attr: 1, x: 80 },
  { slot: 17, y: 112, tile: 92,  attr: 0, x: 76 },
  { slot: 18, y: 112, tile: 93,  attr: 0, x: 84 },
  { slot: 19, y: 112, tile: 238, attr: 1, x: 74 },
  { slot: 20, y: 112, tile: 239, attr: 1, x: 82 },
  { slot: 21, y: 120, tile: 94,  attr: 0, x: 76 },
  { slot: 22, y: 120, tile: 95,  attr: 0, x: 84 },
  { slot: 23, y: 120, tile: 232, attr: 1, x: 74 },
  { slot: 24, y: 120, tile: 233, attr: 1, x: 82 },
  { slot: 25, y: 128, tile: 85,  attr: 0, x: 80 },
  { slot: 26, y: 128, tile: 235, attr: 1, x: 80 },
  { slot: 27, y: 128, tile: 255, attr: 2, x: 80 },
  { slot: 28, y: 88,  tile: 89,  attr: 0, x: 88 },
  { slot: 29, y: 88,  tile: 240, attr: 1, x: 88 },
  { slot: 30, y: 96,  tile: 91,  attr: 0, x: 88 },
  { slot: 31, y: 96,  tile: 242, attr: 1, x: 88 },
  { slot: 32, y: 104, tile: 84,  attr: 0, x: 92 },
  { slot: 33, y: 104, tile: 248, attr: 1, x: 88 },
  { slot: 34, y: 96,  tile: 247, attr: 2, x: 96 },
  { slot: 35, y: 96,  tile: 81,  attr: 0, x: 96 },
  { slot: 36, y: 96,  tile: 243, attr: 1, x: 96 },
  { slot: 37, y: 104, tile: 249, attr: 1, x: 96 },
  { slot: 38, y: 104, tile: 253, attr: 2, x: 96 },
  { slot: 39, y: 104, tile: 236, attr: 1, x: 72 },
];
