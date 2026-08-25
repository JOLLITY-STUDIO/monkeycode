// dump f380 全部行，单行重组，并输出所有地址出现统计
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const lines = fs.readFileSync(path.join(DIR, 'tsubasa-when-show380-逐帧.log'), 'utf8').split('\n');
let cur = null, f380 = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s/);
  if (m) { cur = parseInt(m[1]); if (cur > 380) break; }
  if (cur === 380) f380.push(l);
}
// 重新用正则提取每个完整行（log 行可能被折行）
const full = f380.join('\n').replace(/\nf(\d+)\s+c(\d+)\s/i, '\n### f$1 c$2 ');
// 提取 $bb:addr: opcode 序列
const re = /\$([0-9A-F]{2}):([0-9A-F]{4}):\s+([0-9A-F]{2}(?: [0-9A-F]{2}){0,2})\s+([A-Z]{3})/g;
let m, seq = [];
while ((m = re.exec(full))) seq.push(`${m[1]}:${m[2]} ${m[4]}`);
console.log('f380 instr seq:', seq.length);
console.log(seq.join('\n'));
