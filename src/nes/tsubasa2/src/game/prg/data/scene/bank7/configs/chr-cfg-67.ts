/**
 * chr-cfg-67 — bank07 CHR 配置 103
 *
 * 数据源：bank07 CPU $AF5A (偏移 0x0F5A)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0F83
 */
export const CHR_CFG_67_HEADER: ReadonlyArray<number> = [
  0x06, 0x00, 0x8D, 0x08, 0x04, 0x42
];
export const CHR_CFG_67_CPU_ADDR = 0xAF5A;
