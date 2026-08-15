// bank27 翻译验证: 独立参考实现 vs 实际 service (随机输入对比 + 确定性用例)
const { DataStore } = require('./tsubasa2-h5-src/_test_out/data/DataStore');
const { Bank27Service } = require('./tsubasa2-h5-src/_test_out/game/bank27_minimal.service');
const { readB27, readB27U16, B27_DATA } = require('./tsubasa2-h5-src/_test_out/data/bank27-data');

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; }
  else { fail++; console.log('FAIL: ' + name + (detail ? ' | ' + detail : '')); }
}

// ── 独立参考: $C536→$CDC9 / $C539→$CDE2 ──
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
  for (;;) {
    col--;
    if (col < 0) break;
    r = (r + 12) & 0xff;
    if (r === 0) return 0xff;
  }
  return r;
}

// ── 独立参考: entry_8104 ──
const decTbl = [];
for (let i = 0; i < 16; i++) decTbl.push(readB27(0xA1DC + i));
const u16 = a => readB27U16(a);
const ramKey = addr => 'ram_' + addr.toString(16).toUpperCase().padStart(4, '0');

function ref8104(state) {
  const arg = state.arg & 0xff;
  const namePtr = 0x0300 + arg * 12;
  let x = 0;
  let y = state.ram062A & 0x7f;
  const carryBig = arg >= 0x0b;
  let a = arg;
  if (arg >= 0x0b) { a = (arg - 0x0b) & 0xff; y = decTbl[y] & 0xff; x += 2; }
  const y4 = (y << 2) & 0xff;
  const y16 = (y4 << 2) & 0xff;
  const aslCarry = (y * 8) & 0x80 ? 1 : 0;
  const sum = y16 + y4 + aslCarry;
  const c3c = sum & 0xff, c3d = sum > 0xff ? 1 : 0;
  const e2 = state.ram00E2 & 0xff;
  const newE2 = e2 >> 1;
  const c3e = ((((a - 1) << 1) | (e2 & 1)) & 0xff);
  const carry = carryBig !== (state.ram05FB !== 0);
  let ptrBase, c3f;
  if (!carry) {
    c3f = 0x25;
    const v = state.zp[0x2c + x];
    ptrBase = u16(0xA6AD + ((v << 1) & 0xff));
  } else {
    c3f = 0x26;
    const v = state.zp[0x2c + x];
    const w = state.zp[0x2d + x];
    ptrBase = u16(0xAB65 + ((((w << 1) + (v << 2) + (v << 1)) & 0xff)));
  }
  const addr = (ptrBase + c3c + (c3d << 8) + c3e) & 0xffff;
  let byte = readB27(addr);
  if (carryBig && byte !== 0xf0) {
    const c = refC536(byte);
    byte = refC539((~c.x + 1) & 0xff, (~c.y + 1) & 0xff);
  }
  state.ram[ramKey(namePtr + 9)] = byte;
  if (state.ram0032 >= newE2) {
    if (c3f !== 0x25) state.ram[ramKey(namePtr + 9)] = 0xf0;
    else {
      const aR = arg >= 0x0b ? arg - 0x0b : arg;
      if (aR < 5) {
        const px = state.ram05FB !== 0 ? 0x38 : 0xc8;
        const py = state.ram[ramKey(namePtr + 8)] ?? 0;
        state.ram[ramKey(namePtr + 9)] = refC539(px, py);
      }
    }
  }
  return { name9: state.ram[ramKey(namePtr + 9)] & 0xff, c3e, newE2, c3f, addr, byte };
}

// ── 随机对比: entry_8104 ──
let rng = 0x12345678;
function rnd() { rng = (rng * 1103515245 + 12345) & 0x7fffffff; return rng; }
for (let t = 0; t < 4000; t++) {
  const state = {
    arg: rnd() & 0x1f,
    ram062A: rnd() & 0x1f,
    ram05FB: rnd() & 1,
    ram00E2: rnd() & 0xff,
    ram0032: rnd() & 0xff,
    zp: new Uint8Array(256),
    ram: {},
  };
  state.zp[0x2c] = rnd() & 3; state.zp[0x2d] = rnd() & 3;
  state.zp[0x2e] = rnd() & 3; state.zp[0x2f] = rnd() & 3;

  const store = new DataStore();
  for (const k of Object.keys(state.ram)) store.write(k, state.ram[k]);
  store.zp.set(state.zp);
  store.write('ram_062A', state.ram062A);
  store.write('ram_05FB', state.ram05FB);
  store.write('ram_00E2', state.ram00E2);
  store.write('ram_0032', state.ram0032);

  const svc = new Bank27Service(store);
  svc.entry_8104(state.arg);

  const exp = ref8104(state);
  const nameKey = ramKey(0x0300 + (state.arg & 0xff) * 12 + 9);
  const got = store.read(nameKey);
  if (got !== exp.name9) {
    check('rand8104#' + t, false, `arg=${state.arg} 062A=${state.ram062A} fb=${state.ram05FB} e2=${state.ram00E2} 32=${state.ram0032} zp=[${state.zp[0x2c]},${state.zp[0x2d]},${state.zp[0x2e]},${state.zp[0x2f]}] got=${got} exp=${exp.name9}`);
    break;
  }
  check('rand8104#' + t, true);
}

// ── 确定性用例: entry_8104 原始场景字节 (无转换) ──
{
  const store = new DataStore();
  store.write('ram_062A', 0);
  store.write('ram_05FB', 0);
  store.write('ram_00E2', 0x03);
  store.write('ram_0032', 0);
  store.zp[0x2c] = 0; store.zp[0x2d] = 0;
  const svc = new Bank27Service(store);
  svc.entry_8104(1);
  check('8104 raw byte name9', store.read('ram_0315') === 0x24, `got=${store.read('ram_0315')}`);
  check('8104 raw byte e2>>1', store.read('ram_00E2') === 0x01, `got=${store.read('ram_00E2')}`);
  check('8104 raw byte 3E', store.read('ram_003E') === 0x01, `got=${store.read('ram_003E')}`);
  check('8104 raw byte 3F', store.read('ram_003F') === 0x25, `got=${store.read('ram_003F')}`);
}

