#!/usr/bin/env python3
"""B3: 解码 file_86/88/90/92 UTF-16LE 消息表"""
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

for n in ["file_86.bin", "file_88.bin", "file_90.bin", "file_92.bin"]:
    p = os.path.join(EX, n)
    offsets, msgs = decode(p)
    print(f"=== {n}: {len(offsets)} entries ===")
    # 打印前 6 条和包含关键字的条目
    for idx in range(min(6, len(msgs))):
        print(f"  [{idx}] {msgs[idx][:60]!r}")
    # 找包含 "Congratulations" / "tutorial" / 常见词的
    for idx, m in enumerate(msgs):
        low = m.lower()
        if "congrat" in low or "tuto" in low or "welcome" in low:
            print(f"  [{idx}] {m[:80]!r}")
            break
    print()
