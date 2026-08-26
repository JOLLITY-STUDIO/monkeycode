// 诊断3: 找 asm 目录 / bank19 字符表 / 字幕文本 0x94 0x95 上下文
const fs = require('fs');
const walk = (d, re) => {
  let r = [];
  if (!fs.existsSync(d)) return r;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = d + '/' + e.name;
    if (e.isDirectory()) r = r.concat(walk(p, re));
    else if (re.test(e.name)) r.push(p);
  }
  return r;
};

console.log('=== 找 .s 文件位置 ===');
{
  for (const d of ['src/asm', 'src/asm/bank19', 'asm']) {
    if (fs.existsSync(d)) {
      console.log(d + ' -> exists');
      console.log(walk(d, /\.s$/).slice(0, 30).join('\n'));
    } else {
      console.log(d + ' -> missing');
    }
  }
}

console.log('\n=== bank18/bank19 文本段 0x94 0x95 上下文 (src 下 .s) ===');
{
  for (const f of walk('src', /\.s$/)) {
    if (!/bank1[89]/i.test(f)) continue;
    const c = fs.readFileSync(f, 'utf8');
    const ls = c.split('\n');
    ls.forEach((l, i) => {
      if (/0x94|0x95/.test(l)) {
        console.log('--- ' + f + ':' + (i + 1));
        console.log(ls.slice(Math.max(0, i - 4), i + 5).join('\n'));
      }
    });
  }
}

console.log('\n=== 字幕文本在哪 (text|subtitle|message|dialog|script) ===');
{
  for (const f of walk('src/game', /\.ts$/)) {
    if (/text|subtitle|message|dialog|script/i.test(f)) {
      const c = fs.readFileSync(f, 'utf8');
      if (/0x94|0x95|toTile|CharMap/.test(c)) console.log(f);
    }
  }
}
