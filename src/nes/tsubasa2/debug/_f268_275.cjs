const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/openning-4097清屏-到循环重新4343出现tecmo又.log','utf8').split('\n');
const idx270 = lines.findIndex(ln=>/^f270\s/.test(ln));

console.log('===== f268-f275 完整 trace (OAM 装载 + DMA) =====');
for(let i=Math.max(0,idx270-60);i<idx270+40;i++){
  console.log('L'+(i+1)+': '+lines[i].trim().slice(0,180));
}
