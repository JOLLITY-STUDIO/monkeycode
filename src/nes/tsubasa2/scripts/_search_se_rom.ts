// 搜索 ROM 中 SE 数据的位置
import bank12 from '../rom-data/prg-bank-12';
import bank15 from '../rom-data/prg-bank-15';

console.log('=== Bank 15 前 0x17AD 区域 (0x0000~0x17AC) 扫描 ===');

// 找类似 BGM header 的结构但 channel 更少
for (let i = 0; i < 0x17AD - 12; i++) {
  // 模式1: 只有 NOISE (0x07 + 2byte ptr)
  if (bank15[i] === 0x07) {
    const ptr = (bank15[i+2] << 8) | bank15[i+1];
    if (ptr >= 0x8000 && ptr <= 0x9FFF && bank15[i+3] === 0xFF) {
      console.log(`  [0x${i.toString(16)}] 0x07+ptr=$${ptr.toString(16)} → term (简版SE header)`);
    }
  }
  // 模式2: 0x05+ptr 后面跟着 0x07+ptr  
  if (bank15[i] === 0x05) {
    const sq2ptr = (bank15[i+2] << 8) | bank15[i+1];
    if (sq2ptr >= 0x8000 && sq2ptr <= 0x9FFF && bank15[i+3] === 0x07) {
      const np = (bank15[i+5] << 8) | bank15[i+4];
      if (np >= 0x8000 && np <= 0x9FFF && bank15[i+6] === 0xFF) {
        console.log(`  [0x${i.toString(16)}] SQ2+NOISE SE: SQ2=$${sq2ptr.toString(16)} NOISE=$${np.toString(16)}`);
      }
    }
  }
}

console.log('\n=== 搜含有 0x03,0x06,0x09,0x0C (SE#1 NOISE pattern) ===');
const target = [0x03, 0x06, 0x09, 0x0C];
for (let i = 0; i < bank15.length - 4; i++) {
  if (bank15[i] === target[0] && bank15[i+1] === target[1] && bank15[i+2] === target[2] && bank15[i+3] === target[3]) {
    console.log(`  Bank15 [0x${i.toString(16)}]: ${target.join(', ')}`);
    console.log(`    前4: [${bank15.slice(Math.max(0,i-4),i).join(', ')}]`);
    console.log(`    后8: [${bank15.slice(i+4,i+12).join(', ')}]`);
  }
}

// 遍历 Bank15 整段搜 0x07 header
console.log('\n=== Bank 15 所有 0x07 header (可能 NOISE 轨道) ===');
for (let i = 0; i < bank15.length - 3; i++) {
  if (bank15[i] === 0x07) {
    const lo = bank15[i+1];
    const hi = bank15[i+2];
    const ptr = (hi << 8) | lo;
    if (ptr >= 0x8000 && ptr < 0xA000) {
      const rel = ptr - 0x8000;
      // 看 ptr 指向的数据
      const dataAtPtr = bank15[rel];
      console.log(`  0x07 header @0x${i.toString(16)} → ptr=$${ptr}(rel=0x${rel.toString(16)}) → 数据:0x${dataAtPtr?.toString(16)}`);
    }
  }
}
