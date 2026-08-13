# -*- coding: utf-8 -*-
"""完整 dump FNT 头 + 主表 + 根表起点，逐字节标注"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
d = rom.data
h = rom.header(0)
fnt_off = h['fnt_off']
start = fnt_off
end = fnt_off + 0x120
print('=== FNT %08X..%08X ===' % (start, end))
for j in range(start, end, 16):
    chunk = d[j:j + 16]
    hexs = ' '.join('%02X' % b for b in chunk)
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
    print('%05X: %-48s |%s|' % (j - fnt_off, hexs, asc))

# 另一种解释：主表 8 字节条目 = (fid, parent, first_subdir_table_id?, pad)
print('\n=== 主表 8B/条 解释: fid parent sdir pad ===')
count = int.from_bytes(d[fnt_off:fnt_off+4], 'little')
for i in range(24):
    fid, parent, sdir, pad = struct.unpack_from('<4H', d, fnt_off + 4 + i * 8)
    print('  dir[%02d] fid=%5d parent=0x%04X(%d) sdir=%5d pad=%d' % (i, fid, parent, parent, sdir, pad))

# 检查: 若目录表按 dir id 顺序排列，第一个目录表在何处？
# 根表内容在 0xBF700 (f_make, fap...) 出现 => 主表可能到 0xBF700 为止
print('\n=== 检查 0xBF700 前面 32 字节是否以 00 终止 ===')
for j in range(0xBF700 - 32, 0xBF700, 16):
    chunk = d[j:j + 16]
    hexs = ' '.join('%02X' % b for b in chunk)
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
    print('  %05X: %-48s |%s|' % (j - fnt_off, hexs, asc))
