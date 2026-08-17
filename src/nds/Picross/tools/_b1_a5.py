import struct
d = open("extracted/unnamed/file_94.bin", "rb").read()
print("size", len(d))
for off in range(0x232A00, 0x232B00, 32):
    u16s = struct.unpack_from("<16H", d, off)
    print("%08X" % off, " ".join("%02X" % v for v in u16s))
