import struct

# 1) _out.pck 内容
d = open("extracted/PackData/_out.pck", "rb").read()
print("_out.pck size:", len(d))
print("_out.pck hex:", d.hex(" "))

# 2) file_94 中是否包含已知头部标记：检查开头的 60 字节零后是什么
d94 = open("extracted/unnamed/file_94.bin", "rb").read()
print("file_94[0x30:0x80]:", d94[0x30:0x80].hex(" "))

# 3) 在 file_94 中找 "_out.pck" 引用或包名
for s in [b"_out", b"out.pck", b"pck"]:
    i = d94.find(s)
    print(f"find {s}: {i:#x}" if i >= 0 else f"find {s}: None")

# 4) 查看 file_94 中 0x232A00 之前的大段结构：找记录边界
#    0x232A00 前是 15 个 0x0004 + 0x0C03，看更早
for off in range(0x232980, 0x232A20, 16):
    print(f"{off:08X} {d94[off:off+16].hex(' ')}")
