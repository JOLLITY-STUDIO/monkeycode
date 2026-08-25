const fs = require('fs');
const lines = fs.readFileSync('docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log','utf8').split('\n');
let cur=0;
const chunks = {f7:[], f347:[], f375:[], f380:[]};
for (const ln of lines) {
  const fm = ln.match(/^f(\d+)\s/);
  if (fm) cur = +fm[1];
  const lst = chunks[cur];
  if (lst && lst.length < 8) lst.push(ln.trim().replace(/\s+/g,' '));
}
for (const f of Object.keys(chunks)) {
  console.log('====== f'+f+' (first 8 lines) ======');
  chunks[f].forEach(l => console.log('  ', l));
}
