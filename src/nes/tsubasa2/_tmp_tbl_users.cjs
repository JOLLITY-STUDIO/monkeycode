const fs = require('fs'), path = require('path');
function walk(d, out) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f), s = fs.statSync(p);
    if (s.isDirectory()) { if (!['node_modules', '.git', 'asm', '_tmp_bzk_out', 'trace', 'output'].includes(f)) walk(p, out); }
    else if (f.endsWith('.ts')) out.push(p);
  }
  return out;
}
const names = ['PASSWORD_POS_INC_LO', 'PASSWORD_POS_INC_HI', 'PASSWORD_CONTINUE_TABLE', 'PASSWORD_LEVEL_ADJ_TABLE', 'SPRITE_OFFSET_TABLE', 'SPRITE_POS_TABLE', 'PASSWORD_SPRITE_DATA', 'ROSTER_ATTR_TABLE', 'ROSTER_TABLE', 'PASSWORD_GRID_TILES', 'PASSWORD_KANA_CHARS', 'NMI_CALLBACK_TABLE', 'Bank02Tables'];
for (const f of walk('src', [])) {
  const t = fs.readFileSync(f, 'utf8');
  for (const name of names) {
    if (new RegExp('\\b' + name + '\\b').test(t)) console.log(f + '  →  ' + name);
  }
}
