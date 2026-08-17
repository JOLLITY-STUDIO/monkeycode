const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '_tmp_bzk_out');
const banks = [];
for (let b = 0; b <= 31; b++) {
  const f = path.join(root, 'bank_' + String(b).padStart(2, '0') + '.asm');
  if (fs.existsSync(f)) banks.push(b);
}

for (const b of banks) {
  const f = path.join(root, 'bank_' + String(b).padStart(2, '0') + '.asm');
  const lines = fs.readFileSync(f, 'utf-8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/(JSR \$8349|20 49 83)/i.test(lines[i])) {
      console.log('bank' + b + ' line' + (i + 1) + ': ' + lines[i].trim());
    }
  }
}

// Also look for references to $8349 in code of bank 12 (callers within bank 12)
console.log('--- bank12 internal refs to $8349 ---');
const b12 = fs.readFileSync(path.join(root, 'bank_12.asm'), 'utf-8').split('\n');
for (let i = 0; i < b12.length; i++) {
  if (/8349/i.test(b12[i])) console.log('bank12 line' + (i + 1) + ': ' + b12[i].trim());
}
