#!/usr/bin/env python3
"""打印解压最后 N 个 token 的详细日志：控制字节、位、读写地址"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
CODE = open(os.path.join(BASE, "..", "extracted", "arm9.bin"), "rb").read()
VA0 = 0x2000000

def u32(va):
    return int.from_bytes(CODE[va - VA0:va + 4 - VA0], "little")

R0 = 0x02080da8
packed = u32(R0 - 8)
decomp_size = u32(R0 - 4)
dest_off = packed >> 24
comp_size = packed & 0xFFFFFF
SRC_LO = R0 - comp_size
DST_END = R0 + decomp_size
BUF_BASE = 0x02000000
OUT0 = DST_END - BUF_BASE
BUF = bytearray(DST_END - BUF_BASE + 0x8000)

LOG = []  # (typ, bit_no, src_va, dst_va, extra)

r3 = R0 - dest_off
r1 = SRC_LO
r2 = DST_END
n_ctl = 0
while r3 > r1:
    ctl_va = r3 - 1
    r5 = CODE[r3 - 1 - VA0]; r3 -= 1
    n_ctl += 1
    r6 = 8
    bit_no = 7
    while True:
        r6 -= 1
        if r6 < 0:
            break
        if r5 & 0x80:
            ip = CODE[r3 - 1 - VA0]; r3 -= 1
            r7b = CODE[r3 - 1 - VA0]; r3 -= 1
            off = ((ip << 8 | r7b) & 0xFFF) + 2
            ln = ip + 0x20
            first_dst = None
            while ln >= 0:
                val = BUF[(r2 + off) - BUF_BASE]  # 先读 r2+off（写指针递减前）
                r2 -= 1
                idx = r2 - BUF_BASE
                BUF[idx] = val
                if first_dst is None:
                    first_dst = r2
                ln -= 0x10
            LOG.append(("REF", bit_no, ctl_va, r5, ip, r7b, off, first_dst, r2 + 1))
        else:
            v = CODE[r3 - 1 - VA0]; r3 -= 1
            r2 -= 1
            BUF[r2 - BUF_BASE] = v
            LOG.append(("LIT", bit_no, ctl_va, r5, v, r2))
        r5 = (r5 << 1) & 0xFF
        bit_no -= 1
        if not (r3 > r1):
            break

print(f"输出=[{r2:#x},{DST_END:#x}) 控制字节数={n_ctl} tokens={len(LOG)}")
print()

# 打印前 40 个 token（表区 0x020db040-058 对应最早写入）
print("前 40 个 token (表区 0x020db040-058, 最早→最晚):")
for i, t in enumerate(LOG[:40]):
    if t[0] == "LIT":
        _, bit, ctl_va, ctl, v, dst = t
        print(f"{i:>4} LIT  bit{bit} ctl={ctl_va:#x} ctlbyte={ctl:02x} v={v:02x} dst={dst:#x}")
    else:
        _, bit, ctl_va, ctl, ip, r7b, off, fdst, ldst = t
        print(f"{i:>4} REF  bit{bit} ctl={ctl_va:#x} ctlbyte={ctl:02x} hi={ip:02x} lo={r7b:02x} off={off} dst={fdst:#x}-{ldst-1:#x}")

print()
print("最后 30 个 token (最早→最晚):")
print(f"{'#':>4} {'typ':<4} {'bit':<4} {'ctl_va':<10} {'ctl':<4} {'data':<8} {'dst_va':<10}")
for i, t in enumerate(LOG[-30:]):
    if t[0] == "LIT":
        _, bit, ctl_va, ctl, v, dst = t
        print(f"{len(LOG)-30+i:>4} LIT  bit{bit} ctl={ctl_va:#x} ctlbyte={ctl:02x} v={v:02x} dst={dst:#x}")
    else:
        _, bit, ctl_va, ctl, ip, r7b, off, fdst, ldst = t
        print(f"{len(LOG)-30+i:>4} REF  bit{bit} ctl={ctl_va:#x} ctlbyte={ctl:02x} hi={ip:02x} lo={r7b:02x} off={off} dst={fdst:#x}-{ldst-1:#x}")
