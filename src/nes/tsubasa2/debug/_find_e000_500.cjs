const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
const m=[];
for(let i=0;i<lines.length;i++){
  if(/STA\s+\$E00[01]\b/.test(lines[i])) {
    const fm=lines[i].match(/^f(\d+)/);
    if (fm) m.push([+fm[1], i+1, lines[i]]);
  }
}
m.forEach(([f,n,l])=>console.log(`f${f} L${n}: ${l.trim().slice(0,180)}`));

console.log('\n=== 看 f540-f550 完整 timeline (game save 上下文) ===');
let cur=0;
const ctx=[];
for(let i=0;i<lines.length;i++){
  const fm=lines[i].match(/^f(\d+)\s/);
  if(fm)cur=+fm[1];
  if(cur>=540 && cur<=560){
    if(/STA\b|ROR\b|ASL\b|LSR\b|INC\b|DEC\b|JSR\b|JMP\b|BIT\b|BVC|BVS|BPL|BCC|BCS|BNE|BEQ|RTS|RTI|LDA\b.*\$06[0-9A-Fa-f][0-9A-Fa-f]|LDA\b.*\$05[EF][0-9A-Fa-f]|BIT\b.*\$06/.test(lines[i])){
      ctx.push(lines[i].trim().slice(0,180));
    }
  }
}
ctx.forEach(l=>console.log(l));
