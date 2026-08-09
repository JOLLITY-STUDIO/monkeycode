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
import { DataStore } from '../data/DataStore';
import { BootService } from '../game/boot';
import { SceneRoot } from '../data/scene/index';
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

  // ── 子模块 ──

  /** 数据中心 (Model) */
  private _store: DataStore;

  /** 启动服务 (对应 Bank 31 RESET + Bank 00/30 初始化) */
  private _boot!: BootService;

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

    this._loop.onFrame = this._onFrame.bind(this);
    this._loop.onRender = this._onRender.bind(this);
  }

  /** 启动游戏（需要传 canvas 节点供 requestAnimationFrame 使用） */
  start(canvas?: any): void {
    if (this._state !== GS.INIT) {
      console.warn('[Tsubasa2] 已启动，忽略重复 start()');
      return;
    }

    // 对应 Bank 31 $FFF0 RESET → Bank 30 硬件初始化
    this._boot = new BootService(this._store);
    this._boot.init();

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
    const root = this._boot.getRoot();

    switch (root) {
    case SceneRoot.BOOT:
    case SceneRoot.TITLE:
      // BootService 统一处理 BOOT + TITLE
      this._boot.update(this._buttons, 0);
      this._syncState();
      return;

    default:
      // TODO: 其他场景由对应 Service 处理
      return;
    }
  }

  /** 同步 boot 内部状态到 GameState */
  private _syncState(): void {
    const root = this._boot.getRoot();
    switch (root) {
    case SceneRoot.BOOT:
      if (this._state !== GS.OPENING) this._setState(GS.OPENING);
      break;
    case SceneRoot.TITLE:
      if (this._state !== GS.TITLE) this._setState(GS.TITLE);
      break;
    case SceneRoot.MEETING:
      if (this._state !== GS.MENU) this._setState(GS.MENU);
      break;
    case SceneRoot.MATCH:
      if (this._state !== GS.MATCH) this._setState(GS.MATCH);
      break;
    }
  }

  /** 每帧渲染 */
  private _onRender(_dt: number): void {
    if (!this._ctx) return;
    const ctx = this._ctx;
    ctx.fillStyle = '#0a0a18';
    ctx.fillRect(0, 0, 256, 240);

    const root = this._boot?.getRoot();

    if (root === undefined || root === SceneRoot.BOOT) {
      this._renderBoot(ctx);
    } else if (root === SceneRoot.TITLE) {
      this._renderTitle(ctx);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText(`Scene: ${root}`, 10, 20);
    }
  }

  /** 绘制开场动画占位 */
  private _renderBoot(ctx: CanvasRenderingContext2D): void {
    const shot = this._boot.getShot();
    const names = ['TECMO', '大空 翼', '日向 小次郎', '岬 太郎', '若林 源三', 'WORLD CUP', '—'] as const;

    ctx.fillStyle = '#ffdd44';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(names[shot] ?? '', 128, 110);

    ctx.fillStyle = '#888';
    ctx.font = '10px monospace';
    ctx.fillText('Press START to skip', 128, 150);
    ctx.textAlign = 'left';
  }

  /** 绘制标题画面占位 */
  private _renderTitle(ctx: CanvasRenderingContext2D): void {
    const cursor = this._boot.getTitleCursor();
    const yBase = 140;
    const items = ['KICK OFF', 'CONTINUE'];

    ctx.fillStyle = '#ff6600';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('CAPTAIN TSUBASA II', 128, 90);
    ctx.textAlign = 'left';

    for (let i = 0; i < items.length; i++) {
      const y = yBase + i * 24;
      if (i === cursor) {
        ctx.fillStyle = '#ffffff';
        ctx.fillText('▶', 60, y);
      }
      ctx.fillStyle = cursor === i ? '#ffff00' : '#aaaaaa';
      ctx.font = '14px monospace';
      ctx.fillText(items[i], 80, y);
    }
  }
}
