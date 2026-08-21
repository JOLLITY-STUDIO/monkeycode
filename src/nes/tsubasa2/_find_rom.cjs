const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank28';
if (fs.existsSync(root)) {
  for (const f of fs.readdirSync(root)) {
    console.log('FILE:', f);
    const lines = fs.readFileSync(path.join(root, f), 'utf8').split('\n');
    // 找 $8000 附近的代码 (入口)
    lines.forEach((ln, i) => {
      if (ln.includes('$8000') || (i < 30)) {
        if (i < 40) console.log(`${i + 1}| ${ln}`);
      }
    });
  }
} else {
  console.log('NO bank28 asm dir');
}
