const fs = require('fs');
const SRC = 'roms/extracted/map_d/';

function load(fname) {
  const b = fs.readFileSync(SRC + fname);
  const h = b[0], w = b[1];
  const body = b.slice(6);
  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const bb = body[i >> 1];
      row.push(i & 1 ? (bb >> 4) : (bb & 0x0F));
    }
    grid.push(row);
  }
  return { w, h, grid };
}

function render(g, mask, label) {
  console.log('\n====', label);
  for (const row of g.grid) {
    console.log(row.map(v => (mask(v) ? '#' : '.')).join(''));
  }
}

const names = ['4000101_Cat & mouse.map', '4000201_House.map', '4000103_Frog.map', '4000106_Airplane.map'];
for (const f of names) {
  const g = load(f);
  console.log('\n########', f, g.w + 'x' + g.h);
  render(g, v => v >= 1 && v <= 3, '值1-3');
  render(g, v => v >= 8, '值8+');
}
