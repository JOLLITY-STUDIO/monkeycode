#!/usr/bin/env python3
"""
分析 CHR Bank 09 (字体) 和 Bank 7 文本编码
"""

import os
import glob

# Find ROM
rom_candidates = glob.glob('../Captain Tsubasa (Japan).nes') + \
                glob.glob('_tmp_disasm_out/**/*.nes', recursive=True) + \
                glob.glob('../*.nes')

rom_path = None
for c in rom_candidates:
    if os.path.exists(c):
        rom_path = os.path.abspath(c)
        break

if not rom_path:
    print("ERROR: ROM not found")
    exit(1)

print(f"ROM: {rom_path}")
with open(rom_path, 'rb') as f:
    data = f.read()

# ROM header = 16 bytes, PRG ROM start = 16
# Bank 7: ROM $1C010-$2000F (CPU $C000-$FFFF)
def cpu_to_rom(cpu_addr):
    return cpu_addr - 0xC000 + 0x1C010

# --- Part 1: CHR Bank 09 ---
# CHR ROM is at the end after PRG ROM
# PRG ROM size: 128KB (8 banks * 16KB)
# CHR ROM size: 128KB (128 * 1KB or 32 banks * 4KB)
prg_size = 8 * 16384  # 128KB
chr_offset = 16 + prg_size
chr_bank09_offset = chr_offset + 9 * 4096  # Bank 09
print(f"\n=== CHR Bank 09 (Font) ===")
print(f"CHR offset: {chr_offset} (0x{chr_offset:X})")
print(f"Bank 09 offset: {chr_bank09_offset} (0x{chr_bank09_offset:X})")

# CHR tile = 16 bytes (8 bytes plane 0 + 8 bytes plane 1)
# Print first 32 tiles as pattern grid (8x8)
for tile_idx in range(16):
    tile_offset = chr_bank09_offset + tile_idx * 16
    tile = data[tile_offset:tile_offset + 16]
    print(f"\nTile {tile_idx:3d} (0x{tile_idx:02X}):")
    rows = []
    for row in range(8):
        p0 = tile[row]
        p1 = tile[row + 8]
        line = ''
        for col in range(8):
            bit = 7 - col
            val = ((p1 >> bit) & 1) << 1 | ((p0 >> bit) & 1)
            chars = [' ', '.', ':', '#']
            line += chars[val]
        rows.append(line)
        print(f"  {line}")
    
# --- Part 2: Bank 7 text sample ---
print(f"\n=== Bank 7 Text Data Sample ===")
text_start = cpu_to_rom(0xE306)
text_end = cpu_to_rom(0xF968)
print(f"Text data: ROM ${text_start:05X}-${text_end:05X} ({text_end - text_start} bytes)")

# Sample first 256 bytes
sample = data[text_start:text_start + 256]
for i in range(0, 256, 16):
    hex_str = ' '.join(f'{b:02X}' for b in sample[i:i+16])
    print(f'  ${text_start+i:05X}: {hex_str}')

# --- Part 3: Check Bank 7 pointer table at $C000 ---
print(f"\n=== Bank 7 Pointer Table ($C000) ===")
ptr_start = cpu_to_rom(0xC000)
for i in range(22):
    lo = data[ptr_start + i*2]
    hi = data[ptr_start + i*2 + 1]
    ptr = lo | (hi << 8)
    print(f"  [{i:2d}] ${ptr:04X}")
