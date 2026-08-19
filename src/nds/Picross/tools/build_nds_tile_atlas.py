"""从 ROM file_94.bin + file_97.bin 提取 NDS 原始 UI 图块生成 atlas
产物：assets/nds_tiles.png（8x8 tile 横向排列，tile 0-31）
"""
from PIL import Image
import struct

DATA = open("extracted/unnamed/file_94.bin", "rb").read()
PAL = open("extracted/unnamed/file_97.bin", "rb").read()

def decode_color(v):
    r = (v & 0x1F) << 3
    g = ((v >> 5) & 0x1F) << 3
    b = ((v >> 10) & 0x1F) << 3
    return (r, g, b)

colors = [decode_color(struct.unpack_from("<H", PAL, i * 2)[0]) for i in range(16)]
# 索引 0 设为透明（UI 中常见透明色）
alpha = [(0, 0, 0, 0)] + [(r, g, b, 255) for (r, g, b) in colors[1:]]

T0, T1 = 0, 32
ntiles = T1 - T0
S = 8
img = Image.new("RGBA", (ntiles * S, S), (0, 0, 0, 0))

for i, tidx in enumerate(range(T0, T1)):
    to = 0x80 + tidx * 32
    ox = i * S
    for y in range(8):
        for x in range(8):
            b = DATA[to + y * 4 + x // 2]
            nib = b & 0xF if x % 2 == 0 else (b >> 4) & 0xF
            img.putpixel((ox + x, y), alpha[nib])

img.save("assets/nds_tiles.png")
print(f"saved assets/nds_tiles.png ({ntiles*S}x{S}) tiles {T0}-{T1-1}")
