/**
 * chr-cfg-45 — bank07 CHR 配置 69
 *
 * 数据源：bank07 CPU $A9F8 (偏移 0x09F8)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0A31
 */
export const CHR_CFG_45_HEADER = [
    0x5C, 0x5E, 0x22, 0x03, 0x10, 0x08
];
export const CHR_CFG_45_CPU_ADDR = 0xA9F8;
