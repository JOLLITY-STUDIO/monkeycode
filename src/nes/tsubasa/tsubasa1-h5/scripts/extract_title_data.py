#!/usr/bin/env python3
"""
标题画面数据提取脚本
从 ROM Bank 7 的 $D0F3 指针表提取标题画面的 RLE 压缩数据

Bank 7 映射:
  ROM $1C010-$1FFFF → CPU $C000-$FFFF
  即: CPU_addr = ROM_offset - 0x1C010 + 0xC000 = ROM_offset - 0x10

$D0F3 表: 标题画面数据指针表 (Bank 7 CPU 地址)
  每个条目 3 字节? 2 字节? (需分析)
  
Bank 1 $C070 标题初始化流程:
  1. $C2C2(索引=$7A) → RLE 解码名称表
  2. $C36C → 调色板处理
  3. 循环4次 $C383($79+=0x10) → 额外 PPU 数据
"""

import os
import sys
import json
import argparse
from pathlib import Path
from typing import List, Tuple


def read_rom(rom_path: str) -> bytes:
    with open(rom_path, 'rb') as f:
        return f.read()


def rom_to_cpu(rom_offset: int) -> int:
    """Bank 7: ROM offset → CPU address"""
    return rom_offset - 0x1C010 + 0xC000


def cpu_to_rom_bank7(cpu_addr: int) -> int:
    """Bank 7: CPU address → ROM offset"""
    return cpu_addr - 0xC000 + 0x1C010


def cpu_to_rom_bank2(cpu_addr: int) -> int:
    """Bank 2: CPU address ($8000-$BFFF) → ROM offset"""
    return cpu_addr - 0x8000 + 0x08010


def extract_word(data: bytes, offset: int) -> int:
    """读取 16 位小端值"""
    return data[offset] | (data[offset + 1] << 8)


