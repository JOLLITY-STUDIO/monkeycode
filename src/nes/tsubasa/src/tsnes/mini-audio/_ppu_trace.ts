/**
 * PPU 代码路径追踪 + 清理 v3
 * 追踪：指令执行 + ROM 数据读取（通过 mapper.load 捕获数据表引用）
 * 清理策略：只清除既未执行、也未读取的字节
 * 
 * 用法: npx tsx mini-audio/_ppu_trace.ts [帧数,默认600]
 */

import * as fs from 'fs';
import * as path from 'path';
import { NesAudio } from './emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM, AUDIO_BANK_IDS } from './rom-data/index';

const FRAMES = parseInt(process.argv[2]) || 600;
const BANK_SIZE = 8192;

/**
 * 将 MMC3 prgBankMap 中的 bank 索引映射为逻辑 bank 号
 * rom-audio 把 PRG 切成 32 个 8KB bank (0-31)
 * MMC3 loadROM 映射: bank 62→bank30, bank 63→bank31
 */
function toLogicalBank(mmc3Bank: number): number {
  if (mmc3Bank >= 62) return mmc3Bank - 32; // 62→30, 63→31
  return mmc3Bank; // 0→0, 1→1, etc.
}

function bankIdFromAddr(addr: number, prgBankMap: Record<number, number>): { bank: number; offset: number } | null {
  const slotAddr = addr & 0xE000;
  const rawBank = prgBankMap[slotAddr];
  if (rawBank === undefined) return null;
  const bank = toLogicalBank(rawBank);
  const offset = addr - slotAddr;
  return { bank, offset };
}

async function main() {
  console.log(`PPU Trace v3 — ${FRAMES} frames\n`);

  const nes = new NesAudio();
  nes.loadROMArrays(new Uint8Array(NES_PRG_ROM), new Uint8Array(NES_CHR_ROM));
  console.log(`ROM loaded: ${AUDIO_BANK_IDS.join(',')}`);

  const cpu = nes.cpu as any;
  const mapper = nes.mmap as any;

  // 记录代码执行
  const execSet: Map<number, Set<number>> = new Map(); // bankId -> Set<offset>
  // 记录数据读取  
  const readSet: Map<number, Set<number>> = new Map(); // bankId -> Set<offset>
  // 既执行又读取或仅其中之一
  const usedSet: Map<number, Set<number>> = new Map();

  // Hook 1: CPU 指令执行
  const origEmulate = cpu.emulate.bind(cpu);
  cpu.emulate = function () {
    const pc = this.REG_PC;
    const bi = bankIdFromAddr(pc, mapper.prgBankMap);
    if (bi) {
      if (!execSet.has(bi.bank)) execSet.set(bi.bank, new Set());
      execSet.get(bi.bank)!.add(bi.offset);
    }
    return origEmulate();
  };

  // Hook 2: ROM 数据读取 (mapper.load 捕获所有 >= $8000 的读取)
  const origMapperLoad = mapper.load.bind(mapper);
  mapper.load = function (address: number) {
    const a = address & 0xffff;
    if (a >= 0x8000) {
      const bi = bankIdFromAddr(a, mapper.prgBankMap);
      if (bi) {
        if (!readSet.has(bi.bank)) readSet.set(bi.bank, new Set());
        readSet.get(bi.bank)!.add(bi.offset);
      }
    }
    return origMapperLoad(address);
  };

  // APU 写入计数钩子
  const papu = nes.papu as any;
  const origPapuWrite = papu.writeReg.bind(papu);
  let apuCount = 0;
  papu.writeReg = function (addr: number, val: number) {
    if (addr >= 0x4000 && addr <= 0x4017) apuCount++;
    return origPapuWrite(addr, val);
  };

  // 运行
  console.log('Running...');
  const t0 = Date.now();
  for (let f = 0; f < FRAMES; f++) {
    try {
      nes.frame();
      if (f % 100 === 0) console.log(`  F${f}/${FRAMES} ... APU=${apuCount}`);
    } catch (e: any) {
      console.log(`F${f} CRASH: ${e.message}`);
      break;
    }
  }
  console.log(`Done in ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);

  // 合并执行+读取
  const targetBanks = [0, 1, 2, 3, 7, 30, 31];
  for (const bk of targetBanks) {
    const e = execSet.get(bk) ?? new Set();
    const r = readSet.get(bk) ?? new Set();
    const u = new Set<number>();
    for (const v of e) u.add(v);
    for (const v of r) u.add(v);
    usedSet.set(bk, u);
  }

  console.log('='.repeat(80));
  console.log(`${'Bank'.padEnd(6)} ${'执行(B)'.padEnd(9)} ${'读取(B)'.padEnd(9)} ${'合并(B)'.padEnd(9)} ${'合并率'.padEnd(8)} ${'可清理(B)'.padEnd(9)} ${'清理率'.padEnd(8)}`);
  console.log('-'.repeat(70));

  for (const bk of targetBanks) {
    const e = execSet.get(bk)?.size ?? 0;
    const r = readSet.get(bk)?.size ?? 0;
    const u = usedSet.get(bk)?.size ?? 0;
    const rate = (u / BANK_SIZE * 100).toFixed(1) + '%';
    const rem = BANK_SIZE - u;
    const remRate = (rem / BANK_SIZE * 100).toFixed(1) + '%';
    console.log(`Bank${bk} ${String(e).padEnd(8)} ${String(r).padEnd(8)} ${String(u).padEnd(8)} ${rate.padEnd(7)} ${String(rem).padEnd(8)} ${remRate.padEnd(7)}`);
  }

  // 生成清理版
  console.log('\n' + '='.repeat(70));
  console.log('生成清理版 bank 文件（仅去除无用字节）...');

  for (const bk of targetBanks) {
    const u = usedSet.get(bk);
    if (!u || u.size === 0) {
      console.log(`  Bank ${bk}: 完全未使用 → stub`);
      continue;
    }

    const bankOffset = bk * BANK_SIZE;
    const cleaned: number[] = [];
    for (let off = 0; off < BANK_SIZE; off++) {
      if (u.has(off)) {
        cleaned.push(NES_PRG_ROM[bankOffset + off]);
      } else {
        cleaned.push(0xFF);
      }
    }

    const outPath = path.join(__dirname, 'rom-data', `prg-bank-${String(bk).padStart(2, '0')}-clean.ts`);
    const lines: string[] = [];
    lines.push(`/**`);
    lines.push(` * Bank ${bk} - 清理版（未使用数据已清除）`);
    lines.push(` * 保留: ${u.size}B (${(u.size/BANK_SIZE*100).toFixed(1)}%) | 清除: ${BANK_SIZE-u.size}B`);
    lines.push(` */`);
    lines.push('');
    lines.push(`const PRG_BANK_${String(bk).padStart(2, '0')}_CLEAN: readonly number[] = [`);

    for (let i = 0; i < cleaned.length; i += 16) {
      const row = cleaned.slice(i, i + 16).map(v => '0x' + v.toString(16).padStart(2, '0')).join(', ');
      lines.push(`  ${row},`);
    }

    lines.push('];');
    lines.push('');
    lines.push(`export default PRG_BANK_${String(bk).padStart(2, '0')}_CLEAN;`);
    lines.push('');

    fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
    console.log(`  Bank ${bk}: 保留${u.size}B → prg-bank-${String(bk).padStart(2, '0')}-clean.ts`);
  }

  console.log('\n✅ 清理完成。运行 _verify_clean.ts 验证。');
}

main().catch(e => { console.error(e); process.exit(1); });
