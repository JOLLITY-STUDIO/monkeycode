const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_02';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm')).sort();
const targets = ['A855', 'A82F', 'A72C', 'A767', 'A8B7', 'A8A3', 'A8A8', '8895', '8920', '8976', 'A655', 'A651', 'A650', '9FA8'];
for (const f of files) {
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = txt.split('\n');
  lines.forEach((ln, i) => {
    const m = ln.match(/(JSR|JMP|BEQ|BNE|BCS|BCC|BPL|BMI|BVC|BVS)\s+\$([0-9A-F]{4})/);
    if (m && targets.includes(m[2])) {
      console.log(`${f}:${i + 1}: ${ln.trim()}`);
    }
  });
}
