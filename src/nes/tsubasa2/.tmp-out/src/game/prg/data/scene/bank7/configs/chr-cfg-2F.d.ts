/**
 * chr-cfg-2F — bank07 CHR 配置 47
 *
 * 数据源：bank07 CPU $A6DF (偏移 0x06DF)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x06F3
 */
export declare const CHR_CFG_2F_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_2F_CPU_ADDR = 42719;
