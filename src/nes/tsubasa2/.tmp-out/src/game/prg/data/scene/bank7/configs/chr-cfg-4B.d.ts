/**
 * chr-cfg-4B — bank07 CHR 配置 75
 *
 * 数据源：bank07 CPU $AAA2 (偏移 0x0AA2)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0ABA
 */
export declare const CHR_CFG_4B_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_4B_CPU_ADDR = 43682;
