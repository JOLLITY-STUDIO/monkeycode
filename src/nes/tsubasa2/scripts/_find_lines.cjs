const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank00');
const targets = ['9459', '9224', '92E5', '92E6', '94AE', '94D8', '9684', '9693', '9304', '9338', '934E', '935C', '936A', '938B', '9398', '93A5', '9428', '9433', '9440', '948D', '9490', '94BA', '95E5', '95E6', '95F2', '95FA', '9606', '9610', '961A', '9626', '9630', '9640', '9646', '9658', '9674', '967E', '978B', '975B', '9B28', '9B5E', '98E8', '9735', '974A'];
for (const fn of ['code_render.s', 'code_sub.s', 'code_scene.s', 'code_main.s']) {
  const file = path.join(dir, fn);
  if (!fs.existsSync(file)) continue;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  console.log('=== ' + fn + ' (' + lines.length + ' lines) ===');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/\$([0-9A-Fa-f]{4})/);
    if (!m) continue;
    const addr = m[1].toUpperCase();
    if (targets.includes(addr)) {
      console.log(String(i + 1).padStart(5) + ': ' + lines[i].trim());
    }
  }
}
