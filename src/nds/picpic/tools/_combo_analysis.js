// 综合分析: map_d 值1/2/3 视图 + fap 尝试
const fs = require('fs');
const BASE = 'd:/studio/github/monkeycode/src/nds/picpic/';
let out = '';

// 1) Cat & mouse 只显示 1,2,3 (0 和 8+ 空格)
function loadMap(f) {
  const b = fs.readFileSync(BASE + f);
  const h = b[0], w = b[1];
  const body = b.slice(6);
  const g = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x;
    g.push((i & 1) ? (body[i >> 1] >> 4) : (body[i >> 1] & 0x0F));
  }
  return { w, h, g };
}
for (const f of ['roms/extracted/map_d/4000101_Cat & mouse.map', 'roms/extracted/map_d/4000201_House.map']) {
  const { w, h, g } = loadMap(f);
  out += `\n=== ${f} 值1/2/3视图 (123=线, 其他=空格) ===\n`;
  for (let y = 0; y < h; y++) {
    let l = '';
    for (let x = 0; x < w; x++) {
      const v = g[y * w + x];
      l += (v === 1 || v === 2 || v === 3) ? '#' : '.';
    }
    out += l + '\n';
  }
  // 值1/2/3 各自视图
  for (const tv of [1, 2, 3]) {
    out += `--- 只显示值${tv} ---\n`;
    for (let y = 0; y < h; y++) {
      let l = '';
      for (let x = 0; x < w; x++) l += g[y * w + x] === tv ? '#' : '.';
      out += l + '\n';
    }
  }
}

// 2) fap 尝试: 若 fap 是线段数据 (head 2: W,H), 看尾部是否规律
const fb = fs.readFileSync(BASE + 'roms/extracted/fap_d/3300401_rooster.fap');
out += `\n=== rooster.fap 全文 hex ===\n`;
for (let i = 0; i < fb.length; i += 16) {
  const slice = fb.slice(i, i + 16);
  out += i.toString(16).padStart(4, '0') + ': ' + Array.from(slice).map(x => x.toString(16).padStart(2, '0')).join(' ') + '\n';
}
// 若头2字节 = W,H=15, 数据从offset2, 统计 nibble 值分布(offset2开始113字节)
const cnt = {};
for (let i = 0; i < 15 * 15; i++) {
  const byte = fb[2 + (i >> 1)];
  const v = (i & 1) ? (byte >> 4) : (byte & 0x0F);
  cnt[v] = (cnt[v] || 0) + 1;
}
out += 'nibble分布(offset2): ' + JSON.stringify(cnt) + '\n';
fs.writeFileSync(BASE + 'tools/_combo_out.txt', out);
console.log('written', out.length);
