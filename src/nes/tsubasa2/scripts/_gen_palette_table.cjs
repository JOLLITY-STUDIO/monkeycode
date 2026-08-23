// 一次性生成调色板表（bank31 $FBCC 起，每项 12 字节）— 用完删除
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const OUT = path.join(__dirname, '..', 'src', 'game', 'prg', 'data', 'tables', 'palette-table.ts');

const buf = fs.readFileSync(ROM);
// $FBCC 属于固定 bank31（$E000-$FFFF）
const bank31Base = 16 + 31 * 0x2000;
const start = 0xFBCC - 0xE000; // 相对 bank31 起点
const maxItems = Math.floor((0x2000 - start) / 12);
const items = [];
for (let i = 0; i < maxItems; i++) {
  const row = [];
  for (let j = 0; j < 12; j++) {
    row.push('0x' + buf[bank31Base + start + i * 12 + j].toString(16).padStart(2, '0'));
  }
  items.push('  [' + row.join(', ') + '],');
}

const out = [];
out.push('/**');
out.push(' * 调色板数据表 — 来自 bank31 $FBCC（固定 bank，$E000-$FFFF）');
out.push(' *');
out.push(' * 对照 asm（src/asm/bank30/code_main.s $CC02 调色板装载）：');
out.push(' *   入口 A=索引, X=目标偏移；指针 = $FBCC + A*12（每项 12 字节 = 4 组×3 色）。');
out.push(' *   装载 16 字节到 $046F+X：X&3==0 时强制 $0F（背景/透明），其余 12 字节来自本表。');
out.push(' *   装载后 $046C=$20（队列流长度标记，见 $CCD2）。');
out.push(' * 原始地址 $FBCC-$FFFF，共 ' + maxItems + ' 项。');
out.push(' */');
out.push('export const PALETTE_TABLE: ReadonlyArray<ReadonlyArray<number>> = [');
out.push(items.join('\n'));
out.push('];');
out.push('');
out.push('/** 调色板装载（$CC02 语义）：index→12 字节，X&3==0 置 $0F；返回 16 字节调色板 */');
out.push('export function loadPalette(index: number): ReadonlyArray<number> {');
out.push('  const item = PALETTE_TABLE[index] ?? PALETTE_TABLE[0];');
out.push('  const out: number[] = new Array(16);');
out.push('  let src = 0;');
out.push('  for (let x = 0; x < 16; x++) {');
out.push('    if ((x & 3) === 0) out[x] = 0x0f;');
out.push('    else out[x] = item[src++] ?? 0x0f;');
out.push('  }');
out.push('  return out;');
out.push('}');
out.push('');
fs.writeFileSync(OUT, out.join('\n'));
console.log('written', OUT, 'items:', maxItems);
console.log('DONE');
