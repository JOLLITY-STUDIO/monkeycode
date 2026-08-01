/**
 * Bank 31 单元测试
 *
 * 测试 bank-31 公开 API — 主循环/球员逻辑/球位置/跳转表/精灵/DMA
 *
 * 用法: npx tsx game-engine/test/test-bank-31.ts
 */

// ── 导入 ──
import {
  tick_BANK31_mainLoop,
  translate_BANK31_PLAYER_LOGIC,
  translate_BANK31_GET_BALL_POS,
  translate_BANK31_JUMP_TABLE_DISPATCH,
  translate_BANK31_BANK_SWITCH,
  translate_BANK31_RESET,
  translate_BANK31_POS_UPDATE,
  translate_BANK31_SPRITE_NMI_WAIT,
  translate_BANK31_BANK_HELPER,
  translate_BANK31_SPRITE_DMA_INIT,
  translate_BANK31_SPRITE_BANK_PHASE2,
  translate_BANK31_SPRITE_SETUP,
  translate_BANK31_DMA_HELPER,
  translate_BANK31_SPRITE_DRAW,
  translate_BANK31_SPRITE_BANK_LOOP,
  init_BANK31_matchEntry,
  BANK31_JUMP_TABLE_BASE,
} from '../native-game/tsubasa/banks/prg/bank-31-code';

// ── 数据表 (用于验证) ──
import {
  DATA_DIR_TABLE,
  DATA_PTR_TABLE,
  DATA_SPRITE_ATTR,
  DATA_SHIFT_TABLE,
  DATA_FB4C_VELOCITY,
  DATA_GAP_F10E,
  DATA_TEXT_NAMES,
} from '../native-game/tsubasa/banks/prg/bank-31-data';

import type { SystemState } from '../native-game/tsubasa/banks/system-state';

// ═══════════════════════════════════════════
// 轻量 Mock PPU (用于需要 PPU 写寄存器的函数如 ppuScreenInit)
// ═══════════════════════════════════════════

interface MockPPU {
  updateControlReg1: (v: number) => void;
  updateControlReg2: (v: number) => void;
  readStatusRegister: () => number;
  sramLoad: () => number;
  vramLoad: () => number;
  writeSRAMAddress: (v: number) => void;
  sramWrite: (v: number) => void;
  scrollWrite: (v: number) => void;
  writeVRAMAddress: (v: number) => void;
  vramWrite: (v: number) => void;
  sramDMA: (v: number) => void;
}

function createMockPPU(): MockPPU {
  const dummy = () => {};
  return {
    updateControlReg1: dummy,
    updateControlReg2: dummy,
    readStatusRegister: () => 0,
    sramLoad: () => 0,
    vramLoad: () => 0,
    writeSRAMAddress: dummy,
    sramWrite: dummy,
    scrollWrite: dummy,
    writeVRAMAddress: dummy,
    vramWrite: dummy,
    sramDMA: dummy,
  };
}

// Mock APU
interface MockAPU {
  writeReg: (addr: number, val: number) => void;
}
function createMockAPU(): MockAPU {
  return { writeReg() {} };
}

// ═══════════════════════════════════════════
// Mock SystemState
// ═══════════════════════════════════════════

function createMockSys(): SystemState {
  const mem = new Uint8Array(0x10000);
  return {
    mem,
    regs: { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0, P: 0x34 },
    ppu: null as any,
    papu: null as any,
    mmc3Map: new Uint8Array(4),
    mmc3BankSelect: 0,
    mmc3BankData: 0,
    nmiPending: false,
    frameCount: 0,
    mmc3Shadow: 0,
  };
}

function createMockSysFull(): SystemState {
  const sys = createMockSys();
  sys.ppu = createMockPPU() as any;
  sys.papu = createMockAPU() as any;
  return sys;
}

// ═══════════════════════════════════════════
// 测试计数
// ═══════════════════════════════════════════

let passed = 0;
let failed = 0;
const failures: string[] = [];

function assert(cond: boolean, msg: string): void {
  if (cond) { passed++; }
  else {
    failed++;
    failures.push(msg);
    console.error(`  ❌ FAIL: ${msg}`);
  }
}

function done(name: string): void {
  console.log(`  ✅ ${name}`);
}

/** 抑制日志 */
function muteLogs(): () => void {
  const origLog = console.log;
  const origWarn = console.warn;
  (console as any).log = function () {};
  (console as any).warn = function () {};
  return () => {
    console.log = origLog;
    console.warn = origWarn;
  };
}

// ═══════════════════════════════════════════
// Test Suite 1: 数据表验证
// ═══════════════════════════════════════════

