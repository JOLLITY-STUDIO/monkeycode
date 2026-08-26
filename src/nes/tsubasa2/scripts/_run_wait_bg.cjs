// 后台启动 _wait_full.cjs (轮询全量完成 -> 验证/补拼 emu-full-all.log), 立即返回。
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const outLog = fs.openSync(path.join(root, '_wait_full.log'), 'w');
const errLog = fs.openSync(path.join(root, '_wait_full_err.log'), 'w');

const child = spawn(process.execPath, [path.join(__dirname, '_wait_full.cjs')], {
  cwd: root,
  stdio: ['ignore', outLog, errLog],
  detached: true,
});
child.unref();
console.log('spawned wait pid=' + child.pid + ' -> _wait_full.log');
