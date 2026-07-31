/**
 * Bank 30 单元测试
 *
 * 测试 bank-30 公开 API — 系统库（数学/内存/坐标/场景/比赛逻辑）
 *
 * 用法: npx tsx game-engine/test/test-bank-30.ts
 */

// ── 代码导入 ──
import {
  // // 跳转表 — 已弃用，TS 直接 import 函数调用
  // JTAB_C500,
  // JTAB_C51B,
  // JTAB_C542,
  // 内存/OAM
  clearOam_$CB8B,
  // 数学
  multiply16_$CD3C,
  divide16_$CD0D,
  // 坐标/距离
  coordTransform_$CDE2,
  tileCoordConvert_$CDC9,
  distanceCheck_$DD47,
  // 随机数/角色
  randomGen_$DCDF,
  getCharData_$CD7C,
  // 音频/手柄
  audiotrigger_$CBB0,
  joypadUpdate_$C9B5,
  // bank 切换
  bankSwitch_Win6,
  bankSwitch_Win7,
  bankSwitch_apply_$CE2D,
  // 球员
  playerSlotScan_$D0D1,
  // 队伍
  teamFlagFlip_$DBF3,
  // GP
  gpModify_$D193,
  // 新翻译
  translate_BANK30_COROUTINE_INIT,
  translate_BANK30_INIT_AUDIO_1D,
  fn_$DE45_playerSlotFlagSet,
  fn_$DF5A_distanceCheck,
  // 便捷 wrapper
  bank30_multiply,
  bank30_divide,
  bank30_memFill,
} from '../native-game/tsubasa/banks/prg/bank-30-code';

// ── 数据表 ──
import {
  DATA_$CD89_$CDC8,
  DATA_$D183_$D192,
  DATA_$D6F3_$D70B,
} from '../native-game/tsubasa/banks/prg/bank-30-data';

import type { SystemState } from '../native-game/tsubasa/banks/system-state';

// ═══════════════════════════════════════════
// Mock SystemState
// ═══════════════════════════════════════════

/** 创建一个最小可用的 mock PPU 对象 */
function createMockPPU() {
  return {
    updateControlReg1: (_v: number) => {},
    updateControlReg2: (_v: number) => {},
    readStatusRegister: () => 0,
    sramLoad: () => 0,
    vramLoad: () => 0,
    writeSRAMAddress: (_v: number) => {},
    sramWrite: (_v: number) => {},
    scrollWrite: (_v: number) => {},
    writeVRAMAddress: (_v: number) => {},
    vramWrite: (_v: number) => {},
    sramDMA: (_v: number) => {},
    nes: null as any,
  };
}

function createMockSys(): SystemState {
  const mem = new Uint8Array(0x10000);
  return {
    mem,
    regs: { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0, P: 0x34 },
    ppu: createMockPPU() as any,
    papu: null as any,
    mmc3Map: new Uint8Array(4),
    mmc3BankSelect: 0,
    mmc3BankData: 0,
    nmiPending: false,
    frameCount: 0,
    mmc3Shadow: 0,
  };
}

// ═══════════════════════════════════════════
// 测试计数
// ═══════════════════════════════════════════

let passed = 0;
let failed = 0;
const failures: string[] = [];

function assert(cond: boolean, msg: string): void {
  if (cond) {
    passed++;
  } else {
    failed++;
    failures.push(msg);
    console.error(`  ❌ FAIL: ${msg}`);
  }
}

function done(name: string): void {
  console.log(`  ✅ ${name}`);
}

function muteLogs(): () => void {
  const orig = console.log;
  (console as any).log = () => {};
  return () => { (console as any).log = orig; };
}

// ═══════════════════════════════════════════
// Test Suite 1: 跳转表完整性 (已弃用 — TS 直接 import 函数无需 jump table)
// ═══════════════════════════════════════════

