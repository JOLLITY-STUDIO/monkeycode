/**
 * _cmp_opening_loop.ts — 验证 Opening 循环重播是否有跨轮状态累积
 *
 * 对比第一轮 vs 第二轮同一 GT 帧(f310/f1010/f2010/f3010/f4010)的 PPU buffer:
 *   - 非零像素垂直范围(minY/maxY/height)   → "少 px" 是否随轮次变化
 *   - 整帧抽样 hash                          → 两轮渲染是否逐字节一致
 *   - regs / cnts / renderStartOverride 状态  → 定位累积点
 *
 * 帧序: 第 k 次 frame() 渲染 f(k+9);第 4191 次触发 resetForLoop(黑屏);
 *       第 4192 次起为第二轮(f10 起)。
 */
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;

function snap(k: number): Record<string, unknown> {
  const buf = ppu.buffer as Uint32Array;
  let minY = -1;
  let maxY = -1;
  for (let y = 0; y < 240; y++) {
    let rowNz = false;
    const base = y * 256;
    for (let x = 0; x < 256; x++) {
      if (buf[base + x] !== 0) { rowNz = true; break; }
    }
    if (rowNz) { if (minY < 0) minY = y; maxY = y; }
  }
  let h = 0x811c9dc5;
  for (let i = 0; i < buf.length; i += 64) {
    h ^= buf[i] >>> 0;
    h = Math.imul(h, 0x01000193);
  }
  h >>>= 0;
  return {
    frame: k,
    minY, maxY,
    height: maxY >= 0 ? maxY - minY + 1 : 0,
    hash: h.toString(16),
    regs: { fv: ppu.regFV, v: ppu.regV, h: ppu.regH, vt: ppu.regVT, ht: ppu.regHT, fh: ppu.regFH },
    cnts: { fv: ppu.cntFV, v: ppu.cntV, h: ppu.cntH, vt: ppu.cntVT, ht: ppu.cntHT },
    override: ppu.renderStartOverride ? { ...ppu.renderStartOverride } : null,
    scOverrides: ppu.scrollScanOverrides ? ppu.scrollScanOverrides.length : 0,
  };
}

const R1 = [310, 1010, 2010, 3010, 4010];           // 第一轮渲染的 NES 帧
const R2 = R1.map((nf) => 4191 + (nf - 9));           // 第二轮渲染同一 NES 帧时的调用序号
const out: Record<string, unknown>[] = [];

const END = Math.max(...R2) + 5;
for (let k = 1; k <= END; k++) {
  runtime.frame(game);
  if (R1.includes(k + 9)) out.push({ round: 1, nesFrame: k + 9, ...snap(k) });
  const ri = R2.indexOf(k);
  if (ri >= 0) out.push({ round: 2, nesFrame: R1[ri], ...snap(k) });
  if (k === 4191) out.push({ round: 'reset', nesFrame: '(loop trigger)', ...snap(k) });
}

for (const o of out) {
  const r = o.round as string;
  const nf = o.nesFrame as string;
  console.log(
    `round=${r} nesFrame=${nf} height=${o.height} minY=${o.minY} maxY=${o.maxY} ` +
    `hash=${o.hash} regs=${JSON.stringify(o.regs)} cnts=${JSON.stringify(o.cnts)} ` +
    `ov=${JSON.stringify(o.override)} sc=${o.scOverrides}`,
  );
}

// 逐帧 hash 对比
for (let i = 0; i < R1.length; i++) {
  const a = out.find((o) => o.round === 1 && o.nesFrame === R1[i]);
  const b = out.find((o) => o.round === 2 && o.nesFrame === R1[i]);
  const same = a && b && a.hash === b.hash && a.height === b.height;
  console.log(`COMPARE nesFrame=${R1[i]} r1hash=${a?.hash} r2hash=${b?.hash} same=${same}`);
}
