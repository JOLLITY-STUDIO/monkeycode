#!/usr/bin/env python3
"""Quick analysis of Bank 1 sub-state handler and title data."""
import sys, os

rom_path = os.path.join(os.path.dirname(__file__), '..', '_tmp_disasm_out', 'Captain Tsubasa (Japan).nes')
with open(rom_path, 'rb') as f:
    rom = bytearray(f.read())

bank1_start = 16 + 0x8000  # Bank 1 in ROM
jt0_lo = rom[bank1_start + 0x4000]  # C000 low
jt0_hi = rom[bank1_start + 0x4001]  # C000 high
addr0 = (jt0_hi << 8) | jt0_lo
print(f'Jump table [0] = ${addr0:04X}')

handler_rom = bank1_start + (addr0 - 0x8000)
print(f'Handler at ROM offset 0x{handler_rom:06X}')
print('First 128 bytes:')
for i in range(0, 128, 16):
    hex_str = ' '.join(f'{b:02X}' for b in rom[handler_rom+i:handler_rom+i+16])
    ascii_str = ''.join(chr(b) if 32 <= b < 127 else '.' for b in rom[handler_rom+i:handler_rom+i+16])
    print(f'  +{i:04X}: {hex_str}  {ascii_str}')

# Print the jump table entries
print('\nJump table (first 32 entries):')
for i in range(32):
    lo = rom[bank1_start + 0x4000 + i*2]
    hi = rom[bank1_start + 0x4000 + i*2 + 1]
    addr = (hi << 8) | lo
    print(f'  [{i:2d}] ${i*2:04X}: ${addr:04X}', end='')
    if addr >= 0xC000 and addr <= 0xBFFF + 0x4000:
        print(f' (valid)')
    else:
        print(f' (INVALID)')
