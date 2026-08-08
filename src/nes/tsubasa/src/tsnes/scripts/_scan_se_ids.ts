/**
 * 只测 mini-audio: 找正确的开场 BGM ID
 */
import * as fs from 'fs';
import * as path from 'path';
import CPU from '../mini-audio/cpu';
import PAPU from '../mini-audio/papu/index';
import PRG_BANK_12 from '../rom-data/prg-bank-12';
import PRG_BANK_13 from '../rom-data/prg-bank-13';
import PRG_BANK_14 from '../rom-data/prg-bank-14';
import PRG_BANK_15 from '../rom-data/prg-bank-15';
import PRG_BANK_31 from '../rom-data/prg-bank-31';

const OUT = path.join(__dirname, '_mini_test_result.txt');
const CYCLES = 29830;

function chName(addr: number) {
  if (addr < 0x4004) return 'SQ1';
  if (addr < 0x4008) return 'SQ2';
  if (addr < 0x400C) return 'TRI';
  if (addr < 0x4010) return 'NOISE';
  return addr < 0x4014 ? 'DMC' : '';
}

function testSe(seId: number, maxFrames: number): string[] {
  const lines: string[] = [];
  const chWrites: Record<string, number> = {};
  let statFrames: number[] = [];
  let freqChanges: Record<string, number> = {};
  let pcCrashFrame = -1;
  let pcJumpOut = false;

  const samples: number[] = [];
  let _cpu: any = null;
  let _papu: any = null;

  const nes: any = {
    opts: { sampleRate: 48000, onAudioSample: (l: number, r: number) => { samples.push((l+r)*0.5); } },
    gameGenie: { enabled: false, applyCodes: (_a:number, v:number)=>v },
    fpsFrameCount: 0, controllers: [0,0],
    get cpu() { return _cpu; }, get papu() { return _papu; }, get ppu() { return null; },
  };

  _papu = new PAPU(nes);
  const origWR = _papu.writeReg.bind(_papu);
  let frame = 0;

  _papu.writeReg = function(addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      if (addr === 0x4015) statFrames.push(frame);
      const ch = chName(addr);
      if (ch) { chWrites[ch] = (chWrites[ch]||0)+1; }
      if (addr === 0x4002 || addr === 0x4003 || addr === 0x4006 || addr === 0x4007 || addr === 0x400A || addr === 0x400B) {
        freqChanges[ch] = (freqChanges[ch]||0)+1;
      }
    }
    return origWR(addr, val);
  };

  // RAM
  const mem = new Uint8Array(0x800);
  for (let i=0x700;i<0x800;i++) mem[i]=0;
  mem[0x0700] = seId; mem[0x07FC]=0;
  for (let g=0;g<4;g++) mem[0x07E4+g]=0x08;

  // MMC3
  let bankSelectReg=0, regR7=0;
  const AUX: Record<number, readonly number[]> = { 0x0D:PRG_BANK_13, 0x0E:PRG_BANK_14, 0x0F:PRG_BANK_15 };
  function getBank(addr: number) {
    if (addr<0xA000) return PRG_BANK_12;
    if (addr<0xC000) return AUX[regR7]||PRG_BANK_12;
    return PRG_BANK_31;
  }
  const _mmc = {
    load(addr: number): number {
      if (addr<0x2000) return mem[addr&0x7FF];
      if (addr>=0x8000) { const b=getBank(addr); const ba=addr<0xA000?0x8000:addr<0xC000?0xA000:addr<0xE000?0xC000:0xE000; return b[(addr-ba)&0x1FFF]; }
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

  // Bootstrap
  const code = [
    0xA9,seId, 0x8D,0x00,0x07,
    0xA9,0x0F, 0x8D,0x15,0x40,
    0xA2,0x05, 0x20,0x02,0x80,
    0x20,0xBA,0x80, 0x4C,0x0F,0x02,
  ];
  for (let i=0;i<code.length;i++) mem[0x0200+i]=code[i];

  // CPU
  _cpu = new CPU(nes);
  (_cpu as any).mem = mem;
  _cpu.REG_SP=0xFD; _cpu.REG_STATUS=0x04; _cpu.setStatus(0x04);
  _cpu.REG_A=0; _cpu.REG_X=0; _cpu.REG_Y=0; _cpu.REG_PC=0x01FF;

  // Run
  for (frame=0; frame<maxFrames; frame++) {
    let fc=0;
    while (fc<CYCLES) {
      try {
        const cyc=_cpu.emulate(); fc+=cyc; _papu.clockFrameCounter(cyc);
        const pc=_cpu.REG_PC;
        if (pc<0x0200 || (pc>=0x2000 && pc<0x8000)) { pcJumpOut=true; break; }
      } catch(_e) { break; }
    }
    if (pcJumpOut) break;
  }

  // 结果
  lines.push(`  ${seId===0x30?'SE ':'BGM'}ID=0x${seId.toString(16)} (${maxFrames}帧 → 跑完${frame}帧)`);
  lines.push(`  写入: SQ1=${chWrites['SQ1']||0} SQ2=${chWrites['SQ2']||0} TRI=${chWrites['TRI']||0} NOISE=${chWrites['NOISE']||0} DMC=${chWrites['DMC']||0}`);
  lines.push(`  频率: SQ1=${freqChanges['SQ1']||0} SQ2=${freqChanges['SQ2']||0} TRI=${freqChanges['TRI']||0}`);
  lines.push(`  STAT: ${statFrames.length}次 采样: ${samples.length}`);
  if (pcJumpOut) lines.push(`  ⚠️ PC 跳出 (F${frame})`);

  return lines;
}

// ── 主 ──
const out: string[] = [];
function log(s:string) { out.push(s); console.log(s); }

log('Mini-Audio 音效/BGM ID 扫描');
log('='.repeat(50));

// 音效 0x30-0x31
log('\n── 短音效 (SE) ──');
out.push(...testSe(0x30,90));
out.push(...testSe(0x31,90));
out.push(...testSe(0x32,90));
out.push(...testSe(0x33,90));
out.push(...testSe(0x34,90));

// BGM 范围
log('\n── 可能 BGM (0x35-0x80) ──');
for (let id=0x35; id<=0x80; id++) {
  const lines = testSe(id, 300);
  const hasSQ1 = lines.some(l => l.includes('SQ1=') && !l.includes('SQ1=0'));
  const hasSQ2 = lines.some(l => l.includes('SQ2=') && !l.includes('SQ2=0'));
  if (hasSQ1 || hasSQ2) {
    out.push(`\n✅ 活跃! ID=0x${id.toString(16)}`);
    out.push(...lines);
  } else if (id%5===0) {
    out.push(`  ID=0x${id.toString(16)}: 无输出`);
  }
}

log(`\n写入: ${OUT}`);
fs.writeFileSync(OUT, out.join('\n'), 'utf-8');
process.exit(0);
