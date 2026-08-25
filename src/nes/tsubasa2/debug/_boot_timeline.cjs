const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
let cur=0;
const tl=[]; // [{f, pc, op, event}]

for(const ln of lines){
  const fm=ln.match(/^f(\d+)\s/);
  if(fm) cur=+fm[1];
  // MMMC3 bank swap (track R6=R7 changes)
  if(/STA\s+\$8000\s*=\s*#\$([A-Fa-f][67])\b/.test(ln)){
    const v=ln.match(/=\s*#\$([A-Fa-f][67])\b/);
    tl.push({f:cur, e:`MMC3 R${v[1].toUpperCase()} = bank ${ln.match(/STA\s+\$80([01])/)[1]==='01'?'':'select target = '}${[...ln.matchAll(/=\s*#\$([0-9A-Fa-f]+)/g)].slice(-1)[0][1]}`});
  }
  // 关注 NT write
  if(/STA\s+\$2007\b/.test(ln)){
    tl.push({f:cur, e:`PPU data write (NT/CHR)`});
  }
  // 关注 PPU mask / ctrl
  if(/STA\s+\$2001\b/.test(ln)){tl.push({f:cur, e:`PPUMASK enabled`});}
  if(/STA\s+\$2000\b/.test(ln)){tl.push({f:cur, e:`PPUCTRL set`});}
  // 关注 OAM DMA
  if(/STA\s+\$4014\b/.test(ln)){tl.push({f:cur, e:`OAM DMA from $02xx`});}
  // 全局只看 STA $2007+$2006+$2000+$2001+$4014
}

// 取前 60 个 key frames
const seen=new Set();
const unique=[];
for(const e of tl){
  const key=e.f+'.'+e.e.split('(')[0].split(/\s+/)[0];
  if(seen.has(key))continue;
  seen.add(key);
  unique.push(e);
  if(unique.length>=100)break;
}
unique.forEach(e=>console.log(`f${e.f.toString().padStart(4)}: ${e.e}`));
