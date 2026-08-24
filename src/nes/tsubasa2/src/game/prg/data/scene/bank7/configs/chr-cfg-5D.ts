/**
 * chr-cfg-5D — bank07 CHR 配置 93
 *
 * 数据源：bank07 CPU $AE27 (偏移 0x0E27)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0E37
 */
export const CHR_CFG_5D_HEADER: ReadonlyArray<number> = [
  0x64, 0x66, 0x9F, 0x02, 0x04, 0x12
];
export const CHR_CFG_5D_CPU_ADDR = 0xAE27;
