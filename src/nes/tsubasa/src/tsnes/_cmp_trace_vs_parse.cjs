/**
 * 对比 trace 中的音频写入 vs 我们解析的 bank12 数据结构
 * 
 * 从 trace 提取:
 *   1. $4000-$4015 APU 寄存器 writes
 *   2. $0700-$0705 请求队列 writes (STA 到 $0700,X)
 *   3. $8349 初始化调用
 *   4. $8002 请求处理调用
 * 
 * 从我们解析的数据提取:
 *   1. $8BDA 音效指针表
 *   2. $870D 频率表
 *   3. $8725 时长表
 *   4. 音效初始化列表数据
 */

const fs = require('fs');
const path = require('path');

const TRACE_FILE = path.join(__dirname, 'trace', 'Captain Tsubasa II - Super Striker (Japan)-openning2.log');
const B12_ASM = path.join(__dirname, '_tmp_bzk_out', 'bank_12.asm');
const OUT_FILE = path.join(__dirname, '_cmp_result.txt');

const logLines = [];
function log(s) { logLines.push(s); process.stdout.write(s + '\n'); }

// ── 读取 NES PRG ROM ──
function loadPrgRom() {
  const romPath = path.join(__dirname, 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
  if (fs.existsSync(romPath)) {
    const buf = fs.readFileSync(romPath);
    // .nes header = 16 bytes, PRG-ROM follows
    // PRG size = header[4] * 0x4000 bytes
    const prgSize = buf[4] * 0x4000;
    return buf.slice(16, 16 + prgSize);
  }
  throw new Error('NES ROM not found: ' + romPath);
}

const prg = loadPrgRom();
const BANK_SIZE = 0x2000;

function b12(addr) { return 12 * BANK_SIZE + (addr - 0x8000); }
function pb(n) { return n.toString(16).toUpperCase().padStart(2, '0'); }

log('=== 对比 Trace vs 解析数据 ===\n');

// ═══════════════════════════════════════
// 1. 从 trace 提取音频操作
// ═══════════════════════════════════════
const lines = fs.readFileSync(TRACE_FILE, 'utf-8').split('\n');
const apuWrites = [];       // $4000-$4015 writes
const reqQueueWrites = [];  // $0700-$0705 writes
const reqQueueReads = [];   // $0700-$0705 reads

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;

  // Match APU register writes: STA $40xx / STX $40xx / STY $40xx
  const apuMatch = line.match(/\$([0-9A-F]{2}):([0-9A-F]{4}):\s*(?:8D|8E|8C)\s*(.{2})\s*(.{2})\s*ST[AXY]\s+\$40([0-9A-F]{2})/i);
  if (apuMatch) {
    apuWrites.push({ bank: apuMatch[1], addr: apuMatch[2], reg: '40' + apuMatch[5], value: apuMatch[4], raw: line.trim() });
  }

  // Match $0700-$0705 queue writes
  if (line.includes('STA $0700') && (line.includes('@ $0700') || line.includes('@ $0701') || line.includes('@ $0702') || line.includes('@ $0703') || line.includes('@ $0704') || line.includes('@ $0705'))) {
    const m = line.match(/\$([0-9A-F]{4})\s*=\s*#\$([0-9A-F]{2})/);
    if (m) {
      reqQueueWrites.push({ addr: '$' + m[1], value: parseInt(m[2], 16), raw: line.trim() });
    }
  }

  // Match queue reads
  if (line.includes('$0700') && (line.includes('LDY') || line.includes('LDA') || line.includes('CMP'))) {
    const m = line.match(/@ \$070([0-5])\s*=\s*#\$([0-9A-F]{2})/);
    if (m) {
      reqQueueReads.push({ slot: parseInt(m[1]), value: parseInt(m[2], 16), raw: line.trim() });
    }
  }
}

log(`Trace 统计:`);
log(`  APU 寄存器写入: ${apuWrites.length} 条`);
log(`  请求队列写入:   ${reqQueueWrites.length} 条`);
log(`  请求队列读取:   ${reqQueueReads.length} 条`);

// 去重后的请队列写入
const uniqueQueueWrites = {};
for (const w of reqQueueWrites) {
  uniqueQueueWrites['$' + w.value.toString(16).toUpperCase().padStart(4, '0')] = w;
}
log(`  唯一音效请求:   ${Object.keys(uniqueQueueWrites).length} 个`);
for (const k of Object.keys(uniqueQueueWrites)) {
  log(`    音效ID: 0x${k.slice(1)} (${parseInt(k.slice(1), 16)})`);
}

// ═══════════════════════════════════════
// 2. 输出 APU 写日志 (前50条)
// ═══════════════════════════════════════
log('\n--- 前30条 APU 写入 ---');
for (let i = 0; i < Math.min(apuWrites.length, 30); i++) {
  const w = apuWrites[i];
  log(`  ${i+1}. [${w.bank}:${w.addr}] → ${w.reg} = 0x${w.value}`);
}

// ═══════════════════════════════════════
// 3. 解析 bank12 音效指针表 ($8BDA-$8BFF)
// ═══════════════════════════════════════
log('\n=== 解析 Bank 12 音效指针表 ($8BDA-$8BFF) ===');
const SE_MAP_BASE = 0x8BDA;
const seEntries = [];

for (let i = 0; i < 19; i++) { // $8BDA to $8BFF = 38 bytes / 2 = 19 entries
  const off = b12(SE_MAP_BASE) + i * 2;
  if (off + 1 < prg.length) {
    const lo = prg[off];
    const hi = prg[off + 1];
    const ptr = lo | (hi << 8);
    seEntries.push({ id: i + 1, ptr: ptr, lo: lo, hi: hi, raw: [lo, hi] });
  }
}

log('音效ID → Track指针:');
for (const se of seEntries) {
  log(`  ${pb(se.id)} → $${se.ptr.toString(16).toUpperCase().padStart(4, '0')} [${pb(se.lo)} ${pb(se.hi)}]`);
}

// ═══════════════════════════════════════
// 4. 解析 trace 中出现的音效 ID 对应的初始化列表
// ═══════════════════════════════════════
log('\n=== Trace 中出现的音效 ID → 通道初始化分析 ===');
const seenIds = new Set();
for (const w of reqQueueWrites) seenIds.add(w.value);
for (const r of reqQueueReads) seenIds.add(r.value);

for (const sid of [...seenIds].sort((a, b) => a - b)) {
  if (sid === 0) continue;
  if (sid > seEntries.length) {
    log(`  音效 ${pb(sid)}: 超出 bank12 指针表范围 (共${seEntries.length}条)`);
    continue;
  }
  
  const se = seEntries[sid - 1];
  const initPtr = se.ptr;
  
  log(`  音效 0x${pb(sid)} → 初始化列指针: $${initPtr.toString(16).toUpperCase().padStart(4, '0')}`);
  
  // 读取初始化列表
  if (initPtr >= 0x8000 && initPtr < 0xA000) {
    const list = [];
    let y = 0;
    while (true) {
      const off = b12(initPtr) + y;
      if (off >= prg.length) break;
      const ch = prg[off];
      if (ch >= 0x80) {
        list.push(`终止符: 0x${pb(ch)} → $4015=0x0F`);
        break;
      }
      const tLo = prg[off + 1];
      const tHi = prg[off + 2];
      const tPtr = tLo | (tHi << 8);
      list.push(`  ch=${ch}, track=$${tPtr.toString(16).toUpperCase().padStart(4, '0')} [${pb(tLo)} ${pb(tHi)}]`);
      y += 3;
    }
    for (const l of list) log(`    ${l}`);
  } else {
    log(`    指针 $${initPtr.toString(16).toUpperCase().padStart(4, '0')} 不在 bank12 范围`);
  }
}

// ═══════════════════════════════════════
// 5. 频率表 ($870D-$8724) 
// ═══════════════════════════════════════
log('\n=== 频率表 ($870D-$8724) 12×2B ===');
for (let i = 0; i < 12; i++) {
  const off = b12(0x870D) + i * 2;
  const lo = prg[off];
  const hi = prg[off + 1];
  const period = lo | ((hi & 7) << 8);
  const hz = period > 0 ? Math.round(1789772.5 / (16 * (period + 1))) : 0;
  log(`  ${i.toString().padStart(2)}: $${period.toString(16).toUpperCase().padStart(4, '0')} (${period.toString().padStart(5)}) → ~${hz}Hz`);
}

// ═══════════════════════════════════════
// 6. 时长表 ($8725-$8764)
// ═══════════════════════════════════════
log('\n=== 时长表 ($8725-$8764) 前32条 ===');
const durLines = [];
for (let i = 0; i < 32; i++) {
  const off = b12(0x8725) + i;
  durLines.push(pb(prg[off]));
}
log(durLines.slice(0, 16).join(' '));
log(durLines.slice(16, 32).join(' '));

// ═══════════════════════════════════════
// 7. 检查 $8349 初始化函数
// ═══════════════════════════════════════
log('\n=== $8349 初始化函数 ===');
for (let i = 0; i < 20; i++) {
  const off = b12(0x8349) + i;
  log(`  $${(0x8349 + i).toString(16).toUpperCase()} = ${pb(prg[off])}`);
}

// ═══════════════════════════════════════
// 8. 对比总结
// ═══════════════════════════════════════
log('\n=== 对比总结 ===');
if (apuWrites.length === 0) {
  log('WARNING: Trace 中未捕获到 APU 寄存器 ($4000-$4015) 写入！');
  log('Trace 只捕获了 MMC3 bank 切换和 CPU 执行流，');
  log('需要重新生成包含 APU 写入的 trace 来验证对比。');
} else {
  log(`捕获到 ${apuWrites.length} 条 APU 写入`);
}

if (reqQueueWrites.length > 0) {
  log('\n请求队列写入对比:');
  for (const [k, w] of Object.entries(uniqueQueueWrites)) {
    const sid = w.value;
    const sidHex = '0x' + pb(sid);
    const inB12 = sid <= seEntries.length;
    const entry = inB12 ? seEntries[sid - 1] : null;
    if (inB12 && entry) {
      log(`  ${sidHex}: ✅ 在指针表中 → $${entry.ptr.toString(16).toUpperCase().padStart(4, '0')}`);
    } else {
      log(`  ${sidHex}: ❌ 超出 bank12 指针表范围 (max=${seEntries.length})`);
    }
  }
}

log('\n完成。');
fs.writeFileSync(OUT_FILE, logLines.join('\n'), 'utf-8');
log('输出已写入: ' + OUT_FILE);
