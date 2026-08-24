/**
 * chr-cfg-4F — bank07 CHR 配置 79
 *
 * 数据源：bank07 CPU $AC63 (偏移 0x0C63)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0C7B
 */
export const CHR_CFG_4F_HEADER: ReadonlyArray<number> = [
  0x3C, 0x6A, 0x0B, 0x02, 0x08, 0x10
];
export const CHR_CFG_4F_CPU_ADDR = 0xAC63;
