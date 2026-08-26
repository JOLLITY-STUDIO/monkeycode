/**
 * chr-cfg-5C — bank07 CHR 配置 92
 *
 * 数据源：bank07 CPU $AE0D (偏移 0x0E0D)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0E27
 */
export const CHR_CFG_5C_HEADER = [
    0x3C, 0x3E, 0x1E, 0x03, 0x06, 0x09
];
export const CHR_CFG_5C_CPU_ADDR = 0xAE0D;
