const fs = require('fs');
const path = require('path');

function walk(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (f === 'node_modules' || f === '.git') continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) out = out.concat(walk(p));
    else if (p.endsWith('.ts')) out.push(p);
  }
  return out;
}

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir);
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((ln, i) => {
    // $0200 / 0x0200 / HW_BASE 相关消费 (排除 ramKey 定义自身)
    if (/0x0200|\$0200|HW_BASE|copyToHw|oamDma|dmaSprite/i.test(ln) && !/ram_0200'\]/i.test(ln)) {
      console.log(f + ':' + (i + 1) + ': ' + ln.trim());
    }
  });
}
