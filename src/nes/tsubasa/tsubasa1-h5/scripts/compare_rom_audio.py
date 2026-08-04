"""对比不同ROM在音频数据区的差异"""
import os, sys

roms = [
    '_tmp_disasm_out/Captain Tsubasa (Japan).nes',
    '../tools/BZK-6502-Disassembler/input/tsubasa1.nes',
]

for rp in roms:
    if os.path.exists(rp):
        rom = open(rp, 'rb').read()
        offset = 0xA1B8  # $E1A8 in Bank 1
        data = rom[offset:offset+48]
        print(f'ROM: {rp}')
        print(f'  Size: {len(rom)}')
        print(f'  $E1A8 (ROM 0xA1B8):')
        for row in range(3):
            s = ' '.join(f'{b:02X}' for b in data[row*16:(row+1)*16])
            print(f'    {s}')
        
        # 音长表 $DFC8
        offset2 = 0x10 + 0x4000 + 0x5FC8  # $DFC8
        data2 = rom[offset2:offset2+64]
        print(f'  $DFC8:')
        for row in range(4):
            s = ' '.join(f'{b:02X}' for b in data2[row*16:(row+1)*16])
            print(f'    {s}')
        print()
