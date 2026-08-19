#!/usr/bin/env python3
"""解析解压镜像内的重定位拷贝表（[0x20db040, 0x20db058)），并验证 copy 例程语义。"""
import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = open(os.path.join(BASE, "..", "extracted", "arm9_decompressed.bin"), "rb").read()
IMG_BASE = 0x2011B27

def img_bytes(va, n):
    off = va - IMG_BASE
    return IMG[off:off+n]

def u32(va):
    return int.from_bytes(img_bytes(va, 4), "little")

if __name__ == "__main__":
    print("== 重定位表 [0x20db040, 0x20db058) ==")
    for va in range(0x20db040, 0x20db058, 4):
        print(f"  [{va:#x}] = {u32(va):#010x}")
    print("\n== 表内容 ==")
    # 逐项 (dest, copy_size, bss_size)
    p = 0x20db040
    end = 0x20db058
    while p < end:
        d = u32(p); s = u32(p+4); b = u32(p+8)
        print(f"  dest={d:#010x} copy={s:#x} bss={b:#x}  (段 [{d:#x},{d+s:#x}) bss->[{d+s:#x},{d+s+b:#x}))")
        p += 12
    print("\n== 源数据区 [0x20da9c0, 0x20db040) 大小 ==", hex(0x20db040 - 0x20da9c0))
    # 源数据前 32 字节
    print("源数据头 32 字节:", img_bytes(0x20da9c0, 32).hex())
