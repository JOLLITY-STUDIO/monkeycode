// 用 tsnes 模拟器渲染游戏 BGM/SE 为 WAV
// 加载 ROM → 写 $0700 请求队列触发 BGM → 跑帧循环 → 收集音频采样 → WAV
const fs = require('fs');
const path = require('path');

// 编译 tsnes
const { execSync } = require('child_process');
const tsnesDir = path.join(__dirname, '..', '..', 'tsnes');
const buildDir = path.join(tsnesDir, '_build');

if (!fs.existsSync(path.join(buildDir, 'nes.js'))) {
  console.log('编译 tsnes...');
  execSync('npx tsc -p tsconfig.json --outDir _build --module commonjs --target ES2020', { cwd: tsnesDir, stdio: 'inherit' });
  console.log('编译完成');
}

const NES = require(path.join(buildDir, 'nes.js')).default;
const romData = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));

// 105 首请求 ID
const SONG_IDS = [
  0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39,0x3a,0x3b,0x3c,0x3d,0x3e,0x3f,0x40,0x41,0x42,0x43,0x44,0x45,
  0x46,0x47,0x48,0x49,0x4b,0x4c,0x4d,0x4e,0x4f,0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x57,0x58,0x59,0x5a,
  0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,0x0f,0x10,0x11,0x12,0x13,0x14,0x15,0x16,
  0x17,0x18,0x19,0x1a,0x1b,0x1c,0x1d,0x1e,0x1f,0x20,0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29,0x2a,
  0x2b,0x2c,0x2d,0x2e,0x2f,0x30,0x5d,0x5e,0x5f,0x60,0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69,0x6a,
  0x6b,0x6c,0x6d,0x6e,0x6f,
];

// WAV 编码
function writeWav(samples, sampleRate, outPath) {
  const buf = Buffer.alloc(44 + samples.length * 2);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + samples.length * 2, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) {
    const v = Math.max(-32768, Math.min(32767, Math.round(samples[i] * 32767)));
    buf.writeInt16LE(v, 44 + i * 2);
  }
  fs.writeFileSync(outPath, buf);
}

// 渲染单首曲目
function renderSong(songIdx, durationSec) {
  const sampleRate = 44100;
  const totalFrames = Math.ceil(durationSec * 60); // 60fps
  const samples = [];
  const songId = SONG_IDS[songIdx];

  const nes = new NES({
    emulateSound: true,
    sampleRate: sampleRate,
    onAudioSample: (left, right) => {
      samples.push((left + right) / 2);
    },
    onFrame: () => {},
  });

  nes.loadROM(romData);
  // loadROM 内部已调 reset()

  // 跑几帧让引擎初始化（boot 链路）
  for (let i = 0; i < 60; i++) {
    try { nes.frame(); } catch (e) { break; }
  }

  // 写 $0700[0] = 请求 ID（触发 BGM/SE）
  // $0700 在 RAM 区，用 cpu.write
  nes.cpu.write(0x0700, songId);

  // 跑帧循环收集音频
  for (let i = 0; i < totalFrames; i++) {
    try { nes.frame(); } catch (e) { break; }
  }

  return samples;
}

// 渲染指定曲目
const songIdx = parseInt(process.argv[2] || '41') - 1; // 默认第 41 首（第一首 BGM, ID=0x03）
const duration = parseInt(process.argv[3] || '10'); // 默认 10 秒

if (songIdx < 0 || songIdx >= SONG_IDS.length) {
  console.error('曲目号超出范围 (1-105)');
  process.exit(1);
}

console.log(`渲染第 ${songIdx + 1} 首 (请求 ID $${SONG_IDS[songIdx].toString(16)}, ${duration}秒)...`);

try {
  const samples = renderSong(songIdx, duration);
  const outDir = path.join(__dirname, '..', 'output');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `song-${String(songIdx + 1).padStart(3, '0')}.wav`);
  writeWav(samples, 44100, outFile);
  console.log(`完成: ${outFile} (${samples.length} 采样, ${samples.length / 44100}秒)`);
} catch (e) {
  console.error('渲染失败:', e.message);
  console.error(e.stack);
}
