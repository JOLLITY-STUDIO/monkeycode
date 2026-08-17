// 分析 Bank 12 的 SE 数据指针表 ($8BDA)
import bank12 from '../rom-data/prg-bank-12';

// $8BDA = offset 0xBDA in bank (since bank maps to $8000)
const BASE = 0xBDA;

console.log('=== SE/通道数据指针表 ($8BDA) ===');
for (let ch = 0; ch < 8; ch++) {
  const off = BASE + ch * 2;
  const lo = bank12[off];
  const hi = bank12[off + 1];
  const ptr = (hi << 8) | lo;
  // pointer is in bank 12 range ($8000-$9FFF)
  const rel = ptr - 0x8000;
  console.log(`Channel ${ch}: $${
    ptr.toString(16)
  } (offset 0x${rel.toString(16)}) → data: 0x${
    bank12[rel]?.toString(16).padStart(2, '0')
  }`);
  
  // Show first 16 bytes of the pointed data
  if (rel < bank12.length) {
    const slice = bank12.slice(rel, Math.min(rel + 16, bank12.length));
    console.log(`  bytes: [${slice.map(b => '0x' + b.toString(16).padStart(2, '0')).join(', ')}]`);
  }
  console.log('');
}
