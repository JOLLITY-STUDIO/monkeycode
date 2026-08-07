/**
 * H5 游戏配置对象
 *
 * 来源: Captain Tsubasa II - Super Striker (Japan)
 * 不是 NES 模拟器，只保留渲染/布局必要的参数。
 */

// ═══════════════════════════════════════════
// NameTable 拼接方式
// ═══════════════════════════════════════════

export enum Mirroring {
  Horizontal = 0, // NT0 左 / NT1 右 (64×30 水平世界)
  Vertical   = 1, // NT0 上 / NT1 下 (32×60 垂直世界)
}

export const CONFIG = {
  mirroring: Mirroring.Horizontal,
} as const;
