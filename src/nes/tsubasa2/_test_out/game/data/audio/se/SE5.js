"use strict";
/**
 * SE Channel 5 Data — 提取自 Bank 12
 * Header: $8fad
 * Sub-sections: 3
 * Track data: 60 bytes (expanded, no $E8/$E9)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SE5_TRACK = exports.SE5_SUB_DATA = exports.SE5_SUB_SECTIONS = void 0;
/** 子段落列表: [id, offset] 对 */
exports.SE5_SUB_SECTIONS = [
    [0, 4022],
    [1, 4022],
    [3, 4023],
];
/** 每个子段落的原始数据 */
exports.SE5_SUB_DATA = {
    0: [255],
    1: [255],
    3: [130, 224, 18, 227, 0, 15, 14, 13, 12, 14, 13, 12, 11, 13, 12, 11, 10, 129, 12, 11, 10, 9, 11, 10, 9, 8, 10, 9, 8, 7, 9, 8, 7, 6, 8, 7, 6, 5, 7, 6, 5, 4, 6, 5, 4, 3, 5, 4, 3, 2, 4, 3, 2, 1, 3, 2, 1, 150, 0, 255],
};
/** 轨道命令数据 */
exports.SE5_TRACK = [
    130, 224, 18, 227, 0, 15, 14, 13, 12, 14, 13, 12, 11, 13, 12, 11,
    10, 129, 12, 11, 10, 9, 11, 10, 9, 8, 10, 9, 8, 7, 9, 8,
    7, 6, 8, 7, 6, 5, 7, 6, 5, 4, 6, 5, 4, 3, 5, 4,
    3, 2, 4, 3, 2, 1, 3, 2, 1, 150, 0, 255
];
