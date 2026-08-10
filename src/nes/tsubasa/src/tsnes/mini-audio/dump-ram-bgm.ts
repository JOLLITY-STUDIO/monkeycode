/**
 * 抓取 BGM 启动后的 RAM 快照
 * 等 Bank12 已经开始播放音乐（有实质性 APU 写入）后再 dump
 */
import * as fs from 'fs';
import * as path from 'path';
import { NesAudio } from './emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM } from './rom-data/index';

const OUT = path.join(__dirname, 'ram-snapshot-bgm.ts');

async function main() {
  const nes = new NesAudio();
  nes.loadROMArrays(new Uint8Array(NES_PRG_ROM), new Uint8Array(NES_CHR_ROM));

  const cpu = nes.cpu as any;
  const mmap = nes.mmap as any;
  const papu = nes.papu as any;

  let bank12At8000 = false;
  let snapshotTaken = false;
  let freqWrites = 0;
  let ramSnapshot: number[] | null = null;
  let snapshotFrame = -1;

  // Track Bank12 mapping
  const origLoad8k = mmap._load8kBank.bind(mmap);
  mmap._load8kBank = function (bank8k: number, addr: number) {
    if (addr === 0x8000) bank12At8000 = (bank8k === 12);
    return origLoad8k(bank8k, addr);
  };

  // Track APU writes to detect when BGM starts
  const origWr = papu.writeReg.bind(papu);
  papu.writeReg = function (addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017 && val !== 0) {
      const r = addr & 3;
      if ((addr >= 0x4000 && addr < 0x4008 && (r === 2 || r === 3)) ||  // SQ1 Freq
          (addr >= 0x4004 && addr < 0x400C && (r === 2 || r === 3)) ||  // SQ2 Freq
          (addr >= 0x4008 && addr < 0x400C && (r === 2 || r === 3))) {   // TRI Freq
        freqWrites++;
      }
    }
    return origWr(addr, val);
  };

  console.log('Running, waiting for BGM to start (>5 freq writes)...');
  for (let f = 0; f < 300; f++) {
    try { nes.frame(); } catch (e: any) {
      console.log(`F${f} CRASH: ${e.message}`);
      break;
    }

    // After BGM has started playing (>5 freq writes), take snapshot
    if (!snapshotTaken && freqWrites > 5 && bank12At8000) {
      ramSnapshot = Array.from(cpu.mem.slice(0, 0x800));
      snapshotFrame = f;
      console.log(`[SNAPSHOT] frame ${f}, freqWrites=${freqWrites}`);
      snapshotTaken = true;

      // Run a few more frames to collect Bank12 read/write data
      for (let f2 = 0; f2 < 10; f2++) {
        try { nes.frame(); } catch {}
      }
      break;
    }

    if (f % 100 === 0) console.log(`  F${f}, freqWrites=${freqWrites}`);
  }

  if (!ramSnapshot) {
    console.log('ERROR: Never got enough freq writes!');
    process.exit(1);
  }

  // Output non-zero bytes
  const nonZero: Record<number, number> = {};
  for (let i = 0; i < ramSnapshot.length; i++) {
    if (ramSnapshot[i] !== 0) nonZero[i] = ramSnapshot[i];
  }

  const lines: string[] = [];
  lines.push(`// BGM playback RAM snapshot`);
  lines.push(`// Captured at frame ${snapshotFrame}, freqWrites=${freqWrites}`);
  lines.push(`// Total non-zero bytes: ${Object.keys(nonZero).length} / 2048`);
  lines.push(`export const BANK12_BGM_RAM: Record<number, number> = {`);
  const addrs = Object.keys(nonZero).map(Number).sort((a, b) => a - b);
  for (const addr of addrs) {
    lines.push(`  0x${addr.toString(16).toUpperCase().padStart(3, '0')}: 0x${nonZero[addr].toString(16).toUpperCase().padStart(2, '0')},`);
  }
  lines.push(`};`);

  fs.writeFileSync(OUT, lines.join('\n'), 'utf-8');
  console.log(`\nWritten: ${OUT}`);
  console.log(`Non-zero bytes: ${Object.keys(nonZero).length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
