// 临时：一次性 dump 场景 14/15/16/23 所需全部 ROM 数据
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const offB00 = (a) => 0x10 + (a - 0x8000);
const offB02 = (a) => (a < 0xa000 ? 0x10 + (a - 0x8000) : 0x4010 + (a - 0xa000));
const hex = (b) => b.toString(16).padStart(2, '0').toUpperCase();
const range = (name, off, a, b) => {
  const arr = [];
  for (let i = a; i <= b; i++) arr.push(hex(rom[off(i)]));
  console.log(`${name} $${a.toString(16).toUpperCase()}-$${b.toString(16).toUpperCase()}: ${arr.join(' ')}`);
};
// scene 14: $8976 + $9085 + $9131 + $978B 模板
range('b00_8976', offB00, 0x8976, 0x89a0);
range('b00_9085', offB00, 0x9085, 0x9150);
range('b00_978B', offB00, 0x978b, 0x97ac);
// scenes 5/6: $9F96/$9F89
range('b00_9F89', offB00, 0x9f89, 0x9fa8);
// scene 23: $9E36/$9E7C BCD + $AC6D/$AC71 tile
range('b00_9E36', offB00, 0x9e36, 0x9e60);
range('b00_9E7C', offB00, 0x9e7c, 0x9ea2);
range('b02_AC6D', offB02, 0xac6d, 0xac7a);
// scene 15: $AA97 表（24×3 头 + 数据流）
range('b02_AA97', offB02, 0xaa97, 0xab20);
// scene 16: $A677 拷贝源 + $A67B
range('b02_A677', offB02, 0xa677, 0xa67b);
// $8895
range('b00_8895', offB00, 0x8895, 0x8920);
