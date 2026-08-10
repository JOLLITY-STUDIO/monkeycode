/**
 * SE Channel 14 Data — 自动提取自 Bank 12
 * Header: $9079
 * Sub-sections: 3
 * Track data: 0 bytes
 */

/** 子段落列表: [id, offset] 对 */
export const SE14_SUB_SECTIONS: [number, number][] = [
  [0, 4226],
  [1, 4226],
  [3, 4227],
];

/** 每个子段落的原始数据 */
export const SE14_SUB_DATA: Record<number, number[]> = {
  0: [255],
  1: [255],
  3: [224, 18, 227, 0, 129, 0, 1, 2, 3, 4, 5, 6, 235, 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 236, 11, 12, 13, 14, 150, 15, 255],
};

/** 轨道命令数据 */
export const SE14_TRACK: readonly number[] = [

];
