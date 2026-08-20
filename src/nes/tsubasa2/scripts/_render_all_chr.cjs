// 渲染 chr bank 的全部 tile 到文件，便于人工识别假名所在 bank
const fs = require('fs');
function loadBank(p){
  const s = fs.readFileSync(p,'utf8');
  const m = s.match(/=\s*\[([\s\S]*?)\]/);
  return m[1].split(',').map(x=>x.trim()).filter(x=>/^0x/.test(x)).map(x=>parseInt(x,16));
}
function renderTile(chr, tile){
  const off = tile*16;
  let out='';
  for(let y=0;y<8;y++){
    const p0=chr[off+y], p1=chr[off+8+y];
    for(let x=0;x<8;x++){
      const bit=7-x;
      const c=((p1>>bit)&1)*2+((p0>>bit)&1);
      out += c?'#':' ';
    }
    out+='|';
  }
  return out;
}
// 渲染 tile $00-$5F (含双 tile 的 loTile 范围) 到文件
for(let b=0;b<16;b++){
  const id=b.toString(16).padStart(2,'0');
  const fp=`src/game/data/chr/chr-bank-${id}.ts`;
  if(!fs.existsSync(fp)){ console.log('skip bank',id); continue; }
  const chr=loadBank(fp);
  let out=`=== chr-bank-${id} tile $00-$5F ===\n`;
  for(let t=0;t<0x60;t++){
    out += `tile $${t.toString(16).padStart(2,'0')}: ${renderTile(chr,t)}\n`;
  }
  fs.writeFileSync(`scripts/_chr_render_${id}.txt`, out);
}
console.log('done');
