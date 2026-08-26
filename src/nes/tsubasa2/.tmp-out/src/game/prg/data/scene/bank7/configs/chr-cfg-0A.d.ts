/**
 * chr-cfg-0A — bank07 CHR 配置 10
 *
 * 数据源：bank07 CPU $A1F1 (偏移 0x01F1)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x022A
 */
export declare const CHR_CFG_0A_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_0A_CPU_ADDR = 41457;
