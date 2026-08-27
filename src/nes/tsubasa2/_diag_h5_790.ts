/**
 * 诊断入口：跑 H5 到 NES f800 (= H5 f790)，dump PPU buffer/bgbuffer/pixrendered 状态
 */
import { Tsubasa2 } from './src/game/index';
import { HeadlessRuntime } from './src/game/runtime/HeadlessRuntime';
import * as fs from 'fs';
import * as path from 'path';

function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot(runtime);

  const TARGET_H5 = 790; // NES f800
  for (let f = 0; f <= TARGET_H5; f++) {
    runtime.frame(game);
  }
  const ppu: any = runtime.ppu;
  const buf: Uint32Array = ppu.buffer;
  const bgbuf: Uint32Array = ppu.bgbuffer;
  const pixr: Uint32Array = ppu.pixrendered;

  const out: string[] = [];
  out.push('scanline=' + ppu.scanline + ' lastRendered=' + ppu.lastRenderedScanline + ' curX=' + ppu.curX);
  out.push('buffer len=' + buf.length + ' bgbuffer len=' + (bgbuf ? bgbuf.length : 'N/A') + ' pixrendered len=' + (pixr ? pixr.length : 'N/A'));

  let bufNz = 0, bgbufNz = 0, pixrSet = 0;
  for (let i = 0; i < buf.length; i++) { if (buf[i] !== 0) bufNz++; }
  if (bgbuf) for (let i = 0; i < bgbuf.length; i++) { if (bgbuf[i] !== 0) bgbufNz++; }
  if (pixr) for (let i = 0; i < pixr.length; i++) { if (pixr[i] > 0xff) pixrSet++; }
  out.push('bufNz=' + bufNz + ' bgbufNz=' + bgbufNz + ' pixrSet=' + pixrSet);

  // bgbuffer 行色带（前 30 行）
  out.push('--- bgbuffer rows 0-30 ---');
  if (bgbuf) {
    for (let y = 0; y < 30; y++) {
      const counts = new Map<number, number>();
      let op = 0;
      for (let x = 0; x < 256; x++) {
        const v = bgbuf[y * 256 + x];
        if (v !== 0) op++;
        counts.set(v, (counts.get(v) || 0) + 1);
      }
      const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
      out.push(`bg y=${y} op=${op} colors=` + top.map(([c, n]) => `#${(c >>> 0).toString(16).padStart(6, '0')}(${n})`).join(' '));
    }
  }

  // buffer 行色带（前 30 行）
  out.push('--- buffer rows 0-30 ---');
  for (let y = 0; y < 30; y++) {
    const counts = new Map<number, number>();
    let op = 0;
    for (let x = 0; x < 256; x++) {
      const v = buf[y * 256 + x];
      if (v !== 0) op++;
      counts.set(v, (counts.get(v) || 0) + 1);
    }
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
    out.push(`buf y=${y} op=${op} colors=` + top.map(([c, n]) => `#${(c >>> 0).toString(16).padStart(6, '0')}(${n})`).join(' '));
  }

  // f_bgVisibility / f_spVisibility
  out.push('bgVis=' + ppu.f_bgVisibility + ' spVis=' + ppu.f_spVisibility + ' regS=' + ppu.regS);
  out.push('--- done ---');
  fs.writeFileSync(path.join(__dirname, '_diag_h5_790_out.txt'), out.join('\n'));
  console.log('written lines=' + out.length);
}

main();
