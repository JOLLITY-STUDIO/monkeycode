/**
 * chr-cfg-53 — bank07 CHR 配置 83
 *
 * 数据源：bank07 CPU $ACCB (偏移 0x0CCB)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0CF3
 */
export const CHR_CFG_53_HEADER = [
    0x3C, 0x66, 0x0C, 0x04, 0x08, 0x00
];
export const CHR_CFG_53_CPU_ADDR = 0xACCB;
