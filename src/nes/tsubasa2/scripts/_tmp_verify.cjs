// 临时：验证 OPENING_SCENE3_TILES 是否=ROM bank7 cfg0x17 tile 数据；dump $8E42 歌曲头
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const OFF7 = 0x10 + 7 * 0x2000;
const b7 = (a) => rom[OFF7 + (a - 0xa000)];
// cfg0x17 @$A373 = [7c 7e 81 06 08 08]，tile 数据 $A379 起 48B
const tile = [];
for (let k = 0; k < 48; k++) tile.push(b7(0xa379 + k));
console.log('ROM cfg0x17 tile(48B):');
console.log(tile.map((v) => '0x' + v.toString(16).padStart(2, '0')).join(','));
// 对比 opening-data.ts 的 OPENING_SCENE3_TILES
const od = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/opening-data.ts', 'utf8');
const m = od.match(/OPENING_SCENE3_TILES[^=]*=\s*\[([\s\S]*?)\];/);
const cur = m[1].split(',').map((s) => parseInt(s.trim(), 16)).filter((v) => !isNaN(v));
console.log('\nOPENING_SCENE3_TILES(' + cur.length + 'B):');
console.log(cur.map((v) => '0x' + v.toString(16).padStart(2, '0')).join(','));
console.log('\n匹配: ' + (JSON.stringify(tile) === JSON.stringify(cur)));
// $8E42 歌曲头（bank7，$8000-$9FFF → 但 bank7 在 ROM 的 offset 不同）
// bank7 物理 offset = 0x10 + 7*0x2000；CPU $8E42 若在 bank7 的 $A000-$BFFF 映射则不对
// 注意：$8BDA 主表在 bank12；$8E42 是 BGM 数据，H5 readBgmData 映射 $8000-$9FFF→bank7
// 所以物理读取：bank7 的 CPU $8E42 → 但 bank7 装载在 $A000-$BFFF？需确认
// 直接按 H5 模型：$8E42 → bank7 字节，bank7 物理基 = 0x10+7*0x2000，CPU 映射 $8000-$9FFF
const OFF7b = 0x10 + 7 * 0x2000;
const rd = (cpu) => rom[OFF7b + (cpu - 0x8000)];
console.log('\n$8E42 歌曲头（bank7，$8000-$9FFF 映射）:');
const hdr = [];
for (let k = 0; k < 16; k++) hdr.push(rd(0x8e42 + k));
console.log(hdr.map((v) => '0x' + v.toString(16).padStart(2, '0')).join(' '));
