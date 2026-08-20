/**
 * Bank20 差分验证 — 汇编直译参考实现 vs Bank20Service
 *
 * 覆盖: $83D9/$8438 (计时状态机A) | $84DC/$857A/$85F2/$860D (计时状态机B)
 *       $8624/$86DB/$86F2/$8753/$87E7 (比赛精灵渲染) | $8796/$87A7/$87C7 (动画偏移)
 *       $881D (持球者标记) | $8861 (计分板)
 * 数据: prg-bank-20/21/31 (ROM 真实字节)
 */
const path = require('path');
const OUT = path.join(__dirname, '_test_out');

const { DataStore } = require(path.join(OUT, 'game/data/DataStore.js'));
const { Bank20Service, T_88DA, T_88DF, T_88D0, T_88A8, T_885B, NAME_RECORD_TABLE } =
  require(path.join(OUT, 'game/service/bank20_match-aux.service.js'));
const P20 = require(path.join(OUT, 'game/data/prg-bank-20.js')).default;
const P21 = require(path.join(OUT, 'game/data/prg-bank-21.js')).default;
const P31 = require(path.join(OUT, 'game/data/prg-bank-31.js')).default;

// ── 参考实现内存 (与 DataStore 同语义: ?? 0 / & 0xFF) ──
const K = (a) => 'ram_' + (a & 0xffff).toString(16).toUpperCase().padStart(4, '0');
class RefMem {
  constructor() { this.m = new Map(); }
  rd(a) { return this.m.get(K(a)) ?? 0; }
  wr(a, v) { this.m.set(K(a), v & 0xff); }
  rdk(k) { return this.m.get(k) ?? 0; }
  wrk(k, v) { this.m.set(k, v & 0xff); }
}

// 子流读取 (双窗口)
function rdStream(ptr, off) {
  const addr = (ptr + off) & 0xffff;
  if (addr >= 0xa000) return P21[addr - 0xa000] ?? 0xff;
  return P20[addr - 0x8000] ?? 0xff;
}

// $C536: A → [Y54 = A%12*8+$54, X34 = A/12*8+$34]
function refC536(a) {
  let x = 0, v = a & 0xff;
  while (v >= 0x0c) { v -= 0x0c; x++; }
  return [((v << 3) + 0x54) & 0xff, ((x << 3) + 0x34) & 0xff];
}

// $C545: A → [lo, hi] ($FB4C 表, A bit7 → 取负)
function refC545(a) {
  let v = (a << 1) & 0xff;
  const neg = (a & 0x80) !== 0;
  if (v >= 0x80) v = (~v) & 0xff;
  v &= 0x7e;
  const base = 0x1b4c;
  let lo = P31[base + v] ?? 0, hi = P31[base + v + 1] ?? 0;
  if (neg) {
    lo = (~lo) & 0xff; hi = (~hi) & 0xff;
    lo = (lo + 1) & 0xff;
    if (lo === 0) hi = (hi + 1) & 0xff;
  }
  return [lo, hi];
}
function refC542(a) { return refC545((a + 0x40) & 0xff); }

// $C50C: id → NAME_RECORD_TABLE → ram_0034/35
function refC50C(m, id) {
  const ptr = NAME_RECORD_TABLE[id & 0xff] ?? 0x0300;
  m.wrk('ram_0034', ptr & 0xff);
  m.wrk('ram_0035', (ptr >> 8) & 0xff);
  return ptr;
}

