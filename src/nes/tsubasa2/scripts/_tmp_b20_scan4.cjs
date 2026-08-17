// 转储 bank21 在 $A1B4 / $AC47 附近的数据, 以及 bank20 对应区
const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/';
function loadBank(i) {
  const text = fs.readFileSync(dir + 'prg-bank-' + String(i).padStart(2, '0') + '.ts', 'utf8');
  const m = text.match(/\[([\s\S]*?)\];/);
  const bytes = [];
  const re = /0x([0-9A-Fa-f]{2})/g;
  let hit;
  while ((hit = re.exec(m[1])) !== null) bytes.push(parseInt(hit[1], 16));
  return bytes;
}
const b21 = loadBank(21);
const b20 = loadBank(20);
const dump = (label, arr, off, len) => {
  const parts = [];
  for (let i = 0; i < len; i += 2) {
    parts.push((arr[off + i] | (arr[off + i + 1] << 8)).toString(16).padStart(4, '0'));
  }
  console.log(label + ':', parts.join(' '));
};
dump('bank21@0x01B4($A1B4) u16', b21, 0x01B4, 32);
dump('bank21@0x0C47($AC47) u16', b21, 0x0C47, 32);
dump('bank20@0x0AA3($8AA3) u16', b20, 0x0AA3, 16);
dump('bank20@0x0B48($8B48) u16', b20, 0x0B48, 16);
