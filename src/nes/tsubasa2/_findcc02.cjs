// 全 asm 找 $CC02 / $FBCC 表
const fs = require('fs');
const walk = (p) => {
  for (const f of fs.readdirSync(p)) {
    const fp = p + '/' + f;
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (/\.s$/.test(f)) {
      const c = fs.readFileSync(fp, 'utf8');
      if (/CC02|C530/.test(c)) {
        console.log('=== ' + fp);
        const ls = c.split(/\r?\n/);
        ls.forEach((l, i) => {
          if (/CC02|C530|FBCC/.test(l)) console.log((i + 1) + ': ' + l);
        });
      }
    }
  }
};
walk('asm');
