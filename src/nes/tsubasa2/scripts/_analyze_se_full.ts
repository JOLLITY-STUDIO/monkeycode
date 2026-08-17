/**
 * 完整 SE 数据分析脚本
 * 目标: 从 Bank 12 中提取所有 SE 数据，解析命令序列，并生成 SE 播放器格式
 */
import bank12 from '../rom-data/prg-bank-12';

const BANK_BASE = 0x8000;

// 从 Bank 12 ROM 读一个地址的值
function rd(addr: number): number {
  const off = addr - BANK_BASE;
  return off >= 0 && off < bank12.length ? bank12[off] : 0;
}

// 读 16-bit LE
function rd16(addr: number): number {
  return rd(addr) | (rd(addr + 1) << 8);
}

// ════════════════════════════════════════════════
// 解析 SE 指针表 ($8BDA)
// ════════════════════════════════════════════════
const SE_HEADER_TABLE = 0x8BDA;
const NUM_SE_CHANNELS = 8;

console.log('══════════════════════════════════════');
console.log('  SE 指针表 ($8BDA)');
console.log('══════════════════════════════════════\n');

interface SeSubSection {
  id: number;
  ptr: number;
  offset: number;
  firstBytes: number[];
}

interface SeChannel {
  channel: number;
  headerAddr: number;
  headerOffset: number;
  subSections: SeSubSection[];
  trackStart: number;  // offset in bank after 0xFF terminator
  trackDataLen: number;
}

const channels: SeChannel[] = [];

for (let ch = 0; ch < NUM_SE_CHANNELS; ch++) {
  const ptrAddr = SE_HEADER_TABLE + ch * 2;
  const headerAddr = rd16(ptrAddr);
  const headerOff = headerAddr - BANK_BASE;

  if (headerOff < 0 || headerOff >= bank12.length) {
    console.log(`Channel ${ch}: INVALID pointer $${headerAddr.toString(16)}`);
    continue;
  }

  // 解析子段落 header
  let pos = headerOff;
  const subSections: SeSubSection[] = [];
  
  while (pos < bank12.length) {
    const id = bank12[pos];
    if (id === 0xFF) { pos++; break; }
    if (id >= 0x10) {
      // This shouldn't happen in header area, but if it does, assume corrupted
      console.log(`  WARN: Unexpected byte 0x${id.toString(16)} at pos 0x${pos.toString(16)}, breaking`);
      break;
    }
    const sPtr = (bank12[pos + 2] << 8) | bank12[pos + 1];
    const sOff = sPtr - BANK_BASE;
    const firstBytes = sOff >= 0 && sOff < bank12.length 
      ? Array.from(bank12.slice(sOff, Math.min(sOff + 8, bank12.length)))
      : [];
    subSections.push({ id, ptr: sPtr, offset: sOff, firstBytes });
    pos += 3;
  }

  const trackStart = pos;
  // 找到下一个 channel 的 header start 或结束
  const nextChHeader = ch < NUM_SE_CHANNELS - 1 ? rd16(SE_HEADER_TABLE + (ch + 1) * 2) - BANK_BASE : bank12.length;
  const trackDataLen = Math.min(nextChHeader - trackStart, bank12.length - trackStart);

  channels.push({
    channel: ch,
    headerAddr,
    headerOffset: headerOff,
    subSections,
    trackStart,
    trackDataLen: Math.max(0, trackDataLen),
  });
}

// ════════════════════════════════════════════════
// 显示每通道详情
// ════════════════════════════════════════════════
for (const ch of channels) {
  console.log(`--- Channel ${ch.channel}: header=$${ch.headerAddr.toString(16)} (off=0x${ch.headerOffset.toString(16)}) ---`);
  console.log(`  Sub-sections (${ch.subSections.length}):`);
  for (const ss of ch.subSections) {
    console.log(`    ID 0x${ss.id.toString(16).padStart(2,'0')} → $${ss.ptr.toString(16)} = [${ss.firstBytes.map(b=>'0x'+b.toString(16).padStart(2,'0')).join(', ')}]`);
  }
  
  // Show track data
  if (ch.trackDataLen > 0) {
    const track = Array.from(bank12.slice(ch.trackStart, Math.min(ch.trackStart + 64, ch.trackStart + ch.trackDataLen)));
    console.log(`  Track data (${ch.trackDataLen}B, offset 0x${ch.trackStart.toString(16)}):`);
    console.log(`    [${track.map(b=>'0x'+b.toString(16).padStart(2,'0')).join(', ')}]`);
    
    // Parse as commands
    const commands = parseCommands(track);
    console.log(`  Commands (${commands.length}):`);
    for (const cmd of commands) {
      console.log(`    ${cmd}`);
    }
  }
  console.log('');
}

// ════════════════════════════════════════════════
// NOISE 频段映射
// ════════════════════════════════════════════════
const NOISE_PERIODS: Record<number, number> = {
  0x00: 4, 0x01: 8, 0x02: 16, 0x03: 32, 0x04: 64, 0x05: 96, 0x06: 128, 0x07: 160,
  0x08: 202, 0x09: 254, 0x0A: 380, 0x0B: 508, 0x0C: 762, 0x0D: 1016, 0x0E: 2034, 0x0F: 4068,
};

// 搜索 SPECIFIC NOISE period 序列
console.log('══════════════════════════════════════');
console.log('  搜索特定 NOISE 模式');
console.log('══════════════════════════════════════\n');

