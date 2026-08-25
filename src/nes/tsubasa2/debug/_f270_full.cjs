const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
let cur=0;
for(let i=0;i<lines.length;i++){
  const fm=lines[i].match(/^f(\d+)\s/);
  if(fm) cur=+fm[1];
  if(cur===270||cur===272||cur===279||cur===344){
    console.log('L'+(i+1)+': '+lines[i].trim().slice(0,180));
  }
  if(cur===345)break;
}
