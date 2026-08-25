const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
const idx=lines.findIndex(ln=>/STA\s+\$E000/.test(ln));
console.log('First STA $E000 at L'+idx+', context:');
for(let i=idx-30;i<idx+10;i++){
  console.log('L'+(i+1)+': '+lines[i].trim().slice(0,200));
}
