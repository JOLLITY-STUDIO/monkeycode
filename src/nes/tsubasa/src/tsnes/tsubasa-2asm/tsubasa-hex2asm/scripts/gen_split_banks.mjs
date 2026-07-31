/**
 * 读取现有 .ts 文件的 8192 字节数组 + .asm 的 CDL 分类，
 * 生成 CODE_XXX() / DATA_XXX 格式的新 .ts 文件
 * 
 * 用法: node src/tsnes/tsubasa-hex2asm/scripts/gen_split_banks.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ASM_DIR = resolve(__dirname, '../../../../_tmp_bzk_out');
const OUT_DIR = resolve(__dirname, '../prg_banks');

const DESC = {
  0: 'dispatch_scene_engine',   1: 'match_jump',    2: 'nmi_renderer',
  3: 'data',                    4: 'data',          5: 'data',
  6: 'palette_data',            7: 'sprite_data',   8: 'data',
  9: 'data',                   10: 'data',         11: 'background',
 12: 'audio',                  13: 'data',         14: 'data',
 15: 'data',                   16: 'scene_logic',  17: 'data',
 18: 'data',                   19: 'lookup_tables', 20: 'team_data',
 21: 'data',                   22: 'sprite_engine', 23: 'data',
 24: 'cutscene',               25: 'data',         26: 'match_core',
 27: 'player_data',            28: 'attributes',   29: 'data',
 30: 'system_lib',             31: 'boot_vectors',
};

const BANK_CN = {
  0: '系統主分派器 + 場景狀態機', 1: '比赛引擎主体',
  2: 'NMI 中斷處理器 + PPU 更新', 3: '纯数据', 4: '纯数据', 5: '纯数据',
  6: '纯数据', 7: '纯数据', 8: '纯数据', 9: '纯数据', 10: '纯数据',
 11: '背景/瓦片渲染', 12: '音频/音效引擎', 13: '纯数据', 14: '纯数据', 15: '纯数据',
 16: '場景渲染/脚本引擎', 17: '纯数据', 18: '纯数据', 19: '辅助数据表',
 20: '队伍/球员选择', 21: '纯数据', 22: '精灵/OAM 处理', 23: '纯数据',
 24: '比赛场景/过场控制', 25: '纯数据', 26: '核心比赛引擎',
 27: '球员数据查询', 28: '球员属性查询', 29: '纯数据',
 30: 'MMC3 系统库 ($C000)', 31: 'RESET啟動 + 中斷向量',
};

function p02(n) { return String(n).padStart(2, '0'); }

/** 入口关联的 bank（按调用顺序） */
const ENTRY_BANKS = [30, 0, 1, 2];

/** 已完成的 bank（跳过） */
const DONE_BANKS = new Set([30, 0, 1, 2, 31]);

/** 最小代码/数据段字节数，小于此值的孤岛合并到相邻段 */
const MIN_SEGMENT = 12;

/**
 * 从现有 .ts 文件提取 8192 字节数组
 */
function readExistingBytes(bankNum) {
  const bn = p02(bankNum);
  const name = DESC[bankNum] || 'data';
  const tsPath = join(OUT_DIR, `prg_bank_${bn}_${name}.ts`);

  if (!existsSync(tsPath)) return null;

  const content = readFileSync(tsPath, 'utf-8');
  const pat = /const _PRG_BANK_\d{2}: readonly number\[\] = \[([\s\S]*?)\];/;
  const m = content.match(pat);
  if (!m) return null;

  const bytes = m[1]
    .replace(/\s+/g, ' ')     // 压缩空白
    .trim()
    .split(',')
    .map(s => parseInt(s.trim(), 16))
    .filter(n => !isNaN(n));

  return bytes;
}

/**
 * 从 .asm 文件构建 byte-level CDL 分类
 * 返回: null (找不到 asm) 或 size=8192 的数组，值 'C'|'D'|'U'
 * 策略: 对于 code=0 的纯数据 bank, 全部标记为 'D'
 */
