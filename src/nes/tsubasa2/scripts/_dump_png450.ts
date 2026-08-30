/**
 * _dump_png450.ts — 生成 H5 f450 PNG 供视觉对比
 */
import * as fs from 'fs';
import * as path from 'path';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

function writePng(file: string, w: number, h: number, rgba: Buffer) {
  const zlib = require('zlib');
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0;
    rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idat = zlib.deflateSync(raw);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const chunk = (type: string, data: Buffer) => {
    const t = Buffer.from(type, 'ascii');
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const crc = Buffer.alloc(4);
    const c = require('zlib').crc32 || null;
    let crcVal = 0;
    if (c) crcVal = c(Buffer.concat([t, data]));
    else {
      // simple crc32
      let table: number[] = [];
      for (let n = 0; n < 256; n++) {
        let x = n;
        for (let k = 0; k < 8; k++) x = x & 1 ? 0xedb88320 ^ (x >>> 1) : x >>> 1;
        table[n] = x >>> 0;
      }
      let crcv = 0xffffffff;
      const buf = Buffer.concat([t, data]);
      for (let i = 0; i < buf.length; i++) crcv = table[(crcv ^ buf[i]) & 0xff] ^ (crcv >>> 8);
      crcVal = (crcv ^ 0xffffffff) >>> 0;
    }
    crc.writeUInt32BE(crcVal);
    return Buffer.concat([len, t, data, crc]);
  };
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  fs.writeFileSync(file, png);
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;
for (let k = 1; k <= 440; k++) runtime.frame(game);

const buf = Buffer.alloc(256 * 240 * 4);
for (let i = 0; i < 256 * 240; i++) {
  const v = ppu.buffer[i] >>> 0;
  buf[i * 4] = (v >>> 16) & 0xff;
  buf[i * 4 + 1] = (v >>> 8) & 0xff;
  buf[i * 4 + 2] = v & 0xff;
  buf[i * 4 + 3] = 0xff;
}
writePng(path.join(__dirname, '..', '_h5_f450.png'), 256, 240, buf);
console.log('H5 f450 png written');
