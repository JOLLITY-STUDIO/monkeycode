// 渲染 chr-bank 指定 tile 范围 (用 read_file 分段查看)
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
const bank=process.argv[2]||'00';
const start=parseInt(process.argv[3]||'80',16);
const end=parseInt(process.argv[4]||'bf',16);
const chr=loadBank(`src/game/data/chr/chr-bank-${bank}.ts`);
let out=`=== chr-bank-${bank} tile $${start.toString(16)}-$${end.toString(16)} ===\n`;
for(let t=start;t<=end;t++) out+=`tile $${t.toString(16).padStart(2,'0')}: ${renderTile(chr,t)}\n`;
fs.writeFileSync(`scripts/_chr_hi_${bank}.txt`, out);
console.log('written');
