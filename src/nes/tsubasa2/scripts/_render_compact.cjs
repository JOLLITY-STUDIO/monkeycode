// 紧凑渲染 chr-bank-00 全部 tile
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
const chr = loadBank('src/game/data/chr/chr-bank-00.ts');
let out='';
for(let t=0;t<0x100;t++){
  out += `tile $${t.toString(16).padStart(2,'0')}: ${renderTile(chr,t)}\n`;
}
fs.writeFileSync('scripts/_chr_00_full.txt', out);
console.log('done');
