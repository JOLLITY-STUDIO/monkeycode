/**
 * chr-cfg-68 — bank07 CHR 配置 104
 *
 * 数据源：bank07 CPU $AF83 (偏移 0x0F83)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0FD9
 */
export const CHR_CFG_68_HEADER: ReadonlyArray<number> = [
  0x06, 0x00, 0x8F, 0x08, 0x04, 0x42
];
export const CHR_CFG_68_CPU_ADDR = 0xAF83;
