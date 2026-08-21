const fs = require('fs');
const s = fs.readFileSync(__dirname + '/src/core/ppu/index.ts', 'utf8');
const lines = s.split('\n');
const re = /^\s*(?:static\s+)?(?:get\s+|set\s+)?(\w+)\s*\([^)]*\)\s*\{/;
lines.forEach((l, i) => {
  const m = l.match(/(writeVram|readVram|updatePalettes|renderBgScanline|renderSprScanline|endScanline|updateControlReg|updateNameTable|setMirroring|updateScroll|loadTile|updateTileCache|writeOam|setPalette|writeVRAM)\b/);
  if (m) console.log(`${i + 1}: ${l.trim()}`);
});
