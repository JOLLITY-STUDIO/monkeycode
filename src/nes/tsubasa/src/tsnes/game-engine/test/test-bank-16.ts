/**
 * Bank 16 场景脚本引擎 — 独立测试
 * 验证 bank16_dispatchEntry、sceneTick 及 dispatch 表
 */
import { bank16_dispatchEntry, bank16_sceneTick, bank16_dispatch } from '../native-game/tsubasa/banks/prg/bank-16-scene-script-engine-code';
import type { SystemState } from '../native-game/tsubasa/banks/system-state';

let passed = 0, failed = 0;
function runTest(name: string, fn: () => void): void {
  try { fn(); console.log(`  \u2713 ${name}`); passed++; }
  catch (e) { console.log(`  \u2717 ${name}: ${(e as Error).message}`); failed++; }
}
function eq(a: unknown, b: unknown, label?: string): void {
  if (a !== b) throw new Error(`${label ?? 'eq'} expected ${b}, got ${a}`);
}
function ok(cond: boolean, label?: string): void {
  if (!cond) throw new Error(`${label ?? 'ok'} failed`);
}

function mockSys(): SystemState {
  const mem = new Uint8Array(0x8000);
  mem[0x05EA] = 0x00;  // sceneIdx
  mem[0x0628] = 0x00;  // PPU 队列索引
  mem[0x0523] = 0x00;  // PPU addr lo
  mem[0x0524] = 0x20;  // PPU addr hi
  mem[0x0516] = 0x00;
  mem[0x0515] = 0x00;
  mem[0x052A] = 0x00;  // 场景标志
  mem[0x0522] = 0x00;  // 调用栈指针
  mem[0x3A] = 0x00;    // 脚本偏移
  mem[0x5D] = 0x00;    // 指针 lo
  mem[0x5E] = 0x80;    // 指针 hi (指向 $8000)
  // 在 $8000 处放一个 $FF (脚本结束) 字节
  mem[0x8000] = 0xFF;
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
console.log('\u2551 Bank 16 场景脚本引擎测试' + ' '.repeat(26) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(50) + '\u255D\n');

// ── 模块导出检查 ──
runTest('导出 bank16_dispatchEntry (函数)', () => {
  ok(typeof bank16_dispatchEntry === 'function');
});

runTest('导出 bank16_sceneTick (函数)', () => {
  ok(typeof bank16_sceneTick === 'function');
});

runTest('导出 bank16_dispatch (对象)', () => {
  ok(typeof bank16_dispatch === 'object' && bank16_dispatch !== null);
});

// ── Dispatch 表结构 ──
runTest('dispatch 表: 0x00 → bank16_dispatchEntry', () => {
  eq(bank16_dispatch[0x00], bank16_dispatchEntry);
});

runTest('dispatch 表: 0x03 → bank16_sceneTick', () => {
  eq(bank16_dispatch[0x03], bank16_sceneTick);
});

runTest('dispatch 表: 共 2 个入口', () => {
  eq(Object.keys(bank16_dispatch).length, 2);
});

// ── 基础执行 ──
runTest('bank16_dispatchEntry 不崩溃 (scene #0 → $FF 终止)', () => {
  const sys = mockSys();
  // 在 $8000 放 scene pointer: lo=$FF, hi=$FF (脚本含 $FF → 终止)
  bank16_dispatchEntry(sys);
  // 无效指针不修改 $5D/$5E
});

runTest('bank16_sceneTick 不崩溃 (无活跃脚本)', () => {
  const sys = mockSys();
  sys.mem[0x5D] = 0x00;
  sys.mem[0x5E] = 0x00;
  bank16_sceneTick(sys);
  // 无活跃脚本时不执行
});

// ── sceneTick 跳过无效指针 ──
runTest('bank16_sceneTick 无活跃脚本时跳过', () => {
  const sys = mockSys();
  sys.mem[0x5D] = 0x00;
  sys.mem[0x5E] = 0x00;
  sys.mem[0x3A] = 0x00;
  bank16_sceneTick(sys);
  eq(sys.mem[0x3A], 0x00, 'offset unchanged');
});

console.log('\n\u2554' + '\u2550'.repeat(38) + '\u2557');
console.log('\u2551  测试结果: ' + passed + ' passed / ' + failed + ' failed' + ' '.repeat(Math.max(0, 14 - String(failed).length)) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(38) + '\u255D');
process.exit(failed > 0 ? 1 : 0);
