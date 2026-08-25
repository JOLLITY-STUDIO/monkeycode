const fs = require('fs');
const r = fs.readFileSync('src/game/prg/code/system/RenderingPrimitivesService.ts', 'utf8');
// find any function declaration starting with ntBuffer
const re = /(?:public|private|readonly)?\s*(?:ntBuffer[A-Za-z]+)\s*\([^)]*\)\s*[:\w\[\]<>,\s{|]*\{?/g;
let m;
while ((m = re.exec(r))) {
  const idx = m.index;
  console.log(idx + ': ' + r.substring(idx, idx + 200).split('\n')[0]);
}
