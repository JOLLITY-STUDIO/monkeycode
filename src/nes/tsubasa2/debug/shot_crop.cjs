/** shot_crop.cjs — 渲染指定帧 + 裁切区域 + 2x 放大为 PNG */
const fs = require('fs');
const zlib = require('zlib');
const tsnes = require('../tsnes/_build/index.js');
const frameNo = parseInt(process.argv[2] || '30', 10);
const outFile = process.argv[3] || 'debug/crop.png';
const x0 = parseInt(process.argv[4] || '0', 10);
const y0 = parseInt(process.argv[5] || '0', 10);
const x1 = parseInt(process.argv[6] || '256', 10);
const y1 = parseInt(process.argv[7] || '240', 10);
const scale = parseInt(process.argv[8] || '2', 10);

const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new tsnes.NES({ emulateSound: false });
nes.loadROM(rom);
for (let f = 0; f < frameNo; f++) nes.frame();
const ppu = nes.ppu;
const vm = ppu.vramMem;
const NES_RGB = [0x525252,0xB40000,0xA00000,0xB1003D,0x740069,0x00005B,0x00005F,0x001840,0x002F10,0x084A08,0x006700,0x124200,0x6D2800,0x000000,0x000000,0x000000,0xC4D5E7,0xFF4000,0xDC0E22,0xFF476B,0xD7009F,0x680AD7,0x0019BC,0x0054B1,0x006A5B,0x008C03,0x00AB00,0x2C8800,0xA47200,0x000000,0x000000,0x000000,0xF8F8F8,0xFFAB3C,0xFF7981,0xFF5BC5,0xFF48F2,0xDF49FF,0x476DFF,0x00B4F7,0x00E0FF,0x00E375,0x03F42B,0x78B82E,0xE5E218,0x787878,0x000000,0x000000,0xFFFFFF,0xFFF2BE,0xF8B8B8,0xF8B8D8,0xFFB6FF,0xFFC3FF,0xC7D1FF,0x9ADAFF,0x88EDF8,0x83FFDD,0xB8F8B8,0xF5F8AC,0xFFFFB0,0xF8D8F8,0x000000,0x000000];
const bgBase = ppu.f_bgPatternTable ? 0x1000 : 0x0000;
const sprBase = ppu.f_spPatternTable ? 0x1000 : 0x0000;
const W = 256, H = 240;
const img = Buffer.alloc(W * H * 3);
for (let ty = 0; ty < 30; ty++) for (let tx = 0; tx < 32; tx++) {
  const tile = vm[0x2000 + ty * 32 + tx];
  const attrByte = vm[0x23C0 + Math.floor(ty/4)*8 + Math.floor(tx/4)];
  const q = (Math.floor(tx%4/2)) | ((Math.floor(ty%4/2))<<1);
  const palIdx = (attrByte >> (q*2)) & 3;
  const palBase = 0x3F00 + palIdx*4;
  for (let py = 0; py < 8; py++) {
    const p0 = vm[bgBase + tile*16 + py], p1 = vm[bgBase + tile*16 + py + 8];
    for (let px = 0; px < 8; px++) {
      const bit = 7 - px;
      const c = ((p1>>bit)&1)*2 + ((p0>>bit)&1);
      const nesColor = c === 0 ? vm[0x3F00] : vm[palBase + c];
      const rgb = NES_RGB[nesColor & 0x3F] ?? 0;
      const o = (ty*8+py)*W*3 + (tx*8+px)*3;
      img[o]=(rgb>>16)&0xFF; img[o+1]=(rgb>>8)&0xFF; img[o+2]=rgb&0xFF;
    }
  }
}
const oam = ppu.spriteMem;
for (let i = 0; i < 64; i++) {
  const y = oam[i*4], tile = oam[i*4+1], attr = oam[i*4+2], x = oam[i*4+3];
  if (y >= 0xF8 || x >= 0xF8) continue;
  const palIdx = (attr&3)+4;
  const palBase = 0x3F10 + palIdx*4;
  const flipH = (attr&0x40)!==0, flipV = (attr&0x80)!==0;
  for (let py = 0; py < 8; py++) {
    const srcY = flipV ? 7-py : py;
    const p0 = vm[sprBase + tile*16 + srcY], p1 = vm[sprBase + tile*16 + srcY + 8];
    for (let px = 0; px < 8; px++) {
      const srcX = flipH ? px : 7-px;
      const c = ((p1>>srcX)&1)*2 + ((p0>>srcX)&1);
      if (c === 0) continue;
      const rgb = NES_RGB[vm[palBase+c]&0x3F] ?? 0;
      const o = (y+py)*W*3 + (x+px)*3;
      if (y+py<H && x+px<W) { img[o]=(rgb>>16)&0xFF; img[o+1]=(rgb>>8)&0xFF; img[o+2]=rgb&0xFF; }
    }
  }
}
// 裁切 + 放大
const cw = x1 - x0, ch = y1 - y0;
const out = Buffer.alloc(cw * scale * ch * scale * 3);
for (let y = 0; y < ch * scale; y++) {
  for (let x = 0; x < cw * scale; x++) {
    const sx = x0 + Math.floor(x / scale);
    const sy = y0 + Math.floor(y / scale);
    const si = (sy * W + sx) * 3;
    const di = (y * cw * scale + x) * 3;
    out[di] = img[si]; out[di+1] = img[si+1]; out[di+2] = img[si+2];
  }
}
function crc32(buf){let c;const t=[];for(let n=0;n<256;n++){c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0;}let crc=0xFFFFFFFF;for(const b of buf)crc=t[(crc^b)&0xFF]^(crc>>>8);return(crc^0xFFFFFFFF)>>>0;}
function chunk(type,data){const len=Buffer.alloc(4);len.writeUInt32BE(data.length);const td=Buffer.concat([Buffer.from(type,'ascii'),data]);const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(td));return Buffer.concat([len,td,crc]);}
const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(cw*scale,0);ihdr.writeUInt32BE(ch*scale,4);ihdr[8]=8;ihdr[9]=2;
const raw=Buffer.alloc(ch*scale*(1+cw*scale*3));
for(let y=0;y<ch*scale;y++){raw[y*(1+cw*scale*3)]=0;out.copy(raw,y*(1+cw*scale*3)+1,y*cw*scale*3,(y+1)*cw*scale*3);}
fs.writeFileSync(outFile, Buffer.concat([Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]),chunk('IHDR',ihdr),chunk('IDAT',zlib.deflateSync(raw,{level:9})),chunk('IEND',Buffer.alloc(0))]));
console.log(`${outFile}: ${cw*scale}x${ch*scale}`);