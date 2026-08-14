// 临时脚本: 运行 tsubasa2-h5-src 的类型检查，结果写入 _tsc_fresh.txt
// 使用 tsconfig.check.json (无 rootDir, 允许检查外部 rom-data)
const { execSync } = require('child_process');
const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src';
const out = dir + '/_tsc_fresh.txt';
try {
  const o = execSync('npx tsc --noEmit -p tsconfig.check.json', {
    cwd: dir,
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
    shell: 'cmd.exe',
  });
  fs.writeFileSync(out, 'TSC_OK\n' + o);
  console.log('TSC_OK');
} catch (e) {
  fs.writeFileSync(out, 'TSC_ERROR exit=' + e.status + '\n' + ((e.stdout || '') + (e.stderr || '')));
  console.log('TSC_ERROR exit=' + e.status);
}
