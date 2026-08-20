const fs = require('fs');
const path = require('path');
const dir = 'src';
const pats = [/initMatchDefaults/, /GAME_STATE|TIMER_L|TIMER_H|BALL_X|BALL_Y|BALL_OWNER/];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.ts')) {
      const t = fs.readFileSync(p, 'utf8');
      const lines = t.split('\n');
      lines.forEach((ln, i) => {
        for (const re of pats) {
          if (re.test(ln)) console.log(`${p}:${i + 1}: ${ln.trim()}`);
        }
      });
    }
  }
}
walk(dir);
