// 导出当前渲染帧为 PNG (无 canvas 依赖, 手动 PNG 编码)
// 用法: node _tmp_export_png.cjs [帧数] [场景]
const fs = require('fs');
const path = require('path');

// 手动 PNG 编码 (zlib 压缩 + PNG chunk)
// 简化: 用纯 JS 的 zlib (Node 内置)
const zlib = require('zlib');

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1));
  }
  return (~c) >>> 0;
}

function writePNG(filepath, width, height, pixels /* Uint32Array RGBA? 不, 是 RGB 0xRRGGBB */) {
  // pixels: Uint32Array, 每像素 0xRRGGBB (我们 FrameCompositor 的格式)
  // 转 RGBA 字节流
  const rawData = Buffer.alloc((width * 4 + 1) * height); // 每行 +1 filter byte
  let off = 0;
  for (let y = 0; y < height; y++) {
    rawData[off++] = 0; // filter: None
    for (let x = 0; x < width; x++) {
      const px = pixels[y * width + x] >>> 0;
      rawData[off++] = (px >> 16) & 0xff; // R
      rawData[off++] = (px >> 8) & 0xff;  // G
      rawData[off++] = px & 0xff;         // B
      rawData[off++] = 0xff;              // A
    }
  }
  const compressed = zlib.deflateSync(rawData);

  // PNG 文件结构
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  function chunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii');
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const crcBuf = Buffer.alloc(4);
    const crcInput = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(crcInput), 0);
    return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const png = Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  fs.writeFileSync(filepath, png);
  console.log('PNG written:', filepath, `${width}x${height}`, `${png.length} bytes`);
}

// 加载编译后的 Tsubasa2
const Tsubasa2 = require('./_test_out/core/Tsubasa2.js').Tsubasa2;

const frames = parseInt(process.argv[2] || '60', 10);
const outPath = process.argv[3] || '_tmp_render_out.png';

// 无 canvas 模式: 用 stepFrame 跑帧, captureFrame 取缓冲
const game = new Tsubasa2(null); // 不传 ctx
game.prepare();

// 跑指定帧数
for (let i = 0; i < frames; i++) {
  game.stepFrame();
}

const buf = game.captureFrame();
console.log('frame buffer:', buf.length, 'pixels, first pixel:', '0x' + (buf[0] >>> 0).toString(16));

writePNG(path.join(__dirname, outPath), 256, 240, buf);
