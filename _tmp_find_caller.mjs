const fs=require('fs');
const files=['bank_00.asm','bank_01.asm','bank_02.asm','bank_30.asm','bank_31.asm'];
files.forEach(fn=>{
  try {
    const s=fs.readFileSync('_tmp_bzk_out/'+fn,'utf8').split('\n');
    for(let i=0;i<s.length;i++){
      if(/JSR.*\$9A31|JSR.*\$9A4C|JSR.*\$9A60/.test(s[i])){
        console.log(fn+':'+(i+1)+': '+s[i]);
      }
    }
  } catch(e) {}
});
