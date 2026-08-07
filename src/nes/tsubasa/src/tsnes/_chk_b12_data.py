import os

rom_path = r"d:\studio\github\monkeycode\src\nes\tsubasa\src\tsnes\roms\Captain Tsubasa II - Super Striker (Japan).nes"

with open(rom_path, "rb") as f:
    f.seek(16 + 12 * 8192)
    bank12 = f.read(8192)

# dump $8B00-$8CFF
print("=== Bank12 $8B00-$8CFF hex dump ===")
for i in range(0x8B00, 0x8D00, 16):
    row = bank12[i : i + 16]
    hexs = " ".join(f"{b:02X}" for b in row)
    ascii = "".join(chr(b) if 32 <= b < 127 else "." for b in row)
    print(f"${i:04X}: {hexs}  {ascii}")

print()
print("=== $8BD0-$8C4F (6-byte record table) ===")
for i in range(0x8BD0, 0x8C50, 6):
    data = bank12[i : i + 6]
    ptr = data[1] << 8 | data[0]
    cpu_addr = 0x8000 + ptr
    print(f" ${i:04X}: {data.hex(' ').upper():<20} ptr=${ptr:04X} CPU~${cpu_addr:04X}")

# Also check surrounding code that references 0x8BD9
print()
print("=== $8349 area: sound init ===")
for i in range(0x8340, 0x83D0, 16):
    row = bank12[i : i + 16]
    hexs = " ".join(f"{b:02X}" for b in row)
    print(f"${i:04X}: {hexs}")

# Check raw bytes around $8BD9 specifically
print()
print("=== $8BD6-$8C00 (sound effect pointer table raw) ===")
print(bank12[0x8BD6:0x8C00].hex(" "))
