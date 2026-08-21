// 查找 Bank19Service 引用与 start 调用点
const fs = require('fs');
const d = 'src';
const walk = (p) => {
  for (const f of fs.readdirSync(p)) {
    const fp = p + '/' + f;
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (/\.ts$/.test(f)) {
      const c = fs.readFileSync(fp, 'utf8');
      if (/Bank19Service|bank19_auxiliary/.test(c)) {
        const ls = c.split(/\r?\n/);
        let hit = false;
        ls.forEach((l, i) => {
          if (/Bank19Service|bank19_auxiliary|\.start\(/.test(l) && !l.trim().startsWith('*') && !l.trim().startsWith('//') && !/^import|require/.test(l.trim())) {
            console.log(fp + ':' + (i + 1) + ': ' + l.trim());
            hit = true;
          }
        });
        if (hit) console.log('---');
      }
    }
  }
};
walk(d);
