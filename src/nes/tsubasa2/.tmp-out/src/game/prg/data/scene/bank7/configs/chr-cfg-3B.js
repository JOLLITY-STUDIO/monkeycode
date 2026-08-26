/**
 * chr-cfg-3B — bank07 CHR 配置 59
 *
 * 数据源：bank07 CPU $A8A9 (偏移 0x08A9)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x08CD
 */
export const CHR_CFG_3B_HEADER = [
    0x3A, 0x00, 0x15, 0x02, 0x0E, 0x11
];
export const CHR_CFG_3B_CPU_ADDR = 0xA8A9;