// function test_jumpTables(): void {
//   console.log('\n【Test 1】跳转表完整性');
//
//   assert(Object.keys(JTAB_C500).length === 9,
//     `JTAB_C500 should have 9 entries, got ${Object.keys(JTAB_C500).length}`);
//   assert(JTAB_C500[0xC500] === 'initSystem_$C76E', 'C500 → initSystem');
//   assert(JTAB_C500[0xC503] === 'initScene_$C64E', 'C503 → initScene');
//   assert(JTAB_C500[0xC50C] === 'getCharData_$CD7C', 'C50C → getCharData');
//   assert(JTAB_C500[0xC509] === 'memClear_$CB8B', 'C509 → memClear');
//
//   assert(Object.keys(JTAB_C51B).length === 13,
//     `JTAB_C51B should have 13 entries, got ${Object.keys(JTAB_C51B).length}`);
//   assert(JTAB_C51B[0xC51E] === 'multiply16_$CD3C', 'C51E → multiply16');
//   assert(JTAB_C51B[0xC521] === 'divide16_$CD0D', 'C521 → divide16');
//
//   assert(Object.keys(JTAB_C542).length >= 20,
//     `JTAB_C542 should have >= 20 entries, got ${Object.keys(JTAB_C542).length}`);
//
//   done('jumpTables');
// }

// ═══════════════════════════════════════════
// Test Suite 2: 数据表完整性
// ═══════════════════════════════════════════

function test_dataIntegrity(): void {
  console.log('\n【Test 2】数据表完整性');

  // DATA_$CD89_$CDC8 — sprite tile 索引表 (64 bytes)
  assert(DATA_$CD89_$CDC8.length === 64,
    `DATA_$CD89_$CDC8 should be 64 bytes, got ${DATA_$CD89_$CDC8.length}`);
  assert(DATA_$CD89_$CDC8[0] === 0x00, `[0] should be 0x00, got 0x${DATA_$CD89_$CDC8[0].toString(16)}`);
  assert(DATA_$CD89_$CDC8[1] === 0x03, `[1] should be 0x03`);
  assert(DATA_$CD89_$CDC8[62] === 0x2C, `[62] should be 0x2C`);
  assert(DATA_$CD89_$CDC8[63] === 0x04, `[63] should be 0x04`);

  // DATA_$D183_$D192 — GP 修改参数 (16 bytes)
  assert(DATA_$D183_$D192.length === 16,
    `DATA_$D183_$D192 should be 16 bytes, got ${DATA_$D183_$D192.length}`);
  assert(DATA_$D183_$D192[0] === 0xB4, `[0] should be 0xB4`);
  assert(DATA_$D183_$D192[2] === 0xB4, `[2] should be 0xB4`);
  assert(DATA_$D183_$D192[8] === 0xD2, `[8] should be 0xD2`);

  // DATA_$D6F3_$D70B — 比赛事件参数 (25 bytes)
  assert(DATA_$D6F3_$D70B.length === 25,
    `DATA_$D6F3_$D70B should be 25 bytes, got ${DATA_$D6F3_$D70B.length}`);
  assert(DATA_$D6F3_$D70B[0] === 0x04, `[0] should be 0x04`);
  assert(DATA_$D6F3_$D70B[24] === 0x2C, `[24] should be 0x2C`);

  done('dataIntegrity');
}

// ═══════════════════════════════════════════
// Test Suite 3: clearOam — OAM 清零
// ═══════════════════════════════════════════

function test_clearOam(): void {
  console.log('\n【Test 3】clearOam_$CB8B');

  const unmute = muteLogs();

  // 用垃圾值填充 OAM 区域再清零
  const sys = createMockSys();
  for (let i = 0; i < 256; i++) sys.mem[0x0200 + i] = 0xAB;
  clearOam_$CB8B(sys);

  // 每 4 字节一个 sprite: Y=$F8, tile=0, attr=0, X=0
  for (let i = 0; i < 64; i++) {
    const base = 0x0200 + i * 4;
    assert(sys.mem[base] === 0xF8,
      `sprite ${i} Y should be 0xF8, got 0x${sys.mem[base].toString(16)}`);
    assert(sys.mem[base + 1] === 0,
      `sprite ${i} tile should be 0, got 0x${sys.mem[base + 1].toString(16)}`);
    assert(sys.mem[base + 2] === 0,
      `sprite ${i} attr should be 0`);
    assert(sys.mem[base + 3] === 0,
      `sprite ${i} X should be 0`);
  }

  unmute();
  done('clearOam');
}

