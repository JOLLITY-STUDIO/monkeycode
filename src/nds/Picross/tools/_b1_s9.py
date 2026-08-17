import struct

d = open("extracted/unnamed/file_94.bin", "rb").read()

# 0x136d40f 起 gap=2048：dump 一个完整 2048 槽位
base = 0x136d40f - 0x20  # 槽位起点推测
print("=== 0x136d3f0..0x136dc0f (2048+字节) 关键区 ===")
for off in range(base, base + 0x100, 16):
    print(f"{off:08X} {d[off:off+16].hex(' ')}")

# 统计 03 0c 之后的间隔分布（按数值排序看聚类）
print("=== 03 0c 间隔聚类 ===")
offs = []
start = 0
while True:
    i = d.find(b"\x03\x0c", start)
    if i < 0:
        break
    offs.append(i)
    start = i + 1
gaps = [offs[i+1] - offs[i] for i in range(len(offs)-1)]
import collections
c = collections.Counter(gaps)
print("top gaps:", c.most_common(10))
