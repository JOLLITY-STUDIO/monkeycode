const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/openning-4097清屏-到循环重新4343出现tecmo又.log','utf8').split('\n');
let cur=0;
const stat={ppu2007:0,ppu2006:0,ppu2000:0,ppu2001:0,palette:0,oamDma:0,chrSwap:0,ramWrite:0};
const byFrame={};
for(const ln of lines){
  const fm=ln.match(/^f(\d+)\s/);
  if(fm)cur=+fm[1];
  if(!byFrame[cur])byFrame[cur]={ppu2007:0,ppu2006:0,ppu2000:0,ppu2001:0,palette:0,oamDma:0,chrSwap:0};
  if(/STA\b.*\$2007\b/.test(ln)){stat.ppu2007++;byFrame[cur].ppu2007++;}
  if(/STA\b.*\$2006\b/.test(ln)){stat.ppu2006++;byFrame[cur].ppu2006++;}
  if(/STA\b.*\$2000\b/.test(ln)){stat.ppu2000++;byFrame[cur].ppu2000++;}
  if(/STA\b.*\$2001\b/.test(ln)){stat.ppu2001++;byFrame[cur].ppu2001++;}
  if(/STA\b.*\$3F00|\$3F10|\$3F14/.test(ln)){stat.palette++;byFrame[cur].palette++;}
  if(/STA\b.*\$4014\b/.test(ln)){stat.oamDma++;byFrame[cur].oamDma++;}
  if(/STA\b.*\$8000\b/.test(ln)){stat.chrSwap++;byFrame[cur].chrSwap++;}
}
console.log('===== TOTAL (整个 log) =====');
console.log('frames seen:',Object.keys(byFrame).length);
console.log('STA $2007 (PPU data):',stat.ppu2007);
console.log('STA $2006 (PPU addr):',stat.ppu2006);
console.log('STA $2000 (PPUCTRL ):',stat.ppu2000);
console.log('STA $2001 (PPUMASK ):',stat.ppu2001);
console.log('STA $3Fxx (palette):',stat.palette);
console.log('STA $4014 (OAM DMA):',stat.oamDma);
console.log('STA $8000 (CHR swap):',stat.chrSwap);

// frame 1-25 first scene first logo
console.log('\n===== 前 25 帧逐帧明细 =====');
for(let f=1;f<=25;f++){
  const o=byFrame[f]||{};
  const sum=(o.ppu2007||0)+(o.ppu2006||0)+(o.palette||0)+(o.oamDma||0);
  console.log(`  f${f}: 2007=${o.ppu2007||0} 2006=${o.ppu2006||0} 2000=${o.ppu2000||0} 2001=${o.ppu2001||0} palette=${o.palette||0} 4014=${o.oamDma||0} chr=${o.chrSwap||0}${sum?' <-- RENDER':''}`);
}

// 找到首次 OAM DMA
console.log('\n===== 首次 OAM DMA ($4014) 出现的帧 =====');
for(let f=1;f<=4500;f++){
  if(byFrame[f]&&byFrame[f].oamDma>0){console.log(`  首次 f${f}: oamDma=${byFrame[f].oamDma}`);break;}
}

// 找到首次 palette write
console.log('\n===== 首次 palette write 出现的帧 =====');
for(let f=1;f<=4500;f++){
  if(byFrame[f]&&byFrame[f].palette>0){console.log(`  首次 f${f}: palette=${byFrame[f].palette}`);break;}
}

// frame 4343 (Tecmo 重现)
console.log('\n===== 4343 附近 5 帧 =====');
for(let f=4338;f<=4348;f++){
  const o=byFrame[f]||{};
  console.log(`  f${f}:`,JSON.stringify(o));
}
