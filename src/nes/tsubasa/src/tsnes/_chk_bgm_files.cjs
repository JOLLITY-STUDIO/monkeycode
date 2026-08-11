const fs = require('fs');
const dir = 'mini-audio/bgm-data/bgm-sid';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && /^BGM_/.test(f));
console.log('文件数:', files.length);
// 提取 ID
const ids = files.map(f => f.match(/BGM_(0x[0-9A-Fa-f]+)\.ts/)[1])
  .map(h => parseInt(h, 16))
  .sort((a, b) => a - b);
console.log('存在 ID:', ids.map(i => '0x' + i.toString(16).toUpperCase()).join(', '));
// 找缺失
const missing = [];
for (let i = 0x30; i <= 0x5B; i++) if (!ids.includes(i)) missing.push(i);
console.log('缺失 ID (0x30-0x5B):', missing.length ? missing.map(i => '0x' + i.toString(16).toUpperCase()).join(', ') : '无');
