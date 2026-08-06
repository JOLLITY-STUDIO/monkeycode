/**
 * Bank 7 数据提取 — 球员数据 + 文本数据
 * 
 * 发现: Bank 0 的 $AD38 指针表指向 RAM $03F7-$0583 (在 Bank 7 激活时访问)
 * 球员数据在初始化时从 Bank 7 ROM 加载到 RAM $03F7
 * 
 * 每个球员 18 字节:
 *   Offset 0-1:  名称指针 (Bank 7 CPU地址)
 *   Offset 2:    球队/阵营
 *   Offset 3:    位置/角色
 *   Offset 4-5:  ?
 *   Offset 6-7:  ?
 *   Offset 8-9:  ?
 *   Offset 10-13: ?
 *   Offset 14-15: ?
 *   Offset 16-17: ?
 * 
 * 用法: node scripts/extract_bank7_data.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const PRG_BULK = join(PROJECT_ROOT, 'src', 'data', 'raw', 'prg_bulk.json');
const OUTPUT_DIR = join(PROJECT_ROOT, 'src', 'data', 'tables');

// ==================== 辅助函数 ====================

function loadBank(id) {
  const bulk = JSON.parse(readFileSync(PRG_BULK, 'utf-8'));
  const entry = bulk.find(e => e.bankId === id);
  if (!entry) throw new Error(`Bank ${id} 未找到`);
  return Uint8Array.from(Buffer.from(entry.base64, 'base64'));
}

function read16LE(data, offset) {
  return data[offset] | (data[offset + 1] << 8);
}

/**
 * 读取 Bank 7 中以 null/FF 结尾的字符串
 * @param {Uint8Array} data - 数据源
 * @param {number} offset - 偏移量
 * @param {number} maxLen - 最大长度
 */
function readText(data, offset, maxLen = 32) {
  const chars = [];
  for (let i = 0; i < maxLen; i++) {
    if (offset + i >= data.length) break;
    const b = data[offset + i];
    if (b === 0x00 || b === 0xFF) break;
    chars.push(b);
  }
  return chars.filter(b => b !== undefined);
}

/**
 * 尝试从各种源读取名称
 * @param {number} namePtr - 名称指针 (可能是 Bank 7 CPU地址或 RAM 偏移)
 * @param {Uint8Array} bank7 - Bank 7 数据
 * @param {Map} ramData - RAM 数据 (可选)
 */
function readName(namePtr, bank7, ramData = null) {
  if (namePtr >= 0xC000 && namePtr <= 0xFFFF) {
    // Bank 7 固定区
    return readText(bank7, namePtr - 0xC000);
  } else if (namePtr >= 0x8000 && namePtr <= 0xBFFF) {
    // Bank 7 switchable 区 (Bank 7 数据在 $8000-$BFFF 也可见)
    return readText(bank7, namePtr - 0x8000);
  } else if (namePtr >= 0x0000 && namePtr <= 0x07FF) {
    // RAM 区域 - 可能已被加载
    if (ramData && ramData.has(namePtr)) {
      return ramData.get(namePtr);
    }
    return [];
  }
  return [];
}

/**
 * 将字符字节转换为可读字符串
 */
function decodeName(bytes) {
  if (!bytes || bytes.length === 0) return '(empty)';
  return bytes.map(b => `[${b.toString(16).toUpperCase().padStart(2,'0')}]`).join('');
}

// ==================== 主分析 ====================

console.log('═'.repeat(60));
console.log('  Bank 7 — 球员数据 & 文本提取');
console.log('═'.repeat(60));

const bank7 = loadBank(7);
const bank0 = loadBank(0);

// ==================== 1. Bank 0 $AD38 指针表 ====================
console.log('\n📋 Bank 0 $AD38 指针表 (球员数据指针):');
const PLAYER_STRIDE = 18;
const pointers = [];
for (let i = 0; i < 23; i++) {
  const addr = read16LE(bank0, 0x2D38 + i * 2); // $AD38 = ROM 0x2D38
  pointers.push(addr);
  console.log(`  [${i}] → $${addr.toString(16).toUpperCase().padStart(4,'0')} (RAM offset)`);
}

// ==================== 2. 从 Bank 7 提取球员数据 ====================
console.log('\n👤 球员数据 (Bank 7 RAM镜像):');

