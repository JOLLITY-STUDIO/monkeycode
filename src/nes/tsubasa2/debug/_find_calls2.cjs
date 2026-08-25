// 在 opening trace log 中查找主循环对 bank2 hub 入口的调用模式
const fs = require('fs');
const dir = 'docs/roms/opening-all';
const files = fs.readdirSync(dir);
const p = files.find(f => f.includes('openning') && f.includes('.log'));
if (!p) { console.log('未找到 log'); process.exit(1); }
console.log('使用文件:', p);
const s = fs.readFileSync(dir + '/' + p, 'utf8');
const lines = s.split(/\r?\n/);
const PAT2 = /\$00:([0-9A-F]{4}):\s+JSR \$A2/i;
const PATD = /\$00:([0-9A-F]{4}):\s+JSR \$A2(12|0F|0C|15|18|06|09|00|03)/i;
let n = 0, d = 0;
const seen = new Set();
for (const l of lines) {
  if (PATD.test(l)) { d++; if (!seen.has(l.slice(0, 80))) { seen.add(l.slice(0, 80)); console.log('DISPATCH:', l.replace(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+(.+)$/, 'f$1 c$2 $4')); } }
  if (PAT2.test(l)) n++;
}
console.log('总 JSR $A2xx 次数', n, '其中 hub 入口次数', d);
