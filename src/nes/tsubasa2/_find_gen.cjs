// 找到生成 OpeningFrameTable 的脚本
const fs = require('fs');
const files = fs.readdirSync('scripts').filter(f => f.endsWith('.ts') || f.endsWith('.cjs'));
for (const f of files) {
  const p = 'scripts/' + f;
  const t = fs.readFileSync(p, 'utf8');
  if (t.includes('OpeningFrameTable') && (t.includes('cv') || t.includes('scroll') || t.includes('emu-full'))) {
    console.log('=== ' + f + ' ===');
  }
}
