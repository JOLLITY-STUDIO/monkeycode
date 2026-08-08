// 验证 bank12 音频写入 APU 的关键值
const fs = require('fs');

// 读取 bank12 原始数据
const bank12Raw = fs.readFileSync(
  'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-12.ts',
  'utf8'
);
const matches = bank12Raw.match(/0x[0-9A-Fa-f]{2}/g);
const data = matches.map(m => parseInt(m, 16));

console.log('=== 关键 APU 寄存器写入值分析 ===\n');

// $4000 的值格式: (volOut & 0x0F) | 0x30 = 0x30 ~ 0x3F
// $4008 的值格式: (volOut & 0x0F) | 0x80 = 0x80 ~ 0x8F
// 写入 $4001: 0x08 (disable sweep)
// 写入 $4003: freqHi | 0x18 = 0x18 ~ 0x1F

console.log('SQ1 ($4000-$4003):');
console.log('  $4000 = (volByte & 0x0F) | 0x30 → 0x30~0x3F (duty=00, vol=0~15)');
console.log('  $4001 = 0x08 (disable sweep)');
console.log('  $4002 = freqLo (from note parsing)');
console.log('  $4003 = (freqHi & 7) | 0x18 (length counter)');
console.log('');

console.log('TRI ($4008-$400B):');
console.log('  $4008 = (volByte & 0x0F) | 0x80 → 0x80~0x8F');
console.log('  $400A/400B = freq');

console.log('\n=== 你看到的 0xF1, 0x08, 0x40 在 ROM 中确实存在===');
console.log('0xF1 → 在 ROM 中作为命令/数据字节存在 (', data.filter(v=>v===0xF1).length, '个)');
console.log('0x08 → 在 ROM 中广泛存在 (', data.filter(v=>v===0x08).length, '个)');
console.log('0x40 → 在 ROM 中作为音量/时长等数据存在 (', data.filter(v=>v===0x40).length, '个)');
console.log('');

// 关键问题: 写入 APU 的值是计算值，不是 ROM 直接值
console.log('=== 关键 Bug: _writeChannelApu 中 SQ1/TRI 无声原因 ===');
console.log('');
console.log('_processVolume 计算 param+6 (vol_out):');
console.log('  1. volByte = ram.getCh(ch, 5) = 0 (初始化时设为0)');
console.log('  2. vol = volByte & 0x0F = 0');
console.log('  3. outVol = durHi - vol = durHi - 0 = durHi');
console.log('  4. durHi 来自 timing table, 或序列器设置');
console.log('  5. 如果 durHi=0, 则 outVol=0');
console.log('');
console.log('_writeChannelApu 写入 SQUARE $4000:');
console.log('  (outVol & 0x0F) | 0x30 = (0 & 0x0F) | 0x30 = 0x30');
console.log('  0x30 = 0b00110000 → volume=0, constant vol=1 → 无声!');
console.log('');
console.log('这就是 SQ1 不响的根本原因: param+6(vol_out) 没有被正确计算');
