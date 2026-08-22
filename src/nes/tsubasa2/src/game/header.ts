/**
 * 真实 iNES header — Captain Tsubasa II: Super Striker (Japan)
 *
 *   prg16k=16  chr8k=16  mapper=4 (MMC3)  mirroring=0 (Horizontal)
 *
 * NES 2.0 (byte7=0x08 → (byte7&0x0c)===0x08)：byte9=0 不走 exponent 扩展，编码与 iNES 1.0 兼容
 *
 * ⚠️ bank 编号体系换算（防混淆）：
 *   MMC3 切换粒度 = 8KB → 项目 asm/bank00-31、CDL、PRG 数据均按 8KB 块
 *   Mesen/fceux trace 的 bank 前缀 = 16KB bank 编号 (iNES 单位)
 *   Mesen bank N ↔ 8KB 块 2N 和 2N+1
 *   例: trace "$06:818C STA $4000,X" = 16KB bank 6 = 物理 0x18000 = 8KB 块 12/13 (音频引擎)
 *       trace "$0F:C496"            = 16KB bank 15 = 物理 0x3C000 = 8KB 块 30/31 (切 bank 例程)
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
