const fs = require('fs');
const path = require('path');

const patterns = ['801E', '8027', '802C', '8030', '8032', '804D', '807A', '8297', '84E7', '88CA', '9B28', '9B5E', '8681', '8687', '85EB', '8603', '87B7', '8813', '881A', '8830', '8836', '8854', '8861', '886F', '899A', '8574', '857F', '858C', '85C3', '85D1'];

const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  lines.forEach((ln, i) => {
    for (const p of patterns) {
      // 匹配行尾注释 ; $XXXX 或行首标签
      if (ln.includes('$' + p) || ln.includes(p + ':')) {
        console.log(`${f}:${i + 1}: ${ln.trim()}`);
        break;
      }
    }
  });
}
