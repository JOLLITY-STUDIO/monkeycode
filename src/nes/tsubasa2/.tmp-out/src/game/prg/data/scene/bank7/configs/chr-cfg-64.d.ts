/**
 * chr-cfg-64 — bank07 CHR 配置 100
 *
 * 数据源：bank07 CPU $AF01 (偏移 0x0F01)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0F19
 */
export declare const CHR_CFG_64_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_64_CPU_ADDR = 44801;
