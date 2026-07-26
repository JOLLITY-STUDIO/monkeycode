/**
 * 将 _tmp_bzk_out/bank_XX.asm 转换为 hex2asm 格式的 prg_bank_XX.ts
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ASM_DIR = resolve(__dirname, '_tmp_bzk_out');
const OUT_DIR = resolve(__dirname, 'src/tsnes/tsubasa-hex2asm/prg_banks');

// bank 号 → 文件名后缀/描述映射 (从 prg_rom_data.ts 提取)
const BANK_NAMES = {
  0: 'dispatch_scene_engine',
  1: 'match_jump',
  2: 'nmi_renderer',
  3: 'data',
  4: 'data',
  5: 'data',
  6: 'palette_data',
  7: 'sprite_data',
  8: 'data',
  9: 'data',
  10: 'data',
  11: 'background',
  12: 'audio',
  13: 'data',
  14: 'data',
  15: 'data',
  16: 'scene_logic',
  17: 'data',
  18: 'data',
  19: 'lookup_tables',
  20: 'team_data',
  21: 'data',
  22: 'sprite_engine',
  23: 'data',
  24: 'cutscene',
  25: 'data',
  26: 'match_core',
  27: 'player_data',
  28: 'attributes',
  29: 'data',
  30: 'system_lib',
  31: 'boot_vectors',
};

/**
 * 解析单行 asm
 * 格式: "  0x000010 $8000: C-----  A5 27    LDA  $27"
 * 返回: { cdl, instr, isData } 或 null (跳过行)
 */
function parseLine(line) {
  // 跳过空行和纯注释行
  if (!line.trim() || /^\s*;/.test(line)) return null;

  // 匹配 asm 行格式
  // ROM_offset CPU_addr: CDL_flags hex_bytes mnemonic/operand
  const m = line.match(
    /^\s*0x[0-9A-Fa-f]+\s+\$([0-9A-Fa-f]{4}):\s+([-CD0-]+)\s+(.+?)\s{2,}(.+)$/
  );
  if (!m) return null;

  const cpuAddr = m[1];
  const cdl = m[2];
  const hexPart = m[3].trim();
  const instrPart = m[4].trim();

  return { cpuAddr, cdl, hexPart, instrPart };
}

/**
 * 判断是否是 data 行 (需要转 .byte)
 */
function isDataLine(cdl, instrPart) {
  // -D 开头 = 数据
  if (cdl.includes('D')) return true;
  // !!UNDEF = 未知指令, 当做数据
  if (instrPart.startsWith('!!UNDEF')) return true;
  // .byte / .dw 本身就是数据
  if (instrPart.startsWith('.byte') || instrPart.startsWith('.dw')) return true;
  return false;
}

/**
 * 提取 data 行的字节值(组)
 */
function extractDataBytes(hexPart, instrPart) {
  if (instrPart.startsWith('.byte')) {
    // .byte $65 → 0x65
    const nums = instrPart
      .replace('.byte ', '')
      .split(',')
      .map(s => parseInt(s.trim().replace('$', ''), 16));
    return nums;
  }
  if (instrPart.startsWith('.dw')) {
    const words = instrPart
      .replace('.dw ', '')
      .split(',')
      .map(s => parseInt(s.trim().replace('$', ''), 16));
    // 展开为 le bytes
    return words.flatMap(w => [w & 0xFF, (w >> 8) & 0xFF]);
  }
  if (instrPart.startsWith('!!UNDEF')) {
    // !!UNDEF $FF ; comment → 0xFF
    const m = instrPart.match(/\$([0-9A-Fa-f]{2})/);
    return m ? [parseInt(m[1], 16)] : [];
  }
  // fallback: 从 hex bytes 提取
  const nums = hexPart.split(/\s+/).map(s => parseInt(s, 16));
  return nums;
}

/**
 * 转换 code 行为 asm 模板可用的助记符
 */
function convertCodeLine(instrPart) {
  return instrPart.replace(/\s+/g, ' ').trim();
}

