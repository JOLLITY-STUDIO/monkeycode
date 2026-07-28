/**
 * EventBus — bank 间并行通知（pub/sub）
 *
 * ═══════════════════════════════════════
 * 架构分层
 * ═══════════════════════════════════════
 *
 * Controller→Service（排他，直接 import 调用）
 *   bank-31 需要 bank-30 的乘法函数 → 直接 import bank-30
 *   bank 切换（MMC3 寄存器写入）→ 排他，旧 bank 被覆盖
 *
 * EventBus（并行，pub/sub 通知）
 *   NMI/帧到来 → bank-00 处理输入、bank-31 渲染画面，多 bank 同时感知
 *   场景进入/离开 → 各子系统各自初始化/清理
 *   手柄输入变更 → 多个 listener 各取所需
 *
 * ═══════════════════════════════════════
 * 事件类型
 * ═══════════════════════════════════════
 *
 *   frame:tick   → 每帧主循环迭代
 *   nmi:begin    → NMI / VBlank 开始
 *   nmi:end      → NMI / VBlank 结束
 *   scene:enter  → 场景切换
 *   scene:leave  → 场景离开
 *   input:change → 手柄输入更新
 *   ppu:ready    → PPU 帧渲染完成
 */

import type { SystemState } from './system-state';

// ═════════════════════════════════════════════════
// 事件 payload 类型
// ═════════════════════════════════════════════════

export interface FrameTickEvent {
  frameCount: number;
}

export interface SceneEvent {
  sceneId: number;
  subState: number;
  from?: number;
}

export interface InputEvent {
  player: number;       // 0 or 1
  buttons: number;      // raw button bits
  justPressed: number;  // 新按下的
}

export interface PpuReadyEvent {
  /** PPU status register */
  status: number;
}

/**
 * 所有 EventBus 事件 → payload 映射
 */
export interface BusEventMap {
  'frame:tick':  FrameTickEvent;
  'nmi:begin':   void;
  'nmi:end':     void;
  'scene:enter': SceneEvent;
  'scene:leave': SceneEvent;
  'input:change':InputEvent;
  'ppu:ready':   PpuReadyEvent;
}

export type BusEvent = keyof BusEventMap;

// ═════════════════════════════════════════════════
// EventBus 核心
// ═════════════════════════════════════════════════

type Listener<E extends BusEvent> = (sys: SystemState, payload: BusEventMap[E]) => void;

interface ListenerEntry {
  event: BusEvent;
  fn: Listener<any>;
  once: boolean;
  id: number;
}

let _nextId = 1;
const _listeners: ListenerEntry[] = [];

/**
 * 订阅事件（持久监听）
 *
 * @example
 *   onBus('bank:switch', (sys, { window6, window7 }) => {
 *     console.log(`bank switch: W6=$${window6.toString(16)} W7=$${window7.toString(16)}`);
 *   });
 *
 * @returns 取消订阅函数
 */
export function onBus<E extends BusEvent>(
  event: E,
  fn: (sys: SystemState, payload: BusEventMap[E]) => void,
): () => void {
  const entry: ListenerEntry = {
    event,
    fn: fn as Listener<any>,
    once: false,
    id: _nextId++,
  };
  _listeners.push(entry);
  return () => {
    const idx = _listeners.indexOf(entry);
    if (idx >= 0) _listeners.splice(idx, 1);
  };
}

/**
 * 订阅事件（仅触发一次后自动取消）
 */
export function onceBus<E extends BusEvent>(
  event: E,
  fn: (sys: SystemState, payload: BusEventMap[E]) => void,
): void {
  _listeners.push({
    event,
    fn: fn as Listener<any>,
    once: true,
    id: _nextId++,
  });
}

/**
 * 发布事件（同步，按注册顺序通知所有订阅者）
 *
 * @example
 *   emitBus('frame:tick', sys, { frameCount: sys.frameCount });
 */
export function emitBus<E extends BusEvent>(
  event: E,
  sys: SystemState,
  payload: BusEventMap[E],
): void {
  // 复制一份防止遍历中修改
  const snapshot = [..._listeners];
  for (const entry of snapshot) {
    if (entry.event === event) {
      try {
        entry.fn(sys, payload);
      } catch (err) {
        console.error(`[EventBus] error in "${event}" handler:`, err);
      }
      if (entry.once) {
        const idx = _listeners.indexOf(entry);
        if (idx >= 0) _listeners.splice(idx, 1);
      }
    }
  }
}

/**
 * 清除所有监听器（用于重置/测试）
 */
export function clearBus(): void {
  _listeners.length = 0;
}

/**
 * 获取当前活跃监听器数量（调试用）
 */
export function busDebugInfo(): { total: number; events: Record<string, number> } {
  const events: Record<string, number> = {};
  for (const e of _listeners) {
    events[e.event] = (events[e.event] || 0) + 1;
  }
  return { total: _listeners.length, events };
}
