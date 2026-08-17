#!/usr/bin/env python3
"""B1: dump 0xada2c0-0xada600 区域"""
d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed/file_94.bin", "rb").read()
for off in range(0xada2c0, 0xada600, 16):
    print(f"{off:08X} " + d[off:off+16].hex(" "))