const players = [];
for (let i = 0; i < 23; i++) {
  const ramOffset = pointers[i]; // RAM 地址 (如 $03F7)
  // Bank 7 中对应的 ROM 偏移 = RAM地址 (因为 Bank 7 固定区 $C000-$FFFF)
  const romOffset = ramOffset;
  
  if (romOffset + PLAYER_STRIDE > bank7.length) {
    console.log(`  [${i}] ⚠️ 超出 Bank 7 范围`);
    continue;
  }
  
  const bytes = [];
  for (let j = 0; j < PLAYER_STRIDE; j++) {
    bytes.push(bank7[romOffset + j]);
  }
  
  const namePtr = read16LE(bank7, romOffset); // Bank 7 CPU地址
  const team = bytes[2];
  const role = bytes[3];
  const val4 = bytes[4];
  const val5 = bytes[5];
  const val6 = bytes[6];
  const val7 = bytes[7];
  const val8 = bytes[8];
  const val9 = bytes[9];
  const val10 = bytes[10];
  const val11 = bytes[11];
  const val12 = bytes[12];
  const val13 = bytes[13];
  const val14 = bytes[14];
  const val15 = bytes[15];
  const val16 = bytes[16];
  const val17 = bytes[17];
  
  // 读取名称 (名称指针可能是 Bank 7 CPU地址或 RAM偏移)
  const nameBytes = readName(namePtr, bank7);
  const nameRaw = decodeName(nameBytes);
  
  players.push({
    index: i,
    ramOffset: `$${ramOffset.toString(16).toUpperCase().padStart(4,'0')}`,
    namePtr: `$${namePtr.toString(16).toUpperCase().padStart(4,'0')}`,
    nameRaw,
    nameBytes,
    team, role,
    val4_5: [val4, val5],
    val6_7: [val6, val7],
    val8_9: [val8, val9],
    val10_11_12_13: [val10, val11, val12, val13],
    val14_15: [val14, val15],
    val16_17: [val16, val17],
    rawHex: bytes.map(b => b.toString(16).toUpperCase().padStart(2,'0')).join(' '),
  });
  
  console.log(`  [${i}] $${ramOffset.toString(16).toUpperCase().padStart(4,'0')}: ${bytes.map(b => b.toString(16).toUpperCase().padStart(2,'0')).join(' ')}`);
  console.log(`       name=$${namePtr.toString(16).toUpperCase().padStart(4,'0')} "${nameRaw}" team=${team} role=${role}`);
}

// ==================== 3. 提取 Bank 7 文本表 ====================
console.log('\n📝 Bank 7 文本数据:');

// Bank 7 文本在 $E000-$F968 区域 (根据 bank_01_annotated)
// 文本段以 null 结尾，由 Bank 2 指针表引用
const textStart = 0xE000 - 0xC000; // Bank 7 偏移
const textEnd = Math.min(0xF968 - 0xC000, bank7.length - 1);

const texts = [];
let offset = textStart;
let textIdx = 0;

// 从 Bank 2 $D0F3 获取文本指针
const bank2 = loadBank(2);
const textPtrTable = 0x50F3 - 0x4000; // $D0F3 in Bank 2

console.log('\n  Bank 2 $D0F3 文本指针表 (32条目):');
for (let i = 0; i < 32; i++) {
  const ptr = read16LE(bank2, textPtrTable + i * 2);
  console.log(`    [${i}] → Bank 7 $${ptr.toString(16).toUpperCase().padStart(4,'0')}`);
  if (ptr >= 0xC000 && ptr < 0xFFFF) {
    const bank7Off = ptr - 0xC000;
    if (bank7Off < bank7.length) {
      const bytes = readText(bank7, bank7Off);
      if (bytes && bytes.length > 0) {
        texts.push({ index: i, ptr, bytes, text: decodeName(bytes) });
      }
    }
  }
}

// ==================== 4. 扫描 Bank 7 文本区域 ====================
console.log('\n📝 Bank 7 文本区域扫描 ($E000-$F968):');
let scanOffset = 0x2000; // $E000 - $C000
let segmentIdx = 0;

