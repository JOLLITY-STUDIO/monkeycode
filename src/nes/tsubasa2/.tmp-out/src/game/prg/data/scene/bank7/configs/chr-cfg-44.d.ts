/**
 * chr-cfg-44 — bank07 CHR 配置 68
 *
 * 数据源：bank07 CPU $A9E8 (偏移 0x09E8)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x09F8
 */
export declare const CHR_CFG_44_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_44_CPU_ADDR = 43496;
