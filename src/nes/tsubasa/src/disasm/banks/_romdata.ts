/**
 * ROM 数据 lazy loader — 从分包 subpkg/rom/ 异步加载
 * (原 1964KB _romdata.ts 已移到分包)
 *
 * 关键设计: 预分配 48 个 Uint8Array → bank 文件 import 时拿到非 null 引用
 *            loadRomData() 用 .set() 在原位填入数据, bank 文件的引用自动生效
 */

/** 预分配 48 个空 8KB slot — bank 文件在最上层 import 时拿到的就是这些引用 */
const SLOTS: Uint8Array[] = Array.from({ length: 48 }, () => new Uint8Array(0x2000));
export const ROM_DATA: ReadonlyArray<Uint8Array> = SLOTS;

let _loaded = false;
let _promise: Promise<Uint8Array[]> | null = null;

/** 从分包异步加载 ROM 原始数据 → 填入预分配的 slot (引用不变) */
export function loadRomData(): Promise<Uint8Array[]> {
  if (_loaded) return Promise.resolve(SLOTS);
  if (_promise) return _promise;

  _promise = new Promise((resolve, reject) => {
    // @ts-ignore — require.async 分包懒加载
    require.async('../../../subpkg/rom/_romdata', (mod: any) => {
      const src = mod.ROM_DATA as Uint8Array[];
      for (let i = 0; i < src.length && i < SLOTS.length; i++) {
        SLOTS[i].set(src[i]);  // 原位填入, 不改变引用
      }
      _loaded = true;
      resolve(SLOTS);
    }, ({ errMsg }: any) => {
      reject(new Error(errMsg || 'subpkg rom load failed'));
    });
  });

  return _promise;
}
