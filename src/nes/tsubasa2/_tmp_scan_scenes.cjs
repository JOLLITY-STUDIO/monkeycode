const fs = require('fs');
// 1. 找拆分脚本
const scripts = fs.readdirSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts');
console.log('== scripts with opening/scene/split ==');
for (const f of scripts) {
  if (/opening|scene|split/i.test(f)) console.log('  ' + f);
}
// 2. 看 opening-title-1.ts 头部 15 行
const head = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/opening/opening-title-1.ts', 'utf8').split('\n');
console.log('== opening-title-1.ts head ==');
for (let i = 0; i < 20; i++) console.log((i + 1) + ': ' + head[i]);
// 3. 看 opening-ending-end.ts 尾部（最后一个文件的结尾）
const tail = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/opening/opening-ending-end.ts', 'utf8').split('\n');
console.log('== opening-ending-end.ts tail ==');
for (let i = Math.max(0, tail.length - 8); i < tail.length; i++) console.log((i + 1) + ': ' + tail[i]);
// 4. 各 scene 文件首尾帧号
const d = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/opening';
for (const f of fs.readdirSync(d).filter(x => x.startsWith('opening-') && x.endsWith('.ts'))) {
  const s = fs.readFileSync(d + '/' + f, 'utf8');
  const m = s.match(/f:(\d+)/g);
  if (m) console.log(f + '  first f' + m[0].match(/\d+/)[0] + ' last f' + m[m.length - 1].match(/\d+/)[0] + '  frames=' + m.length);
}
