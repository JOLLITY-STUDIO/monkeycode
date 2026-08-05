/**
 * 深度分析 Bank 27 的 DATA_$8448_$94F0 (4265 字节)
 * 寻找球员记录的实际结构
 * 运行: node _deep_scan_b27.cjs
 */
const fs = require('fs');

// 读取 NES ROM
const nesPath = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const nesBuf = fs.readFileSync(nesPath);
const prgSize = nesBuf[4] * 16384;
let prgData = [];
for (let i = 0; i < prgSize; i++) prgData.push(nesBuf[16 + i]);

const BANK_SIZE = 8192;
const bank27 = prgData.slice(27 * BANK_SIZE, (27 + 1) * BANK_SIZE);

// Bank 27 DATA_$8448_$94F0 = from offset 0x0448, 0x94F0 - 0x8448 = 0x10A8 = 4264 bytes
const start = 0x0448;
const end = 0x94F0 - 0x8000; // = 0x14F0
// Actually 0x94F0 - 0x8000 = 0x14F0, 0x8448 - 0x8000 = 0x0448, so size = 0x14F0 - 0x0448 = 0x10A8 = 4264

const data = bank27.slice(0x0448, 0x0448 + 4265);
console.log(`DATA_$8448_$94F0: ${data.length} bytes`);

// ═══════════════════════════════
// 分析结构
// ═══════════════════════════════

console.log('');
console.log('=== Part 1: Team Pointer Table (first 34 bytes = 17 × 2 bytes LE) ===');
const pointers = [];
for (let i = 0; i < 17; i++) {
  const lo = data[i * 2];
  const hi = data[i * 2 + 1];
  const addr = (hi << 8) | lo;
  pointers.push(addr);
  console.log(`  Team ${i}: $$_{addr.toString(16).padStart(4, '0')}`);
}

// Part 2: PPU upload packets
console.log('');
console.log('=== Part 2: PPU Upload Packets ===');
// PPU packet format: [length, $C8/$E8, addrHi, addrLo, ...data...]
// Or: [count, cmd, addrHi, addrLo, ...bytes...]
let pos = 34; // After 34-byte team pointer table
let ppuCount = 0;
while (pos < data.length - 4) {
  const b0 = data[pos];
  if (b0 === 0x00 || b0 === 0xFF) { pos++; continue; }
  
  // Check for PPU packet header pattern
  const b1 = data[pos + 1];
  const b2 = data[pos + 2];
  const b3 = data[pos + 3];
  
  // PPU upload: [04, C8, 22, 00, d1, d2, d3, d4] or similar
  if ((b1 === 0xC8 || b1 === 0xE8 || b1 === 0xC9 || b1 === 0xE9 || b1 === 0xCB || b1 === 0xEB) && b2 >= 0x20 && b2 <= 0x2F) {
    const cmd = b1;
    const ppuAddr = (b2 << 8) | b3;
    const packetLen = b0;
    console.log(`  [${pos.toString(16).padStart(4, '0')}] PPU packet: count=${b0} cmd=0x${cmd.toString(16)} addr=$$_{ppuAddr.toString(16).padStart(4, '0')} data=[${data.slice(pos+4, pos+4+b0).map(b=>'0x'+b.toString(16)).join(' ')}]`);
    ppuCount++;
    pos += 4 + b0;
    continue;
  }
  
  // Check for single PPU write: [01, EA/EB/E9, addrHi, addrLo, byte]
  if ((b1 === 0xC9 || b1 === 0xE9 || b1 === 0xEA || b1 === 0xEB || b1 === 0xCB) && b2 >= 0x20 && b2 <= 0x2F) {
    const cmd = b1;
    const ppuAddr = (b2 << 8) | b3;
    const count = b0; // could be > 1
    console.log(`  [${pos.toString(16).padStart(4, '0')}] PPU write(s): count=${b0} cmd=0x${cmd.toString(16)} addr=$$_{ppuAddr.toString(16).padStart(4, '0')} bytes=[${data.slice(pos+4, pos+4+b0).map(b=>'0x'+b.toString(16)).join(' ')}]`);
    ppuCount++;
    pos += 4 + b0;
    continue;
  }
  
  // Check for PPU vertical: [03, E9, addrHi, addrLo, b1, b2, b3, 00]
  if (b0 === 0x03 && (b1 === 0xE9) && b2 >= 0x20 && b2 <= 0x2F) {
    console.log(`  [${pos.toString(16).padStart(4, '0')}] PPU vert write: addr=$$_{(b2<<8|b3).toString(16)} bytes=[${data.slice(pos+4, pos+7).map(b=>'0x'+b.toString(16)).join(' ')}]`);
    ppuCount++;
    pos += 7; // 0x03 + cmd + addrH + addrL + 3 data bytes? Let me just check the terminator
    // Actually find the 00 terminator
    while (pos < data.length && data[pos] !== 0x00) pos++;
    if (pos < data.length) pos++; // skip the 00
    continue;
  }
  
  pos++;
}

console.log(`Total PPU packets parsed: ${ppuCount}`);

// ═══════════════════════════════
// Part 3: 扫描剩余数据中的球员记录签名
// ═══════════════════════════════
console.log('');
console.log('=== Part 3: Scanning for Player Record Signatures ===');

// Known: bank 28 has attribute records at $9616 with IDs like 0x0C, 0x0E, 0x0F...
// Player attribute records: [playerId(1), attr1-attr11(11)] = 12 bytes
// BUT bank 27 records: [jersey(1), name(4), position(1), stats(8), flags(2)] = 16 bytes

