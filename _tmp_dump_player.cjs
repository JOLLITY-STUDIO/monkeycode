// 深度分析 player records 結構
const fs = require('fs');
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const header = 16;

// Bank 3 的 player records 在 $A000-$BFFF (ROM 0x008010-0x00A00F)
// 從之前 dump 可知 records 偏移
const records = [
  { name:'Player 0', ptr:0xA020, romOff:0x8030, size:641 },
  { name:'Player 1', ptr:0xA2A1, romOff:0x82B1, size:901 },
  { name:'Player 2', ptr:0xA626, romOff:0x8636, size:142 },
  { name:'Player 3', ptr:0xA6B4, romOff:0x86C4, size:40  },
  { name:'Player 4', ptr:0xA6DC, romOff:0x86EC, size:652 },
];

// 分析每筆記錄中出現的所有 single-byte markers ($E8-$FF)
// 看標記後面的 byte 值分布
console.log('=== Player Records 標記字節分析 ===\n');

for (let rec of records) {
  let data = [];
  for (let i = 0; i < Math.min(rec.size, 128); i++) {
    data.push(rom[rec.romOff + i]);
  }
  
  console.log(`${rec.name} @ $${rec.ptr.toString(16)}, size=${rec.size}:`);
  
  let markers = {};
  for (let i = 0; i < data.length; i++) {
    let b = data[i];
    if (b >= 0xE8 && b <= 0xFC && i + 1 < data.length) {
      let next = data[i+1];
      let key = `$${b.toString(16).toUpperCase()}`;
      if (!markers[key]) markers[key] = [];
      markers[key].push(next);
    }
  }
  
  for (let [k, vs] of Object.entries(markers)) {
    let vals = vs.slice(0, 10).map(v => `$${v.toString(16)}`).join(' ');
    console.log(`  ${k} (${vs.length}x): ${vals}${vs.length>10?' ...':''}`);
  }
  console.log();
}

// 統計所有 bank 3 記錄的 marker 分佈
console.log('=== Bank 3 全域 Marker 統計 ===');
let allMarkers = {};
for (let rec of records) {
  for (let i = 0; i < rec.size; i++) {
    let b = rom[rec.romOff + i];
    if (b >= 0xE8 && b <= 0xFC) {
      let key = `$${b.toString(16).toUpperCase()}`;
      allMarkers[key] = (allMarkers[key] || 0) + 1;
    }
  }
}
for (let [k, cnt] of Object.entries(allMarkers).sort()) {
  console.log(`  ${k}: ${cnt}`);
}

// 查看 bank 4 的 pointer table
console.log('\n=== Bank 4 指標表 ===');
let ptrs = [];
for (let i = 0; i < 30; i += 2) {
  let off = header + 4 * 0x2000 + i;
  let ptr = rom[off] | (rom[off+1] << 8);
  if (ptr < 0x8000 || ptr >= 0xC000) break;
  ptrs.push(ptr);
}
console.log(`  ${ptrs.length} 條目`);
ptrs.forEach((p, i) => console.log(`  [${i}] $${p.toString(16)}`));

// 查看 bank 5 的 pointer table
console.log('\n=== Bank 5 指標表 ===');
ptrs = [];
for (let i = 0; i < 30; i += 2) {
  let off = header + 5 * 0x2000 + i;
  let ptr = rom[off] | (rom[off+1] << 8);
  if (ptr < 0x8000 || ptr >= 0xC000) break;
  ptrs.push(ptr);
}
console.log(`  ${ptrs.length} 條目`);
ptrs.forEach((p, i) => console.log(`  [${i}] $${p.toString(16)}`));

// 搜 ROM 中特定的數值序列，例如連續多個 1-byte small int (0-255) 模式
// 找 bank 3 $B000-$BFFF 後續無指標區域
console.log('\n=== Bank 3 後半 ($B731 之後) 內容 ===');
let afterLast = 0x9741; // $B731 ROM offset
let bytes = [];
for (let i = afterLast; i < Math.min(afterLast + 128, header + 4*0x2000); i++) {
  bytes.push(rom[i].toString(16).padStart(2,'0').toUpperCase());
}
for (let r = 0; r < bytes.length / 16; r++) {
  console.log(`  ${bytes.slice(r*16, (r+1)*16).join(' ')}`);
}
