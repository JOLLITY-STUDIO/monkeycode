// grep bank28 helpers
const fs = require('fs');
const src = fs.readFileSync('tsubasa2-h5-src/src/game/bank28_match.service.ts', 'utf8').split(/\r?\n/);
for (let i = 0; i < src.length; i++) {
  if (/_queryRoleAttributes|_finalizeLevelFrom032|_skipTo8203|lookupLevel|KEY_32/.test(src[i])) {
    console.log(`${i + 1}: ${src[i].trim()}`);
  }
}
