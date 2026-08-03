/**
 * NMI 处理逻辑 - 替代6502 NMI中断处理
 * 对应 ROM 中 $80E0-$812E 的 NMI handler
 *
 * NMI 每帧执行:
 *   1. OAM DMA (精灵数据 → OAM)
 *   2. PPU队列处理 (VRAM批量写入)
 *   3. 读取输入
 *   4. 更新随机数
 *   5. 游戏逻辑调用 (如果 bankLock == 0)
 *   6. 帧计数++
 */

import { JOYPAD1, OAM_ADDR, OAM_DMA, PPU_CTRL } from '../core/Constants';
import { PpuCtrlBits } from '../core/types';
import type { DataCache } from '../cache/DataCache';
import type { OamCache } from '../cache/OamCache';
import type { PpuQueue } from '../cache/PpuQueue';
import type { BankManager } from '../cache/BankManager';
import type { InputManager } from '../input/InputManager';
import type { Renderer } from '../renderer/Renderer';
import type { StateMachine } from './StateMachine';

export class NmiHandler {
  private dataCache: DataCache;
  private oamCache: OamCache;
  private ppuQueue: PpuQueue;
  private bankManager: BankManager;
  private inputManager: InputManager;
  private renderer: Renderer;
  private stateMachine: StateMachine;

  constructor(
    dataCache: DataCache,
    oamCache: OamCache,
    ppuQueue: PpuQueue,
    bankManager: BankManager,
    inputManager: InputManager,
    renderer: Renderer,
    stateMachine: StateMachine,
  ) {
    this.dataCache = dataCache;
    this.oamCache = oamCache;
    this.ppuQueue = ppuQueue;
    this.bankManager = bankManager;
    this.inputManager = inputManager;
    this.renderer = renderer;
    this.stateMachine = stateMachine;
  }

  /**
   * 执行NMI等效处理
   * 对应原始汇编:
   *   $80E0: NMI handler entry
   *   $80E1: JSR $82EB - 关NMI
   *   $80E4: LDA $18, STA $2001 - 写PPU MASK
   *   $80ED: LDA #$00, STA $2003 - OAM地址=0
   *   $80F2: LDA #$02, STA $4014 - OAM DMA
   *   $80F7: JSR $812F - PPU队列处理
   *   $80FA: JSR $81B9 - 读取输入
   *   $80FD: JSR $82AD - 更新RNG
   *   $8100-$811B: 游戏逻辑调用
   *   $8120: INC $0300 - 帧计数
   *   $8123-$812E: 恢复寄存器, 开NMI, RTI
   */
  execute(): void {
    // === 阶段1: OAM DMA ===
    // $80E0: PHA (保存A) - 不需要模拟
    // $80E1: JSR $82EB - 关NMI (清除 $19 的 bit 7)
    const ppuCtrl = this.dataCache.ppuCtrl;
    this.dataCache.ppuCtrl = ppuCtrl & ~PpuCtrlBits.NMI_ENABLE;

    // $80E4-$80E6: 写 PPU MASK
    // (在渲染器中处理)

    // $80E9-$80EC: 保存 X, Y 寄存器 - 不需要模拟

    // $80ED-$80F4: OAM DMA
    // STA $2003 = 0 (OAM地址)
    // STA $4014 = $02 (DMA从 $0200 开始)
    this.oamCache.setAddr(0);
    const oamData = this.dataCache.getRamBuffer(0x0200, 256);
    this.oamCache.dmaWrite(oamData);

    // === 阶段2: PPU队列处理 ===
    // $80F7: JSR $812F
    this.processPpuQueue();

    // === 阶段3: 读取输入 ===
    // $80FA: JSR $81B9
    this.readInput();

    // === 阶段4: 更新RNG ===
    // $80FD: JSR $82AD
    // (在 GameLoop.updateRng 中处理)

    // === 阶段5: 游戏逻辑 ===
    // $8100: LDA $93 (bank lock)
    // $8102: BNE $811B (如果lock != 0，跳过)
    if (this.dataCache.bankLock === 0) {
      // $8104-$8118: Bank切换 + 游戏逻辑
      // 这里调用游戏状态机更新
      this.stateMachine.update();
    }

    // === 阶段6: 帧计数 ===
    // $8120: INC $0300
    this.dataCache.frameCount = (this.dataCache.frameCount + 1) & 0xFF;

    // === 帧结束 ===
    // $8123-$812E: 恢复X,Y, 开NMI, RTI
    // 恢复 PPU CTRL (开启NMI)
    this.dataCache.ppuCtrl = this.dataCache.ppuCtrl | PpuCtrlBits.NMI_ENABLE;

    // 渲染
    this.renderer.render(this.dataCache, this.oamCache);
  }

  /**
   * PPU队列处理
   * 对应 $812F-$81B8
   */
  private processPpuQueue(): void {
    const commands = this.ppuQueue.consumeAll();
    for (const cmd of commands) {
      let addr = cmd.address;
      for (let i = 0; i < cmd.data.length; i++) {
        this.renderer.writeVram(addr, cmd.data[i]);
        addr += cmd.isVertical ? 32 : 1;
      }
    }
  }

  /**
   * 读取手柄输入
   * 对应 $81B9-$81ED
   */
  private readInput(): void {
    // 锁存输入
    this.inputManager.latch();
    const input = this.inputManager.getInput();

    // 模拟 $4016 读取
    // 原始代码读取两个手柄
    this.dataCache.joypad1Raw = this.inputManager.readJoypad1();

    // 第二手柄 (简单模拟: 与第一手柄相同)
    this.dataCache.joypad2Raw = 0;
  }
}
