/**
 * 追踪 bank 0/2 对 bank 3/7 的数据引用
 * bank 3/7 通过 MMC3 映射到 $8000-$BFFF，watch 这些窗口的读取
 */
import { NesAudio } from './emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM } from './rom-data/index';

const BANK_8K = 8192;
const FRAMES = 300;

// bank 3 = PRG bank 3 (index into total 32-bank array)
// MMC3: banks 3 and 7 are "switchable" banks that get mapped into $8000/$A000 windows
const TARGET_BANKS = new Set([3, 7]);

interface RefRecord {
  callerPC: number;     // 调用者 PC（在哪个 bank 执行）
  callerBank: number;   // 调用者所在逻辑 bank
  memAddr: number;      // 访问的内存地址 ($8000-$BFFF)
  targetBank: number;   // 被访问的 ROM bank（3 或 7）
  offset: number;       // 在目标 bank 中的偏移
  val: number;          // 读到的值
}

const refs: RefRecord[] = [];
const callerPcSet = new Set<number>(); // unique caller PCs

function toLogicalBank(raw: number): number {
  return raw >= 62 ? raw - 32 : raw; // 62→30, 63→31
}

function romRead(addr: number): number {
  const absAddr = 0x8000 + (addr & 0x1FFF);
  return NES_PRG_ROM[absAddr];
}

const nes = new NesAudio();

// HookMapper: watch prgBankMap changes
const mmap = (nes as any).mmap;
let currentBankMap: Record<number, number> = { ...mmap.prgBankMap };

// Hook CPU executes every instruction — capture ROM reads from bank window
const cpuObj = nes.cpu as any;
const origStep = cpuObj._step || cpuObj.step || cpuObj.executeOne;

// 更简单的方法：Hook NES ROM 读取
const origReadPRG = nes.rom.read.bind(nes.rom);
const origReadByte = (nes as any).readMem ? (nes as any).readMem.bind(nes) : (addr: number) => romRead(addr);

// 创建一个全局 hook，在整个 frame 中监控
let inFrame = false;
let currentPC = 0;

// 用最暴力的方法：直接替换 mmap.read 或类似
console.log('=== 探索读取路径 ===');
console.log('mmap type:', typeof mmap);
console.log('mmap keys:', Object.keys(mmap));
for (const k of Object.keys(mmap)) {
  const v = mmap[k];
  if (typeof v === 'function') console.log(`  mmap.${k}() - function`);
}

// 看 nes.cpu 结构
const cpuAny = nes.cpu as any;
console.log('cpu type:', typeof nes.cpu);
console.log('cpu keys:', Object.keys(nes.cpu));
for (const k of Object.keys(nes.cpu)) {
  const v = cpuAny[k];
  if (typeof v === 'function') console.log(`  cpu.${k}() - function`);
  if (k === 'REG_PC' || k === 'PC' || k === '_pc') console.log(`  cpu.${k} =`, v);
}

// 看有没有直接的内存读取方法
if (typeof cpuAny.readMem === 'function') console.log('  cpu.readMem() - Found!');
if (typeof cpuAny.read === 'function') console.log('  cpu.read() - Found!');
if (typeof cpuAny.Read === 'function') console.log('  cpu.Read() - Found!');
if (typeof cpuAny._read === 'function') console.log('  cpu._read() - Found!');

// 看 readMem 如果存在
if (typeof (nes as any).readMem === 'function') console.log('  nes.readMem() - Found!');
