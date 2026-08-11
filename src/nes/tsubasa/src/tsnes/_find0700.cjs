// 搜索所有 bank 反汇编中写入 $0700-$0705（SE 请求槽）的位置
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm'));
let total = 0;
for (const f of files) {
  const s = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = s.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    // STA/STX/STY ram_0700..0705
    if (/S[TXY]\s*$/.test(lines[i]) === false) continue;
    const m = lines[i].match(/(0x0180[0-9A-Fa-f]{3})[^\n]*?\n([^\n]*?)\n(ram_070[0-5])/);
    // 简化：直接找 "ram_070" 模式
  }
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/ram_070[0-5]/);
    if (m && lines[i].includes('ST')) {
      const addrM = lines[i].match(/(0x[0-9A-Fa-f]{8})/);
      const bank = f.replace('.asm', '');
      hits.push(`${bank} @${addrM ? addrM[1] : '?'}: ${lines[i].trim()} ${(lines[i+1]||'').trim()} ${(lines[i+2]||'').trim()} ${(lines[i+3]||'').trim()} ${(lines[i+4]||'').trim()}`);
    }
  }
  if (hits.length > 0) {
    console.log(`--- ${f} (${hits.length}) ---`);
    for (const h of hits.slice(0, 40)) console.log(h);
    total += hits.length;
  }
}
console.log('\ntotal hits:', total);
