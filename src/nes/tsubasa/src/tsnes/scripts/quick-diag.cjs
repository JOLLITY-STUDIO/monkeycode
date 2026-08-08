/**
 * 快速诊断精简版模拟器是否能正常启动和产生音频
 * 方法：直接构造 ROM 数据，运行少量帧，观察 APU 写入
 */
const path = require('path');
const fs = require('fs');

// 手动检查 rom-data index 文件以确认数据
const romIndexPath = path.join(__dirname, '..', 'mini-audio', 'rom-data', 'index.ts');
const content = fs.readFileSync(romIndexPath, 'utf-8');

console.log('=== 精简版模拟器快速诊断 ===\n');

// 1. 检查 NES_PRG_ROM 大小
const sizeMatch = content.match(/TOTAL_BANKS\s*=\s*(\d+)/);
const bankCount = sizeMatch ? parseInt(sizeMatch[1]) : 32;
console.log(`PRG bank 数量: ${bankCount} (每个8KB = ${bankCount * 8}KB 总计)`);

// 2. 检查哪些 bank 是真实的
const realBanksMatch = content.match(/REAL_BANKS[^}]*\}/s);
if (realBanksMatch) {
  const bankMatch = realBanksMatch[0].match(/(\d+):\s*_prg/g);
  const realIds = bankMatch ? bankMatch.map(m => m.match(/\d+/)[0]) : [];
  console.log(`真实 bank ID: [${realIds.join(', ')}]`);
}

// 3. 检查 NES_PRG_ROM 构建逻辑
console.log(`\nNES_PRG_ROM 构建方式: ${content.includes('buildPRG') ? 'buildPRG() 函数' : '直接导出'}`);

// 4. 检查 BGM00 数据填充
const bgmLine = content.match(/fillBGM00Bank\(_bgm15\)/);
console.log(`Bank 15 数据源: ${bgmLine ? 'BGM00 数据填充' : '未找到填充调用'}`);

// 5. 尝试以 Node.js 方式加载并运行
console.log('\n=== 尝试加载 TypeScript 模块 ===');
try {
  // 使用 tsx 运行实际的渲染
  const { execSync } = require('child_process');
  console.log('使用 npx tsx 运行 render-pcm.ts (10帧)...');
  const result = execSync('npx tsx mini-audio/render-pcm.ts 10', {
    cwd: path.join(__dirname, '..'),
    timeout: 30000,
    encoding: 'utf-8',
  });
  console.log('输出:');
  console.log(result);
} catch (e) {
  console.log('运行失败:', e.message);
  if (e.stdout) console.log('stdout:', e.stdout.toString());
  if (e.stderr) console.log('stderr:', e.stderr.toString());
}

// 6. 尝试运行 trace 脚本
console.log('\n=== 尝试运行 trace.ts (100帧) ===');
try {
  const { execSync } = require('child_process');
  const result = execSync('npx tsx mini-audio/trace.ts 100', {
    cwd: path.join(__dirname, '..'),
    timeout: 60000,
    encoding: 'utf-8',
  });
  console.log('trace 输出 (最后20行):');
  const lines = result.split('\n');
  for (const l of lines.slice(-20)) console.log('  ' + l);
} catch (e) {
  console.log('trace 运行失败:', e.message);
  if (e.stderr) console.log('stderr:', e.stderr.toString().slice(-500));
}
