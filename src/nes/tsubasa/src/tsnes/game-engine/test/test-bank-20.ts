/**
 * Bank 20 测试 — 队伍/球员选择
 * 验证: init / playerDataLoad / rosterUpdate / formationSetup / menuHandler
 */
import * as bank20 from '../native-game/tsubasa/banks/prg/bank-20-team-select-code';
import { writeMem, readMem } from '../native-game/tsubasa/banks/system-state';
import type { SystemState } from '../native-game/tsubasa/banks/system-state';

// ── 辅助 ──
function wv(cpuAddr: number, val: number) {
  bank20._testWriteView(cpuAddr, val);
}

function createMockSys(): SystemState {
  const mem = new Array(0x10000).fill(0);
  const sys: SystemState = {
    mem,
    regs: { A: 0, X: 0, Y: 0, P: 0, PC: 0x8000, S: 0xFF },
    ppu: { v: 0, t: 0, x: 0, w: false, latch: false, dataBuf: 0, ctrl: 0, mask: 0, status: 0 },
    apu: { frameCtr: 0, dmc: {} } as any,
    mapper: { irq: 0, irqReload: 0, irqEnabled: false, bankReg: [0,0,0,0,0,0,0,0], mode: 0, prgRamEnabled: false, prgRamProtect: false, mirror: 0 },
    frames: 0,
    nmi: false,
  };
  return sys;
}

// ── 辅助函数 ──
function test(name: string, fn: () => void) {
  try { fn(); } catch (e) {
    console.log(`  FAIL: ${name}`);
    console.log(`    ${e}`);
  }
}

function eq(a: number, b: number, label: string) {
  if (a !== b) throw new Error(`${label}: 期望=${b}, 实际=${a}`);
}

function assert(cond: boolean, label: string) {
  if (!cond) throw new Error(label);
}

// ᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧ
let passed = 0, failed = 0;
const failList: string[] = [];

function runTest(name: string, fn: () => void) {
  let ok = true;
  try {
    fn();
  } catch (e) {
    ok = false;
    failList.push(name);
    console.log(`  ✗ ${name}`);
    console.log(`    ${String(e).split('\n')[0]}`);
  }
  if (ok) { passed++; console.log(`  ✓ ${name}`); }
  else failed++;
}

console.log('╔══════════════════════════════════════════════════╗');
console.log('║ Bank 20 队伍/球员选择测试                         ║');
console.log('╚══════════════════════════════════════════════════╝');

// ᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧ
console.log('\n── 初始化 ──');

runTest('init: 基础状态设置', () => {
  const s = createMockSys();
  bank20.bank20_teamSelectInit(s);
  // 验证核心状态（注意: track() 可能写入某些 RAM 地址）
  eq(readMem(s, 0x05FC), 0, '$05FC=0 (team=日本)');
  eq(readMem(s, 0x0530), 11, '$0530=11 (阵容大小)');
  eq(readMem(s, 0x053D), 0, '$053D=0 (光标)');
  eq(readMem(s, 0x0541), 0xFF, '$0541=0xFF');
  // 验证脚本指针已设置
  const ptrLo = s.mem[0x4C], ptrHi = s.mem[0x4D];
  const ptr = (ptrHi << 8) | ptrLo;
  assert(ptr >= 0x8000 && ptr < 0xA000, '脚本指针在 bank-20 范围内');
});

runTest('init: 球员槽位初始化', () => {
  const s = createMockSys();
  bank20.bank20_teamSelectInit(s);
  for (let i = 0; i < 11; i++) {
    eq(readMem(s, 0x0532 + i), i, `槽位 ${i}=${i}`);
  }
});

runTest('init: 场景数据区域清零', () => {
  const s = createMockSys();
  // 预设脏数据
  for (let i = 0; i < 0x15 * 0x15; i++) s.mem[0x0547 + i] = 0xAA;
  bank20.bank20_teamSelectInit(s);
  for (let i = 0; i < 0x15; i++) {
    const base = 0x0547 + i * 0x15;
    eq(readMem(s, base), 0, `$0547+${i * 0x15}=0`);
  }
});

// ᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧ
console.log('\n── 球员数据加载 ──');

