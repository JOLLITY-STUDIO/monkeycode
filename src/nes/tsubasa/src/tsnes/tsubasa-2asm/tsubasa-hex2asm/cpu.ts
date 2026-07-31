/**
 * ============================================================================
 * TsubasaCpu — 和父类 CPU 完全相同的 6502 指令解析器
 *
 * 唯一区别：PRG-ROM 数据不从 .nes 文件读，而是从 prg_rom_data.ts 的静态数据读。
 * 注入方式：tsnes_kernel.ts 在 loadROM() 后替换 this.nes.rom.rom 数组。
 *
 * 不覆盖任何方法，继承父类所有 opcode 解码 / NMI / IRQ / PPU 推进逻辑。
 * ============================================================================
 */

import CPU from '../src/cpu';

export class TsubasaCpu extends CPU {
  // 不覆盖 emulate / loadFromCartridge — 一切走父类逻辑
}

/** 工厂函数：创建 TsubasaCpu */
export function createTsubasaCpu(nes: any): TsubasaCpu {
  return new TsubasaCpu(nes);
}
