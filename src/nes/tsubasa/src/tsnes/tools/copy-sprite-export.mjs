// 从微信开发者工具模拟器的 USER_DATA_PATH 拷贝 sprite-export.zip 到 game-fix-the-sprite/
// 用法: node tools/copy-sprite-export.mjs

import { readdirSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __dirname = resolve(fileURLToPath(import.meta.url), '..', '..');
const destDir = join(__dirname, 'game-fix-the-sprite');
const targetFiles = ['sprite-export.zip', 'sprite-tiles.png', 'preview.png', 'sprites.json'];

function findUserDataPath() {
  // 微信开发者工具在 Windows 上的常见路径
  const bases = [
    join(homedir(), 'AppData', 'Local', 'WeChatDevTools'),
    join(homedir(), 'AppData', 'Roaming', 'WeChatDevTools'),
    join(homedir(), 'AppData', 'Local', '微信开发者工具'),
    join(homedir(), 'AppData', 'Roaming', '微信开发者工具'),
  ];

  for (const base of bases) {
    if (!existsSync(base)) continue;
    try {
      const dirs = readdirSync(base, { withFileTypes: true })
        .filter(d => d.isDirectory());
      for (const dir of dirs) {
        // 递归找 usr/sprite-export.zip
        const found = searchRecursive(join(base, dir.name), 'sprite-export.zip', 6);
        if (found) return found;
      }
    } catch (_) { /* perm denied */ }
  }
  return null;
}

function searchRecursive(dir, filename, maxDepth) {
  if (maxDepth <= 0) return null;
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isFile() && entry.name === filename) {
        return dir; // 返回目录
      }
      if (entry.isDirectory() && entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
        const found = searchRecursive(full, filename, maxDepth - 1);
        if (found) return found;
      }
    }
  } catch (_) { /* perm denied */ }
  return null;
}

const userDataPath = findUserDataPath();

if (!userDataPath) {
  console.log('未找到 sprite-export.zip，请先在模拟器中点击「导出精灵」按钮。');
  console.log('');
  console.log('如果已导出，请在控制台查看打印的路径（[export] ZIP saved to: ...），');
  console.log('然后在文件管理器中粘贴该路径，手动复制文件到 game-fix-the-sprite/');
  process.exit(1);
}

console.log('找到文件目录:', userDataPath);
mkdirSync(destDir, { recursive: true });

for (const f of targetFiles) {
  const src = join(userDataPath, f);
  const dst = join(destDir, f);
  if (existsSync(src)) {
    copyFileSync(src, dst);
    console.log(`  ✓ ${f}`);
  }
}

console.log('完成！文件已拷贝到:', destDir);
