// 对比 Bank30 初始化了哪些 $07xx RAM，Bank12 需要哪些
const b30 = require('./rom-data/prg-bank-30').default;
const b12 = require('./mini-audio/rom-data/prg-bank-12').default;

// Bank30 写入 $07xx
console.log('=== Bank30 写入 $07xx ===');
for (let i = 0; i < b30.length - 2; i++) {
  if (b30[i] === 0x8D && b30[i + 2] === 0x07) { // STA abs
    console.log(`  $${(0xC000 + i).toString(16).toUpperCase()} STA $07${b30[i + 1].toString(16).toUpperCase().padStart(2, '0')}`);
  }
  if (b30[i] === 0x9D && b30[i + 2] === 0x07) { // STA abs,X
    console.log(`  $${(0xC000 + i).toString(16).toUpperCase()} STA $07${b30[i + 1].toString(16).toUpperCase().padStart(2, '0')},X`);
  }
}

// Bank12 访问 $07xx
const readOps = new Set([0xAD, 0xA5, 0xB5, 0xB1, 0xAC, 0xA4, 0xB4, 0xBC, 0xAE, 0xB6, 0xBE]);
const writeOps = new Set([0x8D, 0x85, 0x95, 0x91, 0x8C, 0x84, 0x94, 0x9D, 0x99, 0x81, 0x8F]);
let reads = new Set(), writes = new Set();
for (let i = 0; i < b12.length - 2; i++) {
  const op = b12[i], lo = b12[i + 1], hi = b12[i + 2];
  if (hi === 0x07) {
    const addr = '$07' + lo.toString(16).toUpperCase().padStart(2, '0');
    if (readOps.has(op)) reads.add(addr);
    if (writeOps.has(op)) writes.add(addr);
  }
}
console.log(`\n=== Bank12 需要: ===`);
console.log(`读取(${reads.size}):`, [...reads].sort().join(' '));
console.log(`写入(${writes.size}):`, [...writes].sort().join(' '));

// 也看 Bank12 $0000-$06FF 的访问
let readsLo = new Set(), writesLo = new Set();
for (let i = 0; i < b12.length - 2; i++) {
  const op = b12[i], lo = b12[i + 1], hi = b12[i + 2];
  if (hi <= 0x06) {
    const addr = '$' + hi.toString(16).toUpperCase().padStart(2, '0') + lo.toString(16).toUpperCase().padStart(2, '0');
    if (readOps.has(op)) readsLo.add(addr);
    if (writeOps.has(op)) writesLo.add(addr);
  }
}
console.log(`\nBank12 读取 <$0700 (${readsLo.size}):`, [...readsLo].sort().join(' '));
console.log(`Bank12 写入 <$0700 (${writesLo.size}):`, [...writesLo].sort().join(' '));
