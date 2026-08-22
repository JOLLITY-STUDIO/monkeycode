const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.resolve(__dirname, 'trace/audio-full.log'), 'utf8').split('\n').filter(l => l.length > 0);

const sqTri = [];
const dmc = [];
const status = [];
const frameInit = [];
const joy = [];

for (const l of lines) {
  const m = l.match(/STA \$(\w{4})/);
  if (!m) continue;
  const addr = parseInt(m[1], 16);
  if (addr >= 0x4000 && addr <= 0x400F) sqTri.push(l);
  else if (addr >= 0x4010 && addr <= 0x4013) dmc.push(l);
  else if (addr === 0x4015) status.push(l);
  else if (addr === 0x4017) frameInit.push(l);
  else if (addr === 0x4016) joy.push(l);
}

console.log('=== Audio register write stats ===');
console.log('SQ1/SQ2/TRI/NOISE ($4000-$400F): ' + sqTri.length);
console.log('DMC ($4010-$4013): ' + dmc.length);
console.log('APU_STATUS ($4015): ' + status.length);
console.log('APU_FRAME ($4017): ' + frameInit.length);
console.log('JOY1 ($4016): ' + joy.length);

console.log('\n--- SQ/TRI/NOISE first 15 ---');
for (const l of sqTri.slice(0, 15)) console.log(l);

console.log('\n--- DMC first 10 ---');
for (const l of dmc.slice(0, 10)) console.log(l);

console.log('\n--- APU_STATUS first 5 ---');
for (const l of status.slice(0, 5)) console.log(l);

console.log('\n--- APU_FRAME first 5 ---');
for (const l of frameInit.slice(0, 5)) console.log(l);

// Audio frames (exclude $4016)
const audioFrames = new Set();
for (const l of lines) {
  if (l.includes('$4016')) continue;
  const m = l.match(/^F(\d+)/);
  if (m) audioFrames.add(parseInt(m[1]));
}
console.log('\nAudio frames: ' + audioFrames.size + ' / 4500');
const sorted = [...audioFrames].sort((a,b)=>a-b);
console.log('First 10: ' + sorted.slice(0,10).join(','));
console.log('Last 10: ' + sorted.slice(-10).join(','));