function buildCdlMap(bankNum) {
  const asmPath = join(ASM_DIR, `bank_${p02(bankNum)}.asm`);
  if (!existsSync(asmPath)) return null;

  const content = readFileSync(asmPath, 'utf-8');
  const lines = content.split('\n');

  // 先看头部 CDL 统计
  let codeCnt = 0, dataCnt = 0;
  for (const line of lines.slice(0, 5)) {
    const sm = line.match(/code=(\d+)\s+data=(\d+)/);
    if (sm) { codeCnt = parseInt(sm[1]); dataCnt = parseInt(sm[2]); break; }
  }

  // 纯 data bank: 全 D
  if (codeCnt === 0) {
    return Array(8192).fill('D');
  }

  // 提取 CPU base
  let cpuBase = 0x8000;
  for (const line of lines.slice(0, 10)) {
    const m = line.match(/; CPU:\s+\$([0-9A-F]+)-\$/i);
    if (m) { cpuBase = parseInt(m[1], 16); break; }
  }

  // 初始化: 8192 个 'U' (unaccessed)
  const map = Array(8192).fill('U');

  // 逐行解析 CDL
  for (const line of lines) {
    if (!line.trim() || /^\s*;/.test(line)) continue;

    const m = line.match(
      /^\s*(0x[0-9A-Fa-f]+)\s+\$([0-9A-Fa-f]{4}):\s+(\S+)\s+(.+)$/
    );
    if (!m) continue;

    const cpuAddr = parseInt(m[2], 16);
    const cdl = m[3];
    const tail = m[4];

    // 计算字节偏移
    const offset = cpuAddr - cpuBase;
    if (offset < 0 || offset >= 8192) continue;

    // 提取该行字节数
    const sepIdx = tail.search(/\s{2,}/);
    let hexPart, instrPart;
    if (sepIdx >= 0) {
      hexPart = tail.substring(0, sepIdx).trim();
      instrPart = tail.substring(sepIdx).trim();
    } else {
      hexPart = '';
      instrPart = tail.trim();
    }

    let byteCount = 0;
    if (instrPart.startsWith('.byte')) {
      let raw = instrPart.replace('.byte ', '');
      const si = raw.indexOf(';');
      if (si >= 0) raw = raw.substring(0, si);
      byteCount = raw.split(',').filter(s => s.trim()).length;
    } else if (instrPart.startsWith('.dw')) {
      let raw = instrPart.replace('.dw ', '');
      const si = raw.indexOf(';');
      if (si >= 0) raw = raw.substring(0, si);
      byteCount = raw.split(',').filter(s => s.trim()).length * 2;
    } else if (instrPart.startsWith('!!UNDEF')) {
      byteCount = 1;
    } else if (hexPart) {
      byteCount = hexPart.trim().split(/\s+/).length;
    }

    // 确定类型: C(code) | D(data) | U(unaccessed)
    let type;
    if (cdl.includes('C')) {
      type = 'C';
    } else if (/[D12AIJ]/.test(cdl)) {
      // D=直接读取, 1/2=扩展数据标记, A=访问过, I/J=间接/跳转目标
      type = 'D';
    } else {
      type = 'U';
    }

    // 标记
    for (let i = 0; i < byteCount && offset + i < 8192; i++) {
      map[offset + i] = type;
    }
  }

  return map;
}

/**
 * 将 bytes + cdlMap 拆分成 code/data segments
 */
function splitRegions(bytes, cdlMap) {
  if (!cdlMap || bytes.length !== 8192) return null;

  // 合并连续同类型
  const regions = [];
  let curType = cdlMap[0];
  let curBytes = [bytes[0]];

  for (let i = 1; i < 8192; i++) {
    if (cdlMap[i] === curType) {
      curBytes.push(bytes[i]);
    } else {
      regions.push({ type: curType, bytes: [...curBytes] });
      curType = cdlMap[i];
      curBytes = [bytes[i]];
    }
  }
  regions.push({ type: curType, bytes: [...curBytes] });

  // 合并极小区域: 不足 MIN_SEGMENT 字节的 code/data 孤岛合并到相邻
  const merged = [];
  for (let i = 0; i < regions.length; i++) {
    if (regions[i].bytes.length < MIN_SEGMENT && i > 0) {
      merged[merged.length - 1].bytes.push(...regions[i].bytes);
    } else {
      merged.push(regions[i]);
    }
  }

  return merged;
}

function hexAddr(addr) { return '$' + addr.toString(16).toUpperCase().padStart(4, '0'); }

function bytesToLines(bytes) {
  const lines = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, Math.min(i + 16, bytes.length))
      .map(v => '0x' + v.toString(16).toUpperCase().padStart(2, '0'))
      .join(', ');
    lines.push(chunk);
  }
  return lines;
}

