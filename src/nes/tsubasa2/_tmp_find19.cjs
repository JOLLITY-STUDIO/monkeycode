const fs = require('fs');
const c = fs.readFileSync('src/game/service/bank19_auxiliary.service.ts', 'utf8');
const lines = c.split('\n');
const keywords = ['C536', 'C50C', 'C542', 'C545', 'C530', 'queryName', '_namePtr', '_fixed', 'ram_0034', '0x0300', '0x1BCC', '0x3B4C', 'PRG_BANK_31', 'C509', 'C533'];
lines.forEach((l, i) => {
  for (const k of keywords) {
    if (l.includes(k)) {
      console.log((i + 1) + ': ' + l.trim());
      break;
    }
  }
});
