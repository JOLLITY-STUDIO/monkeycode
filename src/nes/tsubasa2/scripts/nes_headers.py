import os, sys

roms = [
    r'd:\studio\github\monkeycode\src\nes\tsubasa2\src\asm\dist\tsubasa2.nes',
    r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\Captain Tsubasa II - Super Striker (Japan).nes',
]

for f in roms:
    if not os.path.exists(f):
        print(f, 'MISSING')
        continue
    d = open(f, 'rb').read(16)
    size = os.path.getsize(f)
    flags6, flags7, flags8, flags9 = d[6], d[7], d[8], d[9]
    prg_banks = d[4]
    chr_banks = d[5]
    mapper = (flags6 >> 4) | (flags7 & 0xF0)
    nes2 = (flags7 & 0x0C) == 0x08
    print('FILE :', os.path.basename(f))
    print('  size       =', size, '(', hex(size), ')')
    print('  header hex =', d.hex(' '))
    print('  prg16kb    =', prg_banks, ' chr8kb =', chr_banks)
    print('  flags6     =', hex(flags6), ' flags7 =', hex(flags7), ' flags8 =', hex(flags8), ' flags9 =', hex(flags9))
    print('  mapper     =', mapper, ' NES2.0 =', nes2)
    print()
