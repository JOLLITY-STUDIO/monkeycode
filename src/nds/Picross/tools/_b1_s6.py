import struct

d = open("extracted/unnamed/file_94.bin", "rb").read()

# 1) 0x2acbeb 区域：记录头结构
print("=== 0x2acbc0..0x2acc40 ===")
for off in range(0x2acbc0, 0x2acc40, 16):
    print(f"{off:08X} {d[off:off+16].hex(' ')}")

# 2) 看 03 0c 前的 32 字节（记录内容末尾）
print("=== 0x2acbdb 前 48 字节 ===")
off = 0x2acbeb
for o in range(off - 48, off + 16, 16):
    print(f"{o:08X} {d[o:o+16].hex(' ')}")

# 3) 检查 0x2acbeb 与 0x2ad3eb（gap=2048）之间 2048 字节的结构
print("=== 0x2acbeb..0x2ad3eb 偏移 u16 概览（每 128 字节）===")
for o in range(0x2acbeb, 0x2ad3eb, 128):
    u16s = struct.unpack_from("<8H", d, o)
    print(f"{o:08X}: " + " ".join(f"{v:04X}" for v in u16s))
