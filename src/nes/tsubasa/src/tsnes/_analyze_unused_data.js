/**
 * 分析所有 bank data 文件中 export 的未被引用的数据
 * 扫描 game-engine/native-game/tsubasa/banks/prg/ 下所有 *-data.ts
 * 检查每个 export 在全项目中被引用的次数
 * 优化版：一次遍历所有文件，批量匹配
 * 区分 legacy (tsubasa-2asm) 和 current (game-engine + src) 引用
 */

const fs = require('fs');
const path = require('path');

const BANKS_DIR = path.resolve(__dirname, 'game-engine/native-game/tsubasa/banks/prg');
const SEARCH_DIRS = [
  { dir: path.resolve(__dirname, 'game-engine'), label: 'game-engine' },
  { dir: path.resolve(__dirname, 'src'), label: 'src' },
  { dir: path.resolve(__dirname, 'tsubasa-2asm'), label: 'tsubasa-2asm(legacy)' },
];
const SEARCH_EXTS = ['.ts', '.js'];

const SKIP_DIRS = new Set(['node_modules', '_tmp_bzk_out', 'roms', 'tools', '.git', 'trace', 
  'game-fix-the-sprite', 'rom-data', 'pages', 'typings', 'docs']);

// 递归收集文件
function walkDir(dir) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name) && !entry.name.startsWith('.')) {
          results.push(...walkDir(fullPath));
        }
      } else if (entry.isFile() && SEARCH_EXTS.includes(path.extname(entry.name))) {
        results.push(fullPath);
      }
    }
  } catch(e) {}
  return results;
}

