/**
 * 天使之翼2 — 游戏主类
 *
 * 对外暴露的唯一入口。
 * 创建实例 → 传入 CanvasContext → 加载资源 → start() → 即插即用。
 *
 * 架构分层 (MVC):
 *   Model   — DataStore (内存/KV 数据中心)
 *   View    — Renderer  (Canvas 渲染)
 *   Control — GameLoop + InputManager + Bank 服务
 */

import { GameLoop } from './GameLoop';
import { BUTTON, type Tsubasa2Config, type DebugInfo, type GameState } from './types';
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

  // ── 子模块占位 ──

  /** 数据中心 (Model) */
  // private _store: DataStore;

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

    this._loop.onFrame = this._onFrame.bind(this);
    this._loop.onRender = this._onRender.bind(this);
  }

  /** 启动游戏（需要传 canvas 节点供 requestAnimationFrame 使用） */
  start(canvas?: any): void {
    if (this._state !== GS.INIT) {
      console.warn('[Tsubasa2] 已启动，忽略重复 start()');
      return;
    }
    this._setState(GS.TITLE);
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
    // TODO: 根据 _state 分发到对应场景 update()
    // 例如: this._scenes[this._state].update(dt, this._buttons);
  }

  /** 每帧渲染 */
  private _onRender(_dt: number): void {
    if (!this._ctx) return;
    // TODO: Renderer 渲染
    // 暂时用占位色块
    const ctx = this._ctx;
    ctx.fillStyle = '#0a0a18';
    ctx.fillRect(0, 0, 256, 240);

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.fillText('Tsubasa 2 - Loading...', 40, 120);
  }
}
