// @ts-nocheck
// 从 jsnes (d:/studio/github/monkeycode/src/nes/tools/jsnes/src/utils.js) 复制
// tsnes 是 jsnes 的 TS 版, 此文件补全遗漏的 utils 模块

export function copyArrayElements(src: ArrayLike<number>, srcPos: number, dest: ArrayLike<number>, destPos: number, length: number): void {
  for (let i = 0; i < length; ++i) {
    (dest as any)[destPos + i] = (src as any)[srcPos + i];
  }
}

export function copyArray(src: ArrayLike<number>): number[] {
  return Array.prototype.slice.call(src, 0);
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
      (current as any).set(value);
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
    state[prop] = ArrayBuffer.isView(value) ? Array.from(value as ArrayLike<number>) : value;
  }
  return state;
}
