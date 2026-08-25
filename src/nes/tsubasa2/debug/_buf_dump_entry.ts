import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const outDir = path.resolve(__dirname, '..', 'output', 'h5-buf');
  fs.mkdirSync(outDir, { recursive: true });
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot();
  const inspectFrames = [180, 200, 240, 280, 300, 310, 320, 350, 400, 432, 460, 480, 540, 600, 660];
  const buffers: { frame: number; data: Buffer }[] = [];
  for (let f = 1; f <= 660; f++) {
    runtime.frame(game);
    if (inspectFrames.includes(f)) {
      const buf = (runtime.ppu as any).buffer as Uint32Array;
      // 用 little-endian uint8 表示 RGBA 字节
      const data = Buffer.alloc(buf.length * 4);
      for (let i = 0; i < buf.length; i++) {
        const v = buf[i] >>> 0;
        data[i * 4 + 0] = v & 0xff;
        data[i * 4 + 1] = (v >> 8) & 0xff;
        data[i * 4 + 2] = (v >> 16) & 0xff;
        data[i * 4 + 3] = (v >> 24) & 0xff;
      }
      fs.writeFileSync(path.join(outDir, `frame-${String(f).padStart(3, '0')}.bin`), data);
      buffers.push({ frame: f, data });
    }
  }
  // 比较连续帧
  console.log('=== buffer diff ===');
  for (let i = 1; i < buffers.length; i++) {
    const prev = buffers[i - 1].data;
    const cur = buffers[i].data;
    let diff = 0;
    for (let j = 0; j < cur.length; j++) if (cur[j] !== prev[j]) diff++;
    console.log(`f${buffers[i - 1].frame} → f${buffers[i].frame}: diff ${diff} bytes`);
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
