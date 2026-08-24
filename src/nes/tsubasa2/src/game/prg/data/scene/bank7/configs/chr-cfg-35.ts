/**
 * chr-cfg-35 — bank07 CHR 配置 53
 *
 * 数据源：bank07 CPU $A7B3 (偏移 0x07B3)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x07EB
 */
export const CHR_CFG_35_HEADER: ReadonlyArray<number> = [
  0x5C, 0x5E, 0x0A, 0x03, 0x10, 0x08
];
export const CHR_CFG_35_CPU_ADDR = 0xA7B3;
