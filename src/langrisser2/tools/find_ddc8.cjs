const fs=require('fs');
const L=fs.readFileSync('20260713/asm/m68k/rom.asm','utf8').split('\n');
// Find 01DDC8 area
for(let i=0;i<L.length;i++){
  if(L[i].includes('$1DDC') && L[i].startsWith(';')) console.log(i+': '+L[i]);
  else if(/^loc_01DDC/.test(L[i])) console.log(i+': '+L[i]);
}
