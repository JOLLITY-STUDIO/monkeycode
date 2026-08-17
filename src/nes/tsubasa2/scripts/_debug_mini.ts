/**
 * 逐步 debug: 每次 emulate() 前后 trace PC
 */
import CPU from '../mini-audio/cpu';
import PAPU from '../mini-audio/papu/index';
import PRG_BANK_12 from '../rom-data/prg-bank-12';
import PRG_BANK_31 from '../rom-data/prg-bank-31';

const CYCLES = 29830;
const seId = 0x30;

const ppuStub = { advanceDots: (_n: number) => {} };
const samples: number[] = [];
const nes: any = {
  opts: { sampleRate: 48000, onAudioSample: (l: number, r: number) => { samples.push((l+r)*0.5); } },
  gameGenie: { enabled: false, applyCodes: (_a:number, v:number)=>v },
  fpsFrameCount: 0, controllers: [0,0],
  ppu: ppuStub,
  get cpu() { return _cpu; }, get papu() { return _papu; }, get mmap() { return _mmc; },
};

let _cpu: any, _papu: any;
_papu = new PAPU(nes);

const mem = new Uint8Array(0x800);
for (let i=0x700;i<0x800;i++) mem[i]=0;
mem[0x0700] = seId; mem[0x07FC]=0;
for (let g=0;g<4;g++) mem[0x07E4+g]=0x08;

let bankSelectReg=0, regR7=0;
function getBank(addr: number) {
  if (addr<0xA000) return PRG_BANK_12;
  return PRG_BANK_31;
}
const _mmc = {
  load(addr: number): number {
    if (addr<0x2000) return mem[addr&0x7FF];
    if (addr>=0x8000) {
      const b=getBank(addr);
      const ba=addr<0xA000?0x8000:addr<0xC000?0xA000:addr<0xE000?0xC000:0xE000;
      return b[(addr-ba)&0x1FFF];
    }
    return 0;
  },
  write(addr: number, val: number): void {
    if (addr<0x2000) { mem[addr&0x7FF]=val&0xFF; return; }
    if (addr>=0x4000 && addr<=0x4017) { _papu.writeReg(addr,val); return; }
    if (addr>=0x8000) {
      if ((addr&1)===0) bankSelectReg=val&0x07;
      else { if(bankSelectReg===7) regR7=val&0x3F; }
    }
  },
};

// Bootstrap @ $0200
const code = [
  0xA9,seId, 0x8D,0x00,0x07,   // LDA #SE, STA $0700
  0xA9,0x0F, 0x8D,0x15,0x40,   // LDA #$0F, STA $4015
  0xA2,0x05, 0x20,0x02,0x80,   // LDX #5, JSR $8002
  0x20,0xBA,0x80, 0x4C,0x0F,0x02,
];
for (let i=0;i<code.length;i++) mem[0x0200+i]=code[i];

// ── 查 NMI/IRQ 向量 ──
function loadWord(addr: number): number {
  return _mmc.load(addr) | (_mmc.load(addr+1) << 8);
}
console.log(`NMI vector ($FFFA-$FFFB): $${loadWord(0xFFFA).toString(16)}`);
console.log(`Reset vector ($FFFC-$FFFD): $${loadWord(0xFFFC).toString(16)}`);
console.log(`IRQ/BRK vector ($FFFE-$FFFF): $${loadWord(0xFFFE).toString(16)}`);

// ── CPU，记录 nmiPending ──
_cpu = new CPU(nes);
(_cpu as any).mem = mem;
_cpu.REG_SP=0xFD; _cpu.REG_STATUS=0x04; _cpu.setStatus(0x04);
_cpu.REG_A=0; _cpu.REG_X=0; _cpu.REG_Y=0; _cpu.REG_PC=0x0200;

console.log(`nmiPending=${_cpu.nmiPending} nmiRaised=${_cpu.nmiRaised}`);

console.log('\n── 逐步跟踪 ──');
let step = 0;
let fc = 0;
while (fc < CYCLES && step < 10) {
  step++;
  const pcBefore = _cpu.REG_PC;
  
  // 读当前指令
  let raw = '';
  for (let i=0;i<3;i++) {
    const a = (pcBefore + i) & 0xFFFF;
    raw += (a<0x2000 ? mem[a&0x7FF] : _mmc.load(a)).toString(16).padStart(2,'0') + ' ';
  }
  
  try {
    const cyc = _cpu.emulate();
    fc += cyc;
    _papu.clockFrameCounter(cyc);
    
    const a = _cpu.REG_A, x = _cpu.REG_X, y = _cpu.REG_Y, sp = _cpu.REG_SP, sr = _cpu.getStatus();
    console.log(`  #${step} $${pcBefore.toString(16)} [${raw.trim()}]` +
      ` → A=$${a.toString(16)} X=$${x.toString(16)} Y=$${y.toString(16)} SP=$${sp.toString(16)} SR=$${sr.toString(16)} nmiPend=${_cpu.nmiPending} nmiRaised=${_cpu.nmiRaised}`);
    
    if (pcBefore >= 0x8000 && pcBefore < 0x8006) {
      console.log(`    *** ENTERED BANK 12 @ $${pcBefore.toString(16)} ***`);
    }
    
    const nextPC = _cpu.REG_PC;
    // 检查是否跳到了意外的地方
    const expectedNext = pcBefore + 2;
    if (nextPC > 0x800 && pcBefore < 0x800) {
      console.log(`    ⚠️ PC 跳出 RAM 区域! $${pcBefore.toString(16)} → $${nextPC.toString(16)}`);
    }
  } catch(e: any) {
    console.log(`  ❌ #${step} $${pcBefore.toString(16)}: ${e.message}`);
    break;
  }
}

console.log(`\n结果: ${fc}c, ${step}指令, samples=${samples.length}`);
// Check what was written to $0700
console.log(`$0700 = 0x${mem[0x0700].toString(16)}`);
console.log(`$0200 = 0x${mem[0x0200].toString(16)} (should be 0xA9)`);
process.exit(0);
