#!/usr/bin/env python3
"""B3: 打印 file_88/90 长文本判断语言"""
import os, struct
BASE = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(BASE, "..", "extracted", "unnamed")

def decode(path):
    data = open(path, "rb").read()
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
    return offsets, out

for n in ["file_88.bin", "file_90.bin"]:
    offsets, msgs = decode(os.path.join(EX, n))
    print(f"=== {n} ===")
    for idx, m in enumerate(msgs):
        if len(m) > 20:
            print(f"  [{idx}] {m[:120]!r}")
    print()
