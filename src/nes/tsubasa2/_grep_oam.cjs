const fs = require('fs');
const path = require('path');
const root = 'src/game';
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.ts')) {
      const text = fs.readFileSync(p, 'utf8');
      if (/shadowOam|spriteMem|sprMem|writeDMA|oam\.dma|OAM_DMA|setSprite/.test(text)) {
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (/shadowOam|spriteMem|sprMem|writeDMA|oam\.dma|OAM_DMA|setSprite/.test(lines[i])) {
            out.push(`${p}:${i + 1}: ${lines[i].trim()}`);
          }
        }
      }
    }
  }
  return out;
}
console.log(walk(root).join('\n'));
