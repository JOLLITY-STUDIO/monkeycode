const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const lines = fs.readFileSync(path.join(DIR, 'tsubasa-when-show380-逐帧.log'), 'utf8').split('\n');
const frames = new Map();
let cur = null;
for (const l of lines) {
  const m = l.match(/^f(\d+)\s/);
  if (m) { cur = parseInt(m[1]); if (cur > 380) break; }
  if (cur !== null && cur >= 340) {
    if (!frames.has(cur)) frames.set(cur, []);
    frames.get(cur).push(l);
  }
}
for (const f of [...frames.keys()].sort((a, b) => a - b)) {
  const ls = frames.get(f);
  // 重组
  const re = [];
  let i = 0;
  while (i < ls.length) {
    const m = ls[i].match(/^f\d+\s+c(\d+)\s+i(\d+)\s+([\s\S]*)$/);
    if (m) {
      let body = m[3];
      while (i + 1 < ls.length && !/^f\d+\s+c\d+\s+i\d+/.test(ls[i + 1])) { body += ' ' + ls[i + 1].trim(); i++; }
      re.push(body);
    }
    i++;
  }
  if (!re.length) continue;
  const first = re[0].replace(/\s+/g, ' ');
  const ppu = re.filter(x => /STA \$200[0-7]|STA \$4014|STY \$2000/.test(x)).slice(0, 6).join(' § ');
  const bank = re.filter(x => /STA \$800[0-1]/.test(x)).slice(0, 4).join(' § ');
  const ram = re.filter(x => /STA \$00(5B|90|91|1B|20|ED)\b/.test(x)).slice(0, 4).join(' § ');
  console.log(`f${f}(${re.length}) ${first}`);
  if (ram) console.log(`   RAM: ${ram}`);
  if (bank) console.log(`   BANK: ${bank}`);
  if (ppu) console.log(`   PPU: ${ppu}`);
}
