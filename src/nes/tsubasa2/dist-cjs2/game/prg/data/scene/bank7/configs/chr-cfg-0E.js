"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHR_CFG_0E_CPU_ADDR = exports.CHR_CFG_0E_HEADER = void 0;
/**
 * chr-cfg-0E — bank07 CHR 配置 14
 *
 * 数据源：bank07 CPU $A284 (偏移 0x0284)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0294
 */
exports.CHR_CFG_0E_HEADER = [
    0x64, 0x66, 0x99, 0x02, 0x04, 0x12
];
exports.CHR_CFG_0E_CPU_ADDR = 0xA284;
