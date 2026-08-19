#!/usr/bin/env python3
"""dump boot 结构指针 + load-info 表指针，并检查描述符"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def u32(va):
    return int.from_bytes(CODE[va - VA0:va + 4 - VA0], "little")

def dump(va, n, label):
    b = CODE[va - VA0:va + n - VA0]
    words = " ".join(f"{b[i]:02x}" for i in range(len(b)))
    print(f"{label} @ {va:#010x} ({n}B): {words}")

print("=== PC 相对数据 ===")
# 0x2000890 ldr r1,[pc,#0x90] -> 0x2000928
# 0x20008a0 ldr r0,[pc,#0x80] -> 0x2000928
# 0x20009fc ldr r0,[pc,#0x6c] -> 0x2000a70
dump(0x2000928, 16, "boot_struct_ptr")
dump(0x2000a70, 4, "loadinfo_ptr")
print()

boot_ptr = u32(0x2000928)
print(f"=== boot 结构 @ {boot_ptr:#010x} ===")
for i in range(8):
    va = boot_ptr + i * 4
    print(f"  [{i}] {va:#010x} = {u32(va):#010x}")
print()

li = u32(0x2000a70)
print(f"=== load-info 表 @ {li:#010x} ===")
for i in range(8):
    va = li + i * 4
    print(f"  [{i}] {va:#010x} = {u32(va):#010x}")
