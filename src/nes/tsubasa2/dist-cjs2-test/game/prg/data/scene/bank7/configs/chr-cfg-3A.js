"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_3A_CPU_ADDR = exports.CHR_CFG_3A_HEADER = void 0;
/**
 * chr-cfg-3A — bank07 CHR 配置 58
 *
 * 数据源：bank07 CPU $A891 (偏移 0x0891)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x08A9
 */
exports.CHR_CFG_3A_HEADER = [
    0x3C, 0x2C, 0x1D, 0x02, 0x08, 0x10
];
exports.CHR_CFG_3A_CPU_ADDR = 0xA891;
