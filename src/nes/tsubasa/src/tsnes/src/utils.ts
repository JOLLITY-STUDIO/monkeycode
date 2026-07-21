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
      current.set(value);
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
    state[prop] = ArrayBuffer.isView(value) ? Array.from(value) : value;
  }
  return state;
}
