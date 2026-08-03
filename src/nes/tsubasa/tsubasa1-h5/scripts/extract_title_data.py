#!/usr/bin/env python3
"""
Extract title screen nametable data from Captain Tsubasa NES ROM.

The title screen data is stored in Bank 1 as part of the state initialization
routine. We need to locate the nametable data that gets copied to PPU during
the title screen setup.

Strategy:
1. Find the PPU write commands in Bank 1's title init code
2. Extract the raw tile and attribute data
3. Output as TypeScript arrays

Bank 1 ($C000-$FFFF) contains the title screen initialization logic.
The sub-state dispatcher at $C000 uses a jump table.

State 0 → Bank 1 sub-state 0 → init title screen
This routine writes:
- Palette data to $3F00
- Nametable data to $2000
- Attribute data to $23C0
- Sprite data to OAM

The title data is likely at $C05B (sub-state 0 handler).
"""

import sys
import os

def read_rom(path):
    with open(path, 'rb') as f:
        return bytearray(f.read())

def main():
    rom_path = os.path.join(os.path.dirname(__file__), '..', '_tmp_disasm_out', 'Captain Tsubasa (Japan).nes')
    rom = read_rom(rom_path)
    
    # NES header is 16 bytes
    header_size = 16
    prg_offset = header_size
    
    # Bank 1 = PRG ROM offset 0x4000 (bank 1 starts at 0x4000 in PRG ROM)
    # Actually: Bank 0 = offset 0x0000, Bank 1 = offset 0x4000
    bank1_offset = prg_offset + 0x4000
    
    print(f"ROM size: {len(rom)} bytes")
    print(f"Bank 1 starts at ROM offset: 0x{bank1_offset:06X}")
    
    # Bank 1 at $8000 in CPU space = ROM offset 0x4000 in PRG
    # $C000 in CPU = $C000-$8000 = $4000 offset within bank = ROM offset bank1_offset + $4000
    bank1_cpu_base = 0x8000  # Bank 1 starts at CPU $8000
    bank1_data_start = bank1_offset + (0xC000 - bank1_cpu_base)  # ROM offset of $C000 in Bank 1
    
    print(f"Bank 1 $C000 starts at ROM offset: 0x{bank1_data_start:06X}")
    
    # Read the jump table at $C000 (Bank 1)
    # The jump table is at the beginning of the data section
    # Each entry is a 2-byte pointer (little-endian)
    jt_data = rom[bank1_data_start:bank1_data_start + 256]
    
    print("\n=== Bank 1 Jump Table at $C000 ===")
    for i in range(0, 64, 2):
        lo = jt_data[i]
        hi = jt_data[i+1]
        addr = (hi << 8) | lo
        if addr >= 0xC000 and addr <= 0xFFFF:
            # Valid-looking pointer within Bank 1
            offset = addr - 0xC000
            print(f"  [{i//2:2d}] ${i//2:02X}: ${addr:04X} (offset +{offset:04X})")
    
    # Now find title screen nametable data
    # Title screen typically has specific tile patterns
    # Let's look at what sub-state 0 points to
    lo0 = jt_data[0]
    hi0 = jt_data[1]
    addr0 = (hi0 << 8) | lo0
    print(f"\n=== Sub-state 0 handler at ${addr0:04X} ===")
    
    # Read the handler code
    handler_offset = bank1_data_start + (addr0 - 0xC000)
    handler_data = rom[handler_offset:handler_offset + 128]
    print("First 128 bytes of handler:")
    for i in range(0, 128, 16):
        hex_str = ' '.join(f'{b:02X}' for b in handler_data[i:i+16])
        print(f"  +{i:04X}: {hex_str}")
    
    # The title screen data format in this game likely uses a custom encoding
    # Let's look for PPU address writes ($20xx for nametable, $23Cx for attributes)
    # In Bank 1's code, PPU data is written via the queue at $033A
    
    # Let's also look at the actual nametable data
    # Common patterns: LDA #$20 / STA $2006 for setting PPU address to nametable
    
    print("\n=== Looking for nametable data patterns in Bank 1 ===")
    # Search for $20 $00 patterns (nametable base address)
    for offset in range(0, 0x4000):
        if rom[bank1_offset + offset] == 0x20 and rom[bank1_offset + offset + 1] == 0x00:
            if offset < 0x4000 - 3:
                next_byte = rom[bank1_offset + offset + 2]
                # Likely PPU address setup: 20 00 → nametable 0
                print(f"  ROM +{offset:04X}: 20 00 {next_byte:02X} ...")
    
    # Try to find the actual tile map data for the title screen
    # Title screen typically has text like "CAPTAIN TSUBASA" or Japanese text
    # In the ROM, this might be encoded as tile indices
    
    print("\n=== Looking for tile map sequences ===")
    # Search for sequences of bytes that look like tile indices (not all 00 or FF)
    # Title screen nametable is 32x30 = 960 bytes
    # Look for areas with mostly non-zero bytes in patterns
    
    # Check areas near the sub-state 0 handler for data tables
    # Common NES pattern: code followed by data tables
    data_search_start = handler_offset
    for scan_off in range(0, min(0x1000, 0x10000 - bank1_data_start - addr0 + 0xC000)):
        seg = rom[data_search_start + scan_off:data_search_start + scan_off + 32]
        non_zero = sum(1 for b in seg if b != 0 and b != 0xFF)
        unique = len(set(b for b in seg if b != 0 and b != 0xFF))
        if non_zero >= 24 and unique >= 10:
            print(f"  +{scan_off:04X}: {non_zero}/32 non-zero, {unique} unique: {' '.join(f'{b:02X}' for b in seg[:16])}")

if __name__ == '__main__':
    main()
