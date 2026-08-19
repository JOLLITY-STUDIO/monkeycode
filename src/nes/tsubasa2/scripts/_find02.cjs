const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), '_tmp_bzk_out', 'bank_02');
const out = [];

function cpuAddr(line) {
  const m = line.match(/\b(\d{2}:[0-9A-F]{4}):/i);
  return m ? m[1].toUpperCase() : null;
}

const wanted = ['01:A372', '01:A3AB', '01:A8A3', '01:A8B7', '01:AB1F', '01:AA75', '01:AA47', '01:88AF', '01:88C0'];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm')).sort();
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const a = cpuAddr(lines[i]);
    if (a && wanted.includes(a)) {
      out.push('### FOUND ' + a + ' @ ' + f + ' L' + (i + 1));
      // extract up to 40 lines
      let block = [];
      for (let j = i; j < Math.min(lines.length, i + 40); j++) {
        const raw = lines[j];
        block.push(raw.replace(/^\S+\s+\d{2}:[0-9A-F]{4}:\s+/i, ''));
        const aj = cpuAddr(lines[j]);
        if (aj && j > i && aj > a && /RTS|JMP|JSR/.test(lines[j]) && block.length > 5) break;
      }
      out.push(block.join('\n'));
    }
  }
}

fs.writeFileSync(path.join(process.cwd(), '_find02c_out.txt'), out.join('\n\n'), 'utf8');
