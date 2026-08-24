/**
 * chr-cfg-4A — bank07 CHR 配置 74
 *
 * 数据源：bank07 CPU $AA8A (偏移 0x0A8A)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0AA2
 */
export const CHR_CFG_4A_HEADER: ReadonlyArray<number> = [
  0x3C, 0x6A, 0x00, 0x02, 0x08, 0x10
];
export const CHR_CFG_4A_CPU_ADDR = 0xAA8A;
