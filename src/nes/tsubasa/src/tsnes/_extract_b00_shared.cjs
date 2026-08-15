const fs = require('fs');
const text = fs.readFileSync('_tmp_bzk_out/_b00_routines.txt', 'utf8');
// 需要 Bank 01 调用的 Bank 00 共享例程
const want = [
  '88CA', '9895', '98E8', '98EA', '98DF', '98A0',
  '97AB', '97AD', '97B6', '97B8',
  '997A', '997E', '99F0',
  '9D27', '9D50', '9DB5', '9DEE', '9E0C', '9E4F', '9E7C', '9D08', '9D73', '9D8E',
  '9C3A', '9C28', '9C71', '9CC9', '9CD3', '9C3C', '9C0D', '9BE3', '9BE8', '9BE8',
  '9BA0', '9FA8', '9B6F', '9B74', '9B7F', '89A3', '9CA0', '9C2C',
];
const sections = text.split(/^===== \$/m).slice(1);
const out = [];
for (const sec of sections) {
  const addrMatch = sec.match(/^([0-9A-F]{4}) =====/);
  const addr = addrMatch ? addrMatch[1] : '';
  if (want.includes(addr)) {
    // 输出该段：恢复 ==== 前缀
    out.push('===== $' + sec.trimEnd());
  }
}
fs.writeFileSync('_b00_shared_out.txt', out.join('\n\n'), 'utf8');
console.log('sections extracted:', out.length);
