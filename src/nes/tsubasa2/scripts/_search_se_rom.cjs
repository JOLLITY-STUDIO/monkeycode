// 搜索 ROM 中 SE 数据的位置
const fs = require('fs');

// 加载所有 bank
const bank12 = require('../../rom-data/prg-bank-12').default;
const bank15 = require('../../rom-data/prg-bank-15').default;
const bank31 = require('../../rom-data/prg-bank-31').default;

// SE #1 NOISE pattern: 0x03, 0x06, 0x09, 0x0C (从 trace 提取)
// SE #2/#3/#4 有 SQ2 频率数据

console.log('=== Bank 15 前 0x17AD 区域 (0x0000~0x17AC) 扫描 ===');
// 找类似 BGM header 的结构但 channel 更少
// BGM header: 0x04+ptr, 0x05+ptr, 0x06+ptr, 0x07+ptr
// SE header 可能: 0x05+ptr, 0x07+ptr 或 单独 0x07+ptr
for (let i = 0; i < 0x17AD - 12; i++) {
  // 模式1: 只有 NOISE (0x07 + 2byte ptr)
  if (bank15[i] === 0x07 && bank15[i+3] === 0xFF) {
    const ptr = (bank15[i+2] << 8) | bank15[i+1];
    if (ptr >= 0x8000 && ptr <= 0x9FFF) { // 有效 bank 15 内指针
      console.log(`  [0x${i.toString(16)}] 0x07+ptr=$${ptr.toString(16)} (简版 SE header)`);
    }
  }
  // 模式2: SQ2+NOISE (0x05+ptr, 0x07+ptr)
  if (bank15[i] === 0x05 && bank15[i+3] === 0x07 &&
      bank15[i+4] !== 0xFF && bank15[i+5] !== 0xFF &&
      bank15[i+6] === 0xFF) {
    const sq2ptr = (bank15[i+2] << 8) | bank15[i+1];
    const np = (bank15[i+5] << 8) | bank15[i+4];
    if (sq2ptr >= 0x8000 && sq2ptr <= 0x9FFF && np >= 0x8000 && np <= 0x9FFF) {
      console.log(`  [0x${i.toString(16)}] SQ2+NOISE SE: SQ2=$${sq2ptr.toString(16)} NOISE=$${np.toString(16)}`);
    }
  }
}

console.log('\n=== 搜含有 0x03,0x06,0x09,0x0C 的连续 NOISE period 序列 (SE #1) ===');
const target = [0x03, 0x06, 0x09, 0x0C];
for (let i = 0; i < bank15.length - 8; i++) {
  const slice = bank15.slice(i, i + 4);
  if (slice[0] === target[0] && slice[1] === target[1] && slice[2] === target[2] && slice[3] === target[3]) {
    console.log(`  Bank15 [0x${i.toString(16)}]: [${slice.join(', ')}]`);
    console.log(`    前后: [${bank15.slice(i-4,i).join(', ')}] -> [${bank15.slice(i+4,i+12).join(', ')}]`);
  }
}

console.log('\n=== Bank 12 开头区域 (0x0000~0x0400) 搜数据表 ===');
// 搜可能的数据指针表
for (let i = 0; i < 0x400; i++) {
  // BGM header 模式在 bank 12
  if (bank12[i] === 0x04 && bank12[i+3] === 0x05 && bank12[i+7] === 0x06 && bank12[i+11] === 0x07) {
    console.log(`  Bank12 [0x${i.toString(16)}]: 完整BGM header`);
    for (let j = 0; j < 16; j++) {
      console.log(`    [${((i+j).toString(16)).padStart(4,'0')}] 0x${bank12[i+j].toString(16).padStart(2,'0')}`);
    }
  }
}

// 看 bank 12 后半部分
console.log('\n=== Bank 12 后半部分 (0x1800~0x1FFF) 搜异常数据模式 ===');
let lastType = 'code';
for (let i = 0x1800; i < bank12.length - 8; i++) {
  // 检测可能的 SE period 序列 (连续值在 0x02-0x0F 之间)
  const vals = bank12.slice(i, i + 8);
  const allLow = vals.every(v => v >= 0x02 && v <= 0x0F);
  if (allLow) {
    const ctx = `${i.toString(16).padStart(4,'0')}: [${vals.join(', ')}]`;
    if (i % 0x100 === 0 || vals[0] !== bank12[i-1]) {
      console.log(`  Bank12 $${ctx}`);
    }
  }
}
