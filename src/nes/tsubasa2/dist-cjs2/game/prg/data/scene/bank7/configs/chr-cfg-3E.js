"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_3E_CPU_ADDR = exports.CHR_CFG_3E_HEADER = void 0;
/**
 * chr-cfg-3E — bank07 CHR 配置 62
 *
 * 数据源：bank07 CPU $A8FD (偏移 0x08FD)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0925
 */
exports.CHR_CFG_3E_HEADER = [
    0x66, 0x5E, 0x03, 0x04, 0x08, 0x00
];
exports.CHR_CFG_3E_CPU_ADDR = 0xA8FD;
