/**
 * chr-cfg-19 — bank07 CHR 配置 25
 *
 * 数据源：bank07 CPU $A3E3 (偏移 0x03E3)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x040C
 */
export const CHR_CFG_19_HEADER = [
    0x3C, 0x3E, 0x00, 0x02, 0x10, 0x17
];
export const CHR_CFG_19_CPU_ADDR = 0xA3E3;
