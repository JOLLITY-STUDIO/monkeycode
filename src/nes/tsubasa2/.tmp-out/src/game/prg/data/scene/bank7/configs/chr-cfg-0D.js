/**
 * chr-cfg-0D — bank07 CHR 配置 13
 *
 * 数据源：bank07 CPU $A274 (偏移 0x0274)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0284
 */
export const CHR_CFG_0D_HEADER = [
    0x64, 0x66, 0x98, 0x02, 0x04, 0x12
];
export const CHR_CFG_0D_CPU_ADDR = 0xA274;
