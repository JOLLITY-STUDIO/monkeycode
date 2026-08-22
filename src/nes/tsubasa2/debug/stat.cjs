const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, 'trace');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.log'));
for (const f of files) {
  const p = path.join(dir, f);
  const stat = fs.statSync(p);
  const lines = fs.readFileSync(p, 'utf8').split('\n').filter(l => l.length > 0).length;
  console.log(f + ': ' + lines + ' lines, ' + (stat.size / 1024).toFixed(1) + 'KB');
}