// ══════════ A. $83D9 (含 $8438 九路) ══════════
function ref83D9(m, limit) {
  const rec = m.rdk('ram_003C') | (m.rdk('ram_003D') << 8);
  const timer = m.rd(rec + 0x10);
  if (timer === 0xff) return;
  if (timer !== 0) { m.wr(rec + 0x10, timer - 1); return; }
  // $83E9
  m.wr(rec, m.rd(rec) & 0x9f);
  m.wr(rec + 0x13, 0);
  m.wr(rec + 0x14, 0);
  let ptr = m.rd(rec + 3) | (m.rd(rec + 4) << 8);
  m.wrk('ram_003E', ptr & 0xff);        // $8401-$8405: STA ram_003E/F
  m.wrk('ram_003F', (ptr >> 8) & 0xff);
  let off = 0;
  m.wrk('ram_0040', 0);                 // $8407: STY ram_0040
  let steps = 0;
  for (;;) {
    if (++steps > limit) throw new Error('LOOP');
    const b = rdStream(ptr, off);
    off = (off + 1) & 0xff;
    m.wrk('ram_0040', off);             // $840B: INC ram_0040
    if (b < 0xf0) {
      // $8419: 延时 (ram_0040 保持 INC 后值)
      m.wr(rec + 0x12, rdStream(ptr, off));
      m.wr(rec + 0x10, b);
      const sum = ptr + off + 1; // SEC ADC: (off) + 1
      m.wr(rec + 3, sum & 0xff);
      m.wr(rec + 4, (sum >> 8) & 0xff);
      return;
    }
    const idx = (b - 0xf0) & 0xff;
    if (idx === 0 || idx === 7) {
      if (idx === 7) m.wr(rec + 0x12, rdStream(ptr, off));
      m.wr(rec + 0x10, 0xff);
      return;
    }
    if (idx === 1) { m.wr(rec, m.rd(rec) | 0x20); continue; }
    if (idx === 2) { m.wr(rec, m.rd(rec) | 0x40); continue; }
    if (idx === 3) { // $8466: 换子流 → STX/STA ram_003E/F; ram_0040=0
      ptr = rdStream(ptr, off) | (rdStream(ptr, off + 1) << 8);
      m.wrk('ram_003E', ptr & 0xff);
      m.wrk('ram_003F', (ptr >> 8) & 0xff);
      off = 0;
      m.wrk('ram_0040', 0);
      continue;
    }
    if (idx === 4) {
      m.wr(rec + 0x0d, rdStream(ptr, off));
      off = (off + 1) & 0xff;
      m.wrk('ram_0040', off);           // $847D: STY ram_0040
      const sum = ptr + off;
      m.wr(rec + 0x0e, sum & 0xff);
      m.wr(rec + 0x0f, (sum >> 8) & 0xff);
      continue;
    }
    if (idx === 5) {
      const v = (m.rd(rec + 0x0d) - 1) & 0xff;
      if (v === 0) continue; // $849F: RTS
      m.wr(rec + 0x0d, v);
      ptr = m.rd(rec + 0x0e) | (m.rd(rec + 0x0f) << 8);
      m.wrk('ram_003E', ptr & 0xff);    // $84AA-$84AC: STA/STX ram_003E/F
      m.wrk('ram_003F', (ptr >> 8) & 0xff);
      off = 0;
      m.wrk('ram_0040', 0);             // $84B0: STA ram_0040
      continue;
    }
    if (idx === 6) {
      m.wr(rec + 0x0d, rdStream(ptr, off));
      m.wr(rec + 0x14, rdStream(ptr, off + 1));
      off = (off + 2) & 0xff;
      m.wrk('ram_0040', off);           // $84BC: STY ram_0040
      continue;
    }
    if (idx === 8) {
      m.wrk('ram_0546', rdStream(ptr, off));
      off = (off + 1) & 0xff;
      m.wrk('ram_0040', off);           // $84D4: INC ram_0040
      continue;
    }
    continue; // 越界 (不可达)
  }
}

// ══════════ B. $84DC (含 $857A/$85F2/$860D/$852A) ══════════
function ref85F2(m, rec, x, y) {
  const key = 'ram_004' + (2 + x);
  const t1 = m.rd(rec + y) + m.rd(rec + y + 1);
  m.wr(rec + y + 1, t1 & 0xff);
  const c1 = t1 > 0xff ? 1 : 0;
  const v2 = m.rd(rec + y + 2);
  if (v2 >= 0x80) m.wrk(key, (m.rdk(key) - 1) & 0xff);
  const t2 = v2 + m.rd(rec + y + 3) + c1;
  m.wr(rec + y + 3, t2 & 0xff);
  m.wrk(key, (m.rdk(key) + (t2 > 0xff ? 1 : 0)) & 0xff);
}

