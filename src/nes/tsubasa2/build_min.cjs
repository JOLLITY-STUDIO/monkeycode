// build_min.cjs — 把 tsnes core + game 打成单个 .min.js (jquery.min.js 风格)
//
// 用法:
//   node build_min.cjs              # 默认: tsnes.min.js (含 core + game)
//   node build_min.cjs core-only    # 只打 core (NES emulator)
//   node build_min.cjs game-only    # 只打 game (Tsubasa2 game logic)
//
// 产物:
//   dist/tsnes.min.js          ~40-80 KB (gzip ~15-25 KB)
//   dist/tsnes.min.js.map      source map
//
// 微信小程序/H5/Node.js 通用 (IIFE 格式全局, 也可切换 ESM/CJS).

const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

const mode = process.argv[2] || "all";  // all | core-only | game-only

// ────────── 入口配置 ──────────
const entries = {
  "core-only": { entryPoints: ["src/core/index.ts"], outfile: "dist/tsnes-core.min.js" },
  "game-only": { entryPoints: ["src/game/index.ts"], outfile: "dist/tsnes-game.min.js" },
  "all":       { entryPoints: ["src/index.ts"], outfile: "dist/tsnes.min.js" },
}[mode];

// ────────── banner (jquery 风格头) ──────────
const banner = `/*!
 * tsnes - TypeScript NES emulator (H5 game engine)
 * Build: ${new Date().toISOString()}
 * Mode: ${mode}
 */`;

const opts = {
  ...entries,
  bundle: true,                  // 把所有 import 打包进单文件
  minify: true,                  // minify (whitespace + identifier mangle)
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  format: "iife",                // IIFE - jquery.min.js 风格
  globalName: "tsnes",           // 全局变量 tsnes.NES / tsnes.Tsubasa2
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