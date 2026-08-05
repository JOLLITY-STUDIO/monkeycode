/**
 * 天使之翼1 — 游戏主循环
 * 对应原 Bank 0: $81EE-$81F6 (Main Loop)
 * 
 * 主循环 (无限):
 *   while(true) {
 *     WaitNmi();          // 等待下一帧 (ram_0300 != 0)
 *     StateDispatch();    // 根据 ram_03CA 分派
 *   }
 * 
 * 同时管理 NMI 和 渲染 的协调
 */

import { DataStore } from '../data/DataStore';
import { StateMachine } from './StateMachine';
import { NmiHandler } from './NmiHandler';
import { Renderer } from '../render/Renderer';

/** 帧回调函数类型 */
export type FrameCallback = (frame: number) => void;

export class GameLoop {
  private ds: DataStore;
  private stateMachine: StateMachine;
  private nmiHandler: NmiHandler;
  private renderer: Renderer | null = null;
  
  /** 运行状态 */
  private _running: boolean = false;
  private _paused: boolean = false;
  private _animFrameId: number = 0;
  
  /** 性能统计 */
  private _fps: number = 0;
  private _frameTime: number = 0;
  private _lastTime: number = 0;
  private _fpsCounter: number = 0;
  private _fpsAccum: number = 0;
  
  /** 帧回调 (用于调试/自动化) */
  private _frameCallbacks: FrameCallback[] = [];
  
  /** Canvas 节点 (微信小程序需要用于 requestAnimationFrame) */
  private _canvasNode: any = null;
  
  /** 目标FPS (NES原生≈60fps) */
  private readonly _targetFps: number = 60;
  private readonly _frameInterval: number = 1000 / 60;
  
  constructor(ds: DataStore, stateMachine: StateMachine, nmiHandler: NmiHandler) {
    this.ds = ds;
    this.stateMachine = stateMachine;
    this.nmiHandler = nmiHandler;
  }
  
