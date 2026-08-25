const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/openning-4097清屏-到循环重新4343出现tecmo又.log','utf8').split('\n');

function findFirst(re, label) {
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) {
      console.log('=== 首次 '+label+' (L'+(i+1)+') ===');
      for (let j = Math.max(0,i-2); j < Math.min(lines.length, i+3); j++) {
        console.log('  L'+(j+1)+': '+lines[j].trim().slice(0,180));
      }
      return i;
    }
  }
  console.log(label+' NOT FOUND');
  return -1;
}

findFirst(/\$4014\b/, 'STA $4014 (OAM DMA)');
findFirst(/\$2001\b/, 'STA $2001 (PPUMASK)');
findFirst(/\$2000\b/, 'STA $2000 (PPUCTRL)');
findFirst(/\$3f/i, 'ANY $3F pattern (palette search)');
findFirst(/\$2002\b/, 'read $2002 (PPUSTATUS)');
findFirst(/\$2005\b/, 'write $2005 (PPUSCROLL)');

// 看任何包含 00 3F (=$3F00 short form) 或 10 3F (=$3F10)
const c3f00 = lines.filter(ln => /\b00 3F\b|\b10 3F\b|\b14 3F\b/.test(ln) || /\$3f/i.test(ln));
console.log('\n包含可能的 palette 地址行数:', c3f00.length);
console.log('前 10 个:');
c3f00.slice(0,10).forEach((l,idx) => console.log('  ['+idx+']:', l.trim().slice(0,180)));