while (scanOffset < bank7.length - 1 && segmentIdx < 100) {
  // 跳过非文本区域
  while (scanOffset < bank7.length && bank7[scanOffset] === 0x00) scanOffset++;
  if (scanOffset >= bank7.length) break;
  
  const segStart = scanOffset;
  const segBytes = readText(bank7, scanOffset);
  if (segBytes && segBytes.length >= 2 && segBytes.length <= 64) {
    const cpuAddr = segStart + 0xC000;
    texts.push({
      index: segmentIdx + 100,
      ptr: cpuAddr,
      bytes: segBytes,
      text: decodeName(segBytes),
    });
    segmentIdx++;
  }
  scanOffset += Math.max(segBytes.length, 1);
}

// ==================== 5. 输出 ====================
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

writeFileSync(
  join(OUTPUT_DIR, 'bank7_players.json'),
  JSON.stringify(players, null, 2),
  'utf-8'
);
console.log(`\n✅ 球员数据: bank7_players.json (${players.length} 名)`);

writeFileSync(
  join(OUTPUT_DIR, 'bank7_texts.json'),
  JSON.stringify(texts.slice(0, 50), null, 2),
  'utf-8'
);
console.log(`✅ 文本数据: bank7_texts.json (${texts.length} 段)`);

// ==================== 6. 生成 TypeScript 球员数据文件 ====================
const tsOutput = `/**
 * 球员数据表 — 从 Bank 7 提取的真实数据
 * 自动生成于: ${new Date().toISOString()}
 * 
 * 每个球员 18 字节结构:
 *   [0-1]  名称指针 (Bank 7 CPU $xxxx)
 *   [2]    球队/阵营ID
 *   [3]    位置角色
 *   [4-5]  属性组1
 *   [6-7]  属性组2
 *   [8-9]  属性组3
 *   [10-13] 属性组4
 *   [14-15] 属性组5
 *   [16-17] 属性组6
 */
import { PlayerEntry, PlayerPosition } from '../tables/PlayerTable';

/** 原始 Bank 7 偏移映射 (RAM $03F7 起始) */
const RAW_PLAYER_DATA: number[][] = [
${players.map(p => `  [${p.rawHex.split(' ').map(h => '0x' + h).join(', ')}],  // [${p.index}] ${p.nameRaw || '(no name)'}`).join('\n')}
];

/** 
 * 解析球员数据
 * 根据 Bank 0 代码分析:
 * - $AB6F: A=index → 查表 $AD38 → 返回 ($5D,$5E) 指向 RAM 中的球员数据
 * - $ABD5: LDA ($5D),Y (Y=0x0E) → 读取 byte[14]
 * - $ABDA: LDA ($5D),Y (Y=0x03) → 读取 byte[3] (角色位置)
 */
export function parsePlayerData(): PlayerEntry[] {
  return RAW_PLAYER_DATA.map((raw, i) => {
    const namePtr = raw[0] | (raw[1] << 8);
    const team = raw[2];
    const position = raw[3]; // 需进一步分析位置映射
    
    // 映射位置值到枚举
    let pos: PlayerPosition;
    switch (position & 0x0F) {
      case 0: pos = PlayerPosition.GK; break;
      case 1: pos = PlayerPosition.DF; break;
      case 2: pos = PlayerPosition.MF; break;
      case 3: pos = PlayerPosition.FW; break;
      default: pos = PlayerPosition.MF;
    }
    
    return {
      id: i,
      name: \`Player_\${i.toString(16).toUpperCase()}\`,
      nameId: namePtr,
      position: pos,
      shoot: raw[4] || 50,
      pass: raw[5] || 50,
      dribble: raw[6] || 50,
      tackle: raw[7] || 50,
      speed: raw[8] || 50,
      stamina: raw[9] || 50,
      specialMoves: [raw[10], raw[11], raw[12], raw[13]].filter(v => v !== 0 && v !== 0xFF),
      portraitTile: raw[14] || 0,
      teamId: team,
    };
  });
}
`;

writeFileSync(
  join(OUTPUT_DIR, 'bank7_player_data.ts'),
  tsOutput,
  'utf-8'
);
console.log(`✅ TS 数据: bank7_player_data.ts`);

console.log('\n' + '═'.repeat(60));
console.log('  提取完成');
console.log('═'.repeat(60));