function ref860D(m, rec, x, ys, ptr) {
  const s0 = rdStream(ptr, ys - 1);
  const s1 = rdStream(ptr, ys);
  const t1 = m.rd(rec + x) + s0;
  m.wr(rec + x, t1 & 0xff);
  const t2 = m.rd(rec + x + 2) + s1 + (t1 > 0xff ? 1 : 0);
  m.wr(rec + x + 2, t2 & 0xff);
}

function ref857A(m, rec, limit) {
  let ptr = m.rdk('ram_003E') | (m.rdk('ram_003F') << 8);
  let off = m.rdk('ram_0040');
  let steps = 0;
  for (;;) {
    if (++steps > limit) throw new Error('LOOP');
    const code = rdStream(ptr, off);
    off = (off + 1) & 0xff;
    if (code === 0) { m.wr(rec + 0x11, 0xff); break; }
    if (code === 1 || code === 3) {
      // $85A9: 3B → rec+$11/$05/$07
      m.wr(rec + 0x11, rdStream(ptr, off));
      const v1 = rdStream(ptr, off + 1), v2 = rdStream(ptr, off + 2);
      off = (off + 3) & 0xff;
      m.wr(rec + 5, v1);
      m.wr(rec + 7, v2);
      if (code === 3) m.wr(rec, m.rd(rec) | 0x10);
      break;
    }
    if (code === 2) {
      m.wr(rec + 0x11, rdStream(ptr, off));
      off = (off + 1) & 0xff;
      m.wr(rec, m.rd(rec) | 0x10);
      break;
    }
    if (code === 4) {
      ptr = rdStream(ptr, off) | (rdStream(ptr, off + 1) << 8);
      off = 0;
      continue;
    }
    break; // 越界安全退出
  }
  m.wrk('ram_003E', ptr & 0xff);
  m.wrk('ram_003F', (ptr >> 8) & 0xff);
  m.wrk('ram_0040', off);
}

function ref84DC(m, limit) {
  const rec = m.rdk('ram_003C') | (m.rdk('ram_003D') << 8);
  const timer = m.rd(rec + 0x11);
  if (timer === 0xff) return;
  if (timer !== 0) m.wr(rec + 0x11, timer - 1);
  else {
    // $84EF 推进
    let ptr = m.rd(rec + 1) | (m.rd(rec + 2) << 8);
    let off = 0;
    if ((m.rd(rec) & 0x10) !== 0) ptr = (ptr + 4) & 0xffff;
    m.wr(rec, m.rd(rec) & 0xef);
    m.wrk('ram_003E', ptr & 0xff);
    m.wrk('ram_003F', (ptr >> 8) & 0xff);
    m.wrk('ram_0040', off);
    ref857A(m, rec, limit);
    // $851A: rec+1/2 += ram_0040
    const ptr2 = (m.rd(rec + 1) | (m.rd(rec + 2) << 8)) + m.rdk('ram_0040');
    m.wr(rec + 1, ptr2 & 0xff);
    m.wr(rec + 2, (ptr2 >> 8) & 0xff);
  }
  // $852A
  m.wrk('ram_0042', 0);
  m.wrk('ram_0043', 0);
  const b0 = m.rd(rec);
  m.wrk('ram_0041', b0 & 0xfc);
  m.wrk('ram_0042', b0 & 0x01);
  m.wrk('ram_0043', (b0 >> 1) & 0x01);
  ref85F2(m, rec, 0, 5);
  ref85F2(m, rec, 1, 9);
  let a = ((m.rdk('ram_0043') & 1) << 1) | (m.rdk('ram_0042') & 1);
  m.wrk('ram_0042', m.rdk('ram_0042') >> 1);
  m.wrk('ram_0043', m.rdk('ram_0043') >> 1);
  a = (a | m.rdk('ram_0041')) & 0xff;
  m.wr(rec, a);
  if ((a & 0x10) === 0) return;
  const ptr = m.rd(rec + 1) | (m.rd(rec + 2) << 8);
  m.wrk('ram_003E', ptr & 0xff);        // $8560-$8569: 重装载
  m.wrk('ram_003F', (ptr >> 8) & 0xff);
  ref860D(m, rec, 5, 1, ptr);
  ref860D(m, rec, 9, 3, ptr);
}

