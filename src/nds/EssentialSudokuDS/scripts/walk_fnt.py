"""Parse NDS FNT for Essential Sudoku DS — final walker.

Format (confirmed by byte count):
  FNT HEADER (offset 0):
    u32 root_offset         = 0x10 (= sub-table starts at FNT+0x10)
    u16 first_file_id       = 0x0000 (first file in FNT = FAT id 0)
    u16 n_subdirs           = 0x0002 (= 2 sub-tables in FNT: root + 'data' sub)

  Each entry (after root_offset):
    DIR (is_dir flag in length_byte):
      u8 0x80 | name_length
      char name[name_length]
      u8 dir_id_low (1 byte, sub-dir ID)
      u8 0xF0 (constant sentinel)
      u8 0x00 (sub-dir has NO further sub-dirs), OR end-of-sub-table marker

    FILE:
      u8 name_length
      char name[name_length]
      (no trailing bytes; file_id assigned by FNT position)

  End of sub-table: 0x00 byte.
  File_id = first_file_id + sequence number (file is nth FILE entry in FNT order).
"""
import os
import struct
import sys
import json

ROM = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\work\Essential Sudoku DS (Europe).nds'

FNT_OFFSET = 0x00128C00
FNT_SIZE = 0x530
FAT_OFFSET = 0x00129200
FAT_SIZE = 0x298


def u8(b, o):
    return b[o]


def u16le(b, o):
    return struct.unpack('<H', b[o:o + 2])[0]


def u32le(b, o):
    return struct.unpack('<I', b[o:o + 4])[0]


def walk_fnt(fnt_bytes):
    """Walk FNT with no trailing bytes for files; file_ids assigned in order."""
    if len(fnt_bytes) < 8:
        return {}, []

    root_offset = u32le(fnt_bytes, 0)
    first_file_id = u16le(fnt_bytes, 4)
    n_subdirs = u16le(fnt_bytes, 6)

    file_map = {}
    file_list = []  # ordered list of (file_id, name)
    entries = []    # debug: all parsed entries
    next_file_id = first_file_id

    pos = root_offset
    while pos < len(fnt_bytes):
        length_byte = u8(fnt_bytes, pos)
        if length_byte == 0x00:
            pos += 1
            continue
        is_dir = (length_byte & 0x80) != 0
        name_len = length_byte & 0x7F
        if name_len == 0:
            pos += 1
            continue
        if pos + 1 + name_len > len(fnt_bytes):
            break
        name = fnt_bytes[pos + 1:pos + 1 + name_len].decode('ascii', errors='replace')
        cursor = pos + 1 + name_len

        if is_dir:
            # DIR entry: 3 trailing bytes
            if cursor + 3 > len(fnt_bytes):
                break
            dir_id = u8(fnt_bytes, cursor)
            flag1 = u8(fnt_bytes, cursor + 1)
            flag2 = u8(fnt_bytes, cursor + 2)
            cursor += 3
            entries.append({'type': 'dir', 'name': name, 'dir_id': dir_id,
                            'flag1': flag1, 'flag2': flag2, 'pos': pos})
            pos = cursor
        else:
            # FILE entry: no trailing bytes
            entry = {
                'type': 'file',
                'name': name,
                'file_id': next_file_id,
                'pos': pos,
                'name_len': name_len,
            }
            entries.append(entry)
            file_map[next_file_id] = name
            file_list.append((next_file_id, name))
            next_file_id += 1
            pos = cursor

    return file_map, entries


def main():
    if not os.path.exists(ROM):
        print('ROM missing:', ROM)
        sys.exit(1)

    with open(ROM, 'rb') as f:
        f.seek(FNT_OFFSET)
        fnt = f.read(FNT_SIZE)
        f.seek(FAT_OFFSET)
        fat_entries = []
        for i in range(FAT_SIZE // 8):
            ent = f.read(8)
            start, end = u32le(ent, 0), u32le(ent, 4)
            fat_entries.append((start, end))

    print(f'== FNT walk: {len(fnt)} bytes ==')
    print(f'== FAT entries: {len(fat_entries)} ==')

    fm, entries = walk_fnt(fnt)
    files = [e for e in entries if e['type'] == 'file']
    dirs = [e for e in entries if e['type'] == 'dir']
    print(f'\n[empirical walk] files={len(files)} dirs={len(dirs)}')

    # Print directory entries
    for d in dirs:
        print(f"  [0x{d['pos']:03x}] dir  name={d['name']!r:20s} dir_id={d['dir_id']} flag2=0x{d['flag2']:02x}")

    # Print file entries with FAT info
    print('\n  Files:')
    for f_entry in files:
        fid = f_entry['file_id']
        if fid < len(fat_entries):
            s, e = fat_entries[fid]
            size = e - s
            print(f"  [0x{f_entry['pos']:03x}] file id={fid:3d}  size={size:>6d}  name={f_entry['name']}")
        else:
            print(f"  [0x{f_entry['pos']:03x}] file id={fid:3d}  (BAD) name={f_entry['name']}")

    # Coverage
    fat_ids = set(range(len(fat_entries)))
    mapped_ids = set(fm.keys())
    print(f'\nFAT mapped: {len(mapped_ids)}/{len(fat_ids)}')

    # Write JSON
    out_dir = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data'
    out_json = os.path.join(out_dir, 'fnt-mapping.json')
    with open(out_json, 'w', encoding='utf-8') as f:
        json.dump({
            'rom': os.path.basename(ROM),
            'walker': 'positional_v1',
            'fnt_offset': FNT_OFFSET,
            'fnt_size': FNT_SIZE,
            'total_fat_entries': len(fat_entries),
            'total_fnt_file_entries': len(files),
            'total_fnt_dir_entries': len(dirs),
            'file_id_to_path': {str(k): v for k, v in sorted(fm.items())},
            'files': [{'file_id': e['file_id'], 'name': e['name'],
                       'size': (fat_entries[e['file_id']][1] - fat_entries[e['file_id']][0]) if e['file_id'] < len(fat_entries) else 0,
                       'offset': hex(fat_entries[e['file_id']][0]) if e['file_id'] < len(fat_entries) else None}
                      for e in files],
            'directories': [{'name': d['name'], 'dir_id': d['dir_id']} for d in dirs],
        }, f, ensure_ascii=False, indent=2)
    print(f'Wrote: {out_json}')


if __name__ == '__main__':
    main()
