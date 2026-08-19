// tsnes 跑到 PASSWORD, dump CHR bank + OAM + 导出真实渲染帧对比
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const { NES } = require(path.resolve('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js'));
const { BUTTON_DOWN, BUTTON_START } = require(path.resolve('d:/studio/github/monkeycode/src/nes/tsnes/_build/controller.js'));

const ROM_PATH = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const romData = new Uint8Array(fs.readFileSync(ROM_PATH).buffer);

let lastBuf = null;
let frameCount = 0;
const nes = new NES({
  onFrame: (buf) => { lastBuf = buf; frameCount++; },
  emulateSound: false,
  onStatusUpdate: () => {},
});
nes.loadROM(romData);
console.log('mapper:', nes.rom.mapperType);

// 跑到 TITLE (BOOT 超时 ~120帧, 等到 ~130 帧确保在 TITLE)
for (let i = 0; i < 130; i++) nes.frame();
console.log('after 130 frames, frameCount=', frameCount, 'prgBankMap:', JSON.stringify(nes.mmap.prgBankMap));

// DOWN×2 选 PASSWORD, START 确认 (TITLE 菜单 3 选项 KICKOFF/CONTINUE/PASSWORD)
nes.buttonDown(1, BUTTON_DOWN); nes.frame();
nes.buttonUp(1, BUTTON_DOWN); nes.frame();
nes.buttonDown(1, BUTTON_DOWN); nes.frame();
nes.buttonUp(1, BUTTON_DOWN); nes.frame();
nes.buttonDown(1, BUTTON_START); nes.frame();
nes.buttonUp(1, BUTTON_START); nes.frame();
console.log('after keys, frameCount=', frameCount);

// 再跑 30 帧让 password 完整渲染
for (let i = 0; i < 30; i++) nes.frame();
console.log('total frames=', frameCount);

// dump CHR bank (mapper4 PRG/CHR bank 映射)
console.log('\n=== MMC3 PRG/CHR bank ===');
console.log('prgBankMap:', JSON.stringify(nes.mmap.prgBankMap));
if (nes.mmap.chrBankMap) console.log('chrBankMap:', JSON.stringify(nes.mmap.chrBankMap));
if (nes.mmap.regs) for (let r=0;r<8;r++) console.log(`  R${r}: $${(nes.mmap.regs[r]||0).toString(16)}`);

// dump OAM 真实数据 (CONTINUE 后 password 场景)
console.log('\n=== OAM 精灵 (password 场景) ===');
for (let s = 0; s < 64; s++) {
  const b = 0x0200 + s*4;
  const y = nes.cpu.mem[b], tile = nes.cpu.mem[b+1], attr = nes.cpu.mem[b+2], x = nes.cpu.mem[b+3];
  if (y || tile || attr || x) console.log(`  spr#${s}: Y=$${y.toString(16).padStart(2,'0')} tile=$${tile.toString(16).padStart(2,'0')} attr=$${attr.toString(16).padStart(2,'0')} X=$${x.toString(16).padStart(2,'0')}`);
}

// PPU 调色板 (确认 CHR bank 的实际调色板)
console.log('\n=== PPU 调色板 BG ($3F00-$3F1F) ===');
for (let i = 0; i < 16; i++) {
  const c = nes.ppu.vramMem[0x3F00 + i] || 0;
  console.log(`  $${(0x3F00+i).toString(16)}: $${c.toString(16).padStart(2,'0')}`);
}

// 导出最后一帧为 PNG
function crc32(buf){let c=~0;for(let i=0;i<buf.length;i++){c^=buf[i];for(let k=0;k<8;k++)c=(c>>>1)^(0xEDB88320&-(c&1));}return(~c)>>>0;}
function writePNG(filepath, w, h, pixels) {
  const raw = Buffer.alloc((w*4+1)*h);
  let off=0;
  for(let y=0;y<h;y++){raw[off++]=0;for(let x=0;x<w;x++){const px=pixels[y*w+x]>>>0;raw[off++]=(px>>16)&0xff;raw[off++]=(px>>8)&0xff;raw[off++]=px&0xff;raw[off++]=0xff;}}
  const comp=zlib.deflateSync(raw);
  const sig=Buffer.from([137,80,78,71,13,10,26,10]);
  function chunk(type,data){const t=Buffer.from(type,'ascii');const l=Buffer.alloc(4);l.writeUInt32BE(data.length);const c=Buffer.alloc(4);c.writeUInt32BE(crc32(Buffer.concat([t,data])));return Buffer.concat([l,t,data,c]);}
  const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(w,0);ihdr.writeUInt32BE(h,4);ihdr[8]=8;ihdr[9]=6;
  fs.writeFileSync(filepath, Buffer.concat([sig,chunk('IHDR',ihdr),chunk('IDAT',comp),chunk('IEND',Buffer.alloc(0))]));
  console.log('PNG written:', filepath);
}

if (lastBuf) {
  writePNG(path.join(__dirname, '_tmp_password_render.png'), 256, 240, lastBuf);
  console.log('frame buffer pixels:', lastBuf.length);
} else {
  console.log('no frame buffer captured');
}