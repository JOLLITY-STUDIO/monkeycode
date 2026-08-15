// 搜索已翻译服务中固定区 C509/C50C/C512/C515/C536 的调用
const fs = require('fs');
const path = require('path');
const dir = 'tsubasa2-h5-src/src/game';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
const pats = /\$(C509|C50C|C512|C515|C536|CE2D|CE08)\b/i;
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (pats.test(l)) {
      console.log(`[${f}:${i + 1}] ${l.trim().slice(0, 120)}`);
    }
  });
}
