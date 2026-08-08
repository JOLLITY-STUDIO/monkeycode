/** 诊断精简版模拟器是否有声音输出 */
const path = require('path');
const fs = require('fs');

// Load the ROM data as numbers
const romDataPath = path.join(__dirname, '..', 'mini-audio', 'rom-data', 'index.ts');

// We can't import TS directly, so let's manually check the data structure
// Instead, let's look at what buildPRG returns
const prgDir = path.join(__dirname, '..', 'rom-data');

// Count total bytes by reading bank files
const bankFiles = ['prg-bank-00','prg-bank-01','prg-bank-02','prg-bank-03','prg-bank-04','prg-bank-05','prg-bank-06','prg-bank-07','prg-bank-08','prg-bank-09','prg-bank-10','prg-bank-11','prg-bank-12','prg-bank-13','prg-bank-14',
  ...Array.from({length:16}, (_, i) => `prg-bank-${15+i}`), 'prg-bank-30','prg-bank-31'];

// Just a heads-up to the user
console.log('========================================');
console.log('精简版模拟器诊断');
console.log('========================================');
console.log('');

// Check if rom-data files exist
let totalBanks = 0;
for (const bf of bankFiles) {
  const fp = path.join(prgDir, bf + '.ts');
  if (fs.existsSync(fp)) {
    totalBanks++;
  }
}
console.log(`找到 ${totalBanks} 个 PRG bank 文件`);

// Read mini-audio rom-data/index.ts to check the build
const miniRomIdx = path.join(__dirname, '..', 'mini-audio', 'rom-data', 'index.ts');
if (fs.existsSync(miniRomIdx)) {
  const content = fs.readFileSync(miniRomIdx, 'utf-8');
  console.log('\nmini-audio/rom-data/index.ts 关键内容:');
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.includes('export const') || line.includes('TOTAL_BANKS') || line.includes('BANK_8K')) {
      console.log('  ' + line.trim());
    }
  }
}

// Check game-audio.ts for how PRG is loaded
const gameAudioPath = path.join(__dirname, '..', 'pages', 'game-audio', 'game-audio.ts');
if (fs.existsSync(gameAudioPath)) {
  const content = fs.readFileSync(gameAudioPath, 'utf-8');
  const loadLine = content.split('\n').find(l => l.includes('new Uint8Array'));
  if (loadLine) {
    console.log('\ngame-audio.ts PRG加载行:');
    console.log('  ' + loadLine.trim());
  }
}

// Check if NesAudio class has issues
const nesAudioPath = path.join(__dirname, '..', 'mini-audio', 'emu', 'nes-audio.ts');
if (fs.existsSync(nesAudioPath)) {
  const content = fs.readFileSync(nesAudioPath, 'utf-8');
  console.log('\nnes-audio.ts 关键结构:');
  const lines = content.split('\n');
  for (const line of lines) {
    const t = line.trim();
    if (t.includes('_resetInternals') || t.includes('loadROMArrays') || t.includes('this.mmap')) {
      console.log('  ' + t);
    }
  }
}

console.log('\n========================================');
console.log('最可能的静音原因:');
console.log('========================================');
console.log('');
console.log('1. new Uint8Array(NES_PRG_ROM as number[]) — 如果 NES_PRG_ROM');
console.log('   的长度是 262144，new Uint8Array() 会把它当作数组迭代复制。');
console.log('   但如果 NES_PRG_ROM 不是数组而是数字，就会创建零填充数组。');
console.log('');
console.log('2. 检查 PAPU sample() 方法 — onAudioSample 回调是否被正确调用。');
console.log('');
console.log('3. 检查 CPU emulate() — 是否因为 mmap 为 null 而返回 32 周期。');
