const fs = require('fs');
const path = require('path');
// 找 25 个非零 NT tile 写入的指令序号, 对应到帧号
const ntLines = fs.readFileSync(path.resolve(__dirname, 'trace/nt.log'), 'utf8').split('\n').filter(l => l.includes('NT_WRITE'));
const nonZero = [];
for (const l of ntLines) {
  const m = l.match(/i(\d+).*@ \$(\w{4}) \(NT0 \[(\d+),(\d+)\]\) tile=#\$(\w{2})/);
  if (m && m[5] !== '00') {
    nonZero.push({ i: parseInt(m[1]), addr: m[2], row: m[3], col: m[4], tile: m[5] });
  }
}
console.log('非零 NT tile 写入 (' + nonZero.length + ' 个):');
for (const t of nonZero) {
  console.log('  i' + t.i + ' [' + t.row + ',' + t.col + '] tile=#$' + t.tile);
}

// 找调色板非 #$0F 写入的指令序号
const palLines = fs.readFileSync(path.resolve(__dirname, 'trace/palette.log'), 'utf8').split('\n').filter(l => l.includes('PAL_WRITE'));
const nonBlack = [];
for (const l of palLines) {
  const m = l.match(/i(\d+).*@ \$(\w{4}) (\w+)\[(\d+)\] color=#\$(\w{2})/);
  if (m && m[4] !== '0F') {
    nonBlack.push({ i: parseInt(m[1]), addr: m[2], type: m[3], idx: m[4], color: m[5] });
  }
}
console.log('\n非黑调色板写入 (' + nonBlack.length + ' 个, 前10):');
for (const t of nonBlack.slice(0, 10)) {
  console.log('  i' + t.i + ' $' + t.addr + ' ' + t.type + '[' + t.idx + '] = #$' + t.color);
}

// OAM DMA 时间点 — 计算帧号 (每次 DMA = 1帧)
const oamLines = fs.readFileSync(path.resolve(__dirname, 'trace/oam.log'), 'utf8').split('\n').filter(l => l.includes('OAMDMA'));
console.log('\nOAM DMA 次数: ' + oamLines.length);
for (let i = 0; i < oamLines.length; i++) {
  const m = oamLines[i].match(/i(\d+)/);
  if (m) {
    const instrIdx = parseInt(m[1]);
    console.log('  DMA #' + (i+1) + ' @ i' + instrIdx);
  }
}

// 找第一个非零 NT tile 在哪个 DMA 周期
if (nonZero.length > 0) {
  const firstNZ = nonZero[0];
  console.log('\n第一个非零 NT tile @ i' + firstNZ.i + ' — 在第几个 DMA 后?');
  let dmaCount = 0;
  for (const l of oamLines) {
    const m = l.match(/i(\d+)/);
    if (m && parseInt(m[1]) < firstNZ.i) dmaCount++;
    else break;
  }
  console.log('  在 DMA #' + dmaCount + ' 之后 (帧 ' + (dmaCount+1) + ')');
}
