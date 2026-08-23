const fs = require('fs');
const l = fs.readFileSync('src/asm/bank00/code_sub.s', 'utf8').split(/\r?\n/);
const pat = /;\s*(\$99F0|\$9A0D|\$9A1F|\$9A35|\$9AB8|\$9ADA|\$9AA2|\$9A71|\$9B07|\$9A4C|\$9A60|\$9A73)/;
l.forEach((s, i) => {
  const m = s.match(pat);
  if (m) console.log(i + 1 + ': ' + s.trim());
});
