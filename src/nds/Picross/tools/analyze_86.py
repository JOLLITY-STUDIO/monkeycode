#!/usr/bin/env python3
"""Deep analysis of file_86: index tree + leaf data."""
import struct

d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_86.bin", "rb").read()
sz = len(d)
print("size:", sz)

# level-1 offsets (from header at 6)
l1 = []
for i in range(0, 2000):
    v = struct.unpack_from("<I", d, 6 + i * 4)[0]
    if v == 0 or v > sz:
        break
    l1.append(v)
print("level1 count:", len(l1), "first:", [hex(x) for x in l1[:10]], "last:", hex(l1[-1]))

# level-2: each l1 entry points to another offset table
def read_offsets(at):
    out = []
    for i in range(0, 4000):
        v = struct.unpack_from("<I", d, at + i * 4)[0]
        if v == 0 or v > sz:
            break
        out.append(v)
    return out

l2 = read_offsets(l1[0]) if l1 else []
print("level2[0] count:", len(l2), "first:", [hex(x) for x in l2[:8]])

# dump first leaf
if l2:
    leaf = l2[0]
    print(f"leaf[0] @ {leaf:#x}:")
    seg = d[leaf:leaf + 128]
    print("  hex:", seg.hex())
    print("  ascii:", seg[:64].decode("ascii", "replace"))
    # try u16/u32 interpretation
    print("  u16:", [hex(struct.unpack_from("<H", seg, i)[0]) for i in range(0, 32, 2)])
    print("  u32:", [hex(struct.unpack_from("<I", seg, i)[0]) for i in range(0, 32, 4)])

# check several leaves for common header
print()
for li in range(min(6, len(l2))):
    leaf = l2[li]
    seg = d[leaf:leaf + 32]
    print(f"leaf[{li}] @ {leaf:#x}: {seg.hex()} | {seg[:16].decode('ascii','replace')}")

# is l1[0] itself starting with an offset table? check leaf size pattern
if l1:
    print()
    print("l1 diffs:", [l1[i+1]-l1[i] for i in range(min(20, len(l1)-1))])
