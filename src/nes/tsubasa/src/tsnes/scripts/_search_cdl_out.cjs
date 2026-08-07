const fs = require('fs');
const lines = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/_cdl_recheck_out.txt','utf16le').split(/\r?\n/);
const out=[];
for(let i=0;i<lines.length;i++){
  if(/\$9F69|\$98A0|\$9B7F|\$9A43|\$9BA0|\$9FA8|\$9EED/.test(lines[i])) out.push(i+' '+lines[i]);
}
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/_cdl_search.txt',out.join('\n'));
console.log(out.length);
