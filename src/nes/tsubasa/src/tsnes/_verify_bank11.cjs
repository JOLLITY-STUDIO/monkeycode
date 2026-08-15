// bank11 翻译验证: 独立参考实现 vs 实际 service (随机输入对比 + 确定性用例)
const { DataStore } = require('./tsubasa2-h5-src/_test_out/tsubasa2-h5-src/src/game/data/DataStore');
const { Bank11Service } = require('./tsubasa2-h5-src/_test_out/tsubasa2-h5-src/src/game/service/bank11_match-turn.service');
const {
  readB11,
  readB11U16,
  readB11Attr,
  readB11PatternAttr,
} = require('./tsubasa2-h5-src/_test_out/tsubasa2-h5-src/src/game/data/bank11-data');
const PRG_BANK_12 = require('./tsubasa2-h5-src/_test_out/rom-data/prg-bank-12').default;
const PRG_BANK_13 = require('./tsubasa2-h5-src/_test_out/rom-data/prg-bank-13').default;

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; }
  else { fail++; console.log('FAIL: ' + name + (detail ? ' | ' + detail : '')); }
}
let rng = 0x12345678;
function rnd() { rng = (rng * 1103515245 + 12345) & 0x7fffffff; return rng; }

// ── 独立参考: fn_86D3 (调色板组提取) ──
function ref86D3(a) {
  const x = a & 3;
  let v = readB11Attr((a >> 2) & 0xff);
  for (let i = 0; i < x; i++) v = (v >> 2) & 0xff;
  return v & 3;
}
for (let t = 0; t < 1000; t++) {
  const a = rnd() & 0xff;
  const store = new DataStore();
  const svc = new Bank11Service(store);
  svc['fn_86D3'](a);
  const got = store.read('ram_05CA');
  const exp = ref86D3(a);
  check('86D3#' + t, got === exp, `a=${a.toString(16)} got=${got} exp=${exp}`);
  if (got !== exp) break;
}

// ── 独立参考: fn_82FE (位移计算) ──
function ref82FE(m637, m635, y) {
  let v = (m637 - 0x50) & 0xff;
  v &= 0xf0;
  let x = ((v >> 1) + (v >> 3)) & 0xff;
  let w = (m635 - 0x30) & 0xff;
  w &= 0xf0;
  x = (x + (w >> 4)) & 0xff;
  if (y !== 0) x = (x + 0x3c) & 0xff;
  return x;
}
for (let t = 0; t < 1000; t++) {
  const m637 = rnd() & 0xff, m635 = rnd() & 0xff, fb = rnd() & 1;
  const store = new DataStore();
  store.write('ram_0637', m637);
  store.write('ram_0635', m635);
  store.write('ram_05FB', fb);
  const svc = new Bank11Service(store);
  const got = svc['fn_82FE'](fb);
  const exp = ref82FE(m637, m635, fb);
  check('82FE#' + t, got === exp, `637=${m637.toString(16)} 635=${m635.toString(16)} fb=${fb} got=${got} exp=${exp}`);
  if (got !== exp) break;
}

// ── 独立参考: fn_810C (负坐标取反) ──
function ref810C(x0, y0) {
  let x = x0, y = y0;
  if (y & 0x80) {
    x = (~x) & 0xff;
    y = (~y) & 0xff;
    x = (x + 1) & 0xff;
    if (x === 0) y = (y + 1) & 0xff;
  }
  const a = (x + 0xe0) & 0xff;
  const carry = (x + 0xe0) > 0xff ? 1 : 0;
  const b = (y + 1 + carry) & 0xff;
  return { a, b };
}
for (let t = 0; t < 1000; t++) {
  const d4 = rnd() & 0xff, d5 = rnd() & 0xff, d7 = rnd() & 0xff;
  const store = new DataStore();
  store.write('ram_05D4', d4);
  store.write('ram_05D5', d5);
  store.write('ram_05D7', d7);
  const svc = new Bank11Service(store);
  svc['fn_810C']();
  const gotA = store.read('ram_003A'), gotB = store.read('ram_003B');
  const exp = ref810C(d4, d5);
  check('810C#' + t, gotA === exp.a && gotB === exp.b,
    `d4=${d4.toString(16)} d5=${d5.toString(16)} d7=${d7.toString(16)} got=${gotA.toString(16)},${gotB.toString(16)} exp=${exp.a.toString(16)},${exp.b.toString(16)}`);
  if (gotA !== exp.a || gotB !== exp.b) break;
}

