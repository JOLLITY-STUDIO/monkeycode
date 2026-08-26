// 诊断: applyScrollBank02 实现 / Tsubasa2.frame 主循环调用点 / bank19 字符数据文件
const fs = require('fs');
const walk = (d, re) => {
  let r = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = d + '/' + e.name;
    if (e.isDirectory()) r = r.concat(walk(p, re));
    else if (re.test(e.name)) r.push(p);
  }
  return r;
};

console.log('=== applyScrollBank02 实现 ===');
for (const f of walk('src', /\.ts$/)) {
  const c = fs.readFileSync(f, 'utf8');
  const ls = c.split('\n');
  ls.forEach((l, i) => {
    if (/applyScrollBank02\s*\(/.test(l) && /private|public|function/.test(l)) {
      console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 120));
    }
  });
}

console.log('\n=== Tsubasa2.frame 中 Opening/applyNtToPpu/render 调用 ===');
for (const f of walk('src', /\.ts$/)) {
  const c = fs.readFileSync(f, 'utf8');
  if (/applyNtToPpu|getChrPlan|renderCommit|ppu\.render|\.render\(/.test(c)) {
    const ls = c.split('\n');
    ls.forEach((l, i) => {
      if (/applyNtToPpu|getChrPlan|renderCommit|ppu\.render|openingScene|OpeningScene/.test(l)) {
        console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 130));
      }
    });
  }
}

console.log('\n=== bank19 相关数据文件 ===');
for (const f of walk('src/game', /bank19|char|Char|kana|jis/i)) console.log(f);

console.log('\n=== CharMap 实例化点 ===');
for (const f of walk('src/game', /\.ts$/)) {
  const c = fs.readFileSync(f, 'utf8');
  if (/new CharMap|charMap\s*=|CharMap\b/.test(c)) {
    const ls = c.split('\n');
    ls.forEach((l, i) => {
      if (/new CharMap|charMap\s*=/.test(l)) console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 130));
    });
  }
}
