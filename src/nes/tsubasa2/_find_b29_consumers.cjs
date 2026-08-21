const fs = require('fs');
const path = require('path');
const hits = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!['node_modules'].includes(e.name)) walk(p); }
    else if (e.name.endsWith('.ts')) {
      const c = fs.readFileSync(p, 'utf8');
      const L = c.split(/\r?\n/);
      L.forEach((l, i) => {
        if (/\breadBank29\b|\bPRG_BANK_29\b|ADDR_(ROSTER_PTR|TEAM_GFX_BASE|TEAM_LIMIT|NAME_SEARCH|PLAYER_PTR|SKILL_PTR|ROSTER_BY_TEAM|GFX_LOOKUP|TEAM_BLOCK_)/.test(l) && !p.replace(/\\/g, '/').includes('/team/roster.ts')) {
          hits.push(p.replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
        }
      });
    }
  }
}
walk('src');
console.log(hits.length ? '' : 'NO EXTERNAL CONSUMERS');
hits.forEach(h => console.log(h));
