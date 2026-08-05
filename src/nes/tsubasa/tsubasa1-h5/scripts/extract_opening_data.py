#!/usr/bin/env python3
"""
提取开场动画 RLE nametable 数据

从 ROM Bank 7 的 $D0F3 指针表提取开场动画的 4 页 RLE 压缩数据,
解码后生成 TypeScript 结构化数据文件。

Bank 7 映射:
  ROM $1C010-$1FFFF → CPU $C000-$FFFF
  CPU_addr = ROM_offset - 0x10 (Bank 7 差值)

$D0F3 指针表: 位于 Bank 7, 每个条目 2 字节 (小端指针)
  指针指向 Bank 7 内的 RLE 压缩 nametable 数据

RLE 格式 (对应 ROM $C2C2 解码器):
  byte < $80 或 == $FF: 直接 tile
  byte >= $80 且 != $FF: bit0-4 = count, 下一 byte = tile (重复 count 次)
  每 16 字节一批写入 VRAM, 起始地址 $2000 (nametable 0)

用法:
  python scripts/extract_opening_data.py [--rom PATH] [--out PATH]
"""

import os
import sys
import argparse
from pathlib import Path
from typing import List, Tuple, Optional
from datetime import datetime


# ================================================================
# ROM 工具
# ================================================================

def read_rom(rom_path: str) -> bytes:
    with open(rom_path, 'rb') as f:
        return f.read()


def read_word(data: bytes, offset: int) -> int:
    """读取 16 位小端值"""
    return data[offset] | (data[offset + 1] << 8)


def cpu_to_rom_bank7(cpu_addr: int) -> int:
    """Bank 7: CPU address ($C000-$FFFF) → ROM offset"""
    return cpu_addr - 0xC000 + 0x1C010


def rom_to_cpu_bank7(rom_offset: int) -> int:
    """Bank 7: ROM offset → CPU address"""
    return rom_offset - 0x1C010 + 0xC000


# ================================================================
# RLE 解码器
# ================================================================

def rle_decode(data: bytes, max_output: int = 1024) -> List[int]:
    """
    RLE 解码 (对应 ROM $C2C2 解码器)
    
    格式:
      byte < $80 或 == $FF: 直接 tile
      byte >= $80 且 != $FF: bit0-4 = count, 下一 byte = 重复 tile
      count == 0 ($80/$A0/$C0/$E0): 跳过 (可能是分隔符)
    """
    result = []
    i = 0
    while i < len(data) and len(result) < max_output:
        b = data[i]
        i += 1
        if b < 0x80 or b == 0xFF:
            result.append(b)
        else:
            count = b & 0x1F
            if count == 0:
                # $80/$A0/$C0/$E0: 可能的分隔符, 跳过
                continue
            if i < len(data):
                val = data[i]
                i += 1
                result.extend([val] * count)
    return result


def rle_decode_to_nametable(data: bytes) -> Tuple[List[int], List[int]]:
    """
    RLE 解码并分离名称表 (960 bytes) + 属性表 (64 bytes)
    
    名称表从 VRAM $2000 开始每批 16 字节
    属性表从 VRAM $23C0 开始
    """
    tiles = [0] * 960
    attrs = [0] * 64
    
    nt_offset = 0
    batch: List[int] = []
    src_idx = 0
    
    while src_idx < len(data) and nt_offset < 960:
        b = data[src_idx]
        src_idx += 1
        
        if b < 0x80 or b == 0xFF:
            batch.append(b)
        else:
            count = b & 0x1F
            if count == 0:
                continue
            if src_idx < len(data):
                val = data[src_idx]
                src_idx += 1
                for _ in range(count):
                    batch.append(val)
        
        # 每 16 字节一批
        while len(batch) >= 16 and nt_offset < 960:
            for i in range(16):
                if nt_offset + i < 960:
                    tiles[nt_offset + i] = batch[i]
            batch = batch[16:]
            nt_offset += 16
    
    # 剩余数据: 属性表 (64 字节)
    attr_idx = 0
    remaining = list(data[src_idx:]) + batch
    for val in remaining:
        if attr_idx < 64:
            attrs[attr_idx] = val
            attr_idx += 1
    
    return tiles, attrs


# ================================================================
# 指针表解析
# ================================================================

