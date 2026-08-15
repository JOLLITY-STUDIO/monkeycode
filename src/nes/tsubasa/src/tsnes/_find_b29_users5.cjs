/**
 * 找出消费 bank29 数据的 code bank:
 * 1. 引用 $9xxx 窗口地址（bank29 切到 $8000 时数据在 $9xxx）
 * 2. 引用 $8xxx 窗口地址
 * 3. 确认 ram_0024/0025 的 bank 编号常量来源
 */
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm') && !f.startsWith('_full'));

// 1) 直接引用 $9xxx 地址（绝对寻址或间接）
const addrRe = /\b(?:LDA|STA|LDX|STX|LDY|STY|CMP|JSR|JMP|ADC|SBC|AND|ORA|EOR)\s+\$9[0-9A-F]{3}\b/i;
const hits = [];
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < t.length; i++) {
    const m = t[i].match(addrRe);
    if (m) {
      hits.push({ f, line: i + 1, txt: t[i].trim() });
    }
  }
}
console.log('=== 引用 $9xxx 地址的代码 (可能访问 bank29 数据) ===');
console.log('total:', hits.length);
const grouped = {};
hits.forEach(h => { grouped[h.f] = (grouped[h.f] || 0) + 1; });
console.log(Object.entries(grouped).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ': ' + v).join('\n'));

// 2) 列出所有不同的 $9xxx 地址
const addrs = new Set();
hits.forEach(h => { const m = h.txt.match(/\$9[0-9A-F]{3}\b/i); if (m) addrs.add(m[0].toUpperCase()); });
console.log('\n=== 引用到的 $9xxx 地址 ===');
console.log([...addrs].sort().join(' '));

// 3) 查看 bank_30 中 ram_0024/0025 加载 bank 编号的代码（bank_30 是 init）
const b30 = fs.readFileSync(path.join(dir, 'bank_30.asm'), 'utf8').split(/\r?\n/);
console.log('\n=== bank_30 中 ram_0024 加载 bank 编号 ===');
let c = 0;
for (let i = 0; i < b30.length && c < 10; i++) {
  if (/LDA\s+#\$[0-9A-F]{2}\s*$/.test(b30[i]) && /STA\s+ram_0024/.test(b30[i + 1] || '')) {
    console.log('L' + (i + 1) + ': ' + b30[i].trim() + ' / ' + (b30[i + 1] || '').trim());
    c++;
  }
}
