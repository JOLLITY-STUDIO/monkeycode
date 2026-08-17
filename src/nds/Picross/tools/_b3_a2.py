#!/usr/bin/env python3
"""B3: dump messageList_ENG_JP_Normal.dat 头部 + 全文件字符串扫描"""
import os
BASE = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(BASE, "..", "extracted", "Msg")
p = os.path.join(EX, "PicrossDS_messageList_ENG_JP_Normal.dat")
data = open(p, "rb").read()
print(f"size: {len(data)}")
print("--- head 384B ---")
for off in range(0, 384, 16):
    row = data[off:off+16]
    asc = "".join(chr(b) if 0x20 <= b < 0x7F else "." for b in row)
    print(f"{off:04X}: {row.hex(' ')}  {asc}")
print("\n--- 可打印字符串(>=4) ---")
cur = []
for i, b in enumerate(data):
    if 0x20 <= b < 0x7F:
        cur.append((i, b))
    else:
        if len(cur) >= 4:
            s = "".join(chr(b) for _, b in cur)
            print(f"0x{cur[0][0]:06X}: {s!r}")
        cur = []
if len(cur) >= 4:
    print(f"0x{cur[0][0]:06X}: {''.join(chr(b) for _,b in cur)!r}")
