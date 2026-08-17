/**
 * Vite 配置 — tsubasa2-h5-src 测试页面
 *
 * 用于在浏览器中运行 H5 游戏引擎并执行自动化测试。
 *
 * ⚠️ 测试环境临时方案：
 *   Tsubasa2.ts 当前 import 了外部 `../../../rom-data/chr-bank-XX` 和
 *   `../../../rom-data/prg-bank-15/12`，违反"tsubasa2-h5-src 独立无外部依赖"原则。
 *   此处通过 server.fs.allow 临时放行上级目录，仅为了让游戏在测试页跑起来。
 *   该外部依赖已作为 Critical bug 记录在测试报告中。
 */
import { defineConfig } from 'vite';
import path from 'path';

const TSNES_ROOT = path.resolve(__dirname, '..');

export default defineConfig({
  root: '.',
  base: './',
  server: {
    port: 5180,
    host: '127.0.0.1',
    open: false,
    fs: {
      // 允许访问上级 tsnes 目录下的 rom-data（测试临时桥接）
      allow: ['.', TSNES_ROOT],
    },
  },
  resolve: {
    // .ts 优先于 .js（rom-data 目录下存在同名 .ts 和 .js，.js 缺少 export default）
    extensions: ['.mjs', '.ts', '.js', '.jsx', '.tsx', '.json'],
  },
  build: {
    outDir: 'dist-test',
    target: 'es2020',
    sourcemap: true,
  },
  // 微信小程序 wx 全局在 index.html 通过 wx-mock.ts 注入
});
