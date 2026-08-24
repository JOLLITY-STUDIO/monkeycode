// 临时：在 ppu/index.ts 中查找 spriteMem 消费逻辑（OAM 字节序）
const fs = require('fs');
const src = fs.readFileSync('src/core/ppu/index.ts', 'utf8');
const lines = src.split(/\r?\n/);
for (let i = 0; i < lines.length; i++) {
  if (/spriteMem|oam\[|sprite.*y =|sprite.*tile|OAM/i.test(lines[i])) {
    console.log(String(i + 1).padStart(4) + '|' + lines[i]);
  }
}
