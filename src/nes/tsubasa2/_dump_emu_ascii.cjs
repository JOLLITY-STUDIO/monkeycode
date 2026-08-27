// 临时:emu screen.png 转 ASCII (4x4 downsample)
const fs = require('fs');
// 用 dist-cjs 的 png 解析太麻烦,直接用 read_file 读图片?不行。改用手动解析 PNG (zlib).
const zlib = require('zlib');

function parsePng(file) {
  const data = fs.readFileSync(file);
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idat = [];
  while (pos < data.length) {
    const len = data.readUInt32BE(pos);
    const type = data.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = data.readUInt32BE(pos + 8);
      height = data.readUInt32BE(pos + 12);
      bitDepth = data[pos + 16];
      colorType = data[pos + 17];
    } else if (type === 'IDAT') {
      idat.push(data.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  return { width, height, bitDepth, colorType, raw };
}

function ascii(png) {
  const { width, height, raw } = png;
  const bpp = png.colorType === 6 ? 4 : (png.colorType === 2 ? 3 : 1);
  const stride = width * bpp;
  let out = '';
  for (let y = 0; y < height; y += 4) {
    let row = '';
    for (let x = 0; x < width; x += 4) {
      // 取块中心像素的亮度
      let lum = 0, cnt = 0;
      for (let dy = 0; dy < 4; dy++) {
        for (let dx = 0; dx < 4; dx++) {
          const yy = y + dy, xx = x + dx;
          if (yy >= height || xx >= width) continue;
          const off = yy * (stride + 1) + 1 + xx * bpp;
          const r = raw[off], g = raw[off + 1], b = raw[off + 2];
          lum += (r * 299 + g * 587 + b * 114) / 1000;
          cnt++;
        }
      }
      lum = cnt ? lum / cnt : 0;
      row += lum > 180 ? '#' : (lum > 90 ? '+' : (lum > 30 ? ':' : '.'));
    }
    out += row + '\n';
  }
  return out;
}

const png = parsePng('output/emu-full/frame-0010/screen.png');
console.log('emu screen size:', png.width, 'x', png.height, 'colorType', png.colorType);
console.log('=== EMU frame-0010 screen (4x4 downsampled) ===');
console.log(ascii(png));
