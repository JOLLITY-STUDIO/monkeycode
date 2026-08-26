/**
 * chr-cfg-08 — bank07 CHR 配置 8
 *
 * 数据源：bank07 CPU $A1A1 (偏移 0x01A1)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x01C9
 */
export const CHR_CFG_08_HEADER = [
    0x40, 0x00, 0x8E, 0x04, 0x08, 0x00
];
export const CHR_CFG_08_CPU_ADDR = 0xA1A1;
