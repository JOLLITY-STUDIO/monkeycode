// 临时: 找 OpeningFrameTable 生成器 / 帧数据结构
const cp = require('child_process');
const terms = ['opening-title', 'OPENING_FRAMES_SCENE', 'scroll-prerender', 'OpeningFrameEntry', 'getOpeningFrame'];
for (const t of terms) {
  console.log('===== ' + t + ' =====');
  try {
    const out = cp.execSync('cmd /c findstr /S /N /C:"' + t + '" *.ts *.cjs *.py', {
      cwd: process.cwd(), encoding: 'utf8', maxBuffer: 128 * 1024 * 1024,
    });
    const lines = out.split(/\r?\n/).filter((l) => /\.(ts|cjs|py):/.test(l) && !/\.run\.cjs/.test(l));
    console.log(lines.slice(0, 30).join('\n'));
    console.log('...(total ' + lines.length + ')');
  } catch { console.log('none'); }
}
