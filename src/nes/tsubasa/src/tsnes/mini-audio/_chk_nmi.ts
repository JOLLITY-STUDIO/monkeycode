/**
 * _chk_nmi.ts — NMI write tracing script (FIXED)
 *
 * Issues found and fixed:
 * 1. Used 4-bank ROM → now uses 7-bank ROM (index.ts) which actually runs
 * 2. Manual bank override at $8000/$A000 broke MMC3 banking → removed
 * 3. RAM snapshot had $001B=0xC0 causing NMI skip path → analyzed below
 * 4. Write hook was on cpu.write which works, but NMI fires within emulate()
 *
 * Note: Bank 3/7 are STUB (PPU data, no scene rendering needed)
 *
 * Analysis of $001B (NMI control):
 *   - Bit 6 = 1 → NMI takes "fast path" via JMP $C421 → JMP $A200
 *   - Bit 6 = 0 → full NMI handler runs (includes audio processing)
 *   - $C421 does MMC3 bank setup then jumps to bank at $A000+$200
 *   - With snapshot $001B=0xC0, we get the fast path
 *   - The fast path calls bank code at $A200 (which needs proper MMC3)
 */

import { NesAudio } from './emu/nes-audio';
// Use 7-bank ROM (bank 3/7 are STUB — PPU data not needed)
import { NES_PRG_ROM, NES_CHR_ROM } from './rom-data/index';
import * as fs from 'fs';

const BATCH: string[] = [];
function log(s: string) { BATCH.push(s); }

