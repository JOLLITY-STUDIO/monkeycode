/**
 * 对比 H5 f790 (NES f800) buffer vs emu output/emu-full/frame-0800/screen.png
 * 1) 整体像素差 2) 行偏移匹配率 3) 各行主色带
 */
import { Tsubasa2 } from './src/game/index';
import { HeadlessRuntime } from './src/game/runtime/HeadlessRuntime';
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

function decodePng(buf: Buffer): { w: number; h: number; rgb: Buffer } {
  const ihdrOff = buf.indexOf('IHDR') + 4;
  const w = buf.readUInt32BE(ihdrOff);
  const h = buf.readUInt32BE(ihdrOff + 4);
  let idat = Buffer.alloc(0);
  let pos = 8;
  while (pos + 8 <= buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') idat = Buffer.concat([idat, buf.slice(pos + 8, pos + 8 + len)]);
    pos += 12 + len;
    if (type === 'IEND') break;
  }
  const raw = zlib.inflateSync(idat);
  const rowLen = w * 4 + 1;
  const rgb = Buffer.alloc(w * h * 3);
  for (let y = 0; y < h; y++) {
    const rowStart = y * rowLen + 1;
    for (let x = 0; x < w; x++) {
      const o = rowStart + x * 4;
      rgb[(y * w + x) * 3] = raw[o];
      rgb[(y * w + x) * 3 + 1] = raw[o + 1];
      rgb[(y * w + x) * 3 + 2] = raw[o + 2];
    }
  }
  return { w, h, rgb };
}

function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot(runtime);
  const TARGET_H5 = 790;
  for (let f = 0; f <= TARGET_H5; f++) runtime.frame(game);

  const ppu: any = runtime.ppu;
  const buf: Uint32Array = ppu.buffer;

  const emuPng = fs.readFileSync(path.join(__dirname, 'output', 'emu-full', 'frame-0800', 'screen.png'));
  const emu = decodePng(emuPng);
  console.log('emu size:', emu.w + 'x' + emu.h);

  const W = 256, H = 240;
  const out: string[] = [];

  // 1) 整体像素差
  let diff = 0, same = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const v = buf[y * W + x];
      const hr = (v >>> 16) & 0xff, hg = (v >>> 8) & 0xff, hb = v & 0xff;
      const e = emu.rgb[(y * emu.w + x) * 3];
      const eg = emu.rgb[(y * emu.w + x) * 3 + 1];
      const eb = emu.rgb[(y * emu.w + x) * 3 + 2];
      if (Math.abs(hr - e) + Math.abs(hg - eg) + Math.abs(hb - eb) > 12) diff++;
      else same++;
    }
  }
  out.push(`diff=${diff} same=${same} rate=${(same / (W * H) * 100).toFixed(2)}%`);

  // 2) 行偏移匹配率 (d = H5 行 - emu 行)
  out.push('--- row offset match ---');
  for (let d = -4; d <= 4; d++) {
    let match = 0, total = 0;
    for (let y = 0; y < H; y++) {
      const ey = y + d;
      if (ey < 0 || ey >= H) continue;
      for (let x = 0; x < W; x++) {
        const v = buf[y * W + x];
        const hr = (v >>> 16) & 0xff, hg = (v >>> 8) & 0xff, hb = v & 0xff;
        const eo = ((ey * emu.w + x) * 3);
        const er = emu.rgb[eo], eg = emu.rgb[eo + 1], eb = emu.rgb[eo + 2];
        if (Math.abs(hr - er) + Math.abs(hg - eg) + Math.abs(hb - eb) <= 12) match++;
        total++;
      }
    }
    out.push(`d=${d} match=${(match / total * 100).toFixed(2)}%`);
  }

  // 3) 行色带对比 (y 0-30)
  out.push('--- row bands (H5 vs emu) ---');
  for (let y = 0; y < 30; y++) {
    const hCounts = new Map<number, number>();
    const eCounts = new Map<number, number>();
    for (let x = 0; x < W; x++) {
      const v = buf[y * W + x];
      hCounts.set(v, (hCounts.get(v) || 0) + 1);
      const eo = (y * emu.w + x) * 3;
      const er = emu.rgb[eo], eg = emu.rgb[eo + 1], eb = emu.rgb[eo + 2];
      const ecol = (er << 16) | (eg << 8) | eb;
      eCounts.set(ecol, (eCounts.get(ecol) || 0) + 1);
    }
    const hTop = [...hCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
    const eTop = [...eCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
    out.push(
      `y=${y} H=` + hTop.map(([c, n]) => `#${(c >>> 0).toString(16).padStart(6, '0')}(${n})`).join(' ') +
      `  E=` + eTop.map(([c, n]) => `#${(c >>> 0).toString(16).padStart(6, '0')}(${n})`).join(' '),
    );
  }

  // 4) 黑像素 x 分布 (orange 行的左侧黑)
  out.push('--- H5 black x positions on row 20 ---');
  const blackXs: number[] = [];
  for (let x = 0; x < W; x++) if (buf[20 * W + x] === 0) blackXs.push(x);
  out.push('row20 blackXs=' + (blackXs.length ? blackXs.slice(0, 40).join(',') : 'none'));
  const eBlackXs: number[] = [];
  for (let x = 0; x < W; x++) {
    const eo = (20 * emu.w + x) * 3;
    if (emu.rgb[eo] === 0 && emu.rgb[eo + 1] === 0 && emu.rgb[eo + 2] === 0) eBlackXs.push(x);
  }
  out.push('emu row20 blackXs=' + (eBlackXs.length ? eBlackXs.slice(0, 40).join(',') : 'none'));

  fs.writeFileSync(path.join(__dirname, '_diag_compare800_out.txt'), out.join('\n'));
  console.log('written lines=' + out.length);
}

main();
