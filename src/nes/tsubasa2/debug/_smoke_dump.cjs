/**
 * _smoke_dump.cjs — 用 esbuild register 直接跑 TS
 * 跑 660 帧, 在 frame 60/120/180/240/300/360/420/480/540/600 打印 buffer stats
 */
const path = require('path');

// 用 esbuild 临时打包再 require, 跟 _emu_reference.cjs 同一手法
const esbuild = require('esbuild');
const fs = require('fs');
const tsBundle = path.resolve(__dirname, '_smoke_dump_bundle.cjs');
esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, '_smoke_dump_entry.ts')],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  target: 'node18',
  outfile: tsBundle,
  logLevel: 'silent',
  external: ['fs', 'path'],
});

require(tsBundle);
