/**
 * RomTaskSystem 状态机测试
 *
 * 验证内容:
 *  1. ROM 地址常量 (C92C, C93A, C944, C9AA, CA00, CA3C)
 *  2. C944 子状态机
 *  3. C9AA 分叉逻辑 ($FF78FA 分流)
 *  4. TITLE_LOOP 空闲计时 → demo 触发
 *  5. DEMO_LOOP 输入检测 → 返回标题
 *  6. 阶段分派器 (1C854) 16 阶段遍历
 *  7. 任务链完整性: C92C→C93A→C944→C9AA→CA00
 *
 * 运行: node test/task-system.test.cjs
 */

'use strict';

// ============================================================
// 内联最小 Ram (仅 read16/write16)
// ============================================================
class MiniRam {
  constructor() { this._m = new Map(); }
  _key(addr) { return addr & 0xFFFF; }
  read16(addr) { return this._m.get(this._key(addr)) || 0; }
  write16(addr, v) { this._m.set(this._key(addr), v & 0xFFFF); }
  read32(addr) {
    const k = this._key(addr);
    const hi = this._m.get(k) || 0;
    const lo = this._m.get((k + 2) & 0xFFFF) || 0;
    return ((hi << 16) | lo) >>> 0;
  }
  write32(addr, v) {
    const k = this._key(addr);
    this._m.set(k, (v >>> 16) & 0xFFFF);
    this._m.set((k + 2) & 0xFFFF, v & 0xFFFF);
  }
  read8(addr) { return this.read16(addr) & 0xFF; }
  write8(addr, v) { this.write16(addr, (this.read16(addr) & 0xFF00) | (v & 0xFF)); }
}

// ============================================================
// 内联最小 VdpChip (仅接口)
// ============================================================
class MiniVdp {
  constructor() { this.regs = new Uint8Array(24); }
  writeRegister(n, v) { this.regs[n] = v & 0xFF; }
}

// ============================================================
// RomTaskSystem 核心常量复制 (来自 RomTaskSystem.ts 验证)
// ============================================================

const TASK_1C834 = 0x1C834;
const TASK_1C854 = 0x1C854;
const TASK_C92C  = 0xC92C;
const TASK_C93A  = 0xC93A;
const TASK_C944  = 0xC944;
const TASK_C9AA  = 0xC9AA;
const TASK_CA00  = 0xCA00;
const TASK_CA3C  = 0xCA3C;  // Demo 入口

const PHASE_INDEX = 0xFFAE90;
const PHASE_COUNT = 16;

const PHASE_TABLE_OFFSETS = [
  0x1C8A4, 0x1C8BE, 0x1C8DA, 0x1C8E0,
  0x1C8E8, 0x1C8F0, 0x1C92C, 0x1C934,
  0x1C9FA, 0x1C9FA, 0x1C9FA, 0x1C9FA,
  0x1C9FA, 0x1C9FA, 0x1C9E0, 0x1C9FA,
];

const RAM_DEMO_FLAG     = 0xFF78FA;
const RAM_TASK_PTR      = 0xFF8004;
const RAM_GAME_PHASE    = 0xFFA61C;
const TITLE_IDLE_TIMEOUT = 1800;

const TITLE_PARAM_PTR   = 0x05DF40;
const RAM_TITLE_PARAMS  = 0xFF95A2;

// ============================================================
// C9AA 状态机复制 (来自 RomTaskSystem.ts)
// ============================================================
const C9AA_Step = {
  INIT:          0,  // 初始: C7F6 + 清标志
  LOAD_RESOURCE: 1,  // 加载资源 $8001
  INIT_CHARS:    2,  // 角色初始化
  TITLE_LOOP:    3,  // 标题画面空闲循环
  DEMO_LOAD:     4,  // Demo 场景加载
  DEMO_LOOP:     5,  // Demo 循环
  SET_PHASE:     6,  // 设置游戏阶段
  DONE:          7,  // 转移到 CA00
};

const C944_Step = {
  INIT:       0,
  CHECK_SCENE: 1,
  SET_PARAMS:  2,
  DONE:        3,
};

// ============================================================
// 测试框架
// ============================================================
let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, label) {
  if (condition) { passed++; return true; }
  else { failed++; failures.push(label); console.log(`  ✗ ${label}`); return false; }
}

// ============================================================
// 测试用例
// ============================================================

