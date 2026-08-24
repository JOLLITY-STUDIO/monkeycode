/**
 * chr-cfg-0B — bank07 CHR 配置 11
 *
 * 数据源：bank07 CPU $A22A (偏移 0x022A)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x023B
 */
export const CHR_CFG_0B_HEADER: ReadonlyArray<number> = [
  0x38, 0x3A, 0x05, 0x02, 0x04, 0x15
];
export const CHR_CFG_0B_CPU_ADDR = 0xA22A;
