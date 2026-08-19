"use strict";
/**
 * 通用工具函数 (序列化/复制)
 *
 * 供 PAPU/PPU 等模块使用。与原 tsnes/src/utils.ts 保持一致。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyArrayElements = copyArrayElements;
exports.copyArray = copyArray;
exports.fromJSON = fromJSON;
exports.toJSON = toJSON;
function copyArrayElements(src, srcPos, dest, destPos, length) {
    for (let i = 0; i < length; ++i) {
        dest[destPos + i] = src[srcPos + i];
    }
}
function copyArray(src) {
    return src.slice(0);
}
function fromJSON(obj, state) {
    const props = obj.constructor.JSON_PROPERTIES;
    for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        const current = obj[prop];
        const value = state[prop];
        if (ArrayBuffer.isView(current) && Array.isArray(value)) {
            // Typed arrays: copy data in-place instead of replacing the array,
            // since JSON.parse produces plain arrays not typed arrays.
            current.set(value);
        }
        else {
            obj[prop] = value;
        }
    }
}
function toJSON(obj) {
    const state = {};
    const props = obj.constructor.JSON_PROPERTIES;
    for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        const value = obj[prop];
        // Typed arrays must be converted to plain arrays for JSON.stringify,
        // which otherwise serializes them as objects ({0: v, 1: v, ...}).
        state[prop] = ArrayBuffer.isView(value) ? Array.from(value) : value;
    }
    return state;
}