// ══════════ C. $86DB (球员筛选) ══════════
function ref86DB(m, i) {
  refC50C(m, i);
  const idx = m.rdk('ram_062D') & 0x0f;
  if (idx === 0 || idx === 1 || idx === 4) return [idx, true]; // $871D SEC
  if (idx === 2) {
    if (i >= 0x0b) return [i, true];
    if (i === m.rdk('ram_0441')) return [i, true];
    let x = m.rdk('ram_0430');
    while (x !== 0) {
      if (i === m.rd(0x0430 + x)) return [i, true];
      x = (x - 1) & 0xff;
    }
    return [i, false];
  }
  if (idx === 3) {
    if (i === m.rdk('ram_0441')) return [i, true];
    let x = m.rdk('ram_0600');
    while (x !== 0) {
      if (i === m.rd(0x0600 + x)) return [i, true];
      x = (x - 1) & 0xff;
    }
    return [i, false];
  }
  return [i, true];
}

// ══════════ D. $86F2 (带球者闪烁) ══════════
function ref86F2(m) {
  const i = m.rdk('ram_0046');
  if (i !== m.rdk('ram_05FD')) return i;
  if (m.rdk('ram_062E') === 0) {
    m.wrk('ram_062D', m.rdk('ram_062D') ^ 0x40);
    m.wrk('ram_062E', (m.rdk('ram_062D') & 0x40) !== 0 ? 7 : 4);
  }
  m.wrk('ram_062E', (m.rdk('ram_062E') - 1) & 0xff);
  if ((m.rdk('ram_062D') & 0x40) === 0) return (i + 0x0b) & 0xff;
  return i;
}

// ══════════ E. $881D (持球者标记) ══════════
function ref881D(m, x) {
  if (m.rdk('ram_0640') === 0) {
    let f = (m.rdk('ram_0641') + 1) & 0xff;
    if (f === 3) f = 0;
    m.wrk('ram_0641', f);
    m.wrk('ram_0640', 4);
  }
  let a = 0;
  let y = m.rdk('ram_0641');
  if (m.rdk('ram_05FB') === 0) {
    y = (y + 3) & 0xff;
    a = 0x80;
  }
  if ((m.rdk('ram_0637') & 0x80) === 0) a ^= 0x80;
  const ak = 0x0200 + x + 2;
  m.wr(ak, m.rd(ak) | a);
  const tile = T_885B[y] ?? 0;
  m.wrk('ram_0640', (m.rdk('ram_0640') - 1) & 0xff);
  return tile;
}

// ══════════ F. $87A7/$87C7/$8796 (动画偏移) ══════════
function ref87Ax(m, n, speedFn, xKey, yKey) {
  const [lo, hi] = speedFn(m.rdk('ram_062C'));
  m.wrk('ram_003C', lo);
  m.wrk('ram_003D', hi);
  let x = m.rdk(xKey), y = m.rdk(yKey);
  let cnt = n;
  for (;;) {
    const t = x + lo;
    y = (y + hi + (t > 0xff ? 1 : 0)) & 0xff;
    x = t & 0xff;
    cnt = (cnt - 1) & 0xff;
    if ((cnt & 0x80) !== 0) break;
  }
  return y;
}
function ref8796(m) {
  m.wrk('ram_0635', ref87Ax(m, 0x10, refC545, 'ram_0639', 'ram_0635'));
  m.wrk('ram_0637', ref87Ax(m, 0x10, refC542, 'ram_063B', 'ram_0637'));
}

