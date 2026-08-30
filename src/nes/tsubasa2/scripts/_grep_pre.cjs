// 临时: 搜 prerender / scrollEnd / scroll-prerender 出现点
const cp = require('child_process');
for (const term of ['prerender', 'scrollEnd', 'scrollScan', 'renderStartOverride']) {
  console.log('===== ' + term + ' =====');
  try {
    const out = cp.execSync('findstr /S /N /C:"' + term + '" *.ts *.cjs *.py 2>nul', {
      cwd: process.cwd(), encoding: 'utf8', shell: 'cmd.exe', maxBuffer: 64 * 1024 * 1024,
    });
    const lines = out.split('\n').filter((l) => l.includes('.ts') || l.includes('.cjs') || l.includes('.py'));
    console.log(lines.slice(0, 40).join('\n'));
    console.log('...(total ' + lines.length + ')');
  } catch (e) { console.log('none'); }
}
