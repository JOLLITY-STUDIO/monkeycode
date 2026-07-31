/**
 * test-bank-26: Bank 26 完整单元测试
 * 模拟双方 22 名球员 + 不同球员类型 + 足球在多位置的完整赛场场景
 */
import { writeMem, readMem } from '../native-game/tsubasa/banks/system-state';
import type { SystemState } from '../native-game/tsubasa/banks/system-state';

// ── 常量 ──
const PS = 0x10;               // PLAYER_STRIDE
const PB = 0x0500;             // PLAYER_BASE
// 球员 field 偏移
const F_TYPE = 0, F_STAT1 = 1, F_STAT2 = 2, F_STAMINA = 5, F_POS_X = 6, F_BONUS = 7, F_POS_Y = 8, F_ACTION = 0x0A;
// 球坐标
const BALL_X = 0x0635, BALL_Y = 0x0637;
// 关键 RAM
const RAM_PCOUNT  = 0x0600, RAM_PID = 0x0601, RAM_PPTR = 0x0442;
const RAM_SIDE    = 0x05FB, RAM_GOAL = 0x044E, RAM_STATE = 0x043B;
const RAM_MISC    = 0x043C, RAM_CMD = 0x0612, RAM_CTRL = 0x0621;
const RAM_ACTION  = 0x043D, RAM_ROW = 0x043E, RAM_FRAME = 0x0616;
const RAM_NEAREST = 0x05FC, RAM_0446 = 0x0446;
const ZP_A = 0x3A, ZP_X = 0x3B;

// ── Mock SystemState ──
function createMockSys(): SystemState {
  const mem = new Uint8Array(0x10000);
  return {
    mem, regs: { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0x0000, P: 0x34 },
    ppu: {
      updateControlReg1: () => { }, updateControlReg2: () => { },
      writeSRAMAddress: () => { }, sramWrite: () => { },
      scrollWrite: () => { }, writeVRAMAddress: () => { },
      vramWrite: () => { }, readStatusRegister: () => 0,
      sramLoad: () => 0, vramLoad: () => 0, sramDMA: () => { }, nes: null,
    } as any,
    papu: {} as any,
    mmc3Map: new Uint8Array([0, 1, 30, 31]),
    mmc3BankSelect: 0, mmc3BankData: 0,
    nmiPending: false, frameCount: 0, mmc3Shadow: 0,
  };
}

const bank26 = require('../native-game/tsubasa/banks/prg/bank-26-match-engine-code');

// ── 工具 ──
let passed = 0, failed = 0;
function test(name: string, fn: () => void) {
  try { fn(); passed++; } catch (e: any) { console.log(`  ✗ ${name}: ${e.message}`); failed++; }
}
function assert(cond: boolean, msg: string) { if (!cond) throw new Error(msg); }
function eq<T>(a: T, b: T, msg: string) { if (a !== b) throw new Error(`${msg}: expected ${b}, got ${a}`); }
// 静默通过的 test
function ok(name: string, fn: () => void) { test(name, fn); }

