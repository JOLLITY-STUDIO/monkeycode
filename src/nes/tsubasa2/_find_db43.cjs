const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'asm', 'bank31', '_full.s');
const lines = fs.readFileSync(file, 'utf8').split('\n');
console.log('total lines:', lines.length);
// 找含 $DBxx 或 $8003 或 $003C 的行
lines.forEach((ln, i) => {
  if (/\$DB\d\d|\$8003|\$8005|\$003C|\$003B|\$0540|\$F114|\$F15A/.test(ln)) {
    console.log((i + 1) + ': ' + ln);
  }
});
