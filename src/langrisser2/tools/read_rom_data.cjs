const fs=require('fs');
const b=fs.readFileSync('20260713/otherversionroms/Langrisser II (Japan) (v1.2-gens-rom-dump_68K.bin');
const addr=0x99F0;
console.log('资源类型跳转表 @ $99F0:');
for(let i=0;i<8;i++){
  const off=(b[addr+i*2]<<8)|b[addr+i*2+1];
  console.log('  type['+i+'] off='+off.toString(16).padStart(4,'0')+' → jsr $'+((0x99F0+off)&0xFFFFF).toString(16));
}
// Also read a few bytes at $1DDC8 to see what's there
console.log('\n$1DDC8 area bytes:');
for(let i=0;i<32;i++){
  console.log('  $'+(0x1DDC0+i).toString(16)+': '+b[0x1DDC0+i].toString(16).padStart(2,'0'));
}
