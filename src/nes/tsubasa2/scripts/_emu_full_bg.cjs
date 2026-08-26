/**
 * _emu_full_bg.cjs — 后台运行 _emu_full.cjs，避免终端/工具超时
 * 输出: _emu_full_run4.log / _emu_full_run4.err
 */
const { spawn } = require('child_process');
const fs = require('fs');

const out = fs.openSync('_emu_full_run4.log', 'a');
const err = fs.openSync('_emu_full_run4.err', 'a');

const child = spawn('node', ['scripts/_emu_full.cjs'], {
  env: {
    ...process.env,
    EMU_FULL_FRAMES: '4200',
    EMU_FULL_SKIP_PNG: '1',
  },
  detached: true,
  stdio: ['ignore', out, err],
});

child.unref();
console.log('emu-full background pid=' + child.pid);
