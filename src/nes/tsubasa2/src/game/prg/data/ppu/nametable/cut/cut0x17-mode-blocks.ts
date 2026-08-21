/**
 * Cut 0x17 (TECMO Theater) 模式块数据 (Data/Model 层)
 *
 * 来源: bank 06 (prg-bank-06.ts) 精灵模式数据 + $97B6 (bank 00) 解码逻辑。
 *
 * 原版链路 (SET_MODE $86xx → bank 6 指针表 $BB40 → JSR $97B6):
 *   $97B6 把一连串「VRAM tile 写块」灌入 PPU Buffer, NMI 时刷入 Nametable。
 *   即开场人物肖像是【写入 Nametable 的 tile 块】(非硬件 OAM 精灵),
 *   与背景共用 CHR 图案管道 — H5 中直接写 RamStore NT 网格即可。
 *
 * 块格式 (由 $97B6 反汇编确认):
 *   block[0] = flags: bit6=结束标记, bits0-5 = tile 个数 (count)
 *   block[1] = VRAM 地址低字节 (NT 基址 $2000-$2FFF 范围内)
 *   block[2] = VRAM 地址高字节
 *   block[3..3+count-1] = tile 索引序列 (写入连续 VRAM 地址)
 *   多个块顺序链接, 直到 flags.bit6 置位。
 *
 * 指针表已从 ROM 验证 (bank6 偏移 0x1B40, 小端 16 位指针):
 *   mode 0 → 0xBB48 → bank6 偏移 0x1B48 (5 块, TECMO 字母)
 *   mode 1 → 0xBB9A → bank6 偏移 0x1B9A (4 块, 翼名字横幅)
 *   mode 2 → 0xBBE8 → bank6 偏移 0x1BE8 (4 块, 日向名字横幅)
 *   mode 3 → 0xBC42 → bank6 偏移 0x1C42 (12 块, 含文本 tile)
 *   mode 4+ → 0x2718/0x9C22/0xA8A8… 为垃圾区, 原版 SET_MODE 同样不产生画面
 * 指针为 $A000-$BFFF 窗口地址, 低 13 位 (ptr & 0x1FFF) 即 bank6 数组偏移。
 */

import type { RamStore } from '../../../../../../core/ram';

/** bank6 $BB40 模式指针表 (mode 0-3 有有效块链, mode 4+ 原版即无数据) */
export const MODE_BLOCK_PTRS: readonly number[] = [
  0xBB48, 0xBB9A, 0xBBE8, 0xBC42,
];

/**
 * 解析单个模式的全部写块并写入 RamStore NT。
 * @param store 数据中心
 * @param ptr   bank6 内偏移 (指针表值)
 * @param readByte 按偏移读取 bank6 字节 (注入, 便于未来修正基址映射)
 * @param chrBank 模式块 tile 所在的 CHR bank (标题菜单背景用 0)
 * @returns 写入的 tile 块数
 */
export function applyModeBlocks(
  store: RamStore,
  ptr: number,
  readByte: (offset: number) => number,
  chrBank = 0,
): number {
  // 指针为 $A000-$BFFF 窗口地址, 低 13 位即 bank6 数组偏移 (已验证)
  let off = ptr & 0x1FFF;
  let written = 0;

  // 安全护栏: 连续解析最多 64 块
  for (let guard = 0; guard < 64; guard++) {
    const flags = readByte(off);
    const addrLo = readByte(off + 1);
    const addrHi = readByte(off + 2);

    // 数据未定位 (0xFF 占位) 或地址越界 → 停止 (防止垃圾写入)
    if (flags === 0xFF) break;
    const vramAddr = (addrHi << 8) | addrLo;
    if (vramAddr < 0x2000 || vramAddr > 0x2FFF) break;

    const count = flags & 0x3F;
    if (count === 0 || count > 64) break;

    // VRAM $2000-$23FF → NT0; $2400-$27FF → NT1; 只处理前 960 字节范围
    const ntBase = vramAddr & 0x3FF;
    const ntSelect: 0 | 1 = vramAddr < 0x2400 ? 0 : 1;
    const tileX = ntBase & 0x1F;
    const tileY = (ntBase >> 5) & 0x1F;

    for (let i = 0; i < count; i++) {
      const tile = readByte(off + 3 + i);
      const x = tileX + i;
      if (tileY < 30 && x < 32) {
        store.writeNT(ntSelect, x, tileY, {
          tile,
          palette: 0,
          bank: chrBank,
          flipH: false,
          flipV: false,
          behindBg: false,
        });
      }
    }

    written++;
    off += 3 + count;
    // flags.bit6 = 结束
    if ((flags & 0x40) !== 0) break;
  }

  return written;
}
