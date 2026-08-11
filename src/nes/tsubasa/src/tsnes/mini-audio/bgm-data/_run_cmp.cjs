/**
 * BGM00 A/B APU 写入对比 — Node.js 真实运行版
 *
 * A 侧: NES 模拟器 (src/nes.ts)
 * B 侧: Tsubasa2AudioPlayer (纯 TS 引擎, 无 CPU)
 *
 * 用法: node mini-audio/bgm-data/_run_cmp.cjs
 *
 * 特性:
 *   - 自动同步: 在 A 侧 trace 中搜索 B 侧前 50 条写入的最佳匹配帧偏移
 *   - 逐帧对齐对比
 *   - 输出到 _cmp_result.txt + 控制台
 */
const path = require('path');
const fs = require('fs');

// ═══ 加载 TS 模块 ═══
try { require('tsx/cjs'); } catch(_) {
  console.error('请安装 tsx: npm i -D tsx');
  process.exit(1);
}

const NES = require('../../src/nes').default;
const {
  Tsubasa2AudioPlayer,
  BGM00_RAW, BGM00_TRACK_SQ1, BGM00_TRACK_SQ2,
  BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
} = require('./index');
const { NES_PRG_ROM, NES_CHR_ROM } = require('../rom-data/index');

const SAMPLE_RATE = 48000;
const NES_FRAMES = 4500;  // 多跑些帧确保 BGM00 完整覆盖
const PLR_MAX_FRAMES = 3000;

// ═══ 辅助 ═══
const chName = addr => {
  if (addr < 0x4004) return 'SQ1';
  if (addr < 0x4008) return 'SQ2';
  if (addr < 0x400C) return 'TRI';
  if (addr < 0x4010) return 'NOISE';
  if (addr < 0x4014) return 'DMC';
  if (addr === 0x4015) return 'STAT';
  return '';
};

const regDesc = addr => {
  const r = addr & 3, b = addr & 0xFFFC;
  if (b === 0x4000 || b === 0x4004) return ['Duty/Vol', 'Sweep', 'FreqLo', 'FreqHi'][r];
  if (b === 0x4008) return ['Linear', '', 'FreqLo', 'FreqHi'][r];
  if (b === 0x400C) return ['Vol', '', 'Period', 'Len'][r];
  return '';
};

const INES_HEADER = new Uint8Array([
  0x4E,0x45,0x53,0x1A, 0x10,0x10,0x40,0x08,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,
]);

// ═══ A 侧: NES 模拟器 APU trace ═══
function runNesEmu(frameCount) {
  const prg = new Uint8Array(NES_PRG_ROM);
  const chr = new Uint8Array(NES_CHR_ROM);
  const rom = new Uint8Array(INES_HEADER.length + prg.length + chr.length);
  rom.set(INES_HEADER, 0); rom.set(prg, 16); rom.set(chr, 16 + prg.length);

  const nes = new NES({ emulateSound: true, sampleRate: SAMPLE_RATE });
  nes.loadROM(rom);

  const writes = [];
  const papu = nes.papu;
  const origWr = papu.writeReg.bind(papu);
  let curFrame = 0;
  papu.writeReg = function(addr, val) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      if (ch) writes.push({ f: curFrame, addr, val, ch });
    }
    return origWr(addr, val);
  };

  console.log(`[NES] Running ${frameCount} frames...`);
  const t0 = Date.now();
  for (let f = 0; f < frameCount; f++) {
    curFrame = f;
    nes.frame();
    if ((f + 1) % 500 === 0) console.log(`  ${f+1}/${frameCount}`);
  }
  console.log(`[NES] Done in ${((Date.now()-t0)/1000).toFixed(1)}s, ${writes.length} writes`);
  return writes;
}

// ═══ B 侧: TS 引擎 APU trace ═══
function runTsPlayer(maxFrames) {
  const player = new Tsubasa2AudioPlayer(SAMPLE_RATE);
  const writes = [];

  const papu = player.papu;
  const origWr = papu.writeReg.bind(papu);
  let curFrame = 0;
  papu.writeReg = function(addr, val) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      if (ch) writes.push({ f: player.progress.frame, addr, val, ch });
    }
    return origWr(addr, val);
  };

  player.load(
    BGM00_TRACK_SQ1, BGM00_TRACK_SQ2,
    BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
    BGM00_RAW, 0xB7AD,
  );
  player.start();

  console.log(`[TS] Running ${maxFrames} frames of BGM00...`);
  const t0 = Date.now();
  for (let f = 0; f < maxFrames; f++) {
    curFrame = f;
    player.tick();
    if (!player.progress.playing) {
      console.log(`  BGM ended at F${player.progress.frame}`);
      break;
    }
  }
  console.log(`[TS] Done in ${((Date.now()-t0)/1000).toFixed(1)}s, ${writes.length} writes, ended F${player.progress.frame}`);
  return writes;
}

