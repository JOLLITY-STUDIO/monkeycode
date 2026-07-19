// Export MMC3 2KB sub-bank PNGs from NES CHR-ROM
// Usage: node _export_chr_2kb_png.cjs

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const ROM = path.join(ROOT, 'romdata', 'Captain Tsubasa II - Super Striker (Japan).nes');
const OUT = path.join(__dirname, 'chr_2kb_png');
fs.mkdirSync(OUT, { recursive: true });

const rom = fs.readFileSync(ROM);

// Parse header
const prgPages = rom[4];
const chrPages = rom[5] || 0;
const prgSize = prgPages * 16384;
const chrOff = 16 + prgSize;
const chrSize = chrPages * 8192;

console.log(`MMC3 CHR: ${chrPages} × 8KB = ${chrSize} bytes`);
console.log(`Each 8KB bank → 4 × 2KB sub-banks`);
console.log(`2KB sub-banks total: ${chrPages * 4}`);

// MMC3 PPU mapping:
//   PPU $0000-$07FF ← 2KB bank (BG left, tiles $00-$3F)
//   PPU $0800-$0FFF ← 2KB bank (BG right, tiles $40-$7F)
//   PPU $1000-$17FF ← 2KB bank OR 2×1KB (sprites left, tiles $80-$BF)
//   PPU $1800-$1FFF ← 2KB bank OR 2×1KB (sprites right, tiles $C0-$FF)
//
// So one 2KB sub-bank = 128 tiles

function render2KB(bank8k, subIdx) {
  const scale = 16;
  const grid = 1;
  const tilesX = 16, tilesY = 8;  // 128 tiles in a 16×8 grid
  const pw = 8 * scale, ph = 8 * scale;
  const W = tilesX * pw + (tilesX - 1) * grid;
  const H = tilesY * ph + (tilesY - 1) * grid;
  const img = new Uint8Array(W * H);
  img.fill(11);

  for (let ty = 0; ty < tilesY; ty++) {
    for (let tx = 0; tx < tilesX; tx++) {
      const t = ty * 16 + tx;
      const off = chrOff + bank8k * 8192 + subIdx * 2048 + t * 16;
      if (off + 16 > rom.length) continue;
      const td = rom.subarray(off, off + 16);
      const px = tx * (pw + grid);
      const py = ty * (ph + grid);
      for (let y = 0; y < 8; y++) {
        const p0 = td[y];
        const p1 = td[y + 8];
        for (let x = 0; x < 8; x++) {
          const bit = 1 << (7 - x);
          const c = ((p0 & bit) ? 1 : 0) + ((p1 & bit) ? 2 : 0);
          const v = [0, 96, 176, 255][c];
          const ix = px + x * scale;
          const iy = py + y * scale;
          for (let dy = 0; dy < scale; dy++)
            for (let dx = 0; dx < scale; dx++)
              img[(iy + dy) * W + (ix + dx)] = v;
        }
      }
      // Label tile indices relative to this sub-bank
      const hex = t.toString(16).toUpperCase().padStart(2, '0');
      const txX = px + pw - 8;
      const txY = py + ph - 7;
      drawChar(img, W, H, txX, txY, hex[0], 255);
      drawChar(img, W, H, txX + 4, txY, hex[1], 255);
    }
  }
  return { width: W, height: H, data: img };
}

const FONT3X5 = {
  0:[0b111,0b101,0b101,0b101,0b111],1:[0b010,0b110,0b010,0b010,0b111],
  2:[0b111,0b001,0b111,0b100,0b111],3:[0b111,0b001,0b111,0b001,0b111],
  4:[0b101,0b101,0b111,0b001,0b001],5:[0b111,0b100,0b111,0b001,0b111],
  6:[0b111,0b100,0b111,0b101,0b111],7:[0b111,0b001,0b001,0b001,0b001],
  8:[0b111,0b101,0b111,0b101,0b111],9:[0b111,0b101,0b111,0b001,0b001],
  A:[0b111,0b101,0b111,0b101,0b101],B:[0b110,0b101,0b110,0b101,0b110],
  C:[0b111,0b100,0b100,0b100,0b111],D:[0b110,0b101,0b101,0b101,0b110],
  E:[0b111,0b100,0b111,0b100,0b111],F:[0b111,0b100,0b111,0b100,0b100],
};
function drawChar(img,w,h,x,y,ch,color){
  const rows=FONT3X5[ch];if(!rows)return;
  for(let r=0;r<5;r++){const row=rows[r];
    for(let c=0;c<3;c++){if((row>>(2-c))&1){const ix=x+c,iy=y+r;
    if(ix>=0&&ix<w&&iy>=0&&iy<h)img[iy*w+ix]=color;}}}
}

