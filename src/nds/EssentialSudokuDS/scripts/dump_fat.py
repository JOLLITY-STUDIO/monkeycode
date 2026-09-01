#!/usr/bin/env python3
"""Dump full FAT entries + FNT raw bytes.

Usage:
  python scripts/dump_fat.py            # txt summary
  python scripts/dump_fat.py --csv      # CSV (offset,size,id)
  python scripts/dump_fat.py --fnt_hex  # write FNT hex
"""
import struct
import os
import sys

ROM = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\work\Essential Sudoku DS (Europe).nds'
FAT_OFF = 0x00129200
FAT_SZ = 0x298
FNT_OFF = 0x00128c00
FNT_SZ = 0x530

OUT_DIR = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data'

def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else 'txt'
    if not os.path.exists(ROM):
        print('ROM missing:', ROM, file=sys.stderr)
        sys.exit(1)

    os.makedirs(OUT_DIR, exist_ok=True)
    with open(ROM, 'rb') as f:
        f.seek(FAT_OFF)
        fat_bytes = f.read(FAT_SZ)

    entries = []
    for i in range(FAT_SZ // 8):
        s, e = struct.unpack('<II', fat_bytes[i * 8:(i + 1) * 8])
        entries.append((i, s, e, e - s))

    if mode == '--csv':
        out = os.path.join(OUT_DIR, 'fat.csv')
        with open(out, 'w') as f:
            f.write('id,offset_hex,end_hex,size_bytes,size_kb\n')
            for i, s, e, sz in entries:
                f.write(f'{i},{s:#010x},{e:#010x},{sz},{sz / 1024:.2f}\n')
        print(f'Wrote {out} ({len(entries)} rows)')

    elif mode == '--fnt_hex':
        with open(ROM, 'rb') as f:
            f.seek(FNT_OFF)
            fnt_bytes = f.read(FNT_SZ)
        out = os.path.join(OUT_DIR, 'fnt.hex')
        with open(out, 'w') as f:
            f.write('; FNT @ 0x00128c00\n')
            for i in range(0, len(fnt_bytes), 16):
                line = fnt_bytes[i:i + 16]
                hexs = ' '.join(f'{b:02x}' for b in line)
                asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in line)
                f.write(f'{FNT_OFF + i:08x}  {hexs:<48}  {asc}\n')
        print(f'Wrote {out} ({FNT_SZ} bytes)')

    else:
        print(f'== FAT: {len(entries)} entries ==')
        for i, s, e, sz in entries:
            print(f'  [{i:3d}] start={s:#010x} end={e:#010x} size={sz:>8d} ({sz / 1024:.1f} KiB)')


if __name__ == '__main__':
    main()
