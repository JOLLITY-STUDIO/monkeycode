/**
 * 真实 iNES header — Captain Tsubasa II: Super Striker (Japan)
 *
 *   prg16k=16  chr8k=16  mapper=4 (MMC3)  mirroring=0 (Horizontal)
 */
export const HEADER = new Uint8Array([
  0x4e, 0x45, 0x53, 0x1a, // "NES\x1a"
  0x10,                   // PRG ROM: 16 × 16KB = 256KB
  0x10,                   // CHR ROM: 16 × 8KB = 128KB
  0x40,                   // mapper 4 (MMC3) | mirroring Horizontal(0)
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]);

// ═══════════════════════════════════════════
// NameTable 拼接方式 (渲染参数, 保留)
// ═══════════════════════════════════════════

export enum Mirroring {
  Horizontal = 0, // NT0 左 / NT1 右 (64×30 水平世界)
  Vertical   = 1, // NT0 上 / NT1 下 (32×60 垂直世界)
}

export const CONFIG = {
  mirroring: Mirroring.Horizontal,
} as const;
