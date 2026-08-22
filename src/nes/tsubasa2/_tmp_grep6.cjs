const fs = require('fs');
const l = fs.readFileSync('src/game/prg/data/scene/textscript/scripts-bank-06.ts','utf8').split(/\n/);
l.forEach((s, i) => {
  if (/SCENE_[4-9]|SCRIPT_0x05[^_]|PALETTE|SCRIPT_BANK_06_BYTES|SCRIPTS_BANK_06/.test(s)) {
    console.log((i+1) + ': ' + s.trim());
  }
});
