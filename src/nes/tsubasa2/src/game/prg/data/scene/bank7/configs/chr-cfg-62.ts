/**
 * chr-cfg-62 — bank07 CHR 配置 98
 *
 * 数据源：bank07 CPU $AEDB (偏移 0x0EDB)
 * 6 字节配置 header：[0]=start tile, [1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码
 * 消费方：RenderingPrimitivesService.loadChrConfig（$8AF7）
 * 下一配置起始：0x0EF3
 */
export const CHR_CFG_62_HEADER: ReadonlyArray<number> = [
  0x56, 0x46, 0x0C, 0x02, 0x08, 0x10
];
export const CHR_CFG_62_CPU_ADDR = 0xAEDB;
