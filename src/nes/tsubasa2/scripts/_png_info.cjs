const fs = require('fs');
const zlib = require('zlib');
for (const f of ['output/emu-full/frame-0010/screen.png', 'output/emu-full/frame-3725/screen.png']) {
  const data = fs.readFileSync(f);
  const ihdrOff = data.indexOf('IHDR') + 8;
  const w = data.readUInt32BE(ihdrOff);
  const h = data.readUInt32BE(ihdrOff + 4);
  const bit = data[ihdrOff + 8];
  const ct = data[ihdrOff + 9];
  let idat = Buffer.alloc(0);
  let pos = 8;
  while (pos + 8 <= data.length) {
    const len = data.readUInt32BE(pos);
    const type = data.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') idat = Buffer.concat([idat, data.slice(pos + 8, pos + 8 + len)]);
    pos += 12 + len;
    if (type === 'IEND') break;
  }
  const raw = zlib.inflateSync(idat);
  const bpp = ct === 6 ? 4 : ct === 2 ? 3 : ct === 3 || ct === 0 ? 1 : 2;
  const rowLen = w * bpp + 1;
  console.log(f, 'w=' + w, 'h=' + h, 'bit=' + bit, 'colorType=' + ct, 'idat=' + idat.length, 'raw=' + raw.length, 'rowLen=' + rowLen);
  console.log('  row filter bytes:', Array.from(raw.slice(0, rowLen * 5)).filter((_, i) => i % rowLen === 0).join(','));
}