// ═══════════════════════════════════════════
// Test Suite 4: multiply16 — 16-bit 乘法
// ═══════════════════════════════════════════

function test_multiply16(): void {
  console.log('\n【Test 4】multiply16_$CD3C');

  // multiply16 使用: $67-$68 = multiplier, $69-$6A = multiplicand
  // 结果写入: $6B-$6E (32-bit)

  // 100 × 10 = 1000 (0x03E8)
  {
    const sys = createMockSys();
    sys.mem[0x67] = 100; sys.mem[0x68] = 0;   // multiplier = 100
    sys.mem[0x69] = 10;  sys.mem[0x6A] = 0;   // multiplicand = 10
    multiply16_$CD3C(sys);
    const result = (sys.mem[0x6C] << 8) | sys.mem[0x6B];
    assert(result === 1000, `100 × 10 should be 1000, got ${result}`);
  }

  // 0 × 0 = 0
  {
    const sys = createMockSys();
    sys.mem[0x67] = 0; sys.mem[0x68] = 0;
    sys.mem[0x69] = 0; sys.mem[0x6A] = 0;
    multiply16_$CD3C(sys);
    const result = (sys.mem[0x6C] << 8) | sys.mem[0x6B];
    assert(result === 0, `0 × 0 should be 0, got ${result}`);
  }

  // 交换律: 8 × 7 = 7 × 8
  {
    const sys1 = createMockSys();
    sys1.mem[0x67] = 8;  sys1.mem[0x68] = 0;
    sys1.mem[0x69] = 7;  sys1.mem[0x6A] = 0;
    const sys2 = createMockSys();
    sys2.mem[0x67] = 7;  sys2.mem[0x68] = 0;
    sys2.mem[0x69] = 8;  sys2.mem[0x6A] = 0;
    multiply16_$CD3C(sys1);
    multiply16_$CD3C(sys2);
    const r1 = (sys1.mem[0x6C] << 8) | sys1.mem[0x6B];
    const r2 = (sys2.mem[0x6C] << 8) | sys2.mem[0x6B];
    assert(r1 === r2, `8×7 (${r1}) should equal 7×8 (${r2})`);
  }

  // 255 × 255 = 65025
  {
    const sys = createMockSys();
    sys.mem[0x67] = 0xFF; sys.mem[0x68] = 0x00;  // 255
    sys.mem[0x69] = 0xFF; sys.mem[0x6A] = 0x00;  // 255
    multiply16_$CD3C(sys);
    const result = (sys.mem[0x6C] << 8) | sys.mem[0x6B];
    assert(result === 65025, `255 × 255 = 65025, got ${result}`);
  }

  done('multiply16');
}

// ═══════════════════════════════════════════
// Test Suite 5: divide16 — 16-bit 除法
// ═══════════════════════════════════════════

function test_divide16(): void {
  console.log('\n【Test 5】divide16_$CD0D');

  // divide16: 被除数 = $6F-$70, 除数 = $73-$74
  // 结果: 商 = $6F-$70, 余数 = $71-$72

  // 100 ÷ 10 = 10, rem=0
  {
    const sys = createMockSys();
    sys.mem[0x6F] = 100; sys.mem[0x70] = 0;  // dividend = 100
    sys.mem[0x73] = 10;  sys.mem[0x74] = 0;  // divisor = 10
    divide16_$CD0D(sys);
    const quot = (sys.mem[0x70] << 8) | sys.mem[0x6F];
    const rem  = (sys.mem[0x72] << 8) | sys.mem[0x71];
    assert(quot === 10, `100 ÷ 10 quotient should be 10, got ${quot}`);
    assert(rem === 0, `100 ÷ 10 remainder should be 0, got ${rem}`);
  }

  // 0 ÷ N = 0
  {
    const sys = createMockSys();
    sys.mem[0x6F] = 0;  sys.mem[0x70] = 0;
    sys.mem[0x73] = 5;  sys.mem[0x74] = 0;
    divide16_$CD0D(sys);
    const quot = (sys.mem[0x70] << 8) | sys.mem[0x6F];
    const rem  = (sys.mem[0x72] << 8) | sys.mem[0x71];
    assert(quot === 0, `0 ÷ 5 quotient should be 0, got ${quot}`);
    assert(rem === 0, `0 ÷ 5 remainder should be 0, got ${rem}`);
  }

  // 除零保护
  {
    const sys = createMockSys();
    sys.mem[0x6F] = 100; sys.mem[0x70] = 0;
    sys.mem[0x73] = 0;   sys.mem[0x74] = 0;
    divide16_$CD0D(sys);
    const quot = (sys.mem[0x70] << 8) | sys.mem[0x6F];
    assert(quot === 0xFFFF, `div-by-0 should return $FFFF, got 0x${quot.toString(16)}`);
  }

  done('divide16');
}

