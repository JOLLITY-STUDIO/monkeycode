"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ntAttr1 = exports.ntAttr0 = exports.nt1 = exports.nt0 = void 0;
// NT 缓存 32×30 tile 网格 ×2（镜像自动映射）
exports.nt0 = new Uint8Array(32 * 30);
exports.nt1 = new Uint8Array(32 * 30);
exports.ntAttr0 = new Uint8Array(64); // 8×8 属性表
exports.ntAttr1 = new Uint8Array(64);