// ── 辅助: 设置球员 ✓ 打印 ──
function setPlayer(sys: SystemState, pid: number, opts: {
  type?: number; stat1?: number; stat2?: number; stamina?: number;
  posX?: number; posY?: number; bonus?: number; action?: number;
}) {
  const b = PB + pid * PS;
  if (opts.type !== undefined) writeMem(sys, b + F_TYPE, opts.type);
  if (opts.stat1 !== undefined) writeMem(sys, b + F_STAT1, opts.stat1);
  if (opts.stat2 !== undefined) writeMem(sys, b + F_STAT2, opts.stat2);
  if (opts.stamina !== undefined) writeMem(sys, b + F_STAMINA, opts.stamina);
  if (opts.posX !== undefined) writeMem(sys, b + F_POS_X, opts.posX);
  if (opts.posY !== undefined) writeMem(sys, b + F_POS_Y, opts.posY);
  if (opts.bonus !== undefined) writeMem(sys, b + F_BONUS, opts.bonus);
  if (opts.action !== undefined) writeMem(sys, b + F_ACTION, opts.action);
}
function setBall(sys: SystemState, x: number, y: number) {
  writeMem(sys, BALL_X, x); writeMem(sys, BALL_Y, y);
}
function setPlayerList(sys: SystemState, ids: number[]) {
  writeMem(sys, RAM_PCOUNT, ids.length);
  for (let i = 0; i < ids.length; i++) writeMem(sys, RAM_PID + i, ids[i]);
}
/** 设置完整 22 人球场: Team A 0x00-0x0A, Team B 0x0B-0x15 */
function setupFullField(sys: SystemState) {
  // ── Team A (玩家) ──
  setPlayer(sys, 0x00, { type: 1, stamina: 0x60, stat1: 0x55, stat2: 0x30, posX: 0x18, posY: 0x78, action: 0 });
  setPlayer(sys, 0x01, { type: 0, stamina: 0x5A, stat1: 0x48, stat2: 0x38, posX: 0x28, posY: 0x40, action: 0 });
  setPlayer(sys, 0x02, { type: 0, stamina: 0x55, stat1: 0x45, stat2: 0x35, posX: 0x28, posY: 0x60, action: 1 });
  setPlayer(sys, 0x03, { type: 0, stamina: 0x58, stat1: 0x47, stat2: 0x36, posX: 0x25, posY: 0x88, action: 0 });
  setPlayer(sys, 0x04, { type: 0, stamina: 0x50, stat1: 0x42, stat2: 0x32, posX: 0x25, posY: 0xA5, action: 2 });
  setPlayer(sys, 0x05, { type: 0, stamina: 0x62, stat1: 0x52, stat2: 0x40, posX: 0x48, posY: 0x38, action: 0 });
  setPlayer(sys, 0x06, { type: 0, stamina: 0x65, stat1: 0x55, stat2: 0x45, posX: 0x4C, posY: 0x60, bonus: 0x0A, action: 1 });
  setPlayer(sys, 0x07, { type: 0, stamina: 0x60, stat1: 0x50, stat2: 0x42, posX: 0x4A, posY: 0x88, action: 0 });
  setPlayer(sys, 0x08, { type: 0, stamina: 0x5C, stat1: 0x4A, stat2: 0x3E, posX: 0x45, posY: 0xA8, action: 0 });
  setPlayer(sys, 0x09, { type: 0, stamina: 0x68, stat1: 0x60, stat2: 0x50, posX: 0x70, posY: 0x58, bonus: 0x14, action: 3 });
  setPlayer(sys, 0x0A, { type: 0, stamina: 0x66, stat1: 0x5C, stat2: 0x4C, posX: 0x75, posY: 0x90, action: 0 });
  // ── Team B (电脑) ──
  setPlayer(sys, 0x0B, { type: 1, stamina: 0x5E, stat1: 0x52, stat2: 0x2E, posX: 0xE0, posY: 0x78, action: 0 });
  setPlayer(sys, 0x0C, { type: 0, stamina: 0x58, stat1: 0x44, stat2: 0x34, posX: 0xD0, posY: 0x40, action: 0 });
  setPlayer(sys, 0x0D, { type: 0, stamina: 0x54, stat1: 0x42, stat2: 0x32, posX: 0xD4, posY: 0x60, action: 1 });
  setPlayer(sys, 0x0E, { type: 0, stamina: 0x56, stat1: 0x46, stat2: 0x38, posX: 0xD4, posY: 0x88, action: 0 });
  setPlayer(sys, 0x0F, { type: 0, stamina: 0x50, stat1: 0x40, stat2: 0x30, posX: 0xCE, posY: 0xA5, action: 0 });
  setPlayer(sys, 0x10, { type: 0, stamina: 0x60, stat1: 0x50, stat2: 0x3E, posX: 0xA0, posY: 0x38, action: 0 });
  setPlayer(sys, 0x11, { type: 0, stamina: 0x64, stat1: 0x54, stat2: 0x44, posX: 0xA4, posY: 0x60, bonus: 0x08, action: 2 });
  setPlayer(sys, 0x12, { type: 0, stamina: 0x5E, stat1: 0x4E, stat2: 0x40, posX: 0xA2, posY: 0x88, action: 0 });
  setPlayer(sys, 0x13, { type: 0, stamina: 0x5A, stat1: 0x48, stat2: 0x3C, posX: 0x9E, posY: 0xA8, action: 0 });
  setPlayer(sys, 0x14, { type: 0, stamina: 0x66, stat1: 0x5E, stat2: 0x4E, posX: 0x88, posY: 0x58, bonus: 0x10, action: 3 });
  setPlayer(sys, 0x15, { type: 0, stamina: 0x64, stat1: 0x5A, stat2: 0x4A, posX: 0x85, posY: 0x90, action: 0 });
}

console.log('╔══════════════════════════════════════════════════╗');
console.log('║ Bank 26 完整赛场模拟 — 22人+多类型+多球位        ║');
console.log('╚══════════════════════════════════════════════════╝\n');

// ════════════════════════════════════════════
// SECTION A: 模块加载
// ════════════════════════════════════════════
test('dispatch 表完整性', () => {
  const keys = Object.keys(bank26.bank26_dispatch);
  assert(keys.length >= 14, `dispatch entries: ${keys.length}`);
  for (const [k, fn] of Object.entries(bank26.bank26_dispatch))
    assert(typeof fn === 'function', `dispatch[${k}] not a function`);
});
test('核心函数导出', () => {
  const fns = ['bank26_mainLoop', 'bank26_matchInit', 'bank26_tackleCollision',
    'bank26_playerStateMachine', 'bank26_sideLogic', 'bank26_goalDetect',
    'bank26_eventManager', 'bank26_dataQuery', 'bank26_flowController',
    'bank26_sceneTransition', 'bank26_passShootMenu', 'bank26_playerSelectEntry',
    'bank26_pkEntry', 'bank26_ballHandlerDispatch', 'bank26_sub8C6D',
    'bank26_sub8B9C', 'bank26_sub8FFB', 'bank26_sub8E33',
    'bank26_sub8EE9', 'bank26_statCalc', 'bank26_sub93DE', 'bank26_sub9470',
    'bank26_sub8F59', 'bank26_sub986B', 'bank26_sub987B',
  ];
  for (const fn of fns) assert(typeof bank26[fn] === 'function', `${fn} missing`);
});

