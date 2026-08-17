import struct

d = open("extracted/unnamed/file_94.bin", "rb").read()

# 0x136d40f 区域（gap=2048 大量出现）—— 检查记录头
print("=== 0x136d400..0x136d500 ===")
for off in range(0x136d400, 0x136d500, 16):
    print(f"{off:08X} {d[off:off+16].hex(' ')}")

# 检查 03 0c 前后文
print("=== 0x136d3ff 上下文 ===")
off = 0x136d40f
for o in range(off - 0x30, off + 0x20, 16):
    print(f"{o:08X} {d[o:o+16].hex(' ')}")
