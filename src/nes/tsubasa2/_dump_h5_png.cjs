// H5 渲染帧 dump PNG（256x240, buffer 0x00RRGGBB）
const fs = require('fs');
const zlib = require('zlib');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

function writePng(buf, w, h, file) {
  // buf: Uint32Array 0x00RRGGBB
  const raw = Buffer.alloc(h * (1 + w * 3));
  let p = 0;
  for (let y = 0; y < h; y++) {
    raw[p++] = 0; // filter none
    for (let x = 0; x < w; x++) {
      const v = buf[y * w + x];
      raw[p++] = (v >> 16) & 0xff;
      raw[p++] = (v >> 8) & 0xff;
      raw[p++] = v & 0xff;
    }
  }
  const idat = zlib.deflateSync(raw);
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(td) >>> 0);
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  fs.writeFileSync(file, png);
}

function crc32(buf) {
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
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

const TARGETS = [710, 760, 800, 810, 860]; // NES 帧
const END = 860 - 10 + 1;
for (let h5 = 0; h5 <= END; h5++) {
  game.frame(runtime);
  const nes = h5 + 10;
  if (TARGETS.includes(nes)) {
    writePng(runtime.ppu.buffer, 256, 240, '_h5_frame-' + nes + '.png');
    // dump NT/PPU state for diagnosis
    const ppu = runtime.ppu;
    const ntStats = [];
    for (let i = 0; i < 4; i++) {
      let nz = 0;
      const t = ppu.nameTable[i].tile;
      for (let j = 0; j < 960; j++) if (t[j] !== 0) nz++;
      ntStats.push(nz);
    }
    console.log('frame', nes, 'ntNZ', ntStats, 'scroll', {
      regV: ppu.regV, regH: ppu.regH, regVT: ppu.regVT, regHT: ppu.regHT,
      regFV: ppu.regFV, regFH: ppu.regFH,
      cntV: ppu.cntV, cntH: ppu.cntH, cntVT: ppu.cntVT, cntHT: ppu.cntHT,
    }, 'palette', { bg: Array.from(ppu.vramMem.slice(0x3f00, 0x3f10)), spr: Array.from(ppu.vramMem.slice(0x3f10, 0x3f20)) },
    'ptTile6b', ppu.ptTile[0x6b] ? Array.from(ppu.ptTile[0x6b].pix) : null,
    'ptTileeb', ppu.ptTile[0xeb] ? Array.from(ppu.ptTile[0xeb].pix) : null);
    console.log('saved _h5_frame-' + nes + '.png');
  }
}
console.log('done');
