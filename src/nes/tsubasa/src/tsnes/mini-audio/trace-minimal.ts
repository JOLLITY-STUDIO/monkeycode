/**
 * trace-minimal.ts — 3-bank 精简版
 * 只在 JS 层初始化 Bank12 需要的 RAM，不依赖其他 bank 的初始化逻辑
 *
 * 用法: npx tsx mini-audio/trace-minimal.ts [帧数,默认300]
 */
import * as fs from 'fs';
import * as path from 'path';
import { NesAudio } from './emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM } from './rom-data/index-4bank';
import { BANK12_INIT_RAM } from './ram-snapshot';

const FRAMES = parseInt(process.argv[2]) || 300;
const OUT = path.join(__dirname, '_trace_minimal_result.txt');

function chName(addr: number): string {
  if (addr < 0x4004) return 'SQ1';
  if (addr < 0x4008) return 'SQ2';
  if (addr < 0x400C) return 'TRI';
  if (addr < 0x4010) return 'NOISE';
  if (addr < 0x4014) return 'DMC';
  if (addr === 0x4015) return 'STAT';
  return '';
}

async function main() {
  const result: string[] = [];
  function log(s: string) { result.push(s); console.log(s); }

  log(`APU Trace (3-bank minimal) — ${FRAMES} 帧`);
  log('');

  const nes = new NesAudio();
  const prgArr = new Uint8Array(NES_PRG_ROM);
  const chrArr = new Uint8Array(NES_CHR_ROM);
  log(`PRG=${prgArr.length}B CHR=${chrArr.length}B`);

  nes.loadROMArrays(prgArr, chrArr);
  log('ROM loaded');

  // ════════════════════ RAM 初始化 ════════════════════
  const cpu = nes.cpu as any;
  const mmap = nes.mmap as any;

  // 从快照恢复 Bank12 需要的 RAM 状态
  let ramInitCount = 0;
  for (const [addrStr, val] of Object.entries(BANK12_INIT_RAM)) {
    const addr = parseInt(addrStr);
    if (addr < 0x800) {
      cpu.mem[addr] = val;
      ramInitCount++;
    }
  }
  log(`RAM init: ${ramInitCount} bytes loaded from snapshot`);

  // ════════════════════ MMC3 Bank 映射 ════════════════════
  // 4-bank ROM 有 32 个 8KB bank（sparse: banks 12,15,30,31 真实, 其余 stub）
  // MapperAudio 的 _load8kBank 按物理 bank 编号索引，完全正确
  // 无需自定义 MMC3 钩子 — mapper 原生支持
  const BANK_8K = 8192;
  
  // 预加载: $8000=Bank12, $A000=Bank2(stub→RTS→安全返回)
  // MMC3 初始 loadROM() 加载 bank[0]→$8000, bank[1]→$A000
  // NMI handler 会重新映射: bank2→$A000, bank12→$8000
  function copyBankTo(bankNum: number, destAddr: number) {
    const base = bankNum * BANK_8K;
    for (let i = 0; i < BANK_8K; i++) cpu.mem[destAddr + i] = NES_PRG_ROM[base + i];
    mmap.prgBankMap[destAddr] = bankNum;
  }
  copyBankTo(12, 0x8000);
  copyBankTo(2, 0xA000);
  log('MMC3 init: Bank12→$8000, Bank2→$A000 (stub→safe RTS)');

  // ════════════════════ 验证 ════════════════════
  log(`Verify: cpu.mem[0xFF00]=0x${cpu.mem[0xFF00].toString(16)} (expect 0x78=SEI)`);
  log(`Verify: cpu.mem[0xFFFC]=0x${cpu.mem[0xFFFC].toString(16)} ` +
      `cpu.mem[0xFFFD]=0x${cpu.mem[0xFFFD].toString(16)} (RESET vector)`);
  log(`Verify: cpu.mem[0xFFFA]=0x${cpu.mem[0xFFFA].toString(16)} ` +
      `cpu.mem[0xFFFB]=0x${cpu.mem[0xFFFB].toString(16)} (NMI→Bank30)`);
  log(`Verify: cpu.mem[0x8000]=0x${cpu.mem[0x8000].toString(16)} (Bank12)`);
  log(`Verify: cpu.mem[0xA000]=0x${cpu.mem[0xA000].toString(16)} (Bank15)`);
  log(`Verify: cpu.mem[0xC000]=0x${cpu.mem[0xC000].toString(16)} (Bank30)`);

  // ════════════════════ APU 写入钩子 ════════════════════
  const papu = nes.papu as any;
  const origWr = papu.writeReg.bind(papu);
  const chWrites: Record<string, number> = {};
  const chFirst: Record<string, number> = {};
  const all: string[] = [];
  const stats: { f: number; v: number }[] = [];
  let frame = 0;

  papu.writeReg = function (addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017) {
      const ch = chName(addr);
      if (ch) { chWrites[ch] = (chWrites[ch] || 0) + 1; if (!chFirst[ch]) chFirst[ch] = frame; }
      if (addr === 0x4015) stats.push({ f: frame, v: val });
      const desc = ['Duty/Vol', 'Sweep', 'FreqLo', 'FreqHi', '', '', 'FreqLo', 'FreqHi',
        'Timer', '', 'FreqLo', 'FreqHi', 'Vol', '', 'Period', 'Len'][addr - 0x4000] || '';
      if (desc && ['FreqLo', 'FreqHi', 'Duty/Vol', 'Vol', 'Sweep', 'Timer', 'Period','Len'].includes(desc)) {
        const a = addr.toString(16).toUpperCase().padStart(4, '0');
        all.push(`F${String(frame).padStart(5)} $${a}=0x${val.toString(16).padStart(2, '0')} ${ch.padEnd(5)} ${desc}`);
      }
    }
    return origWr(addr, val);
  };

  // ════════════════════ 注入 BGM 请求 ════════════════════
  // 绕过游戏流程，直接在 $0700 写入 BGM ID 0x31（开幕 BGM）
  cpu.mem[0x0700] = 0x31;
  // NMI handler 音频入口条件 (Bank30 $C76E→$C421):
  //   - $001B bit6=1 → 进入音频路径 (BVC不跳)
  //   - $003B bit7=0 → 音频信号量未锁定 (BMI不跳→RTI)
  cpu.mem[0x001B] = 0xC0;  // bit6=1: 走 $C421 音频路径（非 $C775 PPU 路径）
  cpu.mem[0x003B] = 0x00;  // bit7=0: 信号量解锁，允许执行音频逻辑
  cpu.mem[0x00F2] = 0x00;  // 音频处理标记
  // $0020 = PPU 控制寄存器 shadow → bit7=1 使能 NMI
  // 音频路径 $C421 不恢复 $2000，Bank2 可能 ROL $20 破坏；强制设好
  cpu.mem[0x0020] = 0x88;
  // 直接写 PPU $2000 使能 NMI（绕过 mapper，直接设 PPUStub._ctrl1）
  const ppu = nes.ppu as any;
  if (ppu.updateControlReg1) ppu.updateControlReg1(0x88);
  // ★ 钩子: 拦截 PPU $2000 写入 → 强制保持 NMI 使能 bit7=1
  const origUpdateCtrl1 = ppu.updateControlReg1.bind(ppu);
  ppu.updateControlReg1 = function (value: number) {
    origUpdateCtrl1(value | 0x80);
  };
  log('BGM injected: $0700=0x31, $1B=0xC0(b6=1), $3B=0x00(unlocked), $20=0x88(NMI on)');

  // ════════════════════ 运行帧 ════════════════════
  log('Running...');
  const t0 = Date.now();

  // PC trace: NMI 触发 + Bank2/Bank12 入口
  const pcTrace: string[] = [];
  const nmiTrace: string[] = [];
  const b2Trace: string[] = [];
  const b12Trace: string[] = [];
  const origEmulate = cpu.emulate.bind(cpu);
  cpu.emulate = function () {
    const pc = cpu.REG_PC & 0xFFFF;
    if (pcTrace.length < 50) {
      let bank = '??';
      if (pc >= 0x8000 && pc < 0xA000) bank = 'B'+mmap.prgBankMap[0x8000];
      else if (pc >= 0xA000 && pc < 0xC000) bank = 'B'+mmap.prgBankMap[0xA000];
      else if (pc >= 0xC000 && pc < 0xE000) bank = 'B'+mmap.prgBankMap[0xC000] || 'B30';
      else if (pc >= 0xE000) bank = 'B31';
      pcTrace.push(`F${frame} PC=$${pc.toString(16).toUpperCase().padStart(4,'0')} ${bank}`);
    }
    const prevPC = cpu.REG_PC;
    const result = origEmulate();
    const newPC = cpu.REG_PC & 0xFFFF;
    // NMI 跳转检测
    if (newPC >= 0xC000 && newPC < 0xE000 && prevPC >= 0xFF00 && nmiTrace.length < 10) {
      nmiTrace.push(`F${frame} NMI→$${newPC.toString(16).toUpperCase().padStart(4,'0')} 1B=0x${cpu.mem[0x001B].toString(16)} 3B=0x${cpu.mem[0x003B].toString(16)} q[0]=0x${cpu.mem[0x0700].toString(16)}`);
    }
    // Bank2 入口: $A000-$BFFF
    if (newPC >= 0xA000 && newPC < 0xC000 && b2Trace.length < 10) {
      b2Trace.push(`F${frame} B2→$${newPC.toString(16).toUpperCase().padStart(4,'0')} bank=${mmap.prgBankMap[0xA000]}`);
    }
    // Bank12 入口: $8000-$9FFF
    if (newPC >= 0x8000 && newPC < 0xA000 && b12Trace.length < 10) {
      b12Trace.push(`F${frame} B12→$${newPC.toString(16).toUpperCase().padStart(4,'0')} bank=${mmap.prgBankMap[0x8000]} q[0]=0x${cpu.mem[0x0700].toString(16)}`);
    }
    return result;
  };

  for (frame = 0; frame < FRAMES; frame++) {
    try {
      nes.frame();
    } catch (e: any) {
      log(`F${frame} CRASH: ${e.message}`);
      break;
    }
    if (frame % 100 === 0) log(`  F${frame}/${FRAMES}`);
  }
  log(`Done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  log(`\nNMI triggers (${nmiTrace.length}):`);
  if (nmiTrace.length === 0) log(`  ⚠️ NO NMI detected!`);
  for (const l of nmiTrace) log(`  ${l}`);
  log(`\nBank2 ($A000) entries (${b2Trace.length}):`);
  if (b2Trace.length === 0) log(`  ⚠️ Bank2 never entered! (audio init may be skipped)`);
  for (const l of b2Trace) log(`  ${l}`);
  log(`\nBank12 ($8000) entries (${b12Trace.length}):`);
  if (b12Trace.length === 0) log(`  ⚠️ Bank12 never entered!`);
  for (const l of b12Trace) log(`  ${l}`);
  log(`\nPC trace (first ${pcTrace.length} instructions):`);
  for (let i = 0; i < pcTrace.length; i++) {
    log(`  ${String(i).padStart(4)}: ${pcTrace[i]}`);
  }
  log('');

  // ════════════════════ 统计 ════════════════════
  log('='.repeat(65));
  log('通道写入统计:');
  for (const ch of ['STAT', 'SQ1', 'SQ2', 'TRI', 'NOISE', 'DMC']) {
    if (chWrites[ch] !== undefined) log(`  ${ch}: ${chWrites[ch]}次 (首帧F${chFirst[ch]})`);
  }

  log(`\n总APU写入: ${all.length}`);
  log(`前30条:`);
  for (let i = 0; i < Math.min(30, all.length); i++) log(`  ${all[i]}`);

  const sq1f = all.filter(l => l.includes(' SQ1 ') && l.includes('Freq'));
  const sq2f = all.filter(l => l.includes(' SQ2 ') && l.includes('Freq'));
  const trif = all.filter(l => l.includes(' TRI ') && l.includes('Freq'));
  log(`\nBGM判断:`);
  log(`  SQ1(主旋律): ${sq1f.length}次 → ${sq1f.length > 10 ? '✅活跃' : '⚠️极少'}`);
  log(`  SQ2(副旋律): ${sq2f.length}次 → ${sq2f.length > 10 ? '✅活跃' : '⚠️极少'}`);
  log(`  TRI(低音):   ${trif.length}次 → ${trif.length > 10 ? '✅活跃' : '⚠️极少'}`);

  fs.writeFileSync(OUT, result.join('\n'), 'utf-8');
  log(`\n结果: ${OUT}`);

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
