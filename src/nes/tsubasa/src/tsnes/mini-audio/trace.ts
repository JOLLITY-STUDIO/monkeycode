/**
 * mini-audio/trace.ts
 * 精简版音频模拟器 trace 脚本。
 * 输出结果应与 scripts/_apu_trace_result.txt 完全一致。
 *
 * 用法: npx tsx mini-audio/trace.ts [帧数,默认800]
 */

import * as fs from 'fs';
import * as path from 'path';
import { NesAudio } from './emu/nes-audio';
// 精简 ROM — 全 PRG bank（游戏初始化需要），无 CHR（音频不需要图形）
import { NES_PRG_ROM, NES_CHR_ROM, AUDIO_BANK_IDS } from './rom-data/index';

// ═══════════════════════ 命令行参数 ═══════════════════════
const FRAMES = parseInt(process.argv[2]) || 800;
const OUT = path.join(__dirname, '_trace_result.txt');
const REF = path.join(__dirname, '..', 'scripts', '_apu_trace_result.txt');

// ═══════════════════════ 辅助函数 ═══════════════════════
function chName(addr: number): string {
  if (addr < 0x4004) return 'SQ1';
  if (addr < 0x4008) return 'SQ2';
  if (addr < 0x400C) return 'TRI';
  if (addr < 0x4010) return 'NOISE';
  if (addr < 0x4014) return 'DMC';
  if (addr === 0x4015) return 'STAT';
  return '';
}

function chDesc(addr: number): string {
  const r = addr & 3;
  const b = addr & 0xFFFC;
  if (b === 0x4000 || b === 0x4004) return ['Duty/Vol', 'Sweep', 'FreqLo', 'FreqHi'][r];
  if (b === 0x4008) return ['Timer', '', 'FreqLo', 'FreqHi'][r];
  if (b === 0x400C) return ['Vol', '', 'Period', 'Len'][r];
  return '';
}

// ═══════════════════════ 主流程 ═══════════════════════
const result: string[] = [];
function log(s: string) { result.push(s); console.log(s); }

