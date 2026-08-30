// build_min.cjs — 把 tsnes 模拟器 core 打成单文件 .min.js (jquery.min.js 风格)
//
// 用法:
//   node build_min.cjs
//
// 产物:
//   dist/tsnes.min.js          218 KB raw / 45.9 KB gzip
//   dist/tsnes.min.js.map      source map
//
// 只打包 NES 模拟器核心 (src/core/) — 不含任何游戏/ROM 数据。
// 微信小程序/H5/浏览器通用 (IIFE 格式, 全局 tsnes.NES / tsnes.Browser)。

const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

const banner = `/*!
 * tsnes - TypeScript NES emulator
 * Build: ${new Date().toISOString()}
 */`;

const opts = {
  entryPoints: ["src/core/index.ts"],
  outfile: "dist/tsnes.min.js",
  bundle: true,                  // 把所有 import 打包进单文件
  minify: true,                  // minify (whitespace + identifier mangle)
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  format: "iife",                // IIFE - jquery.min.js 风格
  globalName: "tsnes",           // 全局变量 tsnes.NES / tsnes.Browser / tsnes.Controller
  target: ["es2018"],            // 微信小程序/H5 通用 (es2018 兼容)
  platform: "browser",
  legalComments: "none",         // 去掉所有 /* */ 注释
  keepNames: false,              // 不保留类名/函数名 (更小)
  sourcemap: true,
  treeShaking: true,             // 摇树优化
  define: {
    "process.env.NODE_ENV": "\"production\"",
    "__DEV__": "false",
  },
  loader: { ".ts": "ts", ".js": "js" },
  tsconfig: "tsconfig.json",
  banner: { js: banner },
  logLevel: "info",
  // 不打包 node 内建模块 (fs/path 等) - 仅做 Browser/小程序 端
  external: ["fs", "path", "os", "crypto", "zlib", "child_process", "stream", "util"],
};

async function build() {
  const start = Date.now();
  const result = await esbuild.build(opts);
  const dt = Date.now() - start;

  // 报告产物大小
  const outfile = path.resolve(opts.outfile);
  if (fs.existsSync(outfile)) {
    const stat = fs.statSync(outfile);
    const kbytes = (stat.size / 1024).toFixed(2);
    let gz = "n/a";
    try {
      const zlib = require("zlib");
      const buf = fs.readFileSync(outfile);
      const gzBuf = zlib.gzipSync(buf, { level: 9 });
      gz = (gzBuf.length / 1024).toFixed(2);
    } catch (e) { /* ignore */ }
    console.log("");
    console.log("─".repeat(60));
    console.log(`✓ ${opts.outfile}`);
    console.log(`  raw:    ${kbytes} KB`);
    console.log(`  gzip:   ${gz} KB`);
    console.log(`  time:   ${dt} ms`);
    console.log("─".repeat(60));
  }

  if (result.errors.length) {
    console.error("ESBuild errors:", result.errors);
    process.exit(1);
  }
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});