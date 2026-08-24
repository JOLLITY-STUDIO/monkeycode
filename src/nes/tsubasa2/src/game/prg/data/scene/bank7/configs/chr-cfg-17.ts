/**
 * chr-cfg-17 — bank07 CHR 配置 23
 *
 * 数据源：bank07 CPU $A373 (偏移 0x0373)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x03AB
 */
export const CHR_CFG_17_HEADER: ReadonlyArray<number> = [
  0x7C, 0x7E, 0x81, 0x06, 0x08, 0x08
];
export const CHR_CFG_17_CPU_ADDR = 0xA373;