async function main() {
  log(`APU Trace (mini-audio) — ${FRAMES} 帧, 无输入`);
  log('');

  // 1. 构建模拟器
  const nes = new NesAudio();

  const prgArr = new Uint8Array(NES_PRG_ROM);
  const chrArr = new Uint8Array(NES_CHR_ROM);

  log(`精简 ROM: PRG=${prgArr.length}B (含${AUDIO_BANK_IDS.length}个音频 bank: ${AUDIO_BANK_IDS.join(',')}) CHR=${chrArr.length}B`);

  nes.loadROMArrays(prgArr, chrArr);
  log('ROM loaded');

  // 2. 挂载 APU 写入钩子
  const papu = nes.papu as any;
  const origWr = papu.writeReg.bind(papu);

  const chWrites: Record<string, number> = {};
  const chFirst: Record<string, number> = {};
  const all: string[] = [];
  const stats: { f: number; v: number }[] = [];
  let frame = 0;

  papu.writeReg = function (addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017 && val !== 0) {
      const ch = chName(addr);
      if (ch) { chWrites[ch] = (chWrites[ch] || 0) + 1; if (!chFirst[ch]) chFirst[ch] = frame; }
      if (addr === 0x4015) stats.push({ f: frame, v: val });
      const desc = chDesc(addr);
      if (desc && ['FreqLo', 'FreqHi', 'Duty/Vol', 'Vol', 'Sweep', 'Timer', 'Period'].includes(desc)) {
        const a = addr.toString(16).toUpperCase().padStart(4, '0');
        all.push(
          `F${String(frame).padStart(5)} $${a}=0x${val.toString(16).padStart(2, '0')} ${ch.padEnd(5)} ${desc}`,
        );
      }
    }
    return origWr(addr, val);
  };

  // 2b. 跟踪 PRG bank 切换（MMC3 写入 $8000-$9FFF => _load8kBank）
  const mapper = nes.mmap as any;
  const origLoad8k = mapper._load8kBank?.bind(mapper) || mapper.load8kBank?.bind(mapper);
  const usedBanks = new Set<number>();
  const bankSlotHist: { f: number; slot: string; bank: number }[] = [];

  if (mapper._load8kBank) {
    mapper._load8kBank = function (bank8k: number, addr: number) {
      usedBanks.add(bank8k);
      const slot = addr === 0x8000 ? '$8000' : addr === 0xA000 ? '$A000' : addr === 0xC000 ? '$C000' : `$${addr.toString(16)}`;
      bankSlotHist.push({ f: frame, slot, bank: bank8k });
      return origLoad8k(bank8k, addr);
    };
  }

  // 2c. 跟踪 Bank 15 数据读取 — hook mapper.load 拦截 $8000-$BFFF
  const B15_TARGET = 15;
  const bank15Access = new Map<number, { firstFrame: number; count: number; value: number }>();
  const origMapperLoad = mapper.load.bind(mapper);

  mapper.load = function (address: number) {
    const a = address & 0xffff;
    // 只跟踪 ROM 窗口 ($8000-$BFFF)
    if (a >= 0x8000 && a < 0xC000) {
      const slotAddr = a & 0xE000; // $8000 or $A000
      const bank = mapper.prgBankMap[slotAddr];
      if (bank === B15_TARGET) {
        const offset = a - slotAddr; // 0-0x1FFF within bank 15
        const existing = bank15Access.get(offset);
        if (existing) {
          existing.count++;
        } else {
          bank15Access.set(offset, { firstFrame: frame, count: 1, value: -1 }); // value filled later
        }
      }
    }
    return origMapperLoad(address);
  };

  // 2d. 记录 PC（程序计数器）当 APU 写入时
  const cpu = nes.cpu as any;
  const apuPcLog: { f: number; pc: number; apuAddr: number; val: number }[] = [];
  const origPapuWrite = papu.writeReg.bind(papu);
  papu.writeReg = function (addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017 && val !== 0) {
      const pc = (cpu.REG_PC ?? cpu._instrPC) & 0xffff;
      apuPcLog.push({ f: frame, pc, apuAddr: addr, val });
    }
    return origPapuWrite(addr, val);
  };

  // 3. 运行帧
  log('Running...');
  const t0 = Date.now();
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
  log('');

  // 填充 bank 15 每个被读偏移的实际 byte 值（直接从原始 PRG 数据）
  const BANK_8K = 8192;
  const bank15PRGOffset = B15_TARGET * BANK_8K;
  for (const [offset, info] of bank15Access) {
    info.value = NES_PRG_ROM[bank15PRGOffset + offset];
  }

  // 4. 输出统计
  log('='.repeat(65));
  log('通道写入统计:');
  for (const ch of ['STAT', 'SQ1', 'SQ2', 'TRI', 'NOISE', 'DMC']) {
    if (chWrites[ch] !== undefined) {
      log(`  ${ch}: ${chWrites[ch]}次 (首帧F${chFirst[ch]})`);
    }
  }

  log(`\n$4015 通道开关: ${stats.length}次`);
  log('  bit0=SQ1 bit1=SQ2 bit2=TRI bit3=NOISE bit4=DMC');
  for (const s of stats) {
    const a: string[] = [];
    if (s.v & 1) a.push('SQ1');
    if (s.v & 2) a.push('SQ2');
    if (s.v & 4) a.push('TRI');
    if (s.v & 8) a.push('NOISE');
    if (s.v & 16) a.push('DMC');
    log(`  F${String(s.f).padStart(5)} 0x${s.v.toString(16).padStart(2, '0')} → ${a.join('+') || '全关'}`);
  }

  log(`\n关键事件时间线 (${Math.min(all.length, 150)}/${all.length}):`);
  for (let i = 0; i < Math.min(all.length, 150); i++) log(`  ${all[i]}`);

  // BGM 判断
  const sq1f = all.filter(l => l.includes(' SQ1 ') && l.includes('Freq'));
  const sq2f = all.filter(l => l.includes(' SQ2 ') && l.includes('Freq'));
  const trif = all.filter(l => l.includes(' TRI ') && l.includes('Freq'));
  log(`\nBGM判断:`);
  log(`  SQ1(主旋律): ${sq1f.length}次频率 → ${sq1f.length > 10 ? '✅活跃' : '⚠️极少'}`);
  log(`  SQ2(副旋律): ${sq2f.length}次频率 → ${sq2f.length > 10 ? '✅活跃' : '⚠️极少'}`);
  log(`  TRI(低音):   ${trif.length}次频率 → ${trif.length > 10 ? '✅活跃' : '⚠️极少'}`);

  // ════════ Bank 15 数据范围分析 ════════
  log('\n' + '='.repeat(65));
  log(`Bank 15 数据读取分析 (BGM/音效数据)`);
  log(`  总访问偏移数: ${bank15Access.size} / 8192`);
  if (bank15Access.size > 0) {
    // 排序偏移
    const sorted = [...bank15Access.entries()].sort((a, b) => a[0] - b[0]);
    // 找出连续范围
    const ranges: { start: number; end: number; totalReads: number; bytes: number[] }[] = [];
    let curRange: { start: number; end: number; totalReads: number; bytes: number[] } | null = null;
    for (const [off, info] of sorted) {
      if (!curRange || off > curRange.end + 1) {
        if (curRange) ranges.push(curRange);
        curRange = { start: off, end: off, totalReads: info.count, bytes: [{ off, val: info.value } as any] };
      } else {
        curRange.end = off;
        curRange.totalReads += info.count;
        (curRange.bytes as any).push({ off, val: info.value });
      }
    }
    if (curRange) ranges.push(curRange);

    log(`  数据范围段: ${ranges.length}段`);
    log(`  ${'范围(偏移)'.padEnd(22)} ${'大小'.padEnd(8)} ${'读取次数'.padEnd(10)} ${'首字节序列'}`);
    log(`  ${'-'.repeat(70)}`);
    for (const r of ranges) {
      const size = r.end - r.start + 1;
      const hexStart = r.start.toString(16).toUpperCase().padStart(4, '0');
      const hexEnd = r.end.toString(16).toUpperCase().padStart(4, '0');
      const firstBytes = (r.bytes as { off: number; val: number }[])
        .slice(0, 12)
        .map((b: { val: number }) => b.val.toString(16).padStart(2, '0'))
        .join(' ');
      log(`  $${hexStart}-$${hexEnd}     ${String(size).padEnd(6)}B  ${String(r.totalReads).padEnd(10)} ${firstBytes}`);
    }

    // 计算总用量
    const totalUsed = ranges.reduce((s, r) => s + (r.end - r.start + 1), 0);
    log(`\n  数据密度: ${totalUsed}B / 8192B = ${(totalUsed / 8192 * 100).toFixed(1)}%`);

    // 前 64 个被读的偏移详情
    log(`\n  前64个被读偏移详情:`);
    log(`  ${'偏移'.padEnd(8)} ${'首帧'.padEnd(6)} ${'次数'.padEnd(6)} ${'值(hex)'}`);
    for (let i = 0; i < Math.min(64, sorted.length); i++) {
      const [off, info] = sorted[i];
      log(`  $${off.toString(16).padStart(4, '0')}  F${String(info.firstFrame).padStart(4)}  ${String(info.count).padEnd(5)}  0x${info.value.toString(16).padStart(2, '0')}`);
    }
  }

  // ════════ Bank 切换历史 ════════
  log('\n' + '='.repeat(65));
  log(`Bank 切换历史 (共${bankSlotHist.length}次)`);
  if (bankSlotHist.length > 0) {
    log(`  ${'帧'.padEnd(5)} ${'窗口'.padEnd(7)} ${'Bank'}`);
    const shown = bankSlotHist.slice(0, 60);
    for (const h of shown) {
      log(`  F${String(h.f).padStart(3)}  ${h.slot.padEnd(6)} ${h.bank}`);
    }
    if (bankSlotHist.length > 60) log(`  ... (还有${bankSlotHist.length - 60}次切换)`);

    // 汇总每个窗口最后映射的 bank
    log(`\n  最终窗口映射:`);
    for (const slot of ['0x8000', '0xA000', '0xC000', '0xE000']) {
      const bk = mapper.prgBankMap[parseInt(slot)];
      log(`    $${slot} → Bank ${bk}`);
    }
  }

  // APU + PC 关联 (前30条)
  log(`\n  APU写入+PC关联 (前30/${apuPcLog.length}):`);
  for (let i = 0; i < Math.min(30, apuPcLog.length); i++) {
    const e = apuPcLog[i];
    const apuHex = e.apuAddr.toString(16).toUpperCase().padStart(4, '0');
    log(`  F${String(e.f).padStart(4)} PC=$${e.pc.toString(16).padStart(4, '0')} -> $${apuHex}=0x${e.val.toString(16).padStart(2, '0')} (${chName(e.apuAddr)})`);
  }

  // 5. 写入文件
  fs.writeFileSync(OUT, result.join('\n'), 'utf-8');
  log(`\n结果已写入: ${OUT}`);

  // 6. 与参考值对比
  log('\n========== 对比参考值 ==========');
  const refExists = fs.existsSync(REF);
  log(`参考文件: ${REF} ${refExists ? '✅ 存在' : '❌ 不存在'}`);
  if (refExists) {
    const refText = fs.readFileSync(REF, 'utf-8');
    // 提取关键统计数据行
    const refStats = extractStats(refText);
    log(`参考: SQ1=${refStats.SQ1} SQ2=${refStats.SQ2} TRI=${refStats.TRI} NOISE=${refStats.NOISE} DMC=${refStats.DMC}`);
    log(`实际: SQ1=${chWrites.SQ1 ?? 0} SQ2=${chWrites.SQ2 ?? 0} TRI=${chWrites.TRI ?? 0} NOISE=${chWrites.NOISE ?? 0} DMC=${chWrites.DMC ?? 0}`);

    const sq1Match = (chWrites.SQ1 ?? 0) === refStats.SQ1;
    const sq2Match = (chWrites.SQ2 ?? 0) === refStats.SQ2;
    const triMatch = (chWrites.TRI ?? 0) === refStats.TRI;
    const noiseMatch = (chWrites.NOISE ?? 0) === refStats.NOISE;
    const dmcMatch = (chWrites.DMC ?? 0) === refStats.DMC;
    const allMatch = sq1Match && sq2Match && triMatch && noiseMatch && dmcMatch;

    log(`SQ1: ${sq1Match ? '✅' : '❌'}  SQ2: ${sq2Match ? '✅' : '❌'}  TRI: ${triMatch ? '✅' : '❌'}  NOISE: ${noiseMatch ? '✅' : '❌'}  DMC: ${dmcMatch ? '✅' : '❌'}`);
    log(`全部匹配: ${allMatch ? '✅✅✅' : '❌ 有差异，需要调试'}`);
  }

  process.exit(0);
}

function extractStats(text: string): Record<string, number> {
  const r: Record<string, number> = {};
  const lines = text.split('\n');
  for (const ln of lines) {
    const m = ln.match(/^\s+(SQ1|SQ2|TRI|NOISE|DMC|STAT):\s+(\d+)/);
    if (m) r[m[1]] = parseInt(m[2]);
  }
  return r;
}

main().catch(e => { console.error(e); process.exit(1); });
