#!/usr/bin/env python3
"""
提取开场动画 RLE nametable 数据 (Phase B)

从 ROM Bank 2 的 $D05E 和 $D0F3 指针表提取开场动画数据。
解码 RLE 压缩的 nametable 数据并生成 TypeScript 文件。

关键发现:
  Bank 1 $83BA-$83C7: 从 $D0F3 表加载指针
  Bank 1 $83CE-$8453: RLE 解码 + PPU 传输

$D05E 表: 在 Bank 2, 被 $83D9-$83DE 使用
$D0F3 表: 在 Bank 2, 被 $83BD-$83C2 使用

用法:
  python scripts/extract_opening_rle.py
"""

import os
import sys
from pathlib import Path
from typing import List, Tuple, Optional
from datetime import datetime

# ================================================================
# ROM 工具
# ================================================================

def find_rom() -> str:
    """查找 ROM 文件"""
    candidates = [
        '_tmp_disasm_out/Captain Tsubasa (Japan).nes',
        '../Captain Tsubasa (Japan).nes',
    ]
    script_dir = Path(__file__).parent.parent
    for c in candidates:
        p = script_dir / c
        if p.exists():
            return str(p)
    raise FileNotFoundError("ROM not found")


def read_rom(path: str) -> bytes:
    with open(path, 'rb') as f:
        return f.read()


def read_word(data: bytes, offset: int) -> int:
    return data[offset] | (data[offset + 1] << 8)


# ================================================================
# Bank 地址映射
# ================================================================

# ROM 布局: 16B header + 8*16KB PRG + 32*4KB CHR
PRG_BASE = 0x10
BANK_SIZE = 0x4000  # 16KB

# Bank 2: ROM $8010-$C00F, CPU $8000-$BFFF (in fixed mapping)
# 但 $D0F3 和 $D05E 在 switchable $C000-$DFFF 区域
# 当 Bank 2 被映射到 $C000 时, CPU $D0F3 → Bank 2 内部偏移 $10F3
def bankN_to_rom(cpu_addr: int, bank_idx: int, assume_switchable: bool = True) -> int:
    """Convert CPU address in bank N to ROM offset.
    If assume_switchable=True, bank is at $C000-$DFFF (MMC1 PRG Mode 2 switchable area).
    Otherwise, bank is at $8000-$BFFF (fixed area).
    """
    if assume_switchable and cpu_addr >= 0xC000:
        offset = cpu_addr - 0xC000
    elif not assume_switchable and cpu_addr >= 0x8000:
        offset = cpu_addr - 0x8000
    else:
        raise ValueError(f"Address ${cpu_addr:04X} out of expected range")
    return PRG_BASE + bank_idx * BANK_SIZE + offset


def bank7_cpu_to_rom(cpu_addr: int) -> int:
    """Bank 7: CPU ($C000-$FFFF) → ROM offset (fixed last bank)"""
    return cpu_addr - 0xC000 + 0x1C010


# ================================================================
# RLE 解码器 ($C2C2 风格)
# ================================================================

def rle_decode_nametable(data: bytes, max_tiles: int = 960) -> List[int]:
    """
    RLE 解码名称表数据
    
    ROM $C2C2 解码器格式:
      byte < $80 或 == $FF: 直接 tile 值
      byte >= $80 且 != $FF:
        bit0-4 = count (1-31), 下一 byte = tile (重复 count 次)
        count == 0 → 跳过 ($80/$A0/$C0/$E0 为分隔符)
    
    每 16 字节一批写入 VRAM, 起始地址 $2000
    """
    result = []
    i = 0
    while i < len(data) and len(result) < max_tiles:
        b = data[i]
        i += 1
        if b < 0x80 or b == 0xFF:
            result.append(b)
        else:
            count = b & 0x1F
            if count == 0:
                continue  # 分隔符
            if i >= len(data):
                break
            tile = data[i]
            i += 1
            for _ in range(count):
                if len(result) < max_tiles:
                    result.append(tile)
    return result


# ================================================================
# 主提取逻辑
# ================================================================

