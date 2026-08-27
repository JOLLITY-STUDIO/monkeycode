"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_58_CPU_ADDR = exports.CHR_CFG_58_HEADER = void 0;
/**
 * chr-cfg-58 — bank07 CHR 配置 88
 *
 * 数据源：bank07 CPU $AD74 (偏移 0x0D74)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0D9C
 */
exports.CHR_CFG_58_HEADER = [
    0x5C, 0x5E, 0x17, 0x04, 0x08, 0x00
];
exports.CHR_CFG_58_CPU_ADDR = 0xAD74;