// 收集一个 data 文件的 export
function collectExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const exports = [];
  const regex = /export\s+(const|let|var|function|class|interface|type|enum)\s+([\w$]+)/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    exports.push(match[2]);
  }
  return exports;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function main() {
  // Step 1: 收集所有 data 文件的 export
  const dataFiles = fs.readdirSync(BANKS_DIR)
    .filter(f => f.endsWith('-data.ts'))
    .sort()
    .map(f => path.join(BANKS_DIR, f));

  console.log(`=== 找到 ${dataFiles.length} 个 data 文件 ===`);

  const exportMap = new Map(); // name -> [fileShort, ...]
  for (const file of dataFiles) {
    const fileShort = path.basename(file);
    const exports = collectExports(file);
    for (const exp of exports) {
      if (!exportMap.has(exp)) exportMap.set(exp, []);
      exportMap.get(exp).push(fileShort);
    }
  }

  console.log(`共 ${exportMap.size} 个唯一导出项`);

  // Step 2a: 收集当前代码目录 (game-engine + src)
  console.log('\n正在收集搜索文件...');
  const currentFiles = [];
  const legacyFiles = [];
  
  for (const sd of SEARCH_DIRS) {
    if (!fs.existsSync(sd.dir)) {
      console.log(`  跳过不存在的目录: ${sd.dir}`);
      continue;
    }
    const files = walkDir(sd.dir);
    console.log(`  ${sd.label}: ${files.length} 个文件`);
    if (sd.label.includes('legacy')) {
      legacyFiles.push(...files);
    } else {
      currentFiles.push(...files);
    }
  }

  // 过滤掉 data 文件本身
  const selfFileSet = new Set(dataFiles.map(f => path.resolve(f)));
  const currentSearchFiles = currentFiles.filter(f => !selfFileSet.has(path.resolve(f)));
  const legacySearchFiles = legacyFiles.filter(f => !selfFileSet.has(path.resolve(f)));
  
  console.log(`当前代码(排除data): ${currentSearchFiles.length} 文件`);
  console.log(`Legacy代码: ${legacySearchFiles.length} 文件`);

  // Step 3: 读取当前代码文件
  console.log('\n正在读取当前代码文件...');
  const currentContents = [];
  for (let i = 0; i < currentSearchFiles.length; i++) {
    try {
      const content = fs.readFileSync(currentSearchFiles[i], 'utf-8');
      currentContents.push({ filePath: currentSearchFiles[i], rel: path.relative(__dirname, currentSearchFiles[i]), content });
    } catch(e) {}
    if ((i + 1) % 50 === 0 || i === currentSearchFiles.length - 1) {
      process.stdout.write(`\r  读取中... ${i + 1}/${currentSearchFiles.length}`);
    }
  }
  console.log(`  完成! ${currentContents.length} 个文件`);

  // 读取 legacy 代码文件
  console.log('正在读取 legacy 代码文件...');
  const legacyContents = [];
  for (let i = 0; i < legacySearchFiles.length; i++) {
    try {
      const content = fs.readFileSync(legacySearchFiles[i], 'utf-8');
      legacyContents.push({ filePath: legacySearchFiles[i], rel: path.relative(__dirname, legacySearchFiles[i]), content });
    } catch(e) {}
    if ((i + 1) % 50 === 0 || i === legacySearchFiles.length - 1) {
      process.stdout.write(`\r  读取中... ${i + 1}/${legacySearchFiles.length}`);
    }
  }
  console.log(`  完成! ${legacyContents.length} 个文件\n`);

  // Step 4: 批量检查引用
  function findRefs(name, fileContents) {
    let refCount = 0;
    const foundIn = [];
    const regex = new RegExp('\\b' + escapeRegExp(name) + '\\b');
    for (const fc of fileContents) {
      if (regex.test(fc.content)) {
        refCount++;
        foundIn.push(fc.rel);
        if (refCount > 100) break;
      }
    }
    return { count: refCount, foundIn };
  }

  console.log('正在检查引用...');
  const results = new Map();
  let checked = 0;
  const total = exportMap.size;

  for (const [name, files] of exportMap) {
    const currentRefs = findRefs(name, currentContents);
    const legacyRefs = findRefs(name, legacyContents);
    
    results.set(name, {
      files,
      currentCount: currentRefs.count,
      currentIn: currentRefs.foundIn,
      legacyCount: legacyRefs.count,
      legacyIn: legacyRefs.foundIn,
    });
    
    checked++;
    if (checked % 50 === 0 || checked === total) {
      process.stdout.write(`\r检查中... ${checked}/${total}`);
    }
  }
  console.log('\n');

  // Step 5: 分类
  const completelyUnused = [];        // 没有任何引用（current + legacy）
  const unusedInCurrent = [];         // 仅在 legacy 中有引用，当前代码无引用
  const usedInsideOnly = [];          // 仅被同bank code文件引用
  const unusedInCurrentButLegacy = [];// 当前无引用但legacy有

  for (const [name, info] of results) {
    const totalRefs = info.currentCount + info.legacyCount;
    
    if (totalRefs === 0) {
      completelyUnused.push(name);
    } else if (info.currentCount === 0 && info.legacyCount > 0) {
      unusedInCurrentButLegacy.push(name);
    } else if (info.currentCount > 0) {
      // 检查是否仅被同bank code引用
      const dataFileBase = path.basename(info.files[0], '.ts');
      const codeFileBase = dataFileBase.replace(/data$/, 'code');
      const onlyInsideCurrent = info.currentIn.every(f => f.includes(codeFileBase));
      if (onlyInsideCurrent && info.legacyCount === 0) {
        usedInsideOnly.push(name);
      }
    }
  }

  // ===== 输出 =====
  console.log(`${'='.repeat(70)}`);
  console.log(`📊 汇总`);
  console.log(`${'='.repeat(70)}`);
  console.log(`  总数据导出项数: ${exportMap.size}`);
  console.log(`  完全未被引用(任何地方): ${completelyUnused.length}`);
  console.log(`  当前代码未引用(仅legacy引用): ${unusedInCurrentButLegacy.length}`);
  console.log(`  仅同bank code引用(当前代码): ${usedInsideOnly.length}`);
  console.log(`  正常外部引用(当前代码): ${exportMap.size - completelyUnused.length - unusedInCurrentButLegacy.length - usedInsideOnly.length}`);
  console.log(`    (其中: 当前代码引用=${exportMap.size - completelyUnused.length - unusedInCurrentButLegacy.length}, legacy引用=${[...results.values()].filter(v=>v.legacyCount>0).length})`);

  // 按文件分组: 完全未引用
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🔴 完全未被引用 [任何地方] (${completelyUnused.length} 项)`);
  console.log(`${'='.repeat(70)}`);
  printGroupByFile(completelyUnused, results);

  // 按文件分组: 当前代码无引用
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🟠 当前代码未引用 [仅 legacy 引用] (${unusedInCurrentButLegacy.length} 项)`);
  console.log(`${'='.repeat(70)}`);
  if (unusedInCurrentButLegacy.length === 0) {
    console.log('  (无)');
  } else {
    const byFile = {};
    for (const name of unusedInCurrentButLegacy) {
      const info = results.get(name);
      for (const f of info.files) {
        if (!byFile[f]) byFile[f] = [];
        byFile[f].push(name);
      }
    }
    for (const [file, names] of Object.entries(byFile).sort()) {
      console.log(`\n  📄 ${file} (${names.length} 项):`);
      for (const n of names.sort()) {
        const info = results.get(n);
        let sizeHint = '';
        try {
          const fullPath = path.join(BANKS_DIR, file);
          const content = fs.readFileSync(fullPath, 'utf-8');
          const idx = content.indexOf('export const ' + n);
          if (idx !== -1) {
            const snippet = content.substring(idx, idx + 500);
            const commaCount = (snippet.match(/0x[0-9a-fA-F]{2}/g) || []).length;
            sizeHint = commaCount > 0 ? ` (约${commaCount}字节)` : '';
          }
        } catch(e) {}
        console.log(`     ${n}${sizeHint}`);
      }
    }
  }

  // 按文件分组: 仅内部引用
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🟡 仅同bank code文件引用 [当前代码] (${usedInsideOnly.length} 项)`);
  console.log(`${'='.repeat(70)}`);
  if (usedInsideOnly.length === 0) {
    console.log('  (无)');
  } else {
    printGroupByFile(usedInsideOnly, results);
  }

  console.log(`\n${'='.repeat(70)}`);
}

function printGroupByFile(names, results) {
  if (names.length === 0) { console.log('  (无)'); return; }
  const byFile = {};
  for (const name of names) {
    const info = results.get(name);
    for (const f of info.files) {
      if (!byFile[f]) byFile[f] = [];
      byFile[f].push(name);
    }
  }
  for (const [file, fnames] of Object.entries(byFile).sort()) {
    console.log(`\n  📄 ${file} (${fnames.length} 项):`);
    for (const n of fnames.sort()) {
      const info = results.get(n);
      const where = info.currentIn.length > 0 ? info.currentIn[0] : '';
      console.log(`     ${n}${where ? '  →  ' + where : ''}`);
    }
  }
}

main();
