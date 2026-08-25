const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/openning-4097清屏-到循环重新4343出现tecmo又.log','utf8').split('\n');

// 寻找从 f1 到 f269 之间, 任何写 RAM/SPRITE/OAM 的位置
// 都包括 $02xx,$03xx,$04xx,$05xx
let cur=0;
const out=[];
for(const ln of lines){
  const fm=ln.match(/^f(\d+)\s/);
  if(fm)cur=+fm[1];
  if(cur<1||cur>270)continue;
  if(/STA\b.*\$0[0-7][0-9A-Fa-f][0-9A-Fa-f]/.test(ln))out.push([cur,ln]);
}
console.log('f1-f270 之间所有写 $00xx-$07xx 总数:',out.length);
// 采样按类型分类
const samples={};
for(const[_,ln] of out){
  const m=ln.match(/STA\b.*\$([0-7][0-9A-Fa-f][0-9A-Fa-f])/);
  if(!m)continue;
  const a=m[1].toLowerCase();
  const bank=a.substring(0,1);
  if(!samples[bank])samples[bank]=[];
  samples[bank].push(ln);
}
console.log('\n按高位字节分组:');
for(const k of Object.keys(samples)){
  console.log(`  $${k}xx 有 ${samples[k].length} 个写入, 例如:`);
  samples[k].slice(0,3).forEach(l=>console.log('    '+l.trim().slice(0,160)));
}

// 看 f260-f270 之间所有 STA $0xxx (OAM 装载准备)
console.log('\n===== f260-f270 之间 STA $0xxx 详细 =====');
for(const ln of lines){
  const fm=ln.match(/^f(\d+)\s/);
  if(!fm)continue;
  const c=+fm[1];
  if(c<260||c>275)continue;
  if(/STA\b.*\$0[0-7][0-9A-Fa-f][0-9A-Fa-f]/.test(ln)){
    console.log('f'+c+' '+ln.trim().slice(0,180));
  }
}
