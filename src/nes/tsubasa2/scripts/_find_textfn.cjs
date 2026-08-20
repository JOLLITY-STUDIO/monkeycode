// 在 bank00 反汇编中搜索文本字符处理函数 88CA 附近的代码
const fs = require('fs');
const files = [];
for(let i=1;i<=5;i++){
  const p=`_tmp_bzk_out/bank_00/bank_00_part0${i}.asm`;
  if(fs.existsSync(p)) files.push(p);
}
// 搜索 88CA
for(const f of files){
  const lines=fs.readFileSync(f,'utf8').split('\n');
  for(let i=0;i<lines.length;i++){
    if(/88CA|88C|8A14|8AB4/.test(lines[i])){
      console.log(`== ${f} L${i}: ${lines[i].trim()}`);
    }
  }
}
