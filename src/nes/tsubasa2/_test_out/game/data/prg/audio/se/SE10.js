"use strict";
/**
 * SE Channel 10 Data — 自动提取自 Bank 12
 * Header: $9749
 * Sub-sections: 3
 * Track data: 36 bytes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SE10_TRACK = exports.SE10_SUB_DATA = exports.SE10_SUB_SECTIONS = void 0;
/** 子段落列表: [id, offset] 对 */
exports.SE10_SUB_SECTIONS = [
    [0, 5970],
    [1, 5970],
    [3, 5971],
];
/** 每个子段落的原始数据 */
exports.SE10_SUB_DATA = {
    0: [255],
    1: [255],
    3: [224, 18, 227, 0, 129, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 150, 14, 255],
};
/** 轨道命令数据 */
exports.SE10_TRACK = [
    224, 18, 227, 0, 129, 0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6,
    8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15, 150, 14, 255,
];
