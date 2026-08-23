const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const c = fs.readFileSync(root + '/src/game/prg/code/system/GameSystemService.ts', 'utf8');
const lines = c.split('\n');
// 找 rdMemByte / rdPtr / wrPtr / sub974A / sub975B 定义位置
const keys = ['rdMemByte', 'rdPtr', 'wrPtr', 'sub974A', 'sub975B', 'sub94C1', 'sub978B', 'TEXT_BUFFER_TEMPLATE_978B'];
for (const k of keys) {
  lines.forEach((l, i) => { if (l.includes(k)) console.log((i + 1) + ': ' + l.trim()); });
}
console.log('=== rdMemByte implementation ===');
const m = c.indexOf('rdMemByte(');
// 打印 rdMemByte 方法定义 (通常 private rdMemByte(addr: number): number {...})
for (let i = 0; i < lines.length; i++) {
  if (/rdMemByte\s*\(/.test(lines[i]) && /private|public|protected|=>/.test(lines[i])) {
    let j = i;
    let depth = 0;
    let out = [];
    for (; j < lines.length; j++) {
      out.push((j + 1) + ': ' + lines[j]);
      depth += (lines[j].match(/{/g) || []).length - (lines[j].match(/}/g) || []).length;
      if (depth <= 0 && j > i) break;
    }
    console.log(out.join('\n'));
    break;
  }
}
console.log('=== rdPtr implementation ===');
for (let i = 0; i < lines.length; i++) {
  if (/rdPtr\s*\(/.test(lines[i]) && /private|public|protected|=>/.test(lines[i])) {
    let j = i, depth = 0, out = [];
    for (; j < lines.length; j++) {
      out.push((j + 1) + ': ' + lines[j]);
      depth += (lines[j].match(/{/g) || []).length - (lines[j].match(/}/g) || []).length;
      if (depth <= 0 && j > i) break;
    }
    console.log(out.join('\n'));
    break;
  }
}