// PNG helpers
const crcTable=(()=>{const t=new Uint32Array(256);
  for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);t[n]=c;}return t;})();
function crc32(buf){let c=0xFFFFFFFF;for(let i=0;i<buf.length;i++)c=crcTable[(c^buf[i])&0xFF]^(c>>>8);return (c^0xFFFFFFFF)>>>0;}
function chunk(type,data){const tb=Buffer.from(type,'ascii'),cb=Buffer.concat([tb,data]);
  const len=Buffer.alloc(4);len.writeUInt32BE(data.length,0);
  const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(cb),0);
  return Buffer.concat([len,cb,crc]);}
function writePNG(fp,w,h,px){
  const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(w,0);ihdr.writeUInt32BE(h,4);
  ihdr[8]=8;ihdr[9]=0;ihdr[10]=0;ihdr[11]=0;ihdr[12]=0;
  const rows=[],fb=Buffer.from([0]);
  for(let y=0;y<h;y++){rows.push(fb);rows.push(Buffer.from(px.subarray(y*w,(y+1)*w)));}
  const raw=Buffer.concat(rows),idat=zlib.deflateSync(raw,{level:9});
  fs.writeFileSync(fp,Buffer.concat([Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]),chunk('IHDR',ihdr),chunk('IDAT',idat),chunk('IEND',Buffer.alloc(0))]));
}

for (let b = 0; b < chrPages; b++) {
  for (let s = 0; s < 4; s++) {
    const { width, height, data } = render2KB(b, s);
    const fp = path.join(OUT, `chr_bank${b}_sub${s}.png`);
    writePNG(fp, width, height, data);
    console.log(`  bank_${b}_sub${s} → ${fp}`);
  }
}

// MMC3 MAPPING REFERENCE:
// At runtime, PPU sees:
//   $0000-$07FF (bg L, tiles $00-3F) ← MMC3 reg 0 → some ROM sub-bank
//   $0800-$0FFF (bg R, tiles $40-7F) ← MMC3 reg 1 → some ROM sub-bank
//   $1000-$17FF (spr L, tiles $80-BF) ← MMC3 reg 2+3 → some ROM sub-bank(s)
//   $1800-$1FFF (spr R, tiles $C0-FF) ← MMC3 reg 4+5 → some ROM sub-bank(s)
// Naming: chr_bank{b}_sub{s}_tile{tt}  (t = 0..127 relative in sub-bank)
// → PPU tile = sub_base + t (sub_base is 0,64,128,192 depending on PPU region)

const ref = `MMC3 2KB sub-bank → PPU mapping reference
===============================================
Each 8KB ROM bank = 4 × 2KB sub-banks (sub_0..sub_3)

PPU Table 0 (BG, $0000-$0FFF, tiles $00-$7F):
  $0000-$07FF (tiles $00-$3F) ← MMC3 CHR reg 0 → some sub-bank
  $0800-$0FFF (tiles $40-$7F) ← MMC3 CHR reg 1 → some sub-bank

PPU Table 1 (SPR, $1000-$1FFF, tiles $80-$FF):
  $1000-$17FF (tiles $80-$BF) ← MMC3 CHR reg 2+3 → some sub-bank(s)
  $1800-$1FFF (tiles $C0-$FF) ← MMC3 CHR reg 4+5 → some sub-bank(s)

Example: if chr_bank0_sub0 matches PPU table 0 tiles $00-3F,
then MMC3 reg 0 = 0 (points to bank 0 sub-bank 0).

Each 2KB sub-bank PNG shows 128 tiles (16×8 grid).
The sub-bank index in ROM is: (bank_8kb * 4 + sub_idx) × 2KB`;
fs.writeFileSync(path.join(OUT, '_mmc3_mapping.txt'), ref);
console.log('\nDone! See ' + path.join(OUT, '_mmc3_mapping.txt') + ' for MMC3 mapping reference.');
