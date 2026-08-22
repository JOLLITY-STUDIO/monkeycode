const fs = require('fs');
const lines = fs.readFileSync('asm/bank00/code_main.s', 'utf8').split('\r\n');
for (let i = 55; i < 110; i++) {
  const t = lines[i].trim();
  if (t.length > 0) console.log(i, t);
}
console.log('--- $826A 段 (line 240-300) ---');
for (let i = 240; i < 300; i++) {
  const t = lines[i].trim();
  if (t.length > 0) console.log(i, t);
}
