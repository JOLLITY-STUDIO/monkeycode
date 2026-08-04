"""读取NES ROM Header的详细信息"""
import struct
import sys

rom_path = sys.argv[1] if len(sys.argv) > 1 else "_tmp_disasm_out/Captain Tsubasa (Japan).nes"

with open(rom_path, "rb") as f:
    data = f.read(16)
    
print("=== NES ROM Header (16 bytes) ===")
print(f"Magic: {data[0]:02X} {data[1]:02X} {data[2]:02X} {data[3]:02X}")
print(f"  应为 N E S \\x1A => 4E 45 53 1A")

prg_count = data[4]
chr_count = data[5]
print(f"\nPRG-ROM pages: {prg_count} x 16KB = {prg_count * 16}KB")
print(f"CHR-ROM pages: {chr_count} x 8KB  = {chr_count * 8}KB")

flags6 = data[6]
flags7 = data[7]

print(f"\nFlags 6: 0x{flags6:02X} ({flags6:08b})")
print(f"  bit0 Mirroring: {'Vertical' if (flags6 & 0x01) else 'Horizontal'}")
print(f"  bit1 Battery RAM: {'Yes' if (flags6 & 0x02) else 'No'}")
print(f"  bit2 Trainer: {'Yes' if (flags6 & 0x04) else 'No'}")
print(f"  bit3 4-Screen: {'Yes' if (flags6 & 0x08) else 'No'}")

mapper_low = (flags6 >> 4) & 0x0F

print(f"\nFlags 7: 0x{flags7:02X} ({flags7:08b})")
print(f"  bit0 VS Unisystem: {'Yes' if (flags7 & 0x01) else 'No'}")
print(f"  bit1 PlayChoice-10: {'Yes' if (flags7 & 0x02) else 'No'}")
nes20 = (flags7 >> 2) & 0x03
print(f"  bit2-3 NES 2.0 id: {nes20}" + (" (NES 2.0)" if nes20 == 2 else ""))

mapper_high = (flags7 >> 4) & 0x0F
mapper = mapper_low | (mapper_high << 4)
print(f"  Mapper#: {mapper} ({'MMC1' if mapper == 1 else 'Unknown'})")

print(f"\nPRG-RAM pages: {data[8]} x 8KB = {data[8] * 8}KB")
print(f"Flags 9: 0x{data[9]:02X}  TV: {'PAL' if (data[9] & 0x01) else 'NTSC'}")
print(f"Flags 10: 0x{data[10]:02X}")

print(f"\nReserved (11-15): {[hex(b) for b in data[11:16]]}")

# ROM 布局
header_size = 16
if flags6 & 0x04:
    header_size += 512
    print("(Trainer present, header +512 bytes)")

prg_size = prg_count * 16384
chr_size = chr_count * 8192

print(f"\n=== ROM 布局 ===")
print(f"Header:  0x00000 - 0x{header_size - 1:05X}  ({header_size} bytes)")
print(f"PRG-ROM: 0x{header_size:05X} - 0x{header_size + prg_size - 1:05X}  ({prg_size} bytes)")
print(f"CHR-ROM: 0x{header_size + prg_size:05X} - 0x{header_size + prg_size + chr_size - 1:05X}  ({chr_size} bytes)")

actual = len(open(rom_path, "rb").read())
expected = header_size + prg_size + chr_size
print(f"\nExpected: {expected}, Actual: {actual} -> {'OK' if actual == expected else 'MISMATCH!'}")

# PRG Bank 详情
print(f"\n=== PRG Bank 详情 ===")
for i in range(prg_count):
    offset = header_size + i * 0x4000
    cpu_addr = 0x8000 if i < prg_count - 1 else 0xC000
    end = cpu_addr + 0x3FFF
    print(f"  Bank {i}: ROM 0x{offset:05X}-0x{offset + 0x3FFF:05X}, "
          f"CPU ${cpu_addr:04X}-${end:04X}"
          + (" (Fixed $C000-$FFFF)" if i == prg_count - 1 else " (Switchable $8000-$BFFF)"))

# CHR Bank 详情
print(f"\n=== CHR Bank 详情 ===")
chr_base = header_size + prg_size
for i in range(chr_count):
    offset = chr_base + i * 0x2000
    print(f"  CHR Bank {i:02d}: ROM 0x{offset:05X}-0x{offset + 0x1FFF:05X}  (PPU $0000-$1FFF)")