function writeBankFile(bankNum, bytes, cdlMap) {
  const regions = splitRegions(bytes, cdlMap);
  if (!regions) {
    console.log(`  SKIP: region split failed`);
    return;
  }

  const bn = p02(bankNum);
  const name = DESC[bankNum] || 'data';
  const cnDesc = BANK_CN[bankNum] || '';
  const cpuBase = bankNum === 30 ? 0xC000 : bankNum === 31 ? 0xE000 : 0x8000;

  const codeRegions = regions.filter(r => r.type === 'C');
  const dataRegions = regions.filter(r => r.type !== 'C');

  // 预计算每个 region 的 CPU 起始地址（累加全局偏移）
  let globalOff = 0;
  const addrs = [];
  for (const r of regions) {
    addrs.push(cpuBase + globalOff);
    globalOff += r.bytes.length;
  }

  let out = `/**
 * PRG-ROM MMC3 bank ${bankNum} (8KB) — split into code & data sections
 * Mapper: 4 (MMC3)
${cnDesc ? ` * 功能: ${cnDesc}` : ''}
 * CPU: ${hexAddr(cpuBase)}-${hexAddr(cpuBase + 0x1FFF)}
 * 
 * Auto-generated from BZK CDL analysis.
 * Code blocks -> function CODE_XXX(), Data blocks -> const DATA_XXX
 */

export { _PRG_BANK_${bn} as default };

`;

  // CODE SEGMENTS
  if (codeRegions.length > 0) {
    out += `// ═══════════════════════════════════════════════\n`;
    out += `// CODE SEGMENTS\n`;
    out += `// ═══════════════════════════════════════════════\n\n`;

    for (let i = 0; i < regions.length; i++) {
      if (regions[i].type !== 'C') continue;
      const sAddr = hexAddr(addrs[i]);
      const eAddr = hexAddr(addrs[i] + regions[i].bytes.length - 1);
      const funcName = `CODE_${sAddr}_${eAddr}`;

      out += `/** ${sAddr}-${eAddr}, ${regions[i].bytes.length} bytes [code] */\n`;
      out += `function ${funcName}(): readonly number[] {\n`;
      out += `  return [\n`;
      const hl = bytesToLines(regions[i].bytes);
      for (let j = 0; j < hl.length; j++) {
        out += `    ${hl[j]}`;
        if (j < hl.length - 1) out += ',';
        out += '\n';
      }
      out += `  ];\n`;
      out += `}\n\n`;
    }
  }

  // DATA SEGMENTS
  out += `// ═══════════════════════════════════════════════\n`;
  out += `// DATA SEGMENTS\n`;
  out += `// ═══════════════════════════════════════════════\n\n`;

  for (let i = 0; i < regions.length; i++) {
    if (regions[i].type === 'C') continue;
    const sAddr = hexAddr(addrs[i]);
    const eAddr = hexAddr(addrs[i] + regions[i].bytes.length - 1);
    const constName = `DATA_${sAddr}_${eAddr}`;

    out += `/** ${sAddr}-${eAddr}, ${regions[i].bytes.length} bytes [data] */\n`;
    out += `const ${constName}: readonly number[] = [\n`;
    const hl = bytesToLines(regions[i].bytes);
    for (let j = 0; j < hl.length; j++) {
      out += `    ${hl[j]}`;
      if (j < hl.length - 1) out += ',';
      out += '\n';
    }
    out += `];\n\n`;
  }

  // ASSEMBLE
  out += `// ═══════════════════════════════════════════════\n`;
  out += `// Assemble all code & data into full 8KB bank\n`;
  out += `// ═══════════════════════════════════════════════\n`;

  out += `const _PRG_BANK_${bn}: readonly number[] = [\n`;
  for (let i = 0; i < regions.length; i++) {
    const sAddr = hexAddr(addrs[i]);
    const eAddr = hexAddr(addrs[i] + regions[i].bytes.length - 1);
    const refName = regions[i].type === 'C'
      ? `CODE_${sAddr}_${eAddr}()`
      : `DATA_${sAddr}_${eAddr}`;
    out += `  ...${refName},\n`;
  }
  out += `];\n\n`;

  // Export list (like bank_31 format)
  const codeNames = [];
  const dataNames = [];
  for (let i = 0; i < regions.length; i++) {
    const sAddr = hexAddr(addrs[i]);
    const eAddr = hexAddr(addrs[i] + regions[i].bytes.length - 1);
    if (regions[i].type === 'C') {
      codeNames.push(`CODE_${sAddr}_${eAddr}`);
    } else {
      dataNames.push(`DATA_${sAddr}_${eAddr}`);
    }
  }

  out += `export {\n`;
  if (codeNames.length > 0) {
    out += `  // Code segments\n`;
    out += `  ${codeNames.join(', ')},\n`;
  }
  if (dataNames.length > 0) {
    out += `  // Data segments\n`;
    out += `  ${dataNames.join(', ')},\n`;
  }
  out += `};\n\n`;
  out += `console.log('[prg_${bn}_${name}] loaded');\n`;

  // Write
  const fileName = `prg_bank_${bn}_${name}.ts`;
  const outPath = join(OUT_DIR, fileName);
  writeFileSync(outPath, out, 'utf-8');

  const codeCnt = codeRegions.length;
  const dataCnt = dataRegions.length;
  const codeBytes = codeRegions.reduce((s, r) => s + r.bytes.length, 0);
  const dataBytes = dataRegions.reduce((s, r) => s + r.bytes.length, 0);

  console.log(`  ${fileName}: ${regions.length} segs (${codeCnt}C/${dataCnt}D), C:${codeBytes}B D:${dataBytes}B = ${bytes.length}B`);
}

// ════════════════════════════════════════════
console.log('Splitting all bank files from CDL analysis...\n');

let ok = 0, skip = 0;
for (let b = 0; b <= 31; b++) {
  if (DONE_BANKS.has(b)) {
    console.log(`[${p02(b)}] skip (already done)`);
    skip++;
    continue;
  }

  const bytes = readExistingBytes(b);
  if (!bytes || bytes.length !== 8192) {
    console.log(`[${p02(b)}] SKIP: can't read 8192 bytes from .ts`);
    skip++;
    continue;
  }

  const cdlMap = buildCdlMap(b);
  if (!cdlMap) {
    console.log(`[${p02(b)}] SKIP: no .asm CDL data`);
    skip++;
    continue;
  }

  writeBankFile(b, bytes, cdlMap);
  ok++;
}

console.log(`\nDone: ${ok} converted, ${skip} skipped`);
