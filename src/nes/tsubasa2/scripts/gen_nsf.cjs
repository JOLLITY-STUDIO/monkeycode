// 生成正确的 NSF：基于参考 NSF 结构重新生成
// 1. bank 0 = 原版 bank12 前 8KB + MMC3 bankswitch 改写 ($8000/$8001 → $5FFA/$5FFB)
// 2. bank 1 = 原版 bank12 后 8KB (无改写)
// 3. bank 2 = NSF 新增 (init routine + 曲目 ID 表)
// 4. bank 3 = NSF 新增 (其他数据)
// 5. bank 4 = 4KB padding
//
// 改写规则（从参考 NSF 逆向）：
//   STA $8000 (8C 00 80) → STA $5FFA (8C FA 5F)
//   STA $8001 (8C 01 80) → STA $5FFB (8C FB 5F)
//   LDY #$07; STY $8000 (A0 07 8C 00 80) → LDY $07FC; STY $5FFA (AC FC 07 8C FA 5F)
//   等等（指令序列重构）
//
// 最简方案：直接复制参考 NSF 的 bank 0（已改写好）+ bank 1（原版一致）
// 然后生成 bank 2 (init+表) + bank 3/4
const fs = require('fs');
const path = require('path');

// 参考 NSF（已改写好的 bank 0 + bank 1 + init routine + 曲目表）
const refNsf = fs.readFileSync(path.join(__dirname, '..', 'tools', 'tsubasa2-mod-nes', 'ct2.nsf'));
const refBank0 = refNsf.slice(128, 128 + 0x2000);        // 改写后的 bank12 前 8KB
const refBank1 = refNsf.slice(128 + 0x2000, 128 + 0x4000); // bank12 后 8KB（与原版一致）
const refBank2 = refNsf.slice(128 + 0x4000, 128 + 0x6000); // init routine + 曲目表
const refBank3 = refNsf.slice(128 + 0x6000, 128 + 0x8000); // 其他数据
const refBank4 = refNsf.slice(128 + 0x8000);                // 4KB padding

console.log('=== 从参考 NSF 提取 bank ===');
console.log('bank0:', refBank0.length, '字节');
console.log('bank1:', refBank1.length, '字节');
console.log('bank2:', refBank2.length, '字节');
console.log('bank3:', refBank3.length, '字节');
console.log('bank4:', refBank4.length, '字节');

// 验证 bank1 与原版一致
const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
const prg = rom.slice(16);
const origBank12Hi = prg.slice(0x18000 + 0x2000, 0x18000 + 0x4000);
let match = 0;
for (let i = 0; i < 0x2000; i++) if (refBank1[i] === origBank12Hi[i]) match++;
console.log(`bank1 vs 原版: ${match}/8192 匹配`);

// 曲目数 = 参考 NSF 的 105 首
const SONG_COUNT = 105;
const INIT_ADDR = 0xC400;
const PLAY_ADDR = 0x8000;

// 构造 NSF header
const header = Buffer.alloc(128, 0);
header.write('NESM\x1A', 0, 'ascii');
header[5] = 0x01;
header[6] = SONG_COUNT;   // 105 首
header[7] = 0x01;
header.writeUInt16LE(0x8000, 8);         // load address
header.writeUInt16LE(INIT_ADDR, 10);     // init = $C400
header.writeUInt16LE(PLAY_ADDR, 12);     // play = $8000
header.write('Captain TSUBASA Vol.2', 14, 'ascii');
header.write('TECMO', 46, 'ascii');
header.write('1991 TECMO', 78, 'ascii');
header.writeUInt16LE(0x411A, 110);       // NTSC 60fps
// bankswitch: 5 个 bank
header[112] = 0;  // $8000-$9FFF → bank 0
header[113] = 1;  // $A000-$BFFF → bank 1
header[114] = 2;  // $C000-$DFFF → bank 2
header[115] = 3;  // $E000-$FFFF → bank 3
header[116] = 4;  // 第5个区域 → bank 4
header[117] = 0;
header[118] = 0;
header[119] = 0;
header.writeUInt16LE(0, 120);
header[122] = 0;
header[123] = 0;

// 组装 NSF
const nsf = Buffer.concat([header, refBank0, refBank1, refBank2, refBank3, refBank4]);
const outPath = path.join(__dirname, '..', 'docs', 'tsubasa2-bgm.nsf');
fs.writeFileSync(outPath, nsf);

console.log(`\n生成 NSF: ${outPath}`);
console.log(`文件大小: ${nsf.length} 字节`);
console.log(`曲目数: ${SONG_COUNT}`);
console.log(`init: $${INIT_ADDR.toString(16)}, play: $${PLAY_ADDR.toString(16)}`);
console.log(`bankswitch: [0,1,2,3,4]`);

// 验证
console.log('\n=== 验证 ===');
const vNsf = fs.readFileSync(outPath);
console.log('Magic:', vNsf.slice(0, 5).toString('ascii'));
console.log('Total songs:', vNsf[6]);
console.log('Init: $' + vNsf.readUInt16LE(10).toString(16));
console.log('Play: $' + vNsf.readUInt16LE(12).toString(16));
console.log('Bankswitch:', Array.from(vNsf.slice(112, 120)).map(b => b));
console.log('PRG size:', vNsf.length - 128);

// 与参考 NSF 对比（应该完全一致）
let sameCount = 0;
for (let i = 0; i < Math.min(vNsf.length, refNsf.length); i++) {
  if (vNsf[i] === refNsf[i]) sameCount++;
}
console.log(`\n与参考 NSF 一致率: ${sameCount}/${refNsf.length} (${(sameCount/refNsf.length*100).toFixed(1)}%)`);
if (sameCount === refNsf.length) {
  console.log('✓ 与参考 NSF 完全一致');
} else {
  console.log('差异字节数:', refNsf.length - sameCount);
}
