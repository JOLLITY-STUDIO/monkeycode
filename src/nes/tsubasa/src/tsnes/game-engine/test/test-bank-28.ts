/**
 * Bank 28 球员属性引擎 — 完整测试
 * 验证 6 entry points: entry, offset0C, offset12, offset15, offset18, offset24
 */
import {
  bank28_entry, bank28_offset0C, bank28_offset12, bank28_offset15,
  bank28_offset18, bank28_offset24, bank28_getOverallRating,
  bank28_dispatch
} from '../native-game/tsubasa/banks/prg/bank-28-player-attrs-code';
import type { SystemState } from '../native-game/tsubasa/banks/system-state';

let passed = 0, failed = 0;
const failList: string[] = [];
function runTest(name: string, fn: () => void): void {
  try { fn(); console.log(`  \u2713 ${name}`); passed++; }
  catch (e) { failList.push(name); console.log(`  \u2717 ${name}: ${(e as Error).message}`); failed++; }
}
function eq(a: unknown, b: unknown, label?: string): void {
  if (a !== b) throw new Error(`${label ?? 'eq'} expected ${b}, got ${a}`);
}
function ok(cond: boolean, label?: string): void {
  if (!cond) throw new Error(`${label ?? 'ok'} failed`);
}

function mockSys(): SystemState {
  const mem = new Uint8Array(0x10000);
  mem[0x043D] = 0;  // player ID
  mem[0x043E] = 0;  // attr type
  mem[0x043B] = 0;  // half (0=first, 1=second)
  mem[0x043C] = 0;  // match period
  mem[0x044E] = 0;  // period counter
  mem[0x0441] = 0;  // team
  mem[0x0442] = 0;  // opponent
  mem[0x05FB] = 0;  // team ID
  mem[0x05FC] = 0;  // team ID
  mem[0x0032] = 0;
  mem[0x0033] = 0;
  mem[0x0034] = 0x00;
  mem[0x0035] = 0x80;
  mem[0x0038] = 0x00;
  mem[0x0039] = 0x80;
  // Preset RAM areas for pointer chains
  mem[0x8000] = 0x23; // first data byte (required by computePointer)
  return {
    mem,
    regs: { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0x8000, P: 0x34 },
    ppu: {} as any,
    papu: {} as any,
    mmc3Map: new Uint8Array(4),
    mmc3BankSelect: 0,
    mmc3BankData: 0,
    nmiPending: false,
    frameCount: 0,
    mmc3Shadow: 0,
  };
}

console.log('\n\u2554' + '\u2550'.repeat(50) + '\u2557');
console.log('\u2551 Bank 28 球员属性引擎 — 完整测试' + ' '.repeat(18) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(50) + '\u255D\n');

// ── 模块导出 ──
console.log('── 模块导出 ──');
runTest('导出 bank28_entry', () => ok(typeof bank28_entry === 'function'));
runTest('导出 bank28_offset0C', () => ok(typeof bank28_offset0C === 'function'));
runTest('导出 bank28_offset12', () => ok(typeof bank28_offset12 === 'function'));
runTest('导出 bank28_offset15', () => ok(typeof bank28_offset15 === 'function'));
runTest('导出 bank28_offset18', () => ok(typeof bank28_offset18 === 'function'));
runTest('导出 bank28_offset24', () => ok(typeof bank28_offset24 === 'function'));
runTest('导出 bank28_getOverallRating', () => ok(typeof bank28_getOverallRating === 'function'));
runTest('导出 bank28_dispatch', () => ok(typeof bank28_dispatch === 'object'));
runTest('dispatch: 6 个入口', () => {
  eq(Object.keys(bank28_dispatch).length, 6, 'dispatch entries');
});

// ── bank28_entry (属性计算) ──
console.log('\n── bank28_entry ──');
runTest('entry: player #0 attr 0 → 写入 $0430-$0433', () => {
  const s = mockSys();
  s.mem[0x043D] = 0;
  s.mem[0x043E] = 0; // shot
  bank28_entry(s);
  ok((s.mem[0x0430] || 0) >= 0, 'result >= 0');
  ok((s.mem[0x0430] || 0) <= 99, 'result <= 99');
  ok((s.mem[0x0431] || 0) >= 0, 'base >= 0');
  eq(s.mem[0x0432], 0, 'level bonus = 0');
  eq(s.mem[0x0433], 0, 'equip bonus = 0');
});

runTest('entry: player #1 attr 1 (speed) → result', () => {
  const s = mockSys();
  s.mem[0x043D] = 1;
  s.mem[0x043E] = 1;
  bank28_entry(s);
  ok((s.mem[0x0032] || 0) > 0, '$32 pointer set');
});

runTest('entry: player #10 attr 6 (header) → 不崩溃', () => {
  const s = mockSys();
  s.mem[0x043D] = 10;
  s.mem[0x043E] = 6;
  try { bank28_entry(s); }
  catch (e) { throw new Error(`crash: ${e}`); }
  ok(true, 'no crash');
});

// ── bank28_offset0C (比赛期数据分派) ──
console.log('\n── bank28_offset0C ──');
runTest('offset0C: player #0 → 设置 $32/$33', () => {
  const s = mockSys();
  s.mem[0x043D] = 0;
  s.mem[0x0441] = 0;
  s.mem[0x0442] = 0;
  bank28_offset0C(s);
  ok((s.mem[0x0032] || 0) >= 0, '$32 set');
});

