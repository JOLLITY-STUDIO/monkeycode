// 临时：从 asm 提取文本字节序列并解码（用当前 char-map）
const fs = require('fs');
// 简单解码：单 tile $00-$9F 用现映射，双 tile 用占位
const single = {
  0x02:'0',0x03:'1',0x04:'2',0x05:'3',0x06:'4',0x07:'5',0x08:'6',0x09:'7',0x0A:'8',0x0B:'9',
  0x0C:'ア',0x0D:'イ',0x0E:'ウ',0x0F:'エ',0x10:'オ',0x11:'カ',0x12:'キ',0x13:'ク',0x14:'ケ',0x15:'コ',
  0x16:'サ',0x17:'シ',0x18:'ス',0x19:'セ',0x1A:'ソ',0x1B:'タ',0x1C:'チ',0x1D:'ツ',0x1E:'テ',0x1F:'ト',
  0x41:'A',0x42:'B',0x43:'C',0x44:'D',0x45:'E',0x46:'F',0x47:'G',0x48:'H',0x49:'I',0x4A:'J',
  0x4B:'K',0x4C:'L',0x4D:'M',0x4E:'N',0x4F:'O',0x50:'P',0x51:'Q',0x52:'R',0x53:'S',0x54:'T',
  0x55:'U',0x56:'V',0x57:'W',0x58:'X',0x59:'Y',0x5A:'Z',
};
function dec(bytes){
  let out='';
  for(const b of bytes){
    if(b<0xA0){ out+= single[b] ?? `[${b.toString(16).toUpperCase()}]`; }
    else if(b<=0xD7){ out+= `[${b.toString(16).toUpperCase()}]`; }
    else { out+= `<${b.toString(16).toUpperCase()}>`; }
  }
  return out;
}
// 从 _full.s 提取所有 .byte 序列，找 $E1 之后到控制字节前的文本
const src = fs.readFileSync('asm/bank03/_full.s','utf8');
const lines = src.split('\n');
let bytes=[];
for(const line of lines){
  const m = line.match(/\.byte\s+((?:\$[0-9A-Fa-f]{2}(?:,\s*)?)+)/);
  if(m){
    const arr = m[1].split(',').map(s=>s.trim().replace('$','')).filter(s=>/^[0-9A-Fa-f]{2}$/.test(s)).map(s=>parseInt(s,16));
    bytes.push(...arr);
  }
}
// 找文本段：$E1 后 1 字节位置，然后到 $FC/$E0/$E8 等控制
let i=0;
const texts=[];
while(i<bytes.length){
  const b=bytes[i];
  if(b===0xE1 && (bytes[i+1]===0x40||bytes[i+1]===0xDC||bytes[i+1]===0xDD)){
    const start=i+2;
    let j=start;
    const seg=[];
    while(j<bytes.length){
      const c=bytes[j];
      // 控制/结束
      if(c>=0xE0 || c===0xFC || (c>=0xDB&&c<=0xDF)) break;
      seg.push(c); j++;
    }
    if(seg.length>0){ texts.push(dec(seg)); }
    i=j;
  } else i++;
}
for(const t of texts.slice(0,60)) console.log(t);
