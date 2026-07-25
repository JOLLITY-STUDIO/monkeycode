/**
 * CDL 文件解析器
 *
 * 用法: node scripts/parse_cdl.mjs <cdl文件路径> [选项]
 *
 * CDL (Code/Data Logger) 是 FCEUX 模拟器生成的 ROM 访问日志文件。
 * 文件格式: 每个字节对应 ROM 中的一个字节。
 *   - bit 0 (0x01): 该字节被作为 CPU 指令执行过 (code)
 *   - bit 1 (0x02): 该字节被作为数据读取过 (data)
 *
 * ROM 布局 (MMC3, 512KB PRG + 256KB CHR):
 *   - 偏移 0 ~ 262143:   PRG-ROM (16 banks * 16384 bytes)
 *   - 偏移 262144 ~ 393215: CHR-ROM (16 banks * 8192 bytes)
 *
 * 运行示例:
 *   node scripts/parse_cdl.mjs src/legacy/romdata/xxx.cdl
 *   node scripts/parse_cdl.mjs src/legacy/romdata/xxx.cdl --bank 3
 *   node scripts/parse_cdl.mjs src/legacy/romdata/xxx.cdl --dump 3
 *   node scripts/parse_cdl.mjs src/legacy/romdata/xxx.cdl --chr
 *   node scripts/parse_cdl.mjs src/legacy/romdata/xxx.cdl --raw 3
 */

import fs from 'fs';

const PRG_BANK_SIZE = 16384;
const CHR_BANK_SIZE = 8192;
const PRG_BANKS = 16;
const CHR_BANKS = 16;
const PRG_TOTAL = PRG_BANKS * PRG_BANK_SIZE;
const CHR_TOTAL = CHR_BANKS * CHR_BANK_SIZE;

// ─── 解析命令行 ───
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('用法: node scripts/parse_cdl.mjs <cdl文件路径> [选项]');
  console.log('选项:');
  console.log('  --bank N    只看指定 PRG bank');
  console.log('  --chr       只看 CHR 部分');
  console.log('  --dump N    hexdump 指定 bank 的活跃字节');
  console.log('  --all       显示所有 bank 的 hexdump');
  console.log('  --raw N     显示 bank N 的全量 hexdump(包括未访问)');
  process.exit(1);
}

const cdlPath = args[0];
const opts = { bank: null, chr: false, dump: null, all: false, raw: null };
for (let i = 1; i < args.length; i++) {
  if (args[i] === '--bank' && args[i + 1]) opts.bank = parseInt(args[++i]);
  else if (args[i] === '--chr') opts.chr = true;
  else if (args[i] === '--dump' && args[i + 1]) opts.dump = parseInt(args[++i]);
  else if (args[i] === '--all') opts.all = true;
  else if (args[i] === '--raw' && args[i + 1]) opts.raw = parseInt(args[++i]);
}

// ─── 读取 CDL 文件 ───
const buf = fs.readFileSync(cdlPath);
console.log('文件: ' + cdlPath);
console.log('大小: ' + buf.length + ' bytes (预期 393216 = ' + PRG_BANKS + 'PRG*16384 + ' + CHR_BANKS + 'CHR*8192)');
console.log();

const isFullSize = buf.length >= PRG_TOTAL + CHR_TOTAL;

// ─── 分析函数 ───
function calcStats(offset, size) {
  let code = 0, data = 0, both = 0;
  for (let i = 0; i < size && offset + i < buf.length; i++) {
    const b = buf[offset + i];
    if (b & 0x01) code++;
    if (b & 0x02) data++;
    if (b === 0x03) both++;
  }
  const total = Math.min(size, buf.length - offset);
  return { code, data, both, unaccessed: total - code - data + both, total };
}

function fmt(stats, label) {
  const prefix = label || 'bank ' + String(stats.index).padStart(2);
  const accessed = stats.code + stats.data - stats.both;
  const pct = ((accessed / stats.total) * 100).toFixed(1);
  return prefix + ': code=' + String(stats.code).padStart(5) +
    ' data=' + String(stats.data).padStart(5) +
    ' both=' + String(stats.both).padStart(4) +
    ' unaccessed=' + String(stats.unaccessed).padStart(5) +
    ' accessed=' + pct + '%';
}

// ─── 图例说明 ───
function showLegend() {
  console.log('hexdump: c=code d=data C=both ..=unaccessed');
  console.log();
}

// ─── hexdump ───
function hexdump(offset, size, onlyActive) {
  const lines = [];
  const cols = 16;
  let inRegion = false;
  for (let i = 0; i < size; i += cols) {
    let hasActive = false;
    for (let j = 0; j < cols && i + j < size; j++) {
      if (buf[offset + i + j] & 0x03) { hasActive = true; break; }
    }
    if (onlyActive && !hasActive) {
      if (inRegion) {
        lines.push('  ... (' + (size - i) + ' bytes skip)');
        break;
      }
      continue;
    }
    inRegion = hasActive;
    const addr = offset + i;
    const hexPart = [];
    const ascPart = [];
    for (let j = 0; j < cols && i + j < size; j++) {
      const b = buf[offset + i + j];
      const flag = b & 0x03;
      if (onlyActive && flag === 0 && !opts.raw) {
        hexPart.push('..');
        ascPart.push(' ');
      } else {
        hexPart.push(b.toString(16).padStart(2, '0').toUpperCase());
        ascPart.push(flag === 3 ? 'C' : flag === 1 ? 'c' : flag === 2 ? 'd' : '.');
      }
    }
    lines.push('  ' + addr.toString(16).padStart(6, '0') + ': ' +
      hexPart.join(' ').padEnd(cols * 3 - 1) + ' |' + ascPart.join('') + '|');
  }
  return lines.join('\n');
}

