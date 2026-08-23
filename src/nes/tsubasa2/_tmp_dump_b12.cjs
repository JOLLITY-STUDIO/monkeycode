// 从 ROM 提取 bank12 关键数据表, 供 AudioService 重写验证
const fs = require('fs');
const path = require('path');

const romPath = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(romPath);
console.log('ROM size:', buf.length);

// iNES header 16B, PRG 起始 0x10
const prgStart = 0x10;
const BANK = 12;
const bankOff = prgStart + BANK * 0x2000; // PRG bank12 的 ROM 偏移

function cpuToOff(cpuAddr) {
  return bankOff + (cpuAddr - 0x8000);
}

function dump(label, cpuAddr, len) {
  const off = cpuToOff(cpuAddr);
  const bytes = [];
  for (let i = 0; i < len; i++) bytes.push(buf[off + i]);
  console.log(label, 'cpu=' + cpuAddr.toString(16), 'off=' + off.toString(16), 'bytes=', bytes.map(b => b.toString(16).padStart(2, '0')).join(' '));
  return bytes;
}

// 1. $8269 跳转表 (16B)
dump('JUMP_TABLE_8269:', 0x8269, 16);
// 2. $82E4 跳转表 (16B)
dump('JUMP_TABLE_82E4:', 0x82E4, 16);
// 3. $84DA 命令分发表 (64B)
dump('DISPATCH_84DA:', 0x84DA, 64);
// 4. $870D FREQ 表 (24B = 12 项 × 2B)
dump('FREQ_870D:', 0x870D, 24);
// 5. $8725 DUR 表 (64B)
dump('DUR_8725:', 0x8725, 64);
// 6. $8754 包络指针表 (前 32B)
dump('ENV_PTR_8754:', 0x8754, 32);
// 7. $8BDA SE 指针表 (前 80B)
dump('SE_PTR_8BDA:', 0x8BDA, 80);
// 8. bank12 尾部 SE 数据区开头 ($8E42)
dump('SE_DATA_8E42:', 0x8E42, 48);
