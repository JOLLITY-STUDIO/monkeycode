"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apuBuffer = void 0;
// APU 寄存器缓存 $4000-$401F（32字节）
exports.apuBuffer = new Uint8Array(32);
