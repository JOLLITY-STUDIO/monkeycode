// 解压 FCSX savestate，dump 关键状态
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const sav = fs.readFileSync(path.join(DIR, 'tsubasa-when-show-frame-275.sav'));

// FCSX header: "FCSX"(4) version(1) flags(4) extsize(4) size(4) zlib...
const tag = sav.slice(0, 4).toString('latin1');
const ver = sav[4];
const flags = sav.readUInt32LE(5);
const extsize = sav.readUInt32LE(9);
const usize = sav.readUInt32LE(13);
console.log('tag', tag, 'ver', ver, 'flags', flags, 'extsize', extsize, 'uncompressedSize', usize);

const z = sav.slice(17);
let body;
try { body = zlib.inflateSync(z); }
catch (e) { console.log('inflate fail', e.message); try { body = zlib.inflateRawSync(z); console.log('raw ok'); } catch (e2) { console.log('raw fail', e2.message); process.exit(1); } }
console.log('decompressed', body.length, 'bytes');
fs.writeFileSync(path.join(__dirname, '_sav275_body.bin'), body);

// 查找可读标记
const marks = ['PPU', 'ppu', 'APU', 'CPU', 'MMC3', 'RAM', 'FDS'];
const head = body.slice(0, 64).toString('hex');
console.log('body head hex:', head);

// 打印前 256 字节十六进制 + ascii
for (let off = 0; off < Math.min(body.length, 512); off += 16) {
  const hex = body.slice(off, off + 16).toString('hex').match(/.{1,2}/g).join(' ');
  const asc = body.slice(off, off + 16).toString('latin1').replace(/[^\x20-\x7e]/g, '.');
  console.log(String(off).padStart(6) + '  ' + hex.padEnd(48) + '  ' + asc);
}
