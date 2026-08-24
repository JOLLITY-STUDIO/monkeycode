import sys, os

roms = [
    r"d:\studio\github\monkeycode\src\nes\tsubasa2\src\asm\dist\tsubasa2.nes",
    r"d:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\Captain Tsubasa II - Super Striker (Japan).nes",
]
for p in roms:
    if not os.path.exists(p):
        print(f"NOT FOUND: {p}")
        continue
    with open(p, "rb") as f:
        h = f.read(16)
    prg = h[4]
    chr = h[5]
    mapper_low = h[6] >> 4
    mapper_high = h[7] & 0xF0
    mapper = mapper_high | mapper_low
    mirror = h[6] & 1
    four_screen = h[6] & 8
    nes2 = (h[7] & 0x0F) == 0x0F
    print(f"=== {os.path.basename(p)} ===")
    print(f"  file size: {os.path.getsize(p)}")
    print(f"  header: {h.hex(' ')}")
    print(f"  PRG banks: {prg} (x16KB={prg*16}KB), CHR banks: {chr}")
    print(f"  mapper: {mapper}, mirror: {'V' if mirror else 'H'}, 4screen: {bool(four_screen)}")
    print(f"  NES2.0: {nes2}")
    print(f"  mapper_high_nibble: {h[7]>>4:#x}, submapper_low: {h[7]&0x0F:#x}")
