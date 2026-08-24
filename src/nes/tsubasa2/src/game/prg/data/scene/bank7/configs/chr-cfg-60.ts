/**
 * chr-cfg-60 — bank07 CHR 配置 96
 *
 * 数据源：bank07 CPU $AE83 (偏移 0x0E83)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0EBB
 */
export const CHR_CFG_60_HEADER: ReadonlyArray<number> = [
  0x3C, 0x02, 0x00, 0x03, 0x10, 0x08
];
export const CHR_CFG_60_CPU_ADDR = 0xAE83;
