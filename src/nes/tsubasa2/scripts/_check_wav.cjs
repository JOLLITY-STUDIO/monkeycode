const fs = require('fs');
const wav = fs.readFileSync('output/our-song-041.wav');
const pcm = wav.slice(44);
let zero = 0, nonZero = 0, max = 0, min = 0;
for (let i = 0; i < pcm.length; i += 2) {
  const s = pcm.readInt16LE(i);
  if (s === 0) zero++; else nonZero++;
  if (s > max) max = s;
  if (s < min) min = s;
}
console.log('采样数:', pcm.length / 2);
console.log('零:', zero, '非零:', nonZero, '(' + (nonZero/(pcm.length/2)*100).toFixed(1) + '%)');
console.log('范围:', min, '~', max);
// 打印前 50 个非零采样的变化
let prev = 0, changes = 0;
for (let i = 0; i < pcm.length && changes < 50; i += 2) {
  const s = pcm.readInt16LE(i);
  if (s !== prev) { changes++; if (changes <= 20) process.stdout.write(s + ' '); prev = s; }
}
console.log('\n前 20 个变化点');
