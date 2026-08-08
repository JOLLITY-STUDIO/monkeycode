/**
 * 对比：SidPlayer APU 输出 vs 原始模拟器 trace
 * 找出哪个 SID 对应开场动画BGM，并验证频率是否一致
 */
import { SidPlayer } from '../pages/mini-audio-page/sid-player';
import { getSid, ALL_SID_DATA } from '../pages/mini-audio-page/sid-data/index';
import * as fs from 'fs';

// 从 ground truth trace 提取关键频率信息
// F281 起点:
//   SQ1: $4000=0x34, $4002=0x50, $4003=0x98 → period=0x0050=80
//   TRI: $4008=0x8f, $400A=0xab, $400B=0x19 → period=0x01AB=427
//
// 随后 SQ1 频率序列:
//   F281 0x50(80)  F288 0x6a(106)  F295 0x86(134) 
//   F302 ... (need to check for more specific pattern)
//
// 提取作为指纹: SQ1前几个不同频率, SQ2开始帧, TRI频率

const GROUND_TRUTH = {
  startFrame: 281,
  sq1FirstFreqs: [0x50, 0x6A, 0x86] as number[],
  sq2StartsAt: 283 as number | null, // SQ2 first appears at F283 with activity
  triFirstFreq: 0x01AB, // TRI low+high period
  sq1WritesInFirst30: -1, // count of SQ1 freq writes in first 30 frames
};

// 分析单个 SID 的 APU 输出
function analyzeSid(sidId: number, frames: number = 1200): {
  id: number;
  ok: boolean;
  activeMask: number;
  writes: { f: number; addr: number; val: number }[];
  freqSeq: { f: number; ch: string; period: number }[];
  verdict: string;
} {
  const result = {
    id: sidId,
    ok: false,
    activeMask: 0 as number,
    writes: [] as { f: number; addr: number; val: number }[],
    freqSeq: [] as { f: number; ch: string; period: number }[],
    verdict: '' as string,
  };

  const sid = getSid(sidId);
  if (!sid) { result.verdict = 'NODATA'; return result; }

  const player = new SidPlayer(48000, () => {});
  const loaded = player.load(sidId);
  if (!loaded || !player['isPlaying'] && !player.start()) {
    // Try starting
    player.load(sidId);
    if (!player.start()) { result.verdict = 'NOSTART'; return result; }
  }

  result.activeMask = player['activeMask'];
  if (result.activeMask === 0) { result.verdict = 'NO_CH'; return result; }

  // Hook writeReg
  const apuBase = player['papu'];
  const origWR = apuBase.writeReg.bind(apuBase);
  apuBase.writeReg = function(addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4015) {
      result.writes.push({ f: -1, addr, val });
    }
    return origWR.call(this, addr, val);
  };

  // Track per-frame
  const perFrame: Map<number, { _4002: number; _4003: number; _4006: number; _4007: number; _400A: number; _400B: number }> = new Map();
  let lastSQ1Per = -1;

  for (let f = 0; f < frames && player['isPlaying']; f++) {
    const before = result.writes.length;
    player.tick();
    const after = result.writes.length;

    // Extract freq writes this frame
    for (let i = before; i < after; i++) {
      const w = result.writes[i];
      const addr = w.addr & 0xFFF;
      let entry = perFrame.get(f);
      if (!entry) {
        entry = { _4002: -1, _4003: -1, _4006: -1, _4007: -1, _400A: -1, _400B: -1 };
        perFrame.set(f, entry);
      }
      if (addr === 0x402) entry._4002 = w.val;
      if (addr === 0x403) entry._4003 = w.val;
      if (addr === 0x406) entry._4006 = w.val;
      if (addr === 0x407) entry._4007 = w.val;
      if (addr === 0x40A) entry._400A = w.val;
      if (addr === 0x40B) entry._400B = w.val;
    }

    // Detect SQ1 freq changes
    const entry = perFrame.get(f);
    if (entry && entry._4002 >= 0 && entry._4003 >= 0) {
      const period = entry._4002 | ((entry._4003 & 7) << 8);
      if (period !== lastSQ1Per) {
        lastSQ1Per = period;
        result.freqSeq.push({ f, ch: 'SQ1', period });
      }
    }
  }

  result.ok = result.freqSeq.length > 0;

  // Build verdict
  const sq1Freqs = result.freqSeq.slice(0, 5).map(x => x.period);
  result.verdict = `SQ1:${sq1Freqs.map(x=>'0x'+x.toString(16)).join(',')} totalFreq:${result.freqSeq.length}`;
  return result;
}

// ─── Main ───
const ids = Object.keys(ALL_SID_DATA).map(k => parseInt(k, 10)).sort((a,b)=>a-b);

console.log('=== SID Profile (1200 frames) ===');
console.log('Ground truth: SQ1 starts 0x50→0x6A→0x86, TRI period=0x01AB\n');

const candidates: any[] = [];

for (const id of ids) {
  const r = analyzeSid(id, 1200);
  const hex = '0x' + id.toString(16).padStart(2,'0');
  
  // Match criteria:
  // 1. Has SQ1 frequency writes
  // 2. First SQ1 freq roughly matches (within range)
  let matchScore = 0;
  const ff = r.freqSeq.slice(0, 3);
  if (ff.length >= 3) {
    // Check if first 3 SQ1 freqs are in similar ballpark
    const gtFirst = 0x50;
    const diff0 = Math.abs(ff[0].period - gtFirst);
    if (diff0 < 40) matchScore += 2;
    if (r.freqSeq.length > 50) matchScore += 1; // has sustained melody
  }

  console.log(`  ${hex}: mask=0x${r.activeMask.toString(16)} ${r.verdict}`);
  
  if (r.ok && r.freqSeq.length > 0) {
    candidates.push({ hex, id, ...r, matchScore, freqSeqLen: r.freqSeq.length });
  }
}

// Sort by match score and freq count
candidates.sort((a, b) => (b.matchScore * 1000 + b.freqSeqLen) - (a.matchScore * 1000 + a.freqSeqLen));

console.log('\n=== Top Candidates (opening BGM) ===');
for (const c of candidates.slice(0, 15)) {
  const ff = c.freqSeq.slice(0, 5);
  console.log(`  ${c.hex}: SQ1[${ff.map((x:any)=>'f='+x.f+'(0x'+x.period.toString(16)+')').join(',')}] total=${c.freqSeqLen}`);
}

// Also check FREQ_TABLE issue: compute what period should be for specific notes
console.log('\n=== FREQ_TABLE sanity check ===');
import { FREQ_TABLE } from '../pages/mini-audio-page/sid-data/shared';
console.log('FREQ_TABLE:', FREQ_TABLE.map(x => '0x' + x.toString(16).padStart(3,'0')).join(', '));
// At octave 4 (>>4), the periods would be:
console.log('Octave 4: ', FREQ_TABLE.map(x => '0x' + (x>>4).toString(16).padStart(2,'0')).join(', '));
console.log('Octave 5: ', FREQ_TABLE.map(x => '0x' + (x>>5).toString(16).padStart(2,'0')).join(', '));
