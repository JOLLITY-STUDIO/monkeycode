/**
 * NMI 中断处理
 *
 * 对应 Bank $00 中的 NMI 处理代码 ($80E0-$812E)
 * 在 H5 中，NMI 等价于每帧（VBlank 期间）执行的回调
 */

import { CpuMemory } from '../memory/CpuMemory';
import { Mmc1Mapper } from '../mapper/Mmc1Mapper';
import { PpuBus } from '../ppu/PpuBus';
import { InputManager } from '../input/InputManager';
import { ZP, RAM, PPU_REG, APU_REG } from '../rom/types';

/**
 * NMI 处理函数
 * 每帧调用一次，模拟原始 NES 的 NMI 中断处理流程
 *
 * 对应汇编:
 * $80E0: PHA
 * $80E1: JSR $82EB   → 禁用 NMI
 * $80E4: LDA $18 → STA $2001  → 应用 PPUMASK
 * $80E9: TXA → PHA
 * $80EB: TYA → PHA
 * $80ED: LDA #$00 → STA $2003  → OAMADDR = 0
 * $80F2: LDA #$02 → STA $4014  → OAMDMA
 * $80F7: JSR $812F   → 处理 PPU 写入队列
 * $80FA: JSR $81B9   → 读取手柄输入
 * $80FD: JSR $82AD   → 随机数更新
 * $8100-$811B: 如果 $93==0，切换 MMC1 Bank，调用 $DB00
 * $811B-$8120: 清零 $05FA，INC $0300
 * $8123-$812E: 恢复寄存器，重新启用 NMI，RTI
 */
export class NmiHandler {
  private mem: CpuMemory;
  private mmc1: Mmc1Mapper;
  private ppuBus: PpuBus;
  private input: InputManager;

  /** Bank 切换后调用的函数地址 ($DB00，来自 Bank $07) */
  private bankCallback: (() => void) | null = null;

  /** PPU 写入队列处理函数 */
  private ppuQueueHandler: (() => void) | null = null;

  /** 随机数生成器 */
  private rngSeed: number = 0;

  constructor(
    mem: CpuMemory,
    mmc1: Mmc1Mapper,
    ppuBus: PpuBus,
    input: InputManager,
  ) {
    this.mem = mem;
    this.mmc1 = mmc1;
    this.ppuBus = ppuBus;
    this.input = input;
  }

  /** 设置 Bank 切换回调 */
  setBankCallback(cb: () => void): void {
    this.bankCallback = cb;
  }

  /** 设置 PPU 队列处理函数 */
  setPpuQueueHandler(handler: () => void): void {
    this.ppuQueueHandler = handler;
  }

  /**
   * 执行一帧 NMI 处理
   * 对应 $80E0 入口
   */
  execute(): void {
    // 1. 禁用 NMI ($82EB: 清除 $19 bit7)
    this.disableNmi();

    // 2. 应用 PPUMASK 缓存
    this.mem.ppuMask = this.mem.ppuMaskCache;

    // 3. OAM DMA: 设置 OAMADDR=0，触发 DMA
    this.mem.write(PPU_REG.OAMADDR, 0);
    // 模拟 OAM DMA: 从 $0200 复制 256 字节到 OAM
    this.mem.write(APU_REG.OAMDMA, 0x02);

    // 4. 处理 PPU 写入队列 ($812F)
    if (this.ppuQueueHandler) {
      this.ppuQueueHandler();
    }

    // 5. 读取手柄输入 ($81B9)
    this.readInput();

    // 6. 更新随机数 ($82AD)
    this.updateRng();

    // 7. 如果 MMC1 写入锁未锁 ($93 == 0)，切换 Bank
    if (this.mem.mmc1Lock === 0) {
      // 切换 CHR Bank 0 ($1A → MMC1 R1)
      this.switchChrBank0(this.mem.data[ZP.CHR_BANK_0]);

      // 切换 CHR Bank 1 ($1B → MMC1 R2)
      this.switchChrBank1(this.mem.data[ZP.CHR_BANK_1]);

      // 切换 PRG Bank (先切到 Bank 1，调用回调后再切回)
      const savedPrgBank = this.mem.data[ZP.PRG_BANK];
      this.switchPrgBank(0x01); // 切换到 Bank 1

      // 调用 Bank 回调 ($DB00)
      if (this.bankCallback) {
        this.bankCallback();
      }

      // 恢复 PRG Bank ($1C)
      this.switchPrgBank(savedPrgBank);
    }

    // 8. 清零临时标志 ($05FA)
    this.mem.data[RAM.TEMP_FLAG] = 0;

    // 9. 帧计数器 +1 ($0300)
    this.mem.data[RAM.FRAME_COUNTER]++;

    // 10. 重新启用 NMI ($82F5)
    this.enableNmi();

    // 11. 读取 PPUSTATUS 清除 VBlank 标志
    this.mem.read(PPU_REG.PPUSTATUS);
  }

  /** 禁用 NMI: 清除 $19 bit7 */
  private disableNmi(): void {
    this.mem.data[ZP.PPU_CTRL_CACHE] &= 0x7F;
    this.mem.ppuCtrl &= 0x7F;
  }

  /** 启用 NMI: 设置 $19 bit7 */
  private enableNmi(): void {
    this.mem.data[ZP.PPU_CTRL_CACHE] |= 0x80;
    this.mem.ppuCtrl |= 0x80;
  }

  /** 读取手柄输入 ($81B9) */
  private readInput(): void {
    // 更新输入管理器
    this.input.update();

    // 写入 RAM: $0301 = 当前状态, $0302 = 前一帧状态
    this.mem.data[RAM.JOY1_CUR] = this.input.getStateByte();
    this.mem.data[RAM.JOY1_PREV] = this.input.getPreviousStateByte();

    // 同时更新 $4016/$4017 状态
    this.mem.joypad1State = this.input.getStateByte();
    this.mem.joypad2State = 0; // 玩家2暂不支持
  }

  /** 随机数生成器更新 ($82AD) */
  private updateRng(): void {
    // 简单的 LFSR 随机数生成
    // 原始代码使用 $05BA/$05BB 作为种子
    const lo = this.mem.data[RAM.RNG_SEED_LO];
    const hi = this.mem.data[RAM.RNG_SEED_HI];
    const combined = (hi << 8) | lo;

    // 16-bit LFSR
    let feedback = ((combined >> 0) ^ (combined >> 2) ^ (combined >> 3) ^ (combined >> 5)) & 1;
    const newVal = ((combined >> 1) | (feedback << 15)) & 0xFFFF;

    this.mem.data[RAM.RNG_SEED_LO] = newVal & 0xFF;
    this.mem.data[RAM.RNG_SEED_HI] = (newVal >> 8) & 0xFF;
  }

  /** 切换 CHR Bank 0 ($1A → MMC1 R1) */
  private switchChrBank0(bank: number): void {
    // MMC1 R1: $A000-$BFFF, 写入值 OR $20 (寄存器选择)
    this.mmc1.write(0xA000, bank | 0x20);
  }

  /** 切换 CHR Bank 1 ($1B → MMC1 R2) */
  private switchChrBank1(bank: number): void {
    // MMC1 R2: $C000-$DFFF, 写入值 OR $40 (寄存器选择)
    this.mmc1.write(0xC000, bank | 0x40);
  }

  /** 切换 PRG Bank ($1C → MMC1 R3) */
  private switchPrgBank(bank: number): void {
    // MMC1 R3: $E000-$FFFF, 写入值 OR $60 (寄存器选择)
    this.mmc1.write(0xE000, bank | 0x60);
  }
}
