const fs = require('fs');
const path = require('path');
function walk(dir){
  let out=[];
  for(const f of fs.readdirSync(dir)){
    const p=path.join(dir,f);
    if(fs.statSync(p).isDirectory()) out=out.concat(walk(p));
    else if(f.endsWith('.ts')) out.push(p);
  }
  return out;
}
const files = walk(path.join(__dirname,'src'));
for(const f of files){
  const t = fs.readFileSync(f,'utf8');
  // find lines defining subC5xx methods (contains 'subC5' and '{' )
  t.split('\n').forEach((ln,i)=>{
    if(/subC5[0-9A-F]{2}/.test(ln) && /[\(\)]/.test(ln) && /subC5[0-9A-F]{2}\(/.test(ln) && /{\s*$/.test(ln.trim())){
      console.log(f+':'+(i+1)+': '+ln.trim());
    }
  });
}
