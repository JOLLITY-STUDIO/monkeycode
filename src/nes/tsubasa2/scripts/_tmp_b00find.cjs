// 临时脚本: 在 bank_00 asm 中查找 helper 地址
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', '_tmp_bzk_out', 'bank_00');
const targets = ['9B6F','9B74','9B7F','9BA0','9D27','9D50','9DEE','97B6','97B8','97AB','98DF','98EA','9895','88CA','9B28','9B5E','98A0','99F0','997A','9BE8','9C3A','9C28','9BE3','98E8','9CC9','9CD3','9C3C','8AEC','8AEE','82A9','9C3C'];
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.asm')) continue;
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/00:([0-9A-F]{4}):/);
    if (m && targets.includes(m[1])) console.log(`${f}:${i + 1}: ${lines[i].trimEnd()}`);
  }
}
