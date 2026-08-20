#!/usr/bin/env python3
"""Verify bank00 bytes against original ROM by running the assembler
   and checking only bank 0's output."""
import sys
import os
import importlib.util

asm_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, asm_dir)

# Import build_nes.py as a module
spec = importlib.util.spec_from_file_location("build_nes", os.path.join(asm_dir, "build_nes.py"))
build_nes = importlib.util.module_from_spec(spec)

# We need to prevent build_nes from running main() on import
# It should have if __name__ == "__main__" guard
spec.loader.exec_module(build_nes)

# Create assembler instance
asm = build_nes.Assembler()

# Only assemble bank00
bank00_path = os.path.join(asm_dir, "bank00", "bank00.s")
ok = asm.assemble([bank00_path])

if ok:
    print("bank00 assembly: OK")
else:
    print("bank00 assembly: FAILED")
    sys.exit(1)

# Get bank 0 bytes
bank0_bytes = bytes(asm.banks[0])
print(f"bank00 size: {len(bank0_bytes)} bytes")

# Load original ROM
orig_path = r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\Captain Tsubasa II - Super Striker (Japan).nes'
with open(orig_path, 'rb') as f:
    rom = f.read()

# Bank 0 in ROM starts at offset 16 (after header)
orig_bank0 = rom[16:16+8192]

# Compare
diffs = []
for i in range(8192):
    if bank0_bytes[i] != orig_bank0[i]:
        diffs.append((i, orig_bank0[i], bank0_bytes[i]))

if not diffs:
    print("*** bank00: 100% byte-accurate! ***")
else:
    print(f"bank00 diffs: {len(diffs)}/8192")
    for off, ob, nb in diffs[:20]:
        cpu = 0x8000 + off
        print(f"  off=${off:04X} cpu=${cpu:04X}: orig=${ob:02X} built=${nb:02X}")
