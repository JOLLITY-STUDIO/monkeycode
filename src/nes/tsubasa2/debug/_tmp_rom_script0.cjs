// 从 ROM 提取 bank03 脚本 id 0 的原始字节, 验证 $FA 操作数
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
// NES 文件头 16 字节, PRG 从 16 开始
const prgStart = 16;
const bankSize = 8192;
const bank03 = prgStart + 3 * bankSize;
// 指针表: 每项 2 字节小端, 指向 $A000 窗口 → bank 内偏移 = ptr - 0xA000
const ptr = rom[bank03] | (rom[bank03 + 1] << 8);
console.log('bank03 ptr0 =', '0x' + ptr.toString(16).toUpperCase());
const entry = ptr - 0xa000;
console.log('script0 entry offset =', '0x' + entry.toString(16).toUpperCase());
// 从入口读 200 字节
const bytes = [];
for (let i = 0; i < 240; i++) bytes.push(rom[bank03 + entry + i]);
// 找所有 $FA
for (let i = 0; i < bytes.length; i++) {
  if (bytes[i] === 0xfa) {
    console.log('  @off+' + i + ': 0xfa sceneLoad operand=0x' + bytes[i + 1].toString(16).toUpperCase());
  }
}
// 打印入口前 60 字节
console.log('entry bytes:', bytes.slice(0, 60).map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(' '));
// 打印入口偏移 200-239 (SCENE_0 末尾区域)
console.log('bytes 200-239:', bytes.slice(200, 240).map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(' '));
