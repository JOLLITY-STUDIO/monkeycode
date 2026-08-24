/**
 * chr-cfg-18 — bank07 CHR 配置 24
 *
 * 数据源：bank07 CPU $A3AB (偏移 0x03AB)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x03E3
 */
export const CHR_CFG_18_HEADER: ReadonlyArray<number> = [
  0x7C, 0x7E, 0xAC, 0x06, 0x08, 0x00
];
export const CHR_CFG_18_CPU_ADDR = 0xA3AB;
