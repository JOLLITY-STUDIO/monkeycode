#!/usr/bin/env python3
"""Fast single-pass scan of file_94 for u16 dimension pairs (5/10/15)."""
import struct, re

p = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()
print("size:", len(p))

# single pass: iterate all aligned+unaligned u16 pairs, cheap check
pats = {
    (15, 15): struct.pack("<HH", 15, 15),
    (10, 10): struct.pack("<HH", 10, 10),
    (5, 5): struct.pack("<HH", 5, 5),
    (15, 10): struct.pack("<HH", 15, 10),
    (10, 15): struct.pack("<HH", 10, 15),
    (15, 5): struct.pack("<HH", 15, 5),
    (5, 15): struct.pack("<HH", 5, 15),
    (10, 5): struct.pack("<HH", 10, 5),
    (5, 10): struct.pack("<HH", 5, 10),
}
# use regex alternation
alt = b"|".join(re.escape(v) for v in pats.values())
rx = re.compile(alt)
res = {}
for m in rx.finditer(p):
    off = m.start()
    val = (struct.unpack_from("<H", p, off)[0], struct.unpack_from("<H", p, off + 2)[0])
    res.setdefault(val, []).append(off)

for k, v in sorted(res.items(), key=lambda kv: -len(kv[1])):
    print(k, "count:", len(v), "first 10:", [hex(o) for o in v[:10]])
