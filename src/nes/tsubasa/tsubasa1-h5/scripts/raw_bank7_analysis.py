#!/usr/bin/env python3
"""Extract and analyze Bank 7 data from ROM binary"""
import sys

ROM_PATH = "_tmp_disasm_out/Captain Tsubasa (Japan).nes"
BANK7_OFFSET = 0x1C010  # Bank 7 starts here (ROM offset)
BANK7_SIZE = 0x4000     # 16KB

with open(ROM_PATH, "rb") as f:
    f.seek(BANK7_OFFSET)
    bank7_data = f.read(BANK7_SIZE)

print("=" * 70)
print("BANK 7 RAW BINARY ANALYSIS (from NES ROM)")
print("=" * 70)

# 1. Dump as 16-bit LE pointers (first 256 bytes)
print("\n--- Region $C000-$C0FF: 16-bit LE pointers ---")
for i in range(0, 128, 2):
    lo = bank7_data[i]
    hi = bank7_data[i+1]
    ptr = lo | (hi << 8)
    in_range = ">" if 0xC000 <= ptr <= 0xFFFF else "?"
    sys.stdout.write(f" [{i:3d}] ${ptr:04X}{in_range}")
    if (i//2) % 4 == 3:
        sys.stdout.write("\n")
sys.stdout.write("\n")

# 2. Check for structured data - look for common patterns
print("\n--- Region $E306-$E400: Look for structure ---")
for i in range(0xE306 - 0xC000, 0xE400 - 0xC000, 16):
    offset = i
    hex_str = " ".join(f"{bank7_data[offset+j]:02X}" for j in range(16))
    print(f"  ${offset+0xC000:04X}: {hex_str}")

# 3. Check the $DB00 area referenced from Bank 0
print("\n--- Region $DB00-$DB20: Referenced by Bank 0 ---")
for i in range(0xDB00 - 0xC000, 0xDB20 - 0xC000, 16):
    offset = i
    hex_str = " ".join(f"{bank7_data[offset+j]:02X}" for j in range(16))
    ascii_str = "".join(chr(bank7_data[offset+j]) if 32 <= bank7_data[offset+j] < 127 else "." for j in range(16))
    print(f"  ${offset+0xC000:04X}: {hex_str} |{ascii_str}|")

# 4. Check what's near the end (NMI/IRQ handler area)
print("\n--- Region $FFC0-$FFFF: Reset handler + Vectors ---")
for i in range(0xFFC0 - 0xC000, 0x10000 - 0xC000, 16):
    offset = i
    hex_str = " ".join(f"{bank7_data[offset+j]:02X}" for j in range(min(16, BANK7_SIZE - offset)))
    print(f"  ${offset+0xC000:04X}: {hex_str}")
