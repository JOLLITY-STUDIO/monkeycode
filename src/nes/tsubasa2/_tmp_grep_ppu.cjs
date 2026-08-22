// _tmp_grep_ppu.cjs — 定位 PPU 渲染/CHR/调色板关键实现
'use strict';
const fs = require('fs');
const files = [
  'src/core/ppu/index.ts',
  'src/core/rom.ts',
  'src/core/mapper/mapper4.ts',
  'src/core/mapper/index.ts',
];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => {
    if (/renderBgScanline|loadCHR|chrRom|ptTile|updatePalettes|imgPalette|sprPalette|renderScanline|startFrame|endScanline|writeMem|writeReg|updateControlReg|patternTable|loadVram|chrData/i.test(l)) {
      hits.push(`${i + 1}: ${l.trim().slice(0, 120)}`);
    }
  });
  console.log(`\n===== ${f} (${hits.length} hits) =====`);
  hits.slice(0, 80).forEach(h => console.log(h));
}
