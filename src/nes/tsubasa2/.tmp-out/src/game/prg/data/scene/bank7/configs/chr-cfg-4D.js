/**
 * chr-cfg-4D — bank07 CHR 配置 77
 *
 * 数据源：bank07 CPU $AAD2 (偏移 0x0AD2)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0AEA
 */
export const CHR_CFG_4D_HEADER = [
    0x60, 0x62, 0x96, 0x02, 0x08, 0x10
];
export const CHR_CFG_4D_CPU_ADDR = 0xAAD2;