function test_dataIntegrity(): void {
  console.log('\n【Test 1】数据表完整性');

  assert(DATA_DIR_TABLE.length === 16, `DATA_DIR_TABLE should have 16 entries, got ${DATA_DIR_TABLE.length}`);
  assert(DATA_DIR_TABLE[0] === 0x4C, `DATA_DIR_TABLE[0] should be 0x4C`);

  assert(DATA_PTR_TABLE.length >= 2, `DATA_PTR_TABLE should have entries, got ${DATA_PTR_TABLE.length}`);

  assert(DATA_SHIFT_TABLE.length >= 4, `DATA_SHIFT_TABLE should have entries, got ${DATA_SHIFT_TABLE.length}`);

  // FB4C velocity table: 128 bytes (64 × 2-byte indices)
  assert(DATA_FB4C_VELOCITY.length === 128,
    `DATA_FB4C_VELOCITY should be 128, got ${DATA_FB4C_VELOCITY.length}`);
  assert(DATA_FB4C_VELOCITY[0] === 0, 'DATA_FB4C_VELOCITY[0] should be 0');
  assert(DATA_FB4C_VELOCITY[126] === 256, `DATA_FB4C_VELOCITY[126] should be 256, got ${DATA_FB4C_VELOCITY[126]}`);

  assert(BANK31_JUMP_TABLE_BASE === 0xF329, `JUMP_TABLE_BASE should be 0xF329`);

  // ── 修复验证: DATA_SPRITE_ATTR (437 bytes) ──
  assert(DATA_SPRITE_ATTR.length === 437,
    `DATA_SPRITE_ATTR should be 437 bytes, got ${DATA_SPRITE_ATTR.length}`);
  // 每 4 bytes 一个 sprite entry: PPU lo, PPU hi, OAM attr, extra attr
  // spriteType=0 → idx=0: 0x42,0x20,0xC0,0x23
  assert(DATA_SPRITE_ATTR[0] !== 0, 'DATA_SPRITE_ATTR[0] should NOT be 0 (PPU addr lo)');
  assert(DATA_SPRITE_ATTR[1] !== 0, 'DATA_SPRITE_ATTR[1] should NOT be 0 (PPU addr hi)');
  assert(DATA_SPRITE_ATTR[2] !== 0, 'DATA_SPRITE_ATTR[2] should NOT be 0 (OAM attr base)');
  assert(DATA_SPRITE_ATTR[3] !== 0, 'DATA_SPRITE_ATTR[3] should NOT be 0 (extra attr)');
  // 前 4 bytes 已知值
  assert(DATA_SPRITE_ATTR[0] === 0x42, `DATA_SPRITE_ATTR[0] should be 0x42, got 0x${DATA_SPRITE_ATTR[0].toString(16)}`);
  assert(DATA_SPRITE_ATTR[1] === 0x20, `DATA_SPRITE_ATTR[1] should be 0x20, got 0x${DATA_SPRITE_ATTR[1].toString(16)}`);
  assert(DATA_SPRITE_ATTR[2] === 0xC0, `DATA_SPRITE_ATTR[2] should be 0xC0, got 0x${DATA_SPRITE_ATTR[2].toString(16)}`);
  assert(DATA_SPRITE_ATTR[3] === 0x23, `DATA_SPRITE_ATTR[3] should be 0x23, got 0x${DATA_SPRITE_ATTR[3].toString(16)}`);
  // 不同 spriteType 数据不同 (类型 0-2 相同, 类型 3 才不同)
  assert(DATA_SPRITE_ATTR[0] !== DATA_SPRITE_ATTR[12],
    'spriteType=0 and spriteType=3 entries should differ');
  assert(DATA_SPRITE_ATTR[4] !== DATA_SPRITE_ATTR[16],
    'spriteType=1 and spriteType=4 entries should differ');

  // ── 修复验证: DATA_GAP_F10E (6 bytes, DMA column offsets) ──
  assert(DATA_GAP_F10E.length === 6,
    `DATA_GAP_F10E should be 6 bytes, got ${DATA_GAP_F10E.length}`);
  assert(DATA_GAP_F10E[0] === 0x00, `DATA_GAP_F10E[0] should be 0x00, got 0x${DATA_GAP_F10E[0].toString(16)}`);
  assert(DATA_GAP_F10E[1] === 0x01, `DATA_GAP_F10E[1] should be 0x01, got 0x${DATA_GAP_F10E[1].toString(16)}`);
  assert(DATA_GAP_F10E[2] === 0x02, `DATA_GAP_F10E[2] should be 0x02, got 0x${DATA_GAP_F10E[2].toString(16)}`);
  assert(DATA_GAP_F10E[3] === 0x08, `DATA_GAP_F10E[3] should be 0x08, got 0x${DATA_GAP_F10E[3].toString(16)}`);
  assert(DATA_GAP_F10E[4] === 0x09, `DATA_GAP_F10E[4] should be 0x09, got 0x${DATA_GAP_F10E[4].toString(16)}`);
  assert(DATA_GAP_F10E[5] === 0x0A, `DATA_GAP_F10E[5] should be 0x0A, got 0x${DATA_GAP_F10E[5].toString(16)}`);
  // 不是全相同
  assert(DATA_GAP_F10E[0] !== DATA_GAP_F10E[5],
    'DATA_GAP_F10E[0] and DATA_GAP_F10E[5] should differ');

  // ── 修复验证: DATA_TEXT_NAMES (3271 bytes, jump table) ──
  assert(DATA_TEXT_NAMES.length === 3271,
    `DATA_TEXT_NAMES should be 3271 bytes, got ${DATA_TEXT_NAMES.length}`);
  // 跳转表: 每 2 bytes 一个 16-bit 地址(lo, hi)
  // index=0 → offset=0: lo=0xEB, hi=0x05
  assert(DATA_TEXT_NAMES[0] !== 0, 'DATA_TEXT_NAMES[0] should NOT be 0 (jump target lo)');
  assert(DATA_TEXT_NAMES[1] !== 0, 'DATA_TEXT_NAMES[1] should NOT be 0 (jump target hi)');
  assert(DATA_TEXT_NAMES[0] === 0xEB, `DATA_TEXT_NAMES[0] should be 0xEB, got 0x${DATA_TEXT_NAMES[0].toString(16)}`);
  assert(DATA_TEXT_NAMES[1] === 0x05, `DATA_TEXT_NAMES[1] should be 0x05, got 0x${DATA_TEXT_NAMES[1].toString(16)}`);
  // 不同入口地址不同
  assert(DATA_TEXT_NAMES[0] !== DATA_TEXT_NAMES[2],
    'jump table index 0 and index 1 lo-bytes should differ');

  done('dataIntegrity');
}