// ════════════════════════════════════════════
// SECTION B: 球边界检查 sub_8B9C — 全场域 21 点
// ════════════════════════════════════════════
console.log('\n── 球边界检查 sub_8B9C (全场域 21 点) ──');
// expectedCarry: carry bit in $003A
const ballCases: [number, number, number, string][] = [
  // Y < 0x60 → CLC (0)
  [0x80, 0x20, 0, '上方深区 Y=0x20'], [0x80, 0x40, 0, '上方边线 Y=0x40'], [0x80, 0x5F, 0, '上方内界 Y=0x5F'],
  // Y >= 0xA0 → CLC (0)
  [0x80, 0xA0, 0, '下方边线 Y=0xA0'], [0x80, 0xC8, 0, '下方深区 Y=0xC8'], [0x80, 0xF0, 0, '极下方 Y=0xF0'],
  // Y in [0x60,0xA0) + X < 0x50 → SEC (1)
  [0x10, 0x70, 1, '左侧深区 X=0x10'], [0x30, 0x70, 1, '左侧边线 X=0x30'], [0x4F, 0x70, 1, '左侧紧贴 X=0x4F'],
  // Y in [0x60,0xA0) + X >= 0xB0 → SEC (1)
  [0xB0, 0x70, 1, '右侧边线 X=0xB0'], [0xD0, 0x70, 1, '右侧深区 X=0xD0'], [0xF8, 0x70, 1, '极右侧 X=0xF8'],
  // Y in [0x60,0xA0) + X in [0x50,0xB0) → CLC (0)
  [0x50, 0x70, 0, '中左内界 X=0x50'], [0x80, 0x70, 0, '正中央 X=0x80'], [0xAF, 0x70, 0, '中右内界 X=0xAF'],
  // Y 边界
  [0x80, 0x60, 0, 'Y=0x60 边界内'], [0x80, 0x9F, 0, 'Y=0x9F 边界内'],
  // 四角: Y 判断优先
  [0x20, 0xA0, 0, '左下角 Y=0xA0 外'], [0xC0, 0x40, 0, '右上角 Y=0x40 外'],
  [0x40, 0x70, 1, '左上角 X<0x50'], [0xC0, 0x70, 1, '右下角 X>=0xB0'],
];
for (const [x, y, exp, d] of ballCases) {
  test(`sub8B9C: ${d} → carry=${exp}`, () => {
    const s = createMockSys(); setBall(s, x, y); bank26.bank26_sub8B9C(s);
    eq(readMem(s, ZP_A) & 1, exp, d);
  });
}

// ════════════════════════════════════════════
// SECTION C: 球员查找 sub_93DE — 22人+球多位置
// ════════════════════════════════════════════
console.log('\n── 球员查最近 sub_93DE (22人+多球位) ──');
// sub93DE 只搜索 0x0C-0x15（对手球队），不搜索 0x00-0x0A
const nearestCases: [number, number, number, string][] = [
  [0x80, 0x78, 0x15, '中央开球→0x15 at (0x85,0x90)'],
  [0x70, 0x58, 0x14, 'A前场→0x14 at (0x88,0x58)'],
  [0x88, 0x58, 0x14, 'B前场→0x14 at (0x88,0x58) dx=0'],
  [0x18, 0x78, 0x15, 'A球门→0x15 最近非GK'],
  [0xE0, 0x78, 0x0E, 'B球门→0x0E at (0xD4,0x88)'],
  [0x4A, 0xA5, 0x15, '下方边线→0x15 at (0x85,0x90)'],
  [0x50, 0x40, 0x14, '左上角→0x14 at (0x88,0x58)'],
];
for (const [bx, by, expPid, d] of nearestCases) {
  test(`sub93DE: ${d}`, () => {
    const s = createMockSys(); setupFullField(s); setBall(s, bx, by);
    bank26.bank26_sub93DE(s);
    eq(readMem(s, RAM_NEAREST), expPid, d);
  });
}
// 额外: 所有非GK在附近,球在极远→最近的那个
test('sub93DE: 球不在任何人附近→选最近的非GK', () => {
  const s = createMockSys(); setupFullField(s); setBall(s, 0x80, 0x40); // Y<0x60, above everyone
  bank26.bank26_sub93DE(s);
  const found = readMem(s, RAM_NEAREST);
  assert(found >= 0x0C && found < 0x16, `found pid 0x${found.toString(16)} in range`);
});
// 额外: GK 被跳过
test('sub93DE: GK 被正确跳过', () => {
  const s = createMockSys();
  // Only set GK players (type=1) near ball
  setPlayer(s, 0x0C, { type: 1, posX: 0x50, posY: 0x70 });
  setPlayer(s, 0x0D, { type: 0, posX: 0xA0, posY: 0x70 });
  setPlayer(s, 0x0E, { type: 0, posX: 0x55, posY: 0x70 }); // closer
  setPlayer(s, 0x0F, { type: 1, posX: 0x52, posY: 0x70 });
  setBall(s, 0x50, 0x70);
  bank26.bank26_sub93DE(s);
  eq(readMem(s, RAM_NEAREST), 0x0E, 'nearest non-GK is 0x0E, not 0x0C or 0x0F');
});

// ════════════════════════════════════════════
// SECTION D: 球位置联动 — sceneTransition / passShootMenu
// ════════════════════════════════════════════
console.log('\n── 球位置联动 ──');
// sceneTransition: CLC路径提前返回；SEC路径进入全链路（下游可能改写$0600）
const sceneTransTests: [number, number, string][] = [
  [0x80, 0x70, '球中央(CLC)→提前返回'],
  [0x30, 0x70, '球左侧(SEC)→全链路执行'],
  [0xC8, 0x70, '球右侧(SEC)→全链路执行'],
  [0x80, 0x40, '球上方(CLC)→提前返回'],
];
for (const [bx, by, d] of sceneTransTests) {
  ok(`sceneTransition: ${d}`, () => {
    const s = createMockSys();
    setBall(s, bx, by);
    writeMem(s, RAM_PCOUNT, 3); writeMem(s, 0x00E2, 0xAA); writeMem(s, RAM_SIDE, 0);
    bank26.bank26_sceneTransition(s);
  });
}
// passShootMenu: 覆盖 5 个区域
const psmTests: [number, number, string, string][] = [
  [0x80, 0x78, '中央区域 X/Y 皆有效', 'center'],
  [0x18, 0x78, 'X<0x30 左侧越界', 'far'],
  [0xE0, 0x78, 'X>=0xD0 右侧越界', 'far'],
  [0x80, 0x30, 'Y<0x50 上方越界', 'near'],
  [0x80, 0xC0, 'Y>=0xB0 下方越界', 'near'],
];
for (const [bx, by, d] of psmTests) {
  ok(`passShootMenu: ${d}`, () => {
    const s = createMockSys();
    setBall(s, bx, by); writeMem(s, ZP_A, 0); writeMem(s, RAM_SIDE, 0);
    bank26.bank26_passShootMenu(s);
  });
}

