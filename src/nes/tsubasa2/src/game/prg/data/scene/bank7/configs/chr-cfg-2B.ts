/**
 * chr-cfg-2B — bank07 CHR 配置 43
 *
 * 数据源：bank07 CPU $A672 (偏移 0x0672)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0692
 */
export const CHR_CFG_2B_HEADER: ReadonlyArray<number> = [
  0x3C, 0x3E, 0x00, 0x03, 0x08, 0x08
];
export const CHR_CFG_2B_CPU_ADDR = 0xA672;
