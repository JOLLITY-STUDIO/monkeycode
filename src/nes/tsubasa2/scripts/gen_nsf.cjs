// 生成 NSF 文件：天使之翼2 bank12 全部 15 首 BGM
// NSF 格式：128 字节 header + PRG 数据块（bankswitch 模式）
const fs = require('fs');
const path = require('path');
const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
const prg = rom.slice(16); // 256KB PRG

// bank12 在 PRG offset 0x18000（16KB = 8KB bank 12 + 8KB bank 13）
const bank12 = prg.slice(0x18000, 0x18000 + 0x4000);
const bank24 = Buffer.from(bank12.slice(0, 0x2000));  // $8000-$9FFF
const bank25 = Buffer.from(bank12.slice(0x2000, 0x4000)); // $A000-$BFFF

// 查找空闲区（末尾 $FF 填充）
let freeStart = 0;
for (let i = 0x3FFF; i >= 0; i--) {
  if (bank12[i] !== 0xFF) { freeStart = i + 1; break; }
}
const freeBytes = 0x4000 - freeStart;
console.log(`空闲区: $${(0x8000 + freeStart).toString(16)}, ${freeBytes} 字节可用`);

// NSF init routine（把 NSF 曲目号转换为 bank12 BGM 请求 ID）
// NSF init(A=曲目号, 1-based) → bank12 BGM ID (0-based) → 写 $0700[0] → JSR $8000
// 6502 代码:
//   SEC           ; 38
//   SBC #$01      ; E9 01  (A = A - 1, 转为 0-based)
//   STA $0700     ; 8D 00 07  (写入 BGM 请求槽 0)
//   JSR $8000     ; 20 00 80  (调用队列消费，启动 BGM)
//   RTS           ; 60
// = 8 字节
const initCode = [
  0x38,               // SEC
  0xE9, 0x01,         // SBC #$01
  0x8D, 0x00, 0x07,   // STA $0700
  0x20, 0x00, 0x80,   // JSR $8000
  0x60,               // RTS
];

// NSF play routine（帧推进）
//   JSR $80BA     ; 20 BA 80
//   RTS           ; 60
// = 4 字节
const playCode = [
  0x20, 0xBA, 0x80,   // JSR $80BA
  0x60,               // RTS
];

const totalCodeBytes = initCode.length + playCode.length;
if (freeBytes < totalCodeBytes) {
  console.error(`错误: 空闲区不足 (${freeBytes} < ${totalCodeBytes})`);
  process.exit(1);
}

// 把包装代码写入 bank25（freeStart 在 bank12 末尾，属于 bank25）
const freeInBank25 = freeStart - 0x2000;
const initAddr = 0x8000 + freeStart;
const playAddr = initAddr + initCode.length;
console.log(`init_addr: $${initAddr.toString(16)}`);
console.log(`play_addr: $${playAddr.toString(16)}`);

for (let i = 0; i < initCode.length; i++) bank25[freeInBank25 + i] = initCode[i];
for (let i = 0; i < playCode.length; i++) bank25[freeInBank25 + initCode.length + i] = playCode[i];

// 验证写入
console.log(`包装代码 (bank25 offset 0x${freeInBank25.toString(16)}):`);
console.log('  init:', Array.from(bank25.slice(freeInBank25, freeInBank25 + initCode.length)).map(b=>'0x'+b.toString(16)).join(' '));
console.log('  play:', Array.from(bank25.slice(freeInBank25 + initCode.length, freeInBank25 + totalCodeBytes)).map(b=>'0x'+b.toString(16)).join(' '));

// BGM 数量
const BGM_COUNT = 15;

// 构造 NSF header（128 字节）
const header = Buffer.alloc(128, 0);
header.write('NESM\x1A', 0, 'ascii');      // magic
header[5] = 0x01;                           // version
header[6] = BGM_COUNT;                      // total songs
header[7] = 0x01;                           // starting song (1-based)
header.writeUInt16LE(0x8000, 8);            // load address
header.writeUInt16LE(initAddr, 10);         // init address
header.writeUInt16LE(playAddr, 12);         // play address
header.write('Tsubasa2 BGM Bank12', 14, 'ascii');  // song name (32 bytes)
header.write('TECMO', 46, 'ascii');         // artist (32 bytes)
header.write('1991 TECMO', 78, 'ascii');    // copyright (32 bytes)
header.writeUInt16LE(0x411A, 110);          // NTSC speed (16639 Hz ≈ 60 FPS)
// bankswitch: 8 个 8KB bank 槽位
// MMC3 R6 控制 $8000-$9FFF, R7 控制 $A000-$BFFF
header[112] = 12;  // $8000-$9FFF → PRG bank 12
header[113] = 13;  // $A000-$BFFF → PRG bank 13
header[114] = 0;   // 未使用
header[115] = 0;
header[116] = 0;
header[117] = 0;
header[118] = 0;
header[119] = 0;
header.writeUInt16LE(0, 120);               // PAL speed (0 = NTSC only)
header[122] = 0;                            // PAL/NTSC bits (0 = NTSC)
header[123] = 0;                            // chip type (0 = none)

// 组装 NSF
const nsf = Buffer.concat([header, bank24, bank25]);
const outPath = path.join(__dirname, '..', 'docs', 'tsubasa2-bgm.nsf');
fs.writeFileSync(outPath, nsf);

console.log(`\n生成 NSF: ${outPath}`);
console.log(`文件大小: ${nsf.length} 字节`);
console.log(`  header: 128 字节`);
console.log(`  bank12 前 8KB ($8000-$9FFF): ${bank24.length} 字节`);
console.log(`  bank12 后 8KB ($A000-$BFFF): ${bank25.length} 字节`);
console.log(`BGM 数量: ${BGM_COUNT}`);
console.log(`\n可被 NSF 播放器（如 FooTrack/NotSoFatso/VirtuousNES）读取播放`);
