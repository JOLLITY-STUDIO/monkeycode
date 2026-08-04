/**
 * PPU数据填充处理器 — 替代6502 NMI中断中与PPU相关的部分
 *
 * NES中NMI每帧只做一件事：在VBlank期间把数据填入PPU。
 * 对应 ROM 中 $80E0-$80F7 + $80FA-$80FD + $8120:
 *
 *   $80ED: STA $2003 = 0   — OAM地址=0
 *   $80F2: STA $4014 = $02 — OAM DMA
 *   $80F7: JSR $812F       — PPU队列处理
 *   $80FA: JSR $81B9       — 读取输入
 *   $80FD: JSR $82AD       — 更新RNG
 *   $8120: INC $0300       — 帧计数
 *
 * 注意：游戏逻辑(state machine)不在此处，由外部 GameLoop 在PPU数据填充后调用。
 * 这对应原始代码中 $8100-$811B 的 bankLock 检查和 bank dispatch，它在
 * NMI返回前执行，但语义上属于"游戏逻辑"，我们把它放在帧的阶段2中。
 */

import { PpuCtrlBits } from '../core/types';
import type { DataCache } from '../cache/DataCache';
import type { OamCache } from '../cache/OamCache';
import type { PpuQueue } from '../cache/PpuQueue';
import type { InputManager } from '../input/InputManager';
import type { Renderer } from '../renderer/Renderer';

export class PpuDataFiller {
  private dataCache: DataCache;
  private oamCache: OamCache;
  private ppuQueue: PpuQueue;
  private inputManager: InputManager;
  private renderer: Renderer;

  constructor(
    dataCache: DataCache,
    oamCache: OamCache,
    ppuQueue: PpuQueue,
    inputManager: InputManager,
    renderer: Renderer,
  ) {
    this.dataCache = dataCache;
    this.oamCache = oamCache;
    this.ppuQueue = ppuQueue;
    this.inputManager = inputManager;
    this.renderer = renderer;
  }

  /**
   * 阶段1: PPU数据填充（对应NMI的硬件操作）
   *
   * 这是每帧的第一步：把游戏逻辑准备好的OAM数据和VRAM写入命令，
   * 实际写入PPU的缓冲区。之后Renderer用这些数据渲染画面。
   *
   * 流程:
   *   1. 关NMI标志位
   *   2. OAM DMA — 把CPU RAM $0200-$02FF 写入OAM缓存
   *   3. PPU队列处理 — 把VRAM写入命令执行到渲染器
   *   4. 读取输入 — 锁存手柄状态
   *   5. 帧计数++
   *   6. 开NMI标志位
   */
  fillPpuData(): void {
    // $80E1: 关NMI (清除 $19 bit 7)
    this.dataCache.ppuCtrl &= ~PpuCtrlBits.NMI_ENABLE;

    // $80ED-$80F4: OAM DMA
    // STA $2003 = 0; STA $4014 = $02
    this.oamCache.setAddr(0);
    const oamData = this.dataCache.getRamBuffer(0x0200, 256);
    this.oamCache.dmaWrite(oamData);

    // $80F7: PPU队列处理 → VRAM写入
    this.processPpuQueue();

    // $80FA: 读取输入
    this.readInput();

    // $8120: 帧计数++
    this.dataCache.frameCount = (this.dataCache.frameCount + 1) & 0xFF;

    // $8123: 恢复NMI使能
    this.dataCache.ppuCtrl |= PpuCtrlBits.NMI_ENABLE;
  }

  /**
   * PPU队列处理 — 对应 $812F-$81B8
   * 把游戏逻辑积累的VRAM写入命令批量执行
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
   * 读取手柄输入 — 对应 $81B9-$81ED
   */
  private readInput(): void {
    this.inputManager.latch();
    this.dataCache.joypadRaw = this.inputManager.readJoypad1();
  }
}

/**
 * 向后兼容别名 — 旧代码中的 NmiHandler 引用
 * @deprecated 使用 PpuDataFiller
 */
export { PpuDataFiller as NmiHandler };