// ═══ 自动同步 ═══
function findSyncOffset(emuTrace, playerTrace) {
  if (playerTrace.length < 10 || emuTrace.length < 20) return { offset: 0, score: 'too_short' };

  const SYNC_SAMPLE = 50;
  const sample = playerTrace.slice(0, SYNC_SAMPLE);
  const firstBF = sample[0].f, lastBF = sample[sample.length - 1].f;

  // A 侧按帧索引
  const emuByFrame = new Map();
  for (const w of emuTrace) {
    if (!emuByFrame.has(w.f)) emuByFrame.set(w.f, []);
    emuByFrame.get(w.f).push(w);
  }

  const maxEmuF = emuTrace[emuTrace.length - 1].f;
  const searchEnd = maxEmuF - (lastBF - firstBF) - 1;
  let bestOffset = 0, bestScore = -Infinity;

  for (let offsetF = 0; offsetF < searchEnd; offsetF++) {
    let score = 0, matched = 0, checked = 0;
    for (const sw of sample) {
      const emuF = sw.f - firstBF + offsetF;
      const ew = emuByFrame.get(emuF);
      checked++;
      if (ew) {
        for (const e of ew) {
          if (e.addr === sw.addr && e.val === sw.val) { matched++; break; }
        }
      }
    }
    score = matched * 10 - (matched < checked / 3 ? 200 : 0);
    if (score > bestScore) { bestScore = score; bestOffset = offsetF; }
    if (matched >= sample.length * 0.85) break; // 早停
  }

  return {
    offset: bestOffset,
    score: (bestScore / sample.length).toFixed(2),
  };
}

// ═══ 对比 ═══
function compare(emuTrace, playerTrace, syncOffset) {
  const lines = [];
  lines.push('='.repeat(70));
  lines.push('BGM00 A/B APU 写入逐帧对比');
  lines.push('='.repeat(70));
  lines.push(`同步偏移: F${syncOffset} (A侧该帧 = B侧F0)`);
  lines.push(`A侧: ${emuTrace.length} writes`);
  lines.push(`B侧: ${playerTrace.length} writes`);
  lines.push('');

  // Align
  const firstBF = playerTrace[0].f;
  const emuAligned = emuTrace
    .filter(w => w.f >= syncOffset)
    .map(w => ({ f: w.f - syncOffset, addr: w.addr, val: w.val, ch: w.ch }));
  const plrAligned = playerTrace.map(w => ({ f: w.f - firstBF, addr: w.addr, val: w.val, ch: w.ch }));

  function frameSet(writes) {
    const m = new Map();
    for (const w of writes) {
      if (!m.has(w.f)) m.set(w.f, []);
      m.get(w.f).push([w.addr, w.val]);
    }
    return m;
  }

  const emuMap = frameSet(emuAligned);
  const plrMap = frameSet(plrAligned);
  const maxF = Math.max(
    emuAligned.length > 0 ? emuAligned[emuAligned.length - 1].f : 0,
    plrAligned.length > 0 ? plrAligned[plrAligned.length - 1].f : 0,
  );

  let match = 0, diff = 0;
  let emuOnly = 0, plrOnly = 0;
  const diffFrames = [];

  for (let f = 0; f <= maxF; f++) {
    const ev = emuMap.get(f) || [];
    const pv = plrMap.get(f) || [];
    if (ev.length === 0 && pv.length === 0) continue;

    const eStrs = new Set(ev.map(a => `${a[0].toString(16)}:${a[1].toString(16)}`));
    const pStrs = new Set(pv.map(a => `${a[0].toString(16)}:${a[1].toString(16)}`));

    if (eStrs.size === pStrs.size && [...eStrs].every(x => pStrs.has(x))) {
      match++;
    } else {
      diff++;
      if (ev.length === 0) plrOnly++;
      if (pv.length === 0) emuOnly++;
      if (diffFrames.length < 40) {
        const rows = [`\nF${f} DIFF:`];
        const emuCh = ev.map(a => `$${a[0].toString(16).padStart(4,'0')}=0x${a[1].toString(16).padStart(2,'0')} ${chName(a[0])}`);
        const plrCh = pv.map(a => `$${a[0].toString(16).padStart(4,'0')}=0x${a[1].toString(16).padStart(2,'0')} ${chName(a[0])}`);
        if (emuCh.length) rows.push(`  EMU: ${emuCh.join(', ')}`);
        else rows.push(`  EMU: (none)`);
        if (plrCh.length) rows.push(`  PLR: ${plrCh.join(', ')}`);
        else rows.push(`  PLR: (none)`);
        diffFrames.push(rows.join('\n'));
      }
    }
  }

  // F0-F14 逐帧
  lines.push('--- F0-F14 逐帧对比 ---');
  for (let f = 0; f <= 14; f++) {
    const ev = emuMap.get(f) || [];
    const pv = plrMap.get(f) || [];
    const allMatch = ev.length === pv.length && ev.every((e, i) => e[0] === (pv[i]?.[0]) && e[1] === (pv[i]?.[1]));
    lines.push(`F${f} ${allMatch ? '✓' : '✗'} EMU(${ev.length}) PLR(${pv.length})`);
    for (const [a, v] of ev) {
      const pm = pv.find(p => p[0] === a);
      const marker = pm ? (pm[1] === v ? '==' : `!=(EMU=0x${v.toString(16)} PLR=0x${pm[1].toString(16)})`) : 'EMU-ONLY';
      lines.push(`  $${a.toString(16).padStart(4,'0')}: 0x${v.toString(16).padStart(2,'0')} ${chName(a).padEnd(5)} ${regDesc(a).padEnd(8)} ${marker}`);
    }
    for (const [a, v] of pv) {
      if (!ev.find(e => e[0] === a)) {
        lines.push(`  $${a.toString(16).padStart(4,'0')}: PLR-ONLY 0x${v.toString(16).padStart(2,'0')} ${chName(a).padEnd(5)} ${regDesc(a)}`);
      }
    }
  }

  // 通道统计
  function chStats(writes, label) {
    const chs = {};
    for (const w of writes) {
      if (!chs[w.ch]) chs[w.ch] = { total: 0, volduty: 0, sweep: 0, freqLo: 0, freqHi: 0 };
      chs[w.ch].total++;
      const r = w.addr & 3;
      if (r === 0) chs[w.ch].volduty++;
      else if (r === 1) chs[w.ch].sweep++;
      else if (r === 2) chs[w.ch].freqLo++;
      else chs[w.ch].freqHi++;
    }
    lines.push(`\n${label}:`);
    for (const [ch, s] of Object.entries(chs)) {
      lines.push(`  ${ch.padEnd(5)}: T=${s.total} V=${s.volduty} Sw=${s.sweep} FL=${s.freqLo} FH=${s.freqHi}`);
    }
  }
  chStats(emuAligned, 'EMU (aligned)');
  chStats(plrAligned, 'PLR (aligned)');

  // 差异
  lines.push(`\n--- 匹配结果 ---`);
  lines.push(`匹配帧: ${match} | 差异帧: ${diff} (EMU独有:${emuOnly} PLR独有:${plrOnly})`);
  lines.push(`匹配率: ${(match/Math.max(match+diff,1)*100).toFixed(1)}%`);

  if (diffFrames.length > 0) {
    lines.push(`\n--- 差异详情 (前${diffFrames.length}帧) ---`);
    lines.push(...diffFrames);
  }
  lines.push('');

  return { lines, match, diff, emuOnly, plrOnly };
}

