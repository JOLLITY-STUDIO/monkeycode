import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot();
  const bufs = new Map<number, Uint32Array>();
  const targets = [296, 297, 298, 299, 300, 301, 302, 303];
  for (let f = 1; f <= 350; f++) {
    runtime.frame(game);
    if (targets.includes(f)) {
      bufs.set(f, new Uint32Array((runtime.ppu as any).buffer));
    }
  }
  // 比对 frame 296 → 297 → 298 → 299 → 300 → 301 → 302 → 303
  const sorted = [...bufs.entries()].sort((a, b) => a[0] - b[0]);
  console.log('=== diff positions f300 vs f301 ===');
  const a = sorted.find(([f]) => f === 300)![1];
  const b = sorted.find(([f]) => f === 301)![1];
  let changes: { x: number; y: number; from: number; to: number }[] = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      const x = i % 256;
      const y = (i / 256) | 0;
      changes.push({ x, y, from: a[i], to: b[i] });
    }
  }
  // 按 y,x 排序
  changes.sort((p, q) => p.y - q.y || p.x - q.x);
  console.log(`total ${changes.length} pixel changes`);
  // 抽 8 行来看每行的变化范围
  const yMap = new Map<number, { count: number; minX: number; maxX: number; example: any }>();
  for (const c of changes) {
    const e = yMap.get(c.y);
    if (!e) yMap.set(c.y, { count: 1, minX: c.x, maxX: c.x, example: c });
    else {
      e.count++;
      e.minX = Math.min(e.minX, c.x);
      e.maxX = Math.max(e.maxX, c.x);
    }
  }
  const arr = [...yMap.entries()].sort((a, b) => a[0] - b[0]);
  for (const [y, info] of arr) {
    console.log(`  y=${y}: ${info.count}px x=[${info.minX}..${info.maxX}] example from=${info.example.from.toString(16)} to=${info.example.to.toString(16)}`);
  }
  console.log('=== sample 16 first changes ===');
  for (const c of changes.slice(0, 16)) {
    console.log(`  (${c.x},${c.y}) ${c.from.toString(16)} → ${c.to.toString(16)}`);
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