// ── 确定性用例: entry_81EE 帧 1 (脚本0/块0) ──
function expectOam(store, arr, label) {
  let ok = true;
  for (let i = 0; i < arr.length; i++) if (store.oam.readByte(i) !== arr[i]) { ok = false; break; }
  if (!ok) {
    const got = [];
    for (let i = 0; i < arr.length; i++) got.push(store.oam.readByte(i));
    check(label, false, 'got=[' + got.join(',') + '] exp=[' + arr.join(',') + ']');
    return;
  }
  check(label, true);
}
{
  const store = new DataStore();
  store.write('ram_05F4', 0x80);
  store.write('ram_05F3', 0);
  store.write('ram_05E3', 1);
  const svc = new Bank27Service(store);
  svc.entry_81EE();
  const block0 = [];
  for (let i = 0; i <= 36; i++) block0.push(readB27(0xA46A + i));
  check('81EE frame1 busy', store.oam.busy === 0x80, `got=${store.oam.busy}`);
  check('81EE frame1 flag', store.read('ram_05F4') === 0x01, `got=${store.read('ram_05F4')}`);
  check('81EE frame1 delay', store.read('ram_05F5') === 5, `got=${store.read('ram_05F5')}`);
  check('81EE frame1 scriptPtr', (store.read('ram_0064') << 8 | store.read('ram_0063')) === 0xA2B0,
    `got=${(store.read('ram_0064') << 8 | store.read('ram_0063')).toString(16)}`);
  expectOam(store, block0, '81EE frame1 oam=block0');
}
{
  // 帧延迟递减
  const store = new DataStore();
  store.write('ram_05F4', 0x01);
  store.write('ram_05F3', 0);
  store.write('ram_05F5', 5);
  store.write('ram_0063', 0xb0); store.write('ram_0064', 0xa2);
  const svc = new Bank27Service(store);
  svc.entry_81EE();
  check('81EE delay dec', store.read('ram_05F5') === 4, `got=${store.read('ram_05F5')}`);
}
{
  // 帧 2: 块 1
  const store = new DataStore();
  store.write('ram_05F4', 0x01);
  store.write('ram_05F3', 0);
  store.write('ram_05F5', 0);
  store.write('ram_0063', 0xb0); store.write('ram_0064', 0xa2);
  const svc = new Bank27Service(store);
  svc.entry_81EE();
  expectOam(store, [0x01, 0xEA, 0x22, 0xDA, 0x00], '81EE frame2 oam=block1');
  check('81EE frame2 delay', store.read('ram_05F5') === 5, `got=${store.read('ram_05F5')}`);
  check('81EE frame2 ptr', (store.read('ram_0064') << 8 | store.read('ram_0063')) === 0xA2B2,
    `got=${(store.read('ram_0064') << 8 | store.read('ram_0063')).toString(16)}`);
}
{
  // FF 跳转 + 停止 (ram_05E3=0)
  const store = new DataStore();
  store.write('ram_05F4', 0x01);
  store.write('ram_05F3', 0);
  store.write('ram_05F5', 0);
  store.write('ram_05E3', 0);
  store.write('ram_0063', 0xc8); store.write('ram_0064', 0xa2); // $A2C8 = FF AE A2 (脚本0 循环回 $A2AE)
  const svc = new Bank27Service(store);
  svc.entry_81EE();
  check('81EE ff-jump stop flag', store.read('ram_05F4') === 0, `got=${store.read('ram_05F4')}`);
  check('81EE ff-jump new ptr', (store.read('ram_0064') << 8 | store.read('ram_0063')) === 0xA2B0,
    `got=${(store.read('ram_0064') << 8 | store.read('ram_0063')).toString(16)}`);
  check('81EE ff-jump continues frame', store.read('ram_05F5') === 5, `got=${store.read('ram_05F5')}`);
  expectOam(store, block0(), '81EE ff-jump oam=block0');
}
function block0() {
  const b = [];
  for (let i = 0; i <= 36; i++) b.push(readB27(0xA46A + i));
  return b;
}
{
  // flag=0 → 直接返回, 不动 OAM
  const store = new DataStore();
  store.write('ram_05F4', 0);
  const svc = new Bank27Service(store);
  svc.entry_81EE();
  check('81EE flag0 noop busy', store.oam.busy === 0, `got=${store.oam.busy}`);
}

// ── 固定辅助纯函数随机对比 ──
for (let a = 0; a < 256; a++) {
  const svc = new Bank27Service(new DataStore());
  const got = svc['_fixedC536'](a);
  const exp = refC536(a);
  if (got.x !== exp.x || got.y !== exp.y) { check('C536#' + a, false, `got=${got.x},${got.y} exp=${exp.x},${exp.y}`); break; }
  check('C536#' + a, true);
}
for (let t = 0; t < 3000; t++) {
  const x = rnd() & 0xff, y = rnd() & 0xff;
  const svc = new Bank27Service(new DataStore());
  const got = svc['_fixedC539'](x, y);
  const exp = refC539(x, y);
  if (got !== exp) { check('C539#' + t, false, `x=${x} y=${y} got=${got} exp=${exp}`); break; }
  check('C539#' + t, true);
}

console.log(`\n=== PASS=${pass} FAIL=${fail} ===`);
process.exit(fail ? 1 : 0);
