/**
 * chr-cfg-41 — bank07 CHR 配置 65
 *
 * 数据源：bank07 CPU $A997 (偏移 0x0997)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x09C0
 */
export const CHR_CFG_41_HEADER = [
    0x66, 0x5E, 0x03, 0x04, 0x08, 0x00
];
export const CHR_CFG_41_CPU_ADDR = 0xA997;