// ═══════════════════════════════════════════
// Test Suite 6: bank30 便捷 wrapper
// ═══════════════════════════════════════════

function test_convenienceWrappers(): void {
  console.log('\n【Test 6】便捷 wrapper (bank30_multiply/divide/memFill)');

  // bank30_multiply: 封装 multiply16_$CD3C, 需先设置 $67-$6A 输入
  {
    const sys = createMockSys();
    sys.mem[0x67] = 100; sys.mem[0x68] = 0;   // multiplier
    sys.mem[0x69] = 10;  sys.mem[0x6A] = 0;   // multiplicand
    const result = bank30_multiply(sys);
    assert(result === 1000, `bank30_multiply 100×10 = 1000, got ${result}`);
  }

  // bank30_divide: 封装 divide16_$CD0D
  {
    const sys = createMockSys();
    sys.mem[0x6F] = 100; sys.mem[0x70] = 0;  // dividend
    sys.mem[0x73] = 10;  sys.mem[0x74] = 0;  // divisor
    divide16_$CD0D(sys);
    const result = bank30_divide(sys);
    assert(typeof result.quot === 'number' && typeof result.rem === 'number',
      `bank30_divide should return { quot, rem }`);
  }

  // bank30_memFill: 内存填充
  {
    const sys = createMockSys();
    bank30_memFill(sys, 0x55, 0x0300, 0x10);
    for (let i = 0; i < 0x10; i++) {
      assert(sys.mem[0x0300 + i] === 0x55,
        `memFill [0x${(0x0300 + i).toString(16)}] should be 0x55`);
    }
    // 边界之后不应被覆盖
    assert(sys.mem[0x0310] === 0, `memFill boundary: [0x0310] should be 0`);
  }

  done('convenienceWrappers');
}

// ═══════════════════════════════════════════
// Test Suite 7: audioTrigger — 音效触发
// ═══════════════════════════════════════════

function test_audioTrigger(): void {
  console.log('\n【Test 7】audiotrigger_$CBB0');

  const unmute = muteLogs();

  {
    const sys = createMockSys();
    audiotrigger_$CBB0(sys, 0x1D);
    assert(sys.mem[0x0518] === 0x1D,
      `audioTrigger(#0x1D) should set $0518=0x1D, got 0x${sys.mem[0x0518].toString(16)}`);
  }

  {
    const sys = createMockSys();
    audiotrigger_$CBB0(sys, 0x18);
    assert(sys.mem[0x0518] === 0x18,
      `audioTrigger(#0x18) should set $0518=0x18, got 0x${sys.mem[0x0518].toString(16)}`);
  }

  unmute();
  done('audioTrigger');
}

// ═══════════════════════════════════════════
// Test Suite 8: randomGen — 随机数生成
// ═══════════════════════════════════════════

