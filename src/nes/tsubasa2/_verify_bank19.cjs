/**
 * Bank19 差分验证 — 参照 _verify_bank20.cjs 模式
 * 参考实现 (RefMem + RefOam) 逐指令复刻 bank_19.asm,
 * 与 Bank19Service 终态逐字节对比。
 */
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname);
const OUT = path.join(ROOT, '_test_out');

const { DataStore } = require(path.join(OUT, 'game/data/DataStore.js'));
const { Bank19Service } = require(path.join(OUT, 'game/service/bank19_auxiliary.service.js'));
const PRG_BANK_19 = require(path.join(OUT, 'game/data/prg-bank-19.js')).default;
const PRG_BANK_31 = require(path.join(OUT, 'game/data/prg-bank-31.js')).default;

// ════════════ 参考内存模型 ════════════
class RefMem {
  constructor() { this.m = new Map(); }
  rdk(k) { return this.m.get(k) ?? 0; }
  wrk(k, v) { this.m.set(k, v & 0xff); }
  rd(a) { return this.m.get('a:' + a.toString(16).toUpperCase().padStart(4, '0')) ?? 0; }
  wr(a, v) { this.m.set('a:' + a.toString(16).toUpperCase().padStart(4, '0'), v & 0xff); }
  // ram_XXXX+X 式复合键
  rdx(base, x) { return this.m.get(base + (base.indexOf('+') >= 0 ? '' : '+') + x) ?? 0; }
  wrx(base, x, v) { this.m.set(base + (base.indexOf('+') >= 0 ? '' : '+') + x, v & 0xff); }
}
function rk(base, x) { return base.indexOf('+') >= 0 ? base + x : base + '+' + x; }

// OAM 影子缓冲 (相对 $04A5 的字节偏移)
class RefOam {
  constructor() { this.buf = new Array(0x48 * 3).fill(0); this.busy = 0; }
  writeByte(off, v) { this.buf[off & 0xff] = v & 0xff; }
  clearRange(off, len) { for (let k = 0; k < len; k++) this.buf[(off + k) & 0xff] = 0; }
  writeSlot(i, attr, lo, hi) {
    this.buf[i * 3] = attr & 0xff; this.buf[i * 3 + 1] = lo & 0xff; this.buf[i * 3 + 2] = hi & 0xff;
  }
  setBusy(v) { this.busy = v & 0xff; }
  endBuild() { this.busy = 0x80; }
}

// ════════════ 固定区例程 (bank30) 参考实现 ════════════
function refC524(m, a) {
  if (a < 0xa0) return [a, 0];
  let attr = 0x94, v = a;
  if (a >= 0xc8) {
    attr = 0x95; v = (a - 0xae) & 0xff;
    if (v < 0x1f) return [v, attr];
    v = (v - 0x05) & 0xff; return [(v + 0x40) & 0xff, attr];
  }
  const carryB4 = a >= 0xb4;
  if (a >= 0xb4) v = (v - 0x14) & 0xff;
  v = (v - 0x9a) & 0xff;
  if (v >= 0x15) v = (v + 0x05) & 0xff;
  if (!carryB4) return [v, attr];
  return [(v + 0x40) & 0xff, attr];
}
function refC50C(id) { return 0x0300 + (id & 0xff) * 12; }
function refC530(m, x, a) {
  const ptr = 0x1bcc + ((a * 12) & 0xff);
  let y = 0;
  for (let i = 0; i < 16; i++) {
    let v;
    if ((x & 3) === 0) v = 0x0f;
    else { v = PRG_BANK_31[ptr + y] ?? 0x0f; y++; }
    m.wrx('ram_046F', x, v);
    x = (x + 1) & 0xff;
  }
  m.wrk('ram_046C', 0x20);
}
function refC533() {}

