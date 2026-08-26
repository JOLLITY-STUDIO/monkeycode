// 后台启动 _emu_full.ts (无 trace), 输出到 _emu_full_run3.log / _emu_full_err3.log
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const root = path.join(__dirname, '..');
const outLog = path.join(root, '_emu_full_run3.log');
const outErr = path.join(root, '_emu_full_err3.log');
fs.writeFileSync(outLog, '');
fs.writeFileSync(outErr, '');
const tsxCli = path.join(process.env.USERPROFILE || '', 'AppData', 'Local', 'npm-cache', '_npx', 'fd45a72a545557e9', 'node_modules', 'tsx', 'dist', 'cli.mjs');
if (!fs.existsSync(tsxCli)) {
  console.error('tsx cli not found:', tsxCli);
  process.exit(1);
}
const child = spawn(process.execPath, [tsxCli, 'scripts/_emu_full.ts'], {
  cwd: root,
  detached: true,
  stdio: ['ignore', fs.openSync(outLog, 'a'), fs.openSync(outErr, 'a')],
});
child.unref();
console.log('launched pid', child.pid);
console.log('log:', outLog);
