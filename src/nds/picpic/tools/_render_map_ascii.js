const fs = require('fs');

function render(f, label) {
  const b = fs.readFileSync(f);
  const h = b[0], w = b[1];
  const body = b.slice(6);
  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const n = (i & 1) ? (body[i >> 1] >> 4) : (body[i >> 1] & 0x0F);
      row.push(n);
    }
    grid.push(row);
  }

  console.log('\n=== ' + label + ' (' + w + 'x' + h + ') ===');
  const chars = { 0: ' ', 1: '1', 2: '2', 3: '3', 8: '8', 9: '9', 10: 'A', 11: 'B' };
  for (let y = 0; y < h; y++) {
    let line = '';
    for (let x = 0; x < w; x++) {
      line += chars[grid[y][x]] || '?';
    }
    console.log(line);
  }
}

// 只看非0值（二值化）
function renderBinary(f, label) {
  const b = fs.readFileSync(f);
  const h = b[0], w = b[1];
  const body = b.slice(6);
  console.log('\n=== ' + label + ' BINARY ===');
  for (let y = 0; y < h; y++) {
    let line = '';
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const n = (i & 1) ? (body[i >> 1] >> 4) : (body[i >> 1] & 0x0F);
      line += n !== 0 ? '#' : ' ';
    }
    console.log(line);
  }
}

render('roms/extracted/map_d/4000201_House.map', 'House');
renderBinary('roms/extracted/map_d/4000201_House.map', 'House');
