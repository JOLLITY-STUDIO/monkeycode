/**
 * chr-cfg-43 — bank07 CHR 配置 67
 *
 * 数据源：bank07 CPU $A9D4 (偏移 0x09D4)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x09E8
 */
export const CHR_CFG_43_HEADER: ReadonlyArray<number> = [
  0x34, 0x36, 0x8E, 0x02, 0x06, 0x11
];
export const CHR_CFG_43_CPU_ADDR = 0xA9D4;