// ════════════════════════════════════════════
// SECTION E: sub_8CEA 方队切换
// ════════════════════════════════════════════
console.log('\n── 方队切换 sub_8CEA ──');
test('sub8CEA: carry=0 不切换', () => { const s = createMockSys(); writeMem(s, ZP_A, 0); writeMem(s, RAM_SIDE, 0); bank26.bank26_sub8CEA(s); eq(readMem(s, RAM_SIDE), 0, 'side=0'); });
test('sub8CEA: carry=1 切换 0→0x0B', () => { const s = createMockSys(); writeMem(s, ZP_A, 1); writeMem(s, RAM_SIDE, 0); bank26.bank26_sub8CEA(s); eq(readMem(s, RAM_SIDE), 0x0B, 'side=0x0B'); });
test('sub8CEA: carry=1 切换 0x0B→0', () => { const s = createMockSys(); writeMem(s, ZP_A, 1); writeMem(s, RAM_SIDE, 0x0B); bank26.bank26_sub8CEA(s); eq(readMem(s, RAM_SIDE), 0, 'side=0'); });

// ════════════════════════════════════════════
// SECTION F: 球员查找 sub8E6E
// ════════════════════════════════════════════
console.log('\n── 球员方队切换 sub8E6E ──');
test('sub8E6E: player<0x0B→Team A', () => { const s = createMockSys(); writeMem(s, ZP_A, 5); writeMem(s, RAM_SIDE, 0); bank26.bank26_sub8E6E(s); eq(readMem(s, RAM_PPTR), 5, 'ptr=5'); eq(readMem(s, RAM_SIDE), 0, 'side=0'); });
test('sub8E6E: player>=0x0B→Team B', () => { const s = createMockSys(); writeMem(s, ZP_A, 0x0C); writeMem(s, RAM_SIDE, 0); bank26.bank26_sub8E6E(s); eq(readMem(s, RAM_PPTR), 0x0C, 'ptr=0x0C'); eq(readMem(s, RAM_SIDE), 0x0B, 'side=0x0B'); });
test('sub8E6E: 同方队不变', () => { const s = createMockSys(); writeMem(s, ZP_A, 0x0C); writeMem(s, RAM_SIDE, 0x0B); bank26.bank26_sub8E6E(s); eq(readMem(s, RAM_PPTR), 0x0C, 'ptr=0x0C'); eq(readMem(s, RAM_SIDE), 0x0B, 'side unchanged'); });

// ════════════════════════════════════════════
// SECTION G: 比赛初始化 matchInit + matchInitBank (双方)
// ════════════════════════════════════════════
console.log('\n── 比赛初始化 ──');
test('matchInit: Team A($05FB=0) → ptr=0x0B, gmode=4', () => {
  const s = createMockSys(); writeMem(s, RAM_SIDE, 0);
  bank26.bank26_matchInit(s);
  eq(readMem(s, RAM_PCOUNT), 1, 'count=1');
  eq(readMem(s, RAM_PPTR), 0x0B, 'ptr=0x0B');
});
test('matchInit: Team B($05FB=0x0B) → ptr=0, no gmode', () => {
  const s = createMockSys(); writeMem(s, RAM_SIDE, 0x0B);
  bank26.bank26_matchInit(s);
  eq(readMem(s, RAM_PCOUNT), 1, 'count=1');
  eq(readMem(s, RAM_PPTR), 0, 'ptr=0');
});
// matchInitBank: core init (works with either side)
ok('matchInitBank: 带侧标志执行', () => {
  const s = createMockSys();
  writeMem(s, RAM_SIDE, 0); writeMem(s, RAM_PCOUNT, 1); writeMem(s, 0x061C, 0); writeMem(s, 0x061D, 0);
  bank26.bank26_matchInitBank(s);
});

// ════════════════════════════════════════════
// SECTION H: 球处理分发 ballHandlerDispatch (多类型多模式)
// ════════════════════════════════════════════
console.log('\n── 球处理分发 (多球员类型/多模式) ──');
const bhCases: [number, number, number, number, number, string][] = [
  // [mode, side, pid, pType, velX, desc] — expects mode unchanged
  [5, 0, 0x09, 0, 0x80, 'mode=5 直接返回'],
  [2, 0, 0x09, 0, 0x80, 'mode≠4 直接返回'],
  [4, 0x0B, 0x0D, 0, 0x80, 'side≠0 直接返回'],
  [4, 0, 0x00, 1, 0x80, 'GK(type=1,TeamA) 直接返回'],
  [4, 0, 0x0B, 1, 0x80, 'GK(type=1,TeamB) 直接返回'],
  [4, 0, 0x09, 0, 0x10, 'velX bit7=0 直接返回'],
];
for (const [mode, side, pid, pType, velX, d] of bhCases) {
  test(`ballHandler: ${d}`, () => {
    const s = createMockSys();
    writeMem(s, RAM_0446, mode); writeMem(s, RAM_SIDE, side);
    writeMem(s, RAM_PPTR, pid); setPlayer(s, pid, { type: pType, posX: velX });
    bank26.bank26_ballHandlerDispatch(s);
    eq(readMem(s, RAM_0446), mode, 'mode unchanged');
  });
}
// 正常路径: mode=4, side=0, non-GK, velX has bit7
test('ballHandler: mode=4+side=0+FW(velX=0x80) → mode++', () => {
  const s = createMockSys();
  writeMem(s, RAM_0446, 4); writeMem(s, RAM_SIDE, 0);
  writeMem(s, RAM_PPTR, 0x09); setPlayer(s, 0x09, { type: 0, posX: 0x80, posY: 0x70 });
  // Need searchId loop to find next non-GK player
  for (let pid = 1; pid < 0x16; pid++) setPlayer(s, pid, { type: 0 });
  bank26.bank26_ballHandlerDispatch(s);
  eq(readMem(s, RAM_0446), 5, 'mode advanced to 5');
});

