"use strict";
// @ts-nocheck
// 从 jsnes (d:/studio/github/monkeycode/src/nes/tools/jsnes/src/utils.js) 复制
// tsnes 是 jsnes 的 TS 版, 此文件补全遗漏的 utils 模块
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
    return Array.prototype.slice.call(src, 0);
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
