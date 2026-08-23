// 扫描全 asm 目录中 $001B 的写入/读取点, 定位 bit0 设置来源
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
function walk(d) {
  const out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.s')) out.push(p);
  }
  return out;
}
const files = walk(root);
const re = /(STA|LDA|ORA|AND|EOR|BIT)\s+\$001B\b/i;
let found = 0;
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    const m = l.match(/(LDA|STA|ORA|AND|EOR|BIT)\s+\$001B\b(.*?);\s*\$([0-9A-F]{4})/i);
    if (re.test(l)) {
      // 尝试提取注释里的地址
      const addr = l.match(/;\s*\$([0-9A-F]{4})/i);
      console.log(`${f.replace(root + '/', '')}:${i + 1} [${addr ? '$' + addr[1] : '?'}] ${l.trim()}`);
      found++;
    }
  });
}
console.log('total hits:', found);
