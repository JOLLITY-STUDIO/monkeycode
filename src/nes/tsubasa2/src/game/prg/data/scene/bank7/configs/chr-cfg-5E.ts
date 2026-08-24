/**
 * chr-cfg-5E — bank07 CHR 配置 94
 *
 * 数据源：bank07 CPU $AE37 (偏移 0x0E37)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0E4B
 */
export const CHR_CFG_5E_HEADER: ReadonlyArray<number> = [
  0x3C, 0x3E, 0x20, 0x02, 0x06, 0x11
];
export const CHR_CFG_5E_CPU_ADDR = 0xAE37;
