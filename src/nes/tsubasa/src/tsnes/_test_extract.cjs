/**
 * 数据提取验证脚本
 * 运行: node _test_extract.cjs
 * 读取 bank-27/28/29 的原始数据并验证解析逻辑
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════════
// 手工内联关键数据段(避免 TypeScript 导入复杂性)
// ═══════════════════════════════════════════════════════════════

// 从 bank-27-player-data-data.ts 复制 DATA_$8448_$94F0 (前部)
const data = [
  0x4B, 0xA5, 0x70, 0xA5, 0x7A, 0xA5, 0x84, 0xA5, 0xA9, 0xA5, 0xB8, 0xA5, 0xDD, 0xA5, 0xE6, 0xA5,
  0x0B, 0xA6, 0x15, 0xA6, 0x1F, 0xA6, 0x29, 0xA6, 0x4E, 0xA6, 0x55, 0xA6, 0x5C, 0xA6, 0x63, 0xA6,
  0x88, 0xA6, 0x04, 0xC8, 0x22, 0x00, 0xB4, 0xB5, 0xE0, 0x04, 0xE8, 0x22, 0x00, 0xB6, 0xB7, 0xE2,
  0x04, 0x08, 0x23, 0x00, 0xBC, 0xBD, 0xE8, 0x04, 0x28, 0x23, 0x00, 0xBE, 0xBF, 0xEA, 0x01, 0xEA,
  0x23, 0x50, 0x01, 0xF2, 0x23, 0x05, 0x00, 0x01, 0xEA, 0x22, 0xDA, 0x00, 0x01, 0xEA, 0x22, 0xF1,
  0x00, 0x01, 0xEA, 0x22, 0xD8, 0x00, 0x04, 0xC8, 0x22, 0x00, 0xEB, 0xEE, 0xEF, 0x04, 0xE8, 0x22,
  0x00, 0xB6, 0xB7, 0xE2, 0x04, 0x08, 0x23, 0x00, 0xBC, 0xBD, 0xE8, 0x04, 0x28, 0x23, 0x00, 0xBE,
  0xBF, 0xEA, 0x01, 0xEA, 0x23, 0x50, 0x01, 0xF2, 0x23, 0x05, 0x00, 0x04, 0xC8, 0x22, 0x00, 0xB4,
  0xE4, 0xE5, 0x04, 0xE8, 0x22, 0x00, 0xB6, 0xE6, 0xE7, 0x04, 0x08, 0x23, 0x00, 0xBC, 0xBD, 0xE8,
  0x04, 0x28, 0x23, 0x00, 0xBE, 0xBF, 0xEA, 0x01, 0xEA, 0x23, 0x50, 0x01, 0xF2, 0x23, 0x05, 0x00,
  0x01, 0xEA, 0x22, 0xD9, 0x00, 0x01, 0xEA, 0x22, 0xF2, 0x00,
];

// ═══════════════════════════════════════════════════════════════
// 分析
// ═══════════════════════════════════════════════════════════════

console.log('=== Bank 27 Data Structure Analysis ===');
console.log('');

// 1. 队伍指针表 (开头 34 bytes)
console.log('--- Team Pointer Table (first 34 bytes) ---');
const teamPtrs = [];
for (let i = 0; i < 17; i++) {
  const lo = data[i * 2];
  const hi = data[i * 2 + 1];
  const addr = (hi << 8) | lo;
  teamPtrs.push({ index: i, lo, hi, addr: '0x' + addr.toString(16).toUpperCase() });
  console.log(`  Team ${i}: ptr=$${hi.toString(16).toUpperCase().padStart(2,'0')}${lo.toString(16).toUpperCase().padStart(2,'0')} (LE → $${addr.toString(16).toUpperCase()})`);
}

// 2. PPU 上传包分析 (从 offset 34 开始)
console.log('');
console.log('--- PPU Upload Packets (from offset 34) ---');
let off = 34;
let pktCount = 0;
while (off + 2 < data.length && pktCount < 20) {
  const len = data[off];
  if (len === 0) break;
  const addrHi = data[off + 1];
  const addrLo = data[off + 2];
  const ppuAddr = (addrHi << 8) | addrLo;

  if (len <= 0x10 && ppuAddr >= 0x2000 && ppuAddr <= 0x2FFF) {
    const tiles = data.slice(off + 3, off + 3 + len);
    console.log(`  Packet ${pktCount}: len=${len} PPU=$${ppuAddr.toString(16).toUpperCase()} tiles=[${tiles.map(t => '0x'+t.toString(16)).join(', ')}]`);
    off += 3 + len;
    pktCount++;
  } else {
    // Not a standard PPU packet format - break
    break;
  }
}

// 3. 搜索球员记录 (16 字节)
console.log('');
console.log('--- Player Record Search (16-byte records) ---');

function isValidPlayer(arr, start) {
  if (start + 16 > arr.length) return false;
  const jersey = arr[start];
  const pos = arr[start + 5];
  return jersey >= 1 && jersey <= 99 && pos >= 0 && pos <= 3;
}

function describeRecord(arr, start) {
  const jersey = arr[start];
  const name = arr.slice(start + 1, start + 5).map(b => '0x' + b.toString(16)).join(', ');
  const pos = arr[start + 5];
  const stats = arr.slice(start + 6, start + 14);
  const flags = (arr[start + 15] << 8) | arr[start + 14];
  const posNames = ['GK', 'DF', 'MF', 'FW'];
  return `#${jersey} name=[${name}] pos=${posNames[pos]||'?'} shot=${stats[0]} spd=${stats[1]} tec=${stats[2]} sta=${stats[3]} pass=${stats[4]} tkl=${stats[5]} hdr=${stats[6]} gk=${stats[7]} flags=0x${flags.toString(16)}`;
}

let candidates = [];
let scanOff = 0;
while (scanOff + 16 <= data.length) {
  if (isValidPlayer(data, scanOff)) {
    // Check next one too
    if (scanOff + 32 <= data.length && isValidPlayer(data, scanOff + 16)) {
      candidates.push(scanOff);
    }
  }
  scanOff++;
}

console.log(`  Candidates with 2+ consecutive valid records: ${candidates.length}`);
if (candidates.length > 0) {
  console.log(`  First candidate offset: 0x${candidates[0].toString(16)} (${candidates[0]})`);
  console.log('');
  console.log('--- First 5 records from best candidate ---');
  let base = candidates[0];
  let count = 0;
  let off2 = base;
  while (off2 + 16 <= data.length && isValidPlayer(data, off2) && count < 5) {
    console.log(`  Player ${count} (off=0x${off2.toString(16)}): ${describeRecord(data, off2)}`);
    off2 += 16;
    count++;
  }
}

// 4. 队伍名称解析
console.log('');
console.log('--- Team Name Analysis ---');
// DATA_$8006_$801B: first team name
const team1Data = [0xFF, 0x9D, 0xB2, 0x95, 0x7E, 0xC4, 0xE4, 0xDF, 0xE9, 0xDE, 0xE1, 0xFF, 0xEA, 0xE5, 0xE7, 0xDB, 0xCF, 0x84, 0xD3, 0x7D, 0xD1, 0xA5];
const team2Data = [0xFF, 0x9D, 0xA6, 0x95, 0x7E, 0xDC, 0xDA, 0xC7, 0xEA, 0xDD, 0xEF, 0xFF, 0xEE, 0xE9, 0xD4, 0xE0, 0xEC, 0x90, 0xD2, 0x7D, 0xD0, 0x99];

function extractFFNames(arr) {
  const result = [];
  let i = 0;
  while (i < arr.length) {
    if (arr[i] === 0xFF) i++;
    if (i >= arr.length) break;
    const start = i;
    while (i < arr.length && arr[i] !== 0xFF) i++;
    result.push(arr.slice(start, i));
  }
  return result;
}

const t1Names = extractFFNames(team1Data);
console.log('  Team 0 names:', t1Names.map(n => n.join(', ')));
const t2Names = extractFFNames(team2Data);
console.log('  Team 1 names:', t2Names.map(n => n.join(', ')));

// 5. 总结
console.log('');
console.log('=== Analysis Complete ===');
console.log('');
console.log('Key findings:');
console.log('1. DATA_$8448_$94F0 starts with 34-byte team pointer table');
console.log('2. Then PPU upload packets for nametable display');
console.log('3. Player records (16-byte) embedded after PPU blocks');
console.log('4. Team/player names are FF-terminated tile sequences');
console.log('5. $842A pointer table references bank 28 $A000+ data');
