// ============================================================================
// config.ts — 游戏配置（来自 iNES header 元信息）
// ROM 唯一需要的信息：Mapper 类型、镜像模式、容量等
// ============================================================================

/** Mapper 编号 */
export const MAPPER = 4; // MMC3

/** 镜像模式: 0 = 水平, 1 = 垂直 */
export const MIRRORING = 0; // 水平镜像

/** 是否有电池存档 */
export const HAS_BATTERY = false;

/** PRG-ROM 总大小 (bytes) */
export const PRG_SIZE = 262144;

/** CHR-ROM 总大小 (bytes) */
export const CHR_SIZE = 131072;

/** CPU 时序: NTSC */
export const TIMING = 'NTSC';
