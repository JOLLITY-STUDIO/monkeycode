const fs = require('fs');
const out = [];
// PRG offset = 0x2010 + (cpu - 0xA000)
const cpuTargets = { 'AF79': 0x2F89, 'AF8A': 0x2F9A, 'AFC2': 0x2FD2, 'B050': 0x3060 };
for (const f of fs.readdirSync('_tmp_bzk_out/bank_01').sort()) {
  const lines = fs.readFileSync('_tmp_bzk_out/bank_01/' + f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    const m = l.match(/0x([0-9A-F]{6})/);
    if (!m) return;
    const prg = parseInt(m[1], 16);
    for (const [cpu, target] of Object.entries(cpuTargets)) {
      if (prg >= target - 4 && prg <= target + 4) {
        out.push(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 120) + '   [near ' + cpu + ']');
      }
    }
  });
}
fs.writeFileSync('_find_b01d_out.txt', out.join('\n'), 'utf8');
console.log('done', out.length);