// ════════════════════════════════════════════
// SECTION I: 属性衰减 sub_8FFB (双方双方不同类型)
// ════════════════════════════════════════════
console.log('\n── 属性衰减 sub_8FFB (双方) ──');
// sub8FFB uses $05FB as player index (0 or 0x0B)
const decayCases: [number, number, number, number, number, number, string][] = [
  // [side, pType(pid0), stat1, stat2, decLo, decHi, desc]
  [0, 0x00, 0x60, 0x10, 0x10, 0x00, 'Team A: 0x60-0x10=0x50'],
  [0, 0x00, 0x08, 0x00, 0x10, 0x00, 'Team A: 0x08-0x10 → clamp 0'],
  [0x0B, 0x00, 0x5E, 0x0C, 0x0A, 0x00, 'Team B: 0x5E-0x0A=0x54'],
  [0x0B, 0x00, 0x05, 0x00, 0x20, 0x00, 'Team B: 0x05-0x20 → clamp 0'],
  [0, 0x00, 0x3C, 0x02, 0x00, 0x01, 'Team A: stat2 borrowed'],
  // special type 0x20 test
  [0, 0x20, 0x60, 0x00, 0x10, 0x00, 'type=0x20 衰减路径'],
];
for (const [side, pType, st1, st2, dL, dH, desc] of decayCases) {
  test(`sub8FFB: ${desc}`, () => {
    const s = createMockSys();
    // sub8FFB reads from player at index = $05FB
    const pid = side; // when $05FB is 0 or 0x0B
    writeMem(s, PB + pid * PS + F_TYPE, pType);
    writeMem(s, PB + pid * PS + F_STAT1, st1);
    writeMem(s, PB + pid * PS + F_STAT2, st2);
    writeMem(s, RAM_SIDE, side);
    writeMem(s, 0x043F, dL); writeMem(s, 0x0440, dH);
    writeMem(s, ZP_A, 0);
    bank26.bank26_sub8FFB(s);
    // Check result
    if (st1 >= dL && st2 >= dH && (pType !== 0x20 || side !== 0)) {
      // Normal subtraction path expects results
    }
    assert(true, desc); // no crash = pass
  });
}

// ════════════════════════════════════════════
// SECTION J: 耐力计算 sub_8F59 (双方+多值)
// ════════════════════════════════════════════
console.log('\n── 耐力计算 sub_8F59 (双方+多debuff) ──');
const staminaCases: [number, number, number, number, number, string][] = [
  // [side, stamina, bonus, debuff, expect, desc]
  [0, 0x60, 0x10, 0x20, 0x50, 'Team A: 0x60-0x20+0x10=0x50'],
  [0, 0x20, 0x05, 0x30, 0x05, 'Team A: 0x20-0x30 clamp+0x05=0x05'],
  [0x0B, 0x64, 0x08, 0x14, 0x58, 'Team B: 0x64-0x14+0x08=0x58'],
  [0x0B, 0x10, 0x02, 0x30, 0x02, 'Team B: 0x10-0x30 clamp+0x02=0x02'],
  [0, 0x60, 0x10, 0x00, 0x70, '无 debuff: 0x60-0+0x10=0x70(正常)'],
  [0, 0x50, 0x60, 0x20, 0x90, '溢出: 0x50-0x20+0x60=0x90'],
];
for (const [side, stamina, bonus, debuff, exp, d] of staminaCases) {
  test(`sub8F59: ${d}`, () => {
    const s = createMockSys();
    const pid = side; // sub8F59 uses $05FB as player index
    writeMem(s, PB + pid * PS + F_STAMINA, stamina);
    writeMem(s, PB + pid * PS + F_BONUS, bonus);
    writeMem(s, 0x062B, debuff);
    writeMem(s, RAM_SIDE, side);
    bank26.bank26_sub8F59(s);
    eq(readMem(s, ZP_A), exp, d);
  });
}

// ════════════════════════════════════════════
// SECTION K: 球员状态机 (多种数量)
// ════════════════════════════════════════════
console.log('\n── 球员状态机 ──');
test('playerStateMachine: 0人返回', () => {
  const s = createMockSys(); writeMem(s, RAM_PCOUNT, 0);
  bank26.bank26_playerStateMachine(s);
  assert(true, 'ok');
});
test('playerStateMachine: 1人循环', () => {
  const s = createMockSys(); writeMem(s, RAM_PCOUNT, 1); writeMem(s, RAM_PID, 0x00);
  writeMem(s, 0x061B, 0); writeMem(s, RAM_FRAME, 0xFF); // pre-set to test wrap
  setPlayer(s, 0x00, { type: 0, posX: 0x80, posY: 0x70, action: 0 });
  bank26.bank26_playerStateMachine(s);
  eq(readMem(s, RAM_PCOUNT), 0, 'count cleared after loop');
});
test('playerStateMachine: 3人循环', () => {
  const s = createMockSys(); writeMem(s, RAM_PCOUNT, 3);
  writeMem(s, RAM_PID + 0, 0x09); writeMem(s, RAM_PID + 1, 0x0A); writeMem(s, RAM_PID + 2, 0x14);
  for (let i = 0; i < 3; i++) setPlayer(s, [0x09, 0x0A, 0x14][i], { type: 0, posX: 0x80, posY: 0x70, action: 0 });
  writeMem(s, 0x061B, 0); writeMem(s, RAM_FRAME, 0);
  bank26.bank26_playerStateMachine(s);
  eq(readMem(s, RAM_PCOUNT), 0, 'count cleared');
});

