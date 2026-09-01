#!/usr/bin/env python3
"""Parse NTR Header 0x200 bytes of an NDS ROM.

Field layout reference: GBATEK (https://problemkaputt.de/gbatek.htm)
"""
import struct
import os
import sys
import json

ROM = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\work\Essential Sudoku DS (Europe).nds'


def u8(b, o):
    return b[o]


def u16le(b, o):
    return struct.unpack('<H', b[o:o + 2])[0]


def u32le(b, o):
    return struct.unpack('<I', b[o:o + 4])[0]


def ascii_clean(b):
    return b.decode('ascii', 'replace').rstrip('\x00').strip()


def main():
    if not os.path.exists(ROM):
        print('ROM missing:', ROM)
        sys.exit(1)

    sz = os.path.getsize(ROM)
    with open(ROM, 'rb') as f:
        h = f.read(0x200)
        f.seek(0)
        arm9 = f.read()
    print(f'== ROM: {os.path.basename(ROM)} == size = {sz} bytes ({sz / 1024 / 1024:.2f} MiB)\n')

    title = ascii_clean(h[0:12])
    game_code = ascii_clean(h[0xC:0x10])
    maker_code = ascii_clean(h[0x10:0x12])
    unit_code = u8(h, 0x12)
    device_type = u8(h, 0x13)
    card_size = u8(h, 0x14)
    card_type_raw = u8(h, 0x15)

    arm9_src = u32le(h, 0x20)
    arm9_dst = u32le(h, 0x24)
    arm9_off = u32le(h, 0x28)
    arm9_sz = u32le(h, 0x2C)

    arm7_src = u32le(h, 0x30)
    arm7_dst = u32le(h, 0x34)
    arm7_off = u32le(h, 0x38)
    arm7_sz = u32le(h, 0x3C)

    fnt_off = u32le(h, 0x40)
    fnt_sz = u32le(h, 0x44)
    fat_off = u32le(h, 0x48)
    fat_sz = u32le(h, 0x4C)

    icon_off = u32le(h, 0x68)

    card_type_map = {0: 'Normal', 1: 'Flash', 2: 'ROM+Flash', 3: 'Unknown'}
    unit_map = {0: 'NDS', 1: 'NDS+DSi?', 2: 'DSi', 3: 'DSi-debug'}
    print('-- Identification --')
    print(f'  Game Title      : {title!r}')
    print(f'  Game Code       : {game_code!r}')
    print(f'  Maker Code      : {maker_code!r}')
    print(f'  Unit Code       : {unit_code:#x} ({unit_map.get(unit_code,"?")})')
    print(f'  Device Type     : {device_type:#x}')
    print(f'  Card Size (raw) : {card_size:#x} (= {2 ** (card_size + 7) // 1024 // 1024} MiB)')
    print(f'  Card Type (raw) : {card_type_raw:#x} ({card_type_map.get(card_type_raw,"?")})')

    print('\n-- ARM9 --')
    print(f'  src address     : {arm9_src:#010x}')
    print(f'  dst (load) addr : {arm9_dst:#010x}')
    print(f'  ROM offset      : {arm9_off:#010x}')
    print(f'  size            : {arm9_sz:#010x} ({arm9_sz} bytes)')

    print('\n-- ARM7 --')
    print(f'  src address     : {arm7_src:#010x}')
    print(f'  dst (load) addr : {arm7_dst:#010x}')
    print(f'  ROM offset      : {arm7_off:#010x}')
    print(f'  size            : {arm7_sz:#010x} ({arm7_sz} bytes)')

    print('\n-- Filesystem --')
    print(f'  FNT offset/size : {fnt_off:#010x} / {fnt_sz:#x}')
    print(f'  FAT offset/size : {fat_off:#010x} / {fat_sz:#x}')

    print('\n-- Banner --')
    print(f'  Icon offset     : {icon_off:#010x}')

    # FNT root entry
    if fat_off and fnt_off:
        with open(ROM, 'rb') as f:
            f.seek(fnt_off)
            fnt_root = f.read(8)
            fnt_root_off = u32le(fnt_root, 0) & 0x0FFFFFFF
            fnt_first_file = u16le(fnt_root, 4)
            fnt_n_dir = u16le(fnt_root, 6)
            print(f'\n-- FNT root --')
            print(f'  root sub-alloc offset: {fnt_root_off:#010x}')
            print(f'  first file idx       : {fnt_first_file}')
            print(f'  number of dirs       : {fnt_n_dir}')

            f.seek(fat_off)
            fat_entries = []
            for i in range(fat_sz // 8):
                ent = f.read(8)
                start, end = u32le(ent, 0), u32le(ent, 4)
                fat_entries.append((start, end))

            print(f'\n-- FAT entries: {len(fat_entries)} files --')

            # Walk FNT recursively
            def walk_dir(offset_in_fnt, parent_name=''):
                base = fnt_off + offset_in_fnt
                idx = 0
                while True:
                    with open(ROM, 'rb') as fr:
                        fr.seek(base + idx)
                        ent = fr.read(8)
                    if len(ent) < 8 or ent[0] == 0x00:
                        break
                    name_len = ent[0]
                    is_dir = (ent[1] & 0x80) != 0
                    name = ''
                    with open(ROM, 'rb') as fr:
                        fr.seek(base + idx + 8)
                        name_b = fr.read(name_len)
                        name = name_b.decode('ascii', 'replace').rstrip('\x00')
                    if is_dir:
                        dir_id = ent[2] | (ent[3] << 8)
                        top_dir_id = ent[4]
                        new_parent = (parent_name + '/' + name) if name else parent_name
                        if top_dir_id == 0xF0:
                            sub_off = u16le(ent, 4)
                            walk_dir(sub_off, new_parent)
                    else:
                        fat_id = u16le(ent, 0) | (u16le(ent, 4) << 16)
                        file_id = u16le(ent, 2)  # assume first file is root
                        if fat_id < len(fat_entries):
                            s, e = fat_entries[fat_id]
                            fsz = e - s
                            full = (parent_name + '/' + name).lstrip('/')
                            print(f'  [{fat_id:3d}] {full:60s} {fsz:>10d} bytes  off={s:#010x}')
                        else:
                            print(f'  [{fat_id:3d}] {parent_name}/{name}: BAD FAT ID')
                    idx += 8 + name_len

            walk_dir(0, '')


if __name__ == '__main__':
    main()
