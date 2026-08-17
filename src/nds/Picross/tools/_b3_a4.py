#!/usr/bin/env python3
"""B3: file_86 解码全部 UTF-16LE 消息"""
import os, struct
BASE = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(BASE, "..", "extracted")
p86 = os.path.join(EX, "unnamed", "file_86.bin")
data = open(p86, "rb").read()
# 头 6B (ff fe 00 00 00 00) + u32 偏移表
offsets = []
i = 6
while i + 4 <= len(data):
    v = struct.unpack_from("<I", data, i)[0]
    if v == 0 or v >= len(data):
        break
    offsets.append(v)
    i += 4
print(f"offset entries: {len(offsets)}")
# 用偏移提取 UTF-16LE 字符串（到 0000 或文件尾）
out = []
for idx, off in enumerate(offsets):
    end = offsets[idx+1] if idx+1 < len(offsets) else len(data)
    blob = data[off:end]
    # 解码 UTF-16LE 直到 00 00
    s = []
    for j in range(0, len(blob)-1, 2):
        c = blob[j] | (blob[j+1] << 8)
        if c == 0:
            break
        s.append(chr(c))
    out.append("".join(s))
for idx, s in enumerate(out[:40]):
    print(f"[{idx:3d}] {s!r}")
