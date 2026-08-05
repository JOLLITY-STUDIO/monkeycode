/**
 * 测试 data-extractor.ts v2 — 直接分析 ROM 数据文件
 * 纯 CJS 同步模式，不依赖 tsx
 */
'use strict';

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname || '.', 'game-engine', 'native-game', 'tsubasa', 'banks', 'prg');

// =========================================================
// 工具函数: 从 TS 文件读取 readonly number[] 常量
// =========================================================
function readDataTs(filePath, constNameRegEx) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const regex = new RegExp(constNameRegEx + '\\s*:\\s*readonly\\s*number\\[\\]\\s*=\\s*\\[([\\s\\S]*?)\\];');
    const match = content.match(regex);
    if (match) {
      const arrStr = match[1];
      const numbers = [];
      const hexRegex = /0x([0-9a-fA-F]+)/g;
      let m;
      while ((m = hexRegex.exec(arrStr)) !== null) {
        numbers.push(parseInt(m[1], 16));
      }
      return numbers;
    }
    console.log(`  WARN: pattern "${constNameRegEx}" not found in ${path.basename(filePath)}`);
  } catch (e) {
    console.error(`  读取 ${filePath} 失败:`, e.message);
  }
  return null;
}

function extractNames(data) {
  if (!data) return [];
  const results = [];
  let current = [];
  for (let i = 0; i < data.length; i++) {
    const b = data[i];
    if (b === 0xFF) {
      if (current.length > 0) { results.push(current); current = []; }
    } else {
      current.push(b);
    }
  }
  if (current.length > 0) results.push(current);
  return results;
}

// =========================================================
// 主分析
// =========================================================
console.log('══════════════════════════════════════════');
console.log('  data-extractor v2 验证测试');
console.log('══════════════════════════════════════════\n');

const bank27File = path.join(baseDir, 'bank-27-player-data-data.ts');
const bank28File = path.join(baseDir, 'bank-28-player-attrs-data.ts');
const bank29File = path.join(baseDir, 'bank-29-player-value-data-only.ts');

// ==== 1. Bank 27: 球员名称 ====
console.log('━━━ 1. Bank 27: 球员名称 ━━━');

const DATA_801C_805D = readDataTs(bank27File, 'DATA_\\$801C_\\$805D');
const DATA_8074_80E2 = readDataTs(bank27File, 'DATA_\\$8074_\\$80E2');
const team0Names = DATA_801C_805D ? extractNames(DATA_801C_805D) : [];
const team1Names = DATA_8074_80E2 ? extractNames(DATA_8074_80E2) : [];

console.log(`  Team 0: ${team0Names.length} players`);
console.log(`  Team 1: ${team1Names.length} players`);
for (let i = 0; i < Math.min(3, team0Names.length); i++) {
  console.log(`    [${i}]`, team0Names[i].map(b => b.toString(16).padStart(2,'0')).join(' '));
}
for (let i = 0; i < Math.min(3, team1Names.length); i++) {
  console.log(`    [${i}]`, team1Names[i].map(b => b.toString(16).padStart(2,'0')).join(' '));
}
console.log(`  Total: ${team0Names.length + team1Names.length} players with names`);

// ==== 2. Bank 27: 队伍名称 ====
console.log('\n━━━ 2. Bank 27: 队伍名称 ━━━');
const DATA_8006_801B = readDataTs(bank27File, 'DATA_\\$8006_\\$801B');
const DATA_805E_8073 = readDataTs(bank27File, 'DATA_\\$805E_\\$8073');
const teamName0 = DATA_8006_801B ? extractNames(DATA_8006_801B) : [];
const teamName1 = DATA_805E_8073 ? extractNames(DATA_805E_8073) : [];
console.log(`  Team 0 name segments: ${teamName0.length}`);
if (teamName0.length > 0) console.log(`    tiles:`, teamName0[0].map(b => b.toString(16).padStart(2,'0')).join(' '));
console.log(`  Team 1 name segments: ${teamName1.length}`);
if (teamName1.length > 0) console.log(`    tiles:`, teamName1[0].map(b => b.toString(16).padStart(2,'0')).join(' '));

