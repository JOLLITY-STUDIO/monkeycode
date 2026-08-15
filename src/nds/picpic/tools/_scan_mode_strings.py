import sys, struct, re, string
rom_path = r'd:\studio\github\monkeycode\src\nds\picpic\roms\Pic Pic - Toku to E ni Naru 3-tsu no Puzzle (Japan).nds'
rom = open(rom_path, 'rb').read()

# 提取 ASCII 可见字符串（len>=4），并定位含 map/lap/fap/maze/draw/magi/paint 的
results = []
for m in re.finditer(br'[A-Za-z0-9_ /\-\.]{4,}', rom):
    s = m.group().decode('ascii', 'replace')
    lowered = s.lower()
    if any(k in lowered for k in ('map', 'lap', 'fap', 'maze', 'draw', 'magi', 'paint', 'line', 'art', 'puzzle')):
        results.append((m.start(), s))

for off, s in results[:200]:
    print(f'0x{off:06X} {s}')