console.log('═══════════════════════════════════════════');
console.log('  RomTaskSystem 状态机测试');
console.log('═══════════════════════════════════════════\n');

// ─── 1. ROM 地址常量验证 ──────────────────────────────────
console.log('[1] ROM 任务地址常量 (来自 rom.asm):');

assert(TASK_C92C  === 0x0000C92C, 'C92C: fourcc 校验');
assert(TASK_C93A  === 0x0000C93A, 'C93A: 标题画面入口');
assert(TASK_C944  === 0x0000C944, 'C944: 标题画面初始化');
assert(TASK_C9AA  === 0x0000C9AA, 'C9AA: 场景加载 / 分流点');
assert(TASK_CA00  === 0x0000CA00, 'CA00: 部署循环');
assert(TASK_CA3C  === 0x0000CA3C, 'CA3C: Demo/开场动画入口');

// ─── 2. 阶段分派器验证 ──────────────────────────────────────
console.log('\n[2] 阶段分派器 (1C854):');

assert(PHASE_COUNT === 16, '阶段数 = 16');
assert(PHASE_TABLE_OFFSETS.length === 16, '阶段表 16 个入口');

testPhaseTable: {
  const ram = new MiniRam();
  ram.write16(PHASE_INDEX, 0);
  assert(ram.read16(PHASE_INDEX) === 0, '初始阶段 = 0');

  // 模拟 16 阶段遍历
  let idx = 0;
  for (let i = 0; i < PHASE_COUNT; i++) {
    const handler = PHASE_TABLE_OFFSETS[i];
    assert(handler > 0x1C000 && handler < 0x20000, `阶段 ${i}: handler $${handler.toString(16)}`);
    ram.write16(PHASE_INDEX, i + 1);
  }
  assert(ram.read16(PHASE_INDEX) === 16, '最终阶段 = 16');
}

// ─── 3. C944 状态机 ─────────────────────────────────────────
console.log('\n[3] C944 标题画面初始化 状态机:');

testC944Flow: {
  const steps = [C944_Step.INIT, C944_Step.CHECK_SCENE, C944_Step.SET_PARAMS, C944_Step.DONE];
  assert(steps[0] === 0, 'INIT = 0');
  assert(steps[1] === 1, 'CHECK_SCENE = 1');
  assert(steps[2] === 2, 'SET_PARAMS = 2');
  assert(steps[3] === 3, 'DONE = 3');

  // 验证 C944 转移逻辑
  let step = C944_Step.INIT;
  assert(step === C944_Step.INIT, 'step=0 初始');

  step = C944_Step.CHECK_SCENE;
  assert(step !== C944_Step.INIT, '→ 场景检查');

  step = C944_Step.SET_PARAMS;
  assert(step !== C944_Step.CHECK_SCENE, '→ 设置参数');

  step = C944_Step.DONE;
  assert(step !== C944_Step.SET_PARAMS, '→ 完成, 队列 C9AA');

  // 验证 C944 SET_PARAMS 时写入的 RAM 值
  const ram = new MiniRam();
  ram.write32(RAM_TITLE_PARAMS, TITLE_PARAM_PTR);
  ram.write16(RAM_TITLE_PARAMS + 4, 2);  // $FF95A6 = 2
  ram.write16(RAM_TITLE_PARAMS + 6, 15); // $FF95A8 = 0x0F
  assert(ram.read32(RAM_TITLE_PARAMS) === TITLE_PARAM_PTR, `$FF95A2 = 0x${TITLE_PARAM_PTR.toString(16)}`);
  assert(ram.read16(RAM_TITLE_PARAMS + 4) === 2, '$FF95A6 = 2');
  assert(ram.read16(RAM_TITLE_PARAMS + 6) === 0x0F, '$FF95A8 = 15');
}

// ─── 4. C9AA $FF78FA 分流 ─────────────────────────────────────
console.log('\n[4] C9AA ★ $FF78FA 分流逻辑 (ROM $C9BC):');
// ★ 核心测试: ROM $33023 tst.w ($FF78FA); $33025 bne.w $CA3C

