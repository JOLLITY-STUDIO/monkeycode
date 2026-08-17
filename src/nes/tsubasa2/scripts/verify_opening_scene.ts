/**
 * WBS-4 验证脚本: 开场场景状态机
 *
 * 用法: npx tsx scripts/verify_opening_scene.ts
 *
 * 验证:
 *   1. 初始化 → LOGO 镜
 *   2. 帧推进 → 自动切换镜 (LOGO→TSUBASA→HYUGA→...→TITLE)
 *   3. START 跳过 → 快速推进
 *   4. 标题画面 → 菜单操作
 *   5. 完成状态 → 场景切换
 */

import { DataStore } from '../src/game/data/DataStore';
import { OpeningSceneController, OpeningDisplayState } from '../src/game/service/bank00/scene_opening.controller';
import { OpeningShot, TitleMenu } from '../src/game/data/scene/index';

// ═══════════════════════════════════════════════════════════════
// 验证
// ═══════════════════════════════════════════════════════════════

const ERRORS: string[] = [];

function assert(cond: boolean, msg: string): void {
  if (!cond) { ERRORS.push('FAIL: ' + msg); }
}

function assertEq(actual: any, expected: any, msg: string): void {
  if (actual !== expected) {
    ERRORS.push('FAIL: ' + msg + ' — expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual));
  }
}

function log(msg: string): void {
  console.log('  ' + msg);
}

// ── 主测试 ──

console.log('=== Opening Scene Verification ===\n');

const store = new DataStore();
const ctrl = new OpeningSceneController(store);

// ──────────────────────────────────────────────
// Test 1: 初始化
// ──────────────────────────────────────────────
console.log('--- Test 1: Init ---');
ctrl.init();
assertEq(ctrl.shot, OpeningShot.LOGO, 'Initial shot = LOGO');
assert(!ctrl.isTitle, 'Initial isTitle = false');
assert(!ctrl.complete, 'Initial complete = false');
log('Init OK');

// ──────────────────────────────────────────────
// Test 2: 模拟帧推进 — LOGO 镜
// ──────────────────────────────────────────────
console.log('\n--- Test 2: LOGO shot ---');
let state = ctrl.update(0);
assertEq(state.shot, OpeningShot.LOGO, 'Frame 1: still LOGO');
assert(state.showLogo, 'showLogo = true');
assert(!state.showPortrait, 'showPortrait = false');
assertEq(state.text, 'TECMO', 'text = TECMO');

// 推进到 LOGO 结束前
for (let i = 1; i < 180; i++) {
  state = ctrl.update(0);
}
// 再过一帧应该切换到 TSUBASA
log('LOGO shot complete after 180 frames');

// ──────────────────────────────────────────────
// Test 3: 自动切换到 TSUBASA
// ──────────────────────────────────────────────
console.log('\n--- Test 3: Auto transition TSUBASA ---');
state = ctrl.update(0); // frame 181 → should trigger transition
state = ctrl.update(0); // frame 2 of TSUBASA (transition fades in)
// After transition completes
for (let i = 0; i < 20; i++) state = ctrl.update(0);
assertEq(state.shot, OpeningShot.TSUBASA, 'After LOGO → TSUBASA');
assertEq(state.text, '大空 翼', 'text = TSUBASA');
assert(state.showPortrait, 'showPortrait = true');
log('Auto transition LOGO → TSUBASA OK');

// ──────────────────────────────────────────────
// Test 4: START 跳过 (上升沿检测)
// ──────────────────────────────────────────────
console.log('\n--- Test 4: START skip ---');
ctrl.init();

// 模拟按 START: 先 release(down+up edge)
state = ctrl.update(0x10);  // press START
state = ctrl.update(0x00);  // release
// 再 press
state = ctrl.update(0x10);  // press START (this should trigger)
// Check: should have advanced past LOGO
// Need a few more frames for transition
for (let i = 0; i < 20; i++) state = ctrl.update(0);

// Should now be past LOGO
assert(state.shot !== OpeningShot.LOGO, 'START skip advances from LOGO');
assert(state.shot === OpeningShot.TSUBASA
  || state.shot === OpeningShot.HYUGA
  || state.shot === OpeningShot.MISAKI
  || state.shot === OpeningShot.WAKABAYASHI
  || state.shot === OpeningShot.WORLD_CUP
  || state.shot === OpeningShot.TITLE,
  'START skip reached a valid shot');
log('START skip OK: now at shot ' + state.shot);

// ──────────────────────────────────────────────
// Test 5: 完整序列到标题
// ──────────────────────────────────────────────
console.log('\n--- Test 5: Full sequence to TITLE ---');
ctrl.init();
let currentShot = 0;
for (let f = 0; f < 2000 && !ctrl.complete; f++) {
  state = ctrl.update(0);
  if (state === undefined) break;
}
assert(ctrl.isTitle || ctrl.complete, 'Reached title or complete');
if (ctrl.isTitle) {
  assertEq(ctrl.titleCursor, TitleMenu.KICKOFF, 'Title cursor = KICKOFF');
  log('Reached TITLE screen');
}

// ──────────────────────────────────────────────
// Test 6: 标题菜单操作
// ──────────────────────────────────────────────
console.log('\n--- Test 6: Title menu ---');

// 重新到标题
ctrl.init();
for (let f = 0; f < 2000 && !ctrl.isTitle; f++) {
  state = ctrl.update(0);
}

if (ctrl.isTitle) {
  assertEq(ctrl.titleCursor, 0, 'Cursor starts at 0');

  ctrl.cursorDown();
  assertEq(ctrl.titleCursor, 1, 'Cursor down → 1');

  ctrl.cursorDown();
  assertEq(ctrl.titleCursor, 1, 'Cursor at max (1 items)');

  ctrl.cursorUp();
  assertEq(ctrl.titleCursor, 0, 'Cursor up → 0');

  ctrl.cursorUp();
  assertEq(ctrl.titleCursor, 0, 'Cursor at min (0)');

  // KICK OFF → complete
  // simulate START on title screen
  state = ctrl.update(0x10);
  state = ctrl.update(0x00);
  state = ctrl.update(0x10);
  for (let i = 0; i < 5; i++) state = ctrl.update(0);

  log('Title menu operations OK');
}

// ──────────────────────────────────────────────
// Summary
// ──────────────────────────────────────────────
console.log('\n=== Result: ' + (ERRORS.length === 0 ? 'ALL PASSED' : ERRORS.length + ' FAILED') + ' ===');

if (ERRORS.length > 0) {
  console.log('\nFailures:');
  ERRORS.forEach(e => console.log('  ' + e));
  process.exit(1);
} else {
  console.log('\nOpening Scene Controller OK');
  process.exit(0);
}
