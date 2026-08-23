// 检查参考 NSF 的 bankswitch 寄存器用法
const fs = require('fs');
const refNsf = fs.readFileSync('tools/tsubasa2-mod-nes/ct2.nsf');
const bank0 = refNsf.slice(128, 128 + 0x2000);

// 参考 NSF bank0 前 32 字节:
// a2 05 bc 00 07 c0 32 b0 0e ac fc 07 8c fa 5f c8 8c fb 5f ea 4c 5e 80
// 反汇编:
// $8000: LDX #$05
// $8002: LDY $0700,X
// $8005: CPY #$32
// $8007: BCS $8017
// $8009: LDY $07FC        ; AC FC 07 (读保存的 bank)
// $800C: STY $5FFA        ; 8C FA 5F (写 $5FFA)
// $800F: INY              ; C8
// $8010: STY $5FFB        ; 8C FB 5F (写 $5FFB)
// $8013: NOP              ; EA (原 STA $8001 被删除)
// $8014: JMP $805E        ; 4C 5E 80

// 原版:
// $8009: LDY #$07         ; A0 07 (R6 select)
// $800B: STY $8000        ; 8C 00 80
// $800E: LDY $07FC        ; AC FC 07
// $8011: STY $8001        ; 8C 01 80

// 参考 NSF 改写:
// LDY $07FC; STY $5FFA; INY; STY $5FFB; NOP; JMP $805E
// 写 $5FFA = $07FC 值, 写 $5FFB = $07FC+1 值
// INY 把 Y 加 1，所以 $5FFB = $07FC + 1

// NSF bankswitch 寄存器:
// $5FF8 = bank for $8000-$9FFF
// $5FF9 = bank for $A000-$BFFF
// $5FFA = bank for $C000-$DFFF
// $5FFB = bank for $E000-$FFFF

// 所以参考 NSF 写 $5FFA/$5FFB = 切换 $C000-$DFFF 和 $E000-$FFFF
// 不是切换 $8000-$9FFF！

// 这意味着参考 NSF 把 BGM/SE 数据映射到 $C000-$FFFF
// 引擎代码在 $8000-$9FFF (bank 0) 和 $A000-$BFFF (bank 1)
// 数据在 $C000-$DFFF (bank 2) 和 $E000-$FFFF (bank 3)

// 所以引擎读数据时用 $C000-$FFFF 地址，不是 $8000-$9FFF
// 但原版引擎用 $8000-$9FFF 地址读数据...
// 除非参考 NSF 也 patch 了引擎中的数据读取地址

// 检查参考 NSF 的 $805E
console.log('ref $805E:', Array.from(bank0.slice(0x5E, 0x62)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
// 如果是 CA 10 xx (DEX; BPL)，说明循环正常

// 检查参考 NSF 的帧推进代码
// play=$8000，所以 play 调用 $8000 入口
// $8000 会执行 bankswitch (写 $5FFA/$5FFB) 然后循环
// 但 play 每帧都调用 $8000?
// 不对，play=$8000 意味着每帧调用 $8000
// $8000 是队列消费入口，不是帧推进

// 等等，参考 NSF 的 play=$8000
// 但原版 $8000 是队列消费，不是帧推进
// 参考 NSF 可能把 $8000 改写为帧推进?
// 或者参考 NSF 的 play 调用 $8000 做队列消费 + 帧推进

// 让我检查参考 NSF 的 $80BA（帧推进）是否被改写
console.log('ref $80BA:', Array.from(bank0.slice(0xBA, 0xC0)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
// 原版 $80BA: A9 27 85 F0 A9 07 85 F1
// 如果相同，说明帧推进代码没改

// 关键：参考 NSF 的 bankswitch 写 $5FFA/$5FFB 切换 $C000-$FFFF
// 引擎代码在 $8000-$BFFF 不受影响
// 但引擎读数据时用 $8000-$9FFF 地址...
// 除非引擎读数据时也读 $C000-$FFFF

// 检查引擎读取数据的地址
// $80BA: LDA #$27; STA $00F0; LDA #$07; STA $00F1
// $00F0/$00F1 = 指针 → $0727
// $0727 在 $0000-$07FF (RAM)，不是 PRG bank
// 通道状态块 $0727+ 中的数据指针指向哪?
// 如果指向 $8xxx，那读的是 $8000-$9FFF (bank 0 = 引擎代码)
// 如果指向 $Cxxx，那读的是 $C000-$DFFF (bank 2 = 数据)

// 参考 NSF 可能 patch 了通道状态块中的数据指针
// 让数据指针指向 $C000-$FFFF 而不是 $8000-$9FFF

console.log('\n=== 参考 NSF bankswitch 机制 ===');
console.log('bankswitch: [0,1,2,3,4,0,0,0]');
console.log('$5FFA = bank for $C000-$DFFF');
console.log('$5FFB = bank for $E000-$FFFF');
console.log('引擎代码: $8000-$BFFF (bank 0+1, 固定)');
console.log('数据: $C000-$FFFF (bank 2+3, 动态切换)');
console.log('');
console.log('原版数据指针指向 $8xxx → 参考 NSF 可能改为 $Cxxx');
console.log('或者参考 NSF 把数据 bank 映射到 $C000-$FFFF');

// 检查参考 NSF bank 2/3 是否包含 BGM/SE 数据
const bank2 = refNsf.slice(128 + 0x4000, 128 + 0x6000);
const bank3 = refNsf.slice(128 + 0x6000, 128 + 0x8000);
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);
const origBank7 = rom.slice(0xE000, 0xE000 + 0x2000);

// bank2 vs bank7
let m2_7 = 0;
for (let i = 0; i < 0x2000; i++) if (bank2[i] === origBank7[i]) m2_7++;
console.log('bank2 vs bank7:', m2_7, '/8192');

// bank3 vs bank7
let m3_7 = 0;
for (let i = 0; i < 0x2000; i++) if (bank3[i] === origBank7[i]) m3_7++;
console.log('bank3 vs bank7:', m3_7, '/8192');

// bank2 vs bank13
const origBank13 = rom.slice(0x1A000, 0x1A000 + 0x2000);
let m2_13 = 0;
for (let i = 0; i < 0x2000; i++) if (bank2[i] === origBank13[i]) m2_13++;
console.log('bank2 vs bank13:', m2_13, '/8192');

// bank2 vs bank14
const origBank14 = rom.slice(0x1C000, 0x1C000 + 0x2000);
let m2_14 = 0;
for (let i = 0; i < 0x2000; i++) if (bank2[i] === origBank14[i]) m2_14++;
console.log('bank2 vs bank14:', m2_14, '/8192');

// bank2 vs bank15
const origBank15 = rom.slice(0x1E000, 0x1E000 + 0x2000);
let m2_15 = 0;
for (let i = 0; i < 0x2000; i++) if (bank2[i] === origBank15[i]) m2_15++;
console.log('bank2 vs bank15:', m2_15, '/8192');
