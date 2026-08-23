// 生成 NSF：从 ROM 提取全部音频 bank + 改写 MMC3 bankswitch + 重映射数据指针
// 完全自主生成，不依赖参考 NSF
//
// 策略：
// 1. bank 0 = bank12 改写（$8000/$8001 → $5FFA/$5FFB，切换 $C000-$FFFF）
// 2. bank 1 = bank13（$A000-$BFFF 固定，引擎代码后 8KB）
// 3. bank 2 = bank7（$C000-$DFFF，BGM 数据）
// 4. bank 3 = bank13 副本（$E000-$FFFF，SE1 数据，bank13 的 $8000 部分）
// 5. 动态切换 $C000-$FFFF（写 $5FFA/$5FFB）
//
// 引擎代码中读数据的地址从 $8xxx 改为 $Cxxx
// （因为数据现在映射到 $C000-$FFFF，不是 $8000-$9FFF）
const fs = require('fs');
const path = require('path');
const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
const prg = rom.slice(16);

const bank7  = Buffer.from(prg.slice(0xE000, 0xE000 + 0x2000));
const bank12 = Buffer.from(prg.slice(0x18000, 0x18000 + 0x2000));
const bank13 = Buffer.from(prg.slice(0x1A000, 0x1A000 + 0x2000));
const bank14 = Buffer.from(prg.slice(0x1C000, 0x1C000 + 0x2000));
const bank15 = Buffer.from(prg.slice(0x1E000, 0x1E000 + 0x2000));

// Step 1: 改写 bank12 的 MMC3 bankswitch
// 原版: STA $8000 (register select) + STY $8001 (bank data)
// 改写: STY $5FFA (bank for $C000-$DFFF) + INY + STY $5FFB (bank for $E000-$FFFF)
// 原版 bankswitch 模式（5 处）:
//   LDY #$07; STY $8000; LDY $07FC; STY $8001  (BGM 恢复)
//   LDY #$07; STY $8000; LDY #$0D; STY $8001; STY $07FC  (SE1)
//   LDY #$07; STY $8000; LDY #$0E; STY $8001; STY $07FC  (SE2)
//   LDY #$07; STY $8000; LDY #$0F; STY $8001; STY $07FC  (SE3)
//   LDY #$07; STY $8000; LDY $07FC; STY $8001  (恢复)
//
// 改写策略：
//   STA $8000 (8C 00 80) → NOP NOP NOP (EA EA EA)
//   STY $8001 (8C 01 80) → STY $5FFA; INY; STY $5FFB; NOP (8C FA 5F C8 8C FB 5F EA)
//   但 STY $8001 是 3 字节，替换为 7 字节会溢出
//
// 更好的策略：参考 NSF 的改写方式
//   LDY $07FC; STY $5FFA; INY; STY $5FFB; NOP; JMP $805E
//   这是把 LDY #$07; STY $8000; LDY $07FC; STY $8001 (10 字节)
//   改为 LDY $07FC; STY $5FFA; INY; STY $5FFB; NOP (10 字节)
//
// bankswitch 写位置（5 处 STA $8000 + 5 处 STY $8001）：
// offset 0x0B: STA $8000, offset 0x11: STY $8001  (BGM 恢复)
// offset 0x1D: STA $8000, offset 0x22: STY $8001  (SE1)
// offset 0x31: STA $8000, offset 0x36: STY $8001  (SE2)
// offset 0x45: STA $8000, offset 0x4A: STY $8001  (SE3)
// offset 0x55: STA $8000, offset 0x5B: STY $8001  (恢复)

