const fs = require('fs');
function scan(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = require('path').join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name.startsWith('__') || f.name === 'node_modules') continue;
      out = out.concat(scan(p));
    } else if (f.name.endsWith('.ts') && !f.name.endsWith('.d.ts')) {
      out.push(p);
    }
  }
  return out;
}
for (const f of scan('src')) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/interface TeamRosterEntry\b|type TeamRosterEntry\b/.test(lines[i])) {
      console.log(f + ':' + (i + 1) + ': ' + lines[i]);
    }
  }
}