// 从 SE trace 中找到的 NOISE period 序列模式
// SE1: 0x0C, 0x0F, 0x0D, 0x0B, 0x09 (matches Channel 7 data)
// etc.
const sePatterns = {
  'SE-whistle': [0x0f, 0x0e, 0x01, 0x0f, 0x0e, 0x01, 0x0f, 0x0e, 0x02, 0x0d, 0x02],
  'SE-fall':   [0x0f, 0x0e, 0x0d, 0x0c, 0x0b, 0x0a, 0x09, 0x08, 0x07, 0x06, 0x05, 0x04, 0x03, 0x02, 0x01],
  'SE-bounce': [0x0c, 0x0f, 0x0d, 0x0b, 0x09],
};

for (const [name, pattern] of Object.entries(sePatterns)) {
  // 在 SE 数据中搜索
  for (const ch of channels) {
    if (ch.trackDataLen <= 0) continue;
    const track = Array.from(bank12.slice(ch.trackStart, ch.trackStart + ch.trackDataLen));
    const matchIdx = findPattern(track, pattern);
    if (matchIdx >= 0) {
      console.log(`${name}: found in Channel ${ch.channel} track at offset 0x${(ch.trackStart + matchIdx).toString(16)}`);
    }
  }
}

// ════════════════════════════════════════════════
//  命令解析
// ════════════════════════════════════════════════
interface ParsedCmd {
  op: number;
  args: number[];
  desc: string;
}

function parseCommands(bytes: number[]): string[] {
  const result: string[] = [];
  let i = 0;
  while (i < bytes.length) {
    const b = bytes[i];
    if (b === 0xFF) { result.push('FF END'); break; }
    
    if (b === 0xE0) { result.push(`E0 note_dur=${bytes[i+1]?.toString(16) || '??'}`); i+=2; }
    else if (b === 0xE1) { result.push(`E1 dur_param=${bytes[i+1]?.toString(16) || '??'}`); i+=2; }
    else if (b === 0xE2) { result.push(`E2 duty_vol=${bytes[i+1]?.toString(16) || '??'}`); i+=2; }
    else if (b === 0xE3) { result.push(`E3 volume=${bytes[i+1]?.toString(16) || '??'}`); i+=2; }
    else if (b === 0xE4) { result.push(`E4 ???=${bytes[i+1]?.toString(16) || '??'}`); i+=2; }
    else if (b === 0xE5) { result.push(`E5 port_speed=${bytes[i+1]?.toString(16) || '??'}`); i+=2; }
    else if (b === 0xE6) { result.push(`E6 $$=${bytes[i+1]?.toString(16) || '??'}`); i+=2; }
    else if (b === 0xE7) { result.push(`E7 transport=${bytes[i+1]?.toString(16) || '??'}`); i+=2; }
    else if (b === 0xE8) { result.push(`E8 JMP=$${bytes[i+2]?.toString(16).padStart(2,'0')}${bytes[i+1]?.toString(16).padStart(2,'0') || '??'}`); i+=3; }
    else if (b === 0xE9) { result.push(`E9 CALL=$${bytes[i+2]?.toString(16).padStart(2,'0')}${bytes[i+1]?.toString(16).padStart(2,'0') || '??'}`); i+=3; }
    else if (b === 0xEA) { result.push(`EA ???=${bytes[i+1]?.toString(16) || '??'}`); i+=2; }
    else if (b === 0xEB) { result.push(`EB LOOP(count=${bytes[i+1]?.toString(16) || '??'})`); i+=2; }
    else if (b === 0xEC) { result.push(`EC LOOP_END`); i+=1; }
    else if (b === 0xED) { result.push(`ED ???=${bytes[i+1]?.toString(16) || '??'}`); i+=2; }
    else if (b >= 0x80 && b <= 0x9F) { result.push(`${b.toString(16).padStart(2,'0')} CTRL`); i+=1; }
    else if (b >= 0x10 && b <= 0x7F) { result.push(`NOTE:0x${b.toString(16)}`); i+=1; }
    else if (b === 0x00) { result.push('00 REST?'); i+=1; }
    else { result.push(`???0x${b.toString(16)}`); i+=1; }
    
    if (result.length > 40) { result.push('...(truncated)'); break; }
  }
  return result;
}

function findPattern(haystack: number[], needle: number[]): number {
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let match = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) { match = false; break; }
    }
    if (match) return i;
  }
  return -1;
}

// ════════════════════════════════════════════════
// 提取 SE 数据为结构化格式（供 SE 播放器使用）
// ════════════════════════════════════════════════
console.log('');
console.log('══════════════════════════════════════');
console.log('  SE 数据结构摘要（供播放器使用）');
console.log('══════════════════════════════════════\n');

for (const ch of channels) {
  const track = Array.from(bank12.slice(ch.trackStart, ch.trackStart + ch.trackDataLen));
  console.log(`SE_CH${ch.channel}: ${ch.subSections.length} sub-sections, ${ch.trackDataLen}B track data`);
}

// 检查额外的指针表入口 (超过 8 个 channel 的部分)
console.log('');
console.log('══════════════════════════════════════');
console.log('  额外指针表入口 ($8BDA+16 之后)');
console.log('══════════════════════════════════════');
for (let i = 8; i < 16; i++) {
  const ptrAddr = SE_HEADER_TABLE + i * 2;
  const ptr = rd16(ptrAddr);
  const off = ptr - BANK_BASE;
  if (off > 0 && off < bank12.length) {
    const bytes = bank12.slice(off, Math.min(off + 16, bank12.length));
    console.log(`  Entry ${i}: $${ptr.toString(16)} (off=0x${off.toString(16)}) → [${Array.from(bytes).map(b=>'0x'+b.toString(16).padStart(2,'0')).join(', ')}]`);
  }
}
