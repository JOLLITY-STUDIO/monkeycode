const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '.codebuddy', 'agents');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
for (const f of files) {
  const j = JSON.stringify(f);
  if (j.includes('\\n')) console.log('[NEWLINE-FILE]', j);
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  if (txt.includes('\n') && /^name:/m.test(txt)) {
    const m = txt.match(/^name:\s*(.+)$/m);
    console.log('name:', JSON.stringify(m[1].trim()), 'file:', j);
  }
}
console.log('done, total:', files.length);
