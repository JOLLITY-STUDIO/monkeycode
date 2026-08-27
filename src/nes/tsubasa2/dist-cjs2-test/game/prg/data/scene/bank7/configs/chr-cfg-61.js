"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_61_CPU_ADDR = exports.CHR_CFG_61_HEADER = void 0;
/**
 * chr-cfg-61 — bank07 CHR 配置 97
 *
 * 数据源：bank07 CPU $AEBB (偏移 0x0EBB)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0EDB
 */
exports.CHR_CFG_61_HEADER = [
    0x3C, 0x02, 0x00, 0x03, 0x08, 0x08
];
exports.CHR_CFG_61_CPU_ADDR = 0xAEBB;