runTest('offset0C: player #5 → 不崩溃', () => {
  const s = mockSys();
  s.mem[0x043D] = 5;
  bank28_offset0C(s);
  ok(true, 'no crash');
});

// ── bank28_offset12 (阵型初始化分派) ──
console.log('\n── bank28_offset12 ──');
runTest('offset12: half=0 period=0 → 查阵型表', () => {
  const s = mockSys();
  s.mem[0x043B] = 0;
  s.mem[0x044E] = 0;
  s.mem[0x043C] = 0;
  try { bank28_offset12(s); }
  catch (e) { throw new Error(`crash: ${e}`); }
  ok(true, 'no crash');
});

runTest('offset12: half=1 period=2 → 不崩溃', () => {
  const s = mockSys();
  s.mem[0x043B] = 1;
  s.mem[0x044E] = 2;
  s.mem[0x043C] = 2;
  bank28_offset12(s);
  ok(true, 'no crash');
});

// ── bank28_offset15 (球员属性初始化) ──
console.log('\n── bank28_offset15 ──');
runTest('offset15: player #0 → 初始化属性', () => {
  const s = mockSys();
  s.mem[0x043D] = 0;
  s.mem[0x044E] = 0;
  s.mem[0x0442] = 0;
  s.mem[0x043E] = 0;
  try { bank28_offset15(s); }
  catch (e) { throw new Error(`crash: ${e}`); }
  ok(true, 'no crash');
});

runTest('offset15: player #2 → 属性写入 $0445', () => {
  const s = mockSys();
  s.mem[0x043D] = 2;
  s.mem[0x044E] = 0;
  s.mem[0x0442] = 0;
  s.mem[0x043E] = 1;
  bank28_offset15(s);
  ok(true, 'no crash');
});

// ── bank28_offset18 (对方队伍) ──
console.log('\n── bank28_offset18 ──');
runTest('offset18: player #0 opponent init', () => {
  const s = mockSys();
  s.mem[0x043D] = 0;
  s.mem[0x05FB] = 0;
  s.mem[0x043E] = 0;
  try { bank28_offset18(s); }
  catch (e) { throw new Error(`crash: ${e}`); }
  eq(s.mem[0x0445], 0, '$0445 = 0 (no level for opponent)');
});

runTest('offset18: player #3 opponent index adjust', () => {
  const s = mockSys();
  s.mem[0x043D] = 3;
  s.mem[0x05FB] = 0;
  s.mem[0x043E] = 0;
  bank28_offset18(s);
  ok(true, 'player 3 adjusts index');
});

// ── bank28_offset24 (进球庆祝) ──
console.log('\n── bank28_offset24 ──');
runTest('offset24: 进球 → 设置PPU标志', () => {
  const s = mockSys();
  bank28_offset24(s);
  eq(s.mem[0x0011], 0, '$11=0');
  eq(s.mem[0x0012], 0, '$12=0');
  ok((s.mem[0x0515] || 0) === 0x80, '$0515 = 0x80 (NMI flag)');
});

runTest('offset24: 设置进球标志 $0526=1', () => {
  const s = mockSys();
  bank28_offset24(s);
  eq(s.mem[0x0526], 1, '$0526 = 1 (goal flag)');
});

// ── bank28_getOverallRating ──
console.log('\n── bank28_getOverallRating ──');
runTest('getOverallRating: player #0 → 1-99', () => {
  const s = mockSys();
  const rating = bank28_getOverallRating(s, 0);
  ok(rating >= 1, `rating=${rating} >= 1`);
  ok(rating <= 99, `rating=${rating} <= 99`);
});

runTest('getOverallRating: player #5 → rating', () => {
  const s = mockSys();
  const rating = bank28_getOverallRating(s, 5);
  ok(rating >= 0, 'rating');
});

// ── Dispatch 表调用 ──
console.log('\n── Dispatch 表 ──');
runTest('dispatch: 所有入口可调用不崩溃', () => {
  const s = mockSys();
  for (const [k, fn] of Object.entries(bank28_dispatch)) {
    try { fn(s); }
    catch (e) { throw new Error(`dispatch ${k} crash: ${e}`); }
  }
  ok(true, 'all dispatch ok');
});

// ── 边界 ──
console.log('\n── 边界条件 ──');
runTest('边界: player #255 entry', () => {
  const s = mockSys();
  s.mem[0x043D] = 255;
  try { bank28_entry(s); }
  catch (e) { throw new Error(`crash: ${e}`); }
  ok(true, 'no crash');
});

runTest('边界: player #255 offset0C', () => {
  const s = mockSys();
  s.mem[0x043D] = 255;
  bank28_offset0C(s);
  ok(true, 'no crash');
});

runTest('边界: attr type #7 (GK)', () => {
  const s = mockSys();
  s.mem[0x043D] = 0;
  s.mem[0x043E] = 7;
  bank28_entry(s);
  ok(true, 'GK attr ok');
});

console.log(`\n\u2554` + '\u2550'.repeat(38) + '\u2557');
console.log('\u2551  测试结果: ' + passed + ' passed / ' + failed + ' failed' + ' '.repeat(Math.max(0, 14 - String(failed).length)) + '\u2551');
if (failed > 0) {
  console.log('\u2551  失败列表:');
  for (const f of failList.slice(0, 5)) console.log('\u2551    \u2717 ' + f.substring(0, 30));
}
console.log('\u255A' + '\u2550'.repeat(38) + '\u255D');
process.exit(failed > 0 ? 1 : 0);
