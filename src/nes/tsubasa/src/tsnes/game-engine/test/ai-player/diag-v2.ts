/**
 * Quick diag — check game state from title→match transition
 */
import { createSystemState, SystemState } from '../../native-game/tsubasa/banks/system-state';
import { tick_BANK31_mainLoop, translate_BANK31_RESET } from '../../native-game/tsubasa/banks/prg/bank-31-code';

// Same mock PPU/APU as run-ai-player.ts
function createMockPPU() {
  let ctrl1 = 0, ctrl2 = 0, statusReg = 0;
  let vramAddr = 0, sramAddr = 0;
  const vram = new Uint8Array(0x4000);
  const sram = new Uint8Array(0x100);
  const oam = new Uint8Array(0x100);
  return {
    updateControlReg1(v: number) { ctrl1 = v; },
    updateControlReg2(v: number) { ctrl2 = v; },
    readStatusRegister() { const s = statusReg; statusReg &= 0x7F; return s; },
    sramLoad() { return sram[sramAddr & 0xFF]; },
    vramLoad() { return vram[vramAddr & 0x3FFF]; },
    writeSRAMAddress(v: number) { sramAddr = (sramAddr & 0xFF00) | v; },
    sramWrite(v: number) { sram[sramAddr & 0xFF] = v; sramAddr++; },
    scrollWrite(v: number) {},
    writeVRAMAddress(v: number) { vramAddr = (vramAddr & 0x00FF) | (v << 8); },
    vramWrite(v: number) { vram[vramAddr & 0x3FFF] = v; vramAddr++; },
    sramDMA(v: number) { const base = (v & 0x07) << 8; for (let i = 0; i < 0x100; i++) oam[i] = sram[(base + i) & 0xFF]; },
    nes: null as any, vramMem: vram, sramMem: sram, oamMem: oam,
    getCtrl1() { return ctrl1; }, getCtrl2() { return ctrl2; },
  };
}

function createMockAPU() { return { writeReg(_addr: number, _val: number) {} }; }

const sys = createSystemState(createMockPPU() as any, createMockAPU() as any);

// RESET
translate_BANK31_RESET(sys);
console.log('[0] After RESET: $0700=', sys.mem[0x0700].toString(16), ' $0027=', sys.mem[0x0027].toString(16));

// Run title screen ticks until A+B is pressed
for (let f = 0; f < 200; f++) {
  sys.mem[0x001C] = sys.mem[0x001E] || 0;
  if (f >= 100 && f < 115) sys.mem[0x001E] = 0x80; // A
  else if (f >= 115 && f < 125) sys.mem[0x001E] = 0; // release
  else if (f >= 125 || (f >= 130 && f < 150)) sys.mem[0x001E] = 0xC0; // A+B
  else sys.mem[0x001E] = 0;
  
  tick_BANK31_mainLoop(sys);
  
  if (sys.mem[0x0700] !== 0x33) {
    console.log(`[${f}] MODE CHANGED! $0700=0x${sys.mem[0x0700].toString(16)}`);
    break;
  }
}

// Now show state after title exit
console.log('\n--- Post-title state ---');
const addrs = [0x0700, 0x0027, 0x05FB, 0x0600, 0x0601, 0x0441, 0x0635, 0x0637, 0x043B, 0x0612, 0x0615, 0x0618, 0x062D, 0x026, 0x0446, 0x0448, 0x044D, 0x4C, 0xE0, 0xED, 0xEC];
addrs.forEach(a => console.log(`  $${a.toString(16).padStart(4,'0')}=0x${sys.mem[a].toString(16).padStart(2,'0')} (dec:${sys.mem[a]})`));

// Run a few more match frames
console.log('\n--- Running 20 match frames (no input) ---');
for (let f = 0; f < 20; f++) {
  sys.mem[0x001C] = sys.mem[0x001E] || 0;
  sys.mem[0x001E] = 0;
  try {
    tick_BANK31_mainLoop(sys);
    // Check for key state changes
    const active = sys.mem[0x0600];
    const sub = sys.mem[0x0027];
    const ballX = sys.mem[0x0635];
    const ballY = sys.mem[0x0637];
    if (f % 10 === 0 || active > 0 || sub > 0) {
      console.log(`  f${f}: $0700=0x${sys.mem[0x0700].toString(16)} sub=0x${sub.toString(16)} active=${active} ball=(${ballX.toString(16)},${ballY.toString(16)}) $043B=${sys.mem[0x043B].toString(16)} $0612=${sys.mem[0x0612].toString(16)}`);
    }
  } catch(e: any) {
    console.log(`  f${f}: ERROR — ${e.message}`);
  }
}

console.log('\n--- Final state after 20 match frames ---');
addrs.forEach(a => console.log(`  $${a.toString(16).padStart(4,'0')}=0x${sys.mem[a].toString(16).padStart(2,'0')} (dec:${sys.mem[a]})`));
