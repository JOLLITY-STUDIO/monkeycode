const fs = require('fs');
const path = require('path');

// 1. NT trace — 看真实 ROM 写了哪些非零 tile
console.log('=== NT 非零 tile 写入 (trace) ===');
const ntLines = fs.readFileSync(path.resolve(__dirname, 'trace/nt.log'), 'utf8').split('\n').filter(l => l.includes('NT_WRITE'));
const nonZeroTiles = [];
for (const l of ntLines) {
  const m = l.match(/@ \$(\w{4}) \((\w+ \[\d+,\d+\])\) tile=#\$(\w{2})/);
  if (m && m[3] !== '00') {
    nonZeroTiles.push({ addr: m[1], pos: m[2], tile: m[3] });
  }
}
console.log('非零 tile 写入数: ' + nonZeroTiles.length);
for (const t of nonZeroTiles) {
  console.log('  $' + t.addr + ' ' + t.pos + ' tile=#$' + t.tile);
}

// 2. PT trace — 看真实 ROM 写了哪些 pattern
console.log('\n=== PT 写入 (trace) ===');
const ptLines = fs.readFileSync(path.resolve(__dirname, 'trace/pt.log'), 'utf8').split('\n').filter(l => l.length > 0);
console.log('PT 写入总数: ' + ptLines.length);
// 区分 PT_ADDR 和 PT_WRITE
const ptAddrLines = ptLines.filter(l => l.includes('[PT_ADDR]'));
const ptWriteLines = ptLines.filter(l => l.includes('[PT_WRITE]'));
console.log('PT_ADDR (地址设置): ' + ptAddrLines.length);
console.log('PT_WRITE (数据写入): ' + ptWriteLines.length);
for (const l of ptWriteLines.slice(0, 10)) {
  console.log('  ' + l.substring(l.indexOf(']') + 1).trim());
}

// 3. OAM trace — 看精灵数据
console.log('\n=== OAM 写入 (trace) ===');
const oamLines = fs.readFileSync(path.resolve(__dirname, 'trace/oam.log'), 'utf8').split('\n').filter(l => l.length > 0);
// 只看 OAMDATA 写入 ($2004), 不是 DMA
const oamDataLines = oamLines.filter(l => l.includes('OAMDATA'));
console.log('OAMDATA 写入数: ' + oamDataLines.length);
for (const l of oamDataLines.slice(0, 20)) {
  const m = l.match(/spr#(\d+)\.(\w+)/);
  if (m) console.log('  spr#' + m[1] + ' ' + m[2] + ' ' + l.substring(l.indexOf('=#')).substring(0, 20));
}

// 4. 调色板 — 看最终颜色 (最后一次写入的每个地址)
console.log('\n=== 调色板最终值 (trace 最后一次写入) ===');
const palLines = fs.readFileSync(path.resolve(__dirname, 'trace/palette.log'), 'utf8').split('\n').filter(l => l.includes('PAL_WRITE'));
const finalPal = {};
for (const l of palLines) {
  const m = l.match(/@ \$(\w{4}) (\w+)\[(\d+)\] color=#\$(\w{2})/);
  if (m) {
    finalPal[m[1]] = { type: m[2], idx: m[3], color: m[4] };
  }
}
for (const addr of Object.keys(finalPal).sort()) {
  const p = finalPal[addr];
  console.log('  $' + addr + ' ' + p.type + '[' + p.idx + '] = #$' + p.color);
}
