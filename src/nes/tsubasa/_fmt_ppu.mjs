const { readFileSync, writeFileSync } = require('fs');
const s = JSON.parse(readFileSync('test_output/capture/ppu_state.json', 'utf8'));

// Nametable: 960 bytes = 32x30 tiles, each tile 8x8 pixels
// But ppu_state has 256x240 rendered by combining nt + chr + palette

// For now format nametable as 32x30 tile grid (since each tile is 8x8 = 256x240)
const nt = s.vram.slice(0, 960);
const at = s.vram.slice(960, 1024);

let out = [];
out.push('=== PPU State VRAM Nametable ===');
out.push('Format: 32 columns x 30 rows = 256x240 pixels (tile indices)');
out.push('');
for (let r = 0; r < 30; r++) {
  const row = Array.from(nt.slice(r * 32, (r + 1) * 32))
    .map(v => String(v).padStart(3))
    .join(' ');
  out.push(`R${String(r).padStart(2)}: ${row}`);
}

out.push('');
out.push('=== Attribute Table (palette assignments per 16x16 area) ===');
for (let r = 0; r < 8; r++) {
  out.push(
    Array.from(at.slice(r * 8, (r + 1) * 8))
      .map(v => '0x' + v.toString(16).padStart(2, '0'))
      .join(' ')
  );
}

out.push('');
out.push('=== PPU Registers ===');
out.push(`PPUCTRL: 0x${s.ctrl.toString(16)} (${s.ctrl})`);
out.push(`PPUMASK: 0x${s.mask.toString(16)} (${s.mask})`);

out.push('');
out.push('=== Palette (RGB) ===');
for (let i = 0; i < 32; i++) {
  out.push(`  [${String(i).padStart(2)}] 0x${s.palette[i].toString(16).padStart(6, '0')}`);
}

out.push('');
out.push('=== OAM (first 16 sprites) ===');
const oam = s.oam;
for (let i = 0; i < Math.min(16, oam.length / 4); i++) {
  const y = oam[i * 4];
  const tile = oam[i * 4 + 1];
  const attr = oam[i * 4 + 2];
  const x = oam[i * 4 + 3];
  out.push(`  Sprite ${i}: y=${y} tile=${tile} attr=0x${attr.toString(16)} x=${x}`);
}

writeFileSync('test_output/capture/ppu_state_formatted.txt', out.join('\n'), 'utf8');
console.log('Written to test_output/capture/ppu_state_formatted.txt');
