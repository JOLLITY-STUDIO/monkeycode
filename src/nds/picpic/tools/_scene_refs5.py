# -*- coding: utf-8 -*-
"""
_scene_refs5.py — 对每个目标场景字符串，找出 ARM+Thumb 的 ldr 引用指令位置。
输出指令地址 -> 字符串 的映射，用于状态→场景映射。
输出写入 _scene_refs5_result.txt
"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
RAM = h['arm9_ram']
SIZE = len(arm9)
out = []
def p(s=''):
    out.append(str(s))

# 提取字符串
strings = []
cur = None
for i, b in enumerate(arm9):
    if 32 <= b < 127:
        if cur is None:
            cur = i
    else:
        if cur is not None:
            ln = i - cur
            if 4 <= ln <= 60:
                strings.append((RAM + cur, arm9[cur:i].decode('ascii', 'replace')))
            cur = None
str_by_addr = {a: s for a, s in strings}

# 目标关键词
kw = ['title/', 'select/', 'option/', 'cinario', 'map_d/', 'fap_d/', 'lap_d/',
      'tutorial', 'taiken', 'otamesi', 'f_make', 'kakuninn', 'comp', 'clear/',
      'map/', 'lap/', 'fap/', 'battle', 'sample', 'main_bg', 'MB_', 'Nurie',
      'hojyo', 'l_clear', 'bg_map', 'curs', 'hatena', 'No_window', 'yaji']
target_addrs = [a for a, s in strings if any(t in s.lower() for t in kw)]

target_set = set(target_addrs)
# 反向：string addr -> code refs
refs = {}  # str_addr -> [caller...]

# ARM 扫描
for off in range(0, SIZE - 3, 4):
    ins = struct.unpack_from('<I', arm9, off)[0]
    if (ins & 0x0F5F0000) == 0x051F0000:
        rd = (ins >> 12) & 0xF
        imm = ins & 0xFFF
        target = (RAM + off + 8 + imm) & ~3
        if target in target_set:
            refs.setdefault(target, []).append((RAM + off, 'A'))

# Thumb 扫描
for off in range(0, SIZE - 1, 2):
    hw = struct.unpack_from('<H', arm9, off)[0]
    if (hw & 0xF800) == 0x4800:
        rd = (hw >> 8) & 7
        imm = (hw & 0xFF) * 4
        pc_al = (RAM + off + 4) & ~3
        target = pc_al + imm
        if target in target_set:
            refs.setdefault(target, []).append((RAM + off, 'T'))

p('有引用的目标字符串数: %d' % len(refs))

# 按字符串地址排序输出
for a in sorted(refs):
    s = str_by_addr[a]
    callers = refs[a]
    p('\n%r @0x%08X' % (s, a))
    for c, m in sorted(callers):
        p('  0x%08X (%s)' % (c, m))

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       '_scene_refs5_result.txt'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('done, lines=%d' % len(out))
