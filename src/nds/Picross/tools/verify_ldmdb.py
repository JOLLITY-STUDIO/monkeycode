#!/usr/bin/env python3
"""ldmdb 写回几何验证 + 正确解压 + 描述符表检查"""
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

print("=== LZ header ===")
dump(0x02080da0, 8, "header")
packed = u32(0x02080da0)
decomp_size = u32(0x02080da4)
print(f"  packed={packed:#010x} dest_off={packed>>24:#x} comp_size={packed&0xffffff:#x} decomp_size={decomp_size:#x}")
print()

print("=== load-info 表 @ 0x0200b68 ===")
for i in range(8):
    va = 0x0200b68 + i * 4
    print(f"  [{i}] {va:#010x} = {u32(va):#010x}")
print()

# ---- 正确几何（ldmdb 回写 r0 = 0x02080da0）----
R0 = 0x02080da0
dest_off = packed >> 24
comp_size = packed & 0xFFFFFF
SRC_LO = R0 - comp_size
SRC_HI = R0
DST_END = R0 + decomp_size
print(f"=== 几何: 输入=[{SRC_LO:#010x},{SRC_HI:#010x}) 输出终点={DST_END:#010x} ===")

BUF_BASE = 0x02000000
OUT0 = DST_END - BUF_BASE
BUF = bytearray(DST_END - BUF_BASE + 0x8000)

r3 = SRC_HI - dest_off   # 读指针
r1 = SRC_LO              # 读下限
r2 = DST_END             # 写指针（递减）
n_lit = n_ref = n_cpy = 0

def do_ref(ip, r7b):
    global r2, n_ref, n_cpy
    ref = (ip << 8) | r7b
    off = (ref & 0xFFF) + 2
    ln = ip + 0x20
    while ln >= 0:
        r2 -= 1
        BUF[r2 - BUF_BASE] = BUF[r2 + off - BUF_BASE]
        ln -= 0x10
        n_cpy += 1
    n_ref += 1
while r3 > r1:
    r5 = CODE[r3 - 1 - VA0]; r3 -= 1
    r6 = 8
    while True:
        r6 -= 1
        if r6 < 0:
            break
        if r5 & 0x80:
            ip = CODE[r3 - 1 - VA0]; r3 -= 1
            r7b = CODE[r3 - 1 - VA0]; r3 -= 1
            do_ref(ip, r7b)
        else:
            v = CODE[r3 - 1 - VA0]; r3 -= 1
            r2 -= 1
            BUF[r2 - BUF_BASE] = v
            n_lit += 1
        r5 = (r5 << 1) & 0xFF
        if not (r3 > r1):
            break

out_start = r2
out_size = DST_END - out_start
print(f"  输出=[{out_start:#010x},{DST_END:#010x}) size={out_size:#x} (decomp_size={decomp_size:#x})")
print(f"  字面={n_lit} 引用={n_ref} 拷贝={n_cpy}")

print()
print("=== 输出尾部 (0x20db020-0x20db050) ===")
for base in range(0x020db020, DST_END, 16):
    b = bytes(BUF[base - BUF_BASE:base + 16 - BUF_BASE])
    print(f"  {base:#010x}: " + " ".join(f"{x:02x}" for x in b))

print()
print("=== 描述符检查 (load-info 表) ===")
t_start = u32(0x0200b68)
t_end = u32(0x0200b68 + 4)
t_pool = u32(0x0200b68 + 8)
print(f"  table=[{t_start:#010x},{t_end:#010x}) pool={t_pool:#010x}")
# 用输出缓冲区读描述符（输出终点 0x020db050 在缓冲区内）
def bu32(va):
    return int.from_bytes(bytes(BUF[va - BUF_BASE:va + 4 - BUF_BASE]), "little")
if 0x02000000 <= t_start < 0x02400000 and 0x02000000 <= t_end <= 0x020db050:
    va = t_start
    i = 0
    while va + 12 <= t_end:
        d = bu32(va); c = bu32(va + 4); z = bu32(va + 8)
        print(f"  desc[{i}] @ {va:#010x}: dst={d:#010x} copy={c:#010x} zero={z:#010x} "
              f"ok={0x02000000<=d<0x02400000 and 0<c<0x100000 and z<0x100000}")
        va += 12
        i += 1
