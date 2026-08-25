const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
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
console.log('=== TOTAL (整个 log) ===');
console.log('frames seen:',Object.keys(byFrame).length);
console.log('STA $2007 (PPU data):',stat.ppu2007);
console.log('STA $2006 (PPU addr):',stat.ppu2006);
console.log('STA $2000 (PPUCTRL ):',stat.ppu2000);
console.log('STA $2001 (PPUMASK ):',stat.ppu2001);
console.log('STA $3Fxx (palette):',stat.palette);
console.log('STA $4014 (OAM DMA):',stat.oamDma);
console.log('STA $8000 (CHR swap):',stat.chrSwap);

function findFirst(re,label){
  for(let i=0;i<lines.length;i++)if(re.test(lines[i])){
    const m=lines[i].match(/^f(\d+)/);
    console.log(`首次 ${label} 在 frame ${m?m[1]:'?'} L${i+1}`);
    return i;
  }
  console.log(label+' NOT FOUND');
}
findFirst(/\$3F00\b|\$3F10\b|\$3F14\b/, 'palette ($3Fxx)');
findFirst(/\$3[Ff]0+[Pp]\$/, '随便看 $3Fxx');
findFirst(/\$4014\b/,'OAM DMA');
findFirst(/\$2000\b/,'PPUCTRL');
findFirst(/\$2001\b/,'PPUMASK');
findFirst(/\$2002\b/,'PPUSTATUS');
findFirst(/\$2005\b/,'PPUSCROLL');

// 谁最先写入到 \$3Fxx? 用宽松模式
const c3f2=lines.filter(ln=>/(?<![0-9A-Fa-f])\$3[Ff]0+/.test(ln));
console.log('\n包含可能的 palette 地址行数:',c3f2.length);
console.log('前 5 个:');
c3f2.slice(0,5).forEach((l,idx)=>console.log(`  [${idx}]: ${l.trim().slice(0,200)}`));
