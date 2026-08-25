// CHR_BANKS 数据源检查
const fs = require('fs'), path = require('path');
const dir = 'src/game/chr';
console.log('--- dir listing ---');
for (const e of fs.readdirSync(dir)) {
  const p = path.join(dir, e);
  const st = fs.statSync(p);
  console.log(e, st.isDirectory() ? '[dir]' : st.size + 'B');
}
// 找 CHR_BANKS 定义
function walk(d) {
  let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}
for (const f of walk('src/game')) {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('CHR_BANKS')) console.log('### ' + f + '  (len ' + c.length + ')');
}
// ROM 文件信息
const roms = 'docs/roms';
if (fs.existsSync(roms)) {
  for (const e of fs.readdirSync(roms)) {
    if (/\.nes$/i.test(e)) {
      const p = path.join(roms, e);
      const buf = fs.readFileSync(p);
      const prg16 = buf[4], chr8 = buf[5];
      console.log('ROM ' + e + ' total=' + buf.length + ' PRG16=' + prg16 + ' CHR8=' + chr8 + ' CHR_KB=' + chr8 * 8);
    }
  }
}
