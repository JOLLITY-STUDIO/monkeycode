/**
 * PRG Bank 06 数据布局表
 *
 * bank06 总览 (8KB / 0x0000-0x1FFF):
 *   0x0000-0x000B  指针表 (6 × 16-bit, 指向 $A000 窗口内的脚本/数据块入口)
 *   0x000C-0x05FF  脚本/剧情字节码数据区 (含 6 个入口块)
 *   0x0600-0x0FFF  未使用 (0xFF 填充)
 *   0x1000-0x17FF  场景调色板数据 (BG 表 + SPR 表)
 *   0x1800-0x1FFF  未使用 / 0xFF 填充
 *
 * 消费方:
 *   - 调色板: bank00_core.service.ts / bank02_scene.service.ts
 *   - 脚本:   service/script-vm.ts / data/scene/textscript/script-data-loader.ts / bank02_scene.service.ts
 *
 * 数据归属:
 *   - 脚本/剧情字节码 (0x000C-0x05FF): 属脚本系统, 见 data/scene/textscript/scripts-bank-06.ts
 *     (已解析: 6 个入口块 → ID 0x60-0x65, 入口 2-5 为同一线性流程不同切入点)
 *   - 调色板 (0x1000-0x17FF): 属 PPU 调色板系统, 见 ppu/pallete/scene-palette-table.ts
 *
 * 已确认语义:
 *   - bank00 $8AEC 映射表 (实际从 $8AEE 起): 成对 [start, bank],
 *     00/03, 10/04, 20/05, 60/06, FF 终止
 *   - $8464 分派器: 查表 → 指针 = $A000 + (ID-start)*2 → 读 2 字节入口 → 执行
 *   - bank06 指针表 ($A000-$A00B) 仅 6 项有效 (ID 0x60-0x65)
 *
 * TODO:
 *   - 脚本 ID 0x66-0xFE 未在 bank06 指针表中定义 (调用会得到错误指针),
 *     游戏实际是否可达待 trace 确认
 */

import {
  SCENE_BG_PALETTE,
  SCENE_SPR_PALETTE,
} from './ppu/pallete/scene-palette-table';

/** bank06 在 PRG-ROM 中的长度 */
export const BANK06_SIZE = 0x2000;

/** 指针表起始偏移 */
export const BANK06_PTR_TABLE_OFFSET = 0x0000;

/** 指针表项数 (当前观察到 6 个 16-bit 指针) */
export const BANK06_PTR_TABLE_COUNT = 6;

/** 脚本/数据区起始偏移 */
export const BANK06_SCRIPT_DATA_OFFSET = 0x000c;

/** 脚本/数据区结束偏移 (到 0xFF 填充区之前) */
export const BANK06_SCRIPT_DATA_END = 0x0600;

/** 未使用填充区起始偏移 */
export const BANK06_UNUSED_OFFSET = 0x0600;

/** 调色板数据区起始偏移 (bank06 偏移, 对应 CPU $B000) */
export const BANK06_PALETTE_OFFSET = 0x1000;

/** 精灵调色板区起始偏移 (bank06 偏移, 对应 CPU $B300) */
export const BANK06_SPR_PALETTE_OFFSET = 0x1300;

/** 调色板数据区结束偏移 */
export const BANK06_PALETTE_END = 0x1800;

/** bank06 内 6 个入口指针 (CPU 地址, 小端提取) */
export const BANK06_ENTRY_POINTERS: readonly number[] = [
  0xa00c, // off 0x000c
  0xa01b, // off 0x001b
  0xa028, // off 0x0028
  0xa0e0, // off 0x00e0
  0xa1a8, // off 0x01a8
  0xa2f2, // off 0x02f2
];

/**
 * 场景 BG 调色板组 (48 组 × 16 字节)
 * 原始位置: bank06 $1000 (CPU $B000)
 * 已迁移至 scene-palette-table.ts, 此处再导出以统一 bank06 数据入口
 */
export const BANK06_BG_PALETTE = SCENE_BG_PALETTE;

/**
 * 场景 SPR 调色板组 (80 组 × 16 字节)
 * 原始位置: bank06 $1300 (CPU $B300)
 * 已迁移至 scene-palette-table.ts, 此处再导出以统一 bank06 数据入口
 */
export const BANK06_SPR_PALETTE = SCENE_SPR_PALETTE;

/** 获取指定 BG 调色板组号的 16 字节数据 */
export function getBank06BgPalette(group: number): readonly number[] {
  const idx = group & 0x3f;
  const off = idx * 16;
  if (off + 16 > BANK06_BG_PALETTE.length) return BANK06_BG_PALETTE.slice(0, 16);
  return BANK06_BG_PALETTE.slice(off, off + 16);
}

/** 获取指定 SPR 调色板组号的 16 字节数据 */
export function getBank06SprPalette(group: number): readonly number[] {
  const idx = group & 0x7f;
  const off = idx * 16;
  if (off + 16 > BANK06_SPR_PALETTE.length) return BANK06_SPR_PALETTE.slice(0, 16);
  return BANK06_SPR_PALETTE.slice(off, off + 16);
}
