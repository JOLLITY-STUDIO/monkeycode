/**
 * ============================================================================
 * bus — 事件总线
 *
 * 纯事件驱动，不涉及任何地址/内存/硬件。
 * 各模块通过 on 注册监听、emit 派发事件。
 *
 * 类似 PixiJS EventEmitter / 小程序 EventBus。
 * ============================================================================
 */

type Handler = (...args: any[]) => void;

export interface Bus {
  /** 注册监听 */
  on(event: string, fn: Handler): void;
  /** 取消监听 */
  off(event: string, fn: Handler): void;
  /** 派发事件 */
  emit(event: string, ...args: any[]): void;
  /** 一次性监听 */
  once(event: string, fn: Handler): void;
  /** 清除某事件所有监听 */
  clear(event?: string): void;
}

export function createBus(): Bus {
  const listeners = new Map<string, Handler[]>();

  function _get(event: string): Handler[] {
    let list = listeners.get(event);
    if (!list) {
      list = [];
      listeners.set(event, list);
    }
    return list;
  }

  return {
    on(event, fn) {
      _get(event).push(fn);
    },

    off(event, fn) {
      const list = listeners.get(event);
      if (list) {
        const idx = list.indexOf(fn);
        if (idx !== -1) list.splice(idx, 1);
      }
    },

    emit(event, ...args) {
      const list = listeners.get(event);
      if (!list) return;
      // 复制一份防止回调里增删
      for (const fn of [...list]) {
        fn(...args);
      }
    },

    once(event, fn) {
      const wrapper: Handler = (...args) => {
        this.off(event, wrapper);
        fn(...args);
      };
      this.on(event, wrapper);
    },

    clear(event) {
      if (event) {
        listeners.delete(event);
      } else {
        listeners.clear();
      }
    },
  };
}
