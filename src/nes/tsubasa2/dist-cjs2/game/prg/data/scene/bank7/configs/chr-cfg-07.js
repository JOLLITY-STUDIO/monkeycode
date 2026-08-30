"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_07_CPU_ADDR = exports.CHR_CFG_07_HEADER = void 0;
/**
 * chr-cfg-07 — bank07 CHR 配置 7
 *
 * 数据源：bank07 CPU $A190 (偏移 0x0190)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x01A1
 */
exports.CHR_CFG_07_HEADER = [
    0x3A, 0x00, 0x1B, 0x02, 0x04, 0x15
];
exports.CHR_CFG_07_CPU_ADDR = 0xA190;
