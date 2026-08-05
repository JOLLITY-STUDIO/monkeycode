/**
 * 扫描所有 32 个 PRG bank 寻找 16 字节球员核心记录
 * 直接读取 NES ROM 二进制文件
 * 运行: node _scan_all_banks.cjs
 */
const fs = require('fs');

// 读取 NES ROM 二进制文件
const nesPath = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const nesBuf = fs.readFileSync(nesPath);

// NES header: 16 bytes, PRG ROM starts at offset 16
const prgSize = nesBuf[4] * 16384; // PRG ROM size in bytes
let prgData = [];
for (let i = 0; i < prgSize; i++) {
  prgData.push(nesBuf[16 + i]);
}
console.log(`Loaded ${prgData.length} bytes of PRG ROM from NES file`);

const BANK_SIZE = 8192;
const TOTAL_BANKS = Math.floor(prgData.length / BANK_SIZE);
console.log(`Total banks: ${TOTAL_BANKS}`);

// 切成 32 个 bank
const banks = [];
for (let i = 0; i < TOTAL_BANKS; i++) {
  const bank = [];
  for (let j = 0; j < BANK_SIZE; j++) {
    bank.push(prgData[i * BANK_SIZE + j] || 0xFF);
  }
  banks.push(bank);
}

// ═══════════════════════════
// 扫描球员记录
// ═══════════════════════════
function isValidPlayer(arr, start) {
  if (start + 16 > arr.length) return false;
  const jersey = arr[start];
  const pos = arr[start + 5];
  return jersey >= 1 && jersey <= 99 && pos >= 0 && pos <= 3;
}

const posNames = ['GK', 'DF', 'MF', 'FW'];

console.log('');
console.log('=== Scanning ALL 32 Banks for 16-byte Player Records ===');

const foundRecords = [];

for (let bankIdx = 0; bankIdx < TOTAL_BANKS; bankIdx++) {
  const bank = banks[bankIdx];
  
  // 寻找连续 3+ 条有效记录且 stats 非全零的区域
  for (let off = 0; off + 48 <= BANK_SIZE; off++) {
    if (isValidPlayer(bank, off) && isValidPlayer(bank, off + 16) && isValidPlayer(bank, off + 32)) {
      // 验证至少有一些合理的数据
      let totalStatSum = 0;
      for (let i = 0; i < 3; i++) {
        const stats = bank.slice(off + i * 16 + 6, off + i * 16 + 14);
        totalStatSum += stats.reduce((a, b) => a + b, 0);
      }
      // 要求连续3个球员的总 stats 和 > 50
      if (totalStatSum < 50) continue;
      
      // 计算连续有效记录数
      let count = 0;
      for (let c = 0; c < Math.min(30, Math.floor((BANK_SIZE - off) / 16)); c++) {
        if (isValidPlayer(bank, off + c * 16)) count++; else break;
      }
      
      foundRecords.push({ bankIdx, offset: off, count });
      break; // 每 bank 只取第一个
    }
  }
}

console.log(`\nFound ${foundRecords.length} banks with valid player record sequences:\n`);

for (const fr of foundRecords) {
  const bank = banks[fr.bankIdx];
  console.log(`═══ Bank ${fr.bankIdx} at offset 0x${fr.offset.toString(16)} (CPU $${(0x8000 + fr.offset).toString(16)}): ${fr.count} records ═══`);
  
  for (let i = 0; i < Math.min(fr.count, 20); i++) {
    const off = fr.offset + i * 16;
    const jersey = bank[off];
    const name = bank.slice(off + 1, off + 5);
    const pos = bank[off + 5];
    const stats = bank.slice(off + 6, off + 14);
    const flags = (bank[off + 15] << 8) | bank[off + 14];
    console.log(`  Rec ${i.toString().padStart(2)}: #${jersey.toString().padStart(2)} name=[${name.map(b => '0x' + b.toString(16).padStart(2, '0')).join(',')}] pos=${posNames[pos] || '??'} shot=${stats[0].toString().padStart(3)} spd=${stats[1].toString().padStart(3)} tec=${stats[2].toString().padStart(3)} sta=${stats[3].toString().padStart(3)} pass=${stats[4].toString().padStart(3)} tkl=${stats[5].toString().padStart(3)} hdr=${stats[6].toString().padStart(3)} gk=${stats[7].toString().padStart(3)} flags=0x${flags.toString(16).padStart(4, '0')}`);
  }
  console.log('');
}

