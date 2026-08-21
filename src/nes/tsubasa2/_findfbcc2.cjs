// 全 asm 找 FBCC 数据表/引用 (含上下文)
const fs = require('fs');
const walk = (p) => {
  for (const f of fs.readdirSync(p)) {
    const fp = p + '/' + f;
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (/\.s$/.test(f)) {
      const c = fs.readFileSync(fp, 'utf8');
      if (/FBCC/.test(c)) {
        console.log('=== ' + fp);
        const ls = c.split(/\r?\n/);
        ls.forEach((l, i) => {
          if (/FBCC|CC02/.test(l)) {
            const from = Math.max(0, i - 2);
            for (let j = from; j <= Math.min(ls.length - 1, i + 2); j++) {
              console.log((j + 1) + ': ' + ls[j]);
            }
            console.log('  ---');
          }
        });
      }
    }
  }
};
walk('asm');
