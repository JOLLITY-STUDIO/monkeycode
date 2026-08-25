const fs=require('fs');
const lines=fs.readFileSync('docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log','utf8').split('\n');
let cur=0; const seen=new Set();
for (const ln of lines) {
  const fm=ln.match(/^f(\d+)\s/);
  if (fm) cur=+fm[1];
  if (cur<1||cur>4000) continue;
  const pc=ln.match(/\$([0-9A-F]{2}):([0-9A-F]{4}):/);
  if (pc) seen.add(pc[2].toLowerCase());
}
console.log('frame 1-4000 唯一 PC 数:', seen.size);
const sorted=[...seen].sort();
console.log('PC 范围: $'+sorted[0]+' .. $'+sorted[sorted.length-1]);
const groups={6:0,8:0,9:0,10:0,12:0,14:0}; // 0x6000/0x8000/...
for(const pc of sorted){
  const k=parseInt(pc.substring(0,1),16);
  groups[k]=(groups[k]||0)+1;
}
console.log('按 CPU bank 分组:');
console.log('  $6000-$7FFF (PRG-RAM):', groups[6]);
console.log('  $8000-$9FFF (PRG bank 0 / R6):', groups[8]);
console.log('  $A000-$BFFF (PRG bank 1 / R7 → 实际=bk2):', groups[10]);
console.log('  $C000-$DFFF (固定 bank 14):', groups[12]);
console.log('  $E000-$FFFF (固定 bank 15):', groups[14]);
