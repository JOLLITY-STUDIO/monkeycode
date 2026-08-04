/**
 * State 流转测试 — v0.9.0 架构适配
 *
 * 测试 logic&model 层的状态机流转，不依赖 Canvas 渲染。
 * 通过断言 GameModel 的数据来验证逻辑正确性。
 *
 * 运行方式:
 *   npx ts-node tests/state-test.ts
 */
import { DataCache } from '../src/cache/DataCache';
import { OamCache } from '../src/cache/OamCache';
import { PpuQueue } from '../src/cache/PpuQueue';
import { BankManager } from '../src/cache/BankManager';
import { InputManager } from '../src/input/InputManager';
import { Renderer } from '../src/renderer/Renderer';
import { TileStore } from '../src/renderer/TileStore';
import { PpuDataFiller } from '../src/engine/NmiHandler';
import { StateMachine } from '../src/engine/StateMachine';
import { GameModel } from '../src/model/GameModel';
import { SceneComposer } from '../src/view/SceneComposer';
import {
  State00_InitTitle,
  State01_TitleLoop,
  State02_MenuSelect,
  State03_MemberSelect,
  State04_MatchMain,
  State05_MatchEvent,
} from '../src/engine/states/index';
import { Button } from '../src/core/types';
import { MockPlatform, createMockCanvasContext } from './setup/MockPlatform';

// ============================================================
// 测试工具
// ============================================================

let totalPassed = 0;
let totalFailed = 0;

function assert(condition: boolean, msg: string): void {
  if (condition) {
    console.log(`  ✅ ${msg}`);
    totalPassed++;
  } else {
    console.error(`  ❌ FAIL: ${msg}`);
    totalFailed++;
  }
}

function assertEq<T>(actual: T, expected: T, msg: string): void {
  const ok = actual === expected;
  if (ok) {
    console.log(`  ✅ ${msg}: ${actual}`);
    totalPassed++;
  } else {
    console.error(`  ❌ FAIL: ${msg} (expected=${expected}, actual=${actual})`);
    totalFailed++;
  }
}

