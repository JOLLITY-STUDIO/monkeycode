#!/usr/bin/env python3
"""B1: 渲染解法候选块为 PPM 图片，检查是否构成可识别图案"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
OUTD = os.path.join(BASE, "_b1_c14_out")
os.makedirs(OUTD, exist_ok=True)

data = open(P94, "rb").read()

# 候选块采样（不同组）
offsets = [
    0xbefd00, 0xc5bd00, 0xfac300, 0xfacb00, 0xfad300, 0xfadb00,
    0xfb8300, 0x13ab800, 0x13b3800, 0x146c000, 0x1474000,
    0x152c000, 0x1534000, 0x1521700, 0x15e1700, 0x232600,
]

# 调色板（NDS 15bpp 常见的近似）: 用值本身做灰度区分 + 少量颜色
def render_block(off, scale=16):
    blk = data[off:off+256]
    # 检查值范围
    vals = set(blk)
    W = 16
    with open(os.path.join(OUTD, f"{off:08x}_s{scale}.ppm"), "w") as f:
        f.write(f"P3\n{W} {W}\n255\n")
        for i, b in enumerate(blk):
            x = i % W
            y = i // W
            r = g = bl = 255
            if b == 0:
                r = g = bl = 235  # 空
            else:
                # 用伪彩色区分 2-9
                r = (b * 60) % 256
                g = (b * 90 + 40) % 256
                bl = (b * 40 + 100) % 256
            f.write(f"{r} {g} {bl}\n")
    # ASCII 预览
    print(f"--- {off:#x}  vals={sorted(vals)}")
    for y in range(16):
        row = ""
        for x in range(16):
            b = blk[y*16+x]
            row += " " if b == 0 else chr(0x30+b)
        print(f"    {row}")

for off in offsets:
    render_block(off)
print("OK")
