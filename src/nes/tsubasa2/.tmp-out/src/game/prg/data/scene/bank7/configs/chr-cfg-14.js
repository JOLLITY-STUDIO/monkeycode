/**
 * chr-cfg-14 — bank07 CHR 配置 20
 *
 * 数据源：bank07 CPU $A304 (偏移 0x0304)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x031C
 */
export const CHR_CFG_14_HEADER = [
    0x7C, 0x7E, 0x81, 0x02, 0x08, 0x10
];
export const CHR_CFG_14_CPU_ADDR = 0xA304;
