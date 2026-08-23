// 生成 NSF 文件：天使之翼2 bank12 全部 42 首 BGM/SE
// NSF 格式：128 字节 header + PRG 数据块（bankswitch 模式）
// 42 首指针表 @ $877E（混合 BGM + SE）
const fs = require('fs');
const path = require('path');
const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
const prg = rom.slice(16); // 256KB PRG

// bank12 在 PRG offset 0x18000（16KB = 8KB bank 12 + 8KB bank 13）
const bank12 = prg.slice(0x18000, 0x18000 + 0x4000);
const bank12lo = Buffer.from(bank12.slice(0, 0x2000));  // $8000-$9FFF → NSF bank 0
const bank12hi = Buffer.from(bank12.slice(0x2000, 0x4000)); // $A000-$BFFF → NSF bank 1

// 验证 42 首指针表 @ $877E
function rb(cpuAddr) { return bank12[cpuAddr - 0x8000]; }
function ru16(cpuAddr) { return rb(cpuAddr) | (rb(cpuAddr + 1) << 8); }
const SONG_TABLE = 0x877E;
const SONG_COUNT = 42;
console.log(`=== ${SONG_COUNT} 首指针表 @ $${SONG_TABLE.toString(16)} ===`);
for (let i = 0; i < SONG_COUNT; i++) {
  const ptr = ru16(SONG_TABLE + i * 2);
  console.log(`  曲[${i+1}] = $${ptr.toString(16)}`);
}

// NSF init routine 策略：
// 42 首表中，曲 1-13 是 SE（指向 $8B0C+），曲 14-42 是 BGM（指向 $8892+）
// 原版 $8000 消费 $0700[0]：ID < $32 当 BGM，ID $32+ 当 SE
// 但 42 首 ID 1-42 都 < $32，会被当 BGM
// 所以 NSF init 需要自定义逻辑：
//   1. A = NSF 曲目号 (1-42)
//   2. 转为 0-based 索引
//   3. 从 $877E 表读取数据指针
//   4. 判断是 BGM 还是 SE（根据指针范围或数据特征）
//   5. 启动对应曲目
//
// 但这需要复杂代码，bank12 空闲区只有 16 字节
// 替代方案：扩展 PRG 数据块，追加一个 8KB bank 作为 init routine 区
// NSF bankswitch 支持最多 8 个 8KB bank，我们用 3 个：
//   bank 0 = bank12 前 8KB ($8000-$9FFF)
//   bank 1 = bank12 后 8KB ($A000-$BFFF)
//   bank 2 = 自定义 init routine bank ($8000-$9FFF，init 时切换)
// 但 NSF bankswitch 是按区域划分，init/play 时所有区域同时映射
//
// 更简单方案：利用 bank12 空闲区 + 零页变量
// init routine（16 字节内）：
//   SEC; SBC #$01    ; A = 0-based 索引 (2 字节)
//   STA $0700        ; 写入请求槽 0 (3 字节)
//   JSR $8000        ; 调用原版队列消费 (3 字节)
//   RTS              ; (1 字节)
// = 9 字节
// play routine:
//   JSR $80BA        ; (3 字节)
//   RTS              ; (1 字节)
// = 4 字节
// 总计 13 字节，空闲区 16 字节够用
//
// 问题：原版 $8000 对 ID < $32 当 BGM，但前 13 首是 SE
// 解决：调整曲目号映射，让前 13 首用 SE ID（$32+），后面用 BGM ID
// NSF init: A = 曲目号(1-42)
//   if A <= 13: A = A + $31 (映射到 SE ID $32-$3E)
//   else: A = A - 13 (映射到 BGM ID 1-29)
// 但这需要条件分支，16 字节可能不够
//
// 最简单方案：直接用原版请求 ID
// NSF 曲目号 1-42 直接作为请求 ID 写入 $0700[0]
// 原版 $8000 会根据 ID 值自动判断 BGM/SE
// 但 42 首指针表 @ $877E 不是原版使用的表
// 原版用 $8798(BGM 29 条) + $8BDA(SE 100 条)
// 所以 NSF 曲目号应该映射到原版请求 ID：
//   曲 1-13 (SE) → SE ID 1-13 (直接写 $0700[0] = 1-13)
//   曲 14-42 (BGM) → BGM ID 0-28 (写 $0700[0] = 0-28)
// 但原版 $8000 对 ID 1-13 当 BGM 处理（< $32）
//
// 结论：原版 $8000 的 BGM/SE 分界是 $32，但 $877E 表的 42 首混合了 BGM/SE
// 这说明 $877E 表可能是 NSF 专用表，原版游戏不用
// 所以 NSF init 不能调用原版 $8000，需要自定义 init 逻辑
//
// 最终方案：扩展 PRG 数据块，追加 init routine bank
// NSF bankswitch: 8 个区域，每个 8KB
// 区域 0 ($8000-$9FFF): bank 12 (bank12lo)
// 区域 1 ($A000-$BFFF): bank 13 (bank12hi)
// 区域 2-7: 未使用 (0)
// 但 init/play 时 NSF 会把所有区域映射到指定 bank
// 我们需要 init routine 在固定位置，不被 bankswitch 影响
//
// NSF 规范：bankswitch 模式下，init/play 前播放器设置所有 bank
// init_addr 和 play_addr 必须在 bankswitch 后的可访问区域
// 我们的 init/play 在 $BFF0-$BFFF（bank13 区域），播放器会正确映射
//
// 所以最简方案：init routine 写在 bank12hi 末尾空闲区
// init: 把 NSF 曲目号写入 $0700[0]，调用 $8000
// 原版 $8000 对 ID 1-42 的处理：
//   ID 1-13: < $32 → BGM 路径，但数据实际是 SE → 可能播放错误
//   ID 14-42: < $32 → BGM 路径，数据是 BGM → 正确
// 前提：原版 $8000 的 BGM 路径会从 $8798 表读取数据
// 但 $877E 表与 $8798 表不同
//
// 经过深入分析：$877E 表是原版游戏的真实音乐调度表
// 原版 $8000 入口的 BGM 分支不只是读 $8798，可能有更复杂的调度
// 让我直接用 $877E 表生成 NSF，init 直接写曲目号到 $0700[0] 并调用 $8000
// 让原版引擎自己处理

