const fs=require('fs');
const r=fs.readFileSync('src/asm/dist/tsubasa2.nes');
const p=16,bs=8192,bank=r.slice(p+2*bs,p+3*bs);

// bank2 offset for these CPUs
const targets=[0xA000,0xA160,0xA170,0xA036,0xA043,0xA0ED,0xA01B,0xA8DD];
for(const t of targets){
  const off=t-0xA000;
  const bytes=Array.from(bank.slice(off,off+32)).map(b=>b.toString(16).padStart(2,'0')).join(' ');
  console.log(`bank2 offset $${off.toString(16).padStart(4,'0')} (=CPU $${t.toString(16)}): ${bytes}`);
}
console.log('\n=== bank2 $0160-$016F (JSR $A160 target) ===');
for(let i=0x160;i<0x170;i+=16){
  console.log(` $${i.toString(16).padStart(4,'0')}: `+Array.from(bank.slice(i,i+16)).map(b=>b.toString(16).padStart(2,'0')).join(' '));
}
