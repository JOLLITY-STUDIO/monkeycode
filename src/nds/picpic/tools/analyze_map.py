import sys, collections
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
        h, w = data[0], data[1]
        body = data[6:]
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
        cnt = collections.Counter(flat)
        print(f'File: {name}')
        print(f'Size: {h}x{w}')
        print(f'Value counts: {dict(sorted(cnt.items()))}')
        # Check if 0s form borders or pattern
        print('\nFirst row:', grid[0])
        print('Last row:', grid[-1])
        print('First col:', [grid[y][0] for y in range(h)])
        print('Last col:', [grid[y][-1] for y in range(h)])
        break
