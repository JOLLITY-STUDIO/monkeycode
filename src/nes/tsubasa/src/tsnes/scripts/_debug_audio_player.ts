/**
 * 诊断 Bank12AudioPlayer 到底哪里出问题
 */
import { Bank12AudioPlayer } from '../pages/bankpage/bank-detail/bank12-audio-player';

const player = new Bank12AudioPlayer();
const raw: number[] = [];
player.onSample = (l: number, r: number) => raw.push((l + r) * 0.5);

// 测试 SE ID 0x03 (最简单的音效)
const TEST_ID = 0x03;
player.play(TEST_ID);

console.log('=== 开始诊断 SE $' + TEST_ID.toString(16) + ' ===');

// 手动调用 _initSound 看结果
const initSound = (player as any)._initSound.bind(player);
(player as any)._clearAllChannels();

// 读取指针表
const b12Ofs = (addr: number) => 12 * 0x2000 + (addr - 0x8000);
const { NES_PRG_ROM } = require('../rom-data/index');
const tblOff = b12Ofs(0x8BDA) + (TEST_ID - 1) * 2;
const ptrLo = NES_PRG_ROM[tblOff];
const ptrHi = NES_PRG_ROM[tblOff + 1];
const initPtr = ptrLo | (ptrHi << 8);
console.log(`SE $${TEST_ID.toString(16)} → 指针表 @ $${tblOff.toString(16)} → 指针 = $${initPtr.toString(16)}`);

// 读取通道初始化列表
console.log('通道初始化列表:');
let listOff = initPtr;
while (true) {
  const ch = NES_PRG_ROM[b12Ofs(listOff)];
  if (ch >= 0x80) { console.log(`  终止符: $${ch.toString(16)}`); break; }
  const tLo = NES_PRG_ROM[b12Ofs(listOff + 1)];
  const tHi = NES_PRG_ROM[b12Ofs(listOff + 2)];
  const tPtr = tLo | (tHi << 8);
  console.log(`  ch${ch}: trackPtr=$${tPtr.toString(16)}`);
  listOff += 3;
}

// 运行初始化
initSound(TEST_ID);

// 检查 RAM 状态
const ram = (player as any).ram;
console.log('\n初始化后 RAM 状态:');
console.log(`  $0706 (activeMask) = $${ram.get(0x0706).toString(16)}`);
for (let ch = 0; ch < 8; ch++) {
  const tLo = ram.getCh(ch, 0);
  const tHi = ram.getCh(ch, 1);
  const tPtr = tLo | (tHi << 8);
  const chType = ram.getPc(ch, 0x07AF);
  if (tPtr) {
    console.log(`  ch${ch}: track=$${tPtr.toString(16)}, chType=$${chType.toString(16)}`);
  }
}

// 运行 10 帧
console.log('\n=== 运行 10 帧 ===');
for (let f = 0; f < 10; f++) {
  (player as any).tickFrame();
  const mask = ram.get(0x0706);
  const vol = ram.getCh(0, 6); // ch0 output volume
  console.log(`  F${f}: activeMask=$${mask.toString(16)}, ch0_vol=$${vol.toString(16)}, samples=${raw.length}`);
}

console.log(`\n总样本数: ${raw.length}, 非零: ${raw.filter(v => Math.abs(v) > 0.001).length}`);
console.log(`progress:`, player.getProgress());

process.exit(0);
