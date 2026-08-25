const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
const m=[];
for(let i=0;i<lines.length;i++){
  if(/STA\s+\$E00[01]\b/.test(lines[i])) m.push([i+1,lines[i]]);
}
console.log('STA $E000/$E001 总数:',m.length);
m.slice(0,5).forEach(([n,l])=>console.log(`L${n}: ${l.trim().slice(0,180)}`));
m.slice(-5).forEach(([n,l])=>console.log(`L${n}: ${l.trim().slice(0,180)}`));
