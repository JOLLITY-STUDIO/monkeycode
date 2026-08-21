const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank11';
for (const f of fs.readdirSync(root)) {
  if (!f.endsWith('.s')) continue;
  const lines = fs.readFileSync(root + '/' + f, 'utf8').split('\n');
  lines.forEach((ln, i) => {
    if (ln.includes('$810C') || ln.includes('$8104') || (ln.includes('; $810') && i > 0)) {
      console.log(`${f}:${i + 1}: ${ln.trim()}`);
    }
  });
}