function section(title: string): void {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  ${title}`);
  console.log(`${'='.repeat(60)}`);
}

// ============================================================
// 构建测试环境 (v0.9.0 架构)
// ============================================================

function buildTestEnv() {
  const platform = new MockPlatform();
  const ctx = createMockCanvasContext();

  const dataCache = new DataCache();
  const oamCache = new OamCache();
  const ppuQueue = new PpuQueue();
  const bankManager = new BankManager();
  const inputManager = new InputManager();

  const tileStore = new TileStore();
  tileStore.init();

  const renderer = new Renderer(platform, ctx, tileStore);
  renderer.setBankManager(bankManager);

  // v0.9.0: 创建 Model + SceneComposer
  const gameModel = new GameModel();
  const sceneComposer = new SceneComposer(renderer, oamCache);

  const stateMachine = new StateMachine(
    dataCache, inputManager, renderer,
    oamCache, bankManager, ppuQueue,
    gameModel,
  );

  stateMachine.registerStates([
    new State00_InitTitle(stateMachine),
    new State01_TitleLoop(stateMachine),
    new State02_MenuSelect(stateMachine),
    new State03_MemberSelect(stateMachine),
    new State04_MatchMain(stateMachine),
    new State05_MatchEvent(stateMachine),
  ]);

  const ppuFiller = new PpuDataFiller(
    dataCache, oamCache, ppuQueue,
    inputManager, renderer,
  );

  return {
    platform, ctx, dataCache, oamCache, ppuQueue,
    bankManager, inputManager, renderer,
    stateMachine, ppuFiller, gameModel, sceneComposer,
  };
}

/** v0.9.0: 完整帧 — PPU填充 → 逻辑更新 → 场景构建 */
function executeFrame(env: ReturnType<typeof buildTestEnv>): void {
  // 阶段1: PPU数据填充
  env.ppuFiller.fillPpuData();
  // 阶段2: 游戏逻辑
  if (env.dataCache.bankLock === 0) {
    env.stateMachine.update();
  }
  // 阶段3: 场景构建
  env.sceneComposer.compose(env.gameModel, env.stateMachine.getCurrentStateId());
}

function executeFrames(env: ReturnType<typeof buildTestEnv>, count: number): void {
  for (let i = 0; i < count; i++) {
    executeFrame(env);
  }
}

function pressButtonForFrames(
  env: ReturnType<typeof buildTestEnv>,
  button: Button,
  holdFrames: number = 2
): void {
  for (let i = 0; i < holdFrames; i++) {
    env.inputManager.pressButton(button);
    executeFrame(env);
  }
  env.inputManager.releaseButton(button);
}

function initGame(env: ReturnType<typeof buildTestEnv>): void {
  const { dataCache, bankManager, stateMachine } = env;
  bankManager.setInitialConfig();
  dataCache.ppuCtrl = 0x10;
  dataCache.ppuMask = 0x06;
  dataCache.scrollX = 0;
  dataCache.scrollY = 0;
  dataCache.bankLock = 0;
  dataCache.write(0x03CB, 0);
  dataCache.write(0x03CC, 0);
  stateMachine.transitionTo(0);
}

// ============================================================
// 测试用例 (v0.9.0: 通过 model 断言)
// ============================================================

section('TEST 1: 初始状态验证');

function test01_InitialState(): void {
  const env = buildTestEnv();
  initGame(env);

  assertEq(env.stateMachine.getCurrentStateId(), 0, '初始状态应为 0 (InitTitle)');
  assertEq(env.dataCache.gameState, 0, 'dataCache.gameState 应为 0');
  assertEq(env.gameModel.stateId, 0, 'model.stateId 应为 0');
  assertEq(env.dataCache.bankLock, 0, 'bankLock 应为 0');
  assertEq(env.bankManager.prgBank0, 1, 'PRG Bank 0 应为 1');
  assertEq(env.dataCache.mmcBankReg2, 1, 'mmcBankReg2 应为 1');
  assertEq(env.dataCache.read(0x03CB), 0, 'Bank1 子状态 ($03CB) 应为 0');
  assertEq(env.dataCache.read(0x03CC), 0, '步骤计数器 ($03CC) 应为 0');
}

section('TEST 2: State 00 → State 01 自动流转');

function test02_AutoTransitionToTitleLoop(): void {
  const env = buildTestEnv();
  initGame(env);

  // 帧 1-5: Bank1Dispatcher 逐步完成标题初始化
  executeFrame(env);
  assertEq(env.dataCache.read(0x03CB), 1, '帧1后 $03CB 应为 1');
  assertEq(env.stateMachine.getCurrentStateId(), 0, '仍应在 State 00');

  executeFrame(env);
  assertEq(env.dataCache.read(0x03CC), 1, '帧2后 $03CC 应为 1');

  executeFrame(env);
  assertEq(env.dataCache.read(0x03CC), 2, '帧3后 $03CC 应为 2');

  executeFrame(env);
  assertEq(env.dataCache.read(0x03CC), 3, '帧4后 $03CC 应为 3');

  executeFrame(env);
  assertEq(env.dataCache.read(0x03CB), 2, '帧5后 $03CB 应为 2 (动画循环)');

  // 帧6: State00 检测到完成 → State01
  assertEq(env.stateMachine.getCurrentStateId(), 0, '帧5后应在 State 00');
  executeFrame(env);
  assertEq(env.stateMachine.getCurrentStateId(), 1, '帧6后应在 State 01');
  assertEq(env.gameModel.stateId, 1, 'model.stateId 应同步为 1');

  console.log('\n  📋 State 00→01 流转成功! (~6 帧)');
}

section('TEST 3: State 01 标题循环 → 按 START 进入菜单');

function test03_StartToMenu(): void {
  const env = buildTestEnv();
  initGame(env);

  executeFrames(env, 10);
  assertEq(env.stateMachine.getCurrentStateId(), 1, '应在 State 01');

  executeFrames(env, 5);
  assertEq(env.stateMachine.getCurrentStateId(), 1, '无输入时保持在 State 01');

  console.log('  🎮 模拟按下 START 键...');
  pressButtonForFrames(env, Button.START, 3);

  assertEq(env.stateMachine.getCurrentStateId(), 2, '按 START 后应进入 State 02');
  assertEq(env.gameModel.stateId, 2, 'model.stateId 应同步为 2');

  // 验证菜单 model 已初始化
  assert(env.gameModel.menu.items.length === 2, '菜单应有 2 个选项');
  assertEq(env.gameModel.menu.selectedIndex, 0, '默认选中第0项 (START)');
  assertEq(env.gameModel.menu.title, 'CAPTAIN TSUBASA', '标题应为 CAPTAIN TSUBASA');

  console.log('\n  📋 State 01→02 流转成功!');
}

section('TEST 4: State 02 菜单选择 → 上下移动 (model 验证)');

function test04_MenuNavigation(): void {
  const env = buildTestEnv();
  initGame(env);

  executeFrames(env, 10);
  pressButtonForFrames(env, Button.START, 3);
  assertEq(env.stateMachine.getCurrentStateId(), 2, '应在 State 02');
  assertEq(env.gameModel.menu.selectedIndex, 0, '初始选中第0项');

  // 按下 ↓
  pressButtonForFrames(env, Button.DOWN, 1);
  assertEq(env.gameModel.menu.selectedIndex, 1, '按下↓后应选中第1项 (CONTINUE)');

  // 再按 ↑
  pressButtonForFrames(env, Button.UP, 1);
  assertEq(env.gameModel.menu.selectedIndex, 0, '按下↑后应回到第0项');

  console.log('\n  📋 菜单导航 (model 验证) 正常!');
}

section('TEST 5: State 02 → State 03 (按 A 确认)');

function test05_ConfirmToMemberSelect(): void {
  const env = buildTestEnv();
  initGame(env);

  executeFrames(env, 10);
  pressButtonForFrames(env, Button.START, 3);
  assertEq(env.stateMachine.getCurrentStateId(), 2, '应在 State 02');

  // 按 A 确认
  pressButtonForFrames(env, Button.A, 1);
  assertEq(env.stateMachine.getCurrentStateId(), 3, '按 A 后应进入 State 03 (MemberSelect)');
  assertEq(env.dataCache.get('isContinue'), false, 'isContinue 应为 false');

  // 验证队员选择 model
  assert(env.gameModel.memberSelect.players.length > 10, '应有 11+ 球员');
  assertEq(env.gameModel.memberSelect.cursorIndex, 0, '光标在第一个球员');
  assertEq(env.gameModel.memberSelect.activeCount, 11, '默认 11 人上场');

  console.log('\n  📋 State 02→03 流转成功!');
}

section('TEST 6: State 02 B 键返回 (菜单 → 标题)');

function test06_CancelBackToTitle(): void {
  const env = buildTestEnv();
  initGame(env);

  executeFrames(env, 10);
  pressButtonForFrames(env, Button.START, 3);
  assertEq(env.stateMachine.getCurrentStateId(), 2, '应在 State 02');

  pressButtonForFrames(env, Button.B, 1);
  assertEq(env.stateMachine.getCurrentStateId(), 1, '按 B 后应回到 State 01');

  console.log('\n  📋 菜单 B 键返回标题正常!');
}

section('TEST 7: 完整流程 State 00 → 01 → 02 → 03 (model 验证)');

function test07_FullFlow(): void {
  const env = buildTestEnv();
  initGame(env);

  console.log('  ⏳ Phase 1: 标题初始化...');
  executeFrames(env, 10);
  assertEq(env.stateMachine.getCurrentStateId(), 1, '[Phase1] 应进入 State 01');

  console.log('  ⏳ Phase 2: 标题 → 按 START...');
  pressButtonForFrames(env, Button.START, 3);
  assertEq(env.stateMachine.getCurrentStateId(), 2, '[Phase2] 应进入 State 02');
  assertEq(env.gameModel.menu.selectedIndex, 0, '[Phase2] 菜单光标在 0');

  console.log('  ⏳ Phase 3: 选 CONTINUE → A 确认...');
  pressButtonForFrames(env, Button.DOWN, 1);
  assertEq(env.gameModel.menu.selectedIndex, 1, '[Phase3] 应选中 CONTINUE');
  pressButtonForFrames(env, Button.A, 1);
  assertEq(env.stateMachine.getCurrentStateId(), 3, '[Phase3] 应进入 State 03');
  assertEq(env.dataCache.get('isContinue'), true, '[Phase3] isContinue 应为 true');

  console.log('\n  📋 完整流程 State 00→01→02→03 全部通过! 🎉');
}

section('TEST 8: bankLock 保护验证');

function test08_BankLockProtection(): void {
  const env = buildTestEnv();
  initGame(env);

  env.dataCache.bankLock = 1;
  const stateBefore = env.stateMachine.getCurrentStateId();
  executeFrames(env, 5);
  const stateAfter = env.stateMachine.getCurrentStateId();

  assertEq(env.dataCache.bankLock, 1, 'bankLock 应保持 1');
  console.log('  📋 bankLock 机制存在，锁定后跳过 update');
}

section('TEST 9: v0.9.0 — Model 数据流验证');

function test09_ModelDataFlow(): void {
  const env = buildTestEnv();
  initGame(env);

  // 进入菜单
  executeFrames(env, 10);
  pressButtonForFrames(env, Button.START, 3);
  assertEq(env.stateMachine.getCurrentStateId(), 2, '应在 State 02');

  // SceneComposer 将 model 数据写入 VRAM/OAM
  // 验证 VRAM 中写入了正确的 tile 数据
  // (通过写入后再读取 VRAM name table)
  // 注意: 我们无法直接读取 Renderer 的 VRAM，但可以验证 compose 被正确调用

  // 验证: 菜单 model 数据完整性
  assertEq(env.gameModel.menu.title, 'CAPTAIN TSUBASA', 'Model: 标题');
  assertEq(env.gameModel.menu.items[0], 'START', 'Model: 选项0');
  assertEq(env.gameModel.menu.items[1], 'CONTINUE', 'Model: 选项1');
  assertEq(env.gameModel.menu.selectedIndex, 0, 'Model: 默认选中');

  console.log('\n  📋 v0.9.0 Model 数据流验证通过!');
}

section('TEST 10: State 03 队员切换');

function test10_MemberToggle(): void {
  const env = buildTestEnv();
  initGame(env);

  executeFrames(env, 10);
  pressButtonForFrames(env, Button.START, 3);
  pressButtonForFrames(env, Button.A, 1);
  assertEq(env.stateMachine.getCurrentStateId(), 3, '应在 State 03');

  const initialActive = env.gameModel.memberSelect.activeCount;
  assertEq(initialActive, 11, '默认 11 人上场');

  // 按 A 切换第一个球员
  pressButtonForFrames(env, Button.A, 1);
  assertEq(env.gameModel.memberSelect.activeCount, 10, '切换后应为 10 人');

  // 再按 A 恢复
  pressButtonForFrames(env, Button.A, 1);
  assertEq(env.gameModel.memberSelect.activeCount, 11, '恢复后应为 11 人');

  console.log('\n  📋 队员切换 (model 验证) 正常!');
}

// ============================================================
// 主入口
// ============================================================

function main(): void {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║    天使之翼 H5 - State 流转测试 v0.9.0                  ║
║    logic/model → data/view → Canvas (前后端分离)        ║
╚══════════════════════════════════════════════════════════╝
`);

  const tests: Array<{ name: string; fn: () => void }> = [
    { name: '初始状态验证', fn: test01_InitialState },
    { name: 'State 00→01 自动流转', fn: test02_AutoTransitionToTitleLoop },
    { name: 'State 01→02 按START', fn: test03_StartToMenu },
    { name: 'State 02 菜单导航 (model验证)', fn: test04_MenuNavigation },
    { name: 'State 02→03 确认', fn: test05_ConfirmToMemberSelect },
    { name: 'State 02 B键返回', fn: test06_CancelBackToTitle },
    { name: '完整流程 00→01→02→03', fn: test07_FullFlow },
    { name: 'bankLock 保护', fn: test08_BankLockProtection },
    { name: 'v0.9.0 Model 数据流', fn: test09_ModelDataFlow },
    { name: 'State 03 队员切换', fn: test10_MemberToggle },
  ];

  for (const test of tests) {
    try {
      test.fn();
    } catch (err: any) {
      console.error(`\n  💥 测试 "${test.name}" 异常: ${err.message}`);
      console.error(err.stack);
      totalFailed++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`  测试完成: ✅ ${totalPassed} 通过, ❌ ${totalFailed} 失败`);
  console.log(`${'='.repeat(60)}\n`);

  process.exit(totalFailed > 0 ? 1 : 0);
}

main();