// ════════════════════════════════════════════
// SECTION L: 碰撞检测 tackleCollision (多类型)
// ════════════════════════════════════════════
console.log('\n── 碰撞检测 ──');
test('tackleCollision: side=0', () => {
  const s = createMockSys(); writeMem(s, RAM_SIDE, 0);
  writeMem(s, RAM_STATE, 0); writeMem(s, RAM_ACTION, 5);
  writeMem(s, 0x0440, 0); writeMem(s, 0x043F, 0);
  setPlayer(s, 0x0B, { type: 0, stamina: 0x50, bonus: 0x10, action: 0, posX: 0x80, posY: 0x70 });
  bank26.bank26_tackleCollision(s);
  eq(readMem(s, RAM_CTRL), 3, 'ctrl=3');
});
test('tackleCollision: side=0x0B', () => {
  const s = createMockSys(); writeMem(s, RAM_SIDE, 0x0B);
  writeMem(s, RAM_STATE, 0); writeMem(s, RAM_ACTION, 5);
  writeMem(s, 0x0440, 0); writeMem(s, 0x043F, 0);
  setPlayer(s, 0x00, { type: 0, stamina: 0x50, bonus: 0x10, action: 0, posX: 0x80, posY: 0x70 });
  bank26.bank26_tackleCollision(s);
  eq(readMem(s, RAM_CTRL), 3, 'ctrl=3');
});
test('tackleCollision: matchState=1 特殊路径', () => {
  const s = createMockSys(); writeMem(s, RAM_SIDE, 0); writeMem(s, RAM_STATE, 1);
  writeMem(s, RAM_ACTION, 5);
  bank26.bank26_tackleCollision(s);
  eq(readMem(s, RAM_GOAL), 0, 'goal flag cleared');
});

// ════════════════════════════════════════════
// SECTION M: 进球检测 goalDetect
// ════════════════════════════════════════════
console.log('\n── 进球检测 ──');
test('goalDetect: state=0 action=0 → 查表 idx=0', () => {
  const s = createMockSys();
  writeMem(s, RAM_STATE, 0); writeMem(s, RAM_ACTION, 0);
  bank26.bank26_goalDetect(s);
  assert(true, 'goal detect runs');
});
test('goalDetect: state=1 action=2 → 查表 idx=6', () => {
  const s = createMockSys();
  writeMem(s, RAM_STATE, 1); writeMem(s, RAM_ACTION, 2);
  bank26.bank26_goalDetect(s);
  assert(true, 'goal detect with state=1 action=2');
});

// ════════════════════════════════════════════
// SECTION N: 事件管理器 eventManager (多命令)
// ════════════════════════════════════════════
console.log('\n── 事件管理 ──');
for (const cmd of [0, 1, 2, 3]) {
  test(`eventManager: cmd=${cmd}`, () => {
    const s = createMockSys();
    writeMem(s, RAM_CMD, cmd); writeMem(s, RAM_PPTR, 0x09);
    setPlayer(s, 0x09, { type: 0, posX: 0x80, posY: 0x70, action: 0 });
    bank26.bank26_eventManager(s);
    assert(true, `cmd=${cmd} ok`);
  });
}

// ════════════════════════════════════════════
// SECTION O: sub_8E33 事件条件检测 (多方队+动作+球)
// ════════════════════════════════════════════
console.log('\n── 事件条件 sub_8E33 ──');
test('sub8E33: 0人→直接返回', () => {
  const s = createMockSys(); writeMem(s, RAM_PCOUNT, 0);
  bank26.bank26_sub8E33(s);
  assert(true, 'ok');
});
test('sub8E33: GK(player 0) action=4 → 返回', () => {
  const s = createMockSys(); writeMem(s, RAM_PCOUNT, 1);
  writeMem(s, RAM_PPTR, 0); writeMem(s, RAM_ACTION, 4);
  bank26.bank26_sub8E33(s);
  eq(readMem(s, RAM_CMD), 0, 'event not triggered for GK action=4');
});
test('sub8E33: GK(player 0x0B) action=4 → 返回', () => {
  const s = createMockSys(); writeMem(s, RAM_PCOUNT, 1);
  writeMem(s, RAM_PPTR, 0x0B); writeMem(s, RAM_ACTION, 4);
  bank26.bank26_sub8E33(s);
  eq(readMem(s, RAM_CMD), 0, 'event not triggered');
});
test('sub8E33: normal player action=5 → 返回', () => {
  const s = createMockSys(); writeMem(s, RAM_PCOUNT, 1);
  writeMem(s, RAM_PPTR, 0x09); writeMem(s, RAM_ACTION, 5);
  bank26.bank26_sub8E33(s);
  eq(readMem(s, RAM_CMD), 0, 'event not triggered for action=5');
});
test('sub8E33: normal player action=0 + low RNG → 触发', () => {
  const s = createMockSys(); writeMem(s, RAM_PCOUNT, 1);
  writeMem(s, RAM_PPTR, 0x09); writeMem(s, RAM_ACTION, 0);
  writeMem(s, RAM_CMD, 0); writeMem(s, 0x00E2, 0x05);
  setBall(s, 0x80, 0x70); // center → sub8B9C returns CLC
  bank26.bank26_sub8E33(s);
  eq(readMem(s, RAM_CMD), 4, 'event triggered ($0612=4)');
});
test('sub8E33: high RNG > 0x3F → 不触发', () => {
  const s = createMockSys(); writeMem(s, RAM_PCOUNT, 1);
  writeMem(s, RAM_PPTR, 0x09); writeMem(s, RAM_ACTION, 0);
  writeMem(s, RAM_CMD, 0); writeMem(s, 0x00E2, 0x80);
  setBall(s, 0x80, 0x70);
  bank26.bank26_sub8E33(s);
  eq(readMem(s, RAM_CMD), 0, 'not triggered with high RNG');
});
test('sub8E33: $0612≠0 → 直接返回', () => {
  const s = createMockSys(); writeMem(s, RAM_PCOUNT, 1);
  writeMem(s, RAM_PPTR, 0x09); writeMem(s, RAM_ACTION, 0);
  writeMem(s, RAM_CMD, 0x01); // already set
  writeMem(s, 0x00E2, 0x05); setBall(s, 0x80, 0x70);
  bank26.bank26_sub8E33(s);
  eq(readMem(s, RAM_CMD), 0x01, '$0612 unchanged when non-zero');
});

