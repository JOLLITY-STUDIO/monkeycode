/**
 * 抓取 Bank12 期望的 RAM 状态快照
 * 先跑 7-bank 版（Bank 3/7 STUB），在 Bank12 首次执行时 dump CPU RAM $0000-$07FF
 * 用法: npx tsx mini-audio/dump-ram.ts [帧数=300]
 */
import * as fs from 'fs';
import * as path from 'path';
import { NesAudio } from './emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM } from './rom-data/index';

const FRAMES = parseInt(process.argv[2]) || 300;
const OUT = path.join(__dirname, 'ram-snapshot.ts');

async function main() {
  const nes = new NesAudio();
  nes.loadROMArrays(new Uint8Array(NES_PRG_ROM), new Uint8Array(NES_CHR_ROM));

  const cpu = nes.cpu as any;
  const mmap = nes.mmap as any;

  let ramSnapshot: number[] | null = null;
  let snapshotFrame = -1;
  let snapshotPC = -1;
  const bank12Reads = new Set<number>();
  const bank12Writes = new Set<number>();
  let inBank12 = false;

  // 跟踪 Bank12 是否映射在 $8000
  let bank12At8000 = false;
  const origLoad8k = mmap._load8kBank.bind(mmap);
  mmap._load8kBank = function (bank8k: number, addr: number) {
    if (addr === 0x8000) bank12At8000 = (bank8k === 12);
    return origLoad8k(bank8k, addr);
  };

  // Hook cpu.emulate() 在每条指令前检测是否进入 Bank12
  const origEmulate = cpu.emulate.bind(cpu);
  cpu.emulate = function () {
    const pc = cpu.REG_PC & 0xFFFF;

    // 检测是否进入 Bank12 代码区
    const isB12Code = bank12At8000 && pc >= 0x8000 && pc < 0xA000;
    if (isB12Code && !inBank12 && !ramSnapshot) {
      // 首次进入 Bank12，做快照
      ramSnapshot = Array.from(cpu.mem.slice(0, 0x800)); // $0000-$07FF
      snapshotFrame = nes.frameCount;
      snapshotPC = pc;
      console.log(`[SNAPSHOT] Bank12 first enter: frame=${snapshotFrame}, PC=$${pc.toString(16).toUpperCase().padStart(4, '0')}`);
    }
    inBank12 = isB12Code;

    return origEmulate();
  };

  // Hook CPU load/write 跟踪 Bank12 的 RAM 访问
  const origLoad = cpu.load.bind(cpu);
  cpu.load = function (addr: number) {
    const a = addr & 0xFFFF;
    if (bank12At8000 && a < 0x800) {
      const pc = cpu.REG_PC & 0xFFFF;
      if (pc >= 0x8000 && pc < 0xA000) bank12Reads.add(a);
    }
    return origLoad(addr);
  };

  const origWrite = cpu.write.bind(cpu);
  cpu.write = function (addr: number, val: number) {
    const a = addr & 0xFFFF;
    if (bank12At8000 && a < 0x800) {
      const pc = cpu.REG_PC & 0xFFFF;
      if (pc >= 0x8000 && pc < 0xA000) bank12Writes.add(a);
    }
    return origWrite(addr, val);
  };

  // 跑帧，快照到手后尽早退出
  console.log(`Running up to ${FRAMES} frames...`);
  for (let f = 0; f < FRAMES; f++) {
    try {
      nes.frame();
    } catch (e: any) {
      console.log(`F${f} CRASH: ${e.message}`);
      break;
    }
    if (ramSnapshot && f > snapshotFrame + 10) break; // 再跑 10 帧收集足够数据
    if (f % 100 === 0) console.log(`  F${f}/${FRAMES}`);
  }

  if (!ramSnapshot) {
    console.log('ERROR: Bank12 never executed!');
    process.exit(1);
  }

  // 生成输出
  const nonZero: Record<number, number> = {};
  for (let i = 0; i < ramSnapshot.length; i++) {
    if (ramSnapshot[i] !== 0) nonZero[i] = ramSnapshot[i];
  }

  const lines: string[] = [];
  lines.push(`// Auto-generated RAM snapshot for Bank12 audio init`);
  lines.push(`// Generated from 7-bank trace (Bank 3/7 STUB), captured at frame ${snapshotFrame}, PC=$${snapshotPC.toString(16).toUpperCase().padStart(4, '0')}`);
  lines.push(``);
  lines.push(`/** Total non-zero RAM bytes: ${Object.keys(nonZero).length} / ${ramSnapshot.length} */`);
  lines.push(`export const BANK12_INIT_RAM: Record<number, number> = {`);

  // 分组输出，每行 8 个
  const addrs = Object.keys(nonZero).map(Number).sort((a, b) => a - b);
  for (const addr of addrs) {
    lines.push(`  0x${addr.toString(16).toUpperCase().padStart(3, '0')}: 0x${nonZero[addr].toString(16).toUpperCase().padStart(2, '0')},`);
  }
  lines.push(`};`);
  lines.push(``);
  lines.push(`// Bank12 reads these RAM addresses:`);
  const readArr = [...bank12Reads].sort((a, b) => a - b);
  lines.push(`export const BANK12_READ_ADDRS = new Set<number>(${JSON.stringify(readArr)});`);
  lines.push(``);
  lines.push(`// Bank12 writes these RAM addresses:`);
  const writeArr = [...bank12Writes].sort((a, b) => a - b);
  lines.push(`export const BANK12_WRITE_ADDRS = new Set<number>(${JSON.stringify(writeArr)});`);

  fs.writeFileSync(OUT, lines.join('\n'), 'utf-8');
  console.log(`\nWritten: ${OUT}`);
  console.log(`Non-zero bytes: ${Object.keys(nonZero).length}`);
  console.log(`Bank12 reads:  ${bank12Reads.size} addrs`);
  console.log(`Bank12 writes: ${bank12Writes.size} addrs`);

  // 打印 Bank12 读写地址范围
  if (readArr.length > 0) {
    console.log(`\nReads range:  $${readArr[0].toString(16).padStart(3, '0')} - $${readArr[readArr.length - 1].toString(16).padStart(3, '0')}`);
  }
  if (writeArr.length > 0) {
    console.log(`Writes range: $${writeArr[0].toString(16).padStart(3, '0')} - $${writeArr[writeArr.length - 1].toString(16).padStart(3, '0')}`);
  }

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