// ── 独立参考: entry_84A1 (调色板组选择) ──
function ref84A1(a, v20, cb) {
  let x = 2;
  if (a < 0x80) { x -= 1; if (a < 0x40) x -= 1; }
  let y = 0x74;
  const a2 = a & 0x3f;
  if (a2 < 0x20) { y = 0xe4; x ^= 0x02; }
  return { n20: ((v20 & 0xfc) | (x & 0x03)) & 0xff, y, n6B: cb & 0xff };
}
for (let t = 0; t < 1000; t++) {
  const a = rnd() & 0xff, v20 = rnd() & 0xff, cb = rnd() & 0xff;
  const store = new DataStore();
  store.write('ram_0020', v20);
  store.write('ram_05CB', cb);
  const svc = new Bank11Service(store);
  svc.entry_84A1(a);
  const exp = ref84A1(a, v20, cb);
  check('84A1#' + t,
    store.read('ram_0020') === exp.n20 && store.read('ram_004B') === exp.y && store.read('ram_046B') === exp.n6B,
    `a=${a.toString(16)} got=${store.read('ram_0020').toString(16)},${store.read('ram_004B').toString(16)},${store.read('ram_046B').toString(16)} exp=${exp.n20.toString(16)},${exp.y.toString(16)},${exp.n6B.toString(16)}`);
  if (store.read('ram_0020') !== exp.n20 || store.read('ram_004B') !== exp.y || store.read('ram_046B') !== exp.n6B) break;
}

// ── 独立参考: fn_845C (隐藏字节属性选择) ──
function ref845C(b4, df) {
  let a = b4, x;
  if (df & 0x80) {
    x = 0x1c;
    const c = a & 1; a = (a >> 1) & 0xff;
    if (c) x = 0x8c;
  } else {
    a = (a - 1) & 0xff;
    x = 0x74;
    const c = a & 1; a = (a >> 1) & 0xff;
    if (c) x = 0xe4;
  }
  return { e1: x, e2: a };
}
for (let t = 0; t < 1000; t++) {
  const ptr = 0x8000 + (rnd() & 0x1fff);
  const df = rnd() & 0xff;
  const store = new DataStore();
  store.write('ram_0052', ptr & 0xff);
  store.write('ram_0053', (ptr >> 8) & 0xff);
  store.write('ram_05DF', df);
  const svc = new Bank11Service(store);
  svc['fn_845C']();
  const exp = ref845C(readB11(ptr + 4), df);
  check('845C#' + t,
    store.read('ram_05E1') === exp.e1 && store.read('ram_05E2') === exp.e2,
    `ptr=${ptr.toString(16)} df=${df.toString(16)} b4=${readB11(ptr + 4).toString(16)} got=${store.read('ram_05E1').toString(16)},${store.read('ram_05E2').toString(16)} exp=${exp.e1.toString(16)},${exp.e2.toString(16)}`);
  if (store.read('ram_05E1') !== exp.e1 || store.read('ram_05E2') !== exp.e2) break;
}

