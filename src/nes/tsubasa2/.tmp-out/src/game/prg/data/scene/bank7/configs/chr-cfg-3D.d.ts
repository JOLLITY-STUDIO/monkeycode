/**
 * chr-cfg-3D — bank07 CHR 配置 61
 *
 * 数据源：bank07 CPU $A8E5 (偏移 0x08E5)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x08FD
 */
export declare const CHR_CFG_3D_HEADER: ReadonlyArray<number>;
export declare const CHR_CFG_3D_CPU_ADDR = 43237;
