const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/openning-4097清屏-到循环重新4343出现tecmo又.log','utf8').split('\n');
// 搜所有出现 3F 的行
const c3f=[];
for(let i=0;i<lines.length;i++){
  const ln=lines[i];
  if(/3F/.test(ln) && /3F[0-9A-Fa-f]{2}/.test(ln))c3f.push([i+1,ln]);
}
console.log('包含 "3Fxx" 模式的总行数:',c3f.length);
console.log('前 15 行样本:');
c3f.slice(0,15).forEach(([n,l])=>console.log(`  L${n}: ${l.trim().slice(0,160)}`));

// 看 f270 (首次 OAM DMA) 的前后 50 行
const f270idx=lines.findIndex(ln=>/^f270\s/.test(ln));
console.log('\n===== f270 首次 OAM DMA 周围 (L'+(f270idx-20)+'..L'+(f270idx+30)+') =====');
for(let i=Math.max(0,f270idx-20);i<Math.min(lines.length,f270idx+30);i++){
  console.log('  L'+(i+1)+':',lines[i].trim().slice(0,160));
}
