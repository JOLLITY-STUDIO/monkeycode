const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank02/code_sub.s';
const lines = fs.readFileSync(p,'utf8').split(/\r?\n/);
for(let i=0;i<lines.length;i++){
  if(lines[i].match(/\$953[0-9A-Fa-f]/) || lines[i].match(/\$954[0-9A-Fa-f]/) || lines[i].match(/\$957[0-9A-Fa-f]/) || lines[i].match(/\$956[0-9A-Fa-f]/)){
    console.log((i+1)+': '+lines[i].trim());
    for(let j=1;j<=10&&i+j<lines.length;j++) console.log('  '+(i+j+1)+': '+lines[i+j].trim());
    console.log('');
  }
}
