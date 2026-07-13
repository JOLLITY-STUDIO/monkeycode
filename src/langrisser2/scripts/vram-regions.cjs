const fs = require('fs');
const vram = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

console.log('VRAM non-empty tile regions (threshold: any non-zero byte):');
let inRegion = false;
let startAddr = 0;
for (let addr = 0; addr < 0x10000; addr += 32) {
  let nz = 0;
  for (let i = 0; i < 32; i++) if (vram[addr + i]) nz++;
  if (nz > 0) {
    if (!inRegion) {
      startAddr = addr;
      inRegion = true;
    }
  } else {
    if (inRegion) {
      console.log(`  0x${startAddr.toString(16).padStart(4, '0')}-0x${(addr - 1).toString(16).padStart(4, '0')} : ${(addr - startAddr) / 32} tiles`);
      inRegion = false;
    }
  }
}
if (inRegion) {
  console.log(`  0x${startAddr.toString(16).padStart(4, '0')}-0xFFFF : ${(0x10000 - startAddr) / 32} tiles`);
}