// ═══ MAIN ═══
async function main() {
  console.log('=== BGM00 A/B APU 对比 ===\n');

  // A 侧
  let emuWrites;
  const emuTracePath = path.join(__dirname, '_emu_trace.json');
  if (process.argv.includes('--no-cache') || !fs.existsSync(emuTracePath)) {
    emuWrites = runNesEmu(NES_FRAMES);
    fs.writeFileSync(emuTracePath, JSON.stringify(emuWrites), 'utf-8');
    console.log(`[CACHE] Saved EMU trace: ${emuTracePath}`);
  } else {
    console.log(`[CACHE] Loading EMU trace from ${emuTracePath}`);
    emuWrites = JSON.parse(fs.readFileSync(emuTracePath, 'utf-8'));
    console.log(`[CACHE] ${emuWrites.length} writes loaded`);
    // Re-run if we want to force
    if (process.argv.includes('--force-emu')) {
      emuWrites = runNesEmu(NES_FRAMES);
      fs.writeFileSync(emuTracePath, JSON.stringify(emuWrites), 'utf-8');
    }
  }

  // B 侧
  const playerWrites = runTsPlayer(PLR_MAX_FRAMES);

  // 同步
  const { offset, score } = findSyncOffset(emuWrites, playerWrites);
  console.log(`\n[SYNC] Offset F${offset}, Score ${score}`);

  // 对比
  const { lines, match, diff } = compare(emuWrites, playerWrites, offset);

  // 输出
  const outPath = path.join(__dirname, '_cmp_result.txt');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`\n[DONE] Result → ${outPath}`);
  console.log(`Match: ${match} / ${match+diff}, Diff: ${diff}`);

  // 前 60 行输出到控制台
  console.log('\n' + lines.slice(0, 60).join('\n'));
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
