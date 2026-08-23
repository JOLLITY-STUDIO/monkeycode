// 临时脚本：从 PRG bank00 原始数据验证 $9143-$9150 与 $9480-$94C0 真实字节
const { PRG_BANKS } = require('../src/game/prg/data/rom/index.ts');
const bank0 = PRG_BANKS[0];

function hex(addr, len) {
  const off = addr & 0x1fff;
  const bytes = [];
  for (let i = 0; i < len; i++) bytes.push(bank0[off + i]);
  return bytes.map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
}

console.log('$9140-$9150:', hex(0x9140, 17));
console.log('$92E0-$9308:', hex(0x92e0, 0x28));
console.log('$947C-$94C0:', hex(0x947c, 0x44));
console.log('$9680-$96A5:', hex(0x9680, 0x25));
