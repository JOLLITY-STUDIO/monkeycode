#!/usr/bin/env node
/**
 * HTML5 测试环境构建脚本
 * 将 src/core|render|data 的 TS 编译为 ES 模块 → test-build/，供 test/index.html 加载。
 * 用法: node tools/build_web.cjs
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

try {
  execSync("npx --yes tsc -p tsconfig.test.json", {
    cwd: root,
    stdio: "inherit",
  });
  // 让 Node 能以 ESM 方式直接 import test-build 产物（无界面测试用）
  fs.writeFileSync(
    path.join(root, "test-build", "package.json"),
    JSON.stringify({ type: "module" }, null, 2) + "\n"
  );
  console.log("[build_web] ok -> test-build/ (open test/index.html)");
} catch (e) {
  console.error("[build_web] tsc failed:", e.message);
  process.exit(1);
}
