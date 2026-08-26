const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/OpeningScreenTable.ts';
const s = fs.readFileSync(p, 'utf8');
const screens = [];
const regex = /\{'id':(\d+),'label':'([^']+)'[^}]*'nt':\[([^\]]*)\]/g;
let m;
while ((m = regex.exec(s)) !== null) {
  const id = parseInt(m[1]);
  const label = m[2];
  const ntText = m[3];
  // nt 数组结构：{tile:number[],attrib:number[]}[]
  // 检查第二个元素（index 1）是否非零
  const entries = ntText.match(/\{'tile':\[[^\]]*\],'attrib':\[[^\]]*\]\}/g) || [];
  const nt1 = entries[1];
  if (nt1) {
    const nonZero = nt1.match(/\d+/) && !/\{'tile':\[0(,0)*\],'attrib':\[0(,0)*\]\}/.test(nt1);
    if (nonZero) screens.push({id, label});
  }
}
console.log('screens with non-zero NT1:', screens);
