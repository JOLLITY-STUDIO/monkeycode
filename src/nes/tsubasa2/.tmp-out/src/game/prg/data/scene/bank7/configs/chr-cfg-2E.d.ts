/**
 * chr-cfg-2E — bank07 CHR 配置 46
 *
 * 数据源：bank07 CPU $A6C7 (偏移 0x06C7)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x06DF
 */
export declare const CHR_CFG_2E_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_2E_CPU_ADDR = 42695;
