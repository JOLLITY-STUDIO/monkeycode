/**
 * chr-cfg-10 — bank07 CHR 配置 16
 *
 * 数据源：bank07 CPU $A2A4 (偏移 0x02A4)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x02BC
 */
export declare const CHR_CFG_10_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_10_CPU_ADDR = 41636;
