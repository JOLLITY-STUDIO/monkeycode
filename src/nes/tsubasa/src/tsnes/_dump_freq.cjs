const fs = require('fs');
const c = fs.readFileSync('_tmp_bzk_out/bank_12.asm','utf8');
const lines = c.split(/\r?\n/);
let p = false;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('83F4') || l.includes('846C')) p = true;
  if (p) {
    console.log(String(i+1).padStart(6)+':'+l.trimEnd());
  }
  if (p && i > 500 && l.trim() === '') p = false;
  if (l.includes('60') && l.includes('RTS') && p && i > 700) { console.log('---RTS---'); break; }
}
