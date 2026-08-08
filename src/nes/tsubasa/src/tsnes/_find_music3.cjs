const fs = require('fs');
const f = 'trace/Captain Tsubasa II - Super Striker (Japan)-openning2.log';
const buf = fs.readFileSync(f, 'utf-8');
const out = [];

// 搜索：1) write to 0700-0705 2) bank switch 3) bank12 JSR $8349
let cnt = 0;
for (const line of buf.split('\n')) {
  const t = line.trim();
  if (!t) continue;

  // Write to $0700-$0705 (not read)
  if ((t.match(/8D\s+0[0-5]\s+07/) || t.match(/9D\s+0[0-5]\s+07/) || t.match(/99\s+0[0-5]\s+07/)) 
      && !t.includes('LDY') && !t.includes('LDA') && !t.includes('BIT') && !t.includes('CMP')) {
    out.push('WR: ' + t);
    cnt++;
  }
  
  // MMC3 bank register writes ($8000-$8001 or read-only $8000)
  if (t.includes('$8000') || t.includes('$8001')) {
    out.push('BK: ' + t);
    cnt++;
  }

  // JSR $8349
  if (t.includes('JSR $8349') || t.includes('20 49 83')) {
    out.push('INIT: ' + t);
    cnt++;
  }
  
  if (cnt >= 300) break;
}
fs.writeFileSync('_music_result3.txt', out.join('\n'), 'utf-8');
console.log('Found', out.length, 'lines');

// 额外：搜索 $06:8349 开头的行（音效初始化入口被调用）
const out2 = [];
cnt = 0;
for (const line of buf.split('\n')) {
  if (line.includes('06:8349') || line.includes('06:8350')) {
    out2.push(line.trim());
    cnt++;
    if (cnt >= 50) break;
  }
}
fs.appendFileSync('_music_result3.txt', '\n\n=== 06:8349/8350 ===\n' + out2.join('\n'), 'utf-8');
console.log('Found', out2.length, 'lines for 8349');
