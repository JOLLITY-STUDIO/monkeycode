const fs = require('fs');
const root = 'src';
const files = ['src/game/service/bank16_skills.service.ts', 'src/game/service/bank24_hud.service.ts', 'src/game/service/bank27_minimal.service.ts'];
const out = [];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (/ramByte|ramKey|writeRamKey|KEY_0300|0x0300/.test(line)) out.push(`${f}:${i + 1}|${line.trim()}`);
  });
}
fs.writeFileSync('_tmp_rambyte.txt', out.join('\n'));
console.log('hits:', out.length);
