/**
 * 无头测试 — 验证 BGM00Player 音序器逻辑和帧渲染
 * 使用 Node.js + ts-node 或 tsc 编译后运行
 * 
 * Usage: npx ts-node test-bgm00-player.ts
 *   或编译后: tsc && node test-bgm00-player.js
 */
import { BGM00Player } from './BGM00Player';
import {
  BGM00_RAW,
  BGM00_TRACK_SQ1,
  BGM00_TRACK_SQ2,
  BGM00_TRACK_TRI,
  BGM00_TRACK_NOISE,
  BGM00_META,
} from './BGM00';

// ── 静音音频回调 (仅测试音序器，不产生音频) ──
let totalSamples = 0;
let frameCount = 0;

function onSample(_l: number, _r: number): void {
  totalSamples++;
}

// ── 测试 1: 加载 & 启动 ──
console.log('=== BGM00Player 无头测试 ===\n');
console.log(`BGM: ${BGM00_META.name}`);
console.log(`来源: ${BGM00_META.source}`);
console.log(`通道: ${BGM00_META.tracks.map(t => t.name).join(', ')}`);

const player = new BGM00Player(48000, onSample);

// BGM00 data is at Bank15 NES addr $B7AD → BGM00_RAW offset 0
// With shared raw data, CALL/JUMP commands resolve to correct subroutines
const loaded = player.load(
  BGM00_TRACK_SQ1,
  BGM00_TRACK_SQ2,
  BGM00_TRACK_TRI,
  BGM00_TRACK_NOISE,
  BGM00_RAW,       // shared raw data for CALL/JUMP address resolution
  0xB7AD,          // NES base address (Bank 15 start of BGM00 data)
);
console.log(`\n加载结果: ${loaded ? 'OK' : 'FAIL'}`);

const started = player.start();
console.log(`启动结果: ${started ? 'OK' : 'FAIL'}`);

if (!started) {
  console.error('FAIL: 播放器启动失败 (activeMask=0)');
  process.exit(1);
}

// ── 测试 2: 帧渲染 ──
console.log('\n--- 帧渲染测试 ---');
const testFrames = 600; // 10 秒

for (let i = 0; i < testFrames; i++) {
  player.tick();
  const info = player.progress;
  if (!info.playing) {
    console.log(`  帧 ${frameCount}: 播放结束 (总 ${totalSamples} 采样)`);
    break;
  }
  frameCount++;
  if (i % 120 === 0) {
    console.log(`  帧 ${i}: ${Math.round(info.seconds)}s, ${totalSamples} 采样`);
  }
}

console.log(`\n渲染完成: ${frameCount} 帧, ${totalSamples} 音频采样`);
console.log(`时长: ${Math.round(frameCount / 60)} 秒`);

// ── 测试 3: 检查帧计数 ──
if (frameCount < 100) {
  console.error(`FAIL: 帧数太少 (${frameCount}), 序列器可能卡住了`);
  process.exit(1);
}

if (totalSamples < 1000) {
  console.error(`FAIL: 音频采样太少 (${totalSamples})`);
  process.exit(1);
}

// ── 测试 4: 检查无异常 ──
console.log('\n--- 验证通过 ---');
console.log(`✅ BGM00Player 音序器正常工作`);
console.log(`✅ ${frameCount} 帧渲染成功`);
console.log(`✅ ${totalSamples} 音频采样生成`);
process.exit(0);
