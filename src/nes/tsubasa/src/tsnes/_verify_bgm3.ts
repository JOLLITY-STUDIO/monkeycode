/**
 * BGM 验证 v4 — 纯 H5 Tsubasa2AudioPlayer + Bank 15 数据提取
 * 
 * 与 v3 完全不同的架构:
 *   ❌ v3: CPU 模拟器 + NMI 重定向 (在帧10崩溃，JSR/RTI 破坏堆栈)
 *   ✅ v4: 直接使用 H5 Tsubasa2AudioPlayer，不依赖 6502 CPU/MMC3/PPU
 * 
 * 运行: npx tsx _verify_bgm3.ts
 * 
 * 验证所有 Bank 15 中的 BGM 轨道 (扫描到的 10 个通道初始化列表)。
 * BGM00 (0x31) 使用预提取的 BGM00_RAW，性能更优。
 */
import { Tsubasa2AudioPlayer } from './mini-audio/bgm-data/Tsubasa2AudioPlayer';
import {
  BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
  BGM00_RAW, BGM00_META,
} from './mini-audio/bgm-data/BGM00';
import { BgmExtractor, type BgmTrackData } from './mini-audio/bgm-data/BgmExtractor';
import PRG_BANK_15 from './rom-data/prg-bank-15';

// ════════════════════════════════════════════════
// 配置
// ════════════════════════════════════════════════
const TEST_FRAMES = 600;      // 每条 BGM 测试 10 秒
const SAMPLE_RATE = 48000;
const MIN_GOOD_FRAMES = 60;  // 至少 60 帧才算有效
const MIN_GOOD_SAMPLES = 1000;

// ════════════════════════════════════════════════
// 辅助
// ════════════════════════════════════════════════

interface BgmTestResult {
  name: string;
  id: string;
  offset: number;
  frames: number;
  samples: number;
  durationSec: number;
  endedEarly: boolean;
  error?: string;
}

function testBgm00Player(
  name: string,
  id: string,
  offset: number,
  sq1: readonly number[],
  sq2: readonly number[],
  tri: readonly number[],
  noise: readonly number[],
  sharedRaw?: readonly number[],
  nesBase?: number,
): BgmTestResult {
  let totalSamples = 0;
  const player = new Tsubasa2AudioPlayer(SAMPLE_RATE, () => { totalSamples++; });

  const loaded = player.load(sq1, sq2, tri, noise, sharedRaw, nesBase);
  if (!loaded) {
    return { name, id, offset, frames: 0, samples: 0, durationSec: 0, endedEarly: true, error: 'load failed' };
  }

  const started = player.start();
  if (!started) {
    return { name, id, offset, frames: 0, samples: 0, durationSec: 0, endedEarly: true, error: 'start failed' };
  }

  let frameCount = 0;
  let endedEarly = false;

  for (let f = 0; f < TEST_FRAMES; f++) {
    player.tick();
    if (!player.progress.playing) {
      endedEarly = true;
      frameCount++;
      break;
    }
    frameCount++;
  }

  return {
    name, id, offset,
    frames: frameCount,
    samples: totalSamples,
    durationSec: Math.round(frameCount / 60 * 10) / 10,
    endedEarly,
  };
}

/**
 * 扫描 Bank 15 中所有 BGM 通道初始化列表 (ch4,ch5,ch6,ch7 序列 + 0xFF 终止)
 * 并过滤掉明显是子段落的部分 (offset 在另一个 BGM 的 track 数据范围内)
 */
function scanBgmHeaders(): Array<{ offset: number; isSubSection: boolean }> {
  const hits: Array<{ offset: number; isSubSection: boolean }> = [];
  for (let i = 0; i < PRG_BANK_15.length - 12; i++) {
    if (PRG_BANK_15[i] !== 0x04) continue;
    if (PRG_BANK_15[i+3] !== 0x05) continue;
    if (PRG_BANK_15[i+6] !== 0x06) continue;
    if (PRG_BANK_15[i+9] !== 0x07) continue;
    if (PRG_BANK_15[i+12] < 0x80) continue;

    const p4 = (PRG_BANK_15[i+1] | (PRG_BANK_15[i+2] << 8)) & 0xFFFF;
    const p5 = (PRG_BANK_15[i+4] | (PRG_BANK_15[i+5] << 8)) & 0xFFFF;
    const p6 = (PRG_BANK_15[i+7] | (PRG_BANK_15[i+8] << 8)) & 0xFFFF;
    const p7 = (PRG_BANK_15[i+10] | (PRG_BANK_15[i+11] << 8)) & 0xFFFF;

    // 所有指针必须在 Bank 15 范围内 ($A000-$BFFF)
    if (p4 < 0xA000 || p4 >= 0xC000) continue;
    if (p5 < 0xA000 || p5 >= 0xC000) continue;
    if (p6 < 0xA000 || p6 >= 0xC000) continue;
    if (p7 < 0xA000 || p7 >= 0xC000) continue;

    // 至少一个 track 指针在 header 之后
    const p4off = p4 - 0xA000;
    if (p4off <= i) continue;

    hits.push({ offset: i, isSubSection: false });
  }

  // 标记子段落: 检测当前 header 是否在前一个 BGM 的轨道数据内
  for (let h = 1; h < hits.length; h++) {
    const pThis = hits[h];
    // 前一个 header 的 ch4 指针位置
    const prevCh4off = ((PRG_BANK_15[hits[h-1].offset+1] | (PRG_BANK_15[hits[h-1].offset+2] << 8)) & 0xFFFF) - 0xA000;
    // 如果当前 header 的 offset 很小且与前一个 header 很接近 → 子段落
    if (pThis.offset - hits[h-1].offset < 300 && pThis.offset > prevCh4off) {
      pThis.isSubSection = true;
    }
  }

  return hits;
}