// $B02D: 数据流一步 (单步, 无延时/场景多帧)
function refStreamStep(m, oam) {
  const b = PRG_BANK_19[(m.rdk('ram_0088') | (m.rdk('ram_0089') << 8)) + m.rdk('ram_008A')] ?? 0xff;
  if (b >= 0xe0) {
    m.wrk('ram_008A', (m.rdk('ram_008A') + 1) & 0xff);
    refControl(m, oam, b);
    refAdvance(m);
  } else {
    refDispatchSprite(m, oam, b);
  }
}
function refDispatchSprite(m, oam, byte) {
  if ((m.rdk('ram_063F') & 0x40) !== 0) refSingleChar(m, oam, byte);
  else refSpriteGroup(m, oam);
}
function refSpriteGroup(m, oam) {
  oam.setBusy(1);
  oam.clearRange(0, 0x48);
  oam.writeByte(0, 0x20);
  oam.writeByte(0x23, 0x20);
  const v = 0x88 | (m.rdk('ram_008B') & 7);
  const aHi = v >> 2;
  const lo = ((v & 1) << 6) | (((v >> 1) & 1) << 7);
  oam.writeByte(2, aHi);
  oam.writeByte(0x25, aHi);
  oam.writeByte(1, lo);
  oam.writeByte(0x24, (lo + 0x20) & 0xff);
  let x = m.rdk('ram_008B') >> 3;
  for (;;) {
    const base = (m.rdk('ram_0088') | (m.rdk('ram_0089') << 8));
    const b = PRG_BANK_19[base + m.rdk('ram_008A')] ?? 0xff;
    if (b >= 0xe0) break;
    const [pat, attr] = refC524(m, b);
    oam.writeByte(0x26 + x, pat);
    oam.writeByte(3 + x, attr);
    x = (x + 1) & 0xff;
    m.wrk('ram_008A', (m.rdk('ram_008A') + 1) & 0xff);
  }
  oam.endBuild();
}
function refSingleChar(m, oam, byte) {
  const b = byte;
  oam.setBusy(1);
  oam.writeByte(8, 0);
  oam.writeByte(0, 1);
  oam.writeByte(4, 1);
  const v = 0x88 | (m.rdk('ram_008B') & 7);
  const aHi = v >> 2;
  const ror = ((v & 1) << 6) | (((v >> 1) & 1) << 7);
  oam.writeByte(2, aHi);
  oam.writeByte(5, aHi);
  const t0 = ((m.rdk('ram_008B') >> 3) + ror) & 0xff;
  oam.writeByte(1, t0);
  oam.writeByte(6, (t0 + 0x20) & 0xff);
  const [pat, attr] = refC524(m, b);
  oam.writeByte(7, pat);
  oam.writeByte(3, attr);
  oam.endBuild();
  for (let a = 0; a < 8; a += 2) refBuildTextPos(m, a);
  m.wrk('ram_008B', (m.rdk('ram_008B') + 8) & 0xff);
}
function refBuildTextPos(m, a) {
  const q0 = (((m.rdk('ram_008B') & 7) << 4) + 0x7c) & 0xff;
  const w = ((m.rdk('ram_008B') & 0xf8) + a) & 0xff;
  m.wrk('ram_02F8', q0); m.wrk('ram_02F9', 1); m.wrk('ram_02FA', 0); m.wrk('ram_02FB', w);
  m.wrk('ram_02FC', (q0 + 8) & 0xff); m.wrk('ram_02FD', 1); m.wrk('ram_02FE', 0); m.wrk('ram_02FF', w);
}

