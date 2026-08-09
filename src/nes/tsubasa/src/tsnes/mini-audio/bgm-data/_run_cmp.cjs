/**
 * Standalone comparison script - saves result to file
 * Run: node mini-audio/bgm-data/_run_cmp.cjs
 */
const path = require('path');
const fs = require('fs');

// Import the cmp script logic dynamically
async function main() {
  const { NesAudio } = require('../emu/nes-audio');
  const { NES_PRG_ROM, NES_CHR_ROM } = require('../rom-data/index');
  const { BGM00Player } = require('./BGM00Player');
  const { BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE } = require('./BGM00');

  const SAMPLE_RATE = 48000;
  const TOTAL_FRAMES = 1200;
  const EMU_BGM_START = 281;

  function chName(addr) {
    if (addr < 0x4004) return 'SQ1';
    if (addr < 0x4008) return 'SQ2';
    if (addr < 0x400C) return 'TRI';
    if (addr < 0x4010) return 'NOISE';
    return addr <= 0x4017 ? 'DMC' : '';
  }

  // ── EMU ──
  const emuWrites = [];
  const prgArr = new Uint8Array(NES_PRG_ROM);
  const chrArr = new Uint8Array(NES_CHR_ROM);
  const nes = new NesAudio();
  nes.loadROMArrays(prgArr, chrArr);
  const papu = nes.papu;
  const origWr = papu.writeReg.bind(papu);
  papu.writeReg = function (addr, val) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      if (ch) emuWrites.push({ f: nes.frameCount, addr, val, ch });
    }
    return origWr(addr, val);
  };

  console.log(`[EMU] Running ${TOTAL_FRAMES + EMU_BGM_START} frames...`);
  const t0 = Date.now();
  for (let f = 0; f < TOTAL_FRAMES + EMU_BGM_START; f++) {
    nes.frame();
    if ((f + 1) % 300 === 0) console.log(`  ${f + 1}/${TOTAL_FRAMES + EMU_BGM_START}`);
  }
  console.log(`[EMU] ${((Date.now() - t0) / 1000).toFixed(1)}s, ${emuWrites.length} writes`);

  // ── PLAYER ──
  const playerWrites = [];
  const player = new BGM00Player(SAMPLE_RATE);
  const playerPapu = player.papu;
  const playerOrigWr = playerPapu.writeReg.bind(playerPapu);
  playerPapu.writeReg = function (addr, val) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      if (ch) playerWrites.push({ f: player.progress.frame, addr, val, ch });
    }
    return playerOrigWr(addr, val);
  };
  player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE);
  player.start();

  console.log(`[PLR] Running ${TOTAL_FRAMES} frames...`);
  const t1 = Date.now();
  for (let f = 0; f < TOTAL_FRAMES && player.progress.playing; f++) {
    player.tick();
  }
  console.log(`[PLR] ${((Date.now() - t1) / 1000).toFixed(1)}s, ${playerWrites.length} writes, stopped F${player.progress.frame}`);

  // ── COMPARE ──
  const lines = [];
  lines.push('=== APU Write Comparison: Emu vs BGM00Player ===');
  lines.push(`EMU: ${emuWrites.length} total writes, ${TOTAL_FRAMES} frames`);
  lines.push(`PLR: ${playerWrites.length} total writes, ${player.progress.frame} frames`);
  lines.push('');

  // Filter & rebase emu
  const emuBgm = emuWrites.filter(w => w.f >= EMU_BGM_START).map(w => ({
    ...w, f: w.f - EMU_BGM_START
  }));
  lines.push(`EMU BGM starts at F${EMU_BGM_START}, ${emuBgm.length} writes in BGM range`);

  // Channel stats
  function chStats(writes, label) {
    const chs = {};
    for (const w of writes) {
      if (!chs[w.ch]) chs[w.ch] = { total: 0, freqs: 0, dutyVol: 0, sweep: 0, freqHi: 0 };
      chs[w.ch].total++;
      const r = w.addr & 3;
      if (r === 0) chs[w.ch].dutyVol++;
      else if (r === 1) chs[w.ch].sweep++;
      else if (r === 2) chs[w.ch].freqs++;
      else if (r === 3) chs[w.ch].freqHi++;
    }
    lines.push(`\n${label} (${writes.length} writes):`);
    for (const [ch, s] of Object.entries(chs)) {
      lines.push(`  ${ch.padEnd(5)}: total=${String(s.total).padStart(4)}  vol=${String(s.dutyVol).padStart(4)}  sweep=${String(s.sweep).padStart(4)}  freqLo=${String(s.freqs).padStart(4)}  freqHi=${String(s.freqHi).padStart(4)}`);
    }
  }
  chStats(emuBgm, 'EMU (rebase)');
  chStats(playerWrites, 'Player');

  // First writes comparison
  lines.push('\n--- First 30 writes (EMU rebase) ---');
  for (const w of emuBgm.slice(0, 30)) {
    const desc = ['Duty/Vol', 'Sweep', 'FreqLo', 'FreqHi'][w.addr & 3];
    lines.push(`F${String(w.f).padStart(4)} $${w.addr.toString(16).padStart(4,'0')}=0x${w.val.toString(16).padStart(2,'0')} ${w.ch.padEnd(5)} ${desc}`);
  }

  lines.push('\n--- First 30 writes (Player) ---');
  for (const w of playerWrites.slice(0, 30)) {
    const desc = ['Duty/Vol', 'Sweep', 'FreqLo', 'FreqHi'][w.addr & 3];
    lines.push(`F${String(w.f).padStart(4)} $${w.addr.toString(16).padStart(4,'0')}=0x${w.val.toString(16).padStart(2,'0')} ${w.ch.padEnd(5)} ${desc}`);
  }

  // Frame-by-frame
  function frameMap(writes) {
    const m = new Map();
    for (const w of writes) {
      if (!m.has(w.f)) m.set(w.f, []);
      m.get(w.f).push([w.addr, w.val]);
    }
    return m;
  }
  const emuMap = frameMap(emuBgm);
  const playerMap = frameMap(playerWrites);
  const maxF = Math.max(
    emuBgm.length > 0 ? emuBgm[emuBgm.length - 1].f : 0,
    playerWrites.length > 0 ? playerWrites[playerWrites.length - 1].f : 0,
  );

  let match = 0, diff = 0;
  const diffDetails = [];
  for (let f = 0; f <= maxF; f++) {
    const ev = emuMap.get(f) || [];
    const pv = playerMap.get(f) || [];
    if (ev.length === 0 && pv.length === 0) continue;

    const eSet = new Set(ev.map(a => `${a[0].toString(16)}:${a[1].toString(16)}`));
    const pSet = new Set(pv.map(a => `${a[0].toString(16)}:${a[1].toString(16)}`));
    if (eSet.size === pSet.size && [...eSet].every(x => pSet.has(x))) {
      match++;
    } else {
      diff++;
      if (diffDetails.length < 80) {
        diffDetails.push(`\nF${f} DIFF:`);
        diffDetails.push(`  EMU(${eSet.size}): ${[...eSet].sort().join(', ')}`);
        diffDetails.push(`  PLR(${pSet.size}): ${[...pSet].sort().join(', ')}`);
      }
    }
  }
  lines.push(`\n=== FRAME COMPARISON ===`);
  lines.push(`Match: ${match} frames, Diff: ${diff} frames`);

  // F0-F15: 详细每帧对比
  for (let f = 0; f <= 15; f++) {
    const ev = emuMap.get(f) || [];
    const pv = playerMap.get(f) || [];
    lines.push(`\nF${f}: EMU(${ev.length}) vs PLR(${pv.length})`);
    if (ev.length > 0) {
      for (const [a, v] of ev) {
        const pMatch = pv.find(p => p[0] === a);
        const marker = pMatch ? (pMatch[1] === v ? '==' : '!=') : 'EMU-ONLY';
        const pVal = pMatch ? `0x${pMatch[1].toString(16).padStart(2,'0')}` : 'NONE';
        lines.push(`  $${a.toString(16).padStart(4,'0')}: EMU=0x${v.toString(16).padStart(2,'0')} vs PLR=${pVal} ${marker}`);
      }
    }
    if (pv.length > 0) {
      for (const [a, v] of pv) {
        if (!ev.find(e => e[0] === a)) {
          lines.push(`  $${a.toString(16).padStart(4,'0')}: PLR-ONLY=0x${v.toString(16).padStart(2,'0')}`);
        }
      }
    }
  }

  // Append diff details
  for (const d of diffDetails) lines.push(d);

  const outPath = path.join(__dirname, '_cmp_result.txt');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`\n[OK] Result written to ${outPath}`);
  console.log(`Match: ${match}, Diff: ${diff}`);
  console.log(lines.slice(0, 40).join('\n'));
}

main().catch(e => { console.error('FATAL:', e.message, e.stack); process.exit(1); });
