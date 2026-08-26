/**
 * chr-cfg-00 — bank07 CHR 配置 0
 *
 * 数据源：bank07 CPU $A0D4 (偏移 0x00D4)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x00DF
 */
export declare const CHR_CFG_00_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_00_CPU_ADDR = 41172;
