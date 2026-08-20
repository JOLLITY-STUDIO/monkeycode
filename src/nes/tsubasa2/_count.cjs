const fs = require('fs');
const f = process.argv[2];
const txt = fs.readFileSync(f, 'utf8');
const body = txt.slice(txt.indexOf('[') + 1, txt.lastIndexOf(']'));
const nums = body.split(',').map(s => s.trim()).filter(s => /^0x[0-9a-fA-F]+$/.test(s));
console.log(f + ' arrayLen=' + nums.length + ' (0x' + nums.length.toString(16) + ')');
// 检查是否有非0xFF的结尾偏移
let lastNonFF = -1;
for (let i = nums.length - 1; i >= 0; i--) {
  if (parseInt(nums[i], 16) !== 0xff) { lastNonFF = i; break; }
}
console.log('lastNonFF index=' + lastNonFF + ' (0x' + lastNonFF.toString(16) + ')');
