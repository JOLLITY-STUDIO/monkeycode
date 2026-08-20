const fs = require('fs');
const path = require('path');
const dir = 'src';
const keys = ['gameState', 'timerLo', 'timerHi', 'ballOwner', 'ballX', 'ballY',
  'nearCount', 'roundCount', 'actionClock', 'bpmCounter',
  'ctrlStatus', 'scrollDir', 'animLock', 'zoneFlag', 'pauseFlag'];
const sem = {
  ram_0600: 'nearCount', ram_0613: 'roundCount', ram_0614: 'actionClock',
  ram_0618: 'bpmCounter', ram_0516: 'ctrlStatus', ram_0517: 'scrollDir',
  ram_0515: 'animLock', ram_062A: 'zoneFlag', ram_062D: 'pauseFlag',
};
const all = {};
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.ts')) {
      const t = fs.readFileSync(p, 'utf8');
      const lines = t.split('\n');
      lines.forEach((ln, i) => {
        for (const k of keys) {
          if (ln.includes(`'${k}'`) || ln.includes(`"${k}"`)) {
            const kind = /write\(/.test(ln) ? 'WRITE' : (/read\(/.test(ln) ? 'READ' : 'REF');
            (all[k] = all[k] || []).push(`${kind} ${p}:${i + 1}: ${ln.trim()}`);
          }
        }
        for (const k of Object.keys(sem)) {
          if (ln.includes(`'${k}'`) || ln.includes(`"${k}"`)) {
            const kind = /write\(/.test(ln) ? 'WRITE' : (/read\(/.test(ln) ? 'READ' : 'REF');
            (all[k] = all[k] || []).push(`${kind} ${p}:${i + 1}: ${ln.trim()}`);
          }
        }
      });
    }
  }
}
walk(dir);
for (const k of [...keys, ...Object.keys(sem)]) {
  if (all[k]) {
    console.log(`\n=== ${k} (${all[k].length}) ===`);
    all[k].forEach(h => console.log('  ' + h));
  } else {
    console.log(`\n=== ${k} (0) ===`);
  }
}