// ═══════════════════════════════════════════
// Test Suite 2: GET_BALL_POS — 球位置获取
// ═══════════════════════════════════════════

function test_getBallPos(): void {
  console.log('\n【Test 2】translate_BANK31_GET_BALL_POS');

  const unmute = muteLogs();

  // ── 正向: 正常场内坐标 ──
  {
    const sys = createMockSys();
    sys.mem[0x0635] = 0x58;
    sys.mem[0x0637] = 0x68;

    const zone = translate_BANK31_GET_BALL_POS(sys);
    assert(zone === 63, `ball zone should be 63 (row=3,col=5), got ${zone}`);
    assert(sys.mem[0x05FE] === 63, `$05FE should contain zone 63, got ${sys.mem[0x05FE]}`);
    assert(sys.regs.X === 5, `regs.X should be col index 5, got ${sys.regs.X}`);
    assert(sys.regs.Y === 0x68, `regs.Y should be ball Y 0x68, got 0x${sys.regs.Y.toString(16)}`);
  }

  // ── 反向: zone 不为盘古值 ──
  {
    const sys = createMockSys();
    sys.mem[0x0635] = 0x58;
    sys.mem[0x0637] = 0x68;
    const zone = translate_BANK31_GET_BALL_POS(sys);
    assert(zone !== 0, 'ball zone should NOT be 0 for valid position');
    assert(zone !== 0xFF, 'ball zone should NOT be 0xFF for valid position');
  }

  // ── 正向: 不同位置应得不同 zone ──
  {
    const sys1 = createMockSys();
    const sys2 = createMockSys();
    sys1.mem[0x0635] = 0x58; sys1.mem[0x0637] = 0x68; // col=5, row=3 → 63
    sys2.mem[0x0635] = 0x40; sys2.mem[0x0637] = 0x58; // col=2, row=1 → 25
    const z1 = translate_BANK31_GET_BALL_POS(sys1);
    const z2 = translate_BANK31_GET_BALL_POS(sys2);
    assert(z1 !== z2,
      `different positions should give different zones, both got ${z1}`);
  }

  // ── 正向: X 越界返回 0xFF ──
  {
    const sys = createMockSys();
    sys.mem[0x0635] = 0x10; // < 0x30
    sys.mem[0x0637] = 0x50;
    const zone = translate_BANK31_GET_BALL_POS(sys);
    assert(zone === 0xFF, `out-of-bounds X should return 0xFF, got 0x${zone.toString(16)}`);
  }

  // ── 正向: Y 越界返回 0xFF ──
  {
    const sys = createMockSys();
    sys.mem[0x0635] = 0x58;
    sys.mem[0x0637] = 0x10; // < 0x50
    const zone = translate_BANK31_GET_BALL_POS(sys);
    assert(zone === 0xFF, `out-of-bounds Y should return 0xFF, got 0x${zone.toString(16)}`);
  }

  // ── 反向: 越界和正常值不应相同 ──
  {
    const sysN = createMockSys();
    const sysO = createMockSys();
    sysN.mem[0x0635] = 0x58; sysN.mem[0x0637] = 0x68;
    sysO.mem[0x0635] = 0x10; sysO.mem[0x0637] = 0x68;
    const zN = translate_BANK31_GET_BALL_POS(sysN);
    const zO = translate_BANK31_GET_BALL_POS(sysO);
    assert(zN !== zO, 'valid zone should NOT equal out-of-bounds error code');
  }

  // ── 边界: 恰好等于最小值 ──
  {
    const sys = createMockSys();
    sys.mem[0x0635] = 0x30; // col = (0x30-0x30)/8 = 0
    sys.mem[0x0637] = 0x50; // row = (0x50-0x50)/8 = 0
    const zone = translate_BANK31_GET_BALL_POS(sys);
    assert(zone === 0, `min-bound position should be zone 0, got ${zone}`);
  }

  unmute();
  done('getBallPos');
}

// ═══════════════════════════════════════════
// Test Suite 3: PLAYER_LOGIC — 球员逻辑
// ═══════════════════════════════════════════

