const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');

// 找 frame 8 的 trace
console.log('===== f8 完整 trace =====');
let inF8=false;
for(const ln of lines){
  const fm=ln.match(/^f(\d+)\s/);
  const c=fm?+fm[1]:0;
  if(c===8)inF8=true;
  if(c===9)break;
  if(inF8)console.log(ln.trim().slice(0,180));
}

console.log('\n===== f270 OAM DMA 前后 30 行 =====');
let idx=lines.findIndex(ln=>/^f270\s/.test(ln));
for(let i=Math.max(0,idx-30);i<idx+5;i++)console.log('L'+(i+1)+': '+lines[i].trim().slice(0,180));
