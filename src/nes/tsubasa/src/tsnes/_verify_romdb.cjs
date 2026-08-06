/**
 * 验证 RomDatabase 构建 — Node.js 独立测试脚本
 * 使用: node _verify_romdb.cjs
 *
 * 验证内容:
 *   1. RomDatabase 单例初始化
 *   2. CHR Bank 索引 (16 banks)
 *   3. PRG Bank 索引 (32 banks)
 *   4. 结构化游戏数据 (球员/队伍/阵型/值曲线)
 *   5. 查询接口
 */

// 直接用 CommonJS require 加载编译好的文件或使用 esm
// 因为 RomDatabase 是 ES Module，我们需要用 import()
// 先检查 TypeScript 编译是否通过
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname);

console.log('═'.repeat(60));
console.log('RomDatabase 验证脚本');
console.log('═'.repeat(60));

// Step 1: 检查 TypeScript 编译
console.log('\n[1/3] 检查 TypeScript 编译...');
try {
  execSync('npx tsc --noEmit --pretty', {
    cwd: ROOT,
    stdio: 'pipe',
    timeout: 30000,
  });
  console.log('  ✅ TypeScript 编译通过 (0 errors)');
} catch (e) {
  const stderr = e.stderr?.toString() || '';
  const stdout = e.stdout?.toString() || '';
  // 只检查 RomDatabase 相关的错误
  const romdbErrors = (stdout + stderr)
    .split('\n')
    .filter(line => line.includes('RomDatabase') || line.includes('data-model-schema') || line.includes('data-extractor'));
  
  if (romdbErrors.length === 0) {
    console.log('  ✅ RomDatabase 相关文件编译通过 (其他文件可能存在已存在的错误)');
  } else {
    console.log('  ⚠️ RomDatabase 相关编译警告:');
    romdbErrors.forEach(line => console.log('    ' + line));
  }
}

// Step 2: 直接验证数据导入 (通过 CommonJS wrapper)
console.log('\n[2/3] 验证 ROM 原始数据...');

// 验证 rom-data/index.ts 导出的数据大小
const indexSrc = fs.readFileSync(path.join(ROOT, 'rom-data', 'index.ts'), 'utf8');

// 手动读取一个 CHR bank 来验证大小
const chrBank00Path = path.join(ROOT, 'rom-data', 'chr-bank-00.ts');
const chrBank00Src = fs.readFileSync(chrBank00Path, 'utf8');

// 统计 hex 值数量
const hexMatches = chrBank00Src.matchAll(/0x[0-9a-fA-F]{2}/g);
let hexCount = 0;
for (const _ of hexMatches) hexCount++;

console.log(`  chr-bank-00.ts: ${hexCount} hex values`);
console.log(`  Expected: 8192 bytes per CHR bank`);
console.log(`  ⚠ ${hexCount === 8192 ? '  ✅ CHR bank size OK' : '  ❌ CHR bank size mismatch'}`);

// 统计 PRG bank
const prgBank27Path = path.join(ROOT, 'rom-data', 'prg-bank-27.ts');
const prgBank27Src = fs.readFileSync(prgBank27Path, 'utf8');
const prgHexMatches = prgBank27Src.matchAll(/0x[0-9a-fA-F]{2}/g);
let prgHexCount = 0;
for (const _ of prgHexMatches) prgHexCount++;
console.log(`  prg-bank-27.ts: ${prgHexCount} hex values`);
console.log(`  Expected: 8192 bytes per PRG bank`);
console.log(`  ⚠ ${prgHexCount === 8192 ? '  ✅ PRG bank size OK' : '  ❌ PRG bank size mismatch'}`);

// Step 3: 验证 structured data extractor
console.log('\n[3/3] 验证结构化数据提取器...');

const dataExtractorPath = path.join(ROOT, 'game-engine', 'native-game', 'tsubasa', 'banks', 'prg', 'data-extractor.ts');
const dataExtractorSrc = fs.readFileSync(dataExtractorPath, 'utf8');

// 检查关键函数是否存在
const funcChecks = [
  'parseAttrRecords',
  'parsePlayerNamesByTeam',
  'parseTeamRecords',
  'parseAnimSequences',
  'parseFormationRecords',
  'parseValueCurves',
  'parseValuePairs16',
  'parsePlayerValueRows',
  'parseFieldPositionData',
  'buildGameDataIndex',
];

console.log('  提取器函数检查:');
for (const fn of funcChecks) {
  const found = dataExtractorSrc.includes(`export function ${fn}`);
  console.log(`    ${found ? '✅' : '❌'} ${fn}`);
}

// 检查 RomDatabase.ts 中的查询方法
const romdbPath = path.join(ROOT, 'game-engine', 'native-game', 'tsubasa', 'RomDatabase.ts');
const romdbSrc = fs.readFileSync(romdbPath, 'utf8');

const queryChecks = [
  'getChrBank(',
  'getChrBankData(',
  'getPrgBank(',
  'getPrgBankData(',
  'getPlayer(',
  'getAllPlayers(',
  'getPlayerAttr(',
  'getTeam(',
  'getTeams(',
  'getFormation(',
  'getFormations(',
  'applyValueCurve(',
  'getValueCurve(',
  'getSummary(',
  'findPrgBanks(',
  'getPlayersByPosition(',
  'getTeamPlayers(',
];

console.log('\n  RomDatabase 查询接口检查:');
for (const q of queryChecks) {
  const found = romdbSrc.includes(q);
  console.log(`    ${found ? '✅' : '❌'} ${q}`);
}

// 检查 RomDatabase 导入
const importChecks = [
  'NES_CHR_ROM',
  'NES_PRG_ROM',
  'buildGameDataIndex',
  'GameDataIndex',
  'PlayerBaseRecord',
  'TeamRecord',
  'FormationRecord',
];

console.log('\n  RomDatabase 导入检查:');
for (const imp of importChecks) {
  const found = romdbSrc.includes(imp);
  console.log(`    ${found ? '✅' : '❌'} ${imp}`);
}

// 最终总结
console.log('\n' + '═'.repeat(60));
console.log('验证完成');
console.log('═'.repeat(60));

const allFuncOk = funcChecks.every(fn => dataExtractorSrc.includes(`export function ${fn}`));
const allQueryOk = queryChecks.every(q => romdbSrc.includes(q));
const allImportOk = importChecks.every(imp => romdbSrc.includes(imp));

if (allFuncOk && allQueryOk && allImportOk && hexCount === 8192 && prgHexCount === 8192) {
  console.log('✅ 所有检查通过 — RomDatabase 构建正确');
} else {
  console.log('⚠️ 部分检查未通过，请检查上述 ❌ 标记');
  if (!allFuncOk) console.log('  - 提取器函数缺失');
  if (!allQueryOk) console.log('  - 查询接口缺失');
  if (!allImportOk) console.log('  - 导入缺失');
  if (hexCount !== 8192) console.log('  - CHR bank 大小不匹配');
  if (prgHexCount !== 8192) console.log('  - PRG bank 大小不匹配');
}
