// 定位例程定义行：行尾注释地址 == 目标地址
const fs = require('fs');
const targets = [
  // bank00
  '9B28','9B5E','9E7C','88CA','9B91','9B7F','98E8','98EA','9A35','99F0','9A0D',
  '9FA8','9F96','9F89','9F69','9B11','98A0','8AF7','890C','8920','8895','88FB',
  '9A31','9A1F','9A71','88B1','88D5',
  // bank02
  '8976','A82F','A72C','A767','AA97','AC6D','AC71','9E7C','88CA','88B7','A8B7',
  'A8A8','A8A3',
];
const banks = {
  'bank00': 'src/asm/bank00/_full.s',
  'bank02': 'src/asm/bank02/_full.s',
  'bank06': 'src/asm/bank06/_full.s',
};
for (const [bn, fp] of Object.entries(banks)) {
  if (!fs.existsSync(fp)) { console.log(`-- ${fp} 不存在`); continue; }
  const lines = fs.readFileSync(fp, 'utf8').split(/\r?\n/);
  for (const tgt of targets) {
    const found = [];
    lines.forEach((l, i) => {
      const m = l.match(/;\s*\$([0-9A-F]{4})\s*$/);
      if (m && m[1] === tgt) found.push(i + 1);
    });
    if (found.length) console.log(`${bn} $${tgt} 定义行: L${found.join(',L')}  ${lines[found[0]-1].trim()}`);
  }
}
