const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
const m=[];
for(let i=0;i<lines.length;i++){
  if(/STA\s+\$E00[01]\b/.test(lines[i])) {
    const fm=lines[i].match(/^f(\d+)/);
    if (fm) m.push([+fm[1], i+1, lines[i]]);
  }
}
m.forEach(([f,n,l])=>console.log(`f${f} L${n}: ${l.trim().slice(0,180)}`));
