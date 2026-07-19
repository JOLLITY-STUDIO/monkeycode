// 搜 ROM 中結構化球員屬性資料
const fs = require('fs');
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const header = 16;

// 排除 CHR 區域  (PRG 在 header 後面，CHR 在 PRG 後面)
const prgCount = rom[4];
const chrCount = rom[5];
const prgSize = prgCount * 16384;
const chrSize = chrCount * 8192;
const chrStart = header + prgSize;

// 只看 PRG ROM 區域搜尋結構化資料
// 搜 16-bit 小端序列 02 EC (=748), 03 E8 (1000), E8 03 (1000 big-endian)
// 以及大範圍連續數值統計
console.log('=== 搜尋 16-bit 值 $02EC (748) 在 PRG 中的分佈 ===');

let matches = [];
for (let i = header; i < header + prgSize - 1; i++) {
  let val = rom[i] | (rom[i + 1] << 8);
  if (val === 0x02EC) {
    let bank = Math.floor((i - header) / 0x2000);
    let cpu = 0x8000 + ((i - header) % 0x2000);
    // 檢查前後文
    let ctx = [];
    for (let j = Math.max(header, i - 8); j < Math.min(header + prgSize, i + 10); j++) {
      ctx.push(rom[j].toString(16).padStart(2, '0').toUpperCase());
    }
    matches.push({ offset: (i-header).toString(16), cpu: cpu.toString(16), bank, ctx: ctx.join(' ') });
  }
}

console.log(`找到 ${matches.length} 處`);
matches.forEach(m => {
  console.log(`  PRG+0x${m.offset} CPU $${m.cpu} (bank ${m.bank})`);
  console.log(`    ${m.ctx}`);
});
console.log();

// 搜 $E8 $03 (= 1000)
console.log('=== 搜尋 16-bit 值 $03E8 (1000) ===');
matches = [];
for (let i = header; i < header + prgSize - 1; i++) {
  let val = rom[i] | (rom[i + 1] << 8);
  if (val === 0x03E8) {
    let bank = Math.floor((i - header) / 0x2000);
    let cpu = 0x8000 + ((i - header) % 0x2000);
    matches.push({ offset: (i-header).toString(16), cpu: cpu.toString(16), bank });
  }
}
console.log(`找到 ${matches.length} 處`);
matches.forEach(m => {
  console.log(`  PRG+0x${m.offset} CPU $${m.cpu} (bank ${m.bank})`);
});
console.log();

// 找 bank 中重複模式: 連續多組 2-byte 數值範圍在合理體力值內(100-999)
// 在 bank 3/4/5/6 中搜: 看看有沒有類似數組的結構
console.log('=== Bank 3-6 中 16-bit 值在 200-1000 範圍內的分佈 ===');

for (let bank = 3; bank <= 6; bank++) {
  let bankStart = header + bank * 0x2000;
  let found = [];
  for (let i = bankStart; i < bankStart + 0x2000 - 1; i += 2) {
    let val = rom[i] | (rom[i + 1] << 8);
    if (val >= 200 && val <= 1000 && val % 1 === 0) {
      let cpu = 0x8000 + (i - bankStart);
      found.push({ val, cpu: cpu.toString(16) });
    }
  }
  if (found.length > 0) {
    console.log(`  Bank ${bank}: ${found.length} 個值`);
    // 只顯示前 20 個
    found.slice(0, 20).forEach(f => {
      console.log(`    $${f.cpu}: ${f.val}`);
    });
    if (found.length > 20) console.log(`    ... 還有 ${found.length - 20} 個`);
  }
}
console.log();

// 搜 bank 3/5 的 pointer table 結構
// 指標表從 $8000 開始，2-byte LE pointers
console.log('=== Bank 3 指標表分析 ===');
{
  let bankStart = header + 3 * 0x2000;
  let firstPtr = rom[bankStart] | (rom[bankStart+1] << 8);
  console.log(`  第一個指標: $${firstPtr.toString(16)} (指向 bank 3 內? ${firstPtr >= 0x8000 && firstPtr < 0xA000 ? 'YES' : 'NO'})`);
  
  // 前 20 個指標
  let ptrs = [];
  for (let j = 0; j < 40; j += 2) {
    let ptr = rom[bankStart + j] | (rom[bankStart + j + 1] << 8);
    if (ptr >= 0x8000 && ptr < 0xC000) {
      ptrs.push({ idx: j/2, ptr: ptr.toString(16) });
    } else {
      break; // 不是有效指標
    }
  }
  console.log(`  有效指標數: ${ptrs.length}`);
  ptrs.slice(0, 15).forEach(p => console.log(`    [${p.idx}] -> $${p.ptr}`));
}
console.log();

// 搜 Bank 3 中第一個玩家記錄區域
console.log('=== Bank 3 第一筆玩家記錄 ($A020 附近) ===');
{
  let bankStart = header + 3 * 0x2000;
  let recStart = bankStart + 0x2020; // $A020
  let data = [];
  for (let j = 0; j < 64; j++) {
    data.push(rom[recStart + j].toString(16).padStart(2, '0').toUpperCase());
  }
  console.log(`  $A020: ${data.slice(0, 32).join(' ')}`);
  console.log(`  $A040: ${data.slice(32, 64).join(' ')}`);
}
