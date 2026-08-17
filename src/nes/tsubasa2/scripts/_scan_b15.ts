// 详细分析 Bank 15 结构，找所有 BGM header 和 SE 数据
import bank15 from '../rom-data/prg-bank-15';

console.log('=== Bank 15 完整结构扫描 ===\n');

// BGM header: 04 lo hi 05 lo hi 06 lo hi 07 lo hi [FF?]
for (let i = 0; i < bank15.length - 13; i++) {
  if (bank15[i] === 0x04 && bank15[i+3] === 0x05 && bank15[i+7] === 0x06 && bank15[i+11] === 0x07) {
    const sq1 = (bank15[i+2] << 8) | bank15[i+1];
    const sq2 = (bank15[i+5] << 8) | bank15[i+4];
    const tri = (bank15[i+9] << 8) | bank15[i+8];
    const noi = (bank15[i+12] << 8) | bank15[i+11];
    const term = bank15[i+13];
    
    const ok = (p: number) => p >= 0x8000 && p <= 0x9FFF;
    console.log(`BGM @0x${i.toString(16)}: SQ1=$${sq1.toString(16)}=${ok(sq1)?'✓':'✗'} SQ2=$${sq2.toString(16)}=${ok(sq2)?'✓':'✗'} TRI=$${tri.toString(16)}=${ok(tri)?'✓':'✗'} NOI=$${noi.toString(16)}=${ok(noi)?'✓':'✗'} term=0x${term.toString(16)}`);
  }
}

// 05+ptr 07+ptr FF
console.log('\n=== SE header 候选 (SQ2+NOISE+FF) ===');
for (let i = 0; i < bank15.length - 7; i++) {
  if (bank15[i] === 0x05 && bank15[i+3] === 0x07 && bank15[i+6] === 0xFF) {
    const sq2 = (bank15[i+2] << 8) | bank15[i+1];
    const noi = (bank15[i+5] << 8) | bank15[i+4];
    console.log(`0x${i.toString(16)}: SQ2=$${sq2.toString(16)} NOI=$${noi.toString(16)}`);
  }
}

// 单独 07+FF
console.log('\n=== NOISE-only header (07+ptr+FF) ===');
for (let i = 0; i < bank15.length - 4; i++) {
  if (bank15[i] === 0x07 && bank15[i+3] === 0xFF) {
    const ns = (bank15[i+2] << 8) | bank15[i+1];
    console.log(`0x${i.toString(16)}: NOI=$${ns.toString(16)}`);
  }
}