// ── 独立参考: entry_8471 (属性选择) ──
function ref8471(a) {
  let x = 0x1c;
  const c = a & 1;
  const a2 = (a >> 1) & 0xff;
  if (c) x = 0x8c;
  return { e1: x, e2: a2 };
}
for (let t = 0; t < 1000; t++) {
  const a = rnd() & 0xff;
  const store = new DataStore();
  const svc = new Bank11Service(store);
  svc.entry_8471(a);
  const exp = ref8471(a);
  check('8471#' + t,
    store.read('ram_05E1') === exp.e1 && store.read('ram_05E2') === exp.e2,
    `a=${a.toString(16)} got=${store.read('ram_05E1').toString(16)},${store.read('ram_05E2').toString(16)} exp=${exp.e1.toString(16)},${exp.e2.toString(16)}`);
  if (store.read('ram_05E1') !== exp.e1 || store.read('ram_05E2') !== exp.e2) break;
}

// ── 独立参考: fn_84F4 (脚本位移读取) ──
function ref84F4(x0, y0, lo, hi) {
  if (y0 !== 0x80) return { x: x0, y: y0 };
  const n = x0 === 1 ? 3 : 4;
  for (let k = 0; k < n; k++) {
    const c = (lo & 0x80) ? 1 : 0;
    lo = (lo << 1) & 0xff;
    hi = ((hi << 1) | c) & 0xff;
  }
  const v = ((hi << 8) | lo) + 0xc0;
  return { x: v & 0xff, y: (v >> 8) & 0xff };
}
for (let t = 0; t < 1000; t++) {
  const ptr = 0x8000 + (rnd() & 0x1fff);
  const c1c = rnd() & 0xff, c1d = rnd() & 0xff;
  const store = new DataStore();
  store.write('ram_0052', ptr & 0xff);
  store.write('ram_0053', (ptr >> 8) & 0xff);
  store.write('ram_061C', c1c);
  store.write('ram_061D', c1d);
  const svc = new Bank11Service(store);
  const got = svc['fn_84F4']();
  const exp = ref84F4(readB11(ptr + 2), readB11(ptr + 3), c1c, c1d);
  check('84F4#' + t, got.x === exp.x && got.y === exp.y,
    `ptr=${ptr.toString(16)} b2=${readB11(ptr + 2).toString(16)} b3=${readB11(ptr + 3).toString(16)} 1C=${c1c.toString(16)} 1D=${c1d.toString(16)} got=${got.x.toString(16)},${got.y.toString(16)} exp=${exp.x.toString(16)},${exp.y.toString(16)}`);
  if (got.x !== exp.x || got.y !== exp.y) break;
}

// ── 独立参考: fn_812B (block 指针) ──
function ref812B(byte, y) {
  let a = byte;
  let lo = 0;
  for (let k = 0; k < 3; k++) {
    const carry = a & 1;
    a >>= 1;
    lo = ((lo >> 1) | (carry << 7)) & 0xff;
  }
  const base = (a + 0x8b) & 0xff;
  const loV = (lo + 0x64) & 0xff;
  const carry2 = lo + 0x64 > 0xff ? 1 : 0;
  return { lo: loV, hi: (base + carry2) & 0xff, retA: a };
}
for (let t = 0; t < 1000; t++) {
  const ptr = 0x8000 + (rnd() & 0x1fff);
  const y = rnd() & 0xff;
  const store = new DataStore();
  store.write('ram_005B', ptr & 0xff);
  store.write('ram_005C', (ptr >> 8) & 0xff);
  const svc = new Bank11Service(store);
  const ret = svc['fn_812B'](y);
  const exp = ref812B(readB11(ptr + y), y);
  check('812B#' + t,
    store.read('ram_0058') === exp.lo && store.read('ram_0059') === exp.hi,
    `ptr=${ptr.toString(16)} y=${y.toString(16)} byte=${readB11(ptr + y).toString(16)} got=${store.read('ram_0058').toString(16)},${store.read('ram_0059').toString(16)} exp=${exp.lo.toString(16)},${exp.hi.toString(16)}`);
  if (store.read('ram_0058') !== exp.lo || store.read('ram_0059') !== exp.hi) break;
}

