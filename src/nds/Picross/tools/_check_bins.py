import os
d = r'd:\studio\github\monkeycode\src\nds\Picross\extracted'
def dump(f, off):
    p = os.path.join(d, f)
    if not os.path.exists(p):
        print(f, 'MISSING')
        return
    b = open(p, 'rb').read()
    print(f'{f} size={len(b):#x}')
    for o in off:
        if o + 24 <= len(b):
            print(f'  +{o:#06x}:', b[o:o + 24].hex())
dump('arm9.bin', [0x800, 0x4000])
dump('arm9_decomp.bin', [0x800, 0x4000])
dump('arm9_decompressed.bin', [0x800, 0x4000])
dump('arm9_decompressed_correct.bin', [0x800, 0x4000])
