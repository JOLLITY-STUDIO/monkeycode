/**
 * Boot entry point — 对应 CPU RESET vector → bank 31 ($FFF0) → bank 30 系统库初始化
 *
 * ═══════════════════════════════════════
 * 硬件 RESET 启动流程（6502 CPU 执行）
 * ═══════════════════════════════════════
 *
 * 1. CPU 通电 / RESET 引脚拉高
 *    → 读取 $FFFC-$FFFD → 向量地址 = $FFF0
 *
 * 2. Bank 31: CODE_RESET ($FFF0-$FFF7, 8 bytes)
 *    A9 00       LDA #$00        ; 选择 bank 00
 *    8D 00 80    STA $8000       ; 写入 MMC3 bank select register
 *    4C 03 C5    JMP $C503       ; 跳转到 bank 30 系统库
 *
 * 3. Bank 30: 系统库初始化 ($C503 → JMP $C64E)
 *    CODE_$C64E_$C719:
 *      - 配置 PPU 控制寄存器 (STA $2000/$2001)
 *      - 清空 CPU RAM ($0000-$1FFF)
 *      - 设置 sprite DMA 基址
 *      - 初始化 MMC3 mirroring
 *      - 重置堆栈指针
 *      - JMP bank 00 dispatch → 进入场景引擎
 *
 * 4. Bank 00: 场景调度引擎 ($8000-$9FFF)
 *    - 读 $0041 (当前场景 ID)
 *    - 根据场景 ID 分发到标题/菜单/比赛/过场等子状态机
 *
 * ═══════════════════════════════════════
 * MMC3 初始 8KB bank 映射
 * ═══════════════════════════════════════
 *
 *   $8000-$9FFF → bank 00 (dispatch/scene engine)
 *   $A000-$BFFF → bank 01 (match jump table)
 *   $C000-$DFFF → bank 30 (system library — 倒数第二固定)
 *   $E000-$FFFF → bank 31 (boot vectors — 最后固定)
 *
 * ═══════════════════════════════════════
 * 本模块职责
 * ═══════════════════════════════════════
 *
 * 1. 聚合 PRG-ROM + CHR-ROM bank 数据，组装完整 iNES ROM buffer
 * 2. 创建 NES 实例并加载 ROM
 * 3. 提供便捷的帧循环 / 渲染 / 输入适配接口
 */

import NES from './nes';
import type { NESOptions, ControllerId } from './nes';
import type { ButtonKey } from './controller';
import { PRG_ROM_BANKS } from '../data/rom-data';
import { CHR_ROM_BANKS } from '../data/chr-data';
import { buildRomBuffer } from '../../tsubasa-hex2asm/rom_header';

/**
 * 组装完整 iNES ROM 并创建 NES 实例，即可通过 frame() 推进模拟。
 *
 * 与 `tsnes_kernel.ts` / `app.ts` 的调用方式兼容。
 */
export function createTsubasaNES(opts?: NESOptions): NES {
  const nes = new NES(opts ?? {});

  // 将 32 个 PRG bank + 16 个 CHR bank 拼装为标准 iNES ROM buffer
  const romBuffer = buildRomBuffer(PRG_ROM_BANKS, CHR_ROM_BANKS);

  // 加载 ROM — CPU 将从 RESET vector ($FFF0) 开始执行
  nes.loadROM(romBuffer);

  return nes;
}

/**
 * 重导出便捷类型（方便外部使用而无需再 import 层层文件）
 */
export type { NESOptions, ControllerId, ButtonKey };
export { NES };