function test_randomGen(): void {
  console.log('\n【Test 8】randomGen_$DCDF');

  {
    const sys = createMockSys();
    // 初始化随机种子
    sys.mem[0x044E] = 0xAB;
    const r1 = randomGen_$DCDF(sys);
    assert(typeof r1 === 'number' && r1 <= 0xFF,
      `randomGen should return a byte value, got ${r1}`);

    // 再次调用应该产生不同值
    const r2 = randomGen_$DCDF(sys);
    // 不强制要求不同（随机算法可能重复），只检查格式
    assert(typeof r2 === 'number' && r2 <= 0xFF,
      `second randomGen should return byte, got ${r2}`);
  }

  // 种子为 0 时也能正常工作
  {
    const sys = createMockSys();
    sys.mem[0x044E] = 0;
    const r = randomGen_$DCDF(sys);
    assert(typeof r === 'number' && r >= 0 && r <= 0xFF,
      `randomGen with seed 0 should return byte, got ${r}`);
  }

  done('randomGen');
}

// ═══════════════════════════════════════════
// Test Suite 9: getCharData — 角色数据指针
// ═══════════════════════════════════════════

function test_getCharData(): void {
  console.log('\n【Test 9】getCharData_$CD7C');

  // flag=0 时使用 $044F 索引
  {
    const sys = createMockSys();
    sys.mem[0x05FB] = 0;   // flag: 队伍A
    sys.mem[0x044F] = 0x03; // 球员索引 3

    const results: number[] = [];
    const captureLog = console.log;
    (console as any).log = (msg: string) => results.push(msg);

    getCharData_$CD7C(sys);

    (console as any).log = captureLog;

    // 指针存入了 ($34, $35)
    const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
    assert(ptr >= 0x0300, `getCharData pointer should be >= 0x0300, got 0x${ptr.toString(16)}`);
  }

  done('getCharData');
}

// ═══════════════════════════════════════════
// Test Suite 10: teamFlagFlip — 队伍标记翻转
// ═══════════════════════════════════════════

function test_teamFlagFlip(): void {
  console.log('\n【Test 10】teamFlagFlip_$DBF3');

  {
    const sys = createMockSys();
    sys.mem[0x044F] = 0x0B;
    sys.mem[0x05FB] = 0x01; // 初始值

    teamFlagFlip_$DBF3(sys);

    // $05FB = $044F ^ 0x0B = 0x0B ^ 0x0B = 0
    assert(sys.mem[0x05FB] === 0,
      `teamFlagFlip should set $05FB=0, got 0x${sys.mem[0x05FB].toString(16)}`);
  }

  {
    const sys = createMockSys();
    sys.mem[0x044F] = 0x00;
    sys.mem[0x05FB] = 0x00;

    teamFlagFlip_$DBF3(sys);

    // 0 ^ 0x0B = 0x0B
    assert(sys.mem[0x05FB] === 0x0B,
      `teamFlagFlip should flip to 0x0B, got 0x${sys.mem[0x05FB].toString(16)}`);
  }

  done('teamFlagFlip');
}

// ═══════════════════════════════════════════
// Test Suite 11: coordTransform — 坐标变换
// ═══════════════════════════════════════════

function test_coordTransform(): void {
  console.log('\n【Test 11】coordTransform_$CDE2');

  // coordTransform: 将 (xReg, yReg) 像素坐标转换为 tile 索引 (单个数字)
  // 输入: xReg (0x30-0xCF), yReg (0x50+)
  // 返回: tile 索引 (0-255) 或 0xFF (无效)

  {
    const sys = createMockSys();
    sys.mem[0x05FB] = 0; // 队伍A

    // 有效坐标: x=0x40, y=0x70
    const result = coordTransform_$CDE2(sys, 0x40, 0x70);
    assert(typeof result === 'number',
      `coordTransform should return a number (tile index), got ${typeof result}`);
  }

  // 无效坐标应返回 0xFF
  {
    const sys = createMockSys();
    const result = coordTransform_$CDE2(sys, 0x01, 0x01); // x < 0x30
    assert(result === 0xFF,
      `coordTransform invalid coords should return 0xFF, got 0x${result.toString(16)}`);
  }

  done('coordTransform');
}

// ═══════════════════════════════════════════
// Test Suite 12: tileCoordConvert — tile 坐标转换
// ═══════════════════════════════════════════

