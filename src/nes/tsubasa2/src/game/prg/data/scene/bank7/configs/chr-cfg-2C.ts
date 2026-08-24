/**
 * chr-cfg-2C — bank07 CHR 配置 44
 *
 * 数据源：bank07 CPU $A692 (偏移 0x0692)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x069E
 */
export const CHR_CFG_2C_HEADER: ReadonlyArray<number> = [
  0x3C, 0x3E, 0x00, 0x02, 0x02, 0x13
];
export const CHR_CFG_2C_CPU_ADDR = 0xA692;
