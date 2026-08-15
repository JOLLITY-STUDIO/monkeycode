const fs = require('fs');
const SRC = 'roms/extracted/map_d/';

function parse(fname, hiFirst, swapWH, skip) {
  const b = fs.readFileSync(SRC + fname);
  const h0 = b[0], w0 = b[1];
  const h = swapWH ? w0 : h0, w = swapWH ? h0 : w0;
  const body = b.slice(skip);
  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const bb = body[i >> 1];
      let n;
      if (hiFirst) n = (i & 1) ? (bb & 0x0F) : (bb >> 4);
      else n = (i & 1) ? (bb >> 4) : (bb & 0x0F);
      row.push(n);
    }
    grid.push(row);
  }
  return { w, h, grid };
}

function render(g, label) {
  console.log('\n====', label, g.w + 'x' + g.h);
  const chars = [' ', '1', '2', '3', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'G', 'H', 'I', 'J'];
  for (const row of g.grid) {
    console.log(row.map(v => chars[v]).join(''));
  }
}

const fname = '4000201_House.map';
render(parse(fname, false, false, 6), '低nibble先 body6 h,w');
render(parse(fname, true, false, 6), '高nibble先 body6 h,w');
// 检查 body 长度与 h*w 关系
const b = fs.readFileSync(SRC + fname);
console.log('\n文件长度', b.length, 'h', b[0], 'w', b[1], 'h*w/2', Math.ceil(b[0] * b[1] / 2), 'body6', b.length - 6, 'body2', b.length - 2, 'body4', b.length - 4);