def parse_d0f3_table(rom: bytes) -> List[dict]:
    """
    解析 Bank 7 的 $D0F3 指针表
    
    返回: [{index, cpu_addr, rom_offset, pointer, data_rom, decoded_tiles, decoded_attrs}, ...]
    """
    D0F3_CPU = 0xD0F3
    d0f3_rom = cpu_to_rom_bank7(D0F3_CPU)
    
    entries = []
    max_entries = 20  # 读取最多 20 个条目
    
    for idx in range(max_entries):
        ptr_offset = d0f3_rom + idx * 2
        if ptr_offset + 1 >= len(rom):
            break
        
        ptr = read_word(rom, ptr_offset)
        
        # 指针必须是 Bank 7 内的有效地址 ($8000-$FFFF)
        if not (0x8000 <= ptr <= 0xFFFF):
            # 非 Bank 7 地址 → 跳过或标记
            entries.append({
                'index': idx,
                'pointer': ptr,
                'valid': False,
                'data_rom': None,
                'decoded_tiles': [],
                'decoded_attrs': [],
                'raw_size': 0,
                'decoded_size': 0,
            })
            continue
        
        # Bank 7 内地址: $C000+ 使用 Bank 7 映射, $8000-$BFFF 使用 switchable bank
        if ptr >= 0xC000:
            data_rom = cpu_to_rom_bank7(ptr)
        else:
            # $8000-$BFFF: 假设在 Bank 7 的 switchable 区域
            # (在 MMC1 模式下实际映射到不同 bank, 这里简化处理)
            data_rom = ptr - 0x8000 + 0x1C010  # 近似
        
        if data_rom is None or data_rom >= len(rom):
            entries.append({
                'index': idx,
                'pointer': ptr,
                'valid': False,
                'data_rom': None,
                'decoded_tiles': [],
                'decoded_attrs': [],
                'raw_size': 0,
                'decoded_size': 0,
            })
            continue
        
        # 读取数据 (最多 512 字节 RLE 压缩数据)
        raw_size = min(512, len(rom) - data_rom)
        raw_data = rom[data_rom:data_rom + raw_size]
        
        # 解码
        tiles, attrs = rle_decode_to_nametable(raw_data)
        
        entries.append({
            'index': idx,
            'pointer': ptr,
            'valid': True,
            'data_rom': data_rom,
            'decoded_tiles': tiles,
            'decoded_attrs': attrs,
            'raw_size': raw_size,
            'decoded_size': len([t for t in tiles if t != 0]),
        })
    
    return entries


# ================================================================
# 格式化输出
# ================================================================

def format_array(data: List[int], per_line: int = 32, prefix: str = '  ') -> str:
    """格式化整数列表为 TS 数组"""
    lines = []
    for i in range(0, len(data), per_line):
        chunk = data[i:i + per_line]
        values = ', '.join(f'0x{v:02X}' for v in chunk)
        lines.append(f'{prefix}{values},')
    return '\n'.join(lines)


def generate_ts_output(entries: List[dict], output_path: str, num_pages: int = 4):
    """生成 TypeScript 数据文件"""
    
    valid_entries = [e for e in entries if e['valid']]
    
    ts_lines = []
    ts_lines.append('/**')
    ts_lines.append(' * 开场动画 nametable 数据 — 从 ROM Bank 7 $D0F3 指针表提取')
    ts_lines.append(' * 使用 RLE 解码器 ($C2C2) 算法解析')
    ts_lines.append(f' * 自动生成于: {datetime.now().isoformat()}')
    ts_lines.append(f' * 来源: Bank 7 $D0F3 指针表, 索引 0-{num_pages - 1}')
    ts_lines.append(' */')
    ts_lines.append('')
    ts_lines.append('export interface OpeningPageData {')
    ts_lines.append('  /** 名称表 (960 字节, 32×30) */')
    ts_lines.append('  nametable: number[];')
    ts_lines.append('  /** 属性表 (64 字节) */')
    ts_lines.append('  attrs: number[];')
    ts_lines.append('}')
    ts_lines.append('')
    ts_lines.append(f'export const OPENING_PAGES: OpeningPageData[] = [')
    
    for i in range(min(num_pages, len(valid_entries))):
        entry = valid_entries[i]
        tiles = entry['decoded_tiles']
        attrs = entry['decoded_attrs']
        
        ts_lines.append(f'  {{ // Page {i} (ROM index {entry["index"]})')
        ts_lines.append(f'    nametable: [')
        ts_lines.append(format_array(tiles, per_line=32))
        ts_lines.append(f'    ],')
        ts_lines.append(f'    attrs: [')
        ts_lines.append(format_array(attrs, per_line=16))
        ts_lines.append(f'    ],')
        ts_lines.append(f'  }},')
    
    ts_lines.append('];')
    ts_lines.append('')
    
    # 添加原始指针表
    ts_lines.append('/** $D0F3 指针表 (Bank 7) */')
    ts_lines.append('export const D0F3_OPENING_POINTERS: number[] = [')
    for e in valid_entries[:num_pages + 4]:
        ts_lines.append(f'  0x{e["pointer"]:04X},  // index={e["index"]}, ROM=0x{e.get("data_rom", 0):06X}')
    ts_lines.append('];')
    ts_lines.append('')
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_lines) + '\n')
    
    print(f'TypeScript data written to: {output_path}')


