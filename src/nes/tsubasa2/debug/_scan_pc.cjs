const fs=require('fs');
const t=fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/tecmo/13.log','utf8');
const lines=t.split('\n');
const pcs=new Set();
const pcByFrame={};
let cur=0;
for(const l of lines){
  const fm=l.match(/^f(\d+)\s/);
  if(fm){cur=parseInt(fm[1]);continue;}
  const m=l.match(/\x24([0-9A-Fa-f]{2}):([0-9A-Fa-f]{4}):/);
  if(m){
    const pc=m[1]+':'+m[2].toUpperCase();
    pcs.add(pc);
    if(!pcByFrame[cur])pcByFrame[cur]=new Set();
    pcByFrame[cur].add(pc);
  }
}
const sorted=[...pcs].sort();
console.log('=== unique PC count:', sorted.length);
console.log(sorted.slice(0,50).join('\n'));
console.log('=== per-frame PC unique counts ===');
for(const f of Object.keys(pcByFrame).sort((a,b)=>+a-+b)){
  console.log('f'+f+': '+pcByFrame[f].size+' unique PCs');
}
