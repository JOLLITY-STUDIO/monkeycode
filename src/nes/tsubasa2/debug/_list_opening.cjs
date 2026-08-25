const fs = require('fs');
const dir = 'docs/roms/opening-all';
let names;
try { names = fs.readdirSync(dir); } catch (e) { console.log('目录读取失败', e.message); process.exit(1); }
console.log('文件数', names.length);
for (const n of names) {
  console.log(JSON.stringify(n), 'len', n.length);
}
