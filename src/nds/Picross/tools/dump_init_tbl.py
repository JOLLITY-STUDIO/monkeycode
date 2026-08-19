#!/usr/bin/env python3
"""读取 0x2011800 初始化表指针处的数据并 dump 表内容。"""
import struct

BIN = open(r"extracted/arm9_decomp.bin", "rb").read()
VA0 = 0x2000000

def u32(va):
    return struct.unpack_from("<I", BIN, va - VA0)[0]

# 0x2011804: ldr r4, [pc, #0x20]  -> 0x201182c 处的值 = 表指针
ptr_slot = 0x2011804 + 8 + 0x20
tbl = u32(ptr_slot)
print(f"init table @ {tbl:#x}")

for i in range(0, 64):
    v = u32(tbl + i * 4)
    if v == 0:
        print(f"  [{i}] 0x00000000 (END)")
        break
    print(f"  [{i}] {v:#x}")
