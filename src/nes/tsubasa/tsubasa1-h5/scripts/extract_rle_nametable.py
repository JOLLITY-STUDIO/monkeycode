#!/usr/bin/env python3
"""
精确提取 RLE 标题画面数据
    
基于扫描结果，Bank 5 (ROM $14010-$17FFF) 中 0x149C0-0x14BFF 区域
包含 RLE 压缩的名称表数据。

解码策略:
  byte < $80 或 = $FF → 直接 tile
  byte >= $80 且 != $FF → count=byte&0x1F, next=tile (重复 count 次)
  
特殊情况: $80 (count=0) 在原始 NES 代码中可能有特殊含义
  可能作为分隔符或直接 tile 值 $80
"""

import os
import sys
import struct
import zlib
from pathlib import Path
from typing import List, Tuple


def read_rom(path: str) -> bytes:
    with open(path, 'rb') as f:
        return f.read()


def decode_rle_v1(data: bytes, max_len: int = 4096) -> List[int]:
    """RLE 解码器 v1: $80=skip (count=0)"""
    result = []
    i = 0
    while i < len(data) and len(result) < max_len:
        b = data[i]
        i += 1
        if b < 0x80 or b == 0xFF:
            result.append(b)
        else:
            count = b & 0x1F
            if count == 0:  # $80, $A0, $C0, $E0 → no data, skip
                continue
            if i < len(data):
                val = data[i]
                i += 1
                for _ in range(count):
                    if len(result) < max_len:
                        result.append(val)
    return result


def decode_rle_v2(data: bytes, max_len: int = 4096) -> List[int]:
    """RLE 解码器 v2: $80=直接 tile $80, 其他同 v1"""
    result = []
    i = 0
    while i < len(data) and len(result) < max_len:
        b = data[i]
        i += 1
        if b < 0x80 or b == 0xFF:
            result.append(b)
        else:
            count = b & 0x1F
            if count == 0:
                # $80, $A0, $C0, $E0 — 可能是直接 tile 值
                result.append(b)
                continue
            if i < len(data):
                val = data[i]
                i += 1
                for _ in range(count):
                    if len(result) < max_len:
                        result.append(val)
    return result


def decode_rle_v3(data: bytes, max_len: int = 4096) -> List[int]:
    """
    RLE 解码器 v3: 不同的格式假设
    
    基于 Bank 1 $C2C2 分析:
    - 数据被组织为 16 字节的批处理
    - 每批写入 VRAM $20A8 开始
    - 共 14 行 × 每行 2 批 = 28 批
    
    尝试: 每 16 字节作为一批解析，不跨批
    """
    result = []
    i = 0
    batch = []
    
    while i < len(data) and len(result) < max_len:
        b = data[i]
        i += 1
        
        if b < 0x80 or b == 0xFF:
            batch.append(b)
        else:
            count = b & 0x1F
            if count == 0:
                # 批结束标记?
                if len(batch) > 0:
                    result.extend(batch)
                    batch = []
                # 可能也是场景结束
                if b == 0x80:
                    continue  # 批次分隔符
                else:
                    continue  # $A0/$C0/$E0 可能还有别的含义
                continue
            if i < len(data):
                val = data[i]
                i += 1
                for _ in range(count):
                    batch.append(val)
        
        # 每 16 字节一批
        if len(batch) >= 16:
            result.extend(batch[:16])
            batch = batch[16:]
    
    if batch:
        result.extend(batch)
    
    return result


def build_nametable_png(tiles: List[int], output_path: str, palette: List[Tuple] = None):
    """从 tile 索引构建 PNG 图像 (可视化)"""
    if palette is None:
        # 灰度调色板
        palette = [
            (0x00, 0x00, 0x00),  # 0: 黑
            (0x55, 0x55, 0x55),  # 1: 深灰
            (0xAA, 0xAA, 0xAA),  # 2: 浅灰
            (0xFF, 0xFF, 0xFF),  # 3: 白
        ]
    
    TILE_W = 8
    W = 32 * TILE_W   # 256
    H = 30 * TILE_W   # 240
    
    pixels = []
    for y in range(H):
        for x in range(W):
            tile_idx = (y // TILE_W) * 32 + (x // TILE_W)
            if tile_idx < len(tiles):
                t = tiles[tile_idx]
            else:
                t = 0
            # 简单映射: tile 值 mod 4 → 灰度
            c = palette[t & 3]
            pixels.append(c)
    
    # 创建 PNG
    def make_chunk(cht: bytes, cdata: bytes) -> bytes:
        chunk = cht + cdata
        crc = struct.pack('>I', zlib.crc32(chunk) & 0xFFFFFFFF)
        return struct.pack('>I', len(cdata)) + chunk + crc
    
    sig = b'\x89PNG\r\n\x1a\n'
    ihdr = make_chunk(b'IHDR', struct.pack('>IIBBBBB', W, H, 8, 2, 0, 0, 0))
    
    raw = bytearray()
    for y in range(H):
        raw.append(0)
        for x in range(W):
            r, g, b = pixels[y * W + x]
            raw.extend([r, g, b])
    
    compressed = zlib.compress(bytes(raw))
    idat = make_chunk(b'IDAT', compressed)
    iend = make_chunk(b'IEND', b'')
    
    with open(output_path, 'wb') as f:
        f.write(sig + ihdr + idat + iend)
    print(f"  PNG: {output_path} ({W}x{H})")


def display_nametable(tiles: List[int], title: str = ""):
    """ASCII 可视化"""
    W = 32
    H = min(30, len(tiles) // W)
    print(f"\n{title}")
    # 字符映射
    chars = ' ░▒▓'  # 0,1,2,3
    for row in range(H):
        line = ''
        for col in range(W):
            t = tiles[row * W + col]
            if t == 0:
                line += ' '
            elif t < 4:
                line += chars[t]
            elif t < 0x10:
                line += chr(0x30 + t) if t < 10 else chr(0x37 + t)
            elif t < 0x40:
                line += '+'
            elif t < 0x80:
                line += '*'
            else:
                line += '#'
        print(f'{row:2d}: {line}')


def main():
    parser = argparse.ArgumentParser()
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    
    parser.add_argument('--rom', default=str(project_dir / '_tmp_disasm_out' / 'Captain Tsubasa (Japan).nes'))
    parser.add_argument('--offset', type=lambda x: int(x, 0), default=0x149C0)
    parser.add_argument('--length', type=int, default=2048)
    parser.add_argument('--method', type=int, default=1, choices=[1,2,3])
    
    args = parser.parse_args()
    
    rom = read_rom(args.rom)
    print(f"ROM: {args.rom}")
    print(f"Reading ROM 0x{args.offset:06X} - 0x{args.offset + args.length:06X}")
    
    data = rom[args.offset:args.offset + args.length]
    print(f"First 64 bytes: {' '.join(f'{b:02X}' for b in data[:64])}")
    
    decoders = {1: decode_rle_v1, 2: decode_rle_v2, 3: decode_rle_v3}
    decode_fn = decoders[args.method]
    
    decoded = decode_fn(data, max_len=960)
    print(f"\nMethod {args.method}: {len(decoded)} decoded bytes")
    
    display_nametable(decoded, f"=== Method {args.method} ===")
    
    # 保存 PNG
    out_path = str(project_dir / 'public' / 'debug' / f'rle_decode_{args.method}.png')
    os.makedirs(str(project_dir / 'public' / 'debug'), exist_ok=True)
    build_nametable_png(decoded, out_path)


if __name__ == '__main__':
    import argparse
    main()
