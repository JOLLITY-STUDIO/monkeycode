const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/.codebuddy/agents';
const targets = ['bank29翻译工程师.md', 'bank27翻译工程师.md', 'bank28翻译工程师.md'];
for (const f of targets) {
  const p = dir + '/' + f;
  const buf = fs.readFileSync(p);
  const head = buf.slice(0, 16);
  const hex = Array.from(head).map(b => b.toString(16).padStart(2, '0')).join(' ');
  const utf8Name = /^name:\s*(.+)$/m.exec(buf.toString('utf8'))?.[1]?.trim() || '?';
  console.log(f);
  console.log('  size=' + buf.length + '  headHex=' + hex + '  frontmatter name=' + utf8Name);
}
// 列出目录中所有 md 的 name
console.log('\nall agent names:');
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.md')) continue;
  const t = fs.readFileSync(dir + '/' + f, 'utf8');
  const m = /^name:\s*(.+)$/m.exec(t);
  console.log('  [' + f + '] -> name=' + (m ? m[1].trim() : 'NONE'));
}