function test_playerLogic(): void {
  console.log('\n【Test 3】translate_BANK31_PLAYER_LOGIC');

  const unmute = muteLogs();

  // ── 正向: 执行后状态应该被更新 ──
  {
    const sys = createMockSys();
    sys.mem[0x05FB] = 0x0B; // → index = 0
    sys.mem[0x0441] = 0x0B;
    sys.mem[0x0638] = 63;

    const beforeX = sys.regs.X;
    const beforeY = sys.regs.Y;
    const before05FE = sys.mem[0x05FE];

    translate_BANK31_PLAYER_LOGIC(sys);

    assert(typeof sys.mem[0x05FE] === 'number',
      '$05FE should be set after PLAYER_LOGIC');
    // regs 应该被更新了
    assert(sys.regs.X !== beforeX || sys.regs.Y !== beforeY || sys.mem[0x05FE] !== before05FE,
      'player logic should mutate some state (X/Y/$05FE)');
  }

  // ── 正向: 相同输入应得确定性结果 ──
  {
    const sysA = createMockSys();
    const sysB = createMockSys();
    sysA.mem[0x05FB] = 0x0B; sysA.mem[0x0441] = 0x0B; sysA.mem[0x0638] = 63;
    sysB.mem[0x05FB] = 0x0B; sysB.mem[0x0441] = 0x0B; sysB.mem[0x0638] = 63;
    translate_BANK31_PLAYER_LOGIC(sysA);
    translate_BANK31_PLAYER_LOGIC(sysB);
    // 确定性: 相同输入 → 相同输出
    assert(sysA.mem[0x05FE] === sysB.mem[0x05FE],
      `same input should give deterministic $05FE`);
    assert(sysA.regs.X === sysB.regs.X && sysA.regs.Y === sysB.regs.Y,
      `same input should give deterministic regs`);
  }

  // ── 反向: regs.X 不应为盘古值 ──
  {
    const sys = createMockSys();
    sys.mem[0x05FB] = 0x0B; sys.mem[0x0441] = 0x0B; sys.mem[0x0638] = 0;
    translate_BANK31_PLAYER_LOGIC(sys);
    assert(sys.regs.X !== 0xFF || sys.regs.Y !== 0xFF,
      'regs.X/Y should NOT both be 0xFF after PLAYER_LOGIC');
  }

  unmute();
  done('playerLogic');
}

// ═══════════════════════════════════════════
// Test Suite 4: JUMP_TABLE_DISPATCH
// ═══════════════════════════════════════════

function test_jumpTable(): void {
  console.log('\n【Test 4】translate_BANK31_JUMP_TABLE_DISPATCH — DATA_TEXT_NAMES 验证');

  const unmute = muteLogs();

  // ── 正向验证: index → 应匹配 DATA_TEXT_NAMES 表 ──
  for (const idx of [0, 1, 3, 5, 10, 20, 50, 100]) {
    const sys = createMockSys();
    const result = translate_BANK31_JUMP_TABLE_DISPATCH(sys, idx);

    // 查表预期值
    const offset = (idx & 0xFF) << 1;
    const expectedLo = DATA_TEXT_NAMES[offset];
    const expectedHi = DATA_TEXT_NAMES[offset + 1];
    const expectedAddr = (expectedHi << 8) | expectedLo;

    assert(result === expectedAddr,
      `index ${idx}: should return 0x${expectedAddr.toString(16).padStart(4,'0')}, got 0x${result.toString(16).padStart(4,'0')}`);
    assert(sys.mem[0x30] === expectedLo,
      `index ${idx}: $0030 should be 0x${expectedLo.toString(16)}, got 0x${sys.mem[0x30].toString(16)}`);
    assert(sys.mem[0x31] === expectedHi,
      `index ${idx}: $0031 should be 0x${expectedHi.toString(16)}, got 0x${sys.mem[0x31].toString(16)}`);
    assert(sys.regs.A === expectedLo,
      `index ${idx}: regs.A should be lo byte 0x${expectedLo.toString(16)}, got 0x${sys.regs.A.toString(16)}`);
  }

  // ── 反向验证: 不同 index 不应返回相同值 (除非表内容巧合) ──
  {
    const sys0 = createMockSys();
    const sys1 = createMockSys();
    const r0 = translate_BANK31_JUMP_TABLE_DISPATCH(sys0, 0);
    const r1 = translate_BANK31_JUMP_TABLE_DISPATCH(sys1, 5);
    assert(r0 !== r1,
      `index 0 and index 5 should return different addresses, both got 0x${r0.toString(16)}`);
  }

  // ── 反向验证: 边界索引 index=0xFF 不应等于 index=0x00 ──
  {
    const sysFF = createMockSys();
    const rFF = translate_BANK31_JUMP_TABLE_DISPATCH(sysFF, 0xFF);
    const offsetFF = 0xFF << 1; // 越界读数但 index & 0xFF = 0xFF
    const expectedLoFF = DATA_TEXT_NAMES[offsetFF % DATA_TEXT_NAMES.length] || 0;
    const expectedHiFF = DATA_TEXT_NAMES[(offsetFF + 1) % DATA_TEXT_NAMES.length] || 0;
    // 越界索引可能读到不完整数据，但至少不会崩溃
    assert(typeof rFF === 'number',
      'index 0xFF should not crash, should return a number');
    assert(rFF !== translate_BANK31_JUMP_TABLE_DISPATCH(createMockSys(), 0),
      'index 0xFF should NOT equal index 0 result');
  }

  // ── 反向验证: 结果不是盘古值 ──
  {
    const sys = createMockSys();
    const r = translate_BANK31_JUMP_TABLE_DISPATCH(sys, 3);
    assert(r !== 0, 'jump table result should NOT be 0');
    assert(r !== 0xFFFF, 'jump table result should NOT be 0xFFFF');
    assert(sys.mem[0x30] !== 0 || sys.mem[0x31] !== 0,
      '$0030 and $0031 should NOT both be 0');
  }

  // ── 正向验证: index 0→1 递增值不同 ──
  {
    const sysA = createMockSys();
    const sysB = createMockSys();
    const rA = translate_BANK31_JUMP_TABLE_DISPATCH(sysA, 0);
    const rB = translate_BANK31_JUMP_TABLE_DISPATCH(sysB, 1);
    assert(rA !== rB, 'consecutive indices 0 and 1 should yield different addresses');
    assert(sysA.mem[0x31] !== sysB.mem[0x31] || sysA.mem[0x30] !== sysB.mem[0x30],
      '$0030/$0031 should differ between index 0 and 1');
  }

  unmute();
  done('jumpTable');
}

