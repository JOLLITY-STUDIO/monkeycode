const fs = require('fs');
const lines = fs.readFileSync('trace/Captain Tsubasa II - Super Striker (Japan)-openning2.log','utf-8').split('\n');

// 找 $8349 (音效初始化入口) 和 $8002 (请求处理入口)
// 也找 STA $0700,X 的写法
console.log('=== Search for audio init / request patterns ===');
const matches = [];
lines.forEach((l, i) => {
  const upper = l.toUpperCase();
  if (
    upper.includes('06:8349') || upper.includes('06:8002') || upper.includes('06:834B') ||
    upper.includes('0700,') || upper.includes('0700  ') ||
    (upper.includes('STA') && upper.includes('0700'))
  ) {
    matches.push(`${i+1}: ${l.trim()}`);
  }
});
console.log(matches.slice(0, 300).join('\n'));

// Also search for $4015 writes
console.log('\n=== $4015 writes ===');
const apuMatches = [];
lines.forEach((l, i) => {
  if (l.indexOf('4015') >= 0) apuMatches.push(`${i+1}: ${l.trim()}`);
});
console.log(apuMatches.slice(0, 50).join('\n'));

// Search for JSR $8349 calls
console.log('\n=== JSR $8349 calls ===');
const jsrMatches = [];
lines.forEach((l, i) => {
  if (l.indexOf('8349') >= 0) jsrMatches.push(`${i}: ${l.trim()}`);
});
console.log(jsrMatches.slice(0, 100).join('\n'));

// Search for A=XX 8D 00 07 pattern (writing to $0700)
console.log('\n=== Write to $0700 ===');
const writeMatches = [];
lines.forEach((l, i) => {
  if (l.match(/A9[\s0-9A-F]*8D\s+00\s+07/)) writeMatches.push(`${i}: ${l.trim()}`);
});
console.log(writeMatches.slice(0, 100).join('\n'));
