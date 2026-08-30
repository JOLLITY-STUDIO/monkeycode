const fs = require('fs');
const zlib = require('zlib');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

function log(...args) {
  process.stdout.write(args.map(String).join(' ') + '\n');
}
log('script start');

function readPng(file) {
  const buf = fs.readFileSync(file);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  const bpp = buf[24];
  const type = buf[25];
  let pos = 33;
  const chunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos); pos += 4;
    const ctype = buf.slice(pos, pos + 4).toString('ascii'); pos += 4;
    const data = buf.slice(pos, pos + len); pos += len;
    pos += 4; // crc
    if (ctype === 'IDAT') chunks.push(data);
  }
  const raw = zlib.inflateSync(Buffer.concat(chunks));
  const out = new Uint32Array(w * h);
  let p = 0;
  for (let y = 0; y < h; y++) {
    p++; // filter byte
    for (let x = 0; x < w; x++) {
      if (type === 2 && bpp === 8) {
        const r = raw[p++], g = raw[p++], b = raw[p++];
        out[y * w + x] = (r << 16) | (g << 8) | b;
      } else if (type === 6 && bpp === 8) {
        const r = raw[p++], g = raw[p++], b = raw[p++], a = raw[p++];
        if (a < 128) out[y * w + x] = 0;
        else out[y * w + x] = (r << 16) | (g << 8) | b;
      } else {
        throw new Error('unsupported PNG type=' + type + ' bpp=' + bpp);
      }
    }
  }
  return { w, h, pixels: out };
}

function writePng(buf, w, h, file) {
  const raw = Buffer.alloc(h * (1 + w * 3));
  let p = 0;
  for (let y = 0; y < h; y++) {
    raw[p++] = 0;
    for (let x = 0; x < w; x++) {
      const v = buf[y * w + x];
      raw[p++] = (v >> 16) & 0xff;
      raw[p++] = (v >> 8) & 0xff;
      raw[p++] = v & 0xff;
    }
  }
  const idat = zlib.deflateSync(raw);
  const crc32 = (buf) => {
    let table = crc32.table;
    if (!table) {
      table = crc32.table = new Int32Array(256);
      for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        table[n] = c;
      }
    }
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td) >>> 0);
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))
  ]);
  fs.writeFileSync(file, png);
}

function compare(h5File, emuFile, diffFile) {
  const h5 = readPng(h5File);
  const emu = readPng(emuFile);
  const diff = new Uint32Array(256 * 240);
  let diffs = 0;
  for (let i = 0; i < 256 * 240; i++) {
    if (h5.pixels[i] !== emu.pixels[i]) {
      diff[i] = 0xff0000;
      diffs++;
    }
  }
  writePng(diff, 256, 240, diffFile);
  return diffs;
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

const targets = [710, 860];
for (let h5 = 0; h5 <= 860 - 10 + 1; h5++) {
  game.frame(runtime);
  const nes = h5 + 10;
  if (targets.includes(nes)) {
    const h5File = `_h5_new_frame-${nes}.png`;
    writePng(runtime.ppu.buffer, 256, 240, h5File);
    const emuFile = `output/emu-full/frame-${String(nes).padStart(4, '0')}/screen.png`;
    const diffFile = `_diff_new_${nes}.png`;
    const diffs = compare(h5File, emuFile, diffFile);
    log(`frame ${nes}: diffs=${diffs} (${(diffs / (256 * 240) * 100).toFixed(2)}%)`);
  }
}
log('done');