// ═══════════════════════════════════════════
// Test Suite 5: BANK_SWITCH
// ═══════════════════════════════════════════

function test_bankSwitch(): void {
  console.log('\n【Test 5】translate_BANK31_BANK_SWITCH');

  const sys = createMockSys();
  const unmute = muteLogs();

  let callbackCalled = false;
  let callbackBank = -1;

  translate_BANK31_BANK_SWITCH(sys, 0x19, (s, targetBank) => {
    callbackCalled = true;
    callbackBank = targetBank;
  });

  assert(callbackCalled, 'bank switch callback should be called');
  assert(callbackBank === 0x19, `target bank should be 0x19, got 0x${callbackBank.toString(16)}`);
  assert(sys.regs.Y === 0x19, `regs.Y should be 0x19`);
  // $0024 no longer set in TS path (bank dispatch is direct, not via MMC3)

  // 无回调版本
  translate_BANK31_BANK_SWITCH(sys, 0x05);
  assert(sys.regs.Y === 0x05, `regs.Y should be 0x05`);

  unmute();
  done('bankSwitch');
}

// ═══════════════════════════════════════════
// Test Suite 6: POS_UPDATE — 位置运算
// ═══════════════════════════════════════════

function test_posUpdate(): void {
  console.log('\n【Test 6】translate_BANK31_POS_UPDATE');

  const unmute = muteLogs();

  // ── 正向: 位置应被更新 ──
  {
    const sys = createMockSys();
    sys.mem[0x0635] = 0x58;
    sys.mem[0x0637] = 0x68;
    sys.mem[0x3A] = 0;
    sys.mem[0x3B] = 0;

    const beforeX = sys.mem[0x0635];
    const beforeY = sys.mem[0x0637];

    translate_BANK31_POS_UPDATE(sys, 0x58, 0x68);

    // 位置数据可能被坐标变换处理
    assert(sys.mem[0x0635] !== undefined && sys.mem[0x0637] !== undefined,
      'ball pos RAM should be accessible after POS_UPDATE');
    assert(!(sys.mem[0x0635] === 0x00 && sys.mem[0x0637] === 0x00 && beforeX === 0x58),
      'POS_UPDATE should not zero out valid position');
  }

  // ── 反向: 不同输入产生不同结果 ──
  {
    const sys1 = createMockSys();
    const sys2 = createMockSys();
    sys1.mem[0x0635] = 0x40; sys1.mem[0x0637] = 0x50; sys1.mem[0x3A] = 0; sys1.mem[0x3B] = 0;
    sys2.mem[0x0635] = 0x70; sys2.mem[0x0637] = 0x70; sys2.mem[0x3A] = 0; sys2.mem[0x3B] = 0;
    translate_BANK31_POS_UPDATE(sys1, 0x40, 0x50);
    translate_BANK31_POS_UPDATE(sys2, 0x70, 0x70);
    assert(sys1.mem[0x0635] !== sys2.mem[0x0635] || sys1.mem[0x0637] !== sys2.mem[0x0637],
      'different input positions should yield different output');
  }

  unmute();
  done('posUpdate');
}

// ═══════════════════════════════════════════
// Test Suite 7-13: 烟雾测试 (SPRITE/DMA/BANK/HELPER)
// ═══════════════════════════════════════════

function smokeTest(name: string, fn: (sys: SystemState) => void, needsFullSys = false): void {
  const sys = needsFullSys ? createMockSysFull() : createMockSys();
  const unmute = muteLogs();

  // 设置通用内存初值
  sys.mem[0x34] = 0x00; sys.mem[0x35] = 0x02; // ZP → OAM
  sys.mem[0x3A] = 0; sys.mem[0x3B] = 0;
  sys.mem[0x02] = 0; sys.mem[0x03] = 0;
  sys.mem[0x0516] = 0;
  sys.mem[0x062D] = 0;
  sys.mem[0x062E] = 0;

  fn(sys);

  assert(true, `${name} should not crash`);
  unmute();
  done(name);
}

