#!/usr/bin/env python3
import struct, sys
with open("_tmp_disasm_out/Captain Tsubasa (Japan).nes", "rb") as f:
    magic = f.read(4)
    prg = f.read(1)[0]
    chr_b = f.read(1)[0]
    flag6 = f.read(1)[0]
    flag7 = f.read(1)[0]
    
mapper = (flag7 & 0xF0) | (flag6 >> 4)
mapper_names = {0: "NROM", 1: "MMC1", 2: "UNROM", 3: "CNROM", 4: "MMC3", 5: "MMC5"}
print(f"PRG ROM: {prg} x 16KB = {prg*16}KB")
print(f"CHR ROM: {chr_b} x 8KB = {chr_b*8}KB")
print(f"Mapper: {mapper} ({mapper_names.get(mapper, 'Unknown')})")
print(f"Mirroring: {'Vertical' if flag6 & 1 else 'Horizontal'}")
print(f"Battery: {bool(flag6 & 2)}")
print(f"Trainer: {bool(flag6 & 4)}")
print(f"Four-screen: {bool(flag6 & 8)}")
print(f"NES 2.0: {(flag7 & 0x0C) == 8}")
