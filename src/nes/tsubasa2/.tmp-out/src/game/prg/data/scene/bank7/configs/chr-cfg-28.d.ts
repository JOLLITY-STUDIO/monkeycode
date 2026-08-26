/**
 * chr-cfg-28 — bank07 CHR 配置 40
 *
 * 数据源：bank07 CPU $A5E8 (偏移 0x05E8)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0610
 */
export declare const CHR_CFG_28_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_28_CPU_ADDR = 42472;
