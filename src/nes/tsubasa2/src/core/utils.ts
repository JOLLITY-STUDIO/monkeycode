/**
 * 通用工具函数 (序列化/复制)
 *
 * 供 PAPU/PPU 等模块使用。与原 tsnes/src/utils.ts 保持一致。
 */

export function copyArrayElements<T>(src: T[] | Uint8Array, srcPos: number, dest: T[] | Uint8Array, destPos: number, length: number): void {
  for (let i = 0; i < length; ++i) {
    (dest as any)[destPos + i] = (src as any)[srcPos + i];
  }
}

export function copyArray<T>(src: T[]): T[] {
  return src.slice(0);
}

export function fromJSON(obj: any, state: any): void {
  const props = obj.constructor.JSON_PROPERTIES;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const current = obj[prop];
    const value = state[prop];
    if (ArrayBuffer.isView(current) && Array.isArray(value)) {
      // Typed arrays: copy data in-place instead of replacing the array,
      // since JSON.parse produces plain arrays not typed arrays.
      (current as unknown as { set(v: number[]): void }).set(value);
    } else {
      obj[prop] = value;
    }
  }
}

export function toJSON(obj: any): any {
  const state: any = {};
  const props = obj.constructor.JSON_PROPERTIES;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const value = obj[prop];
    // Typed arrays must be converted to plain arrays for JSON.stringify,
    // which otherwise serializes them as objects ({0: v, 1: v, ...}).
    state[prop] = ArrayBuffer.isView(value) ? Array.from(value as unknown as ArrayLike<number>) : value;
  }
  return state;
}
