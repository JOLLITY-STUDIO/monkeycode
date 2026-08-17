// Bank20 序列引擎数据布局分析
const fs = require('fs');
function loadBank(path) {
  const text = fs.readFileSync(path, 'utf8');
  // 从 'const ... = [' 后提取所有 0xNN 字节
  const m = text.match(/\[([\s\S]*?)\];/);
  const bytes = [];
  const re = /0x([0-9A-Fa-f]{2})/g;
  let hit;
  while ((hit = re.exec(m[1])) !== null) bytes.push(parseInt(hit[1], 16));
  return bytes;
}

const b20 = loadBank('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-20.ts');
const b21 = loadBank('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-21.ts');
console.log('bank20 bytes:', b20.length, 'bank21 bytes:', b21.length);

// 指针表 $8968 (bank offset 0x0968) — 读取直到指针指向非序列区或越界
const PTR_TABLE = 0x8968;
const u16 = (a) => b20[a - 0x8000] | (b20[a - 0x8000 + 1] << 8);
let count = 0;
let lastPtr = 0;
let minPtr = 0xFFFF;
let maxPtr = 0;
for (let a = PTR_TABLE; a + 2 <= 0x8B48; a += 2) {
  const p = u16(a);
  if (p >= 0x8000 && p <= 0x9FFF) {
    count++;
    lastPtr = a + 2;
    minPtr = Math.min(minPtr, p);
    maxPtr = Math.max(maxPtr, p);
  } else {
    console.log(`entry @ $${a.toString(16)} -> ${p.toString(16)} (非本区指针，表在此结束?)`);
    break;
  }
}
console.log('表条目数:', count, '起始$8968 结束$' + lastPtr.toString(16));
console.log('序列指针范围: $' + minPtr.toString(16) + ' - $' + maxPtr.toString(16));
console.log('序列数据起始: $8B48, 最后一个序列地址 = $' + maxPtr.toString(16));
console.log('序列数据总长(至 bank20 末尾):', (0x9FFF - 0x8B48 + 1), 'bytes; 若至', maxPtr, '则', maxPtr - 0x8B48, 'bytes');

// 检查 bank21 的 $A1B4 / $AC47 指针表（bank offset 0x21B4 / 0x2C47）
const tabA1B4 = [];
for (let a = 0x21B4; a + 2 <= 0x21B4 + 64; a += 2) {
  tabA1B4.push(b21[a] | (b21[a + 1] << 8));
}
console.log('\nbank21[$A1B4] 前32个指针:', tabA1B4.slice(0, 16).map(x => '$' + x.toString(16)).join(' '));

const tabAC47 = [];
for (let a = 0x2C47; a + 2 <= 0x2C47 + 64; a += 2) {
  tabAC47.push(b21[a] | (b21[a + 1] << 8));
}
console.log('bank21[$AC47] 前32个指针:', tabAC47.slice(0, 16).map(x => '$' + x.toString(16)).join(' '));

// bank21 指针是否落在 bank20 或 bank21 窗口?
const all = tabA1B4.concat(tabAC47);
const inB20 = all.filter(p => p >= 0x8000 && p < 0xA000).length;
const inB21 = all.filter(p => p >= 0xA000 && p < 0xC000).length;
console.log('bank21 表中指针: 指向$8000-$9FFF(bank20):', inB20, ' 指向$A000-$BFFF(bank21):', inB21);
