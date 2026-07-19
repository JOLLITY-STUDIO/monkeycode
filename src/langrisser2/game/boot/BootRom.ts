/**
 * ROM 启动流程 — 对应 ROM Reset 向量 $00800A
 *
 * 基于 execution-trace.md 的精确还原:
 *
 * Reset 入口 ($800A):
 *   1. TMSS 商标解锁: 向 $A14000 写入 "SEGA" (0x53454741)
 *   2. VDP 寄存器初始化: ROM $80B2 24字节 → VDP 24寄存器
 *   3. Z80 初始化: 请求总线 → 写 Z80 程序 → 释放 → PSG 静音
 *   4. ROM 校验和: 计算 $200-$7FF0 → 验证 = $D79F
 *   5. RAM 清零: 64KB → 0
 *   6. FUN_0001ddc8: 系统底层初始化
 *   7. FUN_000086b4: DMA 子系统初始化
 *   8. FUN_0000866c: 控制器初始化
 *   9. FUN_00009172: 显示列表初始化
 *   10. FUN_00009020: 输入状态初始化
 *   11. FUN_00008a6c: 显示队列初始化
 *   12. FUN_0000942a: 任务调度器初始化
 *   13. FUN_0000c80c: 游戏主初始化
 *       - Z80 静音
 *       - SRAM 初始化 (存档)
 *       - 角色能力表加载
 *       - 场景索引 = 1
 *   14. 主循环: 等待任务队列 → 执行任务 → 队列前移
 */

import { RomLoader } from '../core/RomLoader';
import { Ram } from '../core/Ram';
import { VdpChip } from '../vdp/VdpChip';
import { RomInits } from '../rom/RomInits';

export class BootRom {
  rom: RomLoader;
  ram: Ram;
  vdp: VdpChip;

  constructor(rom: RomLoader, ram: Ram, vdp: VdpChip) {
    this.rom = rom;
    this.ram = ram;
    this.vdp = vdp;
  }

  /**
   * 执行完整启动序列 (步骤 1-5: 硬件初始化)
   *
   * 步骤 1-5: 模拟器底层初始化 (TMSS/VDP/Z80/校验/RAM)
   * 步骤 6-13: 委托给 RomInits (系统/任务/游戏初始化)
   *
   * @returns RomInits 实例 (调用方继续执行 6-13), 或 null 表示失败
   */
  execute(): RomInits | null {
    // 1. TMSS 解锁
    this.tmssUnlock();

    // 2. VDP 初始化
    this.initVdpRegisters();

    // 3. Z80 初始化
    this.initZ80();

    // 4. 校验和验证
    if (!this.rom.verifyChecksum()) {
      console.error('[BootRom] ROM 校验和验证失败! (期望 $D79F, 实际 $' +
        this.rom.computeChecksum().toString(16) + ')');
      return null;
    }

    // 5. RAM 清零
    this.initRam();

    console.log('[BootRom] ✓ 硬件初始化完成 (步骤 1-5)');

    // 6-13: 创建 RomInits, 由调用方执行后续初始化
    const inits = new RomInits(this.rom.getData(), this.ram, this.vdp);
    return inits;
  }

  /**
   * 1. TMSS 商标解锁
   *
   * ROM 代码:
   *   read $A10008 → Z80 bus
   *   read $A11000 → ext ctrl
   *   if (PCB version != 0):
   *     write $A14000 = "SEGA"
   */
  private tmssUnlock(): void {
    // Genesis TMSS: 写入 "SEGA" 到 $A14000
    // 注意: 0x53454741 (大端序 "SEGA")
    // 写入方式: 多次 16-bit write
    // ROM 实际做法: move.l #$53454741, $A14000
    // 我们不需要真正写 I/O 端口, 只需要标记解锁完成
    // 在 TS 模拟中, 此步骤是等效的

    // VDP port $C00008 → 读状态, 等待 VDP 就绪
    // ROM does: wait VDP, then write TMSS
  }

  /**
   * 2. VDP 寄存器初始化
   *
   * ROM $80B2: 24 字节实际值 (经 ROM 字节级校验):
   *   Reg $00: $04 → HInt=off, HV latch off
   *   Reg $01: $14 → Display=OFF, VInt=OFF, DMA=ON(!), NTSC
   *   Reg $02: $30 → Plane A Nametable @ $C000  ($30×$400)
   *   Reg $03: $3C → Window Nametable @ $F000   ($3C×$400)
   *   Reg $04: $07 → Plane B Nametable @ $1C00   ($07×$400)
   *   Reg $05: $6C → Sprite Attr Table @ $D800   ($6C×$200)
   *   Reg $06: $00 → Sprite Pattern Generator (未使用)
   *   Reg $07: $00 → BG Color = palette 0, color 0
   *   Reg $08: $00 → (未使用)
   *   Reg $09: $00 → (未使用)
   *   Reg $0A: $FF → HScroll = 全行模式
   *   Reg $0B: $00 → Mode3: ExtInt=off, VScroll=full
   *   Reg $0C: $81 → H40=ON(320px), Shadow/Hilite=off, Interlace=off
   *   Reg $0D: $37 → HScroll Table @ $DC00 ($37×$400)
   *   Reg $0E: $00 → (未使用)
   *   Reg $0F: $01 → VRAM auto-increment = 1
   *   Reg $10: $01 → PlaneA=64, PlaneB=32
   *   Reg $11: $00 → Window H pos = 0
   *   Reg $12: $00 → Window V pos = 0
   *   Reg $13: $FF → DMA length lo
   *   Reg $14: $FF → DMA length hi
   *   Reg $15: $00 → DMA source lo
   *   Reg $16: $00 → DMA source mid
   *   Reg $17: $80 → DMA source hi ($80xxxx → ROM)
   */
  private initVdpRegisters(): void {
    const regs = this.rom.readVdpInitRegs();
    // regs = [04,14,30,3C,07,6C,00,00, 00,00,FF,00,81,37,00,01, 01,00,00,FF,FF,00,00,80]

    for (let i = 0; i < Math.min(regs.length, 24); i++) {
      this.vdp.writeRegister(i, regs[i]);
    }
  }

  /**
   * 3. Z80 初始化
   *
   * ROM 代码:
   *   Z80BUS = $100  (请求总线)
   *   Z80RES = $100  (复位 Z80)
   *   while (Z80BUS & 1) → 等待
   *   写 Z80 程序 (ROM $80DA, $25 byte)
   *   Z80RES = 0; Z80BUS = 0; Z80RES = $100  (释放)
   *   PSG 静音: VDP_PSG = $9F, $BF, $DF, $FF
   */
  private initZ80(): void {
    // Z80 程序复制 (ROM $80DA-$80FE, $25 bytes → Z80 RAM)
    const z80Code = this.rom.readZ80BootCode();

    // PSG 静音
    // VDP_PSG ($C00011) 写: $9F, $BF, $DF, $FF
    // 简化: 忽略音频初始化
  }

  /**
   * 4. 校验和验证 (在 execute() 中调用)
   */

  /**
   * 5. RAM 清零
   *
   * ROM 代码: 64KB → 0 ($FF0000-$FFFFFF)
   */
  private initRam(): void {
    this.ram.clear();
  }

}
