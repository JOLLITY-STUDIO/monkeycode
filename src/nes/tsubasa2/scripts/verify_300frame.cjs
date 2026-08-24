/**
 * verify_300frame.cjs — 跑 300 帧并截 PNG（PPU buffer + OAM/NT/PT/Palette）
 *
 * 用法：cd scripts && node verify_300frame.cjs
 * 输出：
 *   output/ppu-trace/
 *     final-screen.png           最终帧 256×240 截图
 *     snapshots.json              每快照帧的概要（game state + 数据 hash）
 *     frame-NNN/oam.json          64 精灵（y/tile/attr/x）
 *     frame-NNN/nt0.json          32×32 tile 网格（tile idx + 调色板高位）
 *     frame-NNN/nt1.json          第二 name table
 *     frame-NNN/pt.json           512 PT tile（每 tile 8 字节 plane0 + 8 字节 plane1）
 *     frame-NNN/palette.json      32 颜色（16 BG + 16 SPR）
 *     frame-NNN/screen.png        该帧 256×240 截图
 *     frame-NNN/nt0.png           NT0 256×256 渲染（用 BG 调色板 0）
 *     frame-NNN/pt-sheet.png      512 PT tile sheet 128×256（BG + SPR）
 *     frame-NNN/palette.png       32 色 swatch
 *
 * 快照频率：每 30 帧一次（10 次）+ 最终帧 = 11 个快照
 */
const path = require('path');
require('esbuild').buildSync({
  entryPoints: [path.join(__dirname, '_verify_300frame.ts')],
  bundle: true, format: 'cjs', platform: 'node',
  outfile: path.join(__dirname, '_verify_300frame_bundle.cjs'),
  logLevel: 'silent',
});
require(path.join(__dirname, '_verify_300frame_bundle.cjs'));