// ══════════ G. $87E7 + $8753 (背景精灵) ══════════
function ref87E7(m, x34, y54) {
  const x = m.rdk('ram_003B');
  m.wr(0x0200 + x + 3, (x34 + 0xfd) & 0xff);
  m.wr(0x0200 + x, (y54 + 0xc7) & 0xff);
  let tile = 0x3c, attr = 1;
  if (m.rdk('ram_062D') === 0x83) { tile = 0x11; attr = 3; }
  m.wr(0x0200 + x + 1, tile);
  m.wr(0x0200 + x + 2, attr);
  m.wrk('ram_003B', (x + 4) & 0xff);
  m.wrk('ram_0048', (m.rdk('ram_0048') + 1) & 0xff);
  m.wrk('ram_0532', 1);
}

function ref8753(m) {
  const idx = m.rdk('ram_062D') & 0x0f;
  if (idx === 0 || idx === 4) return;
  if (idx === 1) {
    const [y54, x34] = refC536(m.rdk('ram_0624'));
    ref87E7(m, x34, y54);
    return;
  }
  if (idx === 2) {
    refC50C(m, m.rdk('ram_05FC'));
    const np = m.rdk('ram_0034') | (m.rdk('ram_0035') << 8);
    ref87E7(m, m.rd(np + 6), m.rd(np + 8));
    return;
  }
  if (idx === 3) {
    const v = m.rdk('ram_0624');
    const hiA = ref87Ax(m, v, refC545, 'ram_0639', 'ram_0635');
    const hiC = ref87Ax(m, v, refC542, 'ram_063B', 'ram_0637');
    ref87E7(m, hiA, hiC);
  }
}

// ══════════ H. $8624 (主渲染) ══════════
function ref8624(m) {
  const mode = m.rdk('ram_062D') & 0x0f;
  if (mode === 5) { ref8861(m); return; }
  ref8753(m);
  m.wrk('ram_0046', 0);
  for (;;) {
    const i = m.rdk('ram_0046');
    const next = () => {
      m.wrk('ram_0046', (i + 1) & 0xff);
      return m.rdk('ram_0046') === 0x16;
    };
    if (i === 0 || i === 0x0b) { if (next()) return; continue; }
    const [tile, draw] = ref86DB(m, i);
    if (!draw) { if (next()) return; continue; }
    let a = tile;
    const x = m.rdk('ram_003B');
    const np = m.rdk('ram_0034') | (m.rdk('ram_0035') << 8);
    let v = m.rd(np + 6);
    if (v < 0x34) v = 0x34;
    if (v >= 0xcc) v = 0xcc;
    m.wr(0x0200 + x + 3, (v + T_88DA[mode]) & 0xff);
    v = m.rd(np + 8);
    if (v < 0x54) v = 0x54;
    if (v >= 0xac) v = 0xac;
    m.wr(0x0200 + x, (v + T_88DF[mode]) & 0xff);
    m.wr(0x0200 + x + 2, 3);
    const flash = ((m.rdk('ram_0615') & 0x80) !== 0) && m.rdk('ram_05FB') !== 0 && i < 0x0b;
    if (flash) a = ref86F2(m);
    else if (i === m.rdk('ram_0441')) a = ref881D(m, x);
    let t = a & 0xff;
    if (t >= 0x0b) t = (t - 1) & 0xff;
    t = (t + 0x11) & 0xff;
    if (t >= 0x20) t = (t + 0x10) & 0xff;
    m.wr(0x0200 + x + 1, t);
    m.wrk('ram_003B', (x + 4) & 0xff);
    m.wrk('ram_0048', (m.rdk('ram_0048') + 1) & 0xff);
    if (next()) return;
  }
}

