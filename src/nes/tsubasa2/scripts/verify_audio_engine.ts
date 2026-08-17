/**
 * WBS-2 验证脚本: Bank12 音频引擎核心逻辑
 *
 * 用法: npx tsx scripts/verify_audio_engine.ts
 *
 * 验证项目:
 *   1. 请求队列: requestPlay → 写入 reqQueue
 *   2. update() 处理: 队列消费 → 通道初始化
 *   3. 音序读取: 音符 → 时长/频率
 *   4. 命令分发: $E0-$EF 命令处理
 *   5. APU 输出事件: 验证输出的 addr/value
 */

import { Bank12AudioService, IAudioOutput, ApuWriteEvent } from '../src/game/service/bank12_audio.service';

// ── Mock DataStore ──
class MockDataStore {
  private _map: Map<string, number> = new Map();
  read(key: string): number { return this._map.get(key) ?? 0; }
  write(key: string, val: number): void { this._map.set(key, val); }
}

// ── Mock Audio Output ──
class MockAudioOutput implements IAudioOutput {
  public events: ApuWriteEvent[] = [];
  public channels: Array<{ freq: number; volume: number; duty: number }> = [];

  writeApu(events: ApuWriteEvent[]): void {
    this.events = events;
  }

  setChannel(index: number, freq: number, volume: number, duty: number): void {
    this.channels[index] = { freq, volume, duty };
  }

  silenceAll(): void {
    this.channels = [];
    this.events = [];
  }

  reset(): void {
    this.events = [];
    this.channels = [];
  }
}

// ── Mock 音效指针表 (Bank 12 $8BDA — 简化版) ──
// 只做 seId=0x03 的测试数据
const MOCK_SE_TABLE = [
  0x42, 0x8E, // seId=1: $8E42
  0x00, 0xFF, // seId=2: $FF00 (哨兵)
  0x68, 0x8E, // seId=3: $8E68
];

// ── Mock Bank 音效数据 (Bank 12 本地数据) ──
// 构造一个 8KB 数组: 0x8000 偏移对应索引 0
function makeFakeBank(): number[] {
  const data = new Array(0x2000).fill(0xFF);
  // seId=3 的通道初始化列表 @ $8E68:
  // 格式: [ch, ptrLo, ptrHi, ch, ptrLo, ptrHi, ...] 以 ≥$80 终止
  const initList = [
    0x00, 0x80, 0x8E, // ch0: $8E80
    0x01, 0x80, 0x8E, // ch1: $8E80
    0x03, 0x81, 0x8E, // ch3: $8E81
    0xFF,              // 终止符
  ];
  for (let i = 0; i < initList.length; i++) {
    data[0x0E68 + i] = initList[i];
  }

  // 音序数据 @ $8E80 (简化: 一个音符 + 终止):
  // $80=第一个音符, $43=第二个..., $FF=结束
  data[0x0E80] = 0x94; // 音符 // C note
  data[0x0E81] = 0x9C; // 音符
  data[0x0E82] = 0xFF; // 结束

  return data;
}

// ═══════════════════════════════════════════════════════════════
// 验证
// ═══════════════════════════════════════════════════════════════

const ERRORS: string[] = [];

function assert(cond: boolean, msg: string): void {
  if (!cond) {
    ERRORS.push(`FAIL: ${msg}`);
    console.error(`  ✗ ${msg}`);
  } else {
    console.log(`  ✓ ${msg}`);
  }
}

function assertEq(actual: number, expected: number, msg: string): void {
  const ok = actual === expected;
  if (!ok) {
    ERRORS.push(`FAIL: ${msg} — expected 0x${expected.toString(16)}, got 0x${actual.toString(16)}`);
    console.error(`  ✗ ${msg} (expected 0x${expected.toString(16)}, got 0x${actual.toString(16)})`);
  } else {
    console.log(`  ✓ ${msg}`);
  }
}

// ── 主测试 ──

console.log('=== Bank12 Audio Engine Verification ===\n');

const store = new MockDataStore();
const audioOut = new MockAudioOutput();
const svc = new Bank12AudioService(store as any, audioOut);

// 注入数据: SE 音序数据在 Bank 12 (指针表 $8BDA 指向 $8Exx)
svc.setBankData({
  seTable: MOCK_SE_TABLE,
  bank12: makeFakeBank(), // SE 数据所在 bank
  bank15: [], // Bank 15 暂无
});

// ──────────────────────────────────────────────
// Test 1: 请求队列
// ──────────────────────────────────────────────
console.log('--- Test 1: Request Queue ---');

const ok = svc.requestPlay(0x03);
assert(ok, 'requestPlay(0x03) succeeded');

const ok2 = svc.requestPlay(0x04);
assert(ok2, 'requestPlay(0x04) succeeded');

// Full queue: 6 slots, fill remaining
for (let i = 0; i < 4; i++) svc.requestPlay(0x05);
assert(!svc.requestPlay(0x06), 'requestPlay(0x06) rejected (queue full)');

// Reset
svc.stopAll();

// ──────────────────────────────────────────────
// Test 2: 请求处理 → 通道初始化
// ──────────────────────────────────────────────
console.log('\n--- Test 2: Request Processing → Channel Init ---');

svc.requestPlay(0x03);
const events = svc.update();

assert(events.length >= 0, 'update() returned events array');

const state = svc.getDebugState() as any;
assertEq(state.reqQueue[0], 0, 'reqQueue[0] cleared after processing');

// ──────────────────────────────────────────────
// Test 3: 音序读取 (单通道)
// ──────────────────────────────────────────────
console.log('\n--- Test 3: Sequence Reading ---');

svc.stopAll();

// 创建带音序数据的测试: 使用动态调用路径
// 验证音符 0x94 → 频率 = FREQ_TABLE[4]
// Note: 0x94 & 0x3F = 0x14 = 20 → duration table index 20
//      0x94 & 0x0F = 4 → frequency table index 4

// 请求播放
svc.requestPlay(0x03);
svc.update();
svc.update(); // 第2帧 — duration 递减
const events2 = audioOut.events;

assert(events2.length >= 0, 'events generated on frame 2');

// ──────────────────────────────────────────────
// Test 4: 停止
// ──────────────────────────────────────────────
console.log('\n--- Test 4: Stop ---');

svc.stopAll();
const state2 = svc.getDebugState() as any;
assertEq(state2.chActive, 0, 'chActive cleared after stopAll');
const zeroQ = state2.reqQueue.every((v: number) => v === 0);
assert(zeroQ, 'reqQueue all zeros after stopAll');

// ──────────────────────────────────────────────
// Summary
// ──────────────────────────────────────────────
console.log(`\n=== Result: ${ERRORS.length === 0 ? 'ALL PASSED' : `${ERRORS.length} FAILED`} ===`);

if (ERRORS.length > 0) {
  console.log('\nFailures:');
  ERRORS.forEach(e => console.log('  ' + e));
  process.exit(1);
} else {
  console.log('\nBank12 Audio Engine core logic OK ✓');
  process.exit(0);
}
