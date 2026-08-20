const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/data/prg/scene/textscript/';
let out = '';
for (const f of ['scripts-bank-03.ts','scripts-bank-04.ts','scripts-bank-05.ts','scripts-bank-06.ts']) {
  const m = fs.readFileSync(path.join(dir, f), 'utf-8');
  const i = m.indexOf('= [');
  const arr = JSON.parse(m.substring(i + 2).replace(/;\s*$/, '').trim());
  let count=0;
  function walk(a){
    for(const x of a){
      if(Array.isArray(x)){ walk(x); continue; }
      if(x && typeof x==='object'){
        if(Array.isArray(x.bytes) && typeof x.text==='string' && x.type==='TEXT'){
          count++;
          const hex = x.bytes.map(b=>b.toString(16).padStart(2,'0').toUpperCase()).join(' ');
          out += `[${f}] ${hex}\n    text=${x.text}\n`;
        }
        walk(Object.values(x));
      }
    }
  }
  walk(arr);
}
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/scripts/_probe3.txt', out, 'utf-8');
console.log('written', out.length);
