const d = require('fs').readFileSync('src/game/prg/data/tables/player-table.ts', 'utf8');
for (const id of ['0x17', '0x18', '0x23', '0x24', '0x25', '0x26']) {
  const re = new RegExp('\\b' + id + '\\b[^}]*name:\\s*[\'"]([^\'"]+)[\'"]', '');
  const m = d.match(re);
  console.log(id, '=', m ? m[1] : '?');
}