// Key: player names in bank 27 are FF-terminated tile sequences
// The player name table starts at $801C: FF 91 A5 95 7E B4 E1 D4 D2 BB CD FF ...
// These are tile indices: 0x91, 0xA5, 0x95, 0x7E, 0xB4, 0xE1, 0xD4, 0xD2, 0xBB, 0xCD

// Let's look for patterns of [FF, ...tiles..., FF]
console.log('\nSearching for FF-terminated name sequences (≥3 tiles):');
let nameCount = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i] === 0xFF) {
    let j = i + 1;
    let tiles = [];
    while (j < data.length && data[j] !== 0xFF && data[j] !== 0x00) {
      tiles.push(data[j]);
      j++;
    }
    if (tiles.length >= 3 && data[j] === 0xFF) {
      if (nameCount < 30) {
        console.log(`  [0x${i.toString(16).padStart(4,'0')}] name(${tiles.length} tiles): [${tiles.map(b=>'0x'+b.toString(16).padStart(2,'0')).join(' ')}]`);
      }
      nameCount++;
    }
  }
}
console.log(`  Total FF-terminated sequences (≥3 tiles): ${nameCount}`);

// ═══════════════════════════════
// Part 4: 检查 data 中 $A5xx 指针指向的位置
// ═══════════════════════════════
console.log('');
console.log('=== Part 4: Following Team Pointers ===');
// The 17 team pointers point within the $A500-$A6xx range
// $A500 - $8000 = $2500 → offset 0x2500 in bank 27 → but out of bank range!
// Actually $8448 + 0x10A8 = $9500. So the pointers should be relative to $8000 base.
// $A54B (team 0 ptr) - $8000 = $254B → way past the bank! So these are CPU addresses.

// In bank 27's DATA_$8448_$94F0, the pointers reference other locations within the same data block
// $A54B - $8448 = $2103 → that's way past 4265 bytes...

// Wait - the pointer might be relative to start of DATA_$8448_$94F0.
// $A54B - $A000 = $054B → but that's not right either

// Let me think: The first 34 bytes are pointers. Byte 0-1 = $4B,$A5 = $A54B
// This points to somewhere in the $A000-$BFFF space.
// If we're in bank 27 at $8000-$9FFF, $A000 is another bank.
// $A54B in the other bank → offset $054B.

// BUT WAIT: The data IS in bank 27's address space ($8448-$94F0).
// The pointers ($A54B, $A570, $A57A...) are $Axxx addresses.
// $A54B - $8448 = $2103 → NOT in range.
// But $A54B - $8000 = $254B → NOT in range (bank only 8KB = $2000)
// $A54B - $A000 = $054B → offset $054B into bank 28

// Let me check: in the full data array at $A54B-8000 offset if we extend the data:
// Actually these pointers point to other banks. Let me check if they're self-referential
// within the DATA_$8448_$94F0 data block.

// $A54B - $8448 = $2103 ÷ doesn't fit. So pointers are NOT internal to this block.
// They reference data in the $A000-$BFFF window (bank 28 when mapped there).

// Let me just dump the raw data at the $A54B and related addresses in bank 28
console.log('\nTeam pointer targets in bank 28:');
const bank28 = prgData.slice(28 * BANK_SIZE, (28 + 1) * BANK_SIZE);
for (let i = 0; i < pointers.length; i++) {
  const ptr = pointers[i];
  const off = ptr - 0xA000;
  if (off >= 0 && off < BANK_SIZE) {
    const target = bank28.slice(off, off + 32);
    console.log(`  Team ${i}: $${ptr.toString(16)} → bank28[0x${off.toString(16).padStart(4,'0')}]: [${target.map(b=>'0x'+b.toString(16).padStart(2,'0')).join(' ')}]`);
  } else {
    console.log(`  Team ${i}: $${ptr.toString(16)} → out of bank 28 range`);
  }
}

// ═══════════════════════════════
// Part 5: 检查 bank 28 是否有球员记录
// ═══════════════════════════════
console.log('');
console.log('=== Part 5: Deep scan of bank 28 for player records ===');

function isPlayerRecord(arr, off) {
  if (off + 16 > arr.length) return false;
  const jersey = arr[off];
  const nameTiles = arr.slice(off + 1, off + 5);
  const pos = arr[off + 5];
  // 号码 1-99
  if (jersey < 1 || jersey > 99) return false;
  // 位置 0-3
  if (pos > 3) return false;
  // 名字至少有一个非FF tile
  if (nameTiles.every(t => t === 0xFF)) return false;
  // 能力值之和 > 0
  const stats = arr.slice(off + 6, off + 14);
  const sum = stats.reduce((a, b) => a + b, 0);
  return sum > 0;
}

// 检查 bank 28 整块是否有球员记录区域
const b28 = bank28;
console.log('Bank 28 players scan:');
for (let off = 0; off + 48 <= BANK_SIZE; off++) {
  if (isPlayerRecord(b28, off) && isPlayerRecord(b28, off + 16) && isPlayerRecord(b28, off + 32)) {
    // 找连续区域
    let count = 0;
    for (let c = 0; c < 20; c++) {
      if (isPlayerRecord(b28, off + c * 16)) count++; else break;
    }
    if (count >= 5) {
      console.log(`  Found ${count} consecutive players at 0x${off.toString(16).padStart(4,'0')}:`);
      for (let i = 0; i < Math.min(count, 8); i++) {
        const o = off + i * 16;
        const posNames = ['GK','DF','MF','FW'];
        console.log(`    #${b28[o]} ${posNames[b28[o+5]]||'?'} stats=[${b28.slice(o+6, o+14).join(',')}]`);
      }
      off += count * 16; // skip ahead
    }
  }
}
