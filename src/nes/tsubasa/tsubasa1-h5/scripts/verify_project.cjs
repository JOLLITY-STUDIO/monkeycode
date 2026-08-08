/**
 * 天使之翼1 — 项目结构验证脚本 (CJS)
 * 不依赖 TypeScript 编译，直接验证文件结构和数据完整性
 * 
 * 用法: node scripts/verify_project.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let passed = 0, failed = 0;
const failures = [];

function check(condition, msg) {
  if (condition) { passed++; }
  else { failed++; failures.push(msg); console.error(`  ❌ ${msg}`); }
}

function checkFile(relPath, minSize = 1) {
  const full = path.join(ROOT, relPath);
  const exists = fs.existsSync(full);
  check(exists, `文件存在: ${relPath}`);
  if (exists) {
    const stat = fs.statSync(full);
    check(stat.size >= minSize, `文件大小 ${relPath}: ${stat.size}B >= ${minSize}B`);
  }
}

function checkDir(relPath) {
  const full = path.join(ROOT, relPath);
  const exists = fs.existsSync(full) && fs.statSync(full).isDirectory();
  check(exists, `目录存在: ${relPath}`);
  return exists;
}

// ==================== 开始验证 ====================

console.log('═'.repeat(60));
console.log('  天使之翼1 — 项目结构验证');
console.log('═'.repeat(60));

// ====== 1. 核心目录结构 ======
console.log('\n📁 [1] 核心目录结构');
checkDir('src');
checkDir('src/core');
checkDir('src/engine');
checkDir('src/data');
checkDir('src/data/raw');
checkDir('src/render');
checkDir('src/game');
checkDir('src/assets');
checkDir('src/assets/chr');
checkDir('pages');
checkDir('pages/game');
checkDir('pages/database');
checkDir('pages/database/chr-all');
checkDir('pages/database/nametable-all');
checkDir('pages/database/sprite-all');
checkDir('pages/database/palette-all');
checkDir('pages/database/pattern-table-all');
checkDir('pages/database/audio-all');
checkDir('pages/database/data-api');
checkDir('pages/database/render-viewer');
checkDir('scripts');

// ====== 2. 核心源文件 ======
console.log('\n📄 [2] 核心 TypeScript 源文件');
const coreFiles = [
  'src/core/Tsubasa.ts',
  'src/core/GameLoop.ts',
  'src/core/StateMachine.ts',
  'src/core/NmiHandler.ts',
  'src/core/BankDispatcher.ts',
  'src/core/types.ts',
  'src/engine/InputManager.ts',
  'src/engine/MathUtils.ts',
  'src/engine/PpuQueue.ts',
  'src/data/DataStore.ts',
  'src/data/RomReader.ts',
  'src/data/raw/PrgLoader.ts',
  'src/data/tables/index.ts',
  'src/data/tables/PlayerTable.ts',
  'src/data/tables/TeamTable.ts',
  'src/render/Renderer.ts',
  'src/game/Bank0Core.ts',
  'src/game/AiAutoPlay.ts',
  'src/game/opening/OpeningScene.ts',
  'src/game/title/TitleScene.ts',
  'src/game/menu/MenuScene.ts',
  'src/game/match/MatchEngine.ts',
  'src/game/match/AiController.ts',
  'src/game/match/MatchFieldRenderer.ts',
  'src/game/match/index.ts',
];
for (const f of coreFiles) checkFile(f, 100);

// ====== 3. 页面文件 ======
console.log('\n📄 [3] 页面文件');
const pageTypes = ['game'];
const debugPages = ['chr-all', 'nametable-all', 'sprite-all', 'palette-all', 'pattern-table-all', 'audio-all', 'data-api', 'render-viewer'];

for (const p of pageTypes) {
  checkFile(`pages/${p}/${p}.ts`, 50);
  checkFile(`pages/${p}/${p}.wxml`, 10);
  checkFile(`pages/${p}/${p}.wxss`, 10);
  checkFile(`pages/${p}/${p}.json`, 10);
}
for (const p of debugPages) {
  checkFile(`pages/database/${p}/${p}.ts`, 50);
  checkFile(`pages/database/${p}/${p}.wxml`, 10);
  checkFile(`pages/database/${p}/${p}.wxss`, 10);
  checkFile(`pages/database/${p}/${p}.json`, 10);
}

// ====== 4. 配置文件 ======
console.log('\n📄 [4] 配置文件');
checkFile('app.ts', 50);
checkFile('app.json', 50);
checkFile('app.wxss', 10);
checkFile('project.config.json', 50);
checkFile('sitemap.json', 10);

// ====== 5. CHR PNG 资源 ======
console.log('\n🖼️ [5] CHR PNG 图集');
for (let b = 0; b < 32; b++) {
  const hex = b.toString(16).toUpperCase().padStart(2, '0');
  checkFile(`src/assets/chr/bank_${hex}.png`, 1000);
}

// ====== 6. CHR 数据文件 ======
console.log('\n📊 [6] CHR 数据文件');
checkFile('src/assets/chr/chr_data.ts', 100000);  // ~770KB
checkFile('src/assets/chr/chr_bulk.json', 10000);

// 验证 chr_bulk.json
try {
  const bulkPath = path.join(ROOT, 'src/assets/chr/chr_bulk.json');
  const bulk = JSON.parse(fs.readFileSync(bulkPath, 'utf-8'));
  check(Array.isArray(bulk), 'chr_bulk.json 是数组');
  check(bulk.length === 32, `chr_bulk.json 包含 32 个 bank (实际: ${bulk.length})`);
  
  for (const entry of bulk) {
    check(typeof entry.bankId === 'number', `Bank ${entry.bankId}: bankId 有效`);
    check(typeof entry.base64 === 'string' && entry.base64.length > 0, `Bank ${entry.bankId}: base64 有效`);
    check(entry.size === 4096, `Bank ${entry.bankId}: size = 4096`);
  }
} catch (err) {
  check(false, `chr_bulk.json 解析失败: ${err.message}`);
}

// ====== 7. PRG 数据文件 ======
console.log('\n📊 [7] PRG 数据文件');
checkFile('src/data/raw/prg_bulk.json', 10000);

try {
  const prgPath = path.join(ROOT, 'src/data/raw/prg_bulk.json');
  const prg = JSON.parse(fs.readFileSync(prgPath, 'utf-8'));
  check(Array.isArray(prg), 'prg_bulk.json 是数组');
  check(prg.length === 8, `prg_bulk.json 包含 8 个 bank (实际: ${prg.length})`);
  
  for (const entry of prg) {
    check(typeof entry.bankId === 'number', `PRG Bank ${entry.bankId}: bankId 有效`);
    check(typeof entry.base64 === 'string' && entry.base64.length > 0, `PRG Bank ${entry.bankId}: base64 有效`);
    check(entry.size === 16384, `PRG Bank ${entry.bankId}: size = 16384`);
  }
} catch (err) {
  check(false, `prg_bulk.json 解析失败: ${err.message}`);
}

// ====== 8. 脚本 ======
console.log('\n📜 [8] 工具脚本');
checkFile('scripts/extract_chr.mjs', 500);
checkFile('scripts/extract_prg.mjs', 500);
checkFile('scripts/extract_players_v2.mjs', 500);
checkFile('scripts/verify_project.cjs', 500);

// ====== 9. 文档 ======
console.log('\n📝 [9] 文档');
checkFile('ARCHITECTURE.md', 500);
checkFile('ROM_STRUCTURE_REPORT.md', 500);
checkFile('DEV_LOG.md', 100);
checkFile('WBS.md', 100);

// ====== 10. app.json 页面注册验证 ======
console.log('\n🔗 [10] app.json 页面注册完整性');
try {
  const appJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'app.json'), 'utf-8'));
  const pages = appJson.pages || [];
  
  const requiredPages = [
    'pages/game/game',
    'pages/debug/chr-all/chr-all',
    'pages/debug/pattern-table-all/pattern-table-all',
    'pages/debug/nametable-all/nametable-all',
    'pages/debug/sprite-all/sprite-all',
    'pages/debug/palette-all/palette-all',
    'pages/debug/audio-all/audio-all',
    'pages/debug/data-api/data-api',
  ];

  for (const p of requiredPages) {
    check(pages.includes(p), `app.json 注册: ${p}`);
  }

  // 检查每个页面是否有对应文件
  for (const p of pages) {
    const ts = path.join(ROOT, `${p}.ts`);
    const js = path.join(ROOT, `${p}.js`);
    const hasTs = fs.existsSync(ts);
    const hasJs = fs.existsSync(js);
    check(hasTs || hasJs, `页面 ${p}: 有 TS 或 JS 文件`);
  }
} catch (err) {
  check(false, `app.json 验证失败: ${err.message}`);
}

// ====== 11. TypeScript 导入引用检查 ======
console.log('\n🔍 [11] 模块引用完整性');
function checkImport(filePath, importPatterns) {
  const fullPath = path.join(ROOT, filePath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf-8');
  for (const { pattern, desc } of importPatterns) {
    // 简单检查 import 语句
    if (typeof pattern === 'string') {
      check(content.includes(pattern), `${filePath}: 引用 ${desc}`);
    } else {
      check(pattern.test(content), `${filePath}: 引用 ${desc}`);
    }
  }
}

// 核心模块互相引用
checkImport('src/core/Tsubasa.ts', [
  { pattern: 'DataStore', desc: 'DataStore' },
  { pattern: 'GameLoop', desc: 'GameLoop' },
  { pattern: 'StateMachine', desc: 'StateMachine' },
  { pattern: 'Renderer', desc: 'Renderer' },
  { pattern: 'Bank0Core', desc: 'Bank0Core' },
  { pattern: 'SkeletonBank', desc: 'SkeletonBanks' },
]);

checkImport('src/game/SkeletonBanks.ts', [
  { pattern: 'BankModule', desc: 'BankModule 接口' },
  { pattern: 'SkeletonBank1', desc: 'SkeletonBank1' },
  { pattern: 'SkeletonBank5', desc: 'SkeletonBank5' },
  { pattern: 'SkeletonBank6', desc: 'SkeletonBank6' },
]);

// ==================== 结果 ====================
console.log('\n' + '═'.repeat(60));
console.log(`  验证结果: ${passed} 通过, ${failed} 失败`);
if (failures.length > 0) {
  console.log(`\n  失败项 (${failures.length}):`);
  for (const f of failures) console.log(`    - ${f}`);
}
console.log('═'.repeat(60));

process.exit(failed > 0 ? 1 : 0);
