/**
 * 微信小程序 TypeScript 构建脚本
 *
 * 将项目中的 .ts 文件编译为同目录下的 .js 文件，
 * 供微信开发者工具使用。
 *
 * 用法: node scripts/build-mp.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

// ============================================================
// 方案: 使用 tsc 为每个需要编译的文件单独处理
// ============================================================

// 需要编译的 .ts 文件列表（相对于项目根目录）
const TS_FILES = [
  'app.ts',
  'pages/game/game.ts',
  // src/ 下的所有 .ts 文件
  ...findTsFiles('src'),
];

function findTsFiles(dir) {
  const result = [];
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) return result;
  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    const relPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...findTsFiles(relPath));
    } else if (entry.name.endsWith('.ts')) {
      result.push(relPath);
    }
  }
  return result;
}

// 在当前目录下将 .ts 编译为 .js（源文件映射模式）
function compileTsFiles() {
  console.log('[build-mp] Compiling TypeScript for WeChat Mini Program...\n');

  const tsconfigPath = path.join(ROOT, 'tsconfig.mp.json');

  // 确保 tsconfig.mp.json 存在
  if (!fs.existsSync(tsconfigPath)) {
    console.error('[build-mp] ERROR: tsconfig.mp.json not found!');
    process.exit(1);
  }

  try {
    // 使用 tsc 编译，输出到 dist-mp 目录
    execSync(`npx tsc -p "${tsconfigPath}"`, {
      cwd: ROOT,
      stdio: 'inherit',
    });

    // 将编译后的 .js 文件从 dist-mp 复制到对应目录
    copyJsFiles(path.join(ROOT, 'dist-mp'), ROOT);

    console.log('\n[build-mp] ✓ Build complete!');
  } catch (err) {
    console.error('[build-mp] TypeScript compilation failed:', err.message);
    process.exit(1);
  }
}

function copyJsFiles(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyJsFiles(srcPath, destPath);
    } else if (entry.name.endsWith('.js') || entry.name.endsWith('.js.map')) {
      // 复制 .js 和 .js.map 文件到目标目录
      fs.copyFileSync(srcPath, destPath);
      console.log(`  COPY: ${path.relative(ROOT, destPath)}`);
    }
  }
}

// ============================================================
// Main
// ============================================================

compileTsFiles();
