#!/usr/bin/env python3
"""Analyze file_86 offset table and file_94 puzzle data structure."""
import struct

BASE = "d:/studio/github/monkeycode/src/nds/Picross/extracted"

def main():
    # ---- file_86 ----
    d = open(f"{BASE}/unnamed/file_86.bin", "rb").read()
    print("file_86 size:", len(d), "head:", d[:16].hex())
    # header 6 bytes, then u32 offsets
    offs = []
    for i in range(0, 2000):
        v = struct.unpack_from("<I", d, 6 + i * 4)[0]
        if v == 0 or v > len(d):
            print("  offset table ends at idx", i, "val", hex(v))
            break
        offs.append(v)
    print("  entry count:", len(offs))
    print("  offsets:", [hex(v) for v in offs[:40]])
    # data segment starts at offs[0]?
    if offs:
        s = offs[0]
        seg = d[s:s + 48]
        print(f"  seg@0x{s:x}:", seg.hex())
        print("  seg ascii:", seg[:48].decode("ascii", "replace"))

    # ---- file_94 ----
    p = open(f"{BASE}/unnamed/file_94.bin", "rb").read()
    print()
    print("file_94 size:", len(p))
    for i in range(0, 0x200, 0x20):
        row = p[i:i + 0x20]
        print(f"  {i:04x}: {' '.join(f'{b:02x}' for b in row)}")

if __name__ == "__main__":
    main()
