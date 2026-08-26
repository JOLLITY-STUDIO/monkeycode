// 找字符码表/字幕打印例程: 搜索含字符表语义的 asm 数据
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

// 1) 找含 "char" / "font" / "kana" / "message" 注释的 asm
console.log('=== asm 中 char/font/kana/message 注释 ===');
for (const f of walk('src/asm', /\.s$/)) {
  const c = fs.readFileSync(f, 'utf8');
  const ls = c.split('\n');
  ls.forEach((l, i) => {
    if (/;.*(char|font|kana|message|text|moji|mojis)/i.test(l) && !/\.byte/.test(l)) {
      console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 120));
    }
  });
}

// 2) 找 bank00 code_sub 中字幕打印例程(引用字符码表地址)
console.log('\n=== bank00 字幕/文本例程 ===');
for (const f of walk('src/asm/bank00', /\.s$/)) {
  const c = fs.readFileSync(f, 'utf8');
  const ls = c.split('\n');
  ls.forEach((l, i) => {
    if (/subtitle|text|moji|print|C5|charset/i.test(l) && !/\.byte/.test(l)) {
      console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 120));
    }
  });
}

// 3) 全 asm 中 0x94,0x95 出现最多的文件(统计)
console.log('\n=== 0x94/0x95 统计 top ===');
const stats = [];
for (const f of walk('src/asm', /\.s$/)) {
  const c = fs.readFileSync(f, 'utf8');
  const n = (c.match(/\$94|\$95/g) || []).length;
  if (n > 0) stats.push([f, n]);
}
stats.sort((a, b) => b[1] - a[1]);
for (const [f, n] of stats.slice(0, 15)) console.log(n + ' ' + f);

// 4) OpeningSequenceService 是否存在
console.log('\n=== OpeningSequenceService ===');
for (const f of walk('src', /\.ts$/)) {
  if (/OpeningSequence/.test(f)) console.log(f);
}
