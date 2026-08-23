const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00';
const files = fs.readdirSync(dir).filter(f=>f.endsWith('.s'));
for(const f of files) {
  const lines = fs.readFileSync(dir+'/'+f,'utf8').split(/\r?\n/);
  for(let i=0;i<lines.length;i++) {
    if(lines[i].includes('$9538') || lines[i].includes('$9539') || lines[i].includes('$9536') || lines[i].includes('$9534')) {
      console.log(f+':'+(i+1)+': '+lines[i].trim());
      for(let j=1;j<=20&&i+j<lines.length;j++) console.log('  '+(i+j+1)+': '+lines[i+j].trim());
      console.log('');
    }
  }
}
