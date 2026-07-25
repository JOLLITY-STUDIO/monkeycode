import { readFileSync, writeFileSync, existsSync } from 'fs';

const SRC = 'src/tsnes/tsubasa-code/prg_banks';
const ASM = '_tmp_bzk_out';

function p02(n) { return String(n).padStart(2, '0'); }

// All bank info gathered from disasm files and .asm headers
const DESC = {
  '00': '系統主分派器 + 場景狀態機 + 腳本處理器 + 任務調度器',
  '01': '比赛引擎主体 (球员移动/对抗/射门)',
  '02': 'NMI 中斷處理器 + 手柄讀取 + PPU 更新 + 音频驱动',
  '03': '纯数据 (code=0): 图形/瓦片数据',
  '04': '纯数据 (code=0): 图形/瓦片数据',
  '05': '纯数据 (code=0): 图形/瓦片数据',
  '06': '纯数据 (code=0, data=3345): 数据表',
  '07': '纯数据 (code=0, data=3908): 数据表',
  '08': '纯数据 (code=0, data=6358): 数据表',
  '09': '纯数据 (code=0, data=6645): 数据表',
  '10': '纯数据 (code=0, data=7039): 数据表',
  '11': '背景/瓦片渲染 + 数据表',
  '12': '音频/音效引擎 (APU寄存器) + 音乐数据',
  '13': '纯数据 (code=0, data=8176): 数据表',
  '14': '纯数据 (code=0, data=8177): 数据表',
  '15': '纯数据 (code=0, data=8134): 数据表',
  '16': '場景渲染/脚本引擎',
  '17': '纯数据 (code=0, data=7239): 数据表',
  '18': '纯数据 (code=0, data=7616): 数据表',
  '19': '辅助数据表 (code=877, mostly data)',
  '20': '队伍/球员选择界面',
  '21': '纯数据 (code=0, data=6901): 数据表',
  '22': '精灵/OAM 处理 + 精灵数据表',
  '23': '纯数据 (code=0, data=8047): 数据表',
  '24': '比赛场景/过场控制',
  '25': '纯数据 (code=0, data=7520): 数据表',
  '26': '核心比赛引擎 — JMP 分发表 + 子程序',
  '27': '球员数据查询小工具 + 数据表',
  '28': '球员属性/数据查询 + 属性数据表',
  '29': '纯数据 (code=0, data=3866): 数据表',
  '30': 'MMC3 系统库 ($C000-$DFFF): NMI处理/显示列表/数学运算',
  '31': 'RESET啟動序列 + 中斷向量表 ($E000-$FFFF)', // already done
};

// CPU ranges from .asm headers
const CPU_MAP = {
  '30': '$C000-$DFFF',
  '31': '$E000-$FFFF',
};

// Functions to generate splits per bank type
function dataBankSplits(byteCount, cpuBase) {
  const chunkSize = 512;
  const splits = [];
  let offset = 0, idx = 0;
  while (offset < byteCount) {
    const end = Math.min(offset + chunkSize, byteCount);
    splits.push([offset, end, `数据块${idx + 1}`]);
    offset = end; idx++;
  }
  return splits;
}

function codeBankSplits(byteCount, cpuBase) {
  const chunkSize = 1024;
  const splits = [];
  let offset = 0, idx = 0;
  while (offset < byteCount) {
    const end = Math.min(offset + chunkSize, byteCount);
    splits.push([offset, end, `代码/数据段${idx + 1}`]);
    offset = end; idx++;
  }
  return splits;
}

