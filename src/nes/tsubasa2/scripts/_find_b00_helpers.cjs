// 查找 bank_00 中被 bank01 调用的辅助例程位置
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', '_tmp_bzk_out', 'bank_00');
const targets = ['9B6F', '9B74', '997A', '8920', '89A3', '9C3A', '9BE8', '9C28', '9D27', '9D50', '9DEE', '9895', '98E8', '9DB5', '9D08', '99F0', '98A0', '9B7F', '9BA0', '9FA8', '97AB', '97AD', '97B6', '97B8', '9C71', '9CC9', '9BD3'];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm'));
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const t of targets) {
      if (line.includes('JSR $' + t) || line.includes('JMP $' + t) || line.includes('00:' + t + ':') || line.includes('00:' + t + ':')) {
        console.log(`${f}:${i + 1}: ${line.trim()}`);
        break;
      }
    }
  }
}
console.log('done');