// ═══════════════════════════
// 检查 $842A 指针表 (Bank 27) 指向的位置
// ═══════════════════════════
console.log('=== Checking $842A Pointer Table Targets ===');

const bank27 = banks[27];
const ptrTable = [];
for (let i = 0; i < 15; i++) {
  const off = 0x042A + i * 2;
  ptrTable.push((bank27[off + 1] << 8) | bank27[off]);
}
console.log(`Bank 27 $842A (15 pointers): ${ptrTable.map(p => '$' + p.toString(16)).join(', ')}`);

// $A000-$BFFF 窗口映射检查
// 在 MMC3 中，$A000->$BFFF 窗口可以映射任意 bank
// 这些指针都是 $A4xx，映射到 bank 28 时 offset = $A4xx - $A000 = $04xx
console.log('\nPointer targets in bank 28 (assuming $A000 window → bank 28):');
const bank28 = banks[28];
for (let i = 0; i < ptrTable.length; i++) {
  const ptr = ptrTable[i];
  const b28off = ptr - 0xA000;
  if (b28off >= 0 && b28off < BANK_SIZE) {
    const targetBytes = bank28.slice(b28off, b28off + 16);
    console.log(`  Ptr ${i}: $${ptr.toString(16)} → bank28[0x${b28off.toString(16)}]: [${targetBytes.map(b => b.toString(16).padStart(2, '0')).join(' ')}]`);
  }
}

// 也检查这些指针在 bank 29, 26 等其他 banks
console.log('\nCross-reference: checking ptrs in nearby banks:');
for (const b of [26, 28, 29, 30]) {
  const testBank = banks[b];
  console.log(`\n  Bank ${b} at ptr-target offsets:`);
  for (let i = 0; i < Math.min(3, ptrTable.length); i++) {
    const ptr = ptrTable[i];
    const off = ptr - 0xA000;
    if (off >= 0 && off < BANK_SIZE) {
      const bytes = testBank.slice(off, off + 16);
      const valid = isValidPlayer(testBank, off);
      console.log(`    $${ptr.toString(16)} => off=0x${off.toString(16)}: [${bytes.slice(0,8).map(b => b.toString(16).padStart(2,'0')).join(' ')}...] valid=${valid}`);
    }
  }
}

// ═══════════════════════════
// Bank 28 未导出数据区域扫描
// ═══════════════════════════
console.log('\n=== Bank 28 unexported region scan ($046A-$0746) ===');
const b28 = banks[28];
const gapStart = 0x046A;
const gapEnd = 0x0747;
let consecutivePlayers = 0;
let bestRun = { start: 0, count: 0 };

for (let off = gapStart; off + 16 <= gapEnd; off++) {
  if (isValidPlayer(b28, off)) {
    consecutivePlayers++;
  } else {
    if (consecutivePlayers > bestRun.count) {
      bestRun = { start: off - consecutivePlayers, count: consecutivePlayers };
    }
    consecutivePlayers = 0;
  }
}
if (consecutivePlayers > bestRun.count) {
  bestRun = { start: gapEnd - consecutivePlayers, count: consecutivePlayers };
}

console.log(`Best consecutive run: ${bestRun.count} at offset 0x${bestRun.start.toString(16)}`);

if (bestRun.count >= 3) {
  console.log(`\nDumping best run of ${bestRun.count} records:`);
  for (let i = 0; i < bestRun.count; i++) {
    const off = bestRun.start + i * 16;
    const bytes = b28.slice(off, off + 16);
    const jersey = bytes[0]; const pos = bytes[5];
    const stats = bytes.slice(6, 14);
    console.log(`  ${i}: #${jersey.toString().padStart(2)} pos=${posNames[pos]||'?'} stats=[${stats.join(',')}] hex=[${bytes.map(b=>b.toString(16).padStart(2,'0')).join(' ')}]`);
  }
}

console.log('\nDone.');
