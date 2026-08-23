// 临时：核对 bank12 音频指针表 + BGM/SE 数据流格式
const fs = require('fs');
const path = require('path');

const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
const prg = rom.slice(16);

// bank n 8KB：prg 偏移 n*0x2000
const bank = (n) => prg.slice(n * 0x2000, (n + 1) * 0x2000);
const b12 = bank(12); // 16KB 在 $8000-$BFFF，8KB 窗口分两次
// bank12 的 $8000-$9FFF 与 $A000-$BFFF 都在这个 16KB 里
const b7 = bank(7);
const b13 = bank(13);
const b14 = bank(14);
const b15 = bank(15);

// CPU 地址读字节（模拟：$8000-$9FFF 窗口切换 bank；$A000-$BFFF 固定 bank13）
function readByte(cpuAddr, winBank) {
  if (cpuAddr >= 0x8000 && cpuAddr <= 0x9fff) {
    const off = cpuAddr - 0x8000;
    if (winBank === 7) return b7[off];
    if (winBank === 13) return b13[off];
    if (winBank === 14) return b14[off];
    if (winBank === 15) return b15[off];
    return b12[off];
  }
  if (cpuAddr >= 0xa000 && cpuAddr <= 0xbfff) {
    return b13[cpuAddr - 0xa000];
  }
  return 0;
}
const readU16 = (a, w) => readByte(a, w) | (readByte(a + 1, w) << 8);

// bank12 内读（固定，不受窗口影响）
const b12b = (a) => {
  const off = a - 0x8000;
  return off >= 0 && off < 0x4000 ? b12[off] : 0;
};
const b12u16 = (a) => b12b(a) | (b12b(a + 1) << 8);

console.log('=== BGM 指针表 @ $8798 (29 条) ===');
const bgmPtrs = [];
for (let i = 0; i < 29; i++) {
  const p = b12u16(0x8798 + i * 2);
  bgmPtrs.push(p);
  if (i < 8) console.log(`BGM[${i}] = $${p.toString(16)}`);
}
console.log('...');

console.log('\n=== SE 指针表 @ $8BDA (100 条) ===');
const sePtrs = [];
for (let i = 0; i < 100; i++) {
  const p = b12u16(0x8bda + i * 2);
  sePtrs.push(p);
}
for (let i = 0; i < 12; i++) console.log(`SE[${i}] = $${sePtrs[i].toString(16)}`);

// BGM[0] 数据 dump（BGM 窗口 = bank7）
console.log('\n=== BGM[0] 数据流（bank7 窗口，前 96 字节） ===');
let a = bgmPtrs[0];
const bgm0 = [];
for (let i = 0; i < 96; i++) bgm0.push(readByte(a + i, 7));
console.log(Array.from(bgm0).map((v) => v.toString(16).padStart(2, '0')).join(' '));

// SE[0] 数据 dump（SE 窗口：请求 ID < $44 → bank13）
console.log('\n=== SE[0] 数据流（bank13 窗口，前 96 字节） ===');
a = sePtrs[0];
const se0 = [];
for (let i = 0; i < 96; i++) se0.push(readByte(a + i, 13));
console.log(Array.from(se0).map((v) => v.toString(16).padStart(2, '0')).join(' '));

// SE[0] 的第一个通道流（若格式 = [chIdx, ptrLo, ptrHi]...）
const b0 = se0[0];
console.log(`\nSE[0][0] = $${b0.toString(16)} (bit7=${(b0 >> 7) & 1})`);
console.log(`SE[0][1..2] = $${readByte(a + 1, 13).toString(16)} $${readByte(a + 2, 13).toString(16)}`);
console.log(`SE[0][3..4] = $${readByte(a + 3, 13).toString(16)} $${readByte(a + 4, 13).toString(16)}`);
console.log(`SE[0][5..6] = $${readByte(a + 5, 13).toString(16)} $${readByte(a + 6, 13).toString(16)}`);

// 若 SE[0] 头是 [N, ptrLo, ptrHi, ...]，ptr 指向的通道流
const chPtr = readByte(a + 1, 13) | (readByte(a + 2, 13) << 8);
console.log(`\n候选通道指针 chPtr = $${chPtr.toString(16)}，其数据：`);
const chData = [];
for (let i = 0; i < 48; i++) chData.push(readByte(chPtr + i, 13));
console.log(Array.from(chData).map((v) => v.toString(16).padStart(2, '0')).join(' '));

// BGM[0] 第一个通道
const bgmP0 = readByte(bgmPtrs[0] + 1, 7) | (readByte(bgmPtrs[0] + 2, 7) << 8);
console.log(`\nBGM[0][0] = $${bgm0[0].toString(16)} (bit7=${(bgm0[0] >> 7) & 1})`);
console.log(`BGM[0][1..2] = $${bgm0[1].toString(16)} $${bgm0[2].toString(16)}`);
console.log(`BGM[0] 候选通道指针 = $${bgmP0.toString(16)}，其数据：`);
const bgmCh = [];
for (let i = 0; i < 48; i++) bgmCh.push(readByte(bgmP0 + i, 7));
console.log(Array.from(bgmCh).map((v) => v.toString(16).padStart(2, '0')).join(' '));