// Process all banks
for (let b = 1; b <= 31; b++) {
  const bn = p02(b);
  if (bn === '31') continue; // already done

  const tsPath = `${SRC}/bank_${bn}.ts`;
  if (!existsSync(tsPath)) { console.log(`  skip bank_${bn}: no .ts`); continue; }

  const tsContent = readFileSync(tsPath, 'utf-8');
  const pat = new RegExp(`const _PRG_BANK_${bn}: readonly number\\[\\] = \\[([\\s\\S]*?)\\];`);
  const byteMatch = tsContent.match(pat);
  if (!byteMatch) { console.log(`  skip bank_${bn}: no array`); continue; }

  const bytes = byteMatch[1].replace(/\s+/g, ' ').trim().split(',').map(s => parseInt(s.trim(), 16));
  const cpuBase = CPU_MAP[bn] || '$8000-$9FFF';
  const desc = DESC[bn] || '';

  // Determine split strategy
  const asmPath = `${ASM}/bank_${bn}.asm`;
  let cdlLine = '';
  try { const h = readFileSync(asmPath, 'utf-8').split('\n')[3] || ''; cdlLine = h.trim(); } catch {}
  const isDataBank = /code=0\b/.test(cdlLine);
  const baseAddr = cpuBase.startsWith('$C') ? 0xC000 : cpuBase.startsWith('$E') ? 0xE000 : 0x8000;
  const splits = isDataBank ? dataBankSplits(bytes.length, baseAddr) : codeBankSplits(bytes.length, baseAddr);

  // Build output
  let out = `/**
 * PRG-ROM MMC3 bank ${bn} (8KB) — function-based assembly
 * Mapper: 4 (MMC3) | CPU: ${cpuBase}
${cdlLine ? ` * CDL: ${cdlLine.replace('; CDL: ', '')}` : ''}
${desc ? ` *\n * 功能: ${desc}` : ''}
 *
 * Pattern: 参考 bank_31.ts
 *   每个 build_xxx() 函数返回其覆盖地址范围的 raw 6502 字节，
 *   最后通过 spread 拼成完整的 8KB 数组
 */

export { _PRG_BANK_${bn} as default };

console.log('[PRG bank_${bn}] loaded');

`;

  for (let si = 0; si < splits.length; si++) {
    const [start, end, comment] = splits[si];
    const chunk = bytes.slice(start, end);
    if (chunk.length === 0) continue;
    const startHex = '$' + (start + baseAddr).toString(16).toUpperCase();
    const endHex = '$' + (end + baseAddr - 1).toString(16).toUpperCase();
    const funcName = `build_${startHex}_${endHex}_s${si}`;

    out += `// ${startHex}-${endHex} (${chunk.length}B): ${comment}\n`;
    out += `function ${funcName}(): readonly number[] {\n`;
    out += `  return [\n`;

    for (let i = 0; i < chunk.length; i += 16) {
      const line = chunk.slice(i, i + 16).map(v => '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ');
      out += `    ${line}`;
      if (i + 16 < chunk.length) out += ',';
      out += '\n';
    }

    out += `  ];\n`;
    out += `}\n\n`;
  }

  out += `// ═══════════════════════════════════════════════════\n`;
  out += `// Assemble all sections into full 8KB bank\n`;
  out += `// ═══════════════════════════════════════════════════\n`;
  out += `const _PRG_BANK_${bn}: readonly number[] = [\n`;
  for (const [start, end, comment] of splits) {
    const startHex = '$' + (start + (cpuBase.startsWith('$C') ? 0xC000 : cpuBase.startsWith('$E') ? 0xE000 : 0x8000)).toString(16).toUpperCase();
    const endHex = '$' + (end + (cpuBase.startsWith('$C') ? 0xC000 : cpuBase.startsWith('$E') ? 0xE000 : 0x8000) - 1).toString(16).toUpperCase();
    const idx = splits.indexOf([start, end, comment]);
    out += `  ...build_${startHex}_${endHex}_s${idx}(),\n`;
  }
  out += `];\n`;

  writeFileSync(tsPath, out);
  console.log(`  bank_${bn}.ts: ${splits.length} functions, ${bytes.length} bytes, ${isDataBank ? 'DATA' : 'CODE'}`);
}

console.log('done');
