/**
 * Headless APU Trace — 在 Node.js 中跑 NES 模拟器，抓取 APU 寄存器写入
 * 输出到 scripts/_apu_trace_result.txt (或指定文件名)
 * 
 * 用法: npx tsx scripts/trace_apu_headless.ts [帧数,默认600] [输出文件名,可选]
 */
import * as fs from 'fs';
import * as path from 'path';
import NES from '../src/nes';
import { NES_PRG_ROM, NES_CHR_ROM } from '../rom-data/index';

const FRAMES = parseInt(process.argv[2]) || 600;
const OUT = path.join(__dirname, process.argv[3] || '_apu_trace_result.txt');
const DISABLE_BGM = process.argv[4] === 'nobgm';  // pass 'nobgm' to disable BGM

function chName(addr: number) {
  if (addr < 0x4004) return 'SQ1';
  if (addr < 0x4008) return 'SQ2';
  if (addr < 0x400C) return 'TRI';
  if (addr < 0x4010) return 'NOISE';
  if (addr < 0x4014) return 'DMC';
  if (addr === 0x4015) return 'STAT';
  return '';
}

function chDesc(addr: number) {
  const r = addr & 3;
  const b = addr & 0xFFFC;
  if (b === 0x4000 || b === 0x4004) return ['Duty/Vol', 'Sweep', 'FreqLo', 'FreqHi'][r];
  if (b === 0x4008) return ['Timer',  '',      'FreqLo', 'FreqHi'][r];
  if (b === 0x400C) return ['Vol',     '',      'Period', 'Len'][r];
  if (b === 0x4010) return ['DMC_Freq', 'DMC_DAC', 'DMC_Addr', 'DMC_Len'][r];
  return '';
}

const result: string[] = [];
function log(s: string) { result.push(s); console.log(s); }

async function main() {
  log(`APU Trace — ${FRAMES} 帧, 无输入`);
  log('');

  const hdr = new Uint8Array([0x4E,0x45,0x53,0x1A, 0x10,0x10, 0x40,0x08, 0,0,0,0, 0,0,0,1]);
  const prg = new Uint8Array(NES_PRG_ROM);
  const chr = new Uint8Array(NES_CHR_ROM);
  const rom = new Uint8Array(hdr.length + prg.length + chr.length);
  rom.set(hdr, 0); rom.set(prg, hdr.length); rom.set(chr, hdr.length + prg.length);
  log(`ROM: ${rom.length}B`);

  const nes = new NES({ emulateSound: true, sampleRate: 48000 });
  nes.loadROM(rom);
  log('ROM loaded');

  // ── Patch PAPU ──
  const papu = (nes as any).papu;
  const orig = papu.writeReg.bind(papu);
  const chWrites: Record<string, number> = {};
  const chFirst: Record<string, number> = {};
  const all: string[] = [];
  const stats: { f: number; v: number }[] = [];
  let frame = 0;

  papu.writeReg = function(addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017 && val !== 0) {
      const ch = chName(addr);
      if (ch) { chWrites[ch] = (chWrites[ch] || 0) + 1; if (!chFirst[ch]) chFirst[ch] = frame; }
      if (addr === 0x4015) stats.push({ f: frame, v: val });
      const desc = chDesc(addr);
      if (['FreqLo', 'FreqHi', 'Duty/Vol', 'Vol', 'Sweep', 'Timer', 'Period', 'DMC_Freq', 'DMC_DAC', 'DMC_Addr', 'DMC_Len'].includes(desc)) {
        const a = addr.toString(16).toUpperCase().padStart(4, '0');
        all.push(`F${String(frame).padStart(5)} $${a}=0x${val.toString(16).padStart(2,'0')} ${ch.padEnd(5)} ${desc}`);
      }
    }
    return orig(addr, val);
  };

  log('Running...');
  const t0 = Date.now();
  for (frame = 0; frame < FRAMES; frame++) {
    try { nes.frame(); } catch(e:any) { log(`F${frame} CRASH: ${e.message}`); break; }
    if (frame % 100 === 0) log(`  F${frame}/${FRAMES}`);
  }
  log(`Done in ${((Date.now()-t0)/1000).toFixed(1)}s\n`);

  // ── 输出 ──
  log('='.repeat(65));
  log('通道写入统计:');
  for (const [ch, n] of Object.entries(chWrites)) log(`  ${ch}: ${n}次 (首帧F${chFirst[ch]})`);

  log(`\n$4015 通道开关: ${stats.length}次`);
  log('  bit0=SQ1 bit1=SQ2 bit2=TRI bit3=NOISE bit4=DMC');
  for (const s of stats) {
    const a: string[] = [];
    if (s.v&1)a.push('SQ1'); if(s.v&2)a.push('SQ2'); if(s.v&4)a.push('TRI');
    if(s.v&8)a.push('NOISE'); if(s.v&16)a.push('DMC');
    log(`  F${String(s.f).padStart(5)} 0x${s.v.toString(16).padStart(2,'0')} → ${a.join('+')||'全关'}`);
  }

  log(`\nAPU 寄存器写入事件 (全部 ${all.length} 条):`);
  for (const l of all) log(`  ${l}`);

  // BGM 判断
  const sq1f = all.filter(l => l.includes(' SQ1 ') && l.includes('Freq'));
  const sq2f = all.filter(l => l.includes(' SQ2 ') && l.includes('Freq'));
  const trif = all.filter(l => l.includes(' TRI ') && l.includes('Freq'));
  log(`\nBGM判断:`);
  log(`  SQ1(主旋律): ${sq1f.length}次频率 → ${sq1f.length>10?'✅活跃':'⚠️极少'}`);
  log(`  SQ2(副旋律): ${sq2f.length}次频率 → ${sq2f.length>10?'✅活跃':'⚠️极少'}`);
  log(`  TRI(低音):   ${trif.length}次频率 → ${trif.length>10?'✅活跃':'⚠️极少'}`);

  fs.writeFileSync(OUT, result.join('\n'), 'utf-8');
  log(`\n结果已写入: ${OUT}`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
