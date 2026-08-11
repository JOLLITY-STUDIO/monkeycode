/**
 * 全量 BGM 验证：遍历 BGM_SID_LIST，渲染 4 秒，统计声音指标
 * 运行: npx tsx scripts/_diag_all_bgm.ts
 */
import {
  Tsubasa2AudioPlayer,
  BGM_SID_LIST, BgmSidEntry,
} from '../mini-audio/bgm-data/index';

const SAMPLE_RATE = 48000;
const RENDER_SECONDS = 4;
const MAX_FRAMES = RENDER_SECONDS * 60;

interface Result {
  id: string; name?: string; type: string;
  trackLens: number[]; rawLen: number; nesBase: number;
  rawHead: string;
  peak: number; rms: number; nonZero: number; total: number;
  status: string;
  frames: number;
}

function hexArr(a: readonly number[], n: number): string {
  return Array.from(a.slice(0, n)).map(x => x.toString(16).padStart(2, '0')).join(' ');
}

function render(entry: BgmSidEntry, seconds: number): { pcm: Float32Array; frames: number } {
  const player = new Tsubasa2AudioPlayer(SAMPLE_RATE);
  const samples: number[] = [];
  player.setSampleCallback((l: number, r: number) => {
    samples.push((l + r) * 0.5);
  });
  player.setOneShot(false);
  if (entry.raw && entry.raw.length > 0) {
    player.load(entry.trackSQ1, entry.trackSQ2, entry.trackTRI, entry.trackNOISE, entry.raw, entry.nesBase, entry.headerOffset);
  } else {
    player.load(entry.trackSQ1, entry.trackSQ2, entry.trackTRI, entry.trackNOISE);
  }
  player.start();
  let frames = 0;
  for (let f = 0; f < seconds * 60; f++) {
    player.tick();
    frames++;
  }
  return { pcm: new Float32Array(samples), frames };
}

function analyze(entry: BgmSidEntry): Result {
  const res: Result = {
    id: entry.id, name: entry.name, type: entry.type,
    trackLens: [entry.trackSQ1.length, entry.trackSQ2.length, entry.trackTRI.length, entry.trackNOISE.length],
    rawLen: entry.raw ? entry.raw.length : 0,
    nesBase: entry.nesBase,
    rawHead: entry.raw && entry.raw.length > 0 ? hexArr(entry.raw, 16) : '(无 raw)',
    peak: 0, rms: 0, nonZero: 0, total: 0, status: 'OK', frames: 0,
  };

  // 快速检查：所有轨道为空？
  const allEmpty = res.trackLens.every(l => l === 0);
  if (allEmpty) { res.status = '❌ 所有轨道为空'; return res; }

  let pcm: Float32Array;
  try {
    const r = render(entry, RENDER_SECONDS);
    pcm = r.pcm;
    res.frames = r.frames;
  } catch (e: any) {
    res.status = `❌ 渲染异常: ${e.message}`;
    return res;
  }
  if (pcm.length === 0) { res.status = '❌ 无采样输出'; return res; }

  let peak = 0, sum = 0, nz = 0;
  for (let i = 0; i < pcm.length; i++) {
    const v = Math.abs(pcm[i]);
    if (v > peak) peak = v;
    sum += v * v;
    if (v > 1e-4) nz++;
  }
  res.peak = peak;
  res.rms = Math.sqrt(sum / pcm.length);
  res.nonZero = nz;
  res.total = pcm.length;

  const nzRatio = nz / pcm.length;
  if (peak < 0.005) res.status = '❌ 无声 (peak≈0)';
  else if (nzRatio < 0.05) res.status = `⚠️ 几乎无声 (nonZero=${(nzRatio * 100).toFixed(1)}%)`;
  else res.status = `✅ (nonZero ${(nzRatio * 100).toFixed(0)}%)`;

  return res;
}

function main() {
  console.log(`共 ${BGM_SID_LIST.length} 个 BGM 条目\n`);
  const results: Result[] = [];
  for (const entry of BGM_SID_LIST) {
    const r = analyze(entry);
    results.push(r);
    console.log(
      `[${r.id.padEnd(5)}] ${r.type.padEnd(7)} tracks=${r.trackLens.join(',')} ` +
      `raw=${r.rawLen}B peak=${r.peak.toFixed(3)} rms=${r.rms.toFixed(4)} ` +
      `${r.status} | head=${r.rawHead}`
    );
  }

  console.log('\n════════ 汇总 ════════');
  const bad = results.filter(r => r.status.includes('❌'));
  const warn = results.filter(r => r.status.includes('⚠️'));
  console.log(`❌ 有问题: ${bad.length} 个`);
  for (const r of bad) console.log(`  [${r.id}] ${r.name || ''} ${r.status} tracks=${r.trackLens.join(',')} head=${r.rawHead}`);
  console.log(`⚠️ 警告: ${warn.length} 个`);
  for (const r of warn) console.log(`  [${r.id}] ${r.name || ''} ${r.status}`);
  console.log(`✅ 正常: ${results.length - bad.length - warn.length} 个`);
}

main();
