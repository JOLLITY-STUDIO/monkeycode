// 验证 NSF 结构 + 检查 bankswitch 寄存器用法
const fs = require('fs');
const path = require('path');
const nsf = fs.readFileSync(path.join(__dirname, '..', 'docs', 'tsubasa2-bgm.nsf'));

console.log('=== NSF 结构验证 ===');
console.log('Magic:', nsf.slice(0, 5).toString('ascii'));
console.log('Songs:', nsf[6]);
console.log('Load: $' + nsf.readUInt16LE(8).toString(16));
console.log('Init: $' + nsf.readUInt16LE(10).toString(16));
console.log('Play: $' + nsf.readUInt16LE(12).toString(16));
console.log('Bankswitch:', Array.from(nsf.slice(112, 120)));
console.log('PRG size:', nsf.length - 128, '=', (nsf.length - 128) / 0x2000, 'banks');

// 检查 init routine（在 bank 2 offset 0x20）
// bank 2 PRG offset = 128 + 2 * 0x2000 = 128 + 0x4000 = 0x4020
const initOff = 128 + 2 * 0x2000 + 0x20;
console.log('\n=== init routine ($C020) ===');
console.log('PRG offset:', initOff);
console.log('代码:', Array.from(nsf.slice(initOff, initOff + 7)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
// 期望: 8D 00 07 20 00 80 60 (STA $0700; JSR $8000; RTS)

// 检查 play routine（在 bank 2 offset 0x30）
const playOff = 128 + 2 * 0x2000 + 0x30;
console.log('\n=== play routine ($C030) ===');
console.log('代码:', Array.from(nsf.slice(playOff, playOff + 4)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
// 期望: 20 BA 80 60 (JSR $80BA; RTS)

// 检查转换 routine（在 bank 2 offset 0x00 = $C000）
const convOff = 128 + 2 * 0x2000;
console.log('\n=== 转换 routine ($C000) ===');
console.log('代码:', Array.from(nsf.slice(convOff, convOff + 9)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
// 期望: A8 AA BD 10 C0 8D F8 5F 60 (TYA; TAX; LDA $C010,X; STA $5FF8; RTS)

// 检查查找表（在 bank 2 offset 0x10 = $C010）
const tableOff = 128 + 2 * 0x2000 + 0x10;
console.log('\n=== 查找表 ($C010) ===');
console.log('数据:', Array.from(nsf.slice(tableOff, tableOff + 16)).map(b => b));
// 期望: [0,0,0,0,0,0,0,4, 0,0,0,0,0,5,6,7]

// 检查 bank12 patch（bank 0）
const bank0Off = 128;
console.log('\n=== bank0 (bank12 patched) 前 32 字节 ===');
console.log(Array.from(nsf.slice(bank0Off, bank0Off + 32)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
// 原版: a2 05 bc 00 07 c0 32 b0 0e a0 07 8c 00 80 ac fc 07 8c 01 80 4c 5e 80
// patch: a2 05 bc 00 07 c0 32 b0 0e a0 07 EA EA EA ac fc 07 20 00 C0 4c 5e 80

// 检查 $5FF8 是否是正确的 NSF bankswitch 寄存器
// NSF spec: bankswitch 寄存器是 $5FF8-$5FFF
// $5FF8 = bank for $8000-$9FFF
// $5FF9 = bank for $A000-$BFFF
// $5FFA = bank for $C000-$DFFF
// $5FFB = bank for $E000-$FFFF
// 所以 STA $5FF8 切换 $8000-$9FFF 的 bank ✓

// 但问题：init 执行 JSR $8000 时，$8000-$9FFF = bank 0 (bank12)
// bank12 的 $8000 入口会执行队列消费
// 队列消费时会写 $5FF8 切换 bank（通过 JSR $C000 转换）
// 切换后 $8000-$9FFF 变成 bank 4/5/6/7（BGM/SE 数据）
// 但引擎代码在 bank 0，切换后 $8000-$9FFF 不再是引擎代码
// 引擎执行到 $8000 之后的代码时，会读到错误的数据！

// 这是根本问题：原版 MMC3 bankswitch 切换 $8000-$9FFF 后
// 引擎代码在 $A000-$BFFF（bank13，固定），不受影响
// 但 NSF 中 $A000-$BFFF = bank 1 (bank13)，引擎代码后半部分在这里
// 而 $8000-$9FFF 切换后变成 BGM/SE 数据
// 引擎从 $8000 继续执行会崩溃

// 原版引擎设计：$8000 入口执行后 JMP $805E（在 $8000-$9FFF 内）
// 但 $8000-$9FFF 切换后 $805E 不再是引擎代码
// 所以原版引擎在切换 bank 后不会继续执行 $8000-$9FFF 的代码
// 它会跳到 $A000-$BFFF（bank13）继续执行

// 让我检查原版 $8000 入口的执行流
// $8000: LDX #$05; LDY $0700,X; CPY #$32; BCS $8017
// BGM 路径: NOP; NOP; NOP; LDY $07FC; JSR $C000(写$5FF8); JMP $805E
// $805E 在 $8000-$9FFF，但此时 bank 已切换！
// $805E 会指向 BGM 数据，不是代码 → 崩溃

// 这就是没声音的原因：bankswitch 后引擎代码丢失
// 原版 MMC3 中 $805E 也在 $8000-$9FFF（bank12），同样会切换
// 但原版 $8000 的 BGM 路径是：选 bank → JMP $805E → DEX → BPL $8002
// 如果 bank 切换了，$805E 就是错误数据
// 除非...原版 $8000 的 BGM 路径不切换 bank，只是设置 $07FC
// 然后在帧推进 $80BA 时才动态切换 bank 读取数据

// 重新看原版 $8000 代码：
// $800B: LDY #$07; STY $8000 (选 R6); LDY $07FC; STY $8001 (写 bank 值)
// 这里 STY $8001 确实切换了 bank！
// 但之后 JMP $805E → $805E 在切换后的 bank 中
// 如果切换到 bank7，$805E = bank7 的 0x5E = BGM 数据
// 这会崩溃...

// 除非 MMC3 的 bankswitch 有延迟（写 $8001 后下一条指令才生效）
// 或者原版 $8000 的 BGM 路径实际上不切换 bank
// 让我重新看：BGM 请求 ID < $32
// $8009: LDY $07FC (读当前 bank)
// $800B: LDY #$07; STY $8000 (选 R6)
// $800E: LDY $07FC; STY $8001 (写 $07FC 保存的 bank 值)
// 如果 $07FC = $07（之前保存的），就切到 bank7
// 但第一次 BGM 请求时 $07FC 可能是默认值

// 等等，看 SE 路径：
// $8017: CPY #$44; BCS ...
// $801B: LDY #$07; STY $8000; LDY #$0D; STY $8001; STY $07FC
// SE 切到 bank $0D 并保存到 $07FC
// BGM 路径恢复 $07FC（之前 SE 设置的 bank）
// 所以 BGM 路径不是切到 bank7，而是恢复之前的 bank！

// 这意味着 BGM 数据不在 bank7？
// 或者 BGM 播放时不需要切换 bank（BGM 数据在当前 bank）

// 重新理解：
// $07FC = "当前音频数据 bank"
// SE 请求时切换到对应 SE bank（$0D/$0E/$0F）并保存到 $07FC
// BGM 请求时恢复 $07FC（保持当前 bank）
// 所以 BGM 数据应该在 SE bank 中？或者在固定 bank13 中？

// 但我们之前确认 bank7 有大量 BGM 乐谱数据（4153 个 $FF）
// 而且 BGM 指针表 $8798 指向 $8892 等，$8892 在 $8000-$9FFF
// 如果 BGM 播放时 $8000-$9FFF = bank12（引擎代码），$8892 = 引擎代码不是 BGM 数据
// 如果 BGM 播放时 $8000-$9FFF = bank7，$8892 = BGM 数据

// 矛盾！除非 BGM 数据同时在 bank7 和 bank12 中
// 或者 BGM 指针不是直接读 $8892，而是经过 bankswitch

// 让我检查帧推进 $80BA 如何读取 BGM 数据
console.log('\n=== bank12 $80BA 代码（帧推进）===');
const bank12orig = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes')).slice(16).slice(0x18000, 0x18000 + 0x2000);
// $80BA = offset 0xBA
console.log('$80BA-80D0:', Array.from(bank12orig.slice(0xBA, 0xD1)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
// $80BA: LDA #$27; STA $00F0; LDA #$07; STA $00F1; LDA #$00; STA $00F2; LDY #$08; STY $00F3
// $00F0/$00F1 = 指针 → $0727（通道状态表基址，在 $A000-$BFFF = bank13）
// 所以帧推进读的是 $0727+（bank13 数据），不是 $8892（bank7 数据）
// BGM 数据指针在通道状态块 $0727+ 中，不在 $8798 表中

// 那 $8798 表是什么？可能是 SE 数据指针表，不是 BGM
// 或者 $8798 是初始化时用的，不是帧推进时用的

console.log('\n=== 关键发现 ===');
console.log('帧推进 $80BA 读 $0727+（bank13 通道状态表），不读 $8798 表');
console.log('$8798 表可能是初始化用的 BGM 指针表，或 SE 表');
console.log('BGM 数据通过通道状态块 $0727+ 的数据指针间接读取');
console.log('通道状态块在 $A000-$BFFF（bank13），不随 $8000-$9FFF bankswitch 变化');
