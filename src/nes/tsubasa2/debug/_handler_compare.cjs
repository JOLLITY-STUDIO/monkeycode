const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/opening-all.log','utf8').split('\n');

// 找所有 JSR $A160 (handler 触发次数)
const jsrA160=[];
const jsrA000=[];
for(let i=0;i<lines.length;i++){
  const m=lines[i].match(/^f(\d+)/);
  if(!m)continue;
  if(/JSR\s+\$A160\b/.test(lines[i]))jsrA160.push(+m[1]);
  if(/JSR\s+\$A000\b/.test(lines[i]))jsrA000.push(+m[1]);
}
console.log('JSR $A000 (Scene0 init handler) count:',jsrA000.length);
console.log('  触发帧:',jsrA000.slice(0,20).join(', '));
console.log('\nJSR $A160 (other handler) count:',jsrA160.length);
console.log('  触发帧:',jsrA160.slice(0,20).join(', '));
console.log('  最后 20:',jsrA160.slice(-20).join(', '));

// 看 f270 是 A000 还是 A160
console.log('\n=== f270 触发 handler ===');
for(const ln of lines){
  const fm=ln.match(/^f(\d+)/);
  if(!fm)continue;
  if(+fm[1]===270 && /JSR\s+\$/.test(ln))console.log(ln.trim().slice(0,180));
}
console.log('\n=== f402 触发 handler ===');
for(const ln of lines){
  const fm=ln.match(/^f(\d+)/);
  if(!fm)continue;
  if(+fm[1]===402 && /JSR\s+\$/.test(ln))console.log(ln.trim().slice(0,180));
}

// 看多少次 slot dispatch 触发?
const dispatches=[];
let cur=0;
for(const ln of lines){
  const fm=ln.match(/^f(\d+)/);
  if(fm)cur=+fm[1];
  if(/\$0F:C821:.*BIT \$1B/.test(ln))dispatches.push(cur);
}
console.log('\n6-slot dispatcher 触发次数 (标记 BIT $1B):',dispatches.length);
console.log('前 30:',dispatches.slice(0,30).join(', '));
console.log('尾 30:',dispatches.slice(-30).join(', '));
