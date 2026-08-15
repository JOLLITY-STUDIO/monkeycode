import sys, math
sys.path.insert(0, 'tools')
from ndsrom import NdsRom
rom = NdsRom()
dirs, tables, dir_names = rom.fnt_parse()
map_d_idx = None
for i, (files, subdirs) in enumerate(tables):
    for sid, name in subdirs:
        if name.lower() == 'map_d':
            map_d_idx = sid
            break
    if map_d_idx is not None:
        break

files, _ = tables[map_d_idx]
base_fid = dirs[map_d_idx]['first_file']

for idx, (pos, name) in enumerate(files):
    if 'Cat' in name and 'mouse' in name:
        fid = base_fid + idx
        data = rom.read_file(fid)
        print(f'File: {name}')
        print(f'Length: {len(data)}')
        print(f'First 20 bytes: {data[:20].hex()}')
        print(f'data[0]={data[0]}, data[1]={data[1]}')
        h, w = data[0], data[1]
        body = data[6:]
        expect = (h * w + 1) // 2
        print(f'h={h}, w={w}, body_len={len(body)}, expect={expect}')
        if len(body) == expect:
            grid = []
            for y in range(h):
                row = []
                for x in range(w):
                    i = y * w + x
                    b = body[i >> 1]
                    n = (b >> 4) if (i & 1) else (b & 0x0F)
                    row.append(n)
                grid.append(row)
            flat = [c for row in grid for c in row]
            zeros = flat.count(0)
            unique = sorted(set(flat))
            print(f'zeros={zeros}, total={len(flat)}, unique={unique}')
            for i in range(min(5, h)):
                print(' '.join(f'{c:2d}' for c in grid[i]))
        break