// ==== 3. Bank 27: 动画序列 ====
console.log('\n━━━ 3. Bank 27: 动画序列 ($8292-$8429) ━━━');
const DATA_8292_8429 = readDataTs(bank27File, 'DATA_\\$8292_\\$8429');
if (DATA_8292_8429) {
  console.log(`  Total data: ${DATA_8292_8429.length} bytes`);
  const ptrs = [];
  for (let i = 0; i < 13; i++) {
    const lo = DATA_8292_8429[i * 2] || 0;
    const hi = DATA_8292_8429[i * 2 + 1] || 0;
    ptrs.push((hi << 8) | lo);
  }
  console.log(`  Pointers: ${ptrs.map(p => '0x' + p.toString(16)).join(' ')}`);
  
  // Parse all sequences
  let totalFrames = 0;
  for (let seq = 0; seq < 13; seq++) {
    if (ptrs[seq] === 0) continue;
    let offset = ptrs[seq] - 0xA292;
    if (offset < 0 || offset >= DATA_8292_8429.length) continue;
    let frames = 0;
    while (offset + 1 < DATA_8292_8429.length) {
      const d = DATA_8292_8429[offset];
      const t = DATA_8292_8429[offset + 1];
      if (d === 0xFF || (d === 0 && t === 0)) break;
      frames++;
      offset += 2;
    }
    if (frames > 0) console.log(`  seq${seq}: ${frames} frames`);
    totalFrames += frames;
  }
  console.log(`  Total frames: ${totalFrames}`);
}

// ==== 4. Bank 28: 球员属性记录 ====
console.log('\n━━━ 4. Bank 28: 球员属性记录 ($9616-$9E4D) ━━━');
const DATA_9616_9E4D = readDataTs(bank28File, 'DATA_\\$9616_\\$9E4D');
if (DATA_9616_9E4D) {
  console.log(`  Total data: ${DATA_9616_9E4D.length} bytes`);
  const RECORD_SIZE = 12;
  let validRecords = 0;
  const records = [];
  for (let i = 0; i + RECORD_SIZE <= DATA_9616_9E4D.length; i += RECORD_SIZE) {
    const pid = DATA_9616_9E4D[i];
    if (pid === 0xFF) continue;
    let hasData = false;
    for (let j = 1; j < RECORD_SIZE; j++) {
      if (DATA_9616_9E4D[i + j] !== 0) { hasData = true; break; }
    }
    if (!hasData && pid === 0) continue;
    validRecords++;
    records.push(DATA_9616_9E4D.slice(i, i + RECORD_SIZE));
  }
  console.log(`  Valid records: ${validRecords} / ${Math.floor(DATA_9616_9E4D.length / RECORD_SIZE)} max`);
  // Show first 8 records
  for (let i = 0; i < Math.min(8, records.length); i++) {
    const r = records[i];
    console.log(`  [${i}] pid=${r[0].toString().padStart(2)}`, r.slice(1).map(b => b.toString(16).padStart(2,'0')).join(' '));
  }
  // Unique player IDs
  const uniquePids = new Set(records.map(r => r[0]));
  console.log(`  Unique playerIds: ${uniquePids.size}`);
  console.log(`  playerId range: ${Math.min(...uniquePids)} - ${Math.max(...uniquePids)}`);
}

// ==== 5. Bank 28: 球员配置表 ($9460-$95A7) ====
// $9460 主指针表由 ram_043B (游戏场景状态) 索引, 非对手队伍索引
// 数据格式: 4字节记录 = [槽ID, 能力偏移, 属性值, 位置标志]
console.log('\n━━━ 5. Bank 28: 球员配置表 ($9460-$95A7) ━━━');
const DATA_9460_95A7 = readDataTs(bank28File, 'DATA_\\$9460_\\$95A7');
if (DATA_9460_95A7) {
  console.log(`  Total data: ${DATA_9460_95A7.length} bytes`);
  console.log(`  索引: ram_043B (游戏场景状态, 0-6 有效配置, 7-9 共享默认)`);
  let sceneCount = 0;
  for (let idx = 0; idx < 16; idx++) {
    const ptrOff = idx * 2;
    if (ptrOff + 1 >= DATA_9460_95A7.length) break;
    const lo = DATA_9460_95A7[ptrOff];
    const hi = DATA_9460_95A7[ptrOff + 1];
    if (lo === 0 && hi === 0) continue;
    const ptr = (hi << 8) | lo;
    const baseOff = ptr - 0x9460; // offset from start of DATA_9460_95A7 array
    if (baseOff < 0 || baseOff >= DATA_9460_95A7.length) continue;
    
    const slots = [];
    let pos = baseOff;
    while (pos + 3 < DATA_9460_95A7.length && slots.length < 11) {
      const s = DATA_9460_95A7[pos];
      if (s === 0x00 || s === 0xFF) break;
      const b3 = DATA_9460_95A7[pos + 3];
      const posName = ['GK','DF','MF','FW'][b3 & 0x03] || '?';
      slots.push({
        slot: s,
        curveOff: DATA_9460_95A7[pos + 1],
        attr: DATA_9460_95A7[pos + 2],
        flags: b3,
        position: posName
      });
      pos += 4;
    }
    const shared = idx >= 7 ? ' [共享/默认]' : '';
    console.log(`  scene${idx}: ptr=0x${ptr.toString(16)} offset=0x${baseOff.toString(16)} slots=${slots.length}${shared}`);
    if (slots.length > 0) {
      console.log(`    slots:`, slots.map(s => `[id=0x${s.slot.toString(16).padStart(2,'0')} off=0x${s.curveOff.toString(16).padStart(2,'0')} ${s.position}]`).join(' '));
    }
    sceneCount++;
  }
  console.log(`  Total scene configs: ${sceneCount} (0-6有效, 7-9共享默认)`);
}

