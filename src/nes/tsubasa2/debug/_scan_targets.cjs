// temp scanner: find label line numbers in asm files
const fs = require('fs');
const path = require('path');

const targets = {
  'bank00/code_sub.s': ['$9FA8', '$9F96', '$9F89', '$9F69', '$98A0', '$9B91', '$9A35', '$9A43', '$9B7F', '$8895', '$8920', '$890C', '$8976', '$9DEE', '$88A6', '$9B5E'],
  'bank26/code_sub.s': ['$99F0', '$9A0D', '$9B28', '$98EA', '$9B5E', '$9B7F', '$9B91', '$98A0'],
  'bank26/code_data.s': ['$99F0', '$9A0D', '$9B28', '$98EA', '$9B5E'],
  'bank02/code_sub.s': ['$A559', '$A57B', '$A581', '$A5A2', '$A5A8', '$A5B0', '$A5BF', '$A5CD', '$A5DB', '$A5E8', '$A602', '$A61C', '$A629', '$A650', '$A67A', '$A682', '$A78D', '$A7BD', '$A7CE', '$A7D6', '$A7E8', '$A7FA', '$A815'],
  'bank02/code_main.s': ['$84C1', '$8530', '$8210', '$A491', '$A459', '$A57B', '$A7FA'],
};

for (const [rel, labels] of Object.entries(targets)) {
  const p = path.join('src/asm', rel);
  if (!fs.existsSync(p)) { console.log('MISSING FILE:', rel); continue; }
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  console.log('=== ' + rel + ' (' + lines.length + ' lines) ===');
  for (const lab of labels) {
    const idx = lines.findIndex(l => l.includes(lab));
    console.log(lab.padEnd(8), idx >= 0 ? 'line ' + (idx + 1) + ': ' + lines[idx].trim() : 'NOT FOUND');
  }
}
