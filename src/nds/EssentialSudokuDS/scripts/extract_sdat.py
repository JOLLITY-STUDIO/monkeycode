#!/usr/bin/env python3
"""Extract all files from sound_data.sdat (MaxMod container, Essential Sudoku DS).

SDAT layout (verified by magic-scan + FAT analysis):
  Header @ 0x00 (non-standard, 0x2C bytes):
    0x10 symbol_tbl_offset  = 0x40   (SYMB block)
    0x14 string_tbl_offset  = 0x274  (directory names: _BGM, BANK_SE, ...)
    0x18 info_block_offset  = 0x2B4  (INFO)
    0x1C info_block_size    = 0x158
    0x20 fat_block_offset   = 0x40C  (FAT )
    0x24 fat_block_size     = 0xEC
    0x28 file_block_offset  = 0x4F8  (FILE)
    0x2C file_block_size    = 0x21208
  FAT @ 0x40C: magic "FAT " + size + file_count(14) + N x 16 bytes (offset u32, size u32, 0, 0)
  File offsets are absolute within the sdat file.

Files: 9 x SSEQ (sequences) + 2 x SBNK (banks) + 2 x SWAR (wave archives)
"""
import os
import struct
import json

SDAT_PATH = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'sound_data.sdat')
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'rom-data', 'extracted', 'sdat', 'files')

FAT_OFF = 0x40C
FAT_ENTRY = 16  # offset(4) size(4) zero(4) zero(4)


def read_fat(data):
    assert data[FAT_OFF:FAT_OFF + 4] == b'FAT '
    fat_size = struct.unpack_from('<I', data, FAT_OFF + 4)[0]
    file_count = struct.unpack_from('<I', data, FAT_OFF + 8)[0]
    entries = []
    for i in range(file_count):
        base = FAT_OFF + 12 + i * FAT_ENTRY
        off = struct.unpack_from('<I', data, base)[0]
        size = struct.unpack_from('<I', data, base + 4)[0]
        if size == 0:
            continue
        entries.append({'index': i, 'offset': off, 'size': size})
    return entries


def identify(data):
    magic = data[:4]
    magic_str = magic.decode('ascii', 'replace')
    ext_map = {'SSEQ': 'sseq', 'SBNK': 'sbnk', 'SWAR': 'swar', 'STRM': 'strm', 'SWAV': 'swav'}
    return magic_str, ext_map.get(magic_str, 'bin')


def main():
    with open(SDAT_PATH, 'rb') as f:
        data = f.read()
    print(f'SDAT total {len(data)} bytes')

    entries = read_fat(data)
    os.makedirs(OUT_DIR, exist_ok=True)
    results = []
    for i, e in enumerate(entries):
        raw = data[e['offset']:e['offset'] + e['size']]
        magic, ext = identify(raw)
        name = f'{i:02d}_{magic.lower()}.{ext}'
        out = os.path.join(OUT_DIR, name)
        with open(out, 'wb') as f:
            f.write(raw)
        results.append({'index': i, 'offset': e['offset'], 'size': e['size'], 'magic': magic, 'file': name})
        print(f'  [{i:02d}] {magic:5s} offset={e["offset"]:#7x} size={e["size"]:7d} -> {name}')

    with open(os.path.join(OUT_DIR, '..', 'sdat-files.json'), 'w') as f:
        json.dump(results, f, indent=2)

    types = {}
    for r in results:
        types[r['magic']] = types.get(r['magic'], 0) + 1
    print(f'\nSummary: {types}')


if __name__ == '__main__':
    main()
