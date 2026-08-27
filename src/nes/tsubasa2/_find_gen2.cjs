// 找到写 OpeningFrameTable.ts 的生成脚本
const fs = require('fs');
const paths = ['scripts', 'tools', 'test', '.'];
const hits = [];
for (const dir of paths) {
  if (!fs.existsSync(dir)) continue;
  const walk = (d) => {
    for (const f of fs.readdirSync(d)) {
      const p = d + '/' + f;
      if (f.startsWith('node_modules') || f.startsWith('dist') || f.startsWith('.git')) continue;
      const st = fs.statSync(p);
      if (st.isDirectory()) { if (dir === '.' && d === '.') continue; walk(p); }
      else if (f.endsWith('.cjs') || f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.py')) {
        try {
          const t = fs.readFileSync(p, 'utf8');
          if (t.includes('OPENING_FRAMES') || (t.includes('OpeningFrameTable') && (t.includes('opening-frame') || t.includes('cv') || t.includes('emu-full')))) {
            hits.push(p);
          }
        } catch (e) {}
      }
    }
  };
  walk(dir);
}
console.log(hits.join('\n'));
