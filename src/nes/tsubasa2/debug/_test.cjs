const fs = require('fs');
try {
  fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/debug/_test_out.txt', 'hello ' + process.cwd());
  process.stdout.write('OK');
} catch (e) {
  process.stdout.write('ERR ' + e.message);
}