// ════════════════════════════════════════════════
// Main
// ════════════════════════════════════════════════

function main() {
  console.log('════════════════════════════════════════');
  console.log('  BGM 验证 v4: H5 Tsubasa2AudioPlayer');
  console.log('════════════════════════════════════════');
  console.log('架构: 纯 H5 TypeScript，无 CPU 模拟器');
  console.log(`帧数: ${TEST_FRAMES} (${TEST_FRAMES / 60}s)\n`);

  const results: BgmTestResult[] = [];

  // ── Part 1: BGM00 (预提取轨道) ──
  console.log('── Part 1: BGM00 (0x31) TECMO Theater ──');
  console.log(`  ${BGM00_META.tracks.map(t => `${t.name} ${t.size}B`).join(', ')}`);

  const r0 = testBgm00Player(
    'BGM00 TECMO Theater', '0x31', 0x17AD,
    BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
    BGM00_RAW, 0xB7AD,
  );
  results.push(r0);
  console.log(`  → ${r0.frames}f ${r0.samples}smp ${r0.durationSec}s${r0.endedEarly ? ' ENDED' : ''}`);

  // ── Part 2: Bank 15 扫描 & 提取 ──
  console.log('\n── Part 2: Bank 15 BGM 扫描 ──');
  const headers = scanBgmHeaders();
  console.log(`  找到 ${headers.length} 个通道初始化列表`);
  console.log(`  (${headers.filter(h => h.isSubSection).length} 个子段落)`);

  let idx = 1;
  // 已知主 BGM 偏移 (从 Bank 15 扫描验证)
  // 0x0157, 0x01F8 是 BGM01 (Title) 内部的子章节，非独立 BGM
  const MAIN_BGM_OFFSETS = [0x0000, 0x030F, 0x05E0, 0x07D9, 0x0848, 0x0AA8, 0x0C59, 0x17AD];
  const bgmIdMap: Record<number, string> = {
    0x17AD: '0x31',
    0x0000: '0x32',
    0x030F: '0x33',
    0x05E0: '0x34',
    0x07D9: '0x35',
    0x0848: '0x36',
    0x0AA8: '0x37',
    0x0C59: '0x38',
  };
  const bgmNameMap: Record<number, string> = {
    0x17AD: 'TECMO Theater',
    0x0000: 'Title',
    0x030F: 'Meeting',
    0x05E0: 'Match',
    0x07D9: 'Result/Jingle',
    0x0848: 'BGM06',
    0x0AA8: 'BGM07',
    0x0C59: 'BGM08',
  };

  for (const offset of MAIN_BGM_OFFSETS) {
    const label = `BGM${idx.toString().padStart(2, '0')}`;
    const bgmId = bgmIdMap[offset] || `0x??`;
    const name = bgmNameMap[offset] || `@0x${offset.toString(16)}`;
    console.log(`\n  ${label}: ${name} (@0x${offset.toString(16)})`);

    const track = BgmExtractor.extract(PRG_BANK_15, offset, name);
    if (!track || track.initList.length === 0) {
      console.log(`  ⚠️  提取失败`);
      results.push({ name: `${label} ${name}`, id: bgmId, offset, frames: 0, samples: 0, durationSec: 0, endedEarly: true, error: 'extract failed' });
      idx++;
      continue;
    }

    console.log(`  通道: ${track.initList.map(e => `ch${e.ch}=@${e.offset.toString(16)}`).join(' ')}`);
    console.log(`  数据: SQ1=${track.sq1.length}B SQ2=${track.sq2.length}B TRI=${track.tri.length}B NOISE=${track.noise.length}B`);
    console.log(`  共享: ${track.sharedRaw.length}B (base=$0x${track.nesBase.toString(16)})`);

    if (track.sq1.length === 0 && track.sq2.length === 0 && track.tri.length === 0 && track.noise.length === 0) {
      console.log(`  ⚠️  空轨道`);
      results.push({ name: `${label} ${name}`, id: bgmId, offset, frames: 0, samples: 0, durationSec: 0, endedEarly: true, error: 'empty' });
      idx++;
      continue;
    }

    const r = testBgm00Player(
      `${label} ${name}`, bgmId, offset,
      track.sq1, track.sq2, track.tri, track.noise,
      track.sharedRaw, track.nesBase,
    );
    results.push(r);
    console.log(`  → ${r.frames}f ${r.samples}smp ${r.durationSec}s${r.endedEarly ? ' ENDED' : ''}`);
    idx++;
  }

  // ── 总结 ──
  console.log('\n════════════════════════════════════════');
  console.log('  验证总结');
  console.log('════════════════════════════════════════');

  let pass = 0, fail = 0, warn = 0;
  for (const r of results) {
    const ok = r.frames >= MIN_GOOD_FRAMES && r.samples >= MIN_GOOD_SAMPLES;
    const status = ok ? '✅' : (r.error ? '❌' : '⚠️');
    if (ok) pass++; else if (r.error) fail++; else warn++;
    console.log(`  ${status} ${r.id} ${r.name}: ${r.frames}f ${r.samples}smp${r.error ? ` [${r.error}]` : ''}`);
  }

  console.log(`\n总计: ✅${pass} ⚠️${warn} ❌${fail} / ${results.length}`);
  
  if (pass === 0) {
    console.log('\n⚠️  无 BGM 通过验证');
    process.exit(1);
  } else {
    console.log(`\n✅ H5 BGM 验证完成`);
    process.exit(0);
  }
}

main();
