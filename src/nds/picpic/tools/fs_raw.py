# -*- coding: utf-8 -*-
"""检查 FNT/FAT 区域原始字节，判断偏移是否正确"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
d = rom.data

print('FNT off=0x%X size=0x%X' % (h['fnt_off'], h['fnt_size']))
print('FAT off=0x%X size=0x%X' % (h['fat_off'], h['fat_size']))
print()
print('=== FNT 区前 0x100 字节 ===')
b = d[h['fnt_off']:h['fnt_off']+0x100]
print(b.hex(' '))
print()
# 统计 0xAA / 0xFF / 0x00 占比
seg = d[h['fnt_off']:h['fnt_off']+h['fnt_size']]
from collections import Counter
cnt = Counter(seg)
print('FNT 区字节分布 top10:', cnt.most_common(10))
print('0xAA 占比: %.1f%%' % (100.0 * cnt[0xAA] / len(seg)))
print('0x00 占比: %.1f%%' % (100.0 * cnt[0] / len(seg)))
print()
print('=== FAT 区前 0x40 字节（16 条）===')
fat = rom.fat(h['fat_off'], h['fat_size'])
for i in range(16):
    s, e = fat[i]
    print('  [%3d] 0x%08X - 0x%08X size=0x%X' % (i, s, e, e - s))
print()
# 检查 FAT 末尾区域
print('=== FAT 后区域（banner 附近）===')
b = d[h['fat_off']+h['fat_size']:h['fat_off']+h['fat_size']+0x100]
print(b.hex(' '))
