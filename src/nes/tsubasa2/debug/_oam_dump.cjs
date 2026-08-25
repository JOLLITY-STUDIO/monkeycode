const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/openning-4097清屏-到循环重新4343出现tecmo又.log','utf8').split('\n');

// 给定第一个 OAM DMA 帧 f270, 看 DMA 之前 CPU 做了什么, OAM buffer 怎么填的
console.log('===== f270 之前 50 行 (boot init) =====');
const idx270 = lines.findIndex(ln=>/^f270\s/.test(ln));
if(idx270>=0){
  for(let i=Math.max(0,idx270-50);i<idx270+5;i++)console.log('L'+(i+1)+': '+lines[i].trim().slice(0,180));
}

console.log('\n===== f270 OAM DMA 之前 CPU 在 $01:A000-$A009 区域 =====');
// 看 DMA 之前装了什么到 $0200
for(let i=Math.max(0,idx270-200);i<idx270+5;i++){
  const ln=lines[i];
  if(/STA\b.*\$0200|\$0201|\$0202|\$0203|LDX\b|LDY\b/.test(ln)&&!/i\d{6,}/.test(ln.substring(0,50)))console.log('L'+(i+1)+': '+ln.trim().slice(0,180));
}