// ── 独立参考: fn_85C2 (单精灵组 OAM 写入) ──
function ref85C2(a, y, x, ca) {
  const mem = {};
  const w = (o, v) => { mem[o & 0xff] = v & 0xff; };
  const r = (o) => mem[o & 0xff] ?? 0;
  w(x + 1, (y & 0x07) << 2);
  w(x + 2, 0);
  let t = (y & 0x38) << 3 & 0xff;
  let tileHi = 0;
  for (let k = 0; k < 2; k++) {
    const c = (t & 0x80) ? 1 : 0;
    t = (t << 1) & 0xff;
    tileHi = ((tileHi << 1) | c) & 0xff;
  }
  const attrFull = (t | ((y & 0x07) << 2)) & 0xff;
  w(x + 1, attrFull);
  const nt = (((y & 0xc0) >> 4) | 0x20 | tileHi) & 0xff;
  w(x + 2, nt);
  w(x + 9, nt); w(x + 16, nt); w(x + 23, nt);
  w(x + 8, (attrFull + 0x20) & 0xff);
  w(x + 15, (attrFull + 0x40) & 0xff);
  w(x + 22, (attrFull + 0x60) & 0xff);
  w(x + 29, ((y & 0x3f) | 0xc0) & 0xff);
  w(x + 30, (((y & 0xc0) >> 4) | 0x23) & 0xff);
  w(x, 4); w(x + 7, 4); w(x + 14, 4); w(x + 21, 4);
  w(x + 28, 1);
  w(x + 31, readB11PatternAttr(ca, y));
  let hi = ca & 0xff, mid = y & 0xff, lo = 0;
  for (let k = 0; k < 4; k++) {
    let cHi = 0;
    if (k < 2) { cHi = hi & 1; hi >>= 1; }
    const cMid = mid & 1;
    mid = (mid >> 1) | (cHi << 7);
    lo = ((lo >> 1) | (cMid << 7)) & 0xff;
  }
  const ptrHi = ((mid & 0x1f) | 0xa0) & 0xff;
  const bank = (mid & 0x20) ? 0x13 : 0x12;
  const src = bank === 0x12 ? PRG_BANK_12 : PRG_BANK_13;
  const patternBase = ((ptrHi & 0x1f) << 8 | lo) & 0x1fff;
  let xi = x + 3;
  for (let o = 0; o < 4; o++) {
    for (let i = 0; i < 4; i++) {
      w(xi, src[(patternBase + o * 4 + i) & 0x1fff] ?? 0xff);
      xi = (xi + 1) & 0xff;
    }
    xi = (xi + 3) & 0xff;
  }
  w(x + 32, 0);
  const yRec = y & 0x3f;
  if (yRec < 0x38) return { mem, nx: (x + 0x20) & 0xff };
  let yy = x;
  const xx = (x + 0x12) & 0xff;
  for (let k = 0; k < 5; k++) {
    w(yy + 14, r(yy + 28));
    yy = (yy + 1) & 0xff;
  }
  return { mem, nx: xx };
}
for (let t = 0; t < 800; t++) {
  const a = rnd() & 0xff, y = rnd() & 0xff, x = rnd() & 0x3f;
  const ca = rnd() & 3;
  const store = new DataStore();
  store.write('ram_05CA', ca);
  const svc = new Bank11Service(store);
  const nx = svc['fn_85C2'](a, y, x);
  const exp = ref85C2(a, y, x, ca);
  let ok = nx === exp.nx;
  const maxOff = Math.max(x + 33, (exp.nx & 0xff) + 19);
  if (ok) {
    for (let i = 0; i < maxOff; i++) {
      const g = store.oam.readByte(i);
      const e = exp.mem[i] ?? 0;
      if (g !== e) { ok = false; break; }
    }
  }
  check('85C2#' + t, ok,
    `a=${a.toString(16)} y=${y.toString(16)} x=${x.toString(16)} ca=${ca} gotNx=${nx} expNx=${exp.nx} got[0..5]=[${store.oam.readByte(0)},${store.oam.readByte(1)},${store.oam.readByte(2)},${store.oam.readByte(3)},${store.oam.readByte(4)},${store.oam.readByte(5)}]`);
  if (!ok) break;
}

