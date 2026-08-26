// 后台启动 _emu_full.cjs (全量 4332 帧 FCEUX trace), 立即返回。
// 日志: _emu_full_run3.log / _emu_full_err3.log
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const runLog = fs.openSync(path.join(root, '_emu_full_run3.log'), 'w');
const errLog = fs.openSync(path.join(root, '_emu_full_err3.log'), 'w');

const child = spawn(process.execPath, [path.join(__dirname, '_emu_full.cjs')], {
  cwd: root,
  stdio: ['ignore', runLog, errLog],
  detached: true,
});
child.unref();
console.log('spawned pid=' + child.pid + ' -> _emu_full_run3.log');