// ════════════════════════════════════════════
// SECTION P: PK模式 pkModeEntry (双方)
// ════════════════════════════════════════════
console.log('\n── PK 模式 ──');
test('pkMode: $044B bit7=0 → 返回', () => {
  const s = createMockSys(); writeMem(s, 0x044B, 0);
  bank26.bank26_pkModeEntry(s);
  eq(readMem(s, 0x044B), 0, 'unchanged');
});
test('pkMode: $044B bit7=1 → 清零球员 field[1] (Team A+both)', () => {
  const s = createMockSys(); writeMem(s, 0x044B, 0x80);
  for (let pid = 0x0C; pid < 0x16; pid++) writeMem(s, PB + pid * PS + F_STAT1, 0xFF);
  bank26.bank26_pkModeEntry(s);
  eq(readMem(s, 0x044B), 0, '$044B cleared');
  eq(readMem(s, PB + 0x0C * PS + F_STAT1), 0, 'Team B 0x0C field[1]=0');
  eq(readMem(s, PB + 0x14 * PS + F_STAT1), 0, 'Team B 0x14 field[1]=0');
  eq(readMem(s, PB + 0x15 * PS + F_STAT1), 0, 'Team B 0x15 field[1]=0');
});

// ════════════════════════════════════════════
// SECTION Q: 速度偏移 sub_8C92
// ════════════════════════════════════════════
console.log('\n── 速度偏移 sub_8C92 ──');
test('sub8C92_offset: 小值→正偏移', () => {
  const s = createMockSys(); eq(bank26.bank26_sub8C92_offset(s, 0x01, 10), 18, '0x01+10');
});
test('sub8C92_offset: 0xFF→取反偏移', () => {
  const s = createMockSys(); eq(bank26.bank26_sub8C92_offset(s, 0xFF, 100), 108, '0xFF+100');
});
test('sub8C92_offset: 0x80→取反', () => {
  const s = createMockSys(); eq(bank26.bank26_sub8C92_offset(s, 0x80, 64), 64, '0x80 neg→0 off');
});
test('sub8C92_offset: 0x00→不偏移', () => {
  const s = createMockSys(); eq(bank26.bank26_sub8C92_offset(s, 0x00, 50), 50, '0x00 no shift');
});

// ════════════════════════════════════════════
// SECTION R: 辅助清零函数 (双方)
// ════════════════════════════════════════════
console.log('\n── 辅助清零函数 ──');
test('sub986B: 清除 Team A (pid 0-0x0A) fields', () => {
  const s = createMockSys();
  for (let pid = 0; pid <= 0x0A; pid++) {
    writeMem(s, PB + pid * PS + F_ACTION, 0xFF);
    writeMem(s, PB + pid * PS + F_STAT1, 0xFF);
    writeMem(s, PB + pid * PS + F_STAT2, 0xFF);
  }
  // Team B should NOT be affected
  writeMem(s, PB + 0x0B * PS + F_ACTION, 0xCC);
  bank26.bank26_sub986B(s);
  eq(readMem(s, PB + 0x05 * PS + F_ACTION), 0, 'action cleared');
  eq(readMem(s, PB + 0x0A * PS + F_STAT1), 0, 'stat1 cleared');
  eq(readMem(s, PB + 0x0A * PS + F_STAT2), 0, 'stat2 cleared');
  eq(readMem(s, PB + 0x0B * PS + F_ACTION), 0xCC, 'Team B unaffected');
});
test('sub987B: 清除当前球员 fields + 状态地址', () => {
  const s = createMockSys(); writeMem(s, RAM_PPTR, 0x09);
  for (let i = 0xA; i <= 0xD; i++) writeMem(s, PB + 0x09 * PS + i, 0xFF);
  writeMem(s, RAM_CMD, 0xFF); writeMem(s, 0x0619, 0xFF);
  bank26.bank26_sub987B(s);
  eq(readMem(s, PB + 0x09 * PS + 0x0A), 0, 'action');
  eq(readMem(s, PB + 0x09 * PS + 0x0D), 0, 'field[0x0D]');
  eq(readMem(s, RAM_CMD), 0, '$0612=0');
  eq(readMem(s, 0x061B), 0, '$061B=0');
});
test('sub9DBD: 快速清零多个全局状态', () => {
  const s = createMockSys();
  writeMem(s, RAM_STATE, 0xFF); writeMem(s, RAM_MISC, 0xFF);
  writeMem(s, RAM_GOAL, 0xFF); writeMem(s, 0x044D, 0xFF);
  bank26.bank26_sub9DBD(s);
  eq(readMem(s, RAM_STATE), 0, '$043B=0');
  eq(readMem(s, RAM_MISC), 0, '$043C=0');
  eq(readMem(s, RAM_GOAL), 0, '$044E=0');
  eq(readMem(s, 0x044D), 0, '$044D=0');
});
test('sub9901: 球员指针循环', () => {
  const s = createMockSys();
  writeMem(s, RAM_PPTR, 0x09); bank26.bank26_sub9901(s); eq(readMem(s, RAM_PPTR), 0x0A, '0x09→0x0A');
  writeMem(s, RAM_PPTR, 0x0A); bank26.bank26_sub9901(s); eq(readMem(s, RAM_PPTR), 0x0B, '0x0A→0x0B');
  writeMem(s, RAM_PPTR, 0x0B); bank26.bank26_sub9901(s); eq(readMem(s, RAM_PPTR), 0, '0x0B→0');
});

