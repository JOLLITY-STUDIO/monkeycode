"use strict";
/**
 * SE Channel 2 Data — 自动提取自 Bank 12
 * Header: $8e68
 * Sub-sections: 3
 * Track data: 23 bytes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SE2_TRACK = exports.SE2_SUB_DATA = exports.SE2_SUB_SECTIONS = void 0;
/** 子段落列表: [id, offset] 对 */
exports.SE2_SUB_SECTIONS = [
    [0, 3697],
    [1, 3697],
    [3, 3698],
];
/** 每个子段落的原始数据 */
exports.SE2_SUB_DATA = {
    0: [255],
    1: [255],
    3: [224, 18, 227, 0, 129, 0, 130, 1, 131, 2, 3, 4, 132, 5, 6, 133, 7, 8, 9, 10, 149, 11, 255],
};
/** 轨道命令数据 */
exports.SE2_TRACK = [
    224, 18, 227, 0, 129, 0, 130, 1, 131, 2, 3, 4, 132, 5, 6, 133, 7, 8, 9, 10,
    149, 11, 255
];