def decode_title_data(rom: bytes) -> dict:
    """
    提取标题画面相关的所有数据
    
    Bank 7 布局:
    - $C000-$FFFF = ROM $1C010-$1FFFF
    - 跳转表从 $C000 开始 (344 个脚本入口)
    - 数据指针表在 $D0F3 附近
    
    Bank 1 $C2C2 通过 JSR $C3BA 设置指针:
    $C3BA: 
      LDA $7A       ; 索引
      ASL           ; ×2 (指针是 2 字节)
      TAX
      LDA $D0F3,X   ; 从表读取指针低字节
      STA $12
      LDA $D0F4,X   ; 高字节
      STA $13
    → 所以 $D0F3 是 2 字节指针表
    """
    
    result = {
        'tables': {},
        'pointers': [],
        'data_blocks': [],
    }
    
    # Bank 7 ROM 基础偏移
    bank7_base = 0x1C010
    
    # $D0F3 表 (在 Bank 7 中)
    # CPU $D0F3 → ROM offset = $D0F3 - $C000 + $1C010 = $D0F3 + $1010 = 0x1D103
    # 但我们要在 Bank 7 ASM 中找到确切位置
    d0f3_cpu = 0xD0F3
    d0f3_rom = cpu_to_rom_bank7(d0f3_cpu)
    
    print(f"$D0F3 pointer table at ROM offset 0x{d0f3_rom:06X}")
    print(f"  Expected CPU addr: ${d0f3_cpu:04X}")
    
    # $C3BA 在 Bank 2
    # CPU $C3BA → ROM offset
    c3ba_rom = cpu_to_rom_bank2(0xC3BA)
    print(f"$C3BA code at ROM offset 0x{c3ba_rom:06X}")
    
    # 读取 $C3BA 附近的代码验证
    # 从 ROM 读出 Bank 1 中的 code (实际这部分在 Bank 2 ROM 区域)
    code_near_c3ba = rom[c3ba_rom:c3ba_rom+20]
    print(f"  Bytes: {' '.join(f'{b:02X}' for b in code_near_c3ba)}")
    
    # 读取 $D0F3 指针表 —— 先读一些看看模式
    print(f"\n$D0F3 area (ROM 0x{d0f3_rom:06X}):")
    d0f3_data = rom[d0f3_rom:d0f3_rom+64]
    for i in range(0, 64, 8):
        line = ' '.join(f'{b:02X}' for b in d0f3_data[i:i+8])
        cpu_addr = rom_to_cpu(d0f3_rom + i)
        print(f"  ${cpu_addr:04X}: {line}")
    
    # 读取指针 → 每 2 字节一个指针（小端）
    # $C3BA 代码: LDA $D0F3,X / LDA $D0F4,X  → 指针表是 2 字节条目
    # 但 $D0F3 也可能是一个更大的数据结构的一部分
    
    # 尝试读取前几个指针
    ptr_table = []
    for idx in range(10):  # 读前 10 个指针
        offset = d0f3_rom + idx * 2
        if offset + 1 < len(rom):
            ptr = extract_word(rom, offset)
            ptr_table.append(ptr)
            # Bank 7 内的地址: $8000+ 范围
            if 0x8000 <= ptr <= 0xFFFF:
                ptr_rom = cpu_to_rom_bank7(ptr) if ptr >= 0xC000 else (ptr - 0x8000 + bank7_base)
                print(f"  [{idx}] ptr=${ptr:04X} → ROM 0x{ptr_rom:06X}", end="")
                # 查看指向的数据开头
                if ptr_rom < len(rom):
                    preview = rom[ptr_rom:ptr_rom+16]
                    print(f"  data: {' '.join(f'{b:02X}' for b in preview)}")
                else:
                    print("  (out of range)")
            else:
                print(f"  [{idx}] ptr=${ptr:04X} (not in Bank 7 range)")
    
    result['pointers'] = ptr_table
    
    # 提取第 0 个指针指向的数据 (标题画面)
    if ptr_table and 0x8000 <= ptr_table[0] <= 0xFFFF:
        data_ptr = ptr_table[0]
        if data_ptr >= 0xC000:
            data_rom = cpu_to_rom_bank7(data_ptr)
        else:
            data_rom = data_ptr - 0x8000 + bank7_base
        
        print(f"\nTitle screen data at ROM 0x{data_rom:06X} (CPU ${data_ptr:04X}):")
        # 读取一些数据看看
        data_block = rom[data_rom:data_rom+256]
        result['data_blocks'].append({
            'index': 0,
            'address': data_ptr,
            'rom_offset': data_rom,
            'data_hex': data_block.hex(),
            'length': min(256, len(rom) - data_rom),
        })
        
        for i in range(0, min(256, len(data_block)), 16):
            line = ' '.join(f'{b:02X}' for b in data_block[i:i+16])
            print(f"  +{i:04X}: {line}")
    
    return result


def rle_decode(data: bytes) -> List[int]:
    """
    RLE 解码 (对应 $C2C2 解码器)
    
    格式:
      byte < $80 或 == $FF: 直接 tile
      byte >= $80 且 != $FF: bit0-4 = count, 下一 byte = 重复 tile
    """
    result = []
    i = 0
    while i < len(data):
        b = data[i]
        i += 1
        if b < 0x80 or b == 0xFF:
            result.append(b)
        else:
            count = b & 0x1F
            if count == 0:
                continue
            if i < len(data):
                val = data[i]
                i += 1
                result.extend([val] * count)
    return result


def format_hex_list(data: bytes, per_line: int = 16) -> str:
    """将字节数组格式化为每行 per_line 个值的 TS 数组格式"""
    lines = []
    for i in range(0, len(data), per_line):
        chunk = data[i:i+per_line]
        lines.append('  ' + ', '.join('0x{:02X}'.format(b) for b in chunk) + ',')
    return '\n'.join(lines)


def format_int_list(data: list, per_line: int = 32) -> str:
    """将整数列表格式化为每行 per_line 个值的 TS 数组格式"""
    lines = []
    for i in range(0, len(data), per_line):
        chunk = data[i:i+per_line]
        lines.append('  ' + ', '.join(str(v) for v in chunk) + ',')
    return '\n'.join(lines)


