// 调试每帧 APU 寄存器写和通道状态
const path = require('path');
require('esbuild').buildSync({
  entryPoints: [path.join(__dirname, '_debug_frames.ts')],
  bundle: true, format: 'cjs', platform: 'node',
  outfile: path.join(__dirname, '_debug_frames_bundle.cjs'),
});
require(path.join(__dirname, '_debug_frames_bundle.cjs'));
