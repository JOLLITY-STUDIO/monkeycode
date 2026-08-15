# -*- coding: utf-8 -*-
"""分析 title 资源格式：LZ10 解压 + NCGR/NSCR/NCLR 结构确认"""
import struct, sys, os

def lz10(data):
    assert data[0] == 0x10, 'not lz10: %02x' % data[0]
    size = data[1] | (data[2] << 8) | (data[3] << 16)
    out = bytearray()
    i = 4
    while len(out) < size:
        flags = data[i]; i += 1
        for b in range(8):
            if len(out) >= size:
                break
            if flags & (0x80 >> b):
                lo, hi = data[i], data[i + 1]; i += 2
                ln = (lo >> 4) + 3
                off = ((lo & 0xF) << 8) | hi
                for _ in range(ln):
                    out.append(out[-off - 1])
            else:
                out.append(data[i]); i += 1
    return bytes(out[:size])

BASE = os.path.join(os.path.dirname(__file__), '..', 'roms', 'extracted', 'title')

def analyze(name):
    d = open(os.path.join(BASE, name), 'rb').read()
    raw = lz10(d)
    print('%-28s LZ=%5d -> %5d  magic=%r' % (name, len(d), len(raw), raw[:4]))

for f in sorted(os.listdir(BASE)):
    if f.endswith('_LZ.bin'):
        analyze(f)

# NCGR 结构检查（解压后）
d = open(os.path.join(BASE, 'bg_title_t_LZ.bin'), 'rb').read()
raw = lz10(d)
print('\nNCGR bg_title_t hdr:', raw[:4], struct.unpack_from('<6H', raw, 0))
print('NCGR data len', len(raw))
# NSCR 屏幕条目（256x192 双屏=2x 128KB? NSCR 1.5KB=768 entries=32x24 屏 1024 entries 前 768）
for nscr in ['bg_title_t.NSCR', 'bg_title_v.NSCR', 'succes.NSCR', 'conceptis.NSCR']:
    s = open(os.path.join(BASE, nscr), 'rb').read()
    entries = struct.unpack_from('<%dH' % ((len(s) - 0x28) // 2), s, 0x28)
    used = [e for e in entries if e & 0x3FF]
    print('%s: %d entries, %d used, first10=%s' % (nscr, len(entries), len(used), [hex(e & 0x3FF) for e in used[:10]]))
