import fs from 'fs';

const v = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

function analyzePlane(ntBase, name) {
  console.log('===', name, 'base 0x' + ntBase.toString(16), '===');
  const rows = {};
  for (let row = 0; row < 32; row++) {
    for (let col = 0; col < 64; col++) {
      const off = ntBase + (row * 64 + col) * 2;
      const w = (v[off + 1] << 8) | v[off];
      const tile = w & 0x7ff;
      if (tile !== 0) {
        if (!rows[row]) rows[row] = [];
        rows[row].push({ col, tile, pal: (w >> 13) & 3 });
      }
    }
  }

  for (const row in rows) {
    const entries = rows[row];
    const text = entries.slice(0, 10).map(e =>
      `[${e.col.toString().padStart(2)},0x${e.tile.toString(16).padStart(3, '0')},p${e.pal}]`
    ).join(' ');
    console.log('Row', row.padStart(2), ':', text, entries.length > 10 ? '...' : '');
  }
}

analyzePlane(0xC000, 'Plane A');
analyzePlane(0xE000, 'Plane B');
