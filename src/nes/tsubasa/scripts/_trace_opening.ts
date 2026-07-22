/**
 * trace opening demo — 统计 CPU 访问过的地址分布
 * 用法: npx tsx _trace_opening.ts
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import NES from './src/tsnes/src/nes';

const ROM_PATH = 'rom.nes';
const MAX_FRAMES = 240;
const DUMP_EVERY_N = 0; // 0 = 只在结束时 dump

if (!existsSync('test_output')) mkdirSync('test_output');

const romData = new Uint8Array(readFileSync(ROM_PATH));
console.log(`ROM loaded: ${romData.length} bytes`);

const visited = new Map<number, number>(); // pc → hit count
let totalInstr = 0;

const nes = new NES({
  onFrame: () => {},
  onStatusUpdate: () => {},
  emulateSound: false,
});

nes.loadROM(romData);

nes.cpu._traceCb = (pc: number) => {
  totalInstr++;
  visited.set(pc, (visited.get(pc) || 0) + 1);
};

console.log(`Mapper: ${nes.rom.mapperType}`);
console.log(`\nRunning ${MAX_FRAMES} frames of opening demo...`);

const t0 = Date.now();
for (let f = 0; f < MAX_FRAMES; f++) {
  nes.frame();
  if (f % 60 === 0 || f === MAX_FRAMES - 1) {
    const fps = f > 0 ? (f / ((Date.now() - t0) / 1000)).toFixed(0) : '';
    console.log(`  frame ${f}/${MAX_FRAMES}  |  ${totalInstr} instr, ${visited.size} unique PCs  ${fps ? fps + ' fps' : ''}`);
  }
}
const elapsed = Date.now() - t0;

// 按 bank 分组统计
const banks: Record<string, { count: number; hits: number; topPcs: [string, number][] }> = {};
visited.forEach((hits, pc) => {
  const bank = pc < 0x8000 ? 'RAM' :
    pc < 0xA000 ? '8000-9FFF' :
    pc < 0xC000 ? 'A000-BFFF' :
    pc < 0xE000 ? 'C000-DFFF' : 'E000-FFFF';
  if (!banks[bank]) banks[bank] = { count: 0, hits: 0, topPcs: [] };
  banks[bank].count++;
  banks[bank].hits += hits;
  banks[bank].topPcs.push([`$${pc.toString(16).toUpperCase().padStart(4, '0')}`, hits]);
});

// 每个 bank 取 TOP 20 地址
Object.values(banks).forEach(b => {
  b.topPcs.sort((a, b) => b[1] - a[1]);
  b.topPcs = b.topPcs.slice(0, 20);
});

// 输出
const summary = {
  note: 'Tsubasa opening demo — unique CPU addresses visited',
  maxFrames: MAX_FRAMES,
  totalInstructions: totalInstr,
  uniquePCs: visited.size,
  elapsedMs: elapsed,
  fpsAvg: (MAX_FRAMES / (elapsed / 1000)).toFixed(1),
  banks,
};

const outPath = 'test_output/opening_addrs.json';
writeFileSync(outPath, JSON.stringify(summary, null, 2));

console.log(`\n=== Opening Demo Trace Summary ===`);
console.log(`Total instructions: ${totalInstr.toLocaleString()}`);
console.log(`Unique PC addresses: ${visited.size.toLocaleString()}`);
console.log(`Elapsed: ${elapsed}ms`);
console.log(`\nBank distribution:`);
Object.entries(banks).forEach(([name, b]) => {
  console.log(`  ${name}: ${b.hits.toLocaleString()} hits, ${b.count} unique PCs`);
  b.topPcs.slice(0, 5).forEach(([pc, h]) => {
    console.log(`    ${pc}: ${h.toLocaleString()}`);
  });
});
console.log(`\nSaved to ${outPath}`);