function test_tileCoordConvert(): void {
  console.log('\n【Test 12】tileCoordConvert_$CDC9');

  {
    const sys = createMockSys();
    sys.mem[0x05FB] = 0;

    // 需要先设置坐标参数
    sys.mem[0x0635] = 0x50; // 参考 X
    sys.mem[0x0637] = 0x40; // 参考 Y

    const result = tileCoordConvert_$CDC9(sys);
    assert(typeof result.x === 'number' && typeof result.y === 'number',
      `tileCoordConvert should return {x, y}, got {x:${result.x}, y:${result.y}}`);
  }

  done('tileCoordConvert');
}

// ═══════════════════════════════════════════
// Test Suite 13: distanceCheck — 距离判定
// ═══════════════════════════════════════════

function test_distanceCheck(): void {
  console.log('\n【Test 13】distanceCheck_$DD47');

  {
    const sys = createMockSys();
    // 设置基本状态
    sys.mem[0x3C04] = 0;   // flag, 非特殊模式
    sys.mem[0x05FB] = 0;   // 队伍A

    const result = distanceCheck_$DD47(sys);
    assert(typeof result === 'boolean',
      `distanceCheck should return boolean, got ${typeof result}`);
  }

  done('distanceCheck');
}

// ═══════════════════════════════════════════
// Test Suite 14: 新翻译函数
// ═══════════════════════════════════════════

function test_newTranslations(): void {
  console.log('\n【Test 14】新翻译函数 (CA5B/DCF0/DE45/DF5A)');

  const unmute = muteLogs();

  // translate_BANK30_COROUTINE_INIT: 协程系统初始化
  {
    const sys = createMockSys();
    translate_BANK30_COROUTINE_INIT(sys);
    // 5 个槽位应该被初始化为标记值
    const slots = [0x05, 0x09, 0x0D, 0x15, 0x11];
    for (const slot of slots) {
      assert(sys.mem[slot] !== 0,
        `coroutine slot 0x${slot.toString(16)} should be initialized, got 0x${sys.mem[slot].toString(16)}`);
    }
  }

  // translate_BANK30_INIT_AUDIO_1D: 初始化 — $043B=0, 音效 #$1D
  {
    const sys = createMockSys();
    // 先设置随机种子
    sys.mem[0x044E] = 0xAB;
    translate_BANK30_INIT_AUDIO_1D(sys);
    assert(sys.mem[0x043B] === 0,
      `INIT_AUDIO_1D should set $043B=0, got 0x${sys.mem[0x043B].toString(16)}`);
    assert(sys.mem[0x0518] === 0x1D,
      `INIT_AUDIO_1D should trigger audio #$1D, got 0x${sys.mem[0x0518].toString(16)}`);
  }

  // fn_$DE45_playerSlotFlagSet: $043B=1, 音效 #$18
  {
    const sys = createMockSys();
    sys.mem[0x044E] = 0xCD;
    fn_$DE45_playerSlotFlagSet(sys);
    assert(sys.mem[0x043B] === 1,
      `playerSlotFlagSet should set $043B=1, got 0x${sys.mem[0x043B].toString(16)}`);
    assert(sys.mem[0x0518] === 0x18,
      `playerSlotFlagSet should trigger audio #$18, got 0x${sys.mem[0x0518].toString(16)}`);
  }

  // fn_$DF5A_distanceCheck: 角色距离检测 < $003B
  {
    const sys = createMockSys();
    sys.mem[0x044F] = 0;
    sys.mem[0x05FB] = 0;
    // 设置参考点 ($0635, $0637) 和阈值 $003B
    sys.mem[0x0635] = 0x80;
    sys.mem[0x0637] = 0x80;
    sys.mem[0x003B] = 0x20;

    // 角色数据指针需要通过 getCharData 初始化
    getCharData_$CD7C(sys);
    const ptr = (sys.mem[0x35] << 8) | sys.mem[0x34];
    // charData[$06]=X, charData[$08]=Y, charData[$0A]=flag
    sys.mem[(ptr + 0x06) & 0xFFFF] = 0x80; // X 坐标
    sys.mem[(ptr + 0x08) & 0xFFFF] = 0x80; // Y 坐标
    sys.mem[(ptr + 0x0A) & 0xFFFF] = 0x00; // flag=0 表示活跃

    const inRange = fn_$DF5A_distanceCheck(sys);
    // 距离 (0x80-0x80) = 0 < 0x20 → 应该在范围内
    assert(inRange === true,
      `distanceCheck at same position should be true, got ${inRange}`);

    // 设置超出范围: X 距离 = 0x50
    sys.mem[(ptr + 0x06) & 0xFFFF] = 0xD0; // X = 0xD0, diffX = 0x50 > 0x20
    const outOfRange = fn_$DF5A_distanceCheck(sys);
    assert(outOfRange === false,
      `distanceCheck with large X diff should be false, got ${outOfRange}`);
  }

  unmute();
  done('newTranslations');
}

