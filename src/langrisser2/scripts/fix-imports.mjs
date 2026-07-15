/**
 * fix-imports.mjs — 小程序模块导入路径修复
 *
 * 问题: 游戏代码使用 ESModule `.js` 扩展名导入 (如 `import { X } from './file.js'`)
 *       微信小程序编译器可能无法正确解析 `.js` → `.ts`
 *
 * 解决: 遍历 game/ 目录下所有 .ts 文件, 将导入路径中的 `.js` 扩展名移除
 *       (仅修改 .ts 文件, 不影响 web 版构建)
 *
 * 用法:
 *   node scripts/fix-imports.mjs [--restore]
 *
 *   --restore  回退: 将移除的 .js 扩展名恢复
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const GAME_DIR = join(import.meta.dirname, '..', 'game');
const PAGES_DIR = join(import.meta.dirname, '..', 'pages');

const IMPORT_RE = /from\s+['"](\..+?)\.js['"]\s*;?\s*$/gm;

/**
 * 递归收集目录下所有 .ts 文件
 */
async function collectTsFiles(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await collectTsFiles(full));
    } else if (entry.name.endsWith('.ts')) {
      results.push(full);
    }
  }
  return results;
}

async function main() {
  const restore = process.argv.includes('--restore');
  const allFiles = [
    ...(await collectTsFiles(GAME_DIR)),
    ...(await collectTsFiles(PAGES_DIR)),
  ];

  let fixedCount = 0;

  for (const file of allFiles) {
    const content = await readFile(file, 'utf-8');
    let newContent;

    if (restore) {
      // 恢复 .js 扩展名: from './file' → from './file.js'
      newContent = content.replace(
        /from\s+['"](\..+?)(?<!\.js)['"]\s*;?\s*$/gm,
        (match, path) => match.replace(path, path + '.js'),
      );
    } else {
      // 移除 .js 扩展名: from './file.js' → from './file'
      newContent = content.replace(IMPORT_RE, (match, path) => {
        return match.replace(path + '.js', path);
      });
    }

    if (newContent !== content) {
      await writeFile(file, newContent, 'utf-8');
      const matches = content.match(IMPORT_RE);
      fixedCount += matches ? matches.length : 1;
      console.log(`  ${restore ? '还原' : '修复'}: ${file.replace(join(import.meta.dirname, '..') + '/', '')}`);
    }
  }

  console.log(`\n完成: ${restore ? '还原' : '修复'}了 ${fixedCount} 处导入路径`);
}

main().catch(console.error);
