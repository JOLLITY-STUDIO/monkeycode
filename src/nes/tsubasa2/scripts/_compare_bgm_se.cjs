// Compare BGM+SE vs SE-only trace to identify BGM vs SE writes
const fs = require('fs');

function parseAPU(path) {
  const lines = fs.readFileSync(path, 'utf8').split('\n');
  const events = [];
  for (const l of lines) {
    // Parse: F  281 $4000=0x30 SQ1   Duty/Vol
    const m = l.match(/F\s+(\d+)\s+\$([0-9A-F]+)=0x([0-9a-f]+)\s+(\S+)\s+(.+)/);
    if (m) {
      events.push({ f: parseInt(m[1]), addr: parseInt(m[2], 16), val: parseInt(m[3], 16), ch: m[4], desc: m[5] });
    }
  }
  return events;
}

function parseStats(path) {
  const c = fs.readFileSync(path, 'utf8');
  const m = c.match(/通道写入统计:([\s\S]*?)(?:\n\n|\n=)/);
  if (!m) return {};
  const stats = {};
  const re = /(\w+):\s+(\d+)次/g;
  let match;
  while ((match = re.exec(m[1]))) stats[match[1]] = parseInt(match[2]);
  return stats;
}

const origEvents = parseAPU('scripts/_apu_trace_opening.txt');
const seEvents = parseAPU('scripts/_apu_trace_se_only.txt');
const origStats = parseStats('scripts/_apu_trace_opening.txt');
const seStats = parseStats('scripts/_apu_trace_se_only.txt');

console.log('═══════════════════════════════════════════════');
console.log('      BGM vs SE 通道写入对比');
console.log('═══════════════════════════════════════════════');
console.log('');
console.log('通道     原始(BGM+SE)  SE-only   BGM(差)   SE占比');
for (const ch of ['SQ1', 'SQ2', 'TRI', 'NOISE', 'DMC', 'STAT']) {
  const o = origStats[ch] || 0;
  const s = seStats[ch] || 0;
  const bgm = o - s;
  const pct = o > 0 ? ((s / o) * 100).toFixed(1) : '0.0';
  console.log(`${ch.padEnd(6)}  ${String(o).padStart(6)}     ${String(s).padStart(6)}    ${String(bgm).padStart(6)}   ${pct}%`);
}

// Key: create fingerprint hash for matching
function fingerprint(ev) { return `${ev.ch}|${ev.desc}|${ev.val}`; }

const origSet = new Set(origEvents.map(fingerprint));
const seSet = new Set(seEvents.map(fingerprint));

// Events in original but NOT in SE-only = BGM
const bgmOnly = new Set([...origSet].filter(x => !seSet.has(x)));

// Events in both = common (could be SE or shared pattern)
const both = new Set([...origSet].filter(x => seSet.has(x)));

// Events only in SE = pure SE patterns
const seOnly = new Set([...seSet].filter(x => !origSet.has(x)));

console.log(`\n事件指纹分析:`);
console.log(`  原始(BGM+SE): ${origSet.size} 种唯一模式`);
console.log(`  SE-only:       ${seSet.size} 种唯一模式`);
console.log(`  仅BGM:         ${bgmOnly.size} 种 ← BGM专用`);
console.log(`  共有:          ${both.size} 种 ← 重叠`);
console.log(`  仅SE:          ${seOnly.size} 种 ← SE专用`);

// NOISE Period 分析
console.log('\n═══════════════════════════════════════════════');
console.log('   NOISE Period 数值对比 (BGM vs SE)');
console.log('═══════════════════════════════════════════════');

function countPeriod(events, period) {
  return events.filter(e => e.ch === 'NOISE' && e.desc === 'Period' && e.val === period).length;
}

const allPeriods = new Set();
for (const ev of origEvents) if (ev.ch === 'NOISE' && ev.desc === 'Period') allPeriods.add(ev.val);
for (const ev of seEvents) if (ev.ch === 'NOISE' && ev.desc === 'Period') allPeriods.add(ev.val);

console.log('Period  原始(BGM+SE)  SE-only   BGM(差)   判断');
for (const p of [...allPeriods].sort((a, b) => a - b)) {
  const o = countPeriod(origEvents, p);
  const s = countPeriod(seEvents, p);
  const d = o - s;
  let tag = '';
  if (d > 0 && s === 0) tag = '纯BGM';
  else if (d === 0 && s > 0) tag = '纯SE';
  else if (d > 0) tag = 'BGM为主';
  else if (s > 0 && o === 0) tag = '纯SE(新)';
  console.log(`0x${p.toString(16).padStart(2,'0')}    ${String(o).padStart(5)}        ${String(s).padStart(5)}      ${String(d).padStart(5)}    ${tag}`);
}

// Frame-level analysis for NOISE
console.log('\n═══════════════════════════════════════════════');
console.log('   NOISE 活跃帧段分析');
console.log('═══════════════════════════════════════════════');

const origFrames = new Set(origEvents.filter(e => e.ch === 'NOISE').map(e => e.f));
const seFrames = new Set(seEvents.filter(e => e.ch === 'NOISE').map(e => e.f));

// Find frames that are SE-only (noise active in both traces)
const seActiveFrames = [...seFrames].sort((a, b) => a - b);

console.log(`原始 NOISE 活跃帧: ${origFrames.size}`);
console.log(`SE-only NOISE 活跃帧: ${seFrames.size}`);

// Find ranges of SE-only noise activity
console.log('\nSE-only 噪声活跃段:');
let rangeStart = -1;
for (let i = 0; i < seActiveFrames.length; i++) {
  const f = seActiveFrames[i];
  if (rangeStart < 0) rangeStart = f;
  if (i === seActiveFrames.length - 1 || seActiveFrames[i + 1] > f + 50) {
    console.log(`  F${String(rangeStart).padStart(5)} ~ F${String(f).padStart(5)}  (${f - rangeStart + 1}帧)`);
    rangeStart = -1;
  }
}
