"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_04_CPU_ADDR = exports.CHR_CFG_04_HEADER = void 0;
/**
 * chr-cfg-04 — bank07 CHR 配置 4
 *
 * 数据源：bank07 CPU $A150 (偏移 0x0150)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0164
 */
exports.CHR_CFG_04_HEADER = [
    0x3C, 0x3E, 0x20, 0x02, 0x06, 0x11
];
exports.CHR_CFG_04_CPU_ADDR = 0xA150;