def generate_ts_output(output_path: str, title_data: dict):
    """生成 TypeScript 结构化数据文件"""
    
    from datetime import datetime
    
    # 解码 RLE 数据
    decoded_tiles = []
    if title_data.get('data_blocks'):
        for block in title_data['data_blocks']:
            raw = bytes.fromhex(block['data_hex'])
            decoded = rle_decode(raw)
            decoded_tiles.append(decoded)
            print("Block {}: {} compressed -> {} decompressed bytes".format(
                block['index'], len(raw), len(decoded)))
    
    # 构建 TS 内容
    ts_lines = []
    ts_lines.append('/**')
    ts_lines.append(' * 标题画面数据 - 从 ROM Bank 7 $D0F3 表提取')
    ts_lines.append(' * 自动生成于: {}'.format(datetime.now().isoformat()))
    ts_lines.append(' */')
    ts_lines.append('')
    ts_lines.append('/**')
    ts_lines.append(' * $D0F3 指针表 (Bank 7)')
    ts_lines.append(' */')
    ts_lines.append('export const D0F3_POINTERS: number[] = [')
    for ptr in title_data.get('pointers', []):
        ts_lines.append('  0x{:04X},'.format(ptr))
    ts_lines.append('];')
    ts_lines.append('')
    
    if title_data.get('data_blocks'):
        block = title_data['data_blocks'][0]
        raw_data = bytes.fromhex(block['data_hex'])
        ts_lines.append('/** 标题画面 RLE 压缩数据块 (原始) */')
        ts_lines.append('export const TITLE_NAMETABLE_RAW: number[] = [')
        ts_lines.append(format_hex_list(raw_data))
        ts_lines.append('];')
        ts_lines.append('')
        
        if decoded_tiles:
            ts_lines.append('/** 解码后的标题画面 tile 数据 */')
            ts_lines.append('// 长度: {} 字节'.format(len(decoded_tiles[0])))
            ts_lines.append('export const TITLE_NAMETABLE_DECODED: number[] = [')
            ts_lines.append(format_int_list(decoded_tiles[0]))
            ts_lines.append('];')
    
    ts_content = '\n'.join(ts_lines) + '\n'
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    print("\nTypeScript data written to: {}".format(output_path))


def main():
    parser = argparse.ArgumentParser(description='Extract title screen data from ROM')
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    
    parser.add_argument(
        '--rom',
        default=str(project_dir / '_tmp_disasm_out' / 'Captain Tsubasa (Japan).nes'),
        help='Path to NES ROM'
    )
    parser.add_argument(
        '--out',
        default=str(project_dir / 'src' / 'data' / 'TitleData.ts'),
        help='Output TypeScript file'
    )
    
    args = parser.parse_args()
    
    if not os.path.exists(args.rom):
        print(f"ERROR: ROM not found: {args.rom}")
        sys.exit(1)
    
    rom = read_rom(args.rom)
    print(f"ROM: {args.rom} ({len(rom)} bytes)")
    
    # 验证 iNES header
    if rom[0:4] != b'NES\x1a':
        print("ERROR: Not a valid NES ROM")
        sys.exit(1)
    
    prg_count = rom[4]
    chr_count = rom[5]
    prg_size = prg_count * 16384
    chr_size = chr_count * 8192
    
    print(f"  PRG: {prg_count} × 16KB = {prg_size} bytes")
    print(f"  CHR: {chr_count} × 8KB = {chr_size} bytes")
    print()
    
    title_data = decode_title_data(rom)
    
    # 验证指针表
    if title_data['pointers']:
        print(f"\nFound {len(title_data['pointers'])} pointers")
        generate_ts_output(args.out, title_data)
    else:
        print("\nWARNING: No valid pointers found. The $D0F3 area may need manual analysis.")
        print("Check the disassembly output for the correct pointer table location.")


if __name__ == '__main__':
    main()
