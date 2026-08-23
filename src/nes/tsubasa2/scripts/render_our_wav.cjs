// 用我们翻译的 AudioService 渲染 WAV（非模拟器）
// 验证 TS 代码能正确解析音频数据并生成波形
const fs = require('fs');
const path = require('path');

// esbuild 打包 AudioService + AudioRom + ApuPcmRenderer 为单个 JS
require('esbuild').buildSync({
  entryPoints: [path.join(__dirname, 'render_our_wav.ts')],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: path.join(__dirname, '_render_our_wav_bundle.cjs'),
  logLevel: 'silent',
});
require('./_render_our_wav_bundle.cjs');