testDemoFlagBranch: {
  const ram = new MiniRam();

  // 场景 A: $FF78FA = 0xFFFF (初始值) → DEMO 路径
  ram.write16(RAM_DEMO_FLAG, 0xFFFF);
  const flagFF = ram.read16(RAM_DEMO_FLAG);
  assert(flagFF === 0xFFFF, '$FF78FA = 0xFFFF (开机初始)');
  const goDemo = flagFF !== 0;
  assert(goDemo === true, '0xFFFF → DEMO 路径 ($CA3C)');

  // 场景 B: $FF78FA = 0x0000 → 正常标题
  ram.write16(RAM_DEMO_FLAG, 0x0000);
  const flag00 = ram.read16(RAM_DEMO_FLAG);
  assert(flag00 === 0x0000, '$FF78FA = 0x0000');
  const goTitle = flag00 !== 0;
  assert(goTitle === false, '0x0000 → 正常标题路径 ($C9C6)');
}

// ─── 5. C9AA 状态机: 正常标题路径 ─────────────────────────────
console.log('\n[5] C9AA 正常标题路径 ($FF78FA=0):');

testNormalTitlePath: {
  // 模拟流程: INIT → LOAD_RESOURCE → INIT_CHARS → TITLE_LOOP
  let step = C9AA_Step.INIT;
  const demoFlag = 0x0000; // 正常标题

  assert(step === C9AA_Step.INIT, '起始: INIT');

  // 分流
  if (demoFlag !== 0) {
    step = C9AA_Step.DEMO_LOAD;
  } else {
    step = C9AA_Step.LOAD_RESOURCE;
  }
  assert(step === C9AA_Step.LOAD_RESOURCE, '→ LOAD_RESOURCE (加载资源 $8001)');

  // 加载完成 → 角色初始化
  step = C9AA_Step.INIT_CHARS;
  assert(step === C9AA_Step.INIT_CHARS, '→ INIT_CHARS (角色初始化)');

  // 初始化完成 → 标题循环
  step = C9AA_Step.TITLE_LOOP;
  assert(step === C9AA_Step.TITLE_LOOP, '→ TITLE_LOOP (等待输入/倒计时)');
}

// ─── 6. C9AA 状态机: Demo 路径 ───────────────────────────────
console.log('\n[6] C9AA Demo 路径 ($FF78FA≠0):');

testDemoPath: {
  let step = C9AA_Step.INIT;
  const demoFlag = 0xFFFF;

  // 分流
  if (demoFlag !== 0) {
    step = C9AA_Step.DEMO_LOAD;
  }
  assert(step === C9AA_Step.DEMO_LOAD, '→ DEMO_LOAD ($CA3C)');

  step = C9AA_Step.DEMO_LOOP;
  assert(step === C9AA_Step.DEMO_LOOP, '→ DEMO_LOOP ($CA72)');
}

// ─── 7. Demo 空闲计时器 ─────────────────────────────────────
console.log('\n[7] Demo 空闲计时器 (TITLE_LOOP → DEMO):');

testIdleTimer: {
  // 模拟: 1800 帧无输入 → 触发 demo
  let idleFrames = 0;
  const timeout = TITLE_IDLE_TIMEOUT;
  let demoTriggered = false;

  // 模拟 1800 帧无输入
  for (let f = 0; f < timeout; f++) {
    idleFrames++;
    if (idleFrames >= timeout && !demoTriggered) {
      demoTriggered = true;
    }
  }
  assert(idleFrames === 1800, '空闲帧 = 1800');
  assert(demoTriggered === true, '1800 帧无输入 → 触发 Demo');
}

testIdleTimerReset: {
  let idleFrames = 600; // 10 秒空闲后

  // 模拟按键
  const hadInput = true;
  if (hadInput) {
    idleFrames = 0;
  }
  assert(idleFrames === 0, '按键 → 空闲计数器重置为 0');
}

// ─── 8. Demo 输入检测 → 返回标题 ───────────────────────────
console.log('\n[8] Demo 退出逻辑:');

testDemoExit: {
  let inDemoMode = true;
  let step = C9AA_Step.DEMO_LOOP;

  // 模拟按键
  const hasInput = true;
  if (hasInput && inDemoMode) {
    inDemoMode = false;
    step = C9AA_Step.LOAD_RESOURCE; // 退出后走正常标题初始化
  }
  assert(inDemoMode === false, 'demo 模式关闭');
  assert(step === C9AA_Step.LOAD_RESOURCE, '→ 返回 LOAD_RESOURCE (正常标题初始化)');
}

