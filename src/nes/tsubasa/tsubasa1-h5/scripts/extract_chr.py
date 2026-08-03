#!/usr/bin/env python3
"""
CHR ROM 提取脚本 - 从 NES ROM 提取所有 CHR Bank → PNG 精灵表

用法:
    python scripts/extract_chr.py [--rom <path>] [--out <dir>]
    
默认:
    --rom  _tmp_disasm_out/Captain Tsubasa (Japan).nes
    --out  public/sprites/
"""

import os
import sys
import struct
import argparse
from pathlib import Path

# NES 调色板 - 灰度版本 (用于 raw CHR 预览, 索引0-3)
GRAY_PALETTE = [
    (0x00, 0x00, 0x00, 0xFF),  # 0: 黑色 (透明/背景)
    (0x55, 0x55, 0x55, 0xFF),  # 1: 深灰
    (0xAA, 0xAA, 0xAA, 0xFF),  # 2: 浅灰
    (0xFF, 0xFF, 0xFF, 0xFF),  # 3: 白色
]

# 或者使用NES风格颜色（便于识别）
NES_PALETTE = [
    (0x7C, 0x7C, 0x7C, 0xFF),  # 0: 灰
    (0x00, 0x00, 0xFC, 0xFF),  # 1: 蓝
    (0x94, 0x00, 0x84, 0xFF),  # 2: 紫
    (0xF8, 0xF8, 0xF8, 0xFF),  # 3: 白
]

TILE_SIZE = 8
TILES_PER_ROW = 16  # 每行16个tile
TILES_PER_COL = 16  # 每列16个tile (256 tiles/bank)
BANK_SIZE = 0x2000   # 8KB per CHR bank
HEADER_SIZE = 16     # iNES header


def read_nes_header(data: bytes) -> dict:
    """读取 iNES 头部信息"""
    if data[0:4] != b'NES\x1A':
        raise ValueError("Not a valid iNES ROM file")
    
    prg_count = data[4]        # PRG-ROM × 16KB
    chr_count = data[5]        # CHR-ROM × 8KB
    flags6 = data[6]
    flags7 = data[7]
    
    mapper = (flags7 & 0xF0) | ((flags6 >> 4) & 0x0F)
    mirror = 'Vertical' if (flags6 & 0x01) else 'Horizontal'
    has_trainer = bool(flags6 & 0x04)
    
    return {
        'prg_count': prg_count,
        'chr_count': chr_count,
        'mapper': mapper,
        'mirror': mirror,
        'has_trainer': has_trainer,
        'prg_size': prg_count * 16384,
        'chr_size': chr_count * 8192,
    }


def extract_tile_plane(plane_data: bytes) -> list:
    """将8字节平面数据 → 8×8 的二维像素数组 (0/1)"""
    pixels = []
    for row in range(8):
        row_pixels = []
        byte_val = plane_data[row]
        for col in range(8):
            bit = (byte_val >> (7 - col)) & 1
            row_pixels.append(bit)
        pixels.append(row_pixels)
    return pixels


def render_tile(tile_data: bytes) -> list:
    """
    解码单个 8×8 tile (16字节: 平面0 + 平面1)
    返回 8×8 的调色板索引列表
    """
    plane0 = extract_tile_plane(tile_data[0:8])
    plane1 = extract_tile_plane(tile_data[8:16])
    
    result = []
    for row in range(8):
        row_pixels = []
        for col in range(8):
            color_idx = plane0[row][col] | (plane1[row][col] << 1)
            row_pixels.append(color_idx)
        result.append(row_pixels)
    return result


def create_png(width: int, height: int, pixels: list) -> bytes:
    """
    创建 PNG 文件字节 (简单实现, 无压缩依赖)
    像素格式: RGBA tuples
    """
    try:
        import zlib
        
        def make_chunk(chunk_type: bytes, data: bytes) -> bytes:
            chunk = chunk_type + data
            crc = struct.pack('>I', zlib.crc32(chunk) & 0xFFFFFFFF)
            return struct.pack('>I', len(data)) + chunk + crc
        
        # PNG signature
        signature = b'\x89PNG\r\n\x1a\n'
        
        # IHDR
        ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
        ihdr = make_chunk(b'IHDR', ihdr_data)
        
        # IDAT - raw pixel data with filter byte per row
        raw_data = bytearray()
        for y in range(height):
            raw_data.append(0)  # filter: None
            for x in range(width):
                r, g, b, a = pixels[y * width + x]
                raw_data.append(r)
                raw_data.append(g)
                raw_data.append(b)
        
        compressed = zlib.compress(bytes(raw_data))
        idat = make_chunk(b'IDAT', compressed)
        
        # IEND
        iend = make_chunk(b'IEND', b'')
        
        return signature + ihdr + idat + iend
    
    except ImportError:
        # 回退: 使用 Python 标准库的 BMP + 转换思路
        # 简单写出 PPM P6 格式, 然后提示需要 PIL/Pillow
        raise RuntimeError(
            "zlib is required for PNG creation. "
            "Please install: pip install Pillow"
        )


