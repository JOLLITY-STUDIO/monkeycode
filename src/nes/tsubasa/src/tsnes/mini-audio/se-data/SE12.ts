/**
 * SE Channel 12 Data — 自动提取自 Bank 12
 * Header: $91ea
 * Sub-sections: 3
 * Track data: 0 bytes
 */

/** 子段落列表: [id, offset] 对 */
export const SE12_SUB_SECTIONS: [number, number][] = [
  [0, 4596],
  [1, 4656],
  [3, 4595],
];

/** 每个子段落的原始数据 */
export const SE12_SUB_DATA: Record<number, number[]> = {
  0: [224, 17, 226, 192, 227, 0, 129, 72, 229, 1, 72, 229, 2, 72, 229, 4, 72, 233, 29, 146, 227, 8, 233, 29, 146, 227, 10, 233, 29, 146, 227, 12, 233, 29, 146, 227, 14, 233, 29, 146, 255],
  1: [132, 12, 232, 244, 145, 0, 62, 146, 1, 63, 146, 3, 220, 146, 255],
  3: [255],
};

/** 轨道命令数据 */
export const SE12_TRACK: readonly number[] = [

];
