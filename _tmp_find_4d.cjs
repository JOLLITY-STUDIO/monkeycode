const fs=require('fs');
['bank_00.asm','bank_01.asm','bank_02.asm','bank_03.asm'].forEach(fn=>{
  try{const s=fs.readFileSync('_tmp_bzk_out/'+fn,'utf8').split('\n');
  for(let i=0;i<s.length;i++){
    if(/STA \$4D\b|STX \$4D\b|STY \$4D\b|STA \$4E\b|STX \$4E\b|LDA #.*\n.*STA \$4D/.test(s[i]))
      console.log(fn+':'+(i+1)+': '+s[i]);
  }}catch(e){}
});
// Also search for 84E3 which is the loop entry
console.log('---');
['bank_00.asm','bank_01.asm','bank_02.asm'].forEach(fn=>{
  try{const s=fs.readFileSync('_tmp_bzk_out/'+fn,'utf8').split('\n');
  for(let i=0;i<s.length;i++){
    if(/JMP.*\$84E3|JSR.*\$84E3/.test(s[i]))
      console.log('JMP/JSR 84E3: '+fn+':'+(i+1)+': '+s[i]);
  }}catch(e){}
});