def extract_all_chr_banks(rom_path: str, output_dir: str, use_nes_colors: bool = True):
    """提取所有 CHR bank 为 PNG"""
    
    with open(rom_path, 'rb') as f:
        rom_data = f.read()
    
    header = read_nes_header(rom_data)
    print(f"ROM: {rom_path}")
    print(f"  PRG: {header['prg_count']} × 16KB = {header['prg_size']} bytes")
    print(f"  CHR: {header['chr_count']} × 8KB = {header['chr_size']} bytes")
    print(f"  Mapper: {header['mapper']}")
    print(f"  Mirror: {header['mirror']}")
    
    if header['chr_count'] == 0:
        print("No CHR-ROM in this ROM (uses CHR-RAM). Nothing to extract.")
        return
    
    chr_start = HEADER_SIZE + header['prg_size']
    if header['has_trainer']:
        chr_start += 512
    
    palette = NES_PALETTE if use_nes_colors else GRAY_PALETTE
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    img_width = TILES_PER_ROW * TILE_SIZE   # 128
    img_height = TILES_PER_COL * TILE_SIZE  # 128
    
    total_banks = header['chr_count']
    
    for bank_idx in range(total_banks):
        bank_offset = chr_start + bank_idx * BANK_SIZE
        if bank_offset + BANK_SIZE > len(rom_data):
            print(f"  Bank {bank_idx:02d}: SKIP (超出ROM范围)")
            break
        
        bank_data = rom_data[bank_offset:bank_offset + BANK_SIZE]
        
        # 构建像素数组
        pixels = [[0, 0, 0, 0] for _ in range(img_width * img_height)]  # RGBA
        
        for tile_idx in range(256):
            tile_row = tile_idx // TILES_PER_ROW
            tile_col = tile_idx % TILES_PER_ROW
            
            tile_offset = tile_idx * 16
            tile_pixels = render_tile(bank_data[tile_offset:tile_offset + 16])
            
            for py in range(8):
                for px in range(8):
                    color_idx = tile_pixels[py][px]
                    img_x = tile_col * 8 + px
                    img_y = tile_row * 8 + py
                    pixel_idx = img_y * img_width + img_x
                    color = palette[color_idx]
                    pixels[pixel_idx] = list(color)
        
        # 写入 PNG
        try:
            png_data = create_png(img_width, img_height, pixels)
            out_path = os.path.join(output_dir, f'chr_bank_{bank_idx:02X}.png')
            with open(out_path, 'wb') as f:
                f.write(png_data)
            print(f"  Bank {bank_idx:02d}: {out_path} ({img_width}×{img_height}, {len(png_data)} bytes)")
        except RuntimeError as e:
            print(f"  Bank {bank_idx:02d}: ERROR - {e}")
            # 尝试使用 Pillow 回退
            try:
                from PIL import Image
                img = Image.new('RGBA', (img_width, img_height))
                img.putdata([tuple(p) for p in pixels])
                out_path = os.path.join(output_dir, f'chr_bank_{bank_idx:02X}.png')
                img.save(out_path, 'PNG')
                print(f"  Bank {bank_idx:02d}: {out_path} (via Pillow)")
            except ImportError:
                print(f"  Bank {bank_idx:02d}: SKIP (no zlib/Pillow available)")
                continue
    
    print(f"\nDone! {min(total_banks, (len(rom_data) - chr_start) // BANK_SIZE)} banks extracted to {output_dir}")


def main():
    parser = argparse.ArgumentParser(description='Extract CHR banks from NES ROM to PNG')
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    
    parser.add_argument(
        '--rom',
        default=str(project_dir / '_tmp_disasm_out' / 'Captain Tsubasa (Japan).nes'),
        help='Path to NES ROM file'
    )
    parser.add_argument(
        '--out',
        default=str(project_dir / 'public' / 'sprites'),
        help='Output directory for PNG files'
    )
    parser.add_argument(
        '--nes-colors',
        action='store_true',
        default=True,
        help='Use NES-style diagnostic colors (default: True)'
    )
    parser.add_argument(
        '--gray',
        action='store_true',
        help='Use grayscale colors instead'
    )
    
    args = parser.parse_args()
    
    use_nes = not args.gray
    
    if not os.path.exists(args.rom):
        # 尝试其他路径
        alt_paths = [
            str(project_dir.parent / 'rom.nes'),
            str(project_dir / '..' / 'src' / 'legacy' / 'romdata' / 'Captain Tsubasa (Japan).nes'),
        ]
        found = False
        for alt in alt_paths:
            if os.path.exists(alt):
                args.rom = alt
                found = True
                break
        if not found:
            print(f"ERROR: ROM not found at {args.rom}")
            print("Please specify --rom <path>")
            sys.exit(1)
    
    extract_all_chr_banks(args.rom, args.out, use_nes)


if __name__ == '__main__':
    main()
