/**
 * 验证 tsubasa 静态 PRG 注入生效 — 手动模拟 RESET 流程，在第一指令位写 $02
 */
import NES from '../src/tsnes/src/nes';
import { PRG_ROM_BANKS } from '../src/tsnes/tsubasa-code/prg_rom_data';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const romPath = resolve(__dirname, '..', 'rom.nes');
const romData = new Uint8Array(readFileSync(romPath));

// ── NES 实例 ──
const nes = new NES({
  onFrame: () => {},
  onStatusUpdate: () => {},
  emulateSound: false,
});
nes.loadROM(romData);
const cpu = nes.cpu as any;

// 注入静态 PRG
const banks = PRG_ROM_BANKS;
const last = banks.length - 1;
for (let i = 0; i < 8192; i++) cpu.mem[0x8000 + i] = banks[0][i];
for (let i = 0; i < 8192; i++) cpu.mem[0xA000 + i] = banks[0][8192 + i];
for (let i = 0; i < 8192; i++) cpu.mem[0xC000 + i] = banks[last][i];
for (let i = 0; i < 8192; i++) cpu.mem[0xE000 + i] = banks[last][8192 + i];
console.log('[test] 静态 PRG 已注入');

// 手动模拟 RESET：读 reset vector，设 PC
const resetLo = cpu.mem[0xFFFC];
const resetHi = cpu.mem[0xFFFD];
const resetVec = resetLo | (resetHi << 8);
// 6502 reset 流程后 PC 指向 resetVec，第一条指令在 resetVec
cpu.REG_PC = resetVec - 1; // emulate() 里 loadFromCartridge(REG_PC + 1)
const firstInstr = resetVec;
console.log(
  `[test] Reset Vector = $${resetVec
    .toString(16)
    .toUpperCase()
    .padStart(4, '0')}, PC 设为 $${cpu.REG_PC
    .toString(16)
    .padStart(4, '0')}`,
);
console.log(
  `[test] cpu.mem[$${firstInstr
    .toString(16)
    .padStart(4, '0')}] = $${cpu.mem[firstInstr]
    .toString(16)
    .padStart(2, '0')}`,
);

// 清除 RESET 中断标志，防止 emulate() 再次处理
cpu.irqRequested = false;

// 在 CPU 真正将执行的第一条指令位置写非法 opcode $02
const origByte = cpu.mem[firstInstr];
cpu.mem[firstInstr] = 0x02;
console.log(
  `[test] 在 $${firstInstr.toString(16).padStart(4, '0')} 写入 $02 (原始 $${origByte.toString(16).padStart(2, '0')})`,
);

// ── 跑一帧 ──
try {
  nes.frame();
  console.log('[test] ❌ FAIL: CPU 没崩，注入未生效');
  process.exit(1);
} catch (e: any) {
  const msg: string = e.message || '';
  if (/invalid opcode|crashed/i.test(msg)) {
    console.log(`[test] ✅ PASS: CPU 崩溃，注入生效！`);
    console.log(`[test] ${msg}`);
    process.exit(0);
  }
  console.log(`[test] ❌ FAIL: 未知异常: ${msg}`);
  process.exit(1);
}
