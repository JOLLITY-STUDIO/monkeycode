# -*- coding: utf-8 -*-
"""验证 ROM 结构：ARM9 入口代码、FAT 内容、备用头探测"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom, find_nds_header
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)

print('=== 1. FAT[2] 区域内容（前 0x200 字节，判断是否为备用 NDS 头）===')
fat = rom.fat(h['fat_off'], h['fat_size'])
e2 = fat[2]
print('FAT[2] = [0x%X, 0x%X) size 0x%X' % (e2[0], e2[1], e2[1]-e2[0]))
seg = rom.data[e2[0]:e2[0]+0x200]
print('title   :', seg[0:12])
print('gamecode:', seg[0x0C:0x10], 'maker:', seg[0x10:0x12])
print('head    :', seg[0:32].hex(' '))

print()
print('=== 2. 全 ROM 搜索 NTRJ 备用头 ===')
for off, title, arm9off in find_nds_header(rom.data, 0x200000):
    print('  @0x%08X  title=%r  arm9_off=0x%X' % (off-0x0C, title, arm9off))

print()
print('=== 3. ARM9 入口代码（外层头 entry=0x%08X ram=0x%08X）===' % (h['arm9_entry'], h['arm9_ram']))
arm9 = rom.arm9(h)
rel = h['arm9_entry'] - h['arm9_ram']
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
code = arm9[rel:rel+64]
for ins in md.disasm(code, h['arm9_entry']):
    print('  0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))

print()
print('=== 4. 各 FAT 大文件（>64KB），了解数据分布 ===')
big = sorted(enumerate(fat), key=lambda x: x[1][1]-x[1][0], reverse=True)[:25]
for i, (s, e) in big:
    print('  [%4d] 0x%08X-0x%08X  size=0x%X' % (i, s, e, e-s))

print()
print('=== 5. ARM9 区域尾部探测（FNT 前是否有代码）===')
print('  ARM9 官方 size 0x%X, 尾部字节:' % h['arm9_size'])
tail = arm9[-32:]
print('  ', tail.hex(' '))
print('  FNT off 0x%X 前 32 字节:' % h['fnt_off'])
print('  ', rom.data[h['fnt_off']-32:h['fnt_off']].hex(' '))
