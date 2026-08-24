/**
 * chr-cfg-27 — bank07 CHR 配置 39
 *
 * 数据源：bank07 CPU $A5D0 (偏移 0x05D0)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x05E8
 */
export const CHR_CFG_27_HEADER: ReadonlyArray<number> = [
  0x3C, 0x66, 0x07, 0x02, 0x08, 0x10
];
export const CHR_CFG_27_CPU_ADDR = 0xA5D0;