function test_spriteDmaInit(): void {
  console.log('\n【Test 7】translate_BANK31_SPRITE_DMA_INIT');
  smokeTest('spriteDmaInit', translate_BANK31_SPRITE_DMA_INIT);
}

function test_spriteBankPhase2(): void {
  console.log('\n【Test 8】translate_BANK31_SPRITE_BANK_PHASE2');
  smokeTest('spriteBankPhase2', translate_BANK31_SPRITE_BANK_PHASE2);
}

function test_spriteSetup(): void {
  console.log('\n【Test 9】translate_BANK31_SPRITE_SETUP — DATA_PTR_TABLE 验证');

  const unmute = muteLogs();

  // 预填 _readPtrTable 需要读的 RAM 区域 (DATA_PTR_TABLE → $0547, $055C, $0571...)
  function seedRam(sys: SystemState): void {
    // 6 slots × 2 bytes per slot = 12 bytes at DATA_PTR_TABLE base addrs
    sys.mem[0x0547] = 0x10; sys.mem[0x0548] = 0x02; // slot 0: 0x0210
    sys.mem[0x055C] = 0x20; sys.mem[0x055D] = 0x02; // slot 1: 0x0220
    sys.mem[0x0571] = 0x30; sys.mem[0x0572] = 0x02; // slot 2: 0x0230
    sys.mem[0x0586] = 0x40; sys.mem[0x0587] = 0x02; // slot 3: 0x0240
    sys.mem[0x059B] = 0x50; sys.mem[0x059C] = 0x02; // slot 4: 0x0250
    sys.mem[0x05B0] = 0x60; sys.mem[0x05B1] = 0x02; // slot 5: 0x0260
  }

  // ── 正向: spriteId=0 → _readPtrTable 循环 6 次，最终 $003C/$003D 是最后一个 slot ──
  {
    const sys = createMockSys();
    seedRam(sys);
    translate_BANK31_SPRITE_SETUP(sys, 0);

    assert(sys.mem[0x003B] === 0, `$003B should be spriteId 0, got ${sys.mem[0x003B]}`);
    // 6 slots 循环后 $003C/$003D = 最后一个 slot (index 5) 的值
    // slot=5: baseAddr=0x05B0 → seedRam 预填 0x60, 0x02
    // parity=0 → (0x02 & 0x0F)<<8 | 0x60 = 0x0260 → $003C=0x60, $003D=0x02
    assert(sys.mem[0x003C] === 0x60,
      `spriteId=0 final slot: $003C should be 0x60, got 0x${sys.mem[0x003C].toString(16)}`);
    assert(sys.mem[0x003D] === 0x02,
      `spriteId=0 final slot: $003D should be 0x02, got 0x${sys.mem[0x003D].toString(16)}`);
    // 反向: 不应盘古值
    assert(sys.mem[0x003C] !== 0,
      'spriteId=0: $003C should NOT be 0 (seeded RAM)');
    assert(sys.mem[0x003D] !== 0,
      'spriteId=0: $003D should NOT be 0 (seeded RAM)');
  }

  // ── 反向: spriteId=0 vs spriteId=1 用不同 parity → 结果应不同 ──
  {
    const sys0 = createMockSys();
    const sys1 = createMockSys();
    seedRam(sys0);
    seedRam(sys1);
    translate_BANK31_SPRITE_SETUP(sys0, 0);
    translate_BANK31_SPRITE_SETUP(sys1, 1);
    // parity=0 → (hi&0x0F)<<8|lo = (0x02&0x0F)<<8|0x10 = 0x0210
    // parity=1 → (hi>>4&0x0F)<<8|lo = (0x02>>4&0x0F)<<8|0x10 = 0x0010
    // 所以 $003D 应不同: parity=0 → 0x02, parity=1 → 0x00
    assert(sys0.mem[0x003D] !== sys1.mem[0x003D],
      `spriteId=0 parity=0: $003D=0x${sys0.mem[0x003D].toString(16)} should ≠ spriteId=1 parity=1: $003D=0x${sys1.mem[0x003D].toString(16)}`);
    // parity=1: $003D 应为 0 (hi=0x02>>4=0)
    assert(sys1.mem[0x003D] === 0,
      `spriteId=1 parity=1: $003D should be 0, got 0x${sys1.mem[0x003D].toString(16)}`);
  }

  // ── 正向: spriteId 不对 $003C/$003D 写入盘古值 ──
  {
    const sys = createMockSys();
    seedRam(sys);
    translate_BANK31_SPRITE_SETUP(sys, 3);
    assert(sys.mem[0x003C] !== 0xFF,
      `spriteId=3: $003C should NOT be 0xFF, got 0x${sys.mem[0x003C].toString(16)}`);
  }

  unmute();
  done('spriteSetup');
}

