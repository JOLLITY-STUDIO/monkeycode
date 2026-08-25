const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
let cur=0;
const targets=new Set([344,347,348,352,357,358,368,375,380,400,402]);
for(const ln of lines){
  const fm=ln.match(/^f(\d+)\s/);
  if(fm)cur=+fm[1];
  if(!targets.has(cur))continue;
  if(!/STA\b.*\$2007|STA\b.*\$2006|STA\b.*\$4014|STA\b.*\$2000|STA\b.*\$2001|STA\b.*\$8000|JSR\b|JMP\b|LDA\b.*\$05[EF]|LDA\b.*\$06[0-3]|BIT\b|BVC|BVS|BCC|BCS|BPL|BNE|BEQ|RTS|RTI/.test(ln))continue;
  console.log('f'+cur+' '+ln.trim().slice(0,170));
  if(cur>402)break;
}
