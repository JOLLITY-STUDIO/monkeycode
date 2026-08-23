// 快速定位 ROM 字节数据文件 (prg-bank-*.ts / NES_PRG_ROM / .nes / .chr)
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const hits = [];
function walk(d, depth) {
  if (depth > 4) return;
  let entries;
  try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === '_tmp_out') continue;
    const fp = path.join(d, e.name);
    if (e.isDirectory()) walk(fp, depth + 1);
    else if (/prg-bank/.test(e.name) || /^bank\d+(-data)?\.ts$/.test(e.name) || /NES_PRG_ROM/.test(e.name)) {
      hits.push(fp);
    }
  }
}
walk(root, 0);
console.log('bank/prg hits:');
hits.forEach(h => console.log('  ' + h));
// 找 ROM 二进制
const roms = [];
function walkRom(d, depth) {
  if (depth > 4) return;
  let entries;
  try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === '_tmp_out') continue;
    const fp = path.join(d, e.name);
    if (e.isDirectory()) walkRom(fp, depth + 1);
    else if (/\.nes$/i.test(e.name) || /\.chr$/i.test(e.name)) roms.push(fp);
  }
}
walkRom(root, 0);
console.log('rom binaries:');
roms.forEach(r => console.log('  ' + r));
// 查找 _tmp_bzk_out 目录
['d:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out', 'd:/studio/github/monkeycode/src/nes/_tmp_bzk_out', 'd:/studio/github/monkeycode/src/_tmp_bzk_out'].forEach(p => {
  if (fs.existsSync(p)) console.log('EXISTS: ' + p);
});
