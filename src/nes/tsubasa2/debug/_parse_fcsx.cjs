// 解析 FCEUX savestate (ver 8) — 找 RAM/OAM/VRAM/palette/PPU 结构
const fs = require('fs');
const path = require('path');
const body = fs.readFileSync(path.join(__dirname, '_sav275_body.bin'));
console.log('body size', body.length);

// FCEUX 老版本 savestate 结构（逐字段）：
// 版本 8 布局（fceux 早期）：
//   cpu: pc(2 BE) a x y sp ps  + ppu/ram 指针等
// 暴力找特征：
// 1) RAM $0000-$07FF 是 2KB；OAM 后跟 0x00 填充
// 2) palette 是 0x3F00-0x3FFF 的 32 字节，通常以 0x0F 开头
// 3) VRAM 4KB (NT 2KB + attr) 或 8KB

// 打印全 body 的结构概览：每 256 字节的字节分布（是否全0/全FF/有内容）
for (let off = 0; off < body.length; off += 256) {
  const seg = body.slice(off, off + 256);
  let zeros = 0, ffs = 0, nonzero = 0;
  for (const b of seg) { if (b === 0) zeros++; else if (b === 0xff) ffs++; else nonzero++; }
  console.log(String(off).padStart(6) + '  z=' + String(zeros).padStart(3) + ' ff=' + String(ffs).padStart(3) + ' nz=' + String(nonzero).padStart(3) + '  ' + seg.slice(0, 8).toString('hex'));
}
