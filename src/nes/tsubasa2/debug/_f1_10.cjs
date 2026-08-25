const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
let cur=0;
const seen=new Set();
for(let i=0;i<lines.length;i++){
  const fm=lines[i].match(/^f(\d+)\s/);
  if(fm) cur=+fm[1];
  if(cur>270)break;
  const ln=lines[i];
  if(/STA\s+\$8000\s*=\s*#\$A[67]\b/.test(ln)){
    if(!seen.has(cur)){
      console.log('===== f'+cur+' : R6/R7 swap (PRG bank) =====');
      for(let j=Math.max(0,i-3);j<i+5;j++){
        console.log('L'+(j+1)+': '+lines[j].trim().slice(0,180));
      }
      seen.add(cur);
      console.log();
    }
  }
}
console.log('\n===== f1-f10 PC 分布 =====');
const pcSeen={};
for(const ln of lines){
  const fm=ln.match(/^f(\d+)\s/);
  if(!fm)continue;
  const c=+fm[1];
  if(c<1||c>10)continue;
  const pc=ln.match(/\$([0-9A-Fa-f]{2}):([0-9A-Fa-f]{4}):/);
  if(pc)pcSeen[c]=pcSeen[c]||new Set();
  if(pc)pcSeen[c].add(pc[2].toLowerCase());
}
for(const f of Object.keys(pcSeen).sort((a,b)=>+a-+b)){
  const pcs=[...pcSeen[f]];
  console.log(`f${f}: ${pcs.length} unique PCs, range $${pcs.sort()[0]}..$${pcs.sort().slice(-1)[0]}`);
}
