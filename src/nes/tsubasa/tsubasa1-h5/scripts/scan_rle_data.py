#!/usr/bin/env python3
"""
智能 ROM 数据扫描 — 搜索 RLE 压缩的名称表数据
基于 NametableDecoder.ts 中分析的数据格式:
  1. byte < $80 或 = $FF: 直接 tile
  2. byte >= $80 且 != $FF: bit0-4 = count, next byte = tile
  3. 每 16 字节一批写入 VRAM, 起始 $20A8
  4. 共 14 行 nametable + 属性表

扫描策略: 在 PRG ROM 中寻找连续 RLE 模式序列
"""

import os
import sys
import argparse
from pathlib import Path
from typing import List, Tuple


def read_rom(path: str) -> bytes:
    with open(path, 'rb') as f:
        return f.read()


def rle_score(data: bytes, offset: int, length: int) -> Tuple[int, int]:
    """
    评估从 offset 开始的 length 字节是否符合 RLE 格式
    返回 (得分, 解码后字节数) - 得分越高越可能是 RLE 数据
    """
    score = 0
    decoded_count = 0
    i = offset
    end = min(offset + length, len(data))
    
    while i < end:
        b = data[i]
        i += 1
        
        if b < 0x80:
            # 直接 tile: 有效 tile 值通常是 0x00-0xFF
            decoded_count += 1
            score += 1
        elif b == 0xFF:
            # $FF 特殊处理 (可能是分隔符或直接 tile)
            decoded_count += 1
            score += 1
        else:
            count = b & 0x1F
            if count == 0:
                # 无效 RLE 计数
                score -= 5
                continue
            if i < end:
                val = data[i]
                i += 1
                decoded_count += count
                score += 2  # RLE 压缩是有效模式
            else:
                score -= 10  # 截断
                break
    
    return score, decoded_count


def find_rle_blocks(rom: bytes, prg_start: int, prg_end: int, 
                    min_block_size: int = 64, step: int = 1) -> List[dict]:
    """
    在 ROM 中寻找可能的 RLE 数据块
    
    返回: [{offset, size, decoded_size, score, data}, ...]
    """
    blocks = []
    i = prg_start
    
    while i < prg_end - min_block_size:
        # 评分不同长度的块
        for block_len in [128, 256, 512, 1024]:
            if i + block_len > prg_end:
                continue
            score, decoded = rle_score(rom, i, block_len)
            if decoded > block_len * 0.3 and score > block_len * 0.5:
                blocks.append({
                    'offset': i,
                    'size': block_len,
                    'decoded_size': decoded,
                    'score': score,
                    'preview': rom[i:i+32].hex(' '),
                })
                break  # 只记录最佳匹配
        
        i += step
    
    # 按得分排序
    blocks.sort(key=lambda b: b['score'], reverse=True)
    return blocks


def decode_rle(data: bytes, max_output: int = 1024) -> List[int]:
    """RLE 解码"""
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
                continue
            if i < len(data):
                val = data[i]
                i += 1
                for _ in range(count):
                    if len(result) < max_output:
                        result.append(val)
    return result


def display_nametable(tiles: list, width: int = 32, height: int = 30):
    """以文本方式显示名称表 (用于调试)"""
    if len(tiles) < width * height:
        print(f"  (只有 {len(tiles)} tiles, 需要 {width*height})")
        return
    
    for row in range(min(height, 30)):
        line = ''
        for col in range(width):
            t = tiles[row * width + col]
            if t == 0:
                line += '  '
            elif t < 0x20:
                line += ' .'
            elif t < 0x40:
                line += f'{t:02X}'
            else:
                line += '##'
        print(f'  {row:2d}: {line}')


def main():
    parser = argparse.ArgumentParser(description='Scan ROM for RLE-compressed nametable data')
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    
    parser.add_argument('--rom', default=str(project_dir / '_tmp_disasm_out' / 'Captain Tsubasa (Japan).nes'))
    parser.add_argument('--top', type=int, default=20, help='显示前 N 个匹配')
    parser.add_argument('--show-blocks', type=int, default=3, help='解码并显示前 N 个块')
    
    args = parser.parse_args()
    
    rom = read_rom(args.rom)
    print(f"ROM: {args.rom} ({len(rom)} bytes)")
    
    # NES header
    if rom[0:4] != b'NES\x1a':
        print("Not a valid NES ROM")
        sys.exit(1)
    
    prg_count = rom[4]
    prg_size = prg_count * 16384
    prg_start = 16  # iNES header
    prg_end = prg_start + prg_size
    
    print(f"PRG: {prg_count} banks, {prg_size} bytes (ROM 0x{prg_start:06X}-0x{prg_end:06X})")
    
    # 搜索 RLE 块
    print("\n=== 扫描 RLE 数据块 ===")
    blocks = find_rle_blocks(rom, prg_start, prg_end, min_block_size=64, step=16)
    
    print(f"找到 {len(blocks)} 个可能的 RLE 块")
    
    for i, block in enumerate(blocks[:args.top]):
        print(f"\n[{i}] ROM 0x{block['offset']:06X} "
              f"size={block['size']} decoded={block['decoded_size']} "
              f"score={block['score']}")
        print(f"    Preview: {block['preview']}")
    
    # 解码并显示前几个块
    if args.show_blocks > 0:
        print("\n=== 解码结果 ===")
        for i in range(min(args.show_blocks, len(blocks))):
            block = blocks[i]
            data = rom[block['offset']:block['offset']+block['size']]
            decoded = decode_rle(data, max_output=1024)
            print(f"\n--- Block [{i}] ROM 0x{block['offset']:06X} "
                  f"({len(data)} compressed -> {len(decoded)} decoded) ---")
            
            if len(decoded) >= 960:
                display_nametable(decoded)
            else:
                # 显示前 128 个字节
                for j in range(0, min(128, len(decoded)), 16):
                    line = ' '.join(f'{b:02X}' for b in decoded[j:j+16])
                    print(f'  +{j:04X}: {line}')


if __name__ == '__main__':
    main()
