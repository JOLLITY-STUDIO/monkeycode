/**
 * mini-audio/test.ts — Bank12 音频引擎测试（SE + BGM）
 */
const log = (...args: any[]) => process.stdout.write(args.join(' ') + '\n');

import { renderAudio } from "./renderer";

function testOne(seId: number, frames: number = 60, label?: string) {
  const lbl = label || `SE $0x${seId.toString(16).padStart(2, '0')}`;
  log(`\n---> ${lbl} (${frames} frames)`);
  const r = renderAudio(seId, frames);
  log(`  Samples: ${r.sampleCount}  hasAudio: ${r.hasAudio}  Frames: ${r.framesRendered}`);

  let min = 1, max = -1;
  for (let i = 0; i < r.samples.length; i++) {
    const v = r.samples[i];
    if (v < min) min = v;
    if (v > max) max = v;
  }
  log(`  Amp: min=${min.toFixed(4)} max=${max.toFixed(4)} range=${(max-min).toFixed(4)}`);
  return r;
}

// ── 测试 ──

try {
  // 1. SE (Bank 12 only, 0x01-0x31)
  log('\n========== SE 测试 (Bank 12) ==========');
  [0x10, 0x20, 0x30].forEach(id => testOne(id, 60));

  // 2. BGM (需要 Bank 0x0D/0x0E/0x0F, ID 0x32-0x5B)
  log('\n========== BGM 测试 (Aux Banks) ==========');
  testOne(0x32, 120, 'BGM 0x32 (Bank 0x0D)');
  testOne(0x40, 120, 'BGM 0x40 (Bank 0x0D)');
  testOne(0x44, 120, 'BGM 0x44 (Bank 0x0E)');
  testOne(0x48, 120, 'BGM 0x48 (Bank 0x0E)');
  testOne(0x50, 120, 'BGM 0x50 (Bank 0x0E)');
  testOne(0x51, 120, 'BGM 0x51 (Bank 0x0F)');
  testOne(0x5A, 120, 'BGM 0x5A (Bank 0x0F)');

  // 3. 更长时间 BGM
  log('\n========== 长 BGM 测试 (180 frames ≈ 3s) ==========');
  testOne(0x32, 180, 'BGM 0x32 (long)');

  log('\n=== ALL DONE ===');
} catch (e: any) {
  log(`\n!!! CRASH: ${e.message}`);
  if (e.stack) log(e.stack);
}

export default { testOne, renderAudio };
