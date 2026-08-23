// 临时脚本：运行 tsc 并将结果写入文件（用完删除）
const { execFileSync } = require('child_process');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const out = path.join(root, 'debug/_tsc_v01.txt');
try {
  const result = execFileSync(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['tsc', '-p', 'tsconfig.json', '--noEmit'],
    { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  );
  require('fs').writeFileSync(out, 'TSC_OK\n' + (result || ''), 'utf8');
  console.log('TSC_OK');
} catch (e) {
  require('fs').writeFileSync(out, 'TSC_FAIL\n' + (e.stdout || e.message || ''), 'utf8');
  console.log('TSC_FAIL exit=' + e.status);
}