def extract_opening_data(rom: bytes):
    """提取开场动画 RLE 数据"""
    
    print("=" * 60)
    print("  开场动画 RLE 数据提取 (Phase B)")
    print("=" * 60)
    
    # === Step 1: 读取 $D0F3 指针表 (在 Bank 7) ===
    # BUG-029 FIX: Opening animation code runs in Bank 1 ($C000-$DFFF switchable).
    # But $D0F3 pointer table is in Bank 7 (fixed $E000-$FFFF). 
    # The D05E table (page pointers) is in Bank 1's switchable area.
    
    d0f3_cpu = 0xD0F3
    d0f3_rom = bank7_cpu_to_rom(d0f3_cpu)
    
    print(f"\n[$D0F3 指针表 (Bank 7)]")
    print(f"  CPU: ${d0f3_cpu:04X}")
    print(f"  ROM: ${d0f3_rom:05X}")
    
    # 读取指针表 (最多 32 条目 × 2 字节)
    pointers_7 = []  # 指向 Bank 7 的指针
    pointers_2 = []  # 指向 Bank 2/Bank 1 的指针
    
    for i in range(32):
        ptr = read_word(rom, d0f3_rom + i * 2)
        if ptr == 0:
            continue
        if 0xC000 <= ptr <= 0xFFFF:
            pointers_7.append((i, ptr))
            print(f"  [{i:2d}] → ${ptr:04X} (Bank 7, offset ${ptr-0xC000:04X})")
        elif 0x8000 <= ptr <= 0xBFFF:
            pointers_2.append((i, ptr))
            print(f"  [{i:2d}] → ${ptr:04X} (Bank 1/2?)")
        else:
            print(f"  [{i:2d}] → ${ptr:04X} (unknown)")
    
    # === Step 2: 读取 $D05E 指针表 ===
    # BUG-029 FIX: D05E is in Bank 1's switchable area ($C000-$DFFF).
    # Bank 1 at $C000: ROM offset = PRG_BASE + 1*BANK_SIZE + ($D05E - $C000)
    d05e_cpu = 0xD05E
    d05e_rom = bankN_to_rom(d05e_cpu, 1, assume_switchable=True)
    
    print(f"\n[$D05E 指针表 (Bank 1 @ $C000)]")
    print(f"  CPU: ${d05e_cpu:04X}")
    print(f"  ROM: ${d05e_rom:05X}")
    
    for i in range(8):
        ptr = read_word(rom, d05e_rom + i * 2)
        if ptr == 0:
            continue
        print(f"  [{i:2d}] → ${ptr:04X}")
    
    # === Step 3: 解码 RLE 数据 ===
    # BUG-029 FIX: Page data pointers ($D068, $D07F, etc.) are in Bank 1 at $C000.
    # These are in the SAME bank as the code (Bank 1 switchable at $C000-$DFFF).
    
    pages = []
    for page_idx in range(4):
        ptr = read_word(rom, d05e_rom + page_idx * 2)
        if ptr == 0:
            print(f"\n[Page {page_idx}] 无数据 (ptr=0)")
            continue
        
        # FIX: All page pointers are in $C000-$DFFF range → Bank 1 switchable area
        if 0xC000 <= ptr <= 0xDFFF:
            rom_offset = bankN_to_rom(ptr, 1, assume_switchable=True)
        elif 0xE000 <= ptr <= 0xFFFF:
            rom_offset = bank7_cpu_to_rom(ptr)  # Fixed Bank 7
        else:
            print(f"\n[Page {page_idx}] 无法定位: ${ptr:04X}")
            continue
        
        print(f"\n[Page {page_idx}]")
        print(f"  指针: ${ptr:04X} → ROM ${rom_offset:05X}")
        
        # 读取 RLE 数据 (每个页面数据块约 256-512 字节)
        rle_data = rom[rom_offset:rom_offset + 512]
        
        # 解码
        nt_tiles = rle_decode_nametable(rle_data, 960)
        
        if len(nt_tiles) > 0:
            # 统计非零 tile
            non_zero = sum(1 for t in nt_tiles if t != 0)
            print(f"  解码: {len(nt_tiles)} tiles ({non_zero} 非零)")
            
            # 检查 tile 值分布
            tile_set = sorted(set(nt_tiles))
            print(f"  Tile 范围: {tile_set[:20]}")
            
            pages.append({
                'page': page_idx,
                'ptr': ptr,
                'tiles': nt_tiles,
                'nonZero': non_zero,
            })
    
    return pages


def generate_ts(pages: List[dict], output_path: str):
    """生成 TypeScript 数据文件"""
    
    lines = [
        "/**",
        f" * 开场动画 RLE 数据 — 从 ROM Bank 2 ($D05E) 提取",
        f" * 使用 $C2C2 RLE 解码器算法解析",
        f" * 4 页开场动画 nametable 数据",
        f" * 自动生成 @ {datetime.now().isoformat()}",
        " */",
        "",
        "export interface OpeningPageData {",
        "  /** 页面索引 (0-3) */",
        "  page: number;",
        "  /** ROM 指针 */",
        "  ptr: number;",
        "  /** 名称表 tile 数据 (960 字节, 32×30) */",
        "  tiles: number[];",
        "}",
        "",
        "export const OPENING_PAGES: OpeningPageData[] = [",
    ]
    
    for page in pages:
        lines.append("  {")
        lines.append(f"    page: {page['page']},")
        lines.append(f"    ptr: 0x{page['ptr']:04X},")
        
        # 将 tile 数据格式化为 TS 数组 (每行 16 个)
        tiles = page['tiles']
        tile_lines = []
        for i in range(0, len(tiles), 16):
            line_tiles = tiles[i:i+16]
            hex_str = ', '.join(f'0x{t:02X}' for t in line_tiles)
            if i + 16 < len(tiles):
                tile_lines.append(f"      {hex_str},")
            else:
                tile_lines.append(f"      {hex_str}")
        
        lines.append("    tiles: [")
        lines.extend(tile_lines)
        lines.append("    ],")
        lines.append("  },")
    
    lines.append("];")
    lines.append("")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f"\n✅ 生成: {output_path}")


# ================================================================
# Main
# ================================================================

def main():
    script_dir = Path(__file__).parent.parent
    
    # 查找 ROM
    rom_path = find_rom()
    print(f"ROM: {rom_path}")
    
    rom = read_rom(rom_path)
    print(f"ROM size: {len(rom)} bytes")
    
    # 提取数据
    pages = extract_opening_data(rom)
    
    if pages:
        # 生成 TS 文件
        output = script_dir / 'src' / 'data' / 'OpeningRleData.ts'
        generate_ts(pages, str(output))
        
        print(f"\n✅ 成功提取 {len(pages)} 页开场动画数据")
    else:
        print("\n⚠️ 未提取到有效数据")


if __name__ == '__main__':
    main()