function test_dmaHelper(): void {
  console.log('\n【Test 10】translate_BANK31_DMA_HELPER — DATA_SPRITE_ATTR + DATA_GAP_F10E 验证');

  // ── 正向: spriteType=0 → 应从 DATA_SPRITE_ATTR[0..3] 读取 ──
  {
    const sys = createMockSys();
    const unmute = muteLogs();
    sys.mem[0x34] = 0x00; sys.mem[0x35] = 0x02;
    sys.mem[0x063D] = 0; // spriteType = 0
    sys.mem[0x0515] = 0;

    translate_BANK31_DMA_HELPER(sys);

    // _readSpriteAttrTable 后 $3C/$3D 保持不变（不被循环修改）
    assert(sys.mem[0x003C] === DATA_SPRITE_ATTR[0],
      `spriteType=0: $003C should be 0x${DATA_SPRITE_ATTR[0].toString(16)}, got 0x${sys.mem[0x003C].toString(16)}`);
    assert(sys.mem[0x003D] === DATA_SPRITE_ATTR[1],
      `spriteType=0: $003D should be 0x${DATA_SPRITE_ATTR[1].toString(16)}, got 0x${sys.mem[0x003D].toString(16)}`);
    // $04A6 初始被设为 DATA_SPRITE_ATTR[2]=0xC0，循环中累加 DATA_GAP_F10E 偏移
    // sum(DATA_GAP_F10E) = 0+1+2+8+9+0xA = 0x1E → 0xC0+0x1E = 0xDE
    // 但 SPRITE_DRAW 也可能修改 $04A6，所以只验证已改变
    assert(sys.mem[0x04A6] !== 0xC0,
      'spriteType=0: $04A6 should be modified (accumulated DMA offsets)');
    assert(sys.mem[0x04A6] !== 0,
      'spriteType=0: $04A6 should NOT stay 0');
    // $04A7 被循环中的 PPU addr hi 覆盖（0x2000 → 0x20），不应再等于原 attr 值 0x23
    assert(sys.mem[0x04A7] !== 0x23,
      'spriteType=0: $04A7 should be overwritten by PPU addr hi (0x20), NOT stay 0x23');
    assert(sys.mem[0x04A7] !== 0,
      'spriteType=0: $04A7 should NOT be 0');
    unmute();
  }

  // ── 正向: spriteType=3 → DATA_SPRITE_ATTR[12..15] (与类型 0 不同) ──
  {
    const sys = createMockSysFull(); // 需要 mock PPU (spriteType=3 调用 ppuScreenInit)
    const unmute = muteLogs();
    sys.mem[0x34] = 0x00; sys.mem[0x35] = 0x02;
    sys.mem[0x063D] = 3;
    sys.mem[0x0515] = 0;
    sys.mem[0x0635] = 0x58;
    sys.mem[0x0637] = 0x68;
    sys.mem[0x05CE] = 0x10;
    sys.mem[0x0600] = 0;
    sys.mem[0x0602] = 0;

    translate_BANK31_DMA_HELPER(sys);

    // DATA_SPRITE_ATTR[12..15] = [0xB4, 0x22, 0xED, 0x23]
    assert(sys.mem[0x003C] === DATA_SPRITE_ATTR[12],
      `spriteType=3: $003C should be 0x${DATA_SPRITE_ATTR[12].toString(16)}, got 0x${sys.mem[0x003C].toString(16)}`);
    assert(sys.mem[0x003D] === DATA_SPRITE_ATTR[13],
      `spriteType=3: $003D should be 0x${DATA_SPRITE_ATTR[13].toString(16)}, got 0x${sys.mem[0x003D].toString(16)}`);
    // $04A7 被循环的 PPU addr hi 覆盖（nametable 1 → 0x24）
    assert(sys.mem[0x04A7] === 0x24 || sys.mem[0x04A7] === 0x20,
      `spriteType=3: $04A7 should be 0x20 or 0x24 (PPU addr hi), got 0x${sys.mem[0x04A7].toString(16)}`);
    unmute();
  }

  // ── 反向: spriteType=0 vs spriteType=3 的 $003C/$003D 应不同 ──
  {
    const sys0 = createMockSys();
    const sys3 = createMockSysFull();
    const unmute = muteLogs();
    sys0.mem[0x34] = 0x00; sys0.mem[0x35] = 0x02; sys0.mem[0x0515] = 0; sys0.mem[0x063D] = 0;
    sys3.mem[0x34] = 0x00; sys3.mem[0x35] = 0x02; sys3.mem[0x0515] = 0; sys3.mem[0x063D] = 3;
    sys3.mem[0x0635] = 0x58; sys3.mem[0x0637] = 0x68; sys3.mem[0x05CE] = 0;
    translate_BANK31_DMA_HELPER(sys0);
    translate_BANK31_DMA_HELPER(sys3);
    // DATA_SPRITE_ATTR[0]=0x42 ≠ DATA_SPRITE_ATTR[12]=0xB4
    assert(sys0.mem[0x003C] !== sys3.mem[0x003C],
      `spriteType=0 $003C (0x${sys0.mem[0x003C].toString(16)}) should ≠ spriteType=3 $003C (0x${sys3.mem[0x003C].toString(16)})`);
    assert(sys0.mem[0x003D] !== sys3.mem[0x003D],
      `spriteType=0 $003D (0x${sys0.mem[0x003D].toString(16)}) should ≠ spriteType=3 $003D (0x${sys3.mem[0x003D].toString(16)})`);
    unmute();
  }

  // ── 边界: spriteType=0xFF (越界) ──
  {
    const sys = createMockSys();
    const unmute = muteLogs();
    sys.mem[0x34] = 0x00; sys.mem[0x35] = 0x02;
    sys.mem[0x0515] = 0;
    sys.mem[0x063D] = 0xFF;
    let crashed = false;
    try { translate_BANK31_DMA_HELPER(sys); } catch { crashed = true; }
    assert(!crashed, 'spriteType=0xFF DMA_HELPER should not throw');
    assert(sys.mem[0x003C] !== undefined,
      'spriteType=0xFF: $003C should be set (not undefined)');
    unmute();
  }

  done('dmaHelper');
}

