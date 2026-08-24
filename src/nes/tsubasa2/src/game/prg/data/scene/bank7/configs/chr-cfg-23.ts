/**
 * chr-cfg-23 — bank07 CHR 配置 35
 *
 * 数据源：bank07 CPU $A55F (偏移 0x055F)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0577
 */
export const CHR_CFG_23_HEADER: ReadonlyArray<number> = [
  0x60, 0x62, 0x96, 0x02, 0x08, 0x10
];
export const CHR_CFG_23_CPU_ADDR = 0xA55F;