  /** 设置渲染器 */
  setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }
  
  /** 设置 Canvas 节点 (微信小程序中需要) */
  setCanvasNode(node: any): void {
    this._canvasNode = node;
  }
  
  /** 添加帧回调 */
  onFrame(cb: FrameCallback): void {
    this._frameCallbacks.push(cb);
  }
  
  /**
   * 安全时间戳 — 兼容微信小程序和浏览器
   */
  private _now(): number {
    if (typeof performance !== 'undefined' && performance.now) {
      return performance.now();
    }
    return Date.now();
  }
  
  // ==================== 生命周期 ====================
  
  /**
   * 启动游戏 (对应 RESET → 主循环)
   */
  start(): void {
    if (this._running) return;
    
    console.log('[GameLoop] 游戏启动');
    
    // RESET 初始化
    this.reset();
    
    // 开始帧循环
    this._running = true;
    this._paused = false;
    this._lastTime = this._now();
    this._scheduleFrame();
  }
  
  /**
   * 暂停游戏
   */
  pause(): void {
    this._paused = true;
    console.log('[GameLoop] 游戏暂停');
  }
  
  /**
   * 恢复游戏
   */
  resume(): void {
    if (!this._paused) return;
    this._paused = false;
    this._lastTime = this._now();
    this._scheduleFrame();
    console.log('[GameLoop] 游戏恢复');
  }
  
  /**
   * 停止游戏
   */
  stop(): void {
    this._running = false;
    if (this._animFrameId) {
      this._cancelFrame(this._animFrameId);
      this._animFrameId = 0;
    }
    console.log('[GameLoop] 游戏停止');
  }
  
  // ==================== RESET 流程 ====================
  
  /**
   * 完整RESET流程
   * 对应原始:
   *   Bank 7 $FFC0: MMC1初始化
   *   Bank 7 $FFD7: JMP ($8000) → Bank 0 $809B
   *   Bank 0 $809B: 等待VBlank → RAM清零 → PPU初始化 → JMP $81EE
   */
  reset(): void {
    console.log('[GameLoop] RESET...');
    
    // 1. MMC1初始化 (对应 Bank 7 $FFC0-$FFD5)
    this._mmc1Init();
    
    // 2. 数据中心重置
    this.ds.reset();
    
    // 3. PPU初始化
    this.ds.ppuMask = 0x06;    // 仅背景
    this.ds.ppuCtrl = 0x10;    // NMI关闭, BG pattern=$1000, NT=$2000
    this.ds.scrollX = 0;
    this.ds.scrollY = 0;
    
    // 4. 清除OAM
    this.nmiHandler.clearOam();
    
    // 5. 清除所有Nametable
    this._clearNametables();
    
    // 6. 开启NMI
    this.nmiHandler.enableNmi();
    
    // 7. 进入主循环
    console.log('[GameLoop] RESET完成, 进入主循环');
  }
  
  // ==================== 帧循环 ====================
  
  /**
   * 调度下一帧
   * 优先使用 Canvas.requestAnimationFrame (微信小程序)
   * 其次使用 window.requestAnimationFrame (浏览器)
   * 最后降级为 setTimeout
   */
  private _scheduleFrame(): void {
    if (!this._running) return;
    this._animFrameId = this._requestFrame((timestamp: number) => this._onFrame(timestamp));
  }
  
  /**
   * 请求动画帧 — 微信小程序兼容版
   */
  private _requestFrame(callback: (timestamp: number) => void): number {
    // 1. 微信小程序 Canvas.requestAnimationFrame
    if (this._canvasNode && typeof this._canvasNode.requestAnimationFrame === 'function') {
      return this._canvasNode.requestAnimationFrame(callback);
    }
    // 2. 浏览器 window.requestAnimationFrame
    if (typeof requestAnimationFrame === 'function') {
      return requestAnimationFrame(callback);
    }
    // 3. 降级: setTimeout (约60fps)
    return setTimeout(() => callback(Date.now()), 16) as unknown as number;
  }
  
  /**
   * 取消动画帧 — 微信小程序兼容版
   */
  private _cancelFrame(id: number): void {
    if (this._canvasNode && typeof this._canvasNode.cancelAnimationFrame === 'function') {
      this._canvasNode.cancelAnimationFrame(id);
    } else if (typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(id);
    } else {
      clearTimeout(id);
    }
  }
  
  /**
   * 每帧处理
   * 对应原始:
   *   $81EE: JSR $8314  (WaitNmi)
   *   $81F1: JSR $81F7  (StateDispatch)
   *   $81F4: JMP $81EE  (无限循环)
   */
  private _onFrame(timestamp: number): void {
    if (!this._running || this._paused) return;
    
    // FPS计算
    const elapsed = timestamp - this._lastTime;
    this._lastTime = timestamp;
    this._fpsAccum += elapsed;
    this._fpsCounter++;
    if (this._fpsAccum >= 1000) {
      this._fps = this._fpsCounter;
      this._fpsCounter = 0;
      this._fpsAccum = 0;
    }
    
    // ====== 1. NMI处理 (模拟VBlank) ======
    // 对应 WaitNmi: 等待 ram_0300 变为非零
    this.nmiHandler.process();
    
    // ====== 2. 游戏状态分派 ======
    // 对应 JSR $81F7
    try {
      this.stateMachine.dispatch();
    } catch (err) {
      console.error('[GameLoop] 状态分派错误:', err);
    }
    
    // ====== 3. 渲染 ======
    if (this.renderer) {
      try {
        this.renderer.render();
      } catch (err) {
        console.error('[GameLoop] 渲染错误:', err);
      }
    }
    
    // ====== 4. 帧回调 ======
    for (const cb of this._frameCallbacks) {
      try {
        cb(this.ds.frameCounter);
      } catch (err) {
        console.error('[GameLoop] 帧回调错误:', err);
      }
    }
    
    // ====== 5. 调度下一帧 ======
    this._scheduleFrame();
  }
  
  // ==================== 辅助方法 ====================
  
  /**
   * MMC1 初始化
   * 对应 Bank 7: $FFC0-$FFD5
   * 
   * 序列:
   *   $FFC0: SEI
   *   $FFC1: CLD
   *   $FFC2: LDA #$10 → STA $2000  (PPU NMI关闭)
   *   $FFC7: LDA #$80 → STA $8000  (MMC1 重置)
   *   $FFCC: LDA #$1A
   *   $FFCE: LDX #$05
   *   $FFD0: STA $8000 → LSR → DEX → BNE  (5次串行写入)
   *   
   *   最终 MMC1 控制寄存器 = $1A:
   *     bit1-0 = 10: 水平镜像
   *     bit3-2 = 10: PRG Mode 2
   *     bit4   = 1:  CHR Mode 1
   */
  private _mmc1Init(): void {
    // MMC1控制寄存器初始值: $1A
    // 水平镜像 + PRG Mode 2 + CHR Mode 1
    this.ds.mmcCtrl = 0x1A;
    this.ds.mmcShiftReg = 0x10;
    this.ds.currentPrgBank = 0;
    this.ds.currentChrBank0 = 0;
    this.ds.currentChrBank1 = 0;
  }
  
  /**
   * 清除所有Nametable和属性表
   * 对应原始: $838F ClearNametable
   */
  private _clearNametables(): void {
    this.ds.nametable0.fill(0);
    this.ds.nametable1.fill(0);
    this.ds.nametable2.fill(0);
    this.ds.nametable3.fill(0);
  }
  
  // ==================== 查询 ====================
  
  get isRunning(): boolean { return this._running; }
  get isPaused(): boolean { return this._paused; }
  get fps(): number { return this._fps; }
  get frameCount(): number { return this.ds.frameCounter; }
}