// ── 固定辅助纯函数 (C536/C539) ──
function refC536(a) {
  let q = 0, r = a & 0xff;
  while (r >= 0x0c) { r -= 0x0c; q++; }
  return { x: ((q << 3) + 0x34) & 0xff, y: ((r << 3) + 0x54) & 0xff };
}
function refC539(x, y) {
  if (x < 0x30) return 0xff;
  const ax = (x - 0x30) & 0xff;
  if (ax >= 0xa0) return 0xff;
  let col = ax >> 3;
  if (y < 0x50) return 0xff;
  const ay = (y - 0x50) & 0xff;
  if (ay >= 0x60) return 0xff;
  let r = ay >> 3;
  while (col > 0) {
    r = (r + 12) & 0xff;
    if (r === 0) return 0xff;
    col--;
  }
  return r;
}
for (let a = 0; a < 256; a++) {
  const svc = new Bank11Service(new DataStore());
  const got = svc['_fixedC536'](a);
  const exp = refC536(a);
  check('C536#' + a, got.x === exp.x && got.y === exp.y, `a=${a.toString(16)} got=${got.x},${got.y} exp=${exp.x},${exp.y}`);
  if (got.x !== exp.x || got.y !== exp.y) break;
}
for (let t = 0; t < 1000; t++) {
  const x = rnd() & 0xff, y = rnd() & 0xff;
  const svc = new Bank11Service(new DataStore());
  const got = svc['_fixedC539'](x, y);
  const exp = refC539(x, y);
  check('C539#' + t, got === exp, `x=${x.toString(16)} y=${y.toString(16)} got=${got} exp=${exp}`);
  if (got !== exp) break;
}

// ── 确定性用例 ──
{
  // entry_832B: A=0x04, ram_05CD=0x60
  const store = new DataStore();
  store.write('ram_05CD', 0x60);
  const svc = new Bank11Service(store);
  svc.entry_832B(0x04);
  check('832B cb', store.read('ram_05CB') === 1, `got=${store.read('ram_05CB')}`);
  check('832B cc', store.read('ram_05CC') === 4, `got=${store.read('ram_05CC')}`);
  check('832B ce', store.read('ram_05CE') === 0xa0, `got=${store.read('ram_05CE').toString(16)}`);
  check('832B cd', store.read('ram_05CD') === 0x80, `got=${store.read('ram_05CD').toString(16)}`);
  check('832B db/dc/dd', store.read('ram_05DB') === 0 && store.read('ram_05DC') === 0 && store.read('ram_05DD') === 0,
    `got=${store.read('ram_05DB')},${store.read('ram_05DC')},${store.read('ram_05DD')}`);
}
{
  // entry_8471 确定性: a=0x41 → carry=1 → e1=$8C, e2=$20
  const store = new DataStore();
  const svc = new Bank11Service(store);
  svc.entry_8471(0x41);
  check('8471 det e1', store.read('ram_05E1') === 0x8c, `got=${store.read('ram_05E1').toString(16)}`);
  check('8471 det e2', store.read('ram_05E2') === 0x20, `got=${store.read('ram_05E2').toString(16)}`);
}
{
  // fn_86D3 确定性: a=0x2A (X=2) → $8B42[0x0A] 两次 >>2
  const store = new DataStore();
  const svc = new Bank11Service(store);
  svc['fn_86D3'](0x2a);
  const exp = ref86D3(0x2a);
  check('86D3 det', store.read('ram_05CA') === exp, `got=${store.read('ram_05CA')} exp=${exp}`);
}

console.log(`\n=== PASS=${pass} FAIL=${fail} ===`);
process.exit(fail ? 1 : 0);