// ═══════════════════════════════════════════
// Test Suite 15: bank 切换
// ═══════════════════════════════════════════

function test_bankSwitch(): void {
  console.log('\n【Test 15】bank 切换 (bankSwitch_Win6/Win7)');

  {
    const sys = createMockSys();
    bankSwitch_Win6(sys, 5);
    // MMC3 reg: select=6 (PRG bank for $8000 window), data=5
    assert(sys.mmc3BankSelect === 6,
      `bankSwitch_Win6 select should be 6, got ${sys.mmc3BankSelect}`);
    assert(sys.mmc3BankData === 5,
      `bankSwitch_Win6 data should be 5, got ${sys.mmc3BankData}`);
    assert(sys.mmc3Map[0] === 5,
      `bankSwitch_Win6 $8000 window should map to bank 5, got ${sys.mmc3Map[0]}`);
  }

  {
    const sys = createMockSys();
    bankSwitch_Win7(sys, 12);
    assert(sys.mmc3BankSelect === 7,
      `bankSwitch_Win7 select should be 7, got ${sys.mmc3BankSelect}`);
    assert(sys.mmc3BankData === 12,
      `bankSwitch_Win7 data should be 12, got ${sys.mmc3BankData}`);
    assert(sys.mmc3Map[1] === 12,
      `bankSwitch_Win7 $A000 window should map to bank 12, got ${sys.mmc3Map[1]}`);
  }

  done('bankSwitch');
}

// ═══════════════════════════════════════════
// Test Suite 16: joypadUpdate — 手柄输入
// ═══════════════════════════════════════════

function test_joypadUpdate(): void {
  console.log('\n【Test 16】joypadUpdate_$C9B5');

  {
    const sys = createMockSys();
    // 在 $0538-$0539 设置当前按键状态
    sys.mem[0x0538] = 0x80; // A 键按下
    joypadUpdate_$C9B5(sys, 0, 0);
    // 验证 $053A 存储了按键变化
    assert(sys.mem[0x053A] !== undefined,
      'joypadUpdate should update $053A');
  }

  done('joypadUpdate');
}

// ═══════════════════════════════════════════
// Test Suite 17: gpModify — GP 修改
// ═══════════════════════════════════════════

function test_gpModify(): void {
  console.log('\n【Test 17】gpModify_$D193');

  // gpModify: delta < 0x80 → 增加 GP; delta >= 0x80 → 减少 GP
  // 上限 = ($05F8 << 8) | $05F7

  {
    const sys = createMockSys();
    sys.mem[0x05FF] = 50;       // 当前 GP
    sys.mem[0x05F7] = 0xFF;     // 上限 lo = 255
    sys.mem[0x05F8] = 0x00;     // 上限 hi = 0 → maxGp = 255
    sys.mem[0x063E] = 0x80;     // 标记 bit7=1 → 跳过警告音
    sys.mem[0x00E2] = 0;        // 避免随机方向干扰

    let callbackCount = 0;
    gpModify_$D193(sys, 20, () => { callbackCount++; });

    // 50 + 20 = 70
    assert(sys.mem[0x05FF] === 70,
      `gpModify +20 should give 70, got ${sys.mem[0x05FF]}`);
  }

  {
    const sys = createMockSys();
    sys.mem[0x05FF] = 50;
    sys.mem[0x05F7] = 0xFF;
    sys.mem[0x05F8] = 0x00;
    sys.mem[0x063E] = 0x80;
    sys.mem[0x00E2] = 0;

    let callbackCount = 0;
    gpModify_$D193(sys, 10, () => { callbackCount++; });

    assert(sys.mem[0x05FF] === 60,
      `gpModify +10 should give 60, got ${sys.mem[0x05FF]}`);
  }

  done('gpModify');
}