# ================================================================
# 主流程
# ================================================================

def main():
    parser = argparse.ArgumentParser(description='Extract opening animation data from ROM')
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    
    parser.add_argument('--rom', default=str(project_dir / '_tmp_disasm_out' / 'Captain Tsubasa (Japan).nes'))
    parser.add_argument('--out', default=str(project_dir / 'src' / 'data' / 'OpeningRleData.ts'))
    parser.add_argument('--num-pages', type=int, default=4, help='Number of opening pages to extract')
    parser.add_argument('--dump-all', action='store_true', help='Dump all valid entries for analysis')
    
    args = parser.parse_args()
    
    if not os.path.exists(args.rom):
        print(f'ERROR: ROM not found: {args.rom}')
        sys.exit(1)
    
    rom = read_rom(args.rom)
    print(f'ROM: {args.rom} ({len(rom)} bytes)')
    
    if rom[0:4] != b'NES\x1a':
        print('ERROR: Not a valid NES ROM')
        sys.exit(1)
    
    prg_count = rom[4]
    chr_count = rom[5]
    print(f'  PRG: {prg_count} × 16KB, CHR: {chr_count} × 8KB')
    
    # 解析 $D0F3 指针表
    print('\n=== $D0F3 Pointer Table Analysis ===')
    entries = parse_d0f3_table(rom)
    
    valid = [e for e in entries if e['valid']]
    print(f'Total entries: {len(entries)}, Valid: {len(valid)}')
    
    # 显示所有条目
    for e in entries:
        status = '✓' if e['valid'] else '✗'
        ptr_str = f'${e["pointer"]:04X}'
        if e['valid']:
            non_zero = e['decoded_size']
            print(f'  [{e["index"]:2d}] {status} ptr={ptr_str} ROM=0x{e["data_rom"]:06X} '
                  f'raw={e["raw_size"]}B decoded={e["decoded_size"]} non-zero tiles')
        else:
            print(f'  [{e["index"]:2d}] {status} ptr={ptr_str} (invalid/missing)')
    
    # 显示前 N 页的 nametable 预览
    print(f'\n=== Nametable Preview (first {args.num_pages} pages) ===')
    for i in range(min(args.num_pages, len(valid))):
        entry = valid[i]
        tiles = entry['decoded_tiles']
        non_zero = entry['decoded_size']
        
        print(f'\nPage {i} (index={entry["index"]}): {non_zero} non-zero tiles')
        
        # 显示 ASCII 预览 (前 20 行)
        W = 32
        for row in range(min(20, len(tiles) // W)):
            line = ''
            for col in range(W):
                t = tiles[row * W + col]
                if t == 0:
                    line += '  '
                elif t < 0x20:
                    line += ' .'
                elif t < 0x80:
                    line += f'{t:02X}'
                else:
                    line += '##'
            print(f'  {row:2d}: {line}')
    
    # 打印指针表供分析
    print(f'\n=== $D0F3 Pointers (for reference) ===')
    for e in valid:
        print(f'  [{e["index"]:2d}] ${e["pointer"]:04X} → ROM 0x{e["data_rom"]:06X}')
    
    # 生成 TS 输出
    print(f'\n=== Generating TypeScript Output ===')
    generate_ts_output(entries, args.out, args.num_pages)
    
    print('\nDone!')
    print(f'  Output: {args.out}')
    print(f'  Next: Import into OpeningScenePlayer.ts to replace test patterns')


if __name__ == '__main__':
    main()
