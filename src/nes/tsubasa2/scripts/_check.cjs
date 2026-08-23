// 详细分析翻译版 WAV 的波形特征
const fs = require('fs');
const w = fs.readFileSync('output/our-song-041.wav');
const pcm = w.slice(44);
const samples = pcm.length / 2;

// 每秒采样一段，看波形模式
console.log('=== 每秒前 20 个采样 ===');
for (let s = 0; s < 10; s++) {
  const start = s * 44100;
  let line = `${s}s: `;
  for (let i = 0; i < 20; i++) {
    const v = pcm.readInt16LE((start + i) * 2);
    line += v.toString().padStart(6) + ' ';
  }
  console.log(line);
}

// 计算每秒的主频率（FFT 简化版：过零率 → 频率）
console.log('\n=== 每秒主频率（过零率估算）===');
for (let s = 0; s < 60; s += 5) {
  const start = s * 44100;
  const end = (s + 1) * 44100;
  let zeroCross = 0;
  for (let i = start + 1; i < end && i < samples; i++) {
    const s0 = pcm.readInt16LE(i * 2 - 2);
    const s1 = pcm.readInt16LE(i * 2);
    if ((s0 < 0 && s1 >= 0) || (s0 >= 0 && s1 < 0)) zeroCross++;
  }
  // 过零次数 / 2 = 周期数，频率 = 周期数 / 秒
  const freq = Math.round(zeroCross / 2);
  console.log(`${s}s: ${freq} Hz (过零 ${zeroCross})`);
}

// 检查是否有音符变化（频率是否随时间变化）
console.log('\n=== 每 0.5 秒频率 ===');
const freqs = [];
for (let half = 0; half < 120; half++) {
  const start = half * 22050;
  const end = (half + 1) * 22050;
  let zc = 0;
  for (let i = start + 1; i < end && i < samples; i++) {
    const s0 = pcm.readInt16LE(i * 2 - 2);
    const s1 = pcm.readInt16LE(i * 2);
    if ((s0 < 0 && s1 >= 0) || (s0 >= 0 && s1 < 0)) zc++;
  }
  freqs.push(Math.round(zc / 2));
}
// 打印前 40 个 0.5 秒频率
let line = '';
for (let i = 0; i < 40; i++) {
  line += freqs[i].toString().padStart(5) + ' ';
  if ((i + 1) % 10 === 0) { console.log(line); line = ''; }
}
