const fs = require('fs');
const f = 'trace/Captain Tsubasa II - Super Striker (Japan)-openning2.log';
const buf = fs.readFileSync(f, 'utf-8');
const out = [];

// 找音效初始化相关行：06:8349, 06:8002
let cnt = 0;
for (const line of buf.split('\n')) {
  if (line.includes('06:8349') || line.includes('06:8002') || line.includes('06:834B') || (line.includes('0700,') || line.includes('0700  '))) {
    out.push(line.trim());
    cnt++;
    if (cnt >= 200) break;
  }
}
fs.writeFileSync('_music_result1.txt', out.join('\n'), 'utf-8');
console.log('Part1 done, found', out.length, 'lines');

// 第二部分：找 $4015 写入
const out2 = [];
cnt = 0;
for (const line of buf.split('\n')) {
  if (line.includes('4015')) {
    out2.push(line.trim());
    cnt++;
    if (cnt >= 50) break;
  }
}
fs.appendFileSync('_music_result1.txt', '\n\n=== 4015 ===\n' + out2.join('\n'), 'utf-8');
console.log('Part2 done, found', out2.length, 'lines');

// 第三部分：找 $8349 的调用上下文
const out3 = [];
let found = false;
for (const line of buf.split('\n')) {
  if (line.includes('8349') && (line.includes('JSR') || line.includes('20 49 83'))) {
    out3.push(line.trim());
    found = true;
  }
  if (out3.length >= 100) break;
}
fs.appendFileSync('_music_result1.txt', '\n\n=== JSR 8349 ===\n' + out3.join('\n'), 'utf-8');
console.log('Part3 done, found', out3.length, 'lines');

// 第四部分：找音频请求槽 0700 的写入
const out4 = [];
cnt = 0;
for (const line of buf.split('\n')) {
  if (line.match(/[89]D\s+00\s+07[,\s]/) || line.match(/\s00\s+07\)/)) {
    out4.push(line.trim());
    cnt++;
    if (cnt >= 100) break;
  }
}
fs.appendFileSync('_music_result1.txt', '\n\n=== Write to 0700-0705 ===\n' + out4.join('\n'), 'utf-8');
console.log('Part4 done, found', out4.length, 'lines');

console.log('All done, output in _music_result1.txt');
