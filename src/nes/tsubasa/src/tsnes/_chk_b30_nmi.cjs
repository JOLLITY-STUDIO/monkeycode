const b=require('./rom-data/prg-bank-30').default;
const o=0x05F0;
console.log('Bank30 NMI at C5F0:');
for(let i=0;i<48;i+=16){
  let s=(0xC5F0+i).toString(16).toUpperCase()+':';
  for(let j=0;j<16;j++)s+=' '+b[o+i+j].toString(16).padStart(2,'0');
  console.log(s);
}