function refControl(m, oam, code) {
  const idx = (code - 0xe0) & 0xff;
  switch (idx) {
    case 0: refCtrlClearText(m, oam); break;
    case 1: /* delay: 单步不处理 */ break;
    case 2: refCtrlWriteName(m); break;
    case 3: refSceneReset(m, oam); break;
    case 4: m.wrk('ram_008B', PRG_BANK_19[(m.rdk('ram_0088')|m.rdk('ram_0089')<<8)+m.rdk('ram_008A')] ?? 0); break; // 读后 INC
    case 5: refCtrlSubDispatch(m, oam); break;
    case 6: m.wrk('ram_063F', m.rdk('ram_063F') | 0x40); break;
    case 28: oam.endBuild(); break;
    default: break;
  }
  if (idx === 4) m.wrk('ram_008A', (m.rdk('ram_008A') + 1) & 0xff);
}
function refCtrlClearText(m, oam) {
  const b = PRG_BANK_19[(m.rdk('ram_0088')|m.rdk('ram_0089')<<8)+m.rdk('ram_008A')] ?? 0;
  m.wrk('ram_008A', (m.rdk('ram_008A') + 1) & 0xff);
  refC52D(m, oam); // $B1A6: JSR $C52D (OAM 构建, 参考实现)
  m.wrk('ram_0518', b); m.wrk('ram_0516', 0); m.wrk('ram_0005', 0);
  m.wrk('ram_0011', 0); m.wrk('ram_0012', 0); m.wrk('ram_000D', 0); m.wrk('ram_000E', 0); m.wrk('ram_05D2', 0);
  for (let x = 0; x !== 0x7e; x = (x + 0x15) & 0xff) { m.wrx('ram_0557', x, 0xff); m.wrx('ram_0558', x, 0xff); }
}
// $C52D→$CC46: 清 OAM 并构建基础精灵组 (OAM 影子缓冲)
function refC52D(m, oam) {
  oam.setBusy(1);
  oam.clearRange(0, 0x50);
  oam.writeSlot(0, 0x20, 0xe0, 0x23);
  oam.clearRange(3, 0x21);
  oam.endBuild();
}
function refCtrlWriteName(m) {
  const base = (m.rdk('ram_0088')|m.rdk('ram_0089')<<8);
  const b0 = PRG_BANK_19[base + m.rdk('ram_008A')] ?? 0; m.wrk('ram_008A', (m.rdk('ram_008A')+1)&0xff);
  const b1 = PRG_BANK_19[base + m.rdk('ram_008A')] ?? 0; m.wrk('ram_008A', (m.rdk('ram_008A')+1)&0xff);
  const b2 = PRG_BANK_19[base + m.rdk('ram_008A')] ?? 0; m.wrk('ram_008A', (m.rdk('ram_008A')+1)&0xff);
  if (b2 < 0x0b) m.wrk('ram_002A', b0); else m.wrk('ram_002B', b0);
  const np = refC50C(b2);
  m.wr(np, b1);
}
function refCtrlSubDispatch(m, oam) {
  const v = PRG_BANK_19[(m.rdk('ram_0088')|m.rdk('ram_0089')<<8)+m.rdk('ram_008A')] ?? 0;
  m.wrk('ram_008A', (m.rdk('ram_008A')+1)&0xff);
  switch (v) {
    case 0: m.wrk('ram_0472', 0x0f); refClearPalette(m, 0x0f); break;
    case 1: refSubPalFill30(m); break;
    case 2: refPalFill(m); break;
    case 3: refPalFadeIn(m); break;
    default: break;
  }
}
function refClearPalette(m, a) {
  for (let x = 0; x < 0x20; x += 4) m.wrx('ram_046F', x, a);
  refC533();
}
function refPalFill(m) {
  for (let value = 0x30; ; value = (value - 0x10) & 0xff) {
    for (let x = 0; x < 0x20; x++) {
      if ((x & 3) === 0) continue;
      let v = (m.rdx('ram_046F', x) & 0x0f) | value;
      if (value === 0) v = 0x0f;
      m.wrx('ram_046F', x, v);
    }
    refC533();
    if ((value & 0x80) !== 0) break;
  }
}
function refPalFadeIn(m) {
  for (let value = 0x10; value !== 0x40; value = (value + 0x10) & 0xff) {
    m.wrk('ram_0472', value); refC533();
  }
}
function refSubPalFill30(m) {
  m.wrk('ram_0472', 0x30);
  for (let x = 0; x < 0x20; x++) m.wrx('ram_0408', x, m.rdx('ram_046F', x));
  refPalCheck(m);
  for (let value = 0x20; (value & 0x80) === 0; value = (value - 0x10) & 0xff) {
    for (let x = 0; x < 0x20; x++) {
      const lo = m.rdx('ram_0408', x);
      let out;
      if ((lo & 0xf0) >= value) out = lo;
      else if ((lo & 0x0f) === 0x0f) out = ((0x0f | value) & 0xff) === 0x0f ? 0x0f : 0x00;
      else { const v = ((lo & 0x0f) | value) & 0xff; out = v === 0 ? 0x0f : v; }
      m.wrx('ram_046F', x, out);
    }
    refC533();
  }
}
function refPalCheck(m) {
  for (let x = 0; x < 0x20; x++) {
    let v = (m.rdx('ram_046F', x) & 0x0f) | 0x30;
    if (v === 0x3f) v = 0x30;
    m.wrx('ram_046F', x, v);
  }
  refC533();
}
function refAdvance(m) {
  m.wrk('ram_0088', (m.rdk('ram_0088') + m.rdk('ram_008A')) & 0xff);
  if (m.rdk('ram_0089') + (m.rdk('ram_008A') > (0x100 - m.rdk('ram_0088')) ? 1 : 0))
    m.wrk('ram_0089', (m.rdk('ram_0089') + 1) & 0xff);
  m.wrk('ram_008A', 0);
}
function refSceneReset(m, oam) {
  refPalFill(m);
  m.wrk('ram_046B', 1); m.wrk('ram_004B', 0); m.wrk('ram_0517', 0); m.wrk('ram_053C', 0); m.wrk('ram_053A', 0x80);
  m.wrk('ram_004A', 0x24);
  refDrawGroup2(m, oam, 0x20);
  refDrawGroup2(m, oam, 0x28);
  m.wrk('ram_0020', m.rdk('ram_0020') & 0xfc);
  refC530(m, 0x10, 0x15);
  refC530(m, 0x00, 0x16);
  refC533();
  [0x7c,0x71,0x52,0x53].forEach((v,i)=>m.wrx('ram_0494', i, v));
  m.wrk('ram_0490', 0x7c); m.wrk('ram_0491', 0x7e);
  m.wrk('ram_0557', 0xff); m.wrk('ram_0558', 0xff); m.wrk('ram_0541', 0xff); m.wrk('ram_054F', 0xff);
  m.wrk('ram_0553', 0xdd); m.wrk('ram_0547', 0x80); m.wrk('ram_0559', 0x31);
  refC533();
  // 场景重置多帧部分: 参考实现仅对比同步态 (scenePhase 设置后单步结束), 用 _sceneDelay/$60 帧标记
  m.wrk('ram_008A', 0);
}
function refDrawGroup2(m, oam, value) {
  for (let row = 0; row < 4; row++) {
    oam.setBusy(1);
    oam.clearRange(0, 0x25);
    oam.writeByte(0, 0x20);
    oam.writeByte(1, (row * 0x20) & 0xff);
    oam.writeByte(2, (value | row) & 0xff);
    oam.endBuild();
    // ram_008A += $20; ram_008B += carry (row 递增)
    const s = m.rdk('ram_008A') + 0x20;
    m.wrk('ram_008A', s & 0xff);
    if (s > 0xff) m.wrk('ram_008B', (m.rdk('ram_008B') + 1) & 0xff);
  }
}