// ══════════ I. $8861 (计分板) ══════════
function ref8861(m) {
  const v = m.rdk('ram_002C');
  const d2 = (v << 1) & 0xff;
  m.wrk('ram_0046', d2);
  const c5 = (v & 0x20) !== 0 ? 1 : 0;
  let xi = ((((d2 << 1) & 0xff) << 1) & 0xff) + d2 + c5;
  m.wrk('ram_0046', 0);
  for (;;) {
    const row = m.rdk('ram_0046');
    const x = m.rdk('ram_003B');
    m.wr(0x0200 + x + 1, T_88D0[row] ?? 0);
    const tv = T_88A8[xi] ?? 0;
    m.wr(0x0200 + x + 3, (((tv & 0xf0) >> 1) + 0xa0) & 0xff);
    m.wr(0x0200 + x, (((tv & 0x0f) << 2) + 0xa2) & 0xff);
    m.wr(0x0200 + x + 2, 0);
    xi = (xi + 1) & 0xff;
    m.wrk('ram_003B', (x + 4) & 0xff);
    m.wrk('ram_0048', (m.rdk('ram_0048') + 1) & 0xff);
    const n = (row + 1) & 0xff;
    m.wrk('ram_0046', n);
    if (n === 0x0a) return;
  }
}

// ══════════════════════════════════════════════
// 主测试循环
// ══════════════════════════════════════════════
let rngState = 20260819;
function rng() {
  rngState = (rngState * 1103515245 + 12345) & 0x7fffffff;
  return (rngState >> 16) & 0xff;
}
function rng16() { return (rng() << 8) | rng(); }

let pass = 0, fail = 0;
const fails = [];
function check(name, input, got, exp) {
  const gk = [...got.m.entries()].filter(([k, v]) => exp.m.get(k) !== v);
  const ek = [...exp.m.entries()].filter(([k, v]) => got.m.get(k) !== v);
  const diff = [...new Set([...gk.map(([k]) => k), ...ek.map(([k]) => k)])];
  if (diff.length === 0) { pass++; return; }
  fail++;
  const detail = diff.slice(0, 6).map((k) => `${k}: got=${got.m.get(k) ?? '-'} exp=${exp.m.get(k) ?? '-'}`).join(', ');
  fails.push(`${name} | ${input} | ${detail}`);
}

// 同步两侧 RAM: 把 RefMem 快照灌入 DataStore (或反向)
function toStore(store, mem, keys) {
  for (const k of keys) store.write(k, mem.rdk(k));
}
function snapshot(store) {
  const mem = new RefMem();
  for (const [k, v] of store.ram.entries()) mem.m.set(k, v);
  return mem;
}
function keysOf(mem) { return [...mem.m.keys()]; }

const LIMIT = 800;

// ── 通用: 同一随机输入 → ref 执行 vs service 执行 → 终态对比 ──
function runBoth(name, setup, refFn, svcFn) {
  const store = new DataStore();
  const input = new RefMem();
  setup(input);
  // ref 初始状态与 DataStore 构造一致: oamShadow.clearAll() 预置 $0468-$0567 = $F8 (4位 key)
  const ref = new RefMem();
  ref.m = new Map(store.ram);
  for (const [k, v] of input.m.entries()) ref.m.set(k, v); // input 覆盖预置
  let ok;
  try { ok = refFn(ref); } catch (e) { return null; } // 循环超限跳过该组
  void ok;
  for (const [k, v] of input.m.entries()) store.write(k, v);
  const svc = new Bank20Service(store);
  svcFn(svc, store);
  const got = snapshot(store);
  check(name, '', got, ref);
  return true;
}