/**
 * 处理单个 asm 文件
 */
function convertBank(bankNum) {
  const asmPath = join(ASM_DIR, `bank_${String(bankNum).padStart(2, '0')}.asm`);
  let content;
  try {
    content = readFileSync(asmPath, 'utf-8');
  } catch {
    console.error(`  SKIP: ${asmPath} not found`);
    return false;
  }

  const lines = content.split('\n');
  const outLines = [];

  // 提取 .org base from header
  // ; CPU: $8000-$9FFF
  let orgAddr = 0x8000;
  for (const line of lines.slice(0, 10)) {
    const m = line.match(/; CPU:\s+\$([0-9A-F]+)-\$([0-9A-F]+)/i);
    if (m) {
      orgAddr = parseInt(m[1], 16);
      break;
    }
  }

  outLines.push(`.org $${orgAddr.toString(16).toUpperCase().padStart(4, '0')}`);
  outLines.push(`; bank ${bankNum}: CPU $${orgAddr.toString(16).toUpperCase()}-$${(orgAddr + 0x1FFF).toString(16).toUpperCase()}`);

  // 解析行
  let pendingDataBytes = []; // 合并连续 data
  let lastWasData = false;

  const instructions = []; // { type:'inst'|'data', text }

  for (let i = 0; i < lines.length; i++) {
    const parsed = parseLine(lines[i]);
    if (!parsed) continue;

    const { cdl, hexPart, instrPart } = parsed;
    const isData = isDataLine(cdl, instrPart);

    if (isData) {
      const bytes = extractDataBytes(hexPart, instrPart);
      pendingDataBytes.push(...bytes);
      lastWasData = true;
    } else {
      // flush pending data
      if (pendingDataBytes.length > 0) {
        const hex = pendingDataBytes.map(b => '$' + b.toString(16).padStart(2, '0')).join(', ');
        outLines.push(`.byte ${hex}`);
        pendingDataBytes = [];
      }
      lastWasData = false;
      // code line
      const code = convertCodeLine(instrPart);
      outLines.push(code);
    }
  }

  // flush remaining
  if (pendingDataBytes.length > 0) {
    const hex = pendingDataBytes.map(b => '$' + b.toString(16).padStart(2, '0')).join(', ');
    outLines.push(`.byte ${hex}`);
  }

  // 生成 TS 文件
  const name = BANK_NAMES[bankNum] || 'data';
  const varName = `_PRG_BANK_${String(bankNum).padStart(2, '0')}`;
  const tag = `prg_${String(bankNum).padStart(2, '0')}_${name}`;

  // Escape backticks in asm content
  const asmContent = outLines.join('\n').replace(/\\/g, '\\\\').replace(/`/g, '\\`');

  const tsContent = `/**
 * PRG-ROM MMC3 bank ${bankNum} (8KB) — 6502 assembly from disassembly
 * Mapper: 4 (MMC3)
 * Source: _tmp_bzk_out/bank_${String(bankNum).padStart(2, '0')}.asm
 */

import { asm } from '../_6502asm';
export { ${varName} as default };

console.log('[${tag}] loaded');

function build(): readonly number[] {
  return asm\`
${asmContent}
  \`;
}

const ${varName} = build();
`;

  const fileName = `prg_bank_${String(bankNum).padStart(2, '0')}_${name}.ts`;
  const outPath = join(OUT_DIR, fileName);
  writeFileSync(outPath, tsContent, 'utf-8');
  console.log(`  WROTE: ${fileName} (${outLines.length} lines, ${tsContent.length} bytes)`);
  return true;
}

// ════════════════════════════════════════════
// Main
// ════════════════════════════════════════════

console.log('Converting asm files to hex2asm .ts format...\n');

let ok = 0, fail = 0;
for (let i = 0; i < 32; i++) {
  console.log(`[${String(i).padStart(2, '0')}] bank_${String(i).padStart(2, '0')}.asm →`);
  if (convertBank(i)) ok++; else fail++;
}

console.log(`\nDone: ${ok} ok, ${fail} failed`);
