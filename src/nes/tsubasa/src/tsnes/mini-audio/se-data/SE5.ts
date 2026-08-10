/**
 * SE Channel 5 Data — 自动提取自 Bank 12
 * Header: $8fad
 * Sub-sections: 3
 * Track data: 0 bytes
 */

/** 子段落列表: [id, offset] 对 */
export const SE5_SUB_SECTIONS: [number, number][] = [
  [0, 4022],
  [1, 4022],
  [3, 4023],
];

/** 每个子段落的原始数据 */
export const SE5_SUB_DATA: Record<number, number[]> = {
  0: [255],
  1: [255],
  3: [130, 232, 148, 142, 0, 197, 143, 1, 65, 144, 3, 70, 144, 255],
};

/** 轨道命令数据 */
export const SE5_TRACK: readonly number[] = [

];