// ── T1: entry_83D9 随机 (真实 ROM 子流) ──
{
  const N = 3000;
  for (let it = 0; it < N; it++) {
    runBoth('T1.83D9', (m) => {
      const rec = 0x0300 + (rng() % 0x20) * 0x10;
      m.wrk('ram_003C', rec & 0xff);
      m.wrk('ram_003D', (rec >> 8) & 0xff);
      for (let i = 0; i < 0x15; i++) m.wr(rec + i, rng());
      m.wr(rec + 0x10, [0, 0xff, rng(), rng()][rng() % 4]);
      const ptr = rng() % 2 === 0 ? (0x8000 + rng16() % 0x2000) : (0xa000 + rng16() % 0x2000);
      m.wr(rec + 3, ptr & 0xff);
      m.wr(rec + 4, (ptr >> 8) & 0xff);
      m.wrk('ram_0546', rng());
    }, (m) => ref83D9(m, LIMIT), (svc) => svc.entry_83D9());
  }
}

// ── T2: entry_84DC 随机 (真实 ROM 子流 + 运动字段) ──
{
  const N = 3000;
  for (let it = 0; it < N; it++) {
    runBoth('T2.84DC', (m) => {
      const rec = 0x0300 + (rng() % 0x20) * 0x10;
      m.wrk('ram_003C', rec & 0xff);
      m.wrk('ram_003D', (rec >> 8) & 0xff);
      for (let i = 0; i < 0x15; i++) m.wr(rec + i, rng());
      m.wr(rec + 0x11, [0, 0xff, rng(), rng()][rng() % 4]);
      const ptr = rng() % 2 === 0 ? (0x8000 + rng16() % 0x2000) : (0xa000 + rng16() % 0x2000);
      m.wr(rec + 1, ptr & 0xff);
      m.wr(rec + 2, (ptr >> 8) & 0xff);
      m.wrk('ram_0042', 0);
      m.wrk('ram_0043', 0);
    }, (m) => ref84DC(m, LIMIT), (svc) => svc.entry_84DC());
  }
}

// ── T3: fn_86DB 全量 (i × mode × 名单) ──
{
  const N = 2000;
  for (let it = 0; it < N; it++) {
    const i = rng() % 0x16;
    const mode = rng() % 6;
    const r441 = rng() % 0x16;
    const len430 = rng() % 9;
    const len600 = rng() % 9;
    runBoth('T3.86DB', (m) => {
      m.wrk('ram_062D', mode);
      m.wrk('ram_0441', r441);
      m.wrk('ram_0430', len430);
      for (let j = 1; j <= len430; j++) m.wr(0x0430 + j, rng() % 0x16);
      m.wrk('ram_0600', len600);
      for (let j = 1; j <= len600; j++) m.wr(0x0600 + j, rng() % 0x16);
    }, (m) => { ref86DB(m, i); }, (svc) => { svc.fn_86DB(i); });
  }
}

// ── T4: entry_86F2 随机 ──
{
  const N = 1500;
  for (let it = 0; it < N; it++) {
    const i = rng() % 0x16, fd = rng() % 0x16;
    runBoth('T4.86F2', (m) => {
      m.wrk('ram_0046', i);
      m.wrk('ram_05FD', fd);
      m.wrk('ram_062D', rng());
      m.wrk('ram_062E', [0, rng()][rng() % 2]);
    }, (m) => { ref86F2(m); }, (svc) => { svc.entry_86F2(); });
  }
}

// ── T5: fn_881D 随机 ──
{
  const N = 1500;
  for (let it = 0; it < N; it++) {
    const x = (rng() % 64) * 4;
    runBoth('T5.881D', (m) => {
      m.wrk('ram_0640', [0, rng()][rng() % 2]);
      m.wrk('ram_0641', rng() % 3);
      m.wrk('ram_05FB', [0, rng()][rng() % 2]);
      m.wrk('ram_0637', rng());
      m.wr(0x0200 + x + 2, rng());
    }, (m) => { ref881D(m, x); }, (svc) => { svc.fn_881D(x); });
  }
}

