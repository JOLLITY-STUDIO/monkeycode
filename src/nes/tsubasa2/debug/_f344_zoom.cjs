const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
let cur=0;
const out=[];
for(const ln of lines){
  const fm=ln.match(/^f(\d+)\s/);
  if(fm) cur=+fm[1];
  if(cur>=344 && cur<=420){
    if(/STA\b.*\$2007|STA\b.*\$2006|STA\b.*\$4014|STA\b.*\$2000|STA\b.*\$2001|STA\b.*\$8000|JSR\b|JMP\b|LDA\b.*\$05[EF]|LD[A]\s+#\$3[Ff]|BIT\b|LDA\b.*\$06[0-9A-F][0-9A-F]|BVC|BVS|BMI|BPL|BNE|BEQ/.test(ln)){
      out.push(ln.trim().slice(0,180));
    }
  }
  if(cur>420)break;
}
out.forEach(l=>console.log(l));
