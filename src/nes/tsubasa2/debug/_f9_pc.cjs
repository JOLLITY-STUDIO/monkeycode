const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');
const PC_A0F1 = [];
for(let i=0;i<lines.length;i++){
  if(/^f9\s/.test(lines[i])) PC_A0F1.push(i);
  if(PC_A0F1.length>=3)break;
}
// 看 f9 trace 的具体模式（PC shift: $A0ED-$A0FA）
let cur=0;
for(let i=0;i<lines.length;i++){
  const fm=lines[i].match(/^f(\d+)\s/);
  if(fm)cur=+fm[1];
  if(cur===9){
    console.log('L'+(i+1)+': '+lines[i].trim().slice(0,180));
  }
  if(cur===10)break;
}

// 验证: PC $A0F1 在 bank1 的字节 vs bank2
console.log('\n=== PC byte at $A0F1 in various PRG banks (CPU area) ===');
const r=fs.readFileSync('src/asm/dist/tsubasa2.nes');
const p=16,bs=8192;
const pc=$A0F1||0xA0F1;
const off=$A0F1-$A000;
for(const b of [0,1,2,3,15,29]){
  const byte=r[p+b*bs+off];
  console.log(`bank${b}[$0F1]=$${byte.toString(16).padStart(2,'0')} -> `+(byte===0x26?'ROL!':byte===0xa5?'LDA':byte===0x4a?'LSR':'?'));
}
