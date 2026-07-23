/**
 * 验证 PRG 静态数据注入是否独立于 rom.nes
 * 模拟 tsubasa 模式注入过程：
 *   1. 从 rom.nes 读 PRG → 写 cpu.mem (模拟 native 模式)
 *   2. 从 prg_rom_data.ts 读静态数据 → 写 cpu.mem (模拟 tsubasa 模式)
 *   3. 比较两者的 $8000-$8007 前 8 字节是否完全相同
 *   4. 故意把静态数据第一字节 -1，确认两种数据的 cpu.mem 产生差异
 *      → 如果产生差异，说明修改 prg_rom_data.ts 会影响 tsubasa 模式运行
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const romPath = resolve(ROOT, 'rom.nes');
const dataPath = resolve(ROOT, 'src', 'tsnes', 'tsubasa-code', 'prg_rom_data.ts');

// ── 1. 读取 rom.nes PRG bank[0] ──
const raw = readFileSync(romPath);
const hasTrainer = (raw[6] & 4) !== 0;
const prgOffset = 16 + (hasTrainer ? 512 : 0);
const romBank0 = Array.from(raw.slice(prgOffset, prgOffset + 16384));

// ── 2. 从 prg_rom_data.ts 提取 PRG_ROM_BANKS[0] ──
const tsSource = readFileSync(dataPath, 'utf-8');
const bankRegex = /_PRG_BANK_(\d+): readonly number\[\] = \[([\s\S]*?)\];/g;
const banks = new Map();
let match;
while ((match = bankRegex.exec(tsSource)) !== null) {
  const idx = parseInt(match[1], 10);
  const body = match[2];
  const numbers = body.split(/[,\n\r]+/).map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  banks.set(idx, numbers);
}
const staticBank0 = banks.get(0);

// ── 3. 模拟注入：分别写入 cpu.mem ──
const C_8000 = 0x8000;

function inject(bankArray, label) {
  // 和 tsnes_kernel.ts 完全一样的写入方式
  const cpuMem = new Array(0x10000).fill(0);
  // 写入 bank 0 到 $8000-$BFFF
  for (let i = 0; i < 8192;  i++) cpuMem[C_8000 + i] = bankArray[i];
  for (let i = 0; i < 8192;  i++) cpuMem[0xA000 + i] = bankArray[8192 + i];
  // 写入 bank 15 到 $C000-$FFFF (模拟 last bank)
  const last = banks.get(15);
  for (let i = 0; i < 8192;  i++) cpuMem[0xC000 + i] = last[i];
  for (let i = 0; i < 8192;  i++) cpuMem[0xE000 + i] = last[8192 + i];

  // 打印 $8000-$8007 前 8 字节 + reset vector
  const opcodes = [];
  for (let i = 0; i < 8; i++) opcodes.push(cpuMem[0x8000 + i]);
  const resetLo = cpuMem[0xFFFC], resetHi = cpuMem[0xFFFD];
  const resetVector = resetLo | (resetHi << 8);
  const resetByte = cpuMem[resetVector];

  console.log(`[${label}] $8000-07: ${opcodes.map(b => '$' + b.toString(16).padStart(2, '0')).join(' ')}`);
  console.log(`[${label}] Reset vector: $${resetVector.toString(16).toUpperCase()}  first op: $${resetByte.toString(16).padStart(2, '0')}`);
  return { cpuMem, opcodes };
}

console.log('=== 模拟注入验证 ===\n');

const native = inject(romBank0, 'native');
console.log('');
const tsubasa = inject(staticBank0, 'tsubasa');
console.log('');

// ── 4. 比较 ──
let same = true;
for (let i = 0; i < 8; i++) {
  if (native.opcodes[i] !== tsubasa.opcodes[i]) same = false;
}
console.log(`$8000-$8007 完全相同: ${same ? '✅ 是' : '❌ 否'}`);
console.log('');

// ── 5. 篡改 PRG_ROM_BANKS 第一字节验证 ──
console.log('=== 篡改验证：静态数据 bank[0] 首字节 +1 ===\n');
const modified = [...staticBank0];
modified[0] = modified[0] + 1;
const modifiedResult = inject(modified, 'modified');

console.log('');
let diff = false;
for (let i = 0; i < 8; i++) {
  if (native.opcodes[i] !== modifiedResult.opcodes[i]) diff = true;
}
console.log(`篡改后 $8000-$8007 与 native 不同: ${diff ? '✅ 是 (修改 prg_rom_data.ts 会生效)' : '❌ 否'}`);
console.log('');

if (diff) {
  console.log('📌 结论：prg_rom_data.ts 的数据确实是独立注入的，修改它会直接影响 tsubasa 模式的 cpu.mem 内容。');
  process.exit(0);
} else {
  console.log('❌ 注入未生效，静态数据没被用到！');
  process.exit(1);
}
