const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00';
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.s'))) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  // 找 $9EED 或 $9F0F 或 $9F52 或 $9FA8
  for (let i = 0; i < lines.length; i++) {
    if (/9EED|9EF1|9EF3|9EF7|9F0F|9F52|9FA8|9F69|9FB3|9FCC|9FD6|9FE2/.test(lines[i]) && lines[i].trim().length < 100) {
      console.log(`${f}:${i + 1}: ${lines[i].trim()}`);
    }
  }
}
