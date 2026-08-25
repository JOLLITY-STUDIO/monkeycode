const fs=require('fs');
const r=fs.readFileSync('src/asm/dist/tsubasa2.nes');
const p=16; const bs=8192; const bank=r.slice(p+2*bs,p+3*bs);
console.log('bank2 $0000-$00FF:');
for(let i=0;i<256;i+=16){
  console.log('  $'+i.toString(16).padStart(4,'0')+' : '+Array.from(bank.slice(i,i+16)).map(b=>b.toString(16).padStart(2,'0')).join(' '));
}
console.log('\nbank2 $0100-$01FF:');
for(let i=0x100;i<0x200;i+=16){
  console.log('  $'+i.toString(16).padStart(4,'0')+' : '+Array.from(bank.slice(i,i+16)).map(b=>b.toString(16).padStart(2,'0')).join(' '));
}
console.log('\nbank2 $A007 JSR $A000 entry (verify):');
console.log('  bank2[$0000]:', bank[0].toString(16), bank[1].toString(16), bank[2].toString(16));
console.log('  bank2[$0002]:', bank[2].toString(16), bank[3].toString(16), bank[4].toString(16));
console.log('  bank2[$0005]:', bank[5].toString(16), bank[6].toString(16), bank[7].toString(16));
console.log('  bank2[$0007]:', bank[7].toString(16), bank[8].toString(16), bank[9].toString(16));
console.log('  bank2[$000A]:', bank[0xa].toString(16), bank[0xb].toString(16), bank[0xc].toString(16));
