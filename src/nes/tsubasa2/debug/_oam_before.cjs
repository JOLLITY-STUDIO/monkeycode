const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/openning-4097清屏-到循环重新4343出现tecmo又.log','utf8').split('\n');
const idx270 = lines.findIndex(ln=>/^f270\s/.test(ln));

console.log('===== f270 之前 100 行 (boot init filling $0200) =====');
for(let i=Math.max(0,idx270-100);i<idx270;i++){
  const ln=lines[i];
  if(/STA\b.*\$0[2-5][0-9A-F][0-9A-F]|LDA\b.*\$0[2-5][0-9A-F][0-9A-F]|LDX\b|LDY\b|JSR\b/i.test(ln)){
    const m=ln.match(/^f(\d+)/);
    if(m && (+m[1])>=265)console.log('f'+m[1]+' L'+(i+1)+': '+ln.trim().slice(0,180));
  }
}
