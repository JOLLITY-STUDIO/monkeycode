#!/usr/bin/env python3
"""B3: dump file_86 全部 372 条到文本，检查后续条目"""
import os, struct
BASE = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(BASE, "..", "extracted", "unnamed")
data = open(os.path.join(EX, "file_86.bin"), "rb").read()
offsets = []
i = 6
while i + 4 <= len(data):
    v = struct.unpack_from("<I", data, i)[0]
    if v == 0 or v >= len(data):
        break
    offsets.append(v)
    i += 4
out = []
for idx, off in enumerate(offsets):
    end = offsets[idx+1] if idx+1 < len(offsets) else len(data)
    blob = data[off:end]
    s = []
    for j in range(0, len(blob)-1, 2):
        c = blob[j] | (blob[j+1] << 8)
        if c == 0:
            break
        s.append(chr(c))
    out.append("".join(s))
with open(os.path.join(BASE, "_b3_msgs_dump.txt"), "w", encoding="utf-8") as f:
    for idx, s in enumerate(out):
        f.write(f"[{idx:3d}] {s!r}\n")
nz = sum(1 for s in out if s.strip())
print(f"total={len(out)} nonempty={nz}")
for idx in range(40, 80):
    s = out[idx]
    if s.strip():
        print(f"[{idx}] {s[:80]!r}")
