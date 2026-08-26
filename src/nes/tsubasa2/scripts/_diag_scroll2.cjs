// 诊断2: ppu regFV/regFH 字段 / textscript 目录 / asm bank19 文件 / 字幕文本 0x94 0x95
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

console.log('=== ppu regFV/regFH/cntFV 定义 ===');
{
  const c = fs.readFileSync('src/core/ppu/index.ts', 'utf8');
  const ls = c.split('\n');
  ls.forEach((l, i) => {
    if (/this\.(regFV|regFH|cntFV)\s*=/.test(l)) console.log((i + 1) + ': ' + l.trim().slice(0, 90));
  });
}

console.log('\n=== textscript 目录 ===');
{
  const d = 'src/game/prg/data/scene/textscript';
  if (fs.existsSync(d)) console.log(walk(d, /\.ts$/).join('\n'));
  else console.log('not found');
}

console.log('\n=== asm 目录 bank19 相关文件 ===');
{
  for (const f of walk('asm', /bank19/i)) console.log(f);
}

console.log('\n=== 含 0x94 0x95 的文本类数据文件(排除 tile/nt/bgm) ===');
{
  for (const f of walk('src/game/prg/data', /\.ts$/)) {
    const c = fs.readFileSync(f, 'utf8');
    const ls = c.split('\n');
    ls.forEach((l, i) => {
      if (/0x9[45]/.test(l) && !/bgm-/.test(f)) {
        console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
      }
    });
  }
}

console.log('\n=== ScriptEngine 中 CharMap 用法 ===');
{
  const c = fs.readFileSync('src/game/prg/code/story/ScriptEngine.ts', 'utf8');
  const ls = c.split('\n');
  ls.forEach((l, i) => {
    if (/CharMap|charMap|toTile|register|0x9[45]|0x94|0x95/.test(l)) {
      console.log((i + 1) + ': ' + l.trim().slice(0, 110));
    }
  });
}
