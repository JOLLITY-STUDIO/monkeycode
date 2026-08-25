const fs=require('fs');
const r=fs.readFileSync('src/asm/dist/tsubasa2.nes');
const p=16,bs=8192;
const PC=0xA0F1;
const off=PC-0xA000;
for(const b of [0,1,2,3,15,29]){
  const byte=r[p+b*bs+off];
  console.log(`bank${b}[$0F1]=$${byte.toString(16).padStart(2,'0')} (${byte===0x26?'ROL':byte===0xa5?'LDA':byte===0x4a?'LSR':byte===0x85?'STA':byte===0xbd?'LDA absX':byte===0x88?'DEY':byte===0xd0?'BNE':'?'})`);
}
// bank1[$0F1] = ?
console.log('\n各 bank $0F1 字节对照:');
for(const b of [0,1,2,3,7,15,29]){
  const v=r[p+b*bs+off];
  if(v!==0xFF)console.log(`  bank${b}: $${v.toString(16).padStart(2,'0')}`);
}
