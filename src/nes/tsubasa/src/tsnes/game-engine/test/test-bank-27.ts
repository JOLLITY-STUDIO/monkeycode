/**
 * Bank 27 球员数据 — 完整测试
 * 验证 bank27_entry, getTeamPlayers, getPlayerName, getPlayerCount
 */
import { bank27_entry, bank27_getTeamPlayers, bank27_getPlayerName, bank27_getPlayerCount, bank27_dispatch } from '../native-game/tsubasa/banks/prg/bank-27-player-data-code';
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
  mem[0x043D] = 0; // player index
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
console.log('\u2551 Bank 27 球员数据 — 完整测试' + ' '.repeat(24) + '\u2551');
console.log('\u255A' + '\u2550'.repeat(50) + '\u255D\n');

// ── 模块导出 ──
console.log('── 模块导出 ──');
runTest('导出 bank27_entry', () => ok(typeof bank27_entry === 'function'));
runTest('导出 bank27_getTeamPlayers', () => ok(typeof bank27_getTeamPlayers === 'function'));
runTest('导出 bank27_getPlayerName', () => ok(typeof bank27_getPlayerName === 'function'));
runTest('导出 bank27_getPlayerCount', () => ok(typeof bank27_getPlayerCount === 'function'));
runTest('导出 bank27_dispatch', () => ok(typeof bank27_dispatch === 'object'));

// ── bank27_entry ──
console.log('\n── bank27_entry ──');
runTest('entry: player #0 加载属性 → $0430-$043F', () => {
  const s = mockSys();
  s.mem[0x043D] = 0;
  bank27_entry(s);
  // 验证: 16 字节写入 $0430-$043F，至少部分非零
  let nonZero = 0;
  for (let i = 0; i < 16; i++) {
    if (s.mem[0x0430 + i] > 0) nonZero++;
  }
  ok(nonZero >= 4, `player #0: ${nonZero}/16 bytes non-zero (ROM data is pointer table)`);
});

runTest('entry: player #5 加载属性', () => {
  const s = mockSys();
  s.mem[0x043D] = 5;
  bank27_entry(s);
  let nonZero = 0;
  for (let i = 0; i < 16; i++) {
    if (s.mem[0x0430 + i] > 0) nonZero++;
  }
  ok(nonZero >= 1, `player #5: ${nonZero}/16 bytes non-zero`);
});

runTest('entry: player #100 不崩溃', () => {
  const s = mockSys();
  s.mem[0x043D] = 100;
  try { bank27_entry(s); }
  catch (e) { throw new Error(`player 100 crash: ${e}`); }
  ok(true, 'no crash');
});

// ── bank27_getPlayerCount ──
console.log('\n── bank27_getPlayerCount ──');
runTest('getPlayerCount: 返回正值', () => {
  const s = mockSys();
  const count = bank27_getPlayerCount(s);
  ok(count > 0, `count=${count} > 0`);
  ok(count <= 256, `count=${count} <= 256`);
});

// ── bank27_getTeamPlayers ──
console.log('\n── bank27_getTeamPlayers ──');
runTest('getTeamPlayers: team 0 返回球员列表', () => {
  const s = mockSys();
  const out: number[] = [];
  const count = bank27_getTeamPlayers(s, 0, out);
  ok(count > 0, `team 0 count=${count} > 0`);
  ok(count <= 16, `team 0 count=${count} <= 16`);
  // 验证所有索引有效
  for (let i = 0; i < count; i++) {
    ok(out[i] >= 0 && out[i] < 256, `player idx ${i}=${out[i]} valid`);
  }
});

runTest('getTeamPlayers: team 1 返回球员列表', () => {
  const s = mockSys();
  const out: number[] = [];
  const count = bank27_getTeamPlayers(s, 1, out);
  ok(count > 0, `team 1 count=${count} > 0`);
});

runTest('getTeamPlayers: team 99 不崩溃', () => {
  const s = mockSys();
  const out: number[] = [];
  try {
    bank27_getTeamPlayers(s, 99, out);
  } catch (e) { throw new Error(`team 99 crash: ${e}`); }
  ok(true, 'no crash');
});

// ── bank27_getPlayerName ──
console.log('\n── bank27_getPlayerName ──');
runTest('getPlayerName: player #0 返回名称字节', () => {
  const s = mockSys();
  const name = bank27_getPlayerName(s, 0);
  ok(name.length > 0, `name length=${name.length} > 0`);
  ok(name.length <= 4, `name length=${name.length} <= 4`);
});

runTest('getPlayerName: player #5 返回名称', () => {
  const s = mockSys();
  const name = bank27_getPlayerName(s, 5);
  ok(name.length >= 0, 'name array exists');
});

// ── Dispatch 表 ──
console.log('\n── Dispatch 表 ──');
runTest('dispatch: 0x00→bank27_entry', () => eq(bank27_dispatch[0x00], bank27_entry));
runTest('dispatch: 所有函数可调用', () => {
  const s = mockSys();
  for (const [k, fn] of Object.entries(bank27_dispatch)) {
    try { fn(s); }
    catch (e) { throw new Error(`dispatch ${k} crash: ${e}`); }
  }
  ok(true, 'all dispatch ok');
});

console.log(`\n\u2554` + '\u2550'.repeat(38) + '\u2557');
console.log('\u2551  测试结果: ' + passed + ' passed / ' + failed + ' failed' + ' '.repeat(Math.max(0, 14 - String(failed).length)) + '\u2551');
if (failed > 0) {
  console.log('\u2551  失败列表:');
  for (const f of failList.slice(0, 5)) console.log('\u2551    \u2717 ' + f.substring(0, 30));
}
console.log('\u255A' + '\u2550'.repeat(38) + '\u255D');
process.exit(failed > 0 ? 1 : 0);
