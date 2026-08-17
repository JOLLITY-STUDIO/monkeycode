const fs = require('fs');
const f = fs.readFileSync(__dirname + '/_apu_trace_opening.txt', 'utf8');
const lines = f.split('\n');

// DMC 寄存器 ($4010-$4013)
console.log('=== DMC 寄存器写入 ===');
const dmc = lines.filter(l => l.includes(' DMC ') && !l.includes('STAT'));
console.log('共 ' + dmc.length + ' 条:');
dmc.slice(0, 30).forEach(l => console.log(l));
if (dmc.length > 30) console.log('  ... 还有 ' + (dmc.length - 30) + ' 条');
console.log('');

// DMC 地址分布
const dmcAddrs = {};
lines.forEach(l => {
  const m = l.match(/\$(40[01][0-3])=0x([0-9a-f]+) DMC/);
  if (m) { dmcAddrs[m[1]] = (dmcAddrs[m[1]] || 0) + 1; }
});
console.log('=== DMC 寄存器分布 ===');
const addrName = { '4010': 'Freq/IRQ', '4011': 'DAC', '4012': 'SampleAddr', '4013': 'SampleLen' };
Object.entries(dmcAddrs).sort().forEach(([a, n]) => console.log('  $' + a + ' (' + addrName[a] + '): ' + n + '次'));

// NOISE 音量 ($400C)
console.log('\n=== NOISE 音量 ($400C) 值分布 ===');
const nc = {};
lines.forEach(l => {
  const m = l.match(/\$400C=0x([0-9a-f]+) NOISE Vol/);
  if (m) { nc[m[1]] = (nc[m[1]] || 0) + 1; }
});
Object.entries(nc).sort((a, b) => a[0] - b[0]).forEach(([v, n]) => console.log('  0x' + v + ': ' + n + '次'));

// NOISE 非0x30的音量变化
console.log('\n=== NOISE 音量切换 (非0x30,代表启停/音量变化) ===');
const noiseVol = lines.filter(l => l.includes('NOISE Vol') && !l.includes('0x30'));
console.log('非0x30 共 ' + noiseVol.length + ' 条:');
noiseVol.slice(0, 50).forEach(l => console.log(l));
if (noiseVol.length > 50) console.log('  ... 还有 ' + (noiseVol.length - 50) + ' 条');

// NOISE period 值分布
console.log('\n=== NOISE Period ($400E) 所有值 ===');
const np = {};
lines.forEach(l => {
  const m = l.match(/\$400E=0x([0-9a-f]+) NOISE Period/);
  if (m) { np[m[1]] = (np[m[1]] || 0) + 1; }
});
console.log('共 ' + Object.values(np).reduce((a, b) => a + b, 0) + ' 次写入，' + Object.keys(np).length + ' 种值:');
Object.entries(np).sort((a, b) => a[0] - b[0]).forEach(([v, n]) => {
  const freq = 1789773 / (15 * parseInt('0x' + v));
  console.log('  0x' + v + ': ' + String(n).padStart(5) + '次  (~' + Math.round(freq) + 'Hz)');
});

// DMC 采样地址和长度
console.log('\n=== DMC Sample Addr & Len ($4012, $4013) ===');
const samplePairs = [];
let lastAddr = null;
lines.forEach(l => {
  let m = l.match(/\$4012=0x([0-9a-f]+) DMC/);
  if (m) lastAddr = m[1];
  m = l.match(/\$4013=0x([0-9a-f]+) DMC/);
  if (m && lastAddr) {
    samplePairs.push({ addr: lastAddr, len: m[1] });
    lastAddr = null;
  }
});
// 去重
const seen = new Set();
samplePairs.forEach(p => {
  const k = p.addr + '-' + p.len;
  if (!seen.has(k)) {
    seen.add(k);
    const physAddr = parseInt('0x' + p.addr) * 0x40 + 0xC000;
    const byteLen = parseInt('0x' + p.len) * 0x10 + 1;
    console.log('  $' + p.addr + ' x$' + p.len + ' → 物理 $' + physAddr.toString(16).toUpperCase() + ' 长度 ' + byteLen + 'B');
  }
});
