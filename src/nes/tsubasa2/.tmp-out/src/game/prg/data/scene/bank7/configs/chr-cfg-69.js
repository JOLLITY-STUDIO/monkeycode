/**
 * chr-cfg-69 — bank07 CHR 配置 105
 *
 * 数据源：bank07 CPU $AFD9 (偏移 0x0FD9)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x2000
 */
export const CHR_CFG_69_HEADER = [
    0x56, 0x46, 0x10, 0x02, 0x08, 0x10
];
export const CHR_CFG_69_CPU_ADDR = 0xAFD9;
