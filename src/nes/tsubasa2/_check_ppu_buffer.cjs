var fs = require('fs');
var s = fs.readFileSync('src/core/ppu/index.ts', 'utf8');
var lines = s.split('\n');
// 找 toJSON/toState 的 buffer 导出声明 (通常在文件末尾的 toJSON 部分)
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  if (l.includes('"buffer"') || l.includes('this.buffer =') || l.includes('getBuffer') || l.includes('buffer;')) {
    console.log((i+1) + ': ' + l.trim());
  }
}
// 看 toJSON/toState 部分 (PPU 通常有 toJSON 导出 state)
console.log('=== toJSON/toState ===');
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  if (l.includes('toJSON') || l.includes('toState') || l.includes('fromJSON')) {
    console.log((i+1) + ': ' + l.trim());
  }
}
