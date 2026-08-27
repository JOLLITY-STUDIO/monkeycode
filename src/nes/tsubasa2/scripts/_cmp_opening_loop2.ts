/**
 * _cmp_opening_loop2.ts — 全量对比第一轮 vs 第二轮同一 GT 帧的 PPU buffer
 *
 * 上一版发现: 抽样 hash 全同, 但 f310 全黑、帧末 cnts 有差异 → 本版:
 *   1. 采样 tecmo logo 期 (f50/f150/f250) + NTV (f450) + 帘幕滚动 (f3730/f3790) + f4010
 *   2. 全量逐像素 diff (buffer/bgbuffer/pixrendered) 而非抽样 hash
 *   3. 对比帧末 cnt* 差异量
 */
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;

const SAMPLES = [50, 150, 250, 310, 450, 1010, 2010, 3010, 3730, 3790, 4010];

function rowRange(buf: Uint32Array): { minY: number; maxY: number } {
  let minY = -1;
  let maxY = -1;
  for (let y = 0; y < 240; y++) {
    const base = y * 256;
    let nz = false;
    for (let x = 0; x < 256; x++) if (buf[base + x] !== 0) { nz = true; break; }
    if (nz) { if (minY < 0) minY = y; maxY = y; }
  }
  return { minY, maxY };
}

function fullDiff(a: Uint32Array, b: Uint32Array): { n: number; firstIdx: number } {
  let n = 0;
  let firstIdx = -1;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      if (n === 0) firstIdx = i;
      n++;
    }
  }
  return { n, firstIdx };
}

// round1 采样: 第 k 次 frame() 渲染 nesFrame = k+9
const R1: Record<number, { buf: Uint32Array; bg: Uint32Array; pix: Uint32Array; cnts: string; regs: string }> = {};
// 需要跑到 round2 最大采样帧
const R2_K: number[] = SAMPLES.map((nf) => 4191 + (nf - 9));
const END = Math.max(...R2_K) + 5;

for (let k = 1; k <= END; k++) {
  runtime.frame(game);
  const nesFrame = k + 9;
  if (SAMPLES.includes(nesFrame) && !R1[nesFrame]) {
    R1[nesFrame] = {
      buf: new Uint32Array(ppu.buffer),
      bg: new Uint32Array(ppu.bgbuffer),
      pix: new Uint32Array(ppu.pixrendered),
      cnts: `${ppu.cntFV},${ppu.cntV},${ppu.cntH},${ppu.cntVT},${ppu.cntHT}`,
      regs: `${ppu.regFV},${ppu.regV},${ppu.regH},${ppu.regVT},${ppu.regHT},${ppu.regFH}`,
    };
  }
  const ri = R2_K.indexOf(k);
  if (ri >= 0) {
    const nf = SAMPLES[ri];
    const r1 = R1[nf];
    if (!r1) continue;
    const bufDiff = fullDiff(r1.buf, ppu.buffer);
    const bgDiff = fullDiff(r1.bg, ppu.bgbuffer);
    const pixDiff = fullDiff(r1.pix, ppu.pixrendered);
    const r1row = rowRange(r1.buf);
    const r2row = rowRange(ppu.buffer);
    console.log(
      `nesFrame=${nf} ` +
        `bufferDiff=${bufDiff.n} firstIdx=${bufDiff.firstIdx} ` +
        `bgDiff=${bgDiff.n} pixDiff=${pixDiff.n} ` +
        `r1rows=[${r1row.minY}..${r1row.maxY}] r2rows=[${r2row.minY}..${r2row.maxY}] ` +
        `r1cnts=[${r1.cnts}] r2cnts=[${ppu.cntFV},${ppu.cntV},${ppu.cntH},${ppu.cntVT},${ppu.cntHT}] ` +
        `r1regs=[${r1.regs}] r2regs=[${ppu.regFV},${ppu.regV},${ppu.regH},${ppu.regVT},${ppu.regHT},${ppu.regFH}]`,
    );
  }
}
