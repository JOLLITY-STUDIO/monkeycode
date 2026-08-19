/**
 * stubs.ts —— 未翻译函数的占位 stub（《NDS-ROM精准语义移植》待逐函数覆盖）
 * 每个 stub 保留地址溯源 + TODO，返回值暂取 0，翻译完成后逐个替换。
 * BL 调用协议：r0-r3 入参，r0 返回。
 */
import { NdsHardware } from "./hardware";

export type NdsFn = (hw: NdsHardware) => number;

/** 已注册函数表：地址 → 翻译函数 */
const TABLE = new Map<number, NdsFn>();

export function register(addr: number, fn: NdsFn): void {
  TABLE.set(addr, fn);
}

/** 调用某个函数（未注册则抛错，防止静默错误） */
export function call(hw: NdsHardware, addr: number): number {
  const fn = TABLE.get(addr);
  if (!fn) {
    throw new Error(`[nds] untranslated function call @ 0x${addr.toString(16)}`);
  }
  return fn(hw);
}

function stub(addr: number, name: string): NdsFn {
  const fn: NdsFn = (hw) => {
    // TODO(分块覆盖): 翻译函数 0xADDR
    void hw;
    return 0;
  };
  Object.defineProperty(fn, "name", { value: name });
  register(addr, fn);
  return fn;
}

// —— 主入口 0x2003000 调用的函数（逐个覆盖中） ——
// 0x2003018 bl 0x20178d0
stub(0x20178d0, "f_20178d0");
// 0x200301c bl 0x2053b7c
stub(0x2053b7c, "f_2053b7c");
// 0x2003020 bl 0x2054eb0
stub(0x2054eb0, "f_2054eb0");
// 0x2003024 bl 0x2051954
stub(0x2051954, "f_2051954");
// 0x200302c bl 0x2051734
stub(0x2051734, "f_2051734");
// 0x2003044 bl 0x2053eac
stub(0x2053eac, "f_2053eac");
// 0x2003050 bl 0x2053e98
stub(0x2053e98, "f_2053e98");
// 0x2003064 bl 0x20540f8
stub(0x20540f8, "f_20540f8");
// 0x2003070 bl 0x2053c54
stub(0x2053c54, "f_2053c54");
// 0x2003080 bl 0x2053bcc
stub(0x2053bcc, "f_2053bcc");
// 0x2003094 bl 0x2054058
stub(0x2054058, "f_2054058");
// 0x20030a0 bl 0x20541b4
stub(0x20541b4, "f_20541b4");
// 0x20030b0 bl 0x20541f0
stub(0x20541f0, "f_20541f0");
// 0x20030bc bl 0x204500c
stub(0x204500c, "f_204500c");
// 0x20030c8 bl 0x2045084
stub(0x2045084, "f_2045084");
// 0x20030e8 bl 0x2013ff8
stub(0x2013ff8, "f_2013ff8");
// 0x2003110 bl 0x2036904
stub(0x2036904, "f_2036904");
// 0x2003114 bl 0x2012bc8
stub(0x2012bc8, "f_2012bc8");
// 0x2003194 bl 0x20120bc
stub(0x20120bc, "f_20120bc");
// 0x2003198 bl 0x2012030
stub(0x2012030, "f_2012030");
// 0x20031c4 bl 0x201413c
stub(0x201413c, "f_201413c");
// 0x20031c8 bl 0x2054750
stub(0x2054750, "f_2054750");
// 0x20031d4 bl 0x2054760
stub(0x2054760, "f_2054760");
// 0x20031d8 bl 0x2054b84
stub(0x2054b84, "f_2054b84");
// 0x20031e4 bl 0x2054b94
stub(0x2054b94, "f_2054b94");
// 0x20031ec bl 0x2054bd8
stub(0x2054bd8, "f_2054bd8");
// 0x20031f0 bl 0x2045bec
stub(0x2045bec, "f_2045bec");
// 0x20032ac bl 0x2053558
stub(0x2053558, "f_2053558");
// 0x20032e8 bl 0x20129e0
stub(0x20129e0, "f_20129e0");
// 0x20032ec bl 0x2012a70
stub(0x2012a70, "f_2012a70");
// 0x20032f0 bl 0x2015794
stub(0x2015794, "f_2015794");
// 0x20032fc bl 0x2015634
stub(0x2015634, "f_2015634");
// 0x2003300 bl 0x20155b8
stub(0x20155b8, "f_20155b8");
// 0x2003308 bl 0x2012b34
stub(0x2012b34, "f_2012b34");
// 0x2003310 bl 0x2011c8c
stub(0x2011c8c, "f_2011c8c");
// 0x2003324 bl 0x20122bc
stub(0x20122bc, "f_20122bc");
// 0x2003328 bl 0x2013818
stub(0x2013818, "f_2013818");
// 0x200332c bl 0x201509c
stub(0x201509c, "f_201509c");
// 0x2003334 bl 0x2015030
stub(0x2015030, "f_2015030");
// 0x2003344 bl 0x2013648
stub(0x2013648, "f_2013648");
// 0x2003348 bl 0x201351c
stub(0x201351c, "f_201351c");
// 0x200334c bl 0x2013508
stub(0x2013508, "f_2013508");
// 0x2003354 bl 0x2012ca0
stub(0x2012ca0, "f_2012ca0");
// 0x200335c bl 0x2013400
stub(0x2013400, "f_2013400");
// 0x2003360 bl 0x2014634
stub(0x2014634, "f_2014634");
// 0x2003364 bl 0x202c2ac
stub(0x202c2ac, "f_202c2ac");
// 0x2003368 bl 0x2021d88
stub(0x2021d88, "f_2021d88");
// 0x2003374 bl 0x2058b88（双指针返回值）
stub(0x2058b88, "f_2058b88");
// 0x200339c bl 0x2012a5c
stub(0x2012a5c, "f_2012a5c");
// 0x20033ac bl 0x2012268
stub(0x2012268, "f_2012268");
// 0x20033b8 bl 0x2012128
stub(0x2012128, "f_2012128");
// 0x20033e0 bl 0x2013278
stub(0x2013278, "f_2013278");
// 0x20033ec bl 0x2012254
stub(0x2012254, "f_2012254");
// 0x2003408 bl 0x202bcac
stub(0x202bcac, "f_202bcac");
// 0x200340c bl 0x2014f90
stub(0x2014f90, "f_2014f90");
// 0x2003410 bl 0x201365c
stub(0x201365c, "f_201365c");
// 0x2003414 bl 0x20153b4
stub(0x20153b4, "f_20153b4");
// 0x2003428 bl 0x202be48
stub(0x202be48, "f_202be48");
// 0x2003434 bl 0x2035f50
stub(0x2035f50, "f_2035f50");
// 0x2003440 bl 0x2035d90
stub(0x2035d90, "f_2035d90");
// 0x2003478 bl 0x2028dc8
stub(0x2028dc8, "f_2028dc8");
// 0x20034b0 bl 0x2058918
stub(0x2058918, "f_2058918");
// 0x20034e4 bl 0x2058cec
stub(0x2058cec, "f_2058cec");
// 0x2003520 bl 0x2017c88
stub(0x2017c88, "f_2017c88");
// 0x2003538 bl 0x2012bb8
stub(0x2012bb8, "f_2012bb8");
// 0x20035d4 bl 0x2054f3c
stub(0x2054f3c, "f_2054f3c");

export { TABLE };
