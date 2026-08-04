"""
正确的音乐数据提取脚本 - 修复所有已知 BUG

BUG 列表:
1. 音乐指针表在 $A000（13 条目），不是 $E1A8
2. 数据格式是 (duration, pitch) 2字节对 + 0xFF 终止，不是单字节opcode
3. $A000-$A019 = 指针表(offset from $A000)，$A01A+ = 序列数据
4. 之前的 extract_real_sequences.py 从错误的偏移开始读取

数据格式: [dur_byte, pitch_byte] 重复, 0xFF 终止
  - dur: 持续时间(帧), 1-255
  - pitch: 音高/命令字节
    - $00-$0F: 音高索引 (查音高表得到 NES period)
    - $E0-$FF: 特殊命令 (循环/结束等)
"""
import sys, os

rom_path = '_tmp_disasm_out/Captain Tsubasa (Japan).nes'
rom = open(rom_path, 'rb').read()

BANK1_ROM = 0x4010  # Bank 1 ROM offset
BASE = 0xA000  # CPU地址基址

def rom_ofs(cpu_addr):
    return cpu_addr - 0x8000 + BANK1_ROM

def read_ptr(cpu_addr):
    addr = rom_ofs(cpu_addr)
    lo = rom[addr]
    hi = rom[addr+1]
    return lo | (hi << 8)

def read_seq(cpu_addr, max_len=200):
    """读取 (dur, pitch) 序列直到 0xFF"""
    data = []
    i = cpu_addr
    while i < cpu_addr + max_len:
        addr = rom_ofs(i)
        dur = rom[addr]
        if dur == 0xFF:
            break
        pitch = rom[addr+1]
        data.append((dur, pitch))
        i += 2
        if i >= 0xC000:
            break
    return data

# 1. 读取指针表 ($A000, 13条目)
print('=== 音乐指针表 @ $A000 (13 条目) ===')
ptr_table = []
for i in range(13):
    ptr = read_ptr(0xA000 + i * 2)
    target = BASE + (ptr & 0xFFF)  # offset from $E000 area → normalized to $A000
    ptr_table.append(target)
    seq = read_seq(target)
    print(f'  [{i:2d}] offset=${ptr:04X} → ${target:04X} ({len(seq)} pairs)')

print()

# 2. 也读取从 $A01A 开始的连续序列 (不使用指针表)
print('=== 连续序列扫描 ($A01A-$A1FF) ===')
all_seqs_raw = []
pos = 0xA01A
while pos < 0xA200:
    addr = rom_ofs(pos)
    dur = rom[addr]
    if dur == 0x00:
        pos += 2
        continue
    if dur == 0xFF:
        pos += 2
        continue
    
    seq_data = read_seq(pos)
    if len(seq_data) > 0:
        all_seqs_raw.append({'addr': pos, 'data': seq_data})
        pos += len(seq_data) * 2 + 2  # +2 for FF terminator
    else:
        pos += 2

for idx, s in enumerate(all_seqs_raw):
    d = s['data']
    dur_preview = ','.join(f'{dd:3d}' for dd, pp in d[:8])
    pitch_preview = ','.join(f'0x{pp:02X}' for dd, pp in d[:8])
    print(f'  Seq[{idx}] @ ${s["addr"]:04X} ({len(d)} pairs)')
    print(f'    dur: [{dur_preview}]')
    print(f'    pitch: [{pitch_preview}]')

print()

# 3. 也验证 $E000 区域到底有什么
print('=== $E000-$E200 区域原始数据 ===')
for row in range(0, 0x200, 16):
    addr = rom_ofs(0xE000 + row)
    cpu = 0xE000 + row
    hex_str = ' '.join(f'{rom[addr+i]:02X}' for i in range(16))
    print(f'  ${cpu:04X}: {hex_str}')

print()

# 4. 输出 TS 格式
print('=== TypeScript Export ===')
print()
print('// 音乐数据 - 从 ROM Bank 1 $A000 提取')
print('// 格式: (duration, pitch) 2字节对，0xFF 终止')
print('// 指针表: $A000 (13 条目，指向各子序列)')
print()
print('export interface MusicPair {')
print('  dur: number;  // 持续帧数')
print('  pitch: number; // 音高索引 ($00-$0F) 或命令 ($E0-$FF)')
print('}')
print()
print(f'export const MUSIC_PTR_TABLE: number[] = [')
for i in range(13):
    target = ptr_table[i]
    offset = target - BASE
    print(f'  0x{offset:04X},  // [{i:2d}] → ${target:04X}')
print('];')
print()

for i, seq_addr in enumerate(ptr_table):
    seq = read_seq(seq_addr)
    if len(seq) == 0:
        continue
    print(f'// 序列 [{i}] @ ${seq_addr:04X} ({len(seq)} pairs)')
    print(f'export const SEQ_{i:02X}: MusicPair[] = [')
    for dur, pitch in seq[:16]:
        print(f'  {{ dur: {dur:3d}, pitch: 0x{pitch:02X} }},')
    if len(seq) > 16:
        print(f'  // ... {len(seq)-16} more pairs')
    print('];')
    print()
