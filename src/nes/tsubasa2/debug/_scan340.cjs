// 提取 380 逐帧 log 中 f340-380 的帧首行 + PPU 写 + bank 切换 + 关键 RAM
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const lines = fs.readFileSync(path.join(DIR, 'tsubasa-when-show380-逐帧.log'), 'utf8').split('\n');
let cur = null;
const frames = new Map();
for (const l of lines) {
  const m = l.match(/^f(\d+)\s/);
  const f = m ? parseInt(m[1]) : cur;
  if (f === null || f < 340 || f > 380) { if (m && f > 380) break; continue; }
  if (m) { cur = f; if (!frames.has(f)) frames.set(f, []); }
  if (!frames.has(f)) continue;
  frames.get(f).push(l);
}
for (const f of [...frames.keys()].sort((a, b) => a - b)) {
  const lines2 = frames.get(f);
  // 重组单行
  let re = [], i = 0;
  while (i < lines2.length) {
    const l = lines2[i];
    const m = l.match(/^f\d+\s+c(\d+)\s+i(\d+)\s+([\s\S]*)$/);
    if (m) {
      let body = m[3];
      while (i + 1 < lines2.length && !/^f\d+\s+c\d+\s+i\d+/.test(lines2[i + 1])) { body += ' ' + lines2[i + 1].trim(); i++; }
      re.push(body);
    }
    i++;
  }
  const first = re[0] || '';
  const ppu = re.filter(x => /STA \$200[0-7]|STA \$4014|STY \$2000/.test(x));
  const bank = re.filter(x => /STA \$800[0-1]/.test(x));
  const ram = re.filter(x => /STA \$00(5B|90|91|1B|20|ED)\b/.test(x));
  console.log(`\nf${f} (${re.length}): ${first.slice(0, 100)}`);
  if (ram.length) console.log('  RAM:', ram.slice(0, 5).join(' | '));
  if (bank.length) console.log('  BANK:', bank.slice(0, 5).join(' | '));
  if (ppu.length) console.log('  PPU:', ppu.slice(0, 5).join(' | '));
}
