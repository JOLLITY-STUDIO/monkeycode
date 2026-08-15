import sys, struct
rom_path = r'd:\studio\github\monkeycode\src\nds\picpic\roms\extracted\_system\arm9.bin'
arm9 = open(rom_path, 'rb').read()
base = 0x02000000

keywords = [b'map_d/', b'lap_d/', b'fap_d/', b'map/', b'lap/', b'fap/']
refs = {}
for kw in keywords:
    refs[kw] = []
    off = 0
    while True:
        idx = arm9.find(kw, off)
        if idx < 0:
            break
        refs[kw].append(idx)
        off = idx + 1

for kw, locs in refs.items():
    print(f'=== {kw.decode()} ({len(locs)} refs) ===')
    for idx in locs[:30]:
        addr = base + idx
        print(f'  ROM off=0x{idx:05X} addr=0x{addr:08X}')
    print()
