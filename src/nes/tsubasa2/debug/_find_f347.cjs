const fs=require('fs');
const r=fs.readFileSync('src/asm/dist/tsubasa2.nes');
const p=16; const bs=8192;
const PC=[0xA036, 0xA039, 0xA03C, 0xA03E, 0xA040, 0xA043, 0xA01B, 0xA026, 0xA02A, 0xA02D, 0xA030, 0xA033];
for(const pc of PC){
  const off=pc-0xA000;
  console.log('=== $'+pc.toString(16).padStart(4,'0')+' (CPU $Axxx, PRG offset in $A000-$BFFF = $'+off.toString(16)+') ===');
  for(const b of [0,1,2,3,4,5,6,7,15,29]){
    const byte=r[p+b*bs+off];
    const next=r[p+b*bs+off+1];
    if(byte===0xFF && next===0xFF) continue;
    const dis = byte===0xBD?'LDA abs X':byte===0x8D?'STA abs':byte===0xE8?'INX':byte===0x88?'DEY':byte===0xD0?'BNE':byte===0xA0?'LDY imm':byte===0xA8?'TAY':byte===0x10?'BPL':byte===0xA9?'LDA imm':'';
    console.log('  bank'+b+' byte=$'+byte.toString(16).padStart(2,'0')+(next!==undefined?' next=$'+next.toString(16).padStart(2,'0'):'')+' = '+dis);
  }
}
