#!/usr/bin/env python3
"""Analyze file_94 composition: byte histogram + entropy by region."""
import struct
from collections import Counter

p = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()
sz = len(p)
print("size:", sz)

# byte histogram (sampled every 256 bytes)
c = Counter(p[::256])
print("histogram (sample):", dict(list(sorted(c.items()))[:20]))

# entropy per 64KB region, find interesting boundaries
import math

def entropy(block):
    if not block:
        return 0
    c = Counter(block)
    n = len(block)
    return -sum((k / n) * math.log2(k / n) for k in c.values())

runs = []
for off in range(0, sz, 0x10000):
    e = entropy(p[off:off + 0x10000])
    runs.append((off, e))
# report regions with significant entropy changes
print("region entropy (first 32 x 64KB):")
for off, e in runs[:32]:
    print(f"  {off:#08x}: {e:.2f}")

# find the largest zero / FF runs (boundaries of data blocks)
def runs_of(byte, minlen=0x4000):
    out = []
    start = None
    for i, b in enumerate(p):
        if b == byte:
            if start is None:
                start = i
        else:
            if start is not None and i - start >= minlen:
                out.append((start, i))
            start = None
    if start is not None and sz - start >= minlen:
        out.append((start, sz))
    return out

print("zero runs >=64KB:", [(hex(a), hex(b)) for a, b in runs_of(0)[:10]])
print("ff runs >=64KB:", [(hex(a), hex(b)) for a, b in runs_of(0xFF)[:10]])