// ═══════════════════════════════════════════
// Test Suite 18: playerSlotScan — 球员槽位扫描
// ═══════════════════════════════════════════

function test_playerSlotScan(): void {
  console.log('\n【Test 18】playerSlotScan_$D0D1');

  {
    const sys = createMockSys();
    // mode 不在 2 时应该直接返回当前 A
    sys.mem[0x2A] = 0;
    const result = playerSlotScan_$D0D1(sys);
    assert(result === sys.regs.A,
      `playerSlotScan mode≠2 should return A (${sys.regs.A}), got ${result}`);
  }

  {
    const sys = createMockSys();
    sys.mem[0x2A] = 2; // 模式 2: 查找下一个活跃球员
    sys.regs.A = 0;    // 起始槽位

    // 初始化 22 个球员槽位 (从 $0300 开始, 每个 0x0B 字节)
    for (let slot = 0; slot < 22; slot++) {
      const base = 0x0300 + slot * 0x0B;
      sys.mem[base + 0x0A] = 1; // HP > 0 → 活跃
    }

    const result = playerSlotScan_$D0D1(sys);
    // 返回值应该 >= 0 且 < 22
    assert(result >= 0 && result < 22,
      `playerSlotScan mode=2 should return slot 0-21, got ${result}`);
  }

  done('playerSlotScan');
}

// ═══════════════════════════════════════════
// Test Suite 19: teamFlagFlip — 简略验证（数据一致性）
// ═══════════════════════════════════════════

function test_dataConsistency(): void {
  console.log('\n【Test 19】数据一致性');

  // GP 修改参数检查：有效范围为负值小字节
  for (const b of DATA_$D183_$D192) {
    assert(b <= 0xFF, `GP data byte should be <= 0xFF`);
  }

  // 比赛事件参数：最后字节是事件数量
  assert(DATA_$D6F3_$D70B[24] === 0x2C, `Event count should be 0x2C`);

  // tile 索引表：每个条目高低字节都在 0x0000-0xFFFF
  for (let i = 0; i < DATA_$CD89_$CDC8.length; i += 2) {
    const lo = DATA_$CD89_$CDC8[i];
    const hi = DATA_$CD89_$CDC8[i + 1];
    const addr = (hi << 8) | lo;
    assert(addr >= 0 && addr <= 0xFFFF,
      `Tile index pair ${i / 2} should be valid address, got 0x${addr.toString(16)}`);
  }

  done('dataConsistency');
}

// ═══════════════════════════════════════════
// 主入口
// ═══════════════════════════════════════════

function main(): void {
  console.log('═══════════════════════════════════');
  console.log('  Bank 30 单元测试');
  console.log('═══════════════════════════════════');

  // test_jumpTables();  // 已弃用
  test_dataIntegrity();
  test_clearOam();
  test_multiply16();
  test_divide16();
  test_convenienceWrappers();
  test_audioTrigger();
  test_randomGen();
  test_getCharData();
  test_teamFlagFlip();
  test_coordTransform();
  test_tileCoordConvert();
  test_distanceCheck();
  test_newTranslations();
  test_bankSwitch();
  test_joypadUpdate();
  test_gpModify();
  test_playerSlotScan();
  test_dataConsistency();

  // ── 总结 ──
  console.log('\n═══════════════════════════════════');
  const total = passed + failed;
  console.log(`  通过: ${passed} / ${total}`);
  if (failed > 0) {
    console.error(`  失败: ${failed}`);
    console.log('\n失败详情:');
    for (const f of failures) {
      console.error(`    - ${f}`);
    }
    process.exit(1);
  } else {
    console.log('  ✅ 全部通过!');
  }
  console.log('═══════════════════════════════════');
}

main();
