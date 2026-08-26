/**
 * chr-cfg-25 — bank07 CHR 配置 37
 *
 * 数据源：bank07 CPU $A58F (偏移 0x058F)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x05B8
 */
export const CHR_CFG_25_HEADER = [
    0x5C, 0x5E, 0x06, 0x04, 0x08, 0x00
];
export const CHR_CFG_25_CPU_ADDR = 0xA58F;
