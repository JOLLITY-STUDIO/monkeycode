/**
 * BGM 验证脚本 — 诊断并修复音频模拟器问题
 * 运行: npx tsx _verify_bgm.ts
 */
import { NesAudio } from './mini-audio/emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM } from './mini-audio/rom-data/index';

const SAMPLE_RATE = 48000;
const DIAG_FRAMES = 30; // 诊断帧数
const TOTAL_FRAMES = 200; // 总渲染帧数

function main() {
  console.log('=== BGM 验证诊断 ===');

  // 1. Create simulation
  const prgArr = new Uint8Array(NES_PRG_ROM as number[]);
  const chrArr = new Uint8Array(NES_CHR_ROM as number[]);
  const nes = new NesAudio();
  nes.loadROMArrays(prgArr, chrArr);

  const cpu = (nes as any).cpu as any;
  const mmap = nes.mmap as any;
  const ppu = nes.ppu as any;
  const papu = (nes as any).papu as any;

  console.log(`ROM: PRG=${prgArr.length}B CHR=${chrArr.length}B`);

  // 2. Check initial state
  const resetLo = cpu.mem[0xFFFC], resetHi = cpu.mem[0xFFFD];
  const nmiLo = cpu.mem[0xFFFA], nmiHi = cpu.mem[0xFFFB];
  console.log(`RESET vector: $${(resetHi<<8|resetLo).toString(16).toUpperCase()}`);
  console.log(`NMI   vector: $${(nmiHi<<8|nmiLo).toString(16).toUpperCase()}`);
  console.log(`Initial banks: $8000=B${mmap.prgBankMap[0x8000]} $A000=B${mmap.prgBankMap[0xA000]} $C000=B${mmap.prgBankMap[0xC000]} $E000=B${mmap.prgBankMap[0xE000]}`);

  // 3. Hook APU writes
  let apuWriteCount = 0;
  const origWr = papu.writeReg.bind(papu);
  papu.writeReg = function (addr: number, val: number) {
    apuWriteCount++;
    if (apuWriteCount <= 20) {
      console.log(`  APU#${apuWriteCount}: $${addr.toString(16)}=0x${val.toString(16)}`);
    }
    return origWr(addr, val);
  };

  // 4. Hook NMI detection (improved)
  let nmiCount = 0;
  let prevPC = cpu.REG_PC & 0xFFFF;
  let framesSinceNMI = 0;
  const origEmulate = cpu.emulate.bind(cpu);

  cpu.emulate = function () {
    const beforePC = cpu.REG_PC & 0xFFFF;
    const result = origEmulate();
    const afterPC = cpu.REG_PC & 0xFFFF;

    // Improved NMI detection: check if PC jumped to an address
    // that could only come from a vector (NMI or RESET)
    const jumpSize = (afterPC - beforePC) & 0xFFFF;
    const inNmiRange = afterPC >= 0xC000 && afterPC < 0xE000;

    // NMI detected when PC jumps "backwards" into Bank 30 range
    // (i.e., the interrupt pushed PC and jumped to NMI vector)
    if (inNmiRange && jumpSize > 0x2000) {
      nmiCount++;
      framesSinceNMI = 0;
      if (nmiCount <= 15) {
        const bank = mmap.prgBankMap[0x8000];
        console.log(`  ⚡ NMI#${nmiCount}: $${beforePC.toString(16)}→$${afterPC.toString(16)} bank${bank} 1B=0x${cpu.mem[0x001B]?.toString(16)} 3B=0x${cpu.mem[0x003B]?.toString(16)} ctrl1=0x${ppu._ctrl1?.toString(16)}`);
      }
    }
    prevPC = afterPC;
    return result;
  };

  // 5. Run through frames
  console.log('\n--- Frame-by-frame diagnostics ---');
  for (let f = 0; f < DIAG_FRAMES; f++) {
    const nmiBefore = nmiCount;
    const apuBefore = apuWriteCount;

    try {
      nes.frame();
    } catch (e: any) {
      console.error(`F${f} CRASH: ${e.message}`);
      break;
    }

    const nmiFired = nmiCount > nmiBefore;
    const apuFired = apuWriteCount > apuBefore;
    const pc = cpu.REG_PC & 0xFFFF;
    const b8 = mmap.prgBankMap[0x8000];
    const bA = mmap.prgBankMap[0xA000];
    const ctrl1 = ppu._ctrl1;

    framesSinceNMI = nmiFired ? 0 : framesSinceNMI + 1;

    if (f < 10 || nmiFired || apuFired || f % 30 === 0) {
      const nmiStr = nmiFired ? `⚡NMI` : (framesSinceNMI > 5 ? `⚠️NO-NMI(${framesSinceNMI}f)` : '');
      console.log(`  F${f.toString().padStart(3)} PC=$${pc.toString(16).padStart(4)} B8=${b8} BA=${bA} ctrl1=0x${ctrl1?.toString(16)} APU=${apuWriteCount} ${nmiStr}`);
    }

    if (f === 9) {
      // Inject BGM conditions after frame 9 (before frame 10 starts)
      console.log('\n--- Injecting BGM conditions ---');
      cpu.mem[0x0700] = 0x31;
      cpu.mem[0x003B] = 0x00;
      cpu.mem[0x001B] = 0xC0;
      cpu.mem[0x00F2] = 0x00;
      cpu.mem[0x0020] = 0x88;
      
      // ★★★ KEY FIX: Hook MMC3 bank switching to lock $8000→Bank12 ★★★
      const origLoad8k = mmap._load8kBank.bind(mmap);
      mmap._load8kBank = function(bank: number, addr: number) {
        // Lock Bank 12 at $8000 for audio processing
        if (addr === 0x8000) {
          origLoad8k(12, addr);
          mmap.prgBankMap[addr] = 12;
        } else {
          origLoad8k(bank, addr);
          mmap.prgBankMap[addr] = bank;
        }
      };
      // Also patch _mmc3Command to enforce Bank 12 at $8000
      const origMmc3Cmd = mmap._mmc3Command.bind(mmap);
      mmap._mmc3Command = function(cmd: number, arg: number) {
        if (cmd === 6 && mmap.prgAddressSelect === 0) {
          // CMD=6, prgSelect=0 → switch $8000 bank → force Bank 12
          origLoad8k(12, 0x8000);
          mmap.prgBankMap[0x8000] = 12;
        } else if (cmd === 6 && mmap.prgAddressSelect === 1) {
          // Switch $C000 bank → passthrough
          origMmc3Cmd(cmd, arg);
        } else if (cmd === 7) {
          // CMD=7 → switch $A000 bank (keep normally)
          origMmc3Cmd(cmd, arg);
        } else {
          // CHR commands or others → passthrough
          origMmc3Cmd(cmd, arg);
        }
      };
      
      // Also intercept $8000 write to ensure command gets our override
      const origMmc3Write = mmap._mmc3Write.bind(mmap);
      mmap._mmc3Write = function(addr: number, val: number) {
        if ((addr & 0xe001) === 0x8000) {
          // When writing to $8000 (command reg), note the setting
          // But let the original handler process it
          origMmc3Write(addr, val);
          // If the game tries to switch $8000 bank, it goes through _mmc3Command
          // which we already patched above
        } else {
          origMmc3Write(addr, val);
        }
      };
      
      // Then do the initial mapping
      origLoad8k(12, 0x8000);
      mmap.prgBankMap[0x8000] = 12;
      origLoad8k(2, 0xA000);
      mmap.prgBankMap[0xA000] = 2;
      
      // Enable NMI via PPU
      ppu.updateControlReg1(0x88);
      const origCtrl = ppu.updateControlReg1.bind(ppu);
      ppu.updateControlReg1 = function (v: number) { origCtrl(v | 0x80); };
      
      console.log(`  Post-inject: B8=${mmap.prgBankMap[0x8000]} BA=${mmap.prgBankMap[0xA000]} ctrl1=0x${ppu._ctrl1?.toString(16)} PC=$${(cpu.REG_PC & 0xFFFF).toString(16)}`);
      console.log(`  001B=0x${cpu.mem[0x001B]?.toString(16)} 003B=0x${cpu.mem[0x003B]?.toString(16)} 0700=0x${cpu.mem[0x0700]?.toString(16)}`);
    }
  }

  // 6. Check results
  console.log(`\n--- Results after ${DIAG_FRAMES} frames ---`);
  console.log(`NMI count: ${nmiCount}`);
  console.log(`APU writes: ${apuWriteCount}`);

  if (apuWriteCount > 5) {
    console.log('✅ PASS: APU writes detected! BGM audio is working.');
  } else {
    console.log('❌ FAIL: No meaningful APU writes. Need debugging.');
  }

  if (nmiCount < 5) {
    console.log('❌ FAIL: NMI not firing enough.');
  } else {
    console.log('✅ NMI firing normally.');
  }

  // 7. Quick render for audio
  console.log(`\n--- Rendering ${TOTAL_FRAMES} frames for audio data ---`);
  const samples: number[] = [];
  nes.opts.onAudioSample = (l: number, r: number) => { samples.push((l+r)/2); };

  let apuFinal = apuWriteCount;
  for (let f = DIAG_FRAMES; f < TOTAL_FRAMES; f++) {
    try { nes.frame(); } catch (e: any) {
      console.error(`F${f} crash: ${e.message}`);
      break;
    }
  }

  const newApuWrites = apuWriteCount - apuFinal;
  console.log(`Samples: ${samples.length}`);
  console.log(`New APU writes during playback: ${newApuWrites}`);

  if (samples.length > 1000) {
    // Check if samples are non-silent
    let max = 0, min = 0, nonZero = 0;
    for (let i = 0; i < samples.length; i++) {
      const s = samples[i];
      if (s !== 0) nonZero++;
      if (s > max) max = s;
      if (s < min) min = s;
    }
    console.log(`Audio range: [${min.toFixed(4)}, ${max.toFixed(4)}] nonZero: ${nonZero}/${samples.length}`);
    if (nonZero > samples.length * 0.01) {
      console.log('✅ Audio has meaningful content!');
    } else {
      console.log('⚠️ Audio is mostly silent.');
    }
  }

  console.log('\n=== Diagnosis complete ===');
}

main();
