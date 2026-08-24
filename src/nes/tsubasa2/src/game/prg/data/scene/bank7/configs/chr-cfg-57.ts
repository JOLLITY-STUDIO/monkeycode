/**
 * chr-cfg-57 — bank07 CHR 配置 87
 *
 * 数据源：bank07 CPU $AD5C (偏移 0x0D5C)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0D74
 */
export const CHR_CFG_57_HEADER: ReadonlyArray<number> = [
  0x3C, 0x6A, 0x0B, 0x02, 0x08, 0x10
];
export const CHR_CFG_57_CPU_ADDR = 0xAD5C;
