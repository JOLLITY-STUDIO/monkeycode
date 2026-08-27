"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_39_CPU_ADDR = exports.CHR_CFG_39_HEADER = void 0;
/**
 * chr-cfg-39 — bank07 CHR 配置 57
 *
 * 数据源：bank07 CPU $A87D (偏移 0x087D)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0891
 */
exports.CHR_CFG_39_HEADER = [
    0x46, 0x3C, 0x00, 0x02, 0x06, 0x11
];
exports.CHR_CFG_39_CPU_ADDR = 0xA87D;
