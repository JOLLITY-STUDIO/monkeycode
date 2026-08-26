/**
 * chr-cfg-1C — bank07 CHR 配置 28
 *
 * 数据源：bank07 CPU $A455 (偏移 0x0455)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x049E
 */
export declare const CHR_CFG_1C_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_1C_CPU_ADDR = 42069;
