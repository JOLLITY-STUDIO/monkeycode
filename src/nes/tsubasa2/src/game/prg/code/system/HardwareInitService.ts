/**
 * HardwareInitService — 硬件初始化（原 bank30 Reset 序列）
 *
 * @bank 30 ($C000-$DFFF)
 *
 * 对应原始地址：
 *   $C64E: Reset 序列（PPU/APU 初始化、RAM 清零、调色板、CHR bank）
 *   $CEFE: 场景切换前序（关 IRQ、隐藏 OAM、清 NT）
 *   $C400: 场景入口（PPU CTRL/MASK、bank 选择、JMP $A200）
 *   $CB35: 清空 NT0/NT1
 *   $CB8B: OAM 全部 $F8 隐藏
 */
import type { DataStore } from '../../data/store/DataStore';
import { RAM_INIT_TABLE, OAM_HIDE_VALUE } from '../../data/tables/ram-init-table';

export class HardwareInitService {
  constructor(readonly store: DataStore) {}

  /**
   * Reset 序列（$C64E-$C6BB）：
   * 1. RAM $0000-$07FF 清零
   * 2. ram_0020=$08 / ram_0021 初始 / ram_0022=$00 / ram_0469=$00
   * 3. OAM 全部 $F8（$CB8B）
   * 4. 场景号 A=0 → 场景调度（$CEFE）
   */
  reset(): void {
    const store = this.store;
    store.reset();
    store.loadInitTable(RAM_INIT_TABLE);
    // $CB8B: OAM 隐藏
    for (let i = 0x200; i < 0x300; i++) store.writeByte(i, OAM_HIDE_VALUE);
    // 帧计数归零
    store.frame = 0;
  }

  /**
   * $CB35: 清空 NameTable 0/1（写入 $2000/$2400 两屏，960 tile + 64 属性）
   * 在 H5 渲染中由渲染管线直接清空 NT 缓冲。
   */
  clearNameTables(): void {
    // TODO V0.3: 对接渲染层 NT 缓冲清零（当前渲染管线以 PPU VRAM 为准）
  }

  /**
   * $CEFE + $C400: 场景切换前序
   * - 关 IRQ（ram_0469=0）
   * - 隐藏 OAM
   * - 清 NT
   * - PPU CTRL=$08 / MASK=$1E
   * - bank 选择 → 场景入口
   * @param sceneId 场景号（0-0x22）
   */
  prepareScene(sceneId: number): void {
    const store = this.store;
    store.writeByte(0x0469, 0x00); // IRQ 计数器
    for (let i = 0x200; i < 0x300; i++) store.writeByte(i, OAM_HIDE_VALUE);
    this.clearNameTables();
    store.writeByte(0x0020, 0x08); // PPU CTRL: NMI on / 精灵 8x8 / BG 表 0
    store.writeByte(0x0021, 0x1e); // PPU MASK: BG+SPR 可见
    store.writeByte(0x0022, 0x00); // MMC3 bank 基址 = 0
  }
}
