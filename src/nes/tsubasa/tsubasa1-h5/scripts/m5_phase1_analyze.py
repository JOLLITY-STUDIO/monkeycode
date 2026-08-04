#!/usr/bin/env python3
"""
M5 Phase 1: Bank 7 Complete Data Structure Analysis
- Map all data segments
- Classify data types
- Extract pointer tables
- Identify script bytecode patterns
"""
import re
import os
import struct

ROM_PATH = os.path.join(os.path.dirname(__file__), '..', '_tmp_disasm_out', 'Captain Tsubasa (Japan).nes')

def read_bank7():
    """Read Bank 7 (fixed PRG bank) from ROM"""
    with open(ROM_PATH, 'rb') as f:
        rom = f.read()
    # PRG ROM starts at offset 0x10 (16-byte NES header)
    # Bank 7 is the 8th PRG bank (index 7), 16KB each
    prg_start = 0x0010 + 0x4000 * 7
    return rom[prg_start:prg_start + 0x4000]

def main():
    bank7 = read_bank7()
    print(f"Bank 7 Size: {len(bank7)} bytes (0x{len(bank7):04X})")
    print(f"CPU Address: $C000-$FFFF")

    # =====================================================
    # Part 1: Pointer Table at $C000
    # =====================================================
    print("\n" + "="*70)
    print("PART 1: POINTER TABLE at $C000-$C02B (22 entries)")
    print("="*70)

    ptr_table = []
    for i in range(0, 44, 2):
        lo = bank7[i]
        hi = bank7[i+1]
        addr = lo | (hi << 8)
        if 0xC000 <= addr <= 0xFFBF:
            ptr_table.append((i//2, addr))
        else:
            break

    print(f"Valid entries: {len(ptr_table)}")
    for idx, ptr in ptr_table:
        offset = ptr - 0xC000
        print(f"  [{idx:2d}] ${ptr:04X} (offset {offset:04X})")

    # =====================================================
    # Part 2: Second Table at $C02C - Character Portrait Entry Points
    # =====================================================
    print("\n" + "="*70)
    print("PART 2: SECONDARY TABLE at $C02C+")
    print("="*70)

    # After pointer table (44 bytes = 0x2C), we have more data
    # $C02C-$C08D area has a different structure
    offset_2nd = 0x2C
    print(f"\n  $C02C-$C08D ({0x8E-0x2C} bytes):")
    for i in range(0x2C, min(0x8E, len(bank7)), 8):
        chunk = bank7[i:i+8]
        hex_str = ' '.join(f'{b:02X}' for b in chunk)
        addr = 0xC000 + i
        print(f"  ${addr:04X}: {hex_str}")

    # =====================================================
    # Part 3: Main Data Region $C08A-$DF01
    # =====================================================
    print("\n" + "="*70)
    print("PART 3: MAIN DATA REGION $C08A-$DF01")
    print("="*70)

    # $C08A-$C15D: Another pointer/index table?
    print("\n  --- $C08A-$C15D (212 bytes) ---")
    data_c08a = bank7[0x8A:0x15E]
    # Look for patterns
    for i in range(0, min(64, len(data_c08a)), 16):
        chunk = data_c08a[i:i+16]
        hex_str = ' '.join(f'{b:02X}' for b in chunk)
        addr = 0xC000 + 0x8A + i
        print(f"  ${addr:04X}: {hex_str}")

    # $C15E-$C289: More structured data
    print("\n  --- $C15E-$C289 (300 bytes) ---")
    data_c15e = bank7[0x15E:0x28A]
    for i in range(0, min(80, len(data_c15e)), 16):
        chunk = data_c15e[i:i+16]
        hex_str = ' '.join(f'{b:02X}' for b in chunk)
        addr = 0xC000 + 0x15E + i
        # Check for text
        ascii_str = ''.join(chr(b) if 0x20 <= b < 0x7f else '.' for b in chunk)
        print(f"  ${addr:04X}: {hex_str}  {ascii_str}")

    # =====================================================
    # Part 4: Large Data Segment $E306-$F968
    # =====================================================
    print("\n" + "="*70)
    print("PART 4: LARGE DATA SEGMENT $E306-$F968 (5731 bytes)")
    print("="*70)

    data_main = bank7[0xE306-0xC000:0xF969-0xC000]
    print(f"Size: {len(data_main)} bytes")

    # Show first 256 bytes
    print("\n  First 256 bytes:")
    for i in range(0, 256, 16):
        chunk = data_main[i:i+16]
        hex_str = ' '.join(f'{b:02X}' for b in chunk)
        addr = 0xE306 + i
        print(f"  ${addr:04X}: {hex_str}")

    # Try to understand the record structure
    # Based on earlier analysis, record sizes of 6, 8, 12 seem common
    print("\n  --- Structure Analysis ---")

    # The first few bytes might be a header
    print(f"  First bytes: {[f'{b:02X}' for b in data_main[:20]]}")

    # Look for text strings (consecutive bytes in 0x20-0x7F range)
    print("\n  --- Text String Search ---")
    i = 0
    while i < len(data_main):
        if 0x20 <= data_main[i] < 0x80:
            start = i
            while i < len(data_main) and 0x20 <= data_main[i] < 0x80:
                i += 1
            length = i - start
            if length >= 3:
                text = ''.join(chr(b) for b in data_main[start:i])
                addr = 0xE306 + start
                print(f"  ${addr:04X}: \"{text}\" ({length} chars)")
            continue
        i += 1

    # =====================================================
    # Part 5: Script Bytecode Area $C500-$C900 range
    # =====================================================
    print("\n" + "="*70)
    print("PART 5: SCRIPT BYTECODE ANALYSIS")
    print("="*70)

    # Look at bytes around $C500 where FF appears frequently (possible terminator)
    bytecode_start_offset = 0x500
    bytecode_end_offset = 0x900

    print(f"\n  Bytes $C500-$C900 ({bytecode_end_offset-bytecode_start_offset} bytes):")
    data_bc = bank7[bytecode_start_offset:bytecode_end_offset]

    # Find common opcode patterns
    opcode_freq = {}
    for b in data_bc:
        if b < 0x20 or b >= 0x80:
            opcode_freq[b] = opcode_freq.get(b, 0) + 1

    print(f"\n  Potential control codes (non-printable):")
    for op, freq in sorted(opcode_freq.items(), key=lambda x: -x[1])[:20]:
        print(f"    ${op:02X}: {freq} occurrences")

    # Show first portion as potential script
    print(f"\n  First 256 bytes of script area:")
    for i in range(0, 256, 16):
        chunk = data_bc[i:i+16]
        hex_str = ' '.join(f'{b:02X}' for b in chunk)
        ascii_str = ''.join(chr(b) if 0x20 <= b < 0x7f else '.' for b in chunk)
        addr = 0xC500 + i
        print(f"  ${addr:04X}: {hex_str}  {ascii_str}")

    # =====================================================
    # Part 6: Near-end area (MMC1 vectors excluded)
    # =====================================================
    print("\n" + "="*70)
    print("PART 6: AREA NEAR VECTORS $FA33-$FFBF")
    print("="*70)

    data_end = bank7[0xFA33-0xC000:0xFFC0-0xC000]
    # Show non-zero sections
    non_zero_ranges = []
    start = None
    for i, b in enumerate(data_end):
        if b != 0:
            if start is None:
                start = i
        else:
            if start is not None:
                if i - start > 3:
                    non_zero_ranges.append((start + 0xFA33, i + 0xFA33 - 1))
                start = None
    if start is not None:
        non_zero_ranges.append((start + 0xFA33, len(data_end) + 0xFA33 - 1))

    for s, e in non_zero_ranges:
        size = e - s + 1
        print(f"  ${s:04X}-${e:04X}: {size} bytes")
        # Show content
        chunk = bank7[s-0xC000:e-0xC000+1]
        if len(chunk) > 64:
            chunk = chunk[:64]
        hex_str = ' '.join(f'{b:02X}' for b in chunk)
        if len(chunk) < len(bank7[s-0xC000:e-0xC000+1]):
            hex_str += ' ...'
        print(f"    {hex_str}")

if __name__ == '__main__':
    main()
