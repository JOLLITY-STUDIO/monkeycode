"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_02_CPU_ADDR = exports.CHR_CFG_02_HEADER = void 0;
/**
 * chr-cfg-02 — bank07 CHR 配置 2
 *
 * 数据源：bank07 CPU $A127 (偏移 0x0127)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x013F
 */
exports.CHR_CFG_02_HEADER = [
    0x5C, 0x5E, 0x06, 0x02, 0x08, 0x10
];
exports.CHR_CFG_02_CPU_ADDR = 0xA127;
