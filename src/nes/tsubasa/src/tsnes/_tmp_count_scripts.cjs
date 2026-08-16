const fs = require('fs');
for (let i = 3; i <= 5; i++) {
  const p = `d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/game/data/scene/textscript/scripts-bank-0${i}.ts`;
  const c = fs.readFileSync(p, 'utf8');
  const re = /"id":(\d+),"idHex":"(0x[0-9A-Fa-f]+)"/g;
  const ids = [];
  let m;
  while ((m = re.exec(c))) ids.push({ id: +m[1], hex: m[2] });
  console.log(`bank${i} count=${ids.length} ids=${ids.map(x => x.hex).join(',')}`);
}