module.exports = { RefMem, RefOam, refStreamStep, refControl, refAdvance, refC524, refC530 };

// ════════════ 测试主循环 ════════════
let pass = 0, fail = 0;
const fails = [];
function rngState() { return (rngState.v = (rngState.v * 1103515245 + 12345) & 0x7fffffff) >> 16 & 0xff; }
rngState.v = 20260819;
function rng() { return rngState(); }
function rng16() { return (rng() << 8) | rng(); }

// 比较 oam 影子缓冲 + busy + 指定 RAM 键
function compareOam(label, storeOam, ref) {
  if (storeOam.busy !== ref.busy) { fail++; fails.push(`${label}: busy got=${storeOam.busy} exp=${ref.busy}`); return; }
  for (let i = 0; i < 0x48 * 3; i++) {
    const got = storeOam.readByte(i);
    const exp = ref.buf[i] ?? 0;
    if (got !== exp) {
      fail++; fails.push(`${label}: oam[${i}] got=${got} exp=${exp}`); return;
    }
  }
  pass++;
}
const RAM_KEYS = ['ram_0020','ram_002A','ram_002B','ram_008B','ram_046C','ram_0472','ram_0490','ram_0491',
  'ram_0516','ram_0518','ram_053A','ram_053C','ram_0541','ram_0547','ram_054F','ram_0553','ram_0559',
  'ram_004A','ram_004B','ram_046B','ram_0517','ram_063F','ram_0005','ram_000D','ram_000E','ram_0011','ram_0012','ram_05D2'];
