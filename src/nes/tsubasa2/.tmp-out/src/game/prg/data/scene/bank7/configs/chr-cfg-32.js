/**
 * chr-cfg-32 — bank07 CHR 配置 50
 *
 * 数据源：bank07 CPU $A753 (偏移 0x0753)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0773
 */
export const CHR_CFG_32_HEADER = [
    0x5C, 0x5E, 0x0A, 0x03, 0x08, 0x08
];
export const CHR_CFG_32_CPU_ADDR = 0xA753;