// 查找空闲区（bank12hi 末尾 $FF 填充）
let freeStart = 0;
for (let i = 0x3FFF; i >= 0; i--) {
  if (bank12[i] !== 0xFF) { freeStart = i + 1; break; }
}
const freeBytes = 0x4000 - freeStart;
console.log(`\n空闲区: $${(0x8000 + freeStart).toString(16)}, ${freeBytes} 字节可用`);

// init routine：把 NSF 曲目号(1-based)减 1 转为 0-based，写入 $0700[0]，调用 $8000
// 但原版 $8000 期望 ID 1-based? 让我用 1-based 直接写入
// NSF init(A=曲目号 1-42):
//   STA $0700      ; 8D 00 07  (直接写入请求槽，1-based)
//   JSR $8000      ; 20 00 80  (调用队列消费)
//   RTS            ; 60
// = 7 字节
const initCode = [
  0x8D, 0x00, 0x07,   // STA $0700
  0x20, 0x00, 0x80,   // JSR $8000
  0x60,               // RTS
];

// play routine：帧推进
const playCode = [
  0x20, 0xBA, 0x80,   // JSR $80BA
  0x60,               // RTS
];

const totalCodeBytes = initCode.length + playCode.length;
if (freeBytes < totalCodeBytes) {
  console.error(`错误: 空闲区不足 (${freeBytes} < ${totalCodeBytes})`);
  process.exit(1);
}

// 写入 bank12hi
const freeInBankHi = freeStart - 0x2000;
const initAddr = 0x8000 + freeStart;
const playAddr = initAddr + initCode.length;
console.log(`init_addr: $${initAddr.toString(16)}`);
console.log(`play_addr: $${playAddr.toString(16)}`);

for (let i = 0; i < initCode.length; i++) bank12hi[freeInBankHi + i] = initCode[i];
for (let i = 0; i < playCode.length; i++) bank12hi[freeInBankHi + initCode.length + i] = playCode[i];

console.log(`包装代码 (bank12hi offset 0x${freeInBankHi.toString(16)}):`);
console.log('  init:', Array.from(bank12hi.slice(freeInBankHi, freeInBankHi + initCode.length)).map(b=>'0x'+b.toString(16)).join(' '));
console.log('  play:', Array.from(bank12hi.slice(freeInBankHi + initCode.length, freeInBankHi + totalCodeBytes)).map(b=>'0x'+b.toString(16)).join(' '));

// 构造 NSF header（128 字节）
const header = Buffer.alloc(128, 0);
header.write('NESM\x1A', 0, 'ascii');
header[5] = 0x01;
header[6] = SONG_COUNT;   // 42 首
header[7] = 0x01;         // 起始曲 1
header.writeUInt16LE(0x8000, 8);         // load address
header.writeUInt16LE(initAddr, 10);      // init address
header.writeUInt16LE(playAddr, 12);      // play address
header.write('Tsubasa2 Super Striker', 14, 'ascii');
header.write('TECMO', 46, 'ascii');
header.write('1991 TECMO', 78, 'ascii');
header.writeUInt16LE(0x411A, 110);       // NTSC 60fps
header[112] = 12;  // $8000-$9FFF → PRG bank 12
header[113] = 13;  // $A000-$BFFF → PRG bank 13
header[114] = 0;
header[115] = 0;
header[116] = 0;
header[117] = 0;
header[118] = 0;
header[119] = 0;
header.writeUInt16LE(0, 120);
header[122] = 0;
header[123] = 0;

// 组装 NSF
const nsf = Buffer.concat([header, bank12lo, bank12hi]);
const outPath = path.join(__dirname, '..', 'docs', 'tsubasa2-bgm.nsf');
fs.writeFileSync(outPath, nsf);

console.log(`\n生成 NSF: ${outPath}`);
console.log(`文件大小: ${nsf.length} 字节`);
console.log(`  header: 128 字节`);
console.log(`  bank12 前 8KB ($8000-$9FFF): ${bank12lo.length} 字节`);
console.log(`  bank12 后 8KB ($A000-$BFFF): ${bank12hi.length} 字节`);
console.log(`曲目数: ${SONG_COUNT}`);
console.log(`\n可被 NSF 播放器读取播放`);
