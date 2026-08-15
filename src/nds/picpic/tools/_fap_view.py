# -*- coding: utf-8 -*-
b = open('roms/extracted/fap_d/3300401_rooster.fap', 'rb').read()
w, h = 15, 15
print('=== 0xF=# 其他=. (head=2) ===')
for y in range(h):
    line = ''
    for x in range(w):
        i = y * w + x
        byte = b[2 + (i >> 1)]
        v = (byte >> 4) if (i & 1) else (byte & 0x0F)
        line += '#' if v == 0xF else '.'
    print(line)
print('=== 值视图 (head=2) ===')
for y in range(h):
    line = ''
    for x in range(w):
        i = y * w + x
        byte = b[2 + (i >> 1)]
        v = (byte >> 4) if (i & 1) else (byte & 0x0F)
        line += '%x' % v
    print(line)
