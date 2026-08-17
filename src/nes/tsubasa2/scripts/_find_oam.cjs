const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'src');
const walk = (d) => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.ts$/.test(f)) {
      const t = fs.readFileSync(p, 'utf8');
      if (/writeSlot|beginBuild|isBusy|endBuild|OamManager|oam\b/.test(t)) console.log(p);
    }
  }
};
walk(root);