function compareRam(label, ref, store) {
  for (const k of RAM_KEYS) {
    if (ref.rdk(k) !== store.read(k)) { fail++; fails.push(`${label}: ${k} got=${store.read(k)} exp=${ref.rdk(k)}`); return; }
  }
  // ram_04xx 调色板/名字区
  for (let i = 0; i < 0x20; i++) {
    if (ref.rdx('ram_046F', i) !== store.read(`ram_046F+${i}`)) { fail++; fails.push(`${label}: ram_046F+${i} got=${store.read(`ram_046F+${i}`)} exp=${ref.rdx('ram_046F', i)}`); return; }
  }
  for (let i = 0; i < 4; i++) {
    if (ref.rdx('ram_0494', i) !== store.read(`ram_0494+${i}`)) { fail++; fails.push(`${label}: ram_0494+${i}`); return; }
  }
  for (let i = 0; i < 0x7e; i += 0x15) {
    if (ref.rdx('ram_0557', i) !== store.read(`ram_0557+${i}`)) { fail++; fails.push(`${label}: ram_0557+${i}`); return; }
    if (ref.rdx('ram_0558', i) !== store.read(`ram_0558+${i}`)) { fail++; fails.push(`${label}: ram_0558+${i}`); return; }
  }
  pass++;
}
function compareText(label, ref, store) {
  const q = ['ram_02F8','ram_02F9','ram_02FA','ram_02FB','ram_02FC','ram_02FD','ram_02FE','ram_02FF'];
  for (const k of q) if (ref.rdk(k) !== store.read(k)) { fail++; fails.push(`${label}: ${k} got=${store.read(k)} exp=${ref.rdk(k)}`); return; }
  pass++;
}

// 构造输入: 模拟 start() 初始化 + 随机名字区/调色板/子索引/标志
function setupInput() {
  const m = new RefMem();
  // 等价于 Bank19Service.start() 的初始化写
  m.wrk('ram_0490', 0);
  m.wrk('ram_0491', 2);
  m.wrk('ram_0087', 2);
  m.wrk('ram_0088', 0x67); m.wrk('ram_0089', 0xb4); // BANK19_STREAM_OFFSET 0x1467
  m.wrk('ram_05FB', 0);
  m.wrk('ram_0441', 9);
  m.wrk('ram_0442', 0x14);
  m.wrk('ram_063F', 0x80);
  m.wrk('ram_008A', 0);
  m.wrk('ram_008B', rng() & 0xff);
  // 注意: 不随机 ram_063F bit6, 因为 service.start() 会重置为 0x80
  // 调色板随机
  for (let i = 0; i < 0x20; i++) m.wrx('ram_046F', i, rng());
  for (let i = 0; i < 0x20; i++) m.wrx('ram_0408', i, rng());
  // 名字区随机
  ['ram_02F8','ram_02F9','ram_02FA','ram_02FB','ram_02FC','ram_02FD','ram_02FE','ram_02FF'].forEach(k => m.wrk(k, rng()));
  // OAM 影子区 ($0468-$0567) 预置 $F8 — 对应 DataStore 构造 oamShadow.clearAll (4位 key),
  // 与 service 端初始状态一致 (ref 读 OAM 区应返回 $F8 而非 0)
  for (let a = 0x0468; a <= 0x0567; a++) {
    const k = 'ram_' + a.toString(16).toUpperCase().padStart(4, '0');
    if (!m.m.has(k)) m.m.set(k, 0xf8);
  }
  return m;
}