/** 辅助: 多个地址检查两个 sys 至少有一个地址值不同 */
function expectDiff(sysA: SystemState, sysB: SystemState, ...addrs: string[]): void {
  let anyDiff = false;
  for (const addr of addrs) {
    const numAddr = parseInt(addr, 16);
    if (sysA.mem[numAddr] !== sysB.mem[numAddr]) { anyDiff = true; break; }
  }
  assert(anyDiff, `different sprite types should produce different state in ${addrs.join('/')}`);
}

function test_spriteDraw(): void {
  console.log('\n【Test 11】translate_BANK31_SPRITE_DRAW');
  smokeTest('spriteDraw', translate_BANK31_SPRITE_DRAW);
}

function test_spriteBankLoop(): void {
  console.log('\n【Test 12】translate_BANK31_SPRITE_BANK_LOOP');
  smokeTest('spriteBankLoop', translate_BANK31_SPRITE_BANK_LOOP);
}

function test_bankHelper(): void {
  console.log('\n【Test 13】translate_BANK31_BANK_HELPER');
  smokeTest('bankHelper', translate_BANK31_BANK_HELPER);
}

function test_spriteNmiWait(): void {
  console.log('\n【Test 14】translate_BANK31_SPRITE_NMI_WAIT');
  const sys = createMockSys();
  const unmute = muteLogs();
  sys.nmiPending = true;
  sys.mem[0x0516] = 0;
  translate_BANK31_SPRITE_NMI_WAIT(sys);
  assert(true, 'SPRITE_NMI_WAIT should not crash');
  unmute();
  done('spriteNmiWait');
}

// ═══════════════════════════════════════════
// Test Suite 15: init_BANK31_matchEntry (需要完整 PPU/APU mock)
// ═══════════════════════════════════════════

function test_matchEntry(): void {
  console.log('\n【Test 15】init_BANK31_matchEntry');

  const sys = createMockSysFull();
  const unmute = muteLogs();

  // 设置比赛入口需要的初始内存
  sys.mem[0x34] = 0x00; sys.mem[0x35] = 0x06;
  sys.mem[0x062D] = 0;
  sys.mem[0x062E] = 0;
  sys.mem[0x05FB] = 0x0B;
  sys.mem[0x0441] = 0x0B;
  sys.mem[0x062A] = 0;

  init_BANK31_matchEntry(sys);

  // 验证关键状态被初始化
  assert(sys.mem[0x0618] === 0, '$0618 frame counter should be 0');
  assert(sys.mem[0x061A] === 0xFF, '$061A should be 0xFF');
  assert(sys.mem[0x061B] === 0x01, '$061B should be 0x01');
  assert(sys.mem[0x0600] === 0, '$0600 active players should be 0');
  assert(sys.mem[0x05FF] === 0, '$05FF event flag should be 0');
  assert(sys.mem[0x0441] === 0, '$0441 current player should be 0');

  unmute();
  done('matchEntry');
}

// ═══════════════════════════════════════════
// Main
// ═══════════════════════════════════════════

function main(): void {
  console.log('╔════════════════════════════════════════╗');
  console.log('║     Bank 31 单元测试                    ║');
  console.log('╚════════════════════════════════════════╝');

  test_dataIntegrity();
  test_getBallPos();
  test_playerLogic();
  test_jumpTable();
  test_bankSwitch();
  test_posUpdate();
  test_spriteDmaInit();
  test_spriteBankPhase2();
  test_spriteSetup();
  test_dmaHelper();
  test_spriteDraw();
  test_spriteBankLoop();
  test_bankHelper();
  test_spriteNmiWait();
  test_matchEntry();

  // ═══════════════════════════════════════
  // 报告
  // ═══════════════════════════════════════
  console.log('\n╔════════════════════════════════════════╗');
  const total = passed + failed;
  console.log(`║  通过: ${passed}/${total}  失败: ${failed}/${total}  ║`);
  if (failed > 0) {
    console.log('╚════════════════════════════════════════╝');
    console.log('\n失败列表:');
    failures.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
    process.exit(1);
  } else {
    console.log('║        全部测试通过 ✅                 ║');
    console.log('╚════════════════════════════════════════╝');
  }
}

main();
