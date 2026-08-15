/** 从 rom-data/prg-bank-02.ts 提取 bank02 全部数据表，生成 TS 数据文件 (data 层 = model) */
const fs = require('fs');
const path = require('path');

const romPath = path.join(__dirname, '..', 'rom-data', 'prg-bank-02.ts');
const outPath = path.join(__dirname, '..', 'tsubasa2-h5-src', 'src', 'data', 'bank02-tables.ts');

const src = fs.readFileSync(romPath, 'utf8');
const a = src.indexOf('[');
const b = src.lastIndexOf(']');
const body = src.slice(a + 1, b);
const raw = body.split(',').map(t => parseInt(t.trim(), 16));
console.log('parsed entries:', raw.length);

// 文件索引 = CPU 地址 - 0xA000 (已验证: $AA06 的字节 84 ED E8 A0 00 48 位于 idx=0xA06)
const IDX = (addr) => addr - 0xA000;

function slice(addr, len, name) {
  const i = IDX(addr);
  const arr = raw.slice(i, i + len);
  if (arr.length !== len) throw new Error(name + ' 长度不足: ' + arr.length);
  return arr;
}

const tables = {
  // $AADF 64B: 滚动 X delta 表 (entryC 使用)
  SCROLL_DX: slice(0xAADF, 64, 'AADF'),
  // $AAE0 64B: 滚动 Y delta 表 (entryC 使用, 有符号)
  SCROLL_DY: slice(0xAAE0, 64, 'AAE0'),
  // $AB1F 16B: 密码 OAM 修正表 (4 组 x 4B)
  PW_OAM_FIX: slice(0xAB1F, 16, 'AB1F'),
  // $AA47 46B: 场地 tile 编号表 (entryD/E)
  FIELD_TILES: slice(0xAA47, 46, 'AA47'),
  // $AA75 34B: 场地类型表 (entryD/E, 索引=ram_0026)
  FIELD_KIND: slice(0xAA75, 34, 'AA75'),
  // $AA97 72B: 场景脚本记录 (handler15 $A651, 3B/条)
  SCENE_SCRIPT: slice(0xAA97, 72, 'AA97'),
  // $A677 256B: 精灵上传数据 (handler16 $A767 复制到 ram_03E8)
  SPRITE_UPLOAD: slice(0xA677, 256, 'A677'),
  // $A67B 256B: 精灵上传数据 2 (handler16b $A6F9 复制到 ram_0460)
  SPRITE_UPLOAD2: slice(0xA67B, 256, 'A67B'),
  // $A472 18B: 小数据表 (A454 附近代码使用)
  TINY_TABLE: slice(0xA472, 18, 'A472'),
};

let out = `/**
 * Bank 02 数据表 (Data/Model 层)
 *
 * 来源: rom-data/prg-bank-02.ts (文件索引 = CPU 地址 - 0xA000)
 * 由 _tmp_bzk_out/extract-bank02-tables.cjs 自动生成, 禁止手改。
 *
 * 仅供 Bank02Service 使用 (bank=service, data=model)。
 */
`;

for (const [name, arr] of Object.entries(tables)) {
  out += `\n/** ${name} — ${arr.length} 字节 */\nexport const ${name}: readonly number[] = [\n`;
  for (let i = 0; i < arr.length; i += 16) {
    out += '  ' + arr.slice(i, i + 16).map(v => v.toString(16).padStart(2, '0')).join(', ') + ',\n';
  }
  out += '];\n';
}

out += `\n/** 全部表按名称导出 (调试/测试用) */\nexport const BANK02_TABLES: Record<string, readonly number[]> = {\n`;
for (const name of Object.keys(tables)) out += `  ${name},\n`;
out += '};\n';

fs.writeFileSync(outPath, out);
console.log('written:', outPath, '(', out.length, 'bytes )');
