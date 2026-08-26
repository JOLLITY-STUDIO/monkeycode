/**
 * chr-cfg-01 — bank07 CHR 配置 1
 *
 * 数据源：bank07 CPU $A0DF (偏移 0x00DF)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0127
 */
export const CHR_CFG_01_HEADER = [
    0x3C, 0x3E, 0x02, 0x04, 0x10, 0x00
];
export const CHR_CFG_01_CPU_ADDR = 0xA0DF;
