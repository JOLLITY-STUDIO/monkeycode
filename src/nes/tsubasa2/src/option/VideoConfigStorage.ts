// src/option/VideoConfigStorage.ts
//
// 视频配置持久化层 — localStorage 后备内存 (wx mini-program 不一定有 localStorage)
//
// 关键决策:
//   1. tsnes 既要支持 H5 (浏览器), 又要支持微信小程序 (wx)
//   2. H5 用 window.localStorage
//   3. wx 推荐用 wx.getStorageSync / setStorageSync
//   4. 为保持 tsnes core 完全独立于 wx/h5 runtime, 用 StorageAdapter 抽象接口
//      Browser 集成时注入具体 adapter (h5/adapter.ts, wx/adapter.ts)
//   5. 兜底: 内存存储 (process-lifetime) — 不允许 persist 仍可继续运行

import type { VideoConfig } from "./VideoConfig";
import { normalizeVideoConfig } from "./VideoConfig";

export const VIDEO_CONFIG_STORAGE_KEY = "tsubasa2.videoConfig";

/** 持久化抽象, 由 caller (Browser 入口) 注入 */
export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key?: string): void;
}

/** 兜底内存适配器 - 单元测试 / 单屏 demo 用 */
export class MemoryStorageAdapter implements StorageAdapter {
  private store = new Map<string, string>();
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
  removeItem(key?: string): void {
    if (key === undefined) this.store.clear();
    else this.store.delete(key);
  }
}

/** H5 localStorage 适配器 (用于浏览器) */
export class LocalStorageAdapter implements StorageAdapter {
  getItem(key: string): string | null {
    try {
      if (typeof localStorage === "undefined") return null;
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  setItem(key: string, value: string): void {
    try {
      if (typeof localStorage === "undefined") return;
      localStorage.setItem(key, value);
    } catch {
      // 隐私模式 / quota exceeded - ignore
    }
  }
  removeItem(key?: string): void {
    try {
      if (typeof localStorage === "undefined") return;
      if (key === undefined) localStorage.clear();
      else localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}

/**
 * VideoConfigStorage - 持有当前 VideoConfig + 持久化 + 订阅变更
 *
 * 用法:
 *   const storage = new VideoConfigStorage(new LocalStorageAdapter());
 *   await storage.load();
 *   const cfg = storage.current;
 *   storage.onChange = (cfg) => screen.applyConfig(cfg);
 *   storage.update({ scaler: "hq3x" });  // 触发 onChange + 自动 persist
 */
export class VideoConfigStorage {
  private adapter: StorageAdapter;
  private listeners: ((cfg: VideoConfig) => void)[] = [];
  private _current: VideoConfig;
  public loaded = false;

  constructor(adapter: StorageAdapter, initial?: VideoConfig) {
    this.adapter = adapter;
    this._current = initial ? normalizeVideoConfig(initial) : { ...normalizeVideoConfig(undefined) };
  }

  /** 从底层 storage 加载, 失败保留 _current (默认) */
  load(): VideoConfig {
    try {
      const raw = this.adapter.getItem(VIDEO_CONFIG_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this._current = normalizeVideoConfig(parsed);
      }
    } catch (e) {
      console.warn("[VideoConfigStorage] load failed:", e);
    }
    this.loaded = true;
    return this._current;
  }

  get current(): VideoConfig {
    return this._current;
  }

  /** 更新部分字段, 触发 onChange + persist */
  update(patch: Partial<VideoConfig>): VideoConfig {
    const next: VideoConfig = normalizeVideoConfig({ ...this._current, ...patch });
    if (JSON.stringify(next) === JSON.stringify(this._current)) return this._current;
    this._current = next;
    try {
      this.adapter.setItem(VIDEO_CONFIG_STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn("[VideoConfigStorage] persist failed:", e);
    }
    this.emit();
    return this._current;
  }

  /** 完全替换 (允许恢复 default) */
  set(cfg: VideoConfig): VideoConfig {
    const next = normalizeVideoConfig(cfg);
    this._current = next;
    try {
      this.adapter.setItem(VIDEO_CONFIG_STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn("[VideoConfigStorage] persist failed:", e);
    }
    this.emit();
    return this._current;
  }

  reset(): VideoConfig {
    return this.set({ /* cast to bypass */ } as VideoConfig);
    // 上面会被 normalize 还原成 DEFAULT
  }

  onChange(cb: (cfg: VideoConfig) => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private emit(): void {
    for (const cb of this.listeners) {
      try {
        cb(this._current);
      } catch (e) {
        console.error("[VideoConfigStorage] listener error:", e);
      }
    }
  }
}
