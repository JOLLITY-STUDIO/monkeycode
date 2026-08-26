/**
 * chr-cfg-3F — bank07 CHR 配置 63
 *
 * 数据源：bank07 CPU $A925 (偏移 0x0925)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x096E
 */
export const CHR_CFG_3F_HEADER = [
    0x3C, 0x66, 0x0C, 0x04, 0x10, 0x07
];
export const CHR_CFG_3F_CPU_ADDR = 0xA925;