// ─── 主逻辑 ───
if (opts.bank !== null) {
  const offset = opts.bank * PRG_BANK_SIZE;
  const stats = calcStats(offset, PRG_BANK_SIZE);
  stats.index = opts.bank;
  console.log(fmt(stats, 'PRG bank ' + String(opts.bank).padStart(2)));
  if (opts.dump !== null || opts.all || opts.raw !== null) {
    showLegend();
    console.log(hexdump(offset, PRG_BANK_SIZE, true));
  }
} else if (opts.chr) {
  console.log('=== CHR-ROM (16 banks * 8192 bytes) ===');
  let totalCode = 0, totalData = 0, totalBoth = 0;
  for (let i = 0; i < CHR_BANKS; i++) {
    const offset = PRG_TOTAL + i * CHR_BANK_SIZE;
    const stats = calcStats(offset, CHR_BANK_SIZE);
    stats.index = i;
    totalCode += stats.code; totalData += stats.data; totalBoth += stats.both;
    if (stats.code + stats.data - stats.both > 0) {
      console.log('  ' + fmt(stats, 'CHR bank ' + String(i).padStart(2)));
    }
  }
  const chrAccess = totalCode + totalData - totalBoth;
  console.log('  CHR total: code=' + totalCode + ' data=' + totalData +
    ' accessed=' + chrAccess + '/' + CHR_TOTAL +
    ' (' + ((chrAccess / CHR_TOTAL) * 100).toFixed(1) + '%)');
} else if (opts.dump !== null || opts.all || opts.raw !== null) {
  const n = opts.dump != null ? opts.dump : opts.raw;
  if (n !== null) {
    const offset = n * PRG_BANK_SIZE;
    const stats = calcStats(offset, PRG_BANK_SIZE);
    stats.index = n;
    console.log('=== PRG Bank ' + n + ' ===');
    console.log(fmt(stats));
    showLegend();
    console.log(hexdump(offset, PRG_BANK_SIZE, true));
  }
} else {
  // 默认: 全量统计
  console.log('=== PRG-ROM (16 banks * 16384 bytes) ===');
  let totalCode = 0, totalData = 0, totalBoth = 0;
  const codeBanks = [], dataBanks = [], mixedBanks = [], deadBanks = [];
  for (let i = 0; i < PRG_BANKS; i++) {
    const offset = i * PRG_BANK_SIZE;
    const stats = calcStats(offset, PRG_BANK_SIZE);
    stats.index = i;
    totalCode += stats.code; totalData += stats.data; totalBoth += stats.both;
    if (stats.code + stats.data - stats.both > 0) {
      console.log('  ' + fmt(stats, 'PRG bank ' + String(i).padStart(2)));
    } else {
      console.log('  PRG bank ' + String(i).padStart(2) + ': (未访问)');
    }
    if (stats.code > 0 && stats.data === 0) codeBanks.push(i);
    else if (stats.code === 0 && stats.data > 0) dataBanks.push(i);
    else if (stats.code > 0 && stats.data > 0) mixedBanks.push(i);
    else deadBanks.push(i);
  }
  const prgAccess = totalCode + totalData - totalBoth;
  console.log('  PRG total: code=' + totalCode + ' data=' + totalData +
    ' accessed=' + prgAccess + '/' + PRG_TOTAL +
    ' (' + ((prgAccess / PRG_TOTAL) * 100).toFixed(1) + '%)');

  console.log();
  console.log('=== CHR-ROM (16 banks * 8192 bytes) ===');
  if (isFullSize) {
    let chrCode = 0, chrData = 0, chrBoth = 0;
    for (let i = 0; i < CHR_BANKS; i++) {
      const offset = PRG_TOTAL + i * CHR_BANK_SIZE;
      const stats = calcStats(offset, CHR_BANK_SIZE);
      stats.index = i;
      chrCode += stats.code; chrData += stats.data; chrBoth += stats.both;
      if (stats.code + stats.data - stats.both > 0) {
        console.log('  ' + fmt(stats, 'CHR bank ' + String(i).padStart(2)));
      }
    }
    const chrAccess = chrCode + chrData - chrBoth;
    console.log('  CHR total: code=' + chrCode + ' data=' + chrData +
      ' accessed=' + chrAccess + '/' + CHR_TOTAL +
      ' (' + ((chrAccess / CHR_TOTAL) * 100).toFixed(1) + '%)');
  } else {
    console.log('  (CDL 文件不包含 CHR 部分)');
  }

  // 分类摘要
  console.log();
  console.log('=== 分类摘要 ===');
  if (codeBanks.length) console.log('纯代码(code>0, data=0): ' + codeBanks.join(', ') + ' -> ' + codeBanks.reduce((s, b) => s + (calcStats(b * PRG_BANK_SIZE, PRG_BANK_SIZE).code), 0) + ' bytes');
  if (dataBanks.length) console.log('纯数据(code=0, data>0): ' + dataBanks.join(', ') + ' -> ' + dataBanks.reduce((s, b) => s + (calcStats(b * PRG_BANK_SIZE, PRG_BANK_SIZE).data), 0) + ' bytes');
  if (mixedBanks.length) console.log('代码+数据: ' + mixedBanks.join(', '));
  if (deadBanks.length) console.log('未访问: ' + deadBanks.join(', '));
}