runTest('playerDataLoad: 加载队伍数据', () => {
  const s = createMockSys();
  writeMem(s, 0x05FC, 0); // team 0
  // 预设球员槽位
  for (let i = 0; i < 11; i++) writeMem(s, 0x0532 + i, i);
  // 在 view 中预填测试数据
  for (let i = 0; i < 11; i++) {
    const base = 0x08A8 + i * 0x10;
    wv(0x8000 + base, 10 + i);     // 球员号码
    wv(0x8000 + base + 1, 0x41 + i); // 姓名字节1
    wv(0x8000 + base + 5, i % 3 + 1); // 位置
  }
  bank20.bank20_playerDataLoad(s);
  // 验证数据写入
  eq(readMem(s, 0x0601), 10, '球员0号码=10');
  eq(readMem(s, 0x0601 + 1), 0x41, '球员0姓名首字节=0x41');
  eq(readMem(s, 0x0601 + 5), 1, '球员0位置=1(DF)');

  eq(readMem(s, 0x0611), 11, '球员1号码=11');
  eq(readMem(s, 0x0611 + 5), 2, '球员1位置=2(MF)');

  eq(readMem(s, 0x0621), 12, '球员2号码=12');
  eq(readMem(s, 0x0621 + 5), 3, '球员2位置=3(FW)');
});

runTest('playerDataLoad: 空view不会崩溃', () => {
  const s = createMockSys();
  writeMem(s, 0x05FC, 0);
  for (let i = 0; i < 11; i++) writeMem(s, 0x0532 + i, i);
  try {
    bank20.bank20_playerDataLoad(s);
  } catch (e) {
    throw new Error(`playerDataLoad 崩溃: ${e}`);
  }
  assert(true, 'playerDataLoad no crash');
});

// ᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧ
console.log('\n── 阵容更新 ──');

runTest('rosterUpdate: 交换球员', () => {
  const s = createMockSys();
  s.mem[0x0532] = 5;   // 槽位0 = 球员5
  s.mem[0x0533] = 7;   // 槽位1 = 球员7
  writeMem(s, 0x053D, 0); // 当前=槽位0
  writeMem(s, 0x053E, 1); // 选择=槽位1
  bank20.bank20_rosterUpdate(s);
  eq(readMem(s, 0x0532), 7, '交换后槽0=7');
  eq(readMem(s, 0x0533), 5, '交换后槽1=5');
});

runTest('rosterUpdate: 相同槽位不交换', () => {
  const s = createMockSys();
  s.mem[0x0532] = 3;
  writeMem(s, 0x053D, 0);
  writeMem(s, 0x053E, 0);
  bank20.bank20_rosterUpdate(s);
  eq(readMem(s, 0x0532), 3, '相同槽位不变');
});

runTest('rosterUpdate: 越界槽位不交换', () => {
  const s = createMockSys();
  writeMem(s, 0x053D, 11); // 越界
  writeMem(s, 0x053E, 0);
  try {
    bank20.bank20_rosterUpdate(s);
  } catch (e) {
    throw new Error(`rosterUpdate 越界崩溃: ${e}`);
  }
  assert(true, 'rosterUpdate out of bounds no crash');
});

// ᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧ
console.log('\n── 阵型设置 ──');

runTest('formationSetup: 4-4-2', () => {
  const s = createMockSys();
  writeMem(s, 0x0531, 0); // formation 0 = 4-4-2
  bank20.bank20_formationSetup(s);
  // 4-4-2: DF×4, MF×4, FW×2, GK×1
  eq(readMem(s, 0x0601 + 5), 1, 'slot0=DF');
  eq(readMem(s, 0x0601 + 3*16 + 5), 1, 'slot3=DF');
  eq(readMem(s, 0x0601 + 4*16 + 5), 2, 'slot4=MF');
  eq(readMem(s, 0x0601 + 8*16 + 5), 3, 'slot8=FW');
  eq(readMem(s, 0x0601 + 10*16 + 5), 0, 'slot10=GK');
});

runTest('formationSetup: 4-3-3', () => {
  const s = createMockSys();
  writeMem(s, 0x0531, 1); // formation 1 = 4-3-3
  bank20.bank20_formationSetup(s);
  eq(readMem(s, 0x0601 + 5), 1, 'slot0=DF');
  eq(readMem(s, 0x0601 + 4*16 + 5), 2, 'slot4=MF');
  eq(readMem(s, 0x0601 + 7*16 + 5), 3, 'slot7=FW');
});

runTest('formationSetup: 越界formation', () => {
  const s = createMockSys();
  writeMem(s, 0x0531, 99); // 越界
  try {
    bank20.bank20_formationSetup(s);
  } catch (e) {
    throw new Error(`formationSetup 越界崩溃: ${e}`);
  }
  assert(true, 'formationSetup out of bounds no crash');
});

// ᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧ
console.log('\n── 菜单处理器 ──');

runTest('menuHandler: UP移动光标', () => {
  const s = createMockSys();
  s.mem[0x053D] = 3;
  s.mem[0x0028] = 0x08; // UP
  bank20.bank20_menuHandler(s);
  eq(readMem(s, 0x053D), 2, 'UP: 3→2');
});

runTest('menuHandler: UP边界', () => {
  const s = createMockSys();
  s.mem[0x053D] = 0;
  s.mem[0x0028] = 0x08; // UP
  bank20.bank20_menuHandler(s);
  eq(readMem(s, 0x053D), 0, 'UP边界: 保持0');
});

runTest('menuHandler: DOWN移动光标', () => {
  const s = createMockSys();
  s.mem[0x053D] = 7;
  s.mem[0x0028] = 0x04; // DOWN
  bank20.bank20_menuHandler(s);
  eq(readMem(s, 0x053D), 8, 'DOWN: 7→8');
});

runTest('menuHandler: DOWN边界', () => {
  const s = createMockSys();
  s.mem[0x053D] = 10;
  s.mem[0x0028] = 0x04; // DOWN
  bank20.bank20_menuHandler(s);
  eq(readMem(s, 0x053D), 10, 'DOWN边界: 保持10');
});

runTest('menuHandler: A按钮选择', () => {
  const s = createMockSys();
  s.mem[0x0532] = 3;  // 槽位0=球员3
  s.mem[0x0533] = 7;  // 槽位1=球员7
  s.mem[0x053D] = 0;  // 光标在0
  s.mem[0x053E] = 1;  // 预设选择槽位=1 (A按钮会覆盖为0)
  s.mem[0x0028] = 0x01; // A
  bank20.bank20_menuHandler(s);
  // A按钮将 $053E 设为光标位置(0)，然后 rosterUpdate 检查 slotA(0)≠slotB(0)
  // 相同槽位不交换，$0532/$0533 保持不变
  eq(readMem(s, 0x0532), 3, 'A确认: 槽0不变');
  eq(readMem(s, 0x0533), 7, 'A确认: 槽1不变');
});

runTest('menuHandler: B按钮返回', () => {
  const s = createMockSys();
  s.mem[0x0028] = 0x02; // B
  bank20.bank20_menuHandler(s);
  eq(readMem(s, 0x052B), 0, 'B: $052B=0 返回标题');
});

// ᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧ
console.log('\n── Dispatch 表 ──');

runTest('dispatch: 所有entry有对应函数', () => {
  assert(bank20.bank20_dispatch[0x00] !== undefined, 'entry 0x00');
  assert(bank20.bank20_dispatch[0x03] !== undefined, 'entry 0x03');
  assert(bank20.bank20_dispatch[0x06] !== undefined, 'entry 0x06');
  assert(bank20.bank20_dispatch[0x09] !== undefined, 'entry 0x09');
  assert(bank20.bank20_dispatch[0x0C] !== undefined, 'entry 0x0C');
});

runTest('dispatch: 全部可调用不崩溃', () => {
  const s = createMockSys();
  for (const [key, fn] of Object.entries(bank20.bank20_dispatch)) {
    try {
      fn(s);
    } catch (e) {
      throw new Error(`dispatch ${key} 崩溃: ${e}`);
    }
  }
  assert(true, 'all dispatch no crash');
});

// ᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧ
console.log('\n── View 视图 ──');

runTest('view: _testWriteView 写入/读取', () => {
  wv(0x8000, 0xAB);
  wv(0x9000, 0xCD);
  const s = createMockSys();
  // 通过 playerDataLoad 验证 view 数据
  writeMem(s, 0x05FC, 0);
  for (let i = 0; i < 11; i++) writeMem(s, 0x0532 + i, i);
  // 写入 view 数据
  wv(0x8000 + 0x08A8, 99); // 球员0号码=99
  bank20.bank20_playerDataLoad(s);
  eq(readMem(s, 0x0601), 99, 'view: 号码=99');
});

// ᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧᐧ
console.log(`\n╔══════════════════════════════════════════════╗`);
console.log(`║  测试结果: ${passed} passed / ${failed} failed`);
if (failed > 0) {
  console.log(`║  失败列表:`);
  for (const f of failList) console.log(`║    ✗ ${f}`);
}
console.log(`╚══════════════════════════════════════════════╝`);
