# -*- coding: utf-8 -*-
"""定位真正的根目录表起点：在 FNT 区内搜索 'hojyo_undo_1.NCER' 前导结构"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
d = rom.data
h = rom.header(0)
fnt_off, fnt_size = h['fnt_off'], h['fnt_size']
fat_off = h['fat_off']

# 搜索 'undo_1.NCER' 出现位置（根目录含 hojyo_undo_1.NCER）
needle = b'undo_1.NCER'
print('=== 搜索 %r 在 FNT 区 (0x%X..0x%X) 的出现 ===' % (needle, fnt_off, fnt_off + fnt_size))
pos = 0
count = 0
while True:
    idx = d.find(needle, fnt_off + pos, fnt_off + fnt_size)
    if idx < 0:
        break
    count += 1
    print('\n--- 命中 %d @0x%X ---' % (count, idx))
    # 打印前 24 字节
    for j in range(idx - 24, idx + len(needle) + 8, 16):
        chunk = d[j:j + 16]
        hexs = ' '.join('%02X' % b for b in chunk)
        asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
        print('  %05X: %-48s |%s|' % (j, hexs, asc))
    pos = idx + 1
print('\n总命中: %d' % count)

# 主表条目尺寸反推：搜索第一个目录表的可能起点
print('\n=== 尝试: 主表条目尺寸 8/12/16/20 时根表起点 附近是否有 0x00 终止符 + len 结构 ===')
for esz in (8, 12, 16, 20, 24, 32):
    tbl = fnt_off + 4 + 200 * esz
    if tbl >= fat_off:
        print('  esz=%d -> 0x%X (超出 FAT 范围!)' % (esz, tbl))
        continue
    # 检查 tbl-1 是否为终止符 00，以及 tbl 是否是合法 len
    b = d[tbl]
    prev = d[tbl - 1]
    print('  esz=%d root=0x%X prev=0x%02X cur=0x%02X (%s)' % (esz, tbl, prev, b, repr(chr(b)) if 32 <= b < 127 else '?'))
