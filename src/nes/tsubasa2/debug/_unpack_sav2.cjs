const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const sav = fs.readFileSync(path.join(DIR, 'tsubasa-when-show-frame-275.sav'));
console.log('size', sav.length);
// FCSX 头: 4 tag + 1 ver + 4 flags + 4 extsize + 4 size = 17, zlib 从 17 开始
for (let off = 5; off < 24; off++) {
  try {
    const b = zlib.inflateSync(sav.slice(off));
    console.log('inflate OK from offset', off, '->', b.length, 'bytes');
    fs.writeFileSync(path.join(__dirname, '_sav275_body.bin'), b);
    break;
  } catch (e) { /* try next */ }
}
// 打印头 96 字节 hex
console.log('head:', sav.slice(0, 64).toString('hex'));
