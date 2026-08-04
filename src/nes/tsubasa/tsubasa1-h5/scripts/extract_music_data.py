"""
extract_music_data.py - 从 ROM 提取音乐序列数据

用法:
  python extract_music_data.py <rom_path> [--output OUTPUT_DIR]

功能:
  1. 读取 ROM Bank 1 的音乐指针表 ($E1A8)
  2. 提取每个曲目的序列数据
  3. 输出为 TypeScript 模块 (MusicData.ts)
  
来源: Bank 1 $E1A8 音乐指针表
每项 2 字节 (低/高) 指向音乐序列数据起始地址
数据格式: 见 AudioEngine.ts 文档

注意: 音乐指针表的位置和条目数需要通过 ASM 分析确认。
当前使用估算偏移 — 需验证。
"""

import struct
import sys
import os

# ROM 布局
PRG_BANK_SIZE = 0x4000  # 16KB
INES_HEADER_SIZE = 0x0010  # 16 字节 iNES 头部
BANK1_ROM_OFFSET = INES_HEADER_SIZE + 1 * PRG_BANK_SIZE  # Bank 1 = 0x4010

# 音乐指针表位置 (Bank 1 CPU 地址空间 $8000-$BFFF)
# $E1A8 → ROM 偏移 = $E1A8 - $8000 + BANK1_ROM_OFFSET
MUSIC_PTR_TABLE_CPU = 0xE1A8
MUSIC_PTR_TABLE_ROM = MUSIC_PTR_TABLE_CPU - 0x8000 + BANK1_ROM_OFFSET

# 音长表位置
NOTE_LENGTH_TABLE_CPU = 0xDFC8
NOTE_LENGTH_TABLE_ROM = NOTE_LENGTH_TABLE_CPU - 0x8000 + BANK1_ROM_OFFSET

def read_byte(rom: bytes, offset: int) -> int:
    return rom[offset]

def read_word(rom: bytes, offset: int) -> int:
    """读取小端序 16 位字"""
    return rom[offset] | (rom[offset + 1] << 8)

def cpu_to_rom(cpu_addr: int) -> int:
    """CPU 地址 → ROM 文件偏移 (Bank 1)"""
    return cpu_addr - 0x8000 + BANK1_ROM_OFFSET

def extract_note_length_table(rom: bytes):
    """提取音长表 ($DFC8)"""
    offset = NOTE_LENGTH_TABLE_ROM
    table = []
    for i in range(64):
        table.append(read_byte(rom, offset + i))
    return table

def extract_music_pointers(rom: bytes):
    """提取音乐指针表"""
    offset = MUSIC_PTR_TABLE_ROM
    pointers = []
    # 假设最多 32 个曲目
    for i in range(32):
        ptr = read_word(rom, offset + i * 2)
        if ptr == 0 or ptr == 0xFFFF:
            break
        pointers.append(ptr)
    return pointers

def extract_music_sequence(rom: bytes, cpu_addr: int, max_len: int = 1024):
    """提取单个音乐序列"""
    rom_offset = cpu_to_rom(cpu_addr)
    data = []
    for i in range(max_len):
        byte = read_byte(rom, rom_offset + i)
        data.append(byte)
        if byte == 0xFF:  # 通道结束标记
            break
    return bytes(data)

def generate_ts_module(tracks_info: list):
    """生成 TypeScript 模块代码"""
    lines = [
        '/**',
        ' * MusicData.ts - 音乐序列数据 (从 ROM 自动提取)',
        ' *',
        ' * 生成时间: ' + '(auto-generated)',
        ' * 来源: ROM Bank 1 $E1A8 音乐指针表',
        ' */',
        '',
        'import { MusicTrack, MusicSequenceData } from \'./AudioEngine\';',
        '',
    ]
    
    # 曲目列表
    lines.append('export const MUSIC_TRACKS: MusicTrack[] = [')
    for i, track in enumerate(tracks_info):
        lines.append(f'  {{ name: \'{track["name"]}\', dataOffset: 0x{track["offset"]:04X}, desc: \'{track.get("desc", "")}\' }},')
    lines.append('];')
    lines.append('')
    
    # 序列数据
    lines.append('export const MUSIC_SEQUENCES: Array<{ dataOffset: number; data: MusicSequenceData }> = [')
    for track in tracks_info:
        hex_data = ','.join(f'0x{b:02X}' for b in track['data'])
        lines.append(f'  {{ dataOffset: 0x{track["offset"]:04X}, data: new Uint8Array([{hex_data}]) }},')
    lines.append('];')
    lines.append('')
    
    return '\n'.join(lines)

def main():
    if len(sys.argv) < 2:
        print("Usage: python extract_music_data.py <rom_path> [--output OUTPUT_DIR]")
        sys.exit(1)
    
    rom_path = sys.argv[1]
    output_dir = sys.argv[3] if len(sys.argv) > 3 and sys.argv[2] == '--output' else '.'
    
    if not os.path.exists(rom_path):
        print(f"Error: ROM file not found: {rom_path}")
        sys.exit(1)
    
    with open(rom_path, 'rb') as f:
        rom = f.read()
    
    print(f"ROM size: {len(rom)} bytes")
    print(f"Music pointer table: CPU ${MUSIC_PTR_TABLE_CPU:04X} → ROM offset ${MUSIC_PTR_TABLE_ROM:04X}")
    
    # 提取音长表
    note_length_table = extract_note_length_table(rom)
    print(f"\nNote length table (64 entries): {note_length_table[:16]}...")
    
    # 提取音乐指针
    pointers = extract_music_pointers(rom)
    print(f"\nFound {len(pointers)} music track pointers:")
    for i, ptr in enumerate(pointers):
        rom_off = cpu_to_rom(ptr)
        print(f"  Track {i}: CPU ${ptr:04X} → ROM ${rom_off:04X}")
    
    # 提取每个曲目
    track_names = [
        'Opening / Title',
        'Menu Select',
        'Match BGM 1',
        'Match BGM 2',
        'Goal / Event',
        'Halftime',
        'Victory',
        'Game Over / Ending',
    ]
    
    tracks_info = []
    for i, ptr in enumerate(pointers):
        seq_data = extract_music_sequence(rom, ptr)
        name = track_names[i] if i < len(track_names) else f'Track {i:02X}'
        rom_off = cpu_to_rom(ptr)
        print(f"\nTrack {i}: {name}")
        print(f"  CPU: ${ptr:04X}, ROM: ${rom_off:04X}")
        print(f"  Length: {len(seq_data)} bytes")
        print(f"  Preview: {' '.join(f'{b:02X}' for b in seq_data[:16])}...")
        
        tracks_info.append({
            'name': name,
            'offset': ptr,
            'data': seq_data,
            'desc': '',
        })
    
    # 生成 TypeScript 模块
    ts_code = generate_ts_module(tracks_info)
    output_path = os.path.join(output_dir, 'MusicData_generated.ts')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_code)
    print(f"\nGenerated: {output_path}")

if __name__ == '__main__':
    main()
