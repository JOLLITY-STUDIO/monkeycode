const fs = require('fs');
const w = fs.readFileSync('output/our-song-041.wav');
const pcm = w.slice(44);
let zero = 0, nonZero = 0, max = 0, min = 0;
let prev = 0, changes = 0;
const changeVals = [];
for (let i = 0; i < pcm.length; i += 2) {
  const s = pcm.readInt16LE(i);
  if (s === 0) zero++; else nonZero++;
  if (s > max) max = s;
  if (s < min) min = s;
  if (s !== prev) { changes++; if (changeVals.length < 30) changeVals.push(s); prev = s; }
}
console.log('采样:', pcm.length / 2, '零:', zero, '非零:', nonZero, '(' + (nonZero/(pcm.length/2)*100).toFixed(1) + '%)');
console.log('范围:', min, '~', max, '变化点:', changes);
console.log('前 30 个变化值:', changeVals.join(' '));
// 检查不同频率（通过过零率）
let zeroCross = 0;
for (let i = 1; i < pcm.length / 2; i++) {
  const s0 = pcm.readInt16LE(i * 2 - 2);
  const s1 = pcm.readInt16LE(i * 2);
  if ((s0 < 0 && s1 >= 0) || (s0 >= 0 && s1 < 0)) zeroCross++;
}
console.log('过零次数:', zeroCross, '(频率多样性指标)');
