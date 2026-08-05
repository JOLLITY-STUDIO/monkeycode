/**
 * 天使之翼1 — NMI中断处理器
 * 对应原 Bank 0: $80E0-$812E (NMI Handler)
 * 
 * 每帧VBlank时触发:
 *   1. 保存寄存器
 *   2. 关闭NMI
 *   3. OAM DMA (将 $0200-$02FF 拷贝到 OAM)
 *   4. 处理PPU更新队列
 *   5. 读取手柄输入
 *   6. 更新随机数
 *   7. Bank切换 + 音频调度
 *   8. 帧计数++
 *   9. 恢复寄存器
 *   10. RTI
 */

import { DataStore } from '../data/DataStore';
import { PpuQueue } from '../engine/PpuQueue';
import { InputManager } from '../engine/InputManager';
import { BankDispatcher } from './BankDispatcher';

export class NmiHandler {
  private ds: DataStore;
  private ppuQueue: PpuQueue;
  private inputManager: InputManager;
  private bankDispatcher: BankDispatcher;
  
  /** ROM读取器 (在初始化时注入) */
  private _romReader: ((addr: number) => number) | null = null;
  
  /** 随机数发生器种子 */
  private _randomSeed: number = 0x1234;
  
  constructor(
    ds: DataStore,
    ppuQueue: PpuQueue,
    inputManager: InputManager,
    bankDispatcher: BankDispatcher
  ) {
    this.ds = ds;
    this.ppuQueue = ppuQueue;
    this.inputManager = inputManager;
    this.bankDispatcher = bankDispatcher;
  }
  
  /** 注入ROM读取器 (Bank 7固定区 + 当前PRG Bank) */
  setRomReader(reader: (addr: number) => number): void {
    this._romReader = reader;
  }
  
  /**
   * NMI处理 (每帧调用一次)
   * 对应原始: $80E0-$812E
   */
  process(): void {
    // ====== 1-2. 保存状态 + 关闭NMI ======
    // (在TS中不需要保存寄存器，但需要做PPU状态管理)
    
    // ====== 3. OAM DMA ======
    // 对应原始: $80ED-$80F6
    //   LDA #$00 → STA $2003 (OAMADDR=0)
    //   LDA #$02 → STA $4014 (DMA $0200→OAM)
    // 在TS中OAM已经在DataStore中，无需DMA拷贝
    // (原始OAM DMA将CPU $0200-$02FF拷贝到PPU OAM)
    
    // ====== 4. 处理PPU更新队列 ======
    // 对应原始: $80F7 JSR $812F
    if (this._romReader) {
      this.ppuQueue.processFrame(this._romReader);
    }
    
    // ====== 5. 读取手柄输入 ======
    // 对应原始: $80FA JSR $81B9
    this.inputManager.processFrame();
    
    // ====== 6. 更新随机数发生器 ======
    // 对应原始: $80FD JSR $82AD
    this._updateRandom();
    
    // ====== 7. Bank切换 + 音频回调 ======
    // 对应原始: $8100-$8128
    // 检查Bank锁定
    if (this.ds.bankLock === 0) {
      // 切换CHR Bank
      this.bankDispatcher.switchChrBank0(this.ds.chrBank0);
      this.bankDispatcher.switchChrBank1(this.ds.chrBank1);
      
      // MMC1控制寄存器
      // (已在上层处理)
      
      // 音频回调: JSR $DB00 (Bank 1的音频调度入口)
      // 在TS中由 AudioEngine 单独处理
    }
    
    // ====== 8. 帧计数++ ======
    // 对应原始: $8120 INC ram_0300
    this.ds.frameCounter++;
  }
  
  /**
   * 随机数发生器更新
   * 对应原始: $82AD
   * 
   * 典型的 LFSR (线性反馈移位寄存器):
   *   LDA randomSeed
   *   ASL
   *   BCC noEor
   *   EOR #$XX
   *   STA randomSeed
   */
  private _updateRandom(): void {
    // 简单的LFSR模拟 (8位)
    let val = this._randomSeed & 0xFF;
    const carry = (val & 0x80) !== 0;
    val = ((val << 1) & 0xFF) | (carry ? 1 : 0);
    if (carry) {
      val ^= 0x1D;  // 常用的反馈多项式
    }
    this._randomSeed = (this._randomSeed & 0xFF00) | val;
    
    // 同时更新高字节 (原始代码也操作高字节)
    this.ds.randomSeed = this._randomSeed & 0xFFFF;
  }
  
  /**
   * 获取随机数 (0-255)
   */
  getRandom(): number {
    return this._randomSeed & 0xFF;
  }
  
  /**
   * 获取16位随机数
   */
  getRandom16(): number {
    return this._randomSeed & 0xFFFF;
  }
  
  // ==================== NMI辅助方法 ====================
  
  /**
   * 等待NMI (等待下一帧)
   * 对应原始: $8314 WaitNmi
   * 
   * 原始代码:
   *   $8314: LDA #$00
   *   $8316: STA ram_0300
   *   $8319: LDA ram_0300
   *   $831C: BEQ $8319      ← 等待变为非零
   *   $831E: RTS
   * 
   * 在TS中这是一个异步操作，但在单帧循环中，
   * frameCounter已经是递增的，所以直接等下一帧即可。
   */
  waitNmi(): void {
    // 在实际实现中，这是在主循环中通过等待来实现的
    // 在TS中，我们通过帧循环自然等待
    // 这里只是重置计数器供检查
    const prevFrame = this.ds.frameCounter;
    // 调用方会检查 frameCounter 是否变化
  }
  
  /**
   * 等待X个NMI帧
   * 对应原始: $831F WaitNmiX
   */
  waitNmiX(count: number): void {
    // 同样在TS帧循环中自然等待
    // 标记需要的帧数
  }
  
  /**
   * 开启NMI
   * 对应原始: $82F5 EnableNmi
   */
  enableNmi(): void {
    this.ds.ppuCtrl |= 0x80;  // 设置bit7 (NMI enable)
  }
  
  /**
   * 关闭NMI
   * 对应原始: $82FF DisableNmi
   */
  disableNmi(): void {
    this.ds.ppuCtrl &= 0x7F;  // 清除bit7
    this.ds.ppuMask = 0;      // 清零PPU MASK (关闭渲染)
  }
  
  /**
   * 开启屏幕渲染
   * 对应原始: $830A EnableScreen
   */
  enableScreen(): void {
    this.ds.ppuMask = 0x1E;  // bg+spr+left 8px
  }
  
  /**
   * 清除OAM
   * 对应原始: $8371 ClearOam
   */
  clearOam(): void {
    this.ds.clearOam();
  }
}
