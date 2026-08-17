# G1: 探测 PR.sdat 格式（非标准 SDAT 加密/压缩判断）
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/Sound/PR.sdat", "rb").read()
n = len(d)
print(f"size={n}")

def readable(b):
    if not b:
        return 0
    return sum(1 for x in b if 32 <= x < 127 or x in (9, 10, 13)) / len(b)

print(f"原始可读率 {readable(d):.3f}")
print(f"头 64B hex: {d[:64].hex(' ')}")

# 常见压缩头
for sig, name in ((b"SDAT", "SDAT"), (b"10", "LZ10"), (b"11", "LZ11"), (b"BLZ", "BLZ"), (b"Yaz", "YAZ0")):
    print(f"{name}: {d[:4].hex()} {'MATCH' if d.startswith(sig) else ''}")

# 全文件字节分布 top
from collections import Counter
c = Counter(d)
print(f"Top 字节: {[(f'{v:02x}', f'x{n}') for v, n in c.most_common(8)]}")

# XOR 测试
best = (0, 0)
for key in range(256):
    r = readable(bytes(x ^ key for x in d))
    if r > best[0]:
        best = (r, key)
print(f"最佳 XOR key=0x{best[1]:02x} 可读率={best[0]:.3f}")