try {
log('=== NMI Write Check (v5 - fixed) ===');

// 1. Create NES and load full 9-bank ROM
const nes = new NesAudio();
const prgArr = new Uint8Array(NES_PRG_ROM);
const chrArr = new Uint8Array(NES_CHR_ROM);
nes.loadROMArrays(prgArr, chrArr);

const cpu = (nes as any).cpu;
const mmap = (nes as any).mmap;

log(`ROM loaded: 7 banks active (0,1,2,12,15,30,31) — Bank 3/7 STUB (PPU data)`);

// 2. Check initial MMC3 state after loadROM()
log(`Initial MMC3: $8000→${mmap.prgBankMap[0x8000]} $A000→${mmap.prgBankMap[0xA000]}`);
log(`              $C000→${mmap.prgBankMap[0xC000]} $E000→${mmap.prgBankMap[0xE000]}`);

// 3. Read vectors
const nmiVec = cpu.mem[0xFFFA] | (cpu.mem[0xFFFB] << 8);
log(`NMI vector: $${nmiVec.toString(16)}`);

// 4. Hook: trace NMI calls
let nmisSeen = 0;
let inNmi = false;
const origDoNmi = cpu.doNonMaskableInterrupt.bind(cpu);
cpu.doNonMaskableInterrupt = function(status: number) {
  nmisSeen++;
  inNmi = true;
  const vec = cpu.mem[0xFFFA] | (cpu.mem[0xFFFB] << 8);
  const b1B = cpu.mem[0x1B];
  log(`\n[NMI #${nmisSeen}] frame=${nes.frameCount} PC=$${cpu.REG_PC.toString(16)} $1B=0x${b1B.toString(16)} (bit6=${(b1B>>6)&1})`);
  return origDoNmi(status);
};

// 5. Hook: capture writes during NMI
const nmwrites: Array<{f:number,nmi:number,addr:number,val:number,pc:number}> = [];
const allRegWrites: Array<{f:number,nmi:boolean,addr:number,val:number,pc:number}> = [];
const origWrite = cpu.write.bind(cpu);
cpu.write = function(addr: number, val: number) {
  if (addr >= 0x2000 && addr <= 0x2007) {
    // PPU register
    if (inNmi) nmwrites.push({f:nes.frameCount,nmi:nmisSeen,addr,val:val&0xff,pc:cpu._instrPC??cpu.REG_PC});
    allRegWrites.push({f:nes.frameCount,nmi:inNmi,addr,val:val&0xff,pc:cpu._instrPC??cpu.REG_PC});
  }
  if (addr >= 0x4000 && addr <= 0x4017) {
    // APU register
    if (inNmi) nmwrites.push({f:nes.frameCount,nmi:nmisSeen,addr,val:val&0xff,pc:cpu._instrPC??cpu.REG_PC});
    allRegWrites.push({f:nes.frameCount,nmi:inNmi,addr,val:val&0xff,pc:cpu._instrPC??cpu.REG_PC});
  }
  return origWrite(addr, val);
};

// 6. Hook emulate to reset inNmi flag after NMI completes
const origEmulate = cpu.emulate.bind(cpu);
cpu.emulate = function() {
  const result = origEmulate();
  // After each emulate() call, check if NMI still fires or has completed
  // NMI fires at start of emulate() and the pending flag is cleared after
  // We reset inNmi at the start of the instruction AFTER NMI (not during NMI body)
  if (inNmi && !cpu.nmiPending) {
    // NMI just completed — the next emulate() call will be the first post-NMI instruction
    // We'll leave inNmi true for one more instruction to capture the RTI
    const wasInNmi = inNmi;
    inNmi = false;
  }
  return result;
};

// Let's fix the approach: hook doNonMaskableInterrupt to track entry,
// hook RTI to track exit
// Actually, the simplest approach: hook RTS/RTI return detection
const origRTI = cpu.REG_PC as any;  // won't work
// Better: hook write so we know NMI ends when nmiPending becomes false

log('\nRunning 8 frames...');
for (let f = 1; f <= 8; f++) {
  const nBefore = nmisSeen;
  const wBefore = nmwrites.length;
  nes.frame();
  log(`Frame ${f}: PC=$${cpu.REG_PC.toString(16)} NMIs=${nmisSeen}(+${nmisSeen-nBefore}) NMI_writes=${nmwrites.length}(+${nmwrites.length-wBefore}) total_reg=${allRegWrites.length} $1B=0x${cpu.mem[0x1B].toString(16)}`);
}

// After each frame, NMI should have completed so inNmi should be false
// If it's still true, the NMI handler didn't finish properly

log(`\n=== NMI writes (${nmwrites.length} total) ===`);
for (const w of nmwrites) {
  const label = w.addr >= 0x4000 ? (w.addr <= 0x4013 ? `APU(r${w.addr&3})` : w.addr === 0x4015 ? 'APUSTAT' : 'CTRL')
    : `PPU(${w.addr&7})`;
  log(`  f${w.f} NMI${w.nmi} ${label} $${w.addr.toString(16)}=0x${w.val.toString(16).padStart(2,'0')} @$${w.pc.toString(16)}`);
}

log(`\n=== ALL PPU+APU writes (${allRegWrites.length} total) ===`);
for (const w of allRegWrites.slice(0, 30)) {
  const label = w.addr >= 0x4000 ? (w.addr <= 0x4013 ? `APU` : 'CTRL')
    : `PPU(${w.addr&7})`;
  log(`  f${w.f} ${w.nmi?'[NMI]':'     '} ${label} $${w.addr.toString(16)}=0x${w.val.toString(16).padStart(2,'0')}`);
}
if (allRegWrites.length > 30) log(`  ... and ${allRegWrites.length-30} more`);

// Key RAM dump
log(`\n=== Key RAM ===`);
log(`  $001B (NMI ctrl): 0x${cpu.mem[0x1B].toString(16)}`);
log(`  $0020 (PPU ctrl1): 0x${cpu.mem[0x20].toString(16)}`);
log(`  $0022 (bank cfg): 0x${cpu.mem[0x22].toString(16)}`);
log(`  $0023: 0x${cpu.mem[0x23].toString(16)}`);
log(`  $0024: 0x${cpu.mem[0x24].toString(16)}`);
log(`  $0025: 0x${cpu.mem[0x25].toString(16)}`);
log(`  $046B (mirror): 0x${cpu.mem[0x46B].toString(16)}`);
log(`  $0498 (audio counter): 0x${cpu.mem[0x498].toString(16)}`);

log(`\nDone. NMIs:${nmisSeen} NMI_writes:${nmwrites.length} total_reg:${allRegWrites.length}`);
} catch(e: any) {
  log(`\nERROR: ${e.message}`);
  log(e.stack || '');
}

fs.writeFileSync('./mini-audio/_chk_nmi_out.txt', BATCH.join('\n'), 'utf8');
