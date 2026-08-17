# G2: 探测 default_data_00.pmd 加密方式（XOR/明文测试）
import sys

d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/backup/default_data_00.pmd", "rb").read()
print(f"size={len(d)}")

def readable(b):
    if not b:
        return 0
    return sum(1 for x in b if 32 <= x < 127 or x in (9, 10, 13)) / len(b)

# 1) 原始可读率
print(f"原始可读率 {readable(d[:4096]):.3f}")

# 2) 常见 XOR key 测试（对前 4096 字节）
for key in range(256):
    r = readable(bytes(x ^ key for x in d[:4096]))
    if r > 0.5:
        print(f"XOR 0x{key:02x}: 可读率 {r:.3f}  sample: {bytes(x ^ key for x in d[:64])!r}")

# 3) 常见 XOR key 也可能是 u32/u16 循环
for key32 in (0xFFFFFFFF, 0xA5A5A5A5, 0x5A5A5A5A, 0x52504943):
    b = bytearray(d[:4096])
    kb = key32.to_bytes(4, "little")
    for i in range(0, len(b), 4):
        for j in range(4):
            if i + j < len(b):
                b[i + j] ^= kb[j]
    print(f"XOR32 0x{key32:08x}: 可读率 {readable(bytes(b)):.3f}")

# 4) 字节值统计（前 4096）—— 高/低值分布
from collections import Counter
c = Counter(d[:4096])
top = c.most_common(12)
print(f"Top 字节值: {[f'{v:02x}x{n}' for v, n in top]}")
