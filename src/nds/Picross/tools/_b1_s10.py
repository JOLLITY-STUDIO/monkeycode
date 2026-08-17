import struct

d = open("extracted/unnamed/file_94.bin", "rb").read()

# 0x0a99ac 记录区
print("=== 0x0a9980..0x0a9b00 ===")
for off in range(0x0a9980, 0x0a9b00, 16):
    print(f"{off:08X} {d[off:off+16].hex(' ')}")
