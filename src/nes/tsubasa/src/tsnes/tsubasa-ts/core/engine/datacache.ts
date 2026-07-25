/**
 * ============================================================================
 * DataCache — 通用 key-value 缓存
 *
 * 底层基于 Map<string, unknown>，爱存啥存啥。
 * 比如: cache.set('bank00', bankObj) / cache.set('ppu', ppuState)
 * ============================================================================
 */

export class DataCache {
  private readonly _map = new Map<string, unknown>();

  set(key: string, value: unknown): void { this._map.set(key, value); }
  get<T = unknown>(key: string): T | undefined { return this._map.get(key) as T | undefined; }
  has(key: string): boolean { return this._map.has(key); }
  delete(key: string): boolean { return this._map.delete(key); }
  clear(): void { this._map.clear(); }
  get size(): number { return this._map.size; }

  /** 放入一个普通对象的所有属性当键 */
  putAll(obj: Record<string, unknown>): void {
    for (const [k, v] of Object.entries(obj)) {
      this._map.set(k, v);
    }
  }

  /** 导出为普通对象（浅拷贝） */
  toObject(): Record<string, unknown> {
    return Object.fromEntries(this._map);
  }
}
