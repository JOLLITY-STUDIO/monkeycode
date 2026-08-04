#!/usr/bin/env python3
"""M5: Check Bank 7 CDL markers and disassemble $C000-$C010 area"""
import re
import os

bank_file = os.path.join(os.path.dirname(__file__), '..', '_tmp_disasm_out', 'banks', 'bank_07_fixed.asm')
with open(bank_file, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# Show first 50 lines with CDL markers
print("=== First 50 lines of Bank 7 ===")
for i, line in enumerate(lines[:50]):
    print(f"{i:4d}: {line.rstrip()}")

# Find lines with 'C' in CDL
print("\n=== Lines with 'C' CDL marker ===")
for i, line in enumerate(lines):
    # Check if line starts with CDL marker that has C
    if re.match(r'^- C ', line):
        print(f"{i:4d}: {line.rstrip()}")

# Parse all bytes and check CDL
print("\n=== Byte + CDL summary (first 100) ===")
count = 0
for line in lines:
    m = re.match(r'^([- CDI0-9 ]+)\s+0x01C[0-9A-F]{3}\s+07:([0-9A-F]{4}):\s+([0-9A-F]{2})', line)
    if m:
        cdl_raw = m.group(1)
        addr = int(m.group(2), 16)
        val = int(m.group(3), 16)
        if count < 100:
            # Parse CDL: e.g., "- D 2 - - -"
            has_c = 'C' in cdl_raw
            has_d = 'D' in cdl_raw
            print(f"  ${addr:04X}: ${val:02X}  CDL='{cdl_raw.strip()}' C={has_c} D={has_d}")
        count += 1

print(f"\nTotal bytes parsed: {count}")
