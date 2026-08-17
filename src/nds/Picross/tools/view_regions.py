#!/usr/bin/env python3
"""Examine candidate puzzle regions found by scan_dims."""
import struct

p = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()

for off in [0x232a00, 0x11d1f00, 0x1f28800, 0xada500]:
    print(f"==== region @ {off:#x} ====")
    for i in range(off, off + 0x100, 16):
        row = p[i:i + 16]
        hx = " ".join(f"{b:02x}" for b in row)
        print(f"  {i:#08x}: {hx}")
    print()
