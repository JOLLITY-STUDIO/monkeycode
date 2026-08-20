#!/usr/bin/env python3
"""从原始 ROM 提取每个 bank 的 8KB 原始字节, 保存为 bankNN/rom_bytes.bin
供 convert_disasm.py 填充空隙时使用 (而不是 $FF)"""
import os

orig_rom = r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\Captain Tsubasa II - Super Striker (Japan).nes'
asm_root = r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm'

with open(orig_rom, 'rb') as f:
    data = f.read()

# PRG 从 offset 16 开始, 32 个 bank × 8KB
prg = data[16:16+256*1024]
assert len(prg) == 256*1024

for bank in range(32):
    bank_data = prg[bank*8192:(bank+1)*8192]
    out_dir = os.path.join(asm_root, f'bank{bank:02d}')
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, 'rom_bytes.bin')
    with open(out_path, 'wb') as f:
        f.write(bank_data)
    print(f'bank{bank:02d}: {len(bank_data)} bytes → {out_path}')

print('Done.')