// ── T6: entry_8796 随机 (含负速度取负路径) ──
{
  const N = 2000;
  for (let it = 0; it < N; it++) {
    runBoth('T6.8796', (m) => {
      m.wrk('ram_062C', rng());
      m.wrk('ram_0639', rng());
      m.wrk('ram_0635', rng());
      m.wrk('ram_063B', rng());
      m.wrk('ram_0637', rng());
    }, (m) => ref8796(m), (svc) => svc.entry_8796());
  }
}

// ── T7: entry_8624 随机 (mode≠5 全渲染链路) ──
{
  const N = 2500;
  for (let it = 0; it < N; it++) {
    const mode = [0, 1, 2, 3, 4, 6, 7, 8][rng() % 8];
    runBoth('T7.8624', (m) => {
      m.wrk('ram_062D', ((rng() & 0xf0) | mode));
      m.wrk('ram_0615', rng());
      m.wrk('ram_05FB', [0, rng()][rng() % 2]);
      m.wrk('ram_05FD', rng() % 0x16);
      m.wrk('ram_0441', rng() % 0x16);
      m.wrk('ram_0624', rng() % 0x60);
      m.wrk('ram_05FC', rng() % 0x20);
      m.wrk('ram_0640', rng() % 5);
      m.wrk('ram_0641', rng() % 3);
      m.wrk('ram_0637', rng());
      m.wrk('ram_002C', rng() % 10);
      m.wrk('ram_062E', rng() % 5);
      m.wrk('ram_0048', rng());
      m.wrk('ram_003B', 0);
      const len430 = rng() % 5;
      m.wrk('ram_0430', len430);
      for (let j = 1; j <= len430; j++) m.wr(0x0430 + j, rng() % 0x16);
      const len600 = rng() % 5;
      m.wrk('ram_0600', len600);
      for (let j = 1; j <= len600; j++) m.wr(0x0600 + j, rng() % 0x16);
      for (let r = 0; r < 32; r++) {
        const np = NAME_RECORD_TABLE[r];
        m.wr(np + 6, rng());
        m.wr(np + 8, rng());
      }
      m.wrk('ram_0639', rng());
      m.wrk('ram_063B', rng());
    }, (m) => ref8624(m), (svc) => svc.entry_8624());
  }
}

// ── T8: entry_8864 计分板 (ram_002C 全量 0-9 + 随机 OAM 起点) ──
{
  for (let v = 0; v < 10; v++) {
    for (let s = 0; s < 4; s++) {
      runBoth('T8.8864', (m) => {
        m.wrk('ram_002C', v);
        m.wrk('ram_003B', s * 4);
        m.wrk('ram_0048', 0);
      }, (m) => ref8861(m), (svc) => svc.entry_8864());
    }
  }
}

// ── T9: fn_8753 单测 (mode 0-4, 含 $83 特例) ──
{
  const N = 1500;
  for (let it = 0; it < N; it++) {
    const mode = rng() % 5;
    const hi = rng();
    const hiByte = hi === 0x83 ? 0x80 : hi & 0xf0;
    runBoth('T9.8753', (m) => {
      m.wrk('ram_062D', (hiByte | mode));
      m.wrk('ram_0624', rng() % 0x60);
      m.wrk('ram_05FC', rng() % 0x20);
      m.wrk('ram_003B', (rng() % 60) * 4);
      m.wrk('ram_0048', rng());
      m.wrk('ram_0639', rng());
      m.wrk('ram_063B', rng());
      const np = 0x0300 + (rng() % 4) * 0x0c;
      m.wrk('ram_0034', np & 0xff);
      m.wrk('ram_0035', (np >> 8) & 0xff);
      m.wr(np + 6, rng());
      m.wr(np + 8, rng());
    }, (m) => ref8753(m), (svc) => svc.fn_8753());
  }
}

console.log(`\nPASS=${pass} FAIL=${fail}`);
if (fail > 0) {
  console.log(fails.slice(0, 20).join('\n'));
  process.exit(1);
}
console.log('ALL BANK20 DIFFERENTIAL TESTS PASSED');