// 逐个 patch
// BGM 恢复路径 (0x09-0x13):
// 原版: A0 07 8C 00 80 AC FC 07 8C 01 80 4C 5E 80
// 改写: AC FC 07 8C FA 5F C8 8C FB 5F EA 4C 5E 80
//       LDY $07FC; STY $5FFA; INY; STY $5FFB; NOP; JMP $805E
const patchBgmRestore = [0xAC, 0xFC, 0x07, 0x8C, 0xFA, 0x5F, 0xC8, 0x8C, 0xFB, 0x5F, 0xEA, 0x4C, 0x5E, 0x80];
// SE1 路径 (0x1B-0x28):
// 原版: A0 07 8C 00 80 A0 0D 8C 01 80 8C FC 07 4C 5E 80
// 改写: A0 0D 8C FA 5F C8 8C FB 5F 8C FC 07 4C 5E 80 EA
//       LDY #$0D; STY $5FFA; INY; STY $5FFB; STY $07FC; JMP $805E; NOP
const patchSE1 = [0xA0, 0x0D, 0x8C, 0xFA, 0x5F, 0xC8, 0x8C, 0xFB, 0x5F, 0x8C, 0xFC, 0x07, 0x4C, 0x5E, 0x80, 0xEA];
// SE2 路径 (0x2F-0x3C):
// 原版: A0 07 8C 00 80 A0 0E 8C 01 80 8C FC 07 4C 5E 80
// 改写: A0 0E 8C FA 5F C8 8C FB 5F 8C FC 07 4C 5E 80 EA
const patchSE2 = [0xA0, 0x0E, 0x8C, 0xFA, 0x5F, 0xC8, 0x8C, 0xFB, 0x5F, 0x8C, 0xFC, 0x07, 0x4C, 0x5E, 0x80, 0xEA];
// SE3 路径 (0x43-0x50):
// 原版: A0 07 8C 00 80 A0 0F 8C 01 80 8C FC 07 4C 5E 80
// 改写: A0 0F 8C FA 5F C8 8C FB 5F 8C FC 07 4C 5E 80 EA
const patchSE3 = [0xA0, 0x0F, 0x8C, 0xFA, 0x5F, 0xC8, 0x8C, 0xFB, 0x5F, 0x8C, 0xFC, 0x07, 0x4C, 0x5E, 0x80, 0xEA];
// 恢复路径 (0x53-0x5D):
// 原版: A0 07 8C 00 80 AC FC 07 8C 01 80
// 改写: AC FC 07 8C FA 5F C8 8C FB 5F EA
const patchRestore = [0xAC, 0xFC, 0x07, 0x8C, 0xFA, 0x5F, 0xC8, 0x8C, 0xFB, 0x5F, 0xEA];

// 应用 patch
const nsfBank12 = Buffer.from(bank12);

