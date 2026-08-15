/** 从 rom-data/prg-bank-01.ts 提取 bank01 全部数据表，生成 TS 数据文件 (data 层 = model) */
const fs = require('fs');
const path = require('path');

const romPath = path.join(__dirname, '..', 'rom-data', 'prg-bank-01.ts');
const outPath = path.join(__dirname, '..', 'tsubasa2-h5-src', 'src', 'data', 'bank01-tables.ts');

const src = fs.readFileSync(romPath, 'utf8');
// 注意: 数组声明是 `= [`，type 注解 `number[]` 里也有 `[`，必须找 `=` 之后的 `[`
const eq = src.indexOf('= [');
if (eq < 0) throw new Error('找不到数组声明 = [');
const a = src.indexOf('[', eq);
const b = src.lastIndexOf(']');
const body = src.slice(a + 1, b);
const raw = body.split(',').map(t => parseInt(t.trim(), 16));
console.log('parsed entries:', raw.length);

// 文件索引 = CPU 地址 - 0xA000 (每个 bank 8KB 独立数组)
const IDX = (addr) => addr - 0xA000;

function slice(addr, len, name) {
  const i = IDX(addr);
  const arr = raw.slice(i, i + len);
  if (arr.length !== len) throw new Error(name + ' 长度不足: ' + arr.length);
  return arr;
}

const tables = {
  // $B1E8 64B: 屏幕块定义表 (64 entries, 菜单系统核心, $A201/$A64C 遍历)
  MENU_BLOCK_DEF: slice(0xB1E8, 64, 'B1E8'),
  // $B229 4B: 屏幕类型 → Y 偏移表
  MENU_TYPE_Y: slice(0xB229, 4, 'B229'),
  // $B22D 18B: 菜单光标位置表 (18 entries, bit7=X高位, bit6-0=Y偏移)
  MENU_CURSOR_POS: slice(0xB22D, 18, 'B22D'),
  // $B241 18B: 菜单 Y 屏幕位置表 (18 entries)
  MENU_SCREEN_Y: slice(0xB241, 18, 'B241'),
  // $B255 28B: 菜单选项标志表 ($FF=终端项)
  MENU_OPTION_FLAG: slice(0xB255, 28, 'B255'),
  // $B271 124B: 图形数据传输表 (复制到 $039C)
  GFX_XFER: slice(0xB271, 124, 'B271'),
  // $B2ED 16B: 输入方向 → EC 偏移表 (bit7=反向标志)
  INPUT_EC_DELTA: slice(0xB2ED, 16, 'B2ED'),
  // $B205 248B: 初始化调色板/OAM 数据 (从 $B205 复制到 $0460)
  INIT_PALETTE: slice(0xB205, 248, 'B205'),
  // $B393 34B: 场景图形表 (索引=ram_0026, entry3 使用)
  SCENE_GFX_TABLE: slice(0xB393, 34, 'B393'),
  // $B3B5 34B: 场景属性表 (索引=ram_0026, entry4 使用)
  SCENE_ATTR_TABLE: slice(0xB3B5, 34, 'B3B5'),
  // $B3D7 34B: 场景数据表 2 (索引=ram_0026)
  SCENE_DATA_TABLE2: slice(0xB3D7, 34, 'B3D7'),
  // $B3F9 34B: 场景数据表 3 (索引=ram_0026)
  SCENE_DATA_TABLE3: slice(0xB3F9, 34, 'B3F9'),
  // $B41B 34B: 场景数据表 4 (索引=ram_0026)
  SCENE_DATA_TABLE4: slice(0xB41B, 34, 'B41B'),
  // $BC6E 99B: 菜单 tile 数据表 (99 entries)
  MENU_TILE: slice(0xBC6E, 99, 'BC6E'),
  // $BCD1 34B: 队伍属性表 (索引=ram_0026, bit7-4=图形指针, bit3-0=数据指针)
  TEAM_ATTR: slice(0xBCD1, 34, 'BCD1'),
  // $BCF3 113B: 图形数据指针表 (每 2B LO,HI)
  GFX_PTR_TABLE: slice(0xBCF3, 113, 'BCF3'),
  // $BD64 139B: 数据指针表 (每 2B LO,HI)
  DATA_PTR_TABLE: slice(0xBD64, 139, 'BD64'),
  // $BC58 22B: 球员图像指针表 (11 entries × 2B, $A5C6 使用)
  PLAYER_GFX_PTR: slice(0xBC58, 22, 'BC58'),
  // $BDA8 40B: 图像数据指针表 (20 entries × 2B, $A63C 使用)
  GFX_DATA_PTR: slice(0xBDA8, 40, 'BDA8'),
  // $AD8A 502B: 球员字段索引表 ($A438/$A474 使用)
  PLAYER_FIELD_IDX: slice(0xAD8A, 502, 'AD8A'),
};

let out = `/**
 * Bank 01 数据表 (Data/Model 层)
 *
 * 来源: rom-data/prg-bank-01.ts (文件索引 = CPU 地址 - 0xA000)
 * 由 _tmp_bzk_out/extract-bank01-tables.cjs 自动生成, 禁止手改。
 *
 * 仅供 DataQueryService (Bank 01) 使用 (bank=service, data=model)。
 */
`;

for (const [name, arr] of Object.entries(tables)) {
  out += `\n/** ${name} — ${arr.length} 字节 */\nexport const ${name}: readonly number[] = [\n`;
  for (let i = 0; i < arr.length; i += 16) {
    out += '  ' + arr.slice(i, i + 16).map(v => v.toString(16).padStart(2, '0')).join(', ') + ',\n';
  }
  out += '];\n';
}

out += `\n/** 全部表按名称导出 (调试/测试用) */\nexport const BANK01_TABLES: Record<string, readonly number[]> = {\n`;
for (const name of Object.keys(tables)) out += `  ${name},\n`;
out += '};\n';

fs.writeFileSync(outPath, out);
console.log('written:', outPath, '(', out.length, 'bytes )');