// ==== 6. Bank 28: 值曲线 ====
console.log('\n━━━ 6. Bank 28: 值曲线 ━━━');
const DATA_9E4E_9ECE = readDataTs(bank28File, 'DATA_\\$9E4E_\\$9ECE');
const DATA_9ECF_9EFB = readDataTs(bank28File, 'DATA_\\$9ECF_\\$9EFB');
const DATA_9EFC_9F0D = readDataTs(bank28File, 'DATA_\\$9EFC_\\$9F0D');
if (DATA_9E4E_9ECE) {
  console.log(`  Base curve: ${DATA_9E4E_9ECE.length} entries`);
  console.log(`  Sample (0-19):`, DATA_9E4E_9ECE.slice(0, 20));
  console.log(`  Sample (end-10):`, DATA_9E4E_9ECE.slice(-10));
}
if (DATA_9ECF_9EFB) {
  console.log(`  High curve part1: ${DATA_9ECF_9EFB.length} entries`);
}
if (DATA_9EFC_9F0D) {
  console.log(`  High curve part2: ${DATA_9EFC_9F0D.length} entries`);
  console.log(`  Combined high: ${(DATA_9ECF_9EFB||[]).length + DATA_9EFC_9F0D.length} entries`);
}

// ==== 7. Bank 29: 球员数值矩阵 ====
console.log('\n━━━ 7. Bank 29: 球员数值矩阵 ━━━');
const bank29Data = readDataTs(bank29File, 'PRG_BANK_29_DATA');
if (bank29Data) {
  console.log(`  Total data: ${bank29Data.length} bytes`);

  // 分析 22 字节行 (以0x00结尾的行)
  let pos = 0;
  const rows = [];
  const ROW_SIZE = 22;
  
  while (pos < bank29Data.length) {
    // 跳过开头的 0x00 字节
    while (pos < bank29Data.length && bank29Data[pos] === 0x00) pos++;
    if (pos >= bank29Data.length) break;
    
    // 查找下一个 0x00 (行终止符)
    let endPos = pos;
    while (endPos < bank29Data.length && bank29Data[endPos] !== 0x00) endPos++;
    if (endPos >= bank29Data.length) break;
    
    const rowLen = endPos - pos;
    // 只收集接近 ROW_SIZE 的行 (允许 ±2 的误差)
    if (Math.abs(rowLen - ROW_SIZE) <= 2) {
      const firstByte = bank29Data[pos];
      if (firstByte !== 0xFF && firstByte < 0x80) {
        rows.push({
          marker: firstByte,
          data: bank29Data.slice(pos, endPos + 1),
          offset: pos
        });
      }
    }
    
    pos = endPos + 1;
    if (rows.length > 200) break;
  }
  
  console.log(`  Found ${rows.length} rows (${ROW_SIZE}-byte aligned)`);
  
  // 显示前几行
  for (let i = 0; i < Math.min(10, rows.length); i++) {
    const r = rows[i];
    const hex = r.data.map(b => b.toString(16).padStart(2,'0')).join(' ');
    console.log(`  row[${i}] @0x${r.offset.toString(16).padStart(4)} marker=0x${r.marker.toString(16).padStart(2)} | ${hex}`);
  }
  
  // 检查行的重复模式 (第一行和后续行的关系)
  if (rows.length >= 2) {
    console.log(`\n  行分析:`);
    console.log(`    row[0] marker: ${rows[0].marker} length: ${rows[0].data.length}`);
    // 检查相邻行是否有重复模式
    if (rows[0].data.length === rows[1].data.length) {
      let sameCount = 0;
      for (let i = 0; i < rows[0].data.length; i++) {
        if (rows[0].data[i] === rows[1].data[i]) sameCount++;
      }
      console.log(`    row[0] vs row[1] same bytes: ${sameCount}/${rows[0].data.length}`);
    }
    // 检查 11 字节对称性
    if (rows[0].data.length === 23) { // 21 data + marker + 0x00
      const mid = Math.floor(rows[0].data.length / 2);
      const left = rows[0].data.slice(1, mid);
      const right = rows[0].data.slice(mid, -1);
      let symmetric = 0;
      for (let i = 0; i < Math.min(left.length, right.length); i++) {
        if (left[i] === right[i]) symmetric++;
      }
      console.log(`    row[0] left/right symmetry: ${symmetric}/${left.length}`);
    }
  }
}

console.log('\n══════════════════════════════════════════');
console.log('  验证完成');
console.log('══════════════════════════════════════════');
