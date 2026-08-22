const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, 'trace');

// 1. palette.log — 调色板写入序列 (去重看颜色变化)
console.log('=== palette.log 调色板写入序列 ===');
const palLines = fs.readFileSync(path.join(dir, 'palette.log'), 'utf8').split('\n').filter(l => l.length > 0);
const palSeen = new Set();
for (const l of palLines) {
  const m = l.match(/PAL_WRITE.*@ \$(\w{4}) (\w+)\[(\d+)\] color=#\$(\w{2})/);
  if (m) {
    const key = m[1] + '=' + m[4];
    if (!palSeen.has(key)) {
      palSeen.add(key);
      console.log('  ' + l.substring(l.indexOf('@')));
    }
  }
}

// 2. ppu_regs.log — PPU 寄存器变化序列
console.log('\n=== ppu_regs.log PPU 寄存器变化 ===');
const regLines = fs.readFileSync(path.join(dir, 'ppu_regs.log'), 'utf8').split('\n').filter(l => l.length > 0);
let prevVal = {};
for (const l of regLines) {
  const m = l.match(/STA \$(\w{4}) = #\$(\w{2}) (\w+)/);
  if (m) {
    const addr = m[1], val = m[2], name = m[3];
    if (prevVal[addr] !== val) {
      console.log('  $' + addr + ' = $' + val + ' (' + name + ')  [i' + l.match(/i(\d+)/)?.[1] + ']');
      prevVal[addr] = val;
    }
  }
}

// 3. nt.log — NT 写入统计 (按 NT 编号 + 行范围)
console.log('\n=== nt.log NT 写入统计 ===');
const ntLines = fs.readFileSync(path.join(dir, 'nt.log'), 'utf8').split('\n').filter(l => l.includes('NT_WRITE'));
const ntStats = {};
for (const l of ntLines) {
  const m = l.match(/@ \$(\w{4}) \((\w+)\)/);
  if (m) {
    const ntName = m[2].split(' ')[0]; // NT0/NT1/NT2/NT3
    ntStats[ntName] = (ntStats[ntName] || 0) + 1;
  }
}
for (const k in ntStats) console.log('  ' + k + ': ' + ntStats[k] + ' 次写入');

// NT 写入的 tile 值分布 (前 20 个不同 tile)
console.log('\n  NT tile 值分布 (前20):');
const tileDist = {};
for (const l of ntLines) {
  const m = l.match(/tile=#\$(\w{2})/);
  if (m) tileDist[m[1]] = (tileDist[m[1]] || 0) + 1;
}
const sortedTiles = Object.entries(tileDist).sort((a,b) => b[1]-a[1]).slice(0,20);
for (const [t, c] of sortedTiles) console.log('    #$' + t + ': ' + c + ' 次');

// 4. oam.log — OAM DMA 时间点
console.log('\n=== oam.log OAM DMA 时间点 ===');
const oamLines = fs.readFileSync(path.join(dir, 'oam.log'), 'utf8').split('\n').filter(l => l.includes('OAMDMA'));
for (const l of oamLines) {
  const m = l.match(/i(\d+)/);
  if (m) console.log('  DMA @ i' + m[1]);
}

// 5. audio.log — 音频寄存器变化 (去重)
console.log('\n=== audio.log 音频寄存器变化 ===');
const audLines = fs.readFileSync(path.join(dir, 'audio.log'), 'utf8').split('\n').filter(l => l.length > 0);
const audSeen = new Set();
for (const l of audLines) {
  const m = l.match(/\[(AUDIO)\] i(\d+) .* STA \$(\w{4}) = #\$(\w{2}) (\w+)/);
  if (m) {
    const key = m[3] + '=' + m[4];
    if (!audSeen.has(key)) {
      audSeen.add(key);
      console.log('  $' + m[3] + ' = $' + m[4] + ' (' + m[5] + ')  [i' + m[2] + ']');
    }
  }
}

// 6. pt.log — pattern table 写入
console.log('\n=== pt.log pattern table 写入 ===');
const ptLines = fs.readFileSync(path.join(dir, 'pt.log'), 'utf8').split('\n').filter(l => l.length > 0);
console.log('  共 ' + ptLines.length + ' 行');
for (const l of ptLines.slice(0, 10)) {
  console.log('  ' + l.substring(l.indexOf(']') + 1).trim());
}