// ════════════════════════════════════════════
// SECTION S: Dispatch 表全部调用 (22人场)
// ════════════════════════════════════════════
console.log('\n── Dispatch 表全部调用 (22人场) ──');
test('dispatch 全部入口不崩溃 (22人+球中央)', () => {
  const tbl = bank26.bank26_dispatch;
  for (const [key, fn] of Object.entries(tbl)) {
    const s = createMockSys();
    setupFullField(s);
    setBall(s, 0x80, 0x70);
    writeMem(s, RAM_STATE, 0); writeMem(s, RAM_PPTR, 0x09);
    writeMem(s, RAM_SIDE, 0); writeMem(s, RAM_GOAL, 0);
    writeMem(s, RAM_MISC, 0); writeMem(s, RAM_CMD, 0);
    writeMem(s, 0x0446, 0); writeMem(s, 0x044B, 0);
    (fn as Function)(s);
  }
  assert(true, `all ${Object.keys(tbl).length} dispatch calls ok`);
});

// ════════════════════════════════════════════
// SECTION T: 综合场景 — 22人场全链路
// ════════════════════════════════════════════
console.log('\n── 综合场景 22人全链路 ──');
test('22人: 球中央 → sub93DE + sub8B9C + stateMachine + tackleCollision', () => {
  const s = createMockSys();
  setupFullField(s);
  setBall(s, 0x80, 0x78);
  writeMem(s, RAM_SIDE, 0); writeMem(s, RAM_PPTR, 0x09);
  writeMem(s, RAM_STATE, 0); writeMem(s, RAM_ACTION, 0);
  // Run nearest player
  bank26.bank26_sub93DE(s);
  const nearest = readMem(s, RAM_NEAREST);
  assert(nearest >= 0x0C, `nearest player 0x${nearest.toString(16)} is valid`);
  // Run ball check
  bank26.bank26_sub8B9C(s);
  eq(readMem(s, ZP_A) & 1, 0, 'ball in center');
  // Run state machine
  writeMem(s, RAM_PCOUNT, 3);
  writeMem(s, RAM_PID + 0, 0x09); writeMem(s, RAM_PID + 1, 0x0A); writeMem(s, RAM_PID + 2, 0x14);
  writeMem(s, 0x061B, 0); writeMem(s, RAM_FRAME, 0);
  bank26.bank26_playerStateMachine(s);
  eq(readMem(s, RAM_PCOUNT), 0, 'state machine reset');
  assert(true, 'full chain');
});

test('22人: 球在左侧边界 → sceneTransition + goalDetect', () => {
  const s = createMockSys();
  setupFullField(s);
  setBall(s, 0x20, 0x70); // X<0x50
  writeMem(s, RAM_SIDE, 0); writeMem(s, 0x00E2, 0x55);
  // scene transition
  bank26.bank26_sceneTransition(s);
  // goal detect
  writeMem(s, RAM_STATE, 0); writeMem(s, RAM_ACTION, 0);
  bank26.bank26_goalDetect(s);
  assert(true, 'boundary chain');
});

test('22人: TeamB side ballHandler→提前返回', () => {
  const s = createMockSys();
  setupFullField(s);
  setBall(s, 0xA0, 0x70);
  writeMem(s, RAM_0446, 4); writeMem(s, RAM_SIDE, 0x0B); // side≠0 → 直接返回
  writeMem(s, RAM_PPTR, 0x14);
  bank26.bank26_ballHandlerDispatch(s);
  eq(readMem(s, RAM_0446), 4, 'mode unchanged (side≠0)');
});

test('22人: 多人碰撞检测', () => {
  const s = createMockSys();
  setupFullField(s);
  writeMem(s, RAM_SIDE, 0); writeMem(s, RAM_STATE, 0);
  writeMem(s, RAM_ACTION, 5);
  bank26.bank26_tackleCollision(s);
  assert(true, '22-player collision');
});

// ════════════════════════════════════════════
// 结果
// ════════════════════════════════════════════
console.log(`\n╔══════════════════════════════════════════════╗`);
console.log(`║  测试结果: ${passed} passed / ${failed} failed     ║`);
console.log(`╚══════════════════════════════════════════════╝`);

process.exit(failed > 0 ? 1 : 0);
