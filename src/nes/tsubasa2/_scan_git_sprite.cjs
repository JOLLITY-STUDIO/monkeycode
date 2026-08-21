// 扫描 git 历史中 tsubasa2 的 bank22/27/29/sprite/roster 相关文件
const { execSync } = require('child_process');
const out = execSync('git --no-pager log --all --oneline --name-only -- src/nes/tsubasa2', { maxBuffer: 1024 * 1024 * 64 }).toString();
const lines = out.split('\n');
const hits = lines.filter(l => /bank22|bank27|bank29|roster|sprite|Bank22|Bank27|Bank29|Roster|Sprite/i.test(l));
console.log('=== 命中文件 ===');
const set = new Set();
for (const l of hits) {
  const t = l.trim();
  if (t.startsWith('src/nes/tsubasa2/')) set.add(t);
}
for (const s of set) console.log(s);
