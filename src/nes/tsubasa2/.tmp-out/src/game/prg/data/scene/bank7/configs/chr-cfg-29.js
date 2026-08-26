/**
 * chr-cfg-29 — bank07 CHR 配置 41
 *
 * 数据源：bank07 CPU $A610 (偏移 0x0610)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0639
 */
export const CHR_CFG_29_HEADER = [
    0x3C, 0x3E, 0x00, 0x02, 0x10, 0x10
];
export const CHR_CFG_29_CPU_ADDR = 0xA610;
