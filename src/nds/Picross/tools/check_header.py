#!/usr/bin/env python3
"""核对 LZ 头部字段：ldmdb r0,{r1,r2} → r1=[r0-4], r2=[r0-8]"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000
R0 = 0x02080da8
off = R0 - VA0

print(f"== 头部 16 字节 @ [0x{R0-0x10:#x}..0x{R0:#x}) ==")
for i in range(0x10, 0, -4):
    w = int.from_bytes(CODE[off-i:off-i+4], "little")
    print(f"  [0x{R0-i:#x}] = {w:#010x}")

# 按汇编解读: r1 = [r0-4], r2 = [r0-8]
r1 = int.from_bytes(CODE[off-4:off], "little")     # [r0-4]
r2 = int.from_bytes(CODE[off-8:off-4], "little")   # [r0-8]
print(f"\n汇编语义: r1=[r0-4]={r1:#010x}  r2=[r0-8]={r2:#010x}")
print(f"  dest_off = r1>>24     = {(r1>>24):#x}")
print(f"  comp_size = r1&0xFFFFFF = {r1&0xFFFFFF:#x}")
print(f"  decomp_size = r2      = {r2:#x}")
print(f"  dst_end = r0+r2       = {R0+r2:#x}")
print(f"  input_low = r0-comp_size = {R0-(r1&0xFFFFFF):#x}")
