import struct

d = open("extracted/unnamed/file_94.bin", "rb").read()
N = len(d)

# 1) 全文件扫描记录结尾标记 03 0c（紧随若干 04 00）
print("=== 03 0c markers 全文件分布 ===")
offs = []
start = 0
while True:
    i = d.find(b"\x03\x0c", start)
    if i < 0:
        break
    offs.append(i)
    start = i + 1
print("total:", len(offs))
# 显示前 30 个及间隔
prev = None
for i in offs[:40]:
    if prev is None:
        gap = "-"
    else:
        gap = i - prev
    print(f"  {i:#x} gap={gap}")
    prev = i

# 2) 分块统计小 u16 密集度（每 0x100000）
print("=== 区域小数字密度（u16<256 占比）===")
BLOCK = 0x100000
for base in range(0, N, BLOCK):
    chunk = d[base:base + BLOCK]
    total = len(chunk) // 2
    small = sum(1 for i in range(0, len(chunk) - 1, 2)
                if struct.unpack_from("<H", chunk, i)[0] < 256)
    if total:
        pct = small * 100.0 / total
        mark = " <--"
        if pct > 5:
            mark = " ***"
        print(f"  {base:#08x}..{base+BLOCK:#08x}: small%={pct:.1f}{mark}")
