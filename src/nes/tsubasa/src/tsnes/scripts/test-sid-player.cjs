/**
 * SID Player 测试 — 用 sid-player 渲染音频为 WAV 文件
 * 用法: node scripts/test-sid-player.cjs [sidId] [maxFrames]
 *   例如: node scripts/test-sid-player.cjs 0x30 600
 */
const path = require('path');
const fs = require('fs');

// TypeScript 编译后的 JS 路径
// 直接用 ts-node 或 esbuild-register 可能更简单
// 这里使用简易方式：import 已编译的模块

const SID_PLAYER_PATH = path.join(__dirname, '..', 'pages', 'mini-audio-page', 'sid-player.ts');

// Use child process with tsx to avoid path issues
const { execSync } = require('child_process');

const sidId = process.argv[2] || '0x30';
const maxFrames = parseInt(process.argv[3] || '600', 10);

console.log(`[test-sid] 渲染 SID ${sidId}, ${maxFrames} 帧...`);

// Generate inline test script
const testScript = `
// ██████████████████████████████████████████████
// SID Player 测试脚本（通过 tsx 运行）
// ██████████████████████████████████████████████
import { SidPlayer } from '../../pages/mini-audio-page/sid-player';
import * as fs from 'fs';

const sidId = ${JSON.stringify(sidId)};
const maxFrames = ${maxFrames};

console.log(\`[test-sid] 初始化 SidPlayer, SID=\${sidId}, maxFrames=\${maxFrames}\`);

const player = new SidPlayer(48000);
const loaded = player.load(typeof sidId === 'string' ? parseInt(sidId, 16) : sidId);

if (!loaded) {
  console.error(\`[test-sid] SID \${sidId} 加载失败\`);
  process.exit(1);
}

console.log(\`[test-sid] SID \${sidId} 已加载\`);
const started = player.start();

if (!started) {
  console.error(\`[test-sid] SID \${sidId} 启动失败 (无活跃通道)\`);
  process.exit(1);
}

console.log(\`[test-sid] 开始渲染 \${maxFrames} 帧...\`);
const startTime = Date.now();
const pcm = player.renderAll(maxFrames);
const elapsed = Date.now() - startTime;

const info = player.progress;
console.log(\`[test-sid] 渲染完成: \${info.frame} 帧, \${pcm.length} samples, \${elapsed}ms\`);
console.log(\`[test-sid] 播放时长: \${(pcm.length / 48000).toFixed(1)} 秒, 状态: \${info.playing ? '播放中' : '已停止'}\`);

// Write WAV file
const outPath = path.join(__dirname, '..', \`sid-\${sidId.replace('0x','')}.wav\`);
writeWav(outPath, pcm, 48000);
console.log(\`[test-sid] WAV 写入: \${outPath}\`);

// ---- WAV Writer ----
function writeWav(filePath, samples, sampleRate) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  const dataSize = samples.length * blockAlign;
  const bufferSize = 44 + dataSize;

  const buf = Buffer.alloc(bufferSize);
  let off = 0;

  // RIFF header
  buf.write('RIFF', off); off += 4;
  buf.writeUInt32LE(bufferSize - 8, off); off += 4;
  buf.write('WAVE', off); off += 4;

  // fmt chunk
  buf.write('fmt ', off); off += 4;
  buf.writeUInt32LE(16, off); off += 4;       // chunk size
  buf.writeUInt16LE(1, off); off += 2;         // PCM format
  buf.writeUInt16LE(numChannels, off); off += 2;
  buf.writeUInt32LE(sampleRate, off); off += 4;
  buf.writeUInt32LE(byteRate, off); off += 4;
  buf.writeUInt16LE(blockAlign, off); off += 2;
  buf.writeUInt16LE(bitsPerSample, off); off += 2;

  // data chunk
  buf.write('data', off); off += 4;
  buf.writeUInt32LE(dataSize, off); off += 4;

  for (let i = 0; i < samples.length; i++) {
    let s = Math.max(-1, Math.min(1, samples[i]));
    const s16 = Math.round(s * 32767);
    buf.writeInt16LE(s16, off);
    off += 2;
  }

  fs.writeFileSync(filePath, buf);
}
`;

// Write temp script
const tmpPath = path.join(__dirname, '..', '_test_sid_player.cts');
fs.writeFileSync(tmpPath, testScript);

try {
  const cmd = `npx tsx ${tmpPath}`;
  console.log(`[test-sid] 执行: ${cmd}`);
  execSync(cmd, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });
} catch (err) {
  console.error('[test-sid] 执行失败:', err.message);
} finally {
  try { fs.unlinkSync(tmpPath); } catch (_e) {}
}
