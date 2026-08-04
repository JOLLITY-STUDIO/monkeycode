#!/usr/bin/env python3
"""
CHR 二进制提取脚本 - 从 NES ROM 提取所有 CHR Bank → TypeScript base64 数据模块

用法:
    python scripts/extract_chr_bin.py [--rom <path>] [--out <path>]

默认:
    --rom  _tmp_disasm_out/Captain Tsubasa (Japan).nes
    --out  src/data/ChrData.ts

原理:
    NES CHR ROM 直接存储 2BPP tile 数据，每个 tile 16 字节(plane0 8字节 + plane1 8字节)。
    每个 bank 256 个 tile × 16 字节 = 4096 字节。
    这些原始数据可以直接解码为每个像素的 2-bit 索引(0/1/2/3)，无需经过 PNG 转换。
"""

import os
import sys
import base64
import argparse
from pathlib import Path

HEADER_SIZE = 16
TILE_SIZE = 16      # 每tile 16字节
TILES_PER_BANK = 256
BANK_SIZE = TILES_PER_BANK * TILE_SIZE  # 4096


def read_nes_header(data: bytes) -> dict:
    """读取 iNES 头部信息"""
    if data[0:4] != b'NES\x1a':
        raise ValueError("Not a valid iNES ROM file")

    return {
        'prg_count': data[4],
        'chr_count': data[5],
        'mapper': (data[7] & 0xF0) | ((data[6] >> 4) & 0x0F),
        'has_trainer': bool(data[6] & 0x04),
        'prg_size': data[4] * 16384,
        'chr_size': data[5] * 8192,
    }


def extract_all_chr_banks(rom_path: str, output_path: str):
    """提取所有 CHR bank 为 TypeScript base64 数据模块"""

    with open(rom_path, 'rb') as f:
        rom_data = f.read()

    header = read_nes_header(rom_data)
    print(f"ROM: {rom_path}")
    print(f"  PRG: {header['prg_count']} × 16KB")
    print(f"  CHR: {header['chr_count']} × 8KB = {header['chr_count'] * 2} banks")
    print(f"  Mapper: {header['mapper']}")

    if header['chr_count'] == 0:
        print("No CHR-ROM (uses CHR-RAM). Nothing to extract.")
        return

    chr_start = HEADER_SIZE + header['prg_size']
    if header['has_trainer']:
        chr_start += 512

    total_banks = header['chr_count'] * 2  # 每个8KB CHR-ROM = 2个4KB bank

    base64_lines = []
    for bank_idx in range(total_banks):
        bank_offset = chr_start + bank_idx * BANK_SIZE
        if bank_offset + BANK_SIZE > len(rom_data):
            print(f"  Bank {bank_idx:02d}: SKIP (超出ROM范围)")
            break

        bank_data = rom_data[bank_offset:bank_offset + BANK_SIZE]
        b64 = base64.b64encode(bank_data).decode('ascii')
        base64_lines.append(f'  "{b64}",')
        print(f"  Bank {bank_idx:02d}: 4096 bytes → {len(b64)} base64 chars ✓")

    # 生成 TypeScript 文件
    joined_lines = '\n'.join(base64_lines)

    ts_content = f"""/**
 * CHR Tile 数据 - 从 ROM 自动生成
 *
 * 每个 bank = 256 tiles × 16 字节 2BPP 原始数据 = 4096 字节
 * base64 编码存储，运行时解码为 Uint8Array
 *
 * 用法: TileStore 负责解码和像素查询
 * 不要直接修改此文件，运行 scripts/extract_chr_bin.py 重新生成
 *
 * 总大小: {total_banks} banks × {BANK_SIZE} bytes = {total_banks * BANK_SIZE} bytes
 */

/** base64 编码的 CHR bank 数据 (bank 索引 0~{total_banks - 1}) */
export const CHR_BANK_BASE64: string[] = [
{joined_lines}
];

/** 每个 bank 的字节数 */
export const CHR_BANK_SIZE = {BANK_SIZE};

/** bank 数量 */
export const CHR_BANK_COUNT = CHR_BANK_BASE64.length;
"""

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print(f"\n✓ 写入 {output_path} ({len(ts_content)} 字符)")
    print(f"  {total_banks} banks × {BANK_SIZE} bytes = {total_banks * BANK_SIZE} bytes raw CHR data")


def main():
    parser = argparse.ArgumentParser(description='Extract CHR banks from NES ROM to TypeScript base64')
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent

    parser.add_argument(
        '--rom',
        default=str(project_dir / '_tmp_disasm_out' / 'Captain Tsubasa (Japan).nes'),
        help='Path to NES ROM file'
    )
    parser.add_argument(
        '--out',
        default=str(project_dir / 'src' / 'data' / 'ChrData.ts'),
        help='Output TypeScript file path'
    )

    args = parser.parse_args()

    if not os.path.exists(args.rom):
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
            sys.exit(1)

    extract_all_chr_banks(args.rom, args.out)


if __name__ == '__main__':
    main()