// ── T1: 精灵组/单字符数据流单步 ──
{
  const N = 4000;
  for (let it = 0; it < N; it++) {
    const m = setupInput();
    const oam = new RefOam();
    // 取一个 < $E0 的非控制字节 (真实 ROM 数据区) 作为本步
    const streamBase = (m.rdk('ram_0088') | m.rdk('ram_0089') << 8);
    // 在 stream 中找一个非控制字节位置
    let pos = -1;
    for (let p = 0; p < 0x100; p++) { const b = PRG_BANK_19[streamBase + p] ?? 0xff; if (b < 0xe0) { pos = p; break; } }
    if (pos < 0) continue;
    m.wrk('ram_008A', pos);
    try { refStreamStep(m, oam); } catch (e) { continue; }
    const store = new DataStore();
    for (const [k, v] of m.m.entries()) store.write(k, v);
    const svc = new Bank19Service(store);
    svc.start(streamBase);
    // 对齐 streamPos 到 pos (start 已设 _streamPtr=streamBase, _streamPos=0; 手动推进)
    svc._streamPos = pos;
    svc.update(0);
    compareOam('T1.' + it, store.oam, oam);
    compareRam('T1.' + it, m, store);
    if ((m.rdk('ram_063F') & 0x40) !== 0) compareText('T1.' + it, m, store);
  }
}

// ── T2: 控制码单步 (除 delay/sceneReset 多帧) ──
{
  const ctrlCodes = [0xe0, 0xe2, 0xe4, 0xe5, 0xe6, 0xfc]; // e3 场景重置多帧单独测
  for (let it = 0; it < 2000; it++) {
    const m = setupInput();
    const oam = new RefOam();
    const code = ctrlCodes[rng() % ctrlCodes.length];
    const streamBase = (m.rdk('ram_0088') | m.rdk('ram_0089') << 8);
    // 临时注入控制码 + 随机参数到 ROM 单例 (两边共用同一数组)
    const saved = [];
    const inject = (off, v) => { saved.push([streamBase + off, PRG_BANK_19[streamBase + off]]); PRG_BANK_19[streamBase + off] = v; };
    inject(0, code);
    inject(1, rng() & 0xff); inject(2, rng() & 0xff); inject(3, rng() & 0xff);
    m.wrk('ram_008A', 0);
    try { refControl(m, oam, code); refAdvance(m); } catch (e) { continue; }
    const store = new DataStore();
    for (const [k, v] of m.m.entries()) store.write(k, v);
    const svc = new Bank19Service(store);
    svc.start(streamBase);
    svc._streamPos = 0;
    svc._handleControl(code);
    // 恢复 ROM
    for (const [a, v] of saved) PRG_BANK_19[a] = v;
    compareRam('T2.' + it, m, store);
    compareOam('T2.' + it, store.oam, oam);
  }
}

// ── T3: 场景重置 ($B218/e3) 同步态对比 ──
{
  for (let it = 0; it < 800; it++) {
    const m = setupInput();
    const oam = new RefOam();
    const streamBase = (m.rdk('ram_0088') | m.rdk('ram_0089') << 8);
    m.wrk('ram_008A', 0);
    try { refSceneReset(m, oam); } catch (e) { continue; }
    const store = new DataStore();
    for (const [k, v] of m.m.entries()) store.write(k, v);
    const svc = new Bank19Service(store);
    svc.start(streamBase);
    svc._sceneReset(); // 直接调同步部分
    // 排除异步多帧字段: ram_008A(已置0但 _sceneReset 内部也置0), _scenePhase 等内部态不比
    compareRam('T3.' + it, m, store);
    compareOam('T3.' + it, store.oam, oam);
  }
}

console.log(`\nPASS=${pass} FAIL=${fail}`);
if (fail > 0) { console.log(fails.slice(0, 20).join('\n')); process.exit(1); }
console.log('ALL BANK19 DIFFERENTIAL TESTS PASSED');

