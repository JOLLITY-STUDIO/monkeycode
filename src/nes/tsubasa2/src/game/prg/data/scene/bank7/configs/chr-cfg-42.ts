/**
 * chr-cfg-42 — bank07 CHR 配置 66
 *
 * 数据源：bank07 CPU $A9C0 (偏移 0x09C0)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x09D4
 */
export const CHR_CFG_42_HEADER: ReadonlyArray<number> = [
  0x6C, 0x6E, 0x0D, 0x02, 0x06, 0x11
];
export const CHR_CFG_42_CPU_ADDR = 0xA9C0;
