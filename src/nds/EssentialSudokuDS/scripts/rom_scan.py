"""Scan ROM at various offsets to find ARM9 code-like bytes."""
import os, struct

ROM = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\work\Essential Sudoku DS (Europe).nds'
OUT = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data\rom_scan.txt'

buf = open(OUT, 'w')
with open(ROM, 'rb') as f:
    sz = os.path.getsize(ROM)
    print(f'ROM size: {sz} bytes', file=buf)
    h = f.read(0x200)
    a9off = struct.unpack('<I', h[0x28:0x2C])[0]
    a9sz = struct.unpack('<I', h[0x2C:0x30])[0]
    a7off = struct.unpack('<I', h[0x38:0x3C])[0]
    a7sz = struct.unpack('<I', h[0x3C:0x40])[0]
    print(f'ARM9 off/sz: {a9off:#x} {a9sz:#x}', file=buf)
    print(f'ARM7 off/sz: {a7off:#x} {a7sz:#x}', file=buf)
    # offsets past ROM are not in file
    print('\nProbe first 16 bytes at various file offsets:', file=buf)
    for offset in [0x1000, 0x4000, 0x8000, 0x10000, 0x20000, 0x40000, 0x80000,
                   0xC0000, 0x100000, 0x140000, 0x180000, 0x200000,
                   0x300000, 0x400000, 0x500000, 0x600000, 0x700000]:
        if offset >= sz:
            continue
        f.seek(offset)
        h32 = f.read(16)
        b0 = h32[0]
        flag = ''
        if (b0 & 0x0F) in (0x0E, 0x0F):
            flag = '  [ARM-like]'
        if offset == a9off:
            flag += '  <== ARM9 off'
        if offset == a7off:
            flag += '  <== ARM7 off'
        hexs = ' '.join(f'{b:02x}' for b in h32)
        asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in h32)
        print(f'  off=0x{offset:06x}: {hexs} | {asc}{flag}', file=buf)
buf.close()
print('Wrote', OUT)
