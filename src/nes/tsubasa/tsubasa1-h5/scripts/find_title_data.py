"""Find title screen PPU data in Bank 1"""
import struct

with open('_tmp_disasm_out/Captain Tsubasa (Japan).nes', 'rb') as f:
    f.seek(16)
    prg = f.read(8 * 16384)

bank1 = prg[0x4000:0x8000]

print('=== Searching for PPU data blocks in Bank 1 ===')
for addr in range(0, 0x3FF0, 4):
    b0 = bank1[addr]
    b1 = bank1[addr+1]
    b2 = bank1[addr+2]
    b3 = bank1[addr+3]
    if (b0 in [0x20, 0x21, 0x22, 0x23]) and (b1 & 0xC0) == 0 and b2 < 0xC0 and b2 > 0:
        print(f'  +{addr:04X} (${addr+0x8000:04X}): PPU ${b0:02X}{b1:02X}, len={b2}, next={b3:02X}')
        ctx = bank1[addr:addr+min(b2+4, 32)]
        print(f'    Data: {" ".join(f"{b:02X}" for b in ctx)}')
