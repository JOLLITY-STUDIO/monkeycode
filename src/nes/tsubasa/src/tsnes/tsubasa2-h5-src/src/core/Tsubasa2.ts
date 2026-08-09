/**
 * 天使之翼2 — 游戏主类
 *
 * 对外暴露的唯一入口。
 * 创建实例 → 传入 CanvasContext → start() → 即插即用。
 *
 * 架构分层 (MVC):
 *   Model   — DataStore (内存/KV 数据中心)
 *   View    — Renderer  (Canvas 渲染)
 *   Control — GameLoop + Bank 服务
 *
 * Reset 链 (不模拟 MMC3，直接对象调用):
 *   Bank31 $FFF0 → H5: no-op (无需 MMC3 复位)
 *   Bank30 $C64E → Bank30Service.init()    硬件初始化
 *   Bank30 $C400 → Bank02Service.resetEntry(0)  场景初始化
 *   Bank02 $A21B → Bank00Service (内部调用)      NT清零/调色板/场景
 *   Bank02 $A26D → Bank00Service.mainLoop()      主循环
 */

import { GameLoop } from './GameLoop';
import { DataStore } from '../data/DataStore';
import { Bank00Service } from '../game/bank00.service';
import { Bank02Service } from '../game/bank02.service';
import { Bank30Service } from '../game/bank30.service';
import { BUTTON } from './types';
import type { Tsubasa2Config, DebugInfo, GameState } from './types';
import { GameState as GS } from './types';

export class Tsubasa2 {
  /** Canvas 2d 上下文 */
  private _ctx: CanvasRenderingContext2D | null = null;

  /** 游戏主循环 */
  private _loop: GameLoop;

  /** 当前状态 */
  private _state: GameState = GS.INIT;

  /** 配置 */
  private _config: Tsubasa2Config;

  /** 按键状态 bitmask */
  private _buttons = 0;

  // ── Bank 服务层 (MVC: Control) ──

  /** 数据中心 (Model) */
  private _store: DataStore;

  /** Bank 00: 核心系统服务 (PPU Buffer, NT, 调色板, 场景) */
  private _bank00!: Bank00Service;

  /** Bank 02: 场景控制器 (RESET 入口, 场景流转) */
  private _bank02!: Bank02Service;

  /** Bank 30: 硬件初始化 */
  private _bank30!: Bank30Service;

  /** 渲染器 (View) */
  // private _renderer: Renderer;

  /** 输入管理 */
  // private _input: InputManager;

  // ✂️ ── 构造与生命周期 ──
  // ------------------------------------------------------------

  constructor(ctx?: CanvasRenderingContext2D | null, config?: Tsubasa2Config) {
    this._ctx = ctx ?? null;
    this._config = config ?? {};
    this._loop = new GameLoop();
    this._store = new DataStore();

    // 构造 Bank 服务链 — 依赖注入，不模拟 MMC3
    this._bank00 = new Bank00Service(this._store);
    this._bank02 = new Bank02Service(this._store, this._bank00);
    this._bank30 = new Bank30Service(this._store, this._bank00, this._bank02);

    this._loop.onFrame = this._onFrame.bind(this);
    this._loop.onRender = this._onRender.bind(this);
  }

  /** 启动游戏（需要传 canvas 节点供 requestAnimationFrame 使用） */
  start(canvas?: any): void {
    if (this._state !== GS.INIT) {
      console.warn('[Tsubasa2] 已启动，忽略重复 start()');
      return;
    }

    // 对应原始 Reset 链:
    //   Bank31 $FFF0 → Bank30 $C503 → $C64E → $C400
    //   → Bank02 $A200 → $A21B → JMP $9EED
    // H5: 无 MMC3，直接调用:
    this._bank30.init();
    // bank30.init() 内部调用:
    //   1. 硬件初始化 (store.reset, NT clear, OAM clear, palette)
    //   2. bank02.resetEntry(0)
    //   3. bank00.mainLoop()

    this._setState(GS.OPENING);
    this._loop.start(canvas);
  }

  /** 暂停 */
  pause(): void {
    this._loop.pause();
  }

  /** 恢复 */
  resume(): void {
    this._loop.resume();
  }

  /** 彻底停止并销毁循环 */
  stop(): void {
    this._loop.stop();
  }

  // ── 资源加载 ──

  /** 加载 PRG Bank 数据 (游戏逻辑) */
  loadPrgBank(_bankId: number, _data: Uint8Array): void {
    // TODO: Bank 服务加载
  }

  /** 加载 CHR Bank 数据 (图形资源) */
  loadChrBank(_bankId: number, _data: Uint8Array): void {
    // TODO: 渲染器 CHR 注册
  }

  // ── 输入接口 ──

  /** 按下一个按键 */
  pressButton(button: keyof typeof BUTTON): void {
    const mask = BUTTON[button] as number;
    if (typeof mask === 'number') this._buttons |= mask;
  }

  /** 释放一个按键 */
  releaseButton(button: keyof typeof BUTTON): void {
    const mask = BUTTON[button] as number;
    if (typeof mask === 'number') this._buttons &= ~mask;
  }

  /** 直接设置按键位掩码 */
  setButtons(mask: number): void {
    this._buttons = mask;
  }

  /** 读取当前按键 */
  getButtons(): number {
    return this._buttons;
  }

  // ── 调试接口 ──

  /** 获取调试信息快照 */
  getDebugInfo(): DebugInfo {
    return {
      frame: (this._loop as any)._frameCount ?? 0,
      gameStateName: this._state,
      fps: this._loop.fps,
    };
  }

  /** 切换 AI 模式 */
  enableAi(): void {
    this._config.aiMode = true;
  }

  disableAi(): void {
    this._config.aiMode = false;
  }

  // ✂️ ── 内部 ──
  // ------------------------------------------------------------

  private _setState(next: GameState): void {
    const prev = this._state;
    this._state = next;
    this._loop.callbacks?.onStateChange?.(prev, next);
  }

  /** 每帧逻辑更新 */
  private _onFrame(_dt: number): void {
    // Bank00 主循环 (帧循环核心)
    if (this._bank00.isRunning) {
      this._bank00.update(this._buttons);
    }
  }

  /** 每帧渲染 */
  private _onRender(_dt: number): void {
    if (!this._ctx) return;
    const ctx = this._ctx;
    ctx.fillStyle = '#0a0a18';
    ctx.fillRect(0, 0, 256, 240);

    const sceneId = this._bank00.getSceneId();
    const frameCount = this._bank00.frameCount;

    // 调试渲染: 显示当前状态
    ctx.fillStyle = '#00ff00';
    ctx.font = '10px monospace';
    ctx.fillText(`frame:${frameCount} scene:0x${sceneId.toString(16)}`, 8, 16);
    ctx.fillText('Reset OK — Bank30→Bank02→Bank00', 8, 32);
  }
}
