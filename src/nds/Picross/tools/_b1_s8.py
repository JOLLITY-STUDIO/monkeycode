import struct, os

d = open("extracted/unnamed/file_94.bin", "rb").read()
N = len(d)

# 记录头模式：8字节零 + 03 00
pat = b"\x00" * 8 + b"\x03\x00"
print("=== 8zero+0300 模式扫描 ===")
offs = []
start = 0
while True:
    i = d.find(pat, start)
    if i < 0:
        break
    offs.append(i)
    start = i + 1
print("total:", len(offs))
# 分组显示（按间隔聚类）
prev = None
group = []
for i in offs:
    gap = 0 if prev is None else i - prev
    print(f"  {i:#08x}  gap={gap}")
    prev = i
    if len([x for x in offs if x <= i]) > 60:
        break

# 其他候选文件头部
print("=== 其他候选拼图文件头部 ===")
for fn in ["file_95.bin", "file_30.bin", "file_24.bin", "file_26.bin", "file_90.bin", "file_86.bin"]:
    p = os.path.join("extracted", "unnamed", fn)
    if os.path.exists(p):
        b = open(p, "rb").read()
        print(f"{fn} size={len(b)} head={b[:32].hex(' ')}")