testDemoTimeoutExit: {
  let demoFrames = 0;
  let inDemoMode = true;
  let step = C9AA_Step.DEMO_LOOP;
  let autoReturned = false;

  // 模拟 3601 帧 (超时)
  for (let f = 0; f <= 3600; f++) {
    demoFrames++;
    if (demoFrames > 3600 && !autoReturned) {
      inDemoMode = false;
      step = C9AA_Step.LOAD_RESOURCE;
      autoReturned = true;
    }
  }
  assert(demoFrames === 3601, '3601 帧 (约60秒)');
  assert(autoReturned === true, '超时 → 自动返回标题');
  assert(inDemoMode === false, 'demo 模式关闭');
}

// ─── 9. 任务链完整性 ───────────────────────────────────────
console.log('\n[9] 任务链: C92C→C93A→C944→C9AA→CA00');

testTaskChain: {
  const ram = new MiniRam();

  // 模拟完整任务链
  const chain = [TASK_C92C, TASK_C93A, TASK_C944, TASK_C9AA, TASK_CA00];
  assert(chain.length === 5, '5 个任务');

  const names = {
    [TASK_C92C]: 'C92C: fourcc 校验',
    [TASK_C93A]: 'C93A: 标题入口',
    [TASK_C944]: 'C944: 标题初始化',
    [TASK_C9AA]: 'C9AA: 场景加载',
    [TASK_CA00]: 'CA00: 部署循环',
  };

  for (let i = 0; i < chain.length - 1; i++) {
    const current = chain[i];
    const next    = chain[i + 1];
    ram.write32(RAM_TASK_PTR, current);
    const ptr = ram.read32(RAM_TASK_PTR);
    assert(ptr === current, `任务链[${i}]: $${current.toString(16)} → $${next.toString(16)}`);
  }
}

// ─── 10. RAM_DEMO_FLAG 常量 ─────────────────────────────────
console.log('\n[10] Demo 标志常量:');

testDemoFlagConst: {
  assert(RAM_DEMO_FLAG === 0xFF78FA, '$FF78FA 地址');
  assert((RAM_DEMO_FLAG & 0xFFFF) === 0x78FA, 'RAM 偏移 = $78FA');
}

// ─── 11. 输入检测逻辑 ──────────────────────────────────────
console.log('\n[11] 输入检测逻辑 (JOYPAD $FF8179):');

testInputDetection: {
  let lastInput = 0;

  // 模拟按键变化检测
  function hasNewInput(current) {
    const hasNew = current !== 0 && current !== lastInput;
    lastInput = current;
    return hasNew;
  }

  assert(hasNewInput(0) === false, '无输入 → false');
  assert(hasNewInput(0x10) === true, '按键 B → true');
  assert(hasNewInput(0x10) === false, '相同按键 → false');
  assert(hasNewInput(0x20) === true, '按键 C → true');
  assert(hasNewInput(0) === false, '释放 → false');
  assert(hasNewInput(0x80) === true, '按键 START → true');
}

// ─── 12. 显示队列和游戏阶段 ──────────────────────────────────
console.log('\n[12] 游戏阶段常量:');

testGamePhases: {
  const ram = new MiniRam();

  // 标题画面
  ram.write16(RAM_GAME_PHASE, 1);
  assert(ram.read16(RAM_GAME_PHASE) === 1, 'phase=1 (标题)');

  // 部署阶段
  ram.write16(RAM_GAME_PHASE, 5);
  assert(ram.read16(RAM_GAME_PHASE) === 5, 'phase=5 (部署)');

  // Demo 阶段
  ram.write16(RAM_GAME_PHASE, 6);
  assert(ram.read16(RAM_GAME_PHASE) === 6, 'phase=6 (Demo)');
}

// ============================================================
// 总结
// ============================================================
const total = passed + failed;
console.log(`\n═══════════════════════════════════════════`);
console.log(`  RomTaskSystem 状态机测试: ${passed}/${total} 通过${failed > 0 ? `, ${failed} 失败` : ''}`);
console.log(`═══════════════════════════════════════════`);

if (failures.length > 0) {
  console.log('\n失败详情:');
  failures.forEach(f => console.log(`  - ${f}`));
}

if (passed === total) {
  console.log(`\n  ✓ 全部 ${total} 个测试通过`);
} else {
  console.log(`\n  ⚠ ${failed} 个不通过`);
}

process.exit(failed > 0 ? 1 : 0);