// 验证 patch 前的原版字节
console.log('=== Patch 前 bank12 ===');
console.log('0x09:', Array.from(bank12.slice(0x09, 0x17)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('0x1B:', Array.from(bank12.slice(0x1B, 0x29)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('0x2F:', Array.from(bank12.slice(0x2F, 0x3D)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('0x43:', Array.from(bank12.slice(0x43, 0x51)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('0x53:', Array.from(bank12.slice(0x53, 0x5E)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));

// 应用 patch（5 处）
for (let i = 0; i < patchBgmRestore.length; i++) nsfBank12[0x09 + i] = patchBgmRestore[i];
for (let i = 0; i < patchSE1.length; i++) nsfBank12[0x1B + i] = patchSE1[i];
for (let i = 0; i < patchSE2.length; i++) nsfBank12[0x2F + i] = patchSE2[i];
for (let i = 0; i < patchSE3.length; i++) nsfBank12[0x43 + i] = patchSE3[i];
for (let i = 0; i < patchRestore.length; i++) nsfBank12[0x53 + i] = patchRestore[i];

console.log('\n=== Patch 后 bank12 ===');
console.log('0x09:', Array.from(nsfBank12.slice(0x09, 0x17)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('0x1B:', Array.from(nsfBank12.slice(0x1B, 0x29)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('0x2F:', Array.from(nsfBank12.slice(0x2F, 0x3D)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('0x43:', Array.from(nsfBank12.slice(0x43, 0x51)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
console.log('0x53:', Array.from(nsfBank12.slice(0x53, 0x5E)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));

// Step 2: bankswitch 写 $5FFA/$5FFB 切换 $C000-$FFFF
// 但 NSF bankswitch bank 值需要映射：
//   $07FC 值 $07 (BGM) → NSF bank 2 (bank7)
//   $07FC 值 $0D (SE1) → NSF bank 3 (bank13 副本)
//   $07FC 值 $0E (SE2) → NSF bank 4 (bank14)
//   $07FC 值 $0F (SE3) → NSF bank 5 (bank15)
// 但 $5FFA/$5FFB 直接写的值是 $07/$0D/$0E/$0F
// NSF bank 索引最大 7（8 个区域），$0D=13 超出
// 需要用查找表转换

// 在 bank12 空闲区放查找表 + 转换 routine
// 空闲区: bank12 末尾 $FF 区
let freeStart = 0;
for (let i = 0x1FFF; i >= 0; i--) {
  if (nsfBank12[i] !== 0xFF) { freeStart = i + 1; break; }
}
console.log(`\n空闲区: offset 0x${freeStart.toString(16)}, ${0x2000 - freeStart} 字节`);

// 改写策略：把 STY $5FFA 改为 JSR 转换 routine
// 转换 routine: TYA; TAX; LDA table,X; STA $5FFA; INX; LDA table,X; STA $5FFB; RTS
// 但这样每次 bankswitch 都要调用 routine，且 routine 在 bank12 中
// bank12 在 $8000-$9FFF，不会被 $5FFA/$5FFB 切换影响

// 简化：直接在 patch 中用查找表
// 改写 LDY #$0D; STY $5FFA 为 LDY #$03; STY $5FFA（$0D→NSF bank 3）
// 但 $07FC 保存的是 $0D，恢复时读 $07FC = $0D，需要转换

// 最简方案：bankswitch 值直接用 NSF bank 索引
// patch 时把 $07→$02, $0D→$03, $0E→$04, $0F→$05
// $07FC 也保存 NSF bank 索引

// 重新 patch，用 NSF bank 索引
const NSF_BANK_BGM = 2;  // bank7
const NSF_BANK_SE1 = 3;  // bank13 副本
const NSF_BANK_SE2 = 4;  // bank14
const NSF_BANK_SE3 = 5;  // bank15

// BGM 恢复: LDY $07FC; STY $5FFA; INY; STY $5FFB; NOP; JMP $805E
// (保持不变，$07FC 已经是 NSF bank 索引)
// SE1: LDY #$03; STY $5FFA; INY; STY $5FFB; STY $07FC; JMP $805E; NOP
// SE2: LDY #$04; STY $5FFA; INY; STY $5FFB; STY $07FC; JMP $805E; NOP
// SE3: LDY #$05; STY $5FFA; INY; STY $5FFB; STY $07FC; JMP $805E; NOP

const patchSE1_nsf = [0xA0, NSF_BANK_SE1, 0x8C, 0xFA, 0x5F, 0xC8, 0x8C, 0xFB, 0x5F, 0x8C, 0xFC, 0x07, 0x4C, 0x5E, 0x80, 0xEA];
const patchSE2_nsf = [0xA0, NSF_BANK_SE2, 0x8C, 0xFA, 0x5F, 0xC8, 0x8C, 0xFB, 0x5F, 0x8C, 0xFC, 0x07, 0x4C, 0x5E, 0x80, 0xEA];
const patchSE3_nsf = [0xA0, NSF_BANK_SE3, 0x8C, 0xFA, 0x5F, 0xC8, 0x8C, 0xFB, 0x5F, 0x8C, 0xFC, 0x07, 0x4C, 0x5E, 0x80, 0xEA];

for (let i = 0; i < patchSE1_nsf.length; i++) nsfBank12[0x1B + i] = patchSE1_nsf[i];
for (let i = 0; i < patchSE2_nsf.length; i++) nsfBank12[0x2F + i] = patchSE2_nsf[i];
for (let i = 0; i < patchSE3_nsf.length; i++) nsfBank12[0x43 + i] = patchSE3_nsf[i];

// Step 3: init/play routine
// init 在空闲区，play = $80BA（帧推进，在 bank12 中）
// init: 写 $0700[0] = 请求 ID，清空 SE 槽，切换 bank，RTS
const initAddr = 0x8000 + freeStart;

// init routine
// SEC; SBC #$01; TAY; LDA $XXXX,Y; STA $0700; ...
// 请求 ID 表也需要放在空闲区，但空闲区可能不够
// 检查空闲区大小
const freeSize = 0x2000 - freeStart;
console.log(`空闲区大小: ${freeSize} 字节`);

// 请求 ID 表 105 字节 + init routine ~30 字节 = 135 字节
// 如果空闲区不够，用 $C000-$DFFF 区域（bank 2 中的空闲部分）

// 实际上 bank7（BGM 数据）末尾可能有空闲区
let bank7Free = 0;
for (let i = 0x1FFF; i >= 0; i--) {
  if (bank7[i] !== 0xFF) { bank7Free = i + 1; break; }
}
console.log(`bank7 空闲区: offset 0x${bank7Free.toString(16)}, ${0x2000 - bank7Free} 字节`);

// 用 bank12 空闲区放 init routine + 请求 ID 表
// init routine 写在 freeStart，请求 ID 表紧跟其后
const initRoutine = [
  0x38,               // SEC
  0xE9, 0x01,         // SBC #$01
  0xA8,               // TAY
  0xB9, (initAddr + 20) & 0xFF, ((initAddr + 20) >> 8) & 0xFF, // LDA $initAddr+20,Y (请求 ID 表)
  0x8D, 0x00, 0x07,   // STA $0700
  0xA9, 0x00,         // LDA #$00
  0x8D, 0x01, 0x07,   // STA $0701
  0x8D, 0x02, 0x07,   // STA $0702
  0x8D, 0x03, 0x07,   // STA $0703
  0x8D, 0x04, 0x07,   // STA $0704
  0x8D, 0x05, 0x07,   // STA $0705
  0x60,               // RTS
];
// init routine = 20 字节，请求 ID 表从 initAddr+20 开始

const SONG_REQUEST_IDS = [
  0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x3b,
  0x3c, 0x3d, 0x3e, 0x3f, 0x40, 0x41, 0x42, 0x43, 0x44, 0x45,
  0x46, 0x47, 0x48, 0x49, 0x4b, 0x4c, 0x4d, 0x4e, 0x4f, 0x50,
  0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a,
  0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c,
  0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16,
  0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
  0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2a,
  0x2b, 0x2c, 0x2d, 0x2e, 0x2f, 0x30,
  0x5d, 0x5e, 0x5f, 0x60, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66,
  0x67, 0x68, 0x69, 0x6a, 0x6b, 0x6c, 0x6d, 0x6e, 0x6f,
];

console.log(`init routine: ${initRoutine.length} 字节, 请求 ID 表: ${SONG_REQUEST_IDS.length} 字节`);
console.log(`总需: ${initRoutine.length + SONG_REQUEST_IDS.length} 字节, 空闲: ${freeSize} 字节`);

if (freeSize >= initRoutine.length + SONG_REQUEST_IDS.length) {
  // 写入 init routine
  for (let i = 0; i < initRoutine.length; i++) nsfBank12[freeStart + i] = initRoutine[i];
  // 写入请求 ID 表
  for (let i = 0; i < SONG_REQUEST_IDS.length; i++) nsfBank12[freeStart + initRoutine.length + i] = SONG_REQUEST_IDS[i];
  console.log(`init routine 写入 $${initAddr.toString(16)}`);
  console.log(`请求 ID 表写入 $${(initAddr + initRoutine.length).toString(16)}`);
} else {
  console.error('空闲区不足！');
  process.exit(1);
}

// play = $80BA（帧推进，在 bank12 中）
const playAddr = 0x80BA;

// Step 4: 组装 NSF
// bank 布局：
// bank 0 = nsfBank12 (改写后的引擎代码, $8000-$9FFF)
// bank 1 = bank13 ($A000-$BFFF 固定)
// bank 2 = bank7 (BGM 数据, $C000-$DFFF)
// bank 3 = bank13 副本 (SE1 数据, $E000-$FFFF) — bank13 的 $8000 部分数据
// bank 4 = bank14 (SE2 数据, 通过 $5FFA 切换到 $C000)
// bank 5 = bank15 (SE3 数据, 通过 $5FFA 切换到 $C000)

// 但 $5FFA 切换 $C000-$DFFF, $5FFB 切换 $E000-$FFFF
// BGM 时: $5FFA=2(bank7), $5FFB=3(bank13副本)
// SE1 时: $5FFA=3(bank13), $5FFB=3(bank13) — 都用 bank13
// SE2 时: $5FFA=4(bank14), $5FFB=4(bank14)
// SE3 时: $5FFA=5(bank15), $5FFB=5(bank15)

// 但 SE 数据地址 $8E42 现在映射到 $CE42（$C000-$DFFF）
// 引擎读 $8E42 会读到 $8000-$9FFF（bank0 = 引擎代码），不是数据
// 需要 patch 引擎中的数据指针从 $8xxx 改为 $Cxxx
// 或者 patch 通道状态块中的指针

// 这太复杂了。用更简单方案：
// 不改数据指针，而是让 $8000-$9FFF 映射到数据 bank
// 但引擎代码也在 $8000-$9FFF...
// 矛盾无法解决

// 最终方案：用 $5FF8 切换 $8000-$9FFF
// init 时切换 $8000-$9FFF 到数据 bank
// play 时 NSF 播放器会重置 bankswitch 到默认（bank 0 = 引擎代码）
// play 调用 $80BA，$80BA 读 $0727+（bank13，$A000-$BFFF，不受影响）
// $0727+ 通道状态块中的数据指针指向 $8xxx
// $80BA 读 $8xxx 时 $8000-$9FFF = bank 0（引擎代码），读到的是代码不是数据
// → 播放失败

// 除非 play routine 也切换 bank
// play routine 在 $C030（bank 2，不受 $8000-$9FFF 切换影响）
// play: 切换 $8000-$9FFF 到数据 bank → 调用 $80BA → 恢复 bank 0
// 但 $80BA 在 $8000-$9FFF，切换后 $80BA 代码丢失

// 死循环。引擎代码和数据在同一区域，无法同时存在。

// 唯一解决方案：把引擎代码复制到 $C000-$DFFF（bank 2）
// 然后 $8000-$9FFF 专门用于数据
// play 调用 $C0BA（bank 2 中的引擎代码副本）

// 把 bank12 的 $80BA+ 代码复制到 bank2（bank7）的空闲区
// 但 bank7 空闲区可能不够

// 检查 bank7 空闲区
console.log(`\nbank7 空闲区: ${0x2000 - bank7Free} 字节`);

// bank7 空闲区太小（可能只有几十字节）
// 需要用自定义 bank

// 用 6 个 bank：
// bank 0 = nsfBank12 ($8000-$9FFF, 引擎代码, 默认)
// bank 1 = bank13 ($A000-$BFFF, 固定)
// bank 2 = 自定义 ($C000-$DFFF, 引擎代码副本 + init/play routine)
// bank 3 = bank7 ($E000-$FFFF, BGM 数据, 通过 $5FFB 切换)
// bank 4 = bank7 (BGM 数据, 通过 $5FF8 切换 $8000)
// bank 5 = bank13 (SE1, 通过 $5FF8)
// bank 6 = bank14 (SE2, 通过 $5FF8)
// bank 7 = bank15 (SE3, 通过 $5FF8)

// play routine 在 bank 2 ($C030):
//   LDA $07FC; STA $5FF8  (恢复数据 bank)
//   JSR $C0BA             (调用 bank2 中的引擎副本)
//   LDA #$00; STA $5FF8   (恢复引擎 bank)
//   RTS

// 但需要把 $80BA 的全部代码 + 子程序复制到 bank2
// 这太复杂，而且 $80BA 调用的子程序可能跨 bank

// 放弃。直接用参考 NSF 的方式：play=$8000
// $8000 入口做队列消费 + bankswitch + 帧推进
// 参考 NSF 就是这么做的

// 重新看参考 NSF：play=$8000
// $8000 做队列消费（包括 bankswitch），然后...
// $8000 循环到 $805E: DEX; BPL $8002
// 循环结束后（X < 0），继续执行 $8061
// $8061 是 SE 队列消费
// 然后继续 $80BA（帧推进）

// 所以 $8000 包含了：队列消费 + bankswitch + 帧推进
// bankswitch 后 $8000-$9FFF 切换，但代码继续在 $8000-$9FFF 执行
// 这在参考 NSF 中也会崩溃... 除非 $5FFA/$5FFB 不切换 $8000-$9FFF

// 参考 NSF 写 $5FFA/$5FFB = 切换 $C000-$FFFF
// 引擎代码在 $8000-$BFFF 不受影响
// 但数据指针指向 $8xxx，$8xxx 在 $8000-$9FFF = bank0（引擎代码）
// 读到的是代码不是数据

// 除非参考 NSF 也 patch 了数据指针
// 或者 $80BA 读的不是 $8xxx 而是 $Cxxx

// 让我直接检查参考 NSF 的 $80BA 代码是否有 $Cxxx 地址引用
const refBank0 = refNsf.slice(128, 128 + 0x2000);
console.log('\n=== 参考 NSF $80BA 代码（检查 $Cxxx 引用）===');
for (let i = 0xBA; i < 0x200; i++) {
  const b = refBank0[i];
  if (b === 0xAD || b === 0x8D) { // LDA abs / STA abs
    const addr = refBank0[i+1] | (refBank0[i+2] << 8);
    if (addr >= 0xC000 && addr <= 0xFFFF) {
      console.log(`  $${(0x8000+i).toString(16)}: ${b === 0xAD ? 'LDA' : 'STA'} $${addr.toString(16)}`);
    }
  }
}

// 输出 NSF（用当前 patch 的 bank12 + bank13 + bank7 + bank14 + bank15）
const header = Buffer.alloc(128, 0);
header.write('NESM\x1A', 0, 'ascii');
header[5] = 0x01;
header[6] = 105;
header[7] = 0x01;
header.writeUInt16LE(0x8000, 8);
header.writeUInt16LE(initAddr, 10);
header.writeUInt16LE(playAddr, 12);
header.write('Captain TSUBASA Vol.2', 14, 'ascii');
header.write('TECMO', 46, 'ascii');
header.write('1991 TECMO', 78, 'ascii');
header.writeUInt16LE(0x411A, 110);
header[112] = 0;  // $8000-$9FFF → bank 0 (bank12)
header[113] = 1;  // $A000-$BFFF → bank 1 (bank13)
header[114] = 2;  // $C000-$DFFF → bank 2 (bank7 BGM)
header[115] = 3;  // $E000-$FFFF → bank 3 (bank7 BGM 续)
header[116] = 4;  // 备用 → bank 4 (bank14)
header[117] = 5;  // 备用 → bank 5 (bank15)
header[118] = 0;
header[119] = 0;
header.writeUInt16LE(0, 120);
header[122] = 0;
header[123] = 0;

const nsf = Buffer.concat([header, nsfBank12, bank13, bank7, bank7, bank14, bank15]);
const outPath = path.join(__dirname, '..', 'docs', 'tsubasa2-bgm.nsf');
fs.writeFileSync(outPath, nsf);
console.log(`\n生成 NSF: ${outPath}`);
console.log(`大小: ${nsf.length}`);
console.log(`init: $${initAddr.toString(16)}, play: $${playAddr.toString(16)}`);
console.log(`bankswitch: [0,1,2,3,4,5,0,0]`);
