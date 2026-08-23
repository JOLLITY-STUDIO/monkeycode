// 用模拟器检测每首 BGM/SE 的真实播放时长
// 方法：跑帧收集音频采样，检测静音（连续 2 秒幅度 < 阈值 → 结束）
const fs = require('fs');
const path = require('path');
const NES = require(path.join(__dirname, '..', '..', 'tsnes', '_build', 'nes.js')).default;
const romData = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));

const SONG_IDS = [
  0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39,0x3a,0x3b,0x3c,0x3d,0x3e,0x3f,0x40,0x41,0x42,0x43,0x44,0x45,
  0x46,0x47,0x48,0x49,0x4b,0x4c,0x4d,0x4e,0x4f,0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x57,0x58,0x59,0x5a,
  0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,0x0f,0x10,0x11,0x12,0x13,0x14,0x15,0x16,
  0x17,0x18,0x19,0x1a,0x1b,0x1c,0x1d,0x1e,0x1f,0x20,0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29,0x2a,
  0x2b,0x2c,0x2d,0x2e,0x2f,0x30,0x5d,0x5e,0x5f,0x60,0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69,0x6a,
  0x6b,0x6c,0x6d,0x6e,0x6f,
];

const MAX_DURATION = 180; // 最大 180 秒
const MAX_FRAMES = Math.ceil(MAX_DURATION * 60);
const SILENCE_FRAMES = 120; // 连续 120 帧（2秒）静音 → 结束
const SILENCE_THRESHOLD = 50; // 采样幅度 < 50/32768 → 静音

const durations = [];

for (let songIdx = 0; songIdx < SONG_IDS.length; songIdx++) {
  const songId = SONG_IDS[songIdx];
  
  let lastLoudFrame = 0;
  let frameCount = 0;
  
  const nes = new NES({
    emulateSound: true,
    sampleRate: 44100,
    onAudioSample: (l, r) => {
      const amp = Math.abs(l) + Math.abs(r);
      if (amp > SILENCE_THRESHOLD) {
        lastLoudFrame = frameCount;
      }
    },
    onFrame: () => { frameCount++; },
  });
  
  nes.loadROM(romData);
  for (let i = 0; i < 60; i++) { try { nes.frame(); } catch (e) { break; } }
  
  frameCount = 0;
  nes.cpu.write(0x0700, songId);
  
  let endFrame = MAX_FRAMES;
  for (let i = 0; i < MAX_FRAMES; i++) {
    try { nes.frame(); } catch (e) { endFrame = i; break; }
    if (frameCount > 60 && (frameCount - lastLoudFrame) > SILENCE_FRAMES) {
      endFrame = i;
      break;
    }
  }
  
  const duration = endFrame / 60;
  durations.push({ idx: songIdx + 1, id: songId, duration: Math.round(duration * 10) / 10 });
  process.stdout.write(`[${songIdx + 1}/${SONG_IDS.length}] ID $${songId.toString(16)}: ${duration.toFixed(1)}秒\r`);
}

console.log('\n');
const total = durations.reduce((s, d) => s + d.duration, 0);
const max = Math.max(...durations.map(d => d.duration));
const min = Math.min(...durations.map(d => d.duration));
console.log(`总时长: ${total.toFixed(1)}秒 (${(total/60).toFixed(1)}分钟)`);
console.log(`最长: ${max.toFixed(1)}秒, 最短: ${min.toFixed(1)}秒`);
console.log(`平均: ${(total/durations.length).toFixed(1)}秒`);

fs.writeFileSync(path.join(__dirname, '..', 'output', 'song-durations.json'), JSON.stringify(durations, null, 2));
console.log('时长表已保存到 output/song-durations.json');